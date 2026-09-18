+++
title = "What Dice Misses"
description = "A critical reading of the Dice coefficient and the metrics that expose boundary, distance, topology, object and volume errors in medical image segmentation"
date = "2026-08-29"
weight = 1

[taxonomies]
tags=["machine learning", "image segmentation", "medical imaging", "evaluation metrics", "u-net"]

[extra]
math = true
toc = true

+++

# Why look beyond Dice

My master's research focuses on improving boundary detection in U-Net architectures for medical image segmentation. I approach each metric with that problem in mind, trying to understand what it can tell me. A comparison reduced to a single Dice column leaves my main questions unanswered: where the boundary failed and by how many millimetres.

In a [comparison of U-Net architectures](/en/projetos/unet-comparativo/) I published here, the standard U-Net achieved the highest mean Dice. When I inspected the masks, however, I found very different errors: leakage into the background, a peripheral halo, a missing lobe, a discontinuity, and failures on small targets. All of them change overlap, but the number does not say which one occurred, where it occurred, or how far the predicted boundary was from the reference. For the question driving my master's research, that comparison still leaves much unanswered.

Dice is simple, avoids counting the many true negatives in the background, and answers the question it was designed to answer: **how much do two regions overlap?** Its answer becomes incomplete when it represents segmentation quality on its own. The medical image validation literature documents this mismatch between the selected metric and the actual interest of an application.[^1] [^2]

These notes are an attempt to organize the criteria I want to use to evaluate models for this problem. I want to understand how much I can learn from Dice and which measures I need to add to support a claim about improved boundaries.

# What Dice measures

## An overlap statistic

Let \\(G\\) be the binary reference mask and \\(P\\) the predicted mask. Proposed by Lee Dice in 1945 to measure ecological association,[^3] the coefficient takes the following form in segmentation:

\\[
\operatorname{Dice}(P,G)
= \frac{2|P\cap G|}{|P|+|G|}
= \frac{2TP}{2TP+FP+FN}.
\\]

When at least one mask is nonempty, the value lies between zero and one: it is one for identical nonempty masks and zero when there is no intersection. When \\(P\\) and \\(G\\) are nonempty, it is also the pixel- or voxel-level \\(F\_1\\): the harmonic mean of precision and recall. Three properties explain much of its popularity.

First, true negatives are absent from the formula. In an image where the anatomy of interest occupies a small region, correctly classified background does not dominate the result as it would dominate accuracy. Second, the measure is symmetric: swapping reference and prediction leaves it unchanged. Third, its geometric interpretation is direct and does not depend on the physical unit of the image.

The same formula omits error direction and location. False positives and false negatives enter the same denominator, so Dice does not show whether a model tends to expand or contract a structure. Coordinates are absent from the formula: a false positive touching the boundary and one thirty millimetres away carry the same weight. Dividing by the sum of the volumes also makes the penalty relative to size, so the same absolute error consumes a larger fraction of a small structure.[^1]

## Dice and IoU tell the same story on a different scale

Intersection over union, or IoU, is

\\[
\operatorname{IoU}(P,G)=\frac{|P\cap G|}{|P\cup G|}
=\frac{TP}{TP+FP+FN}.
\\]

For a pair of masks with a nonempty union, Dice and IoU are linked exactly by

\\[
\operatorname{Dice}=\frac{2\operatorname{IoU}}{1+\operatorname{IoU}},
\qquad
\operatorname{IoU}=\frac{\operatorname{Dice}}{2-\operatorname{Dice}}.
\\]

A mask with higher Dice therefore also has higher IoU. Reporting both does not provide two independent geometric views; it provides a monotonic transformation of the same counts.[^4] There is one qualification: because the transformation is nonlinear, means of per-case Dice and IoU need not preserve differences or rankings after aggregation. That is an effect of the statistical summary, not new spatial information.

Metric and loss function should also be kept separate. The Dice above compares binary masks after a decision rule. A *soft Dice loss* operates on probabilities, depends on reduction across classes and batches, and usually includes a smoothing term. Training with one of those versions does not settle how final evaluation should be performed; it only defines part of the optimization problem.

# The same Dice, different errors

Consider a \\(64\times64\\)-pixel square reference with area \\(4096\\). I constructed three predictions, each also containing \\(4096\\) pixels and sharing the same \\(3968\\)-pixel intersection with the reference:

1. **Shift**: the whole square moves two pixels to the right.
2. **Island**: a strip of \\(128\\) pixels is removed from the boundary and placed far from the object, creating a second component.
3. **Hole**: \\(128\\) pixels are removed from the interior and restored as a strip attached to the outer boundary.

By construction, all three predictions have

\\[
\operatorname{Dice}=\frac{2\cdot3968}{4096+4096}=0.96875,
\qquad
\operatorname{IoU}=\frac{3968}{4224}\approx0.93939.
\\]

The code below reproduces the example using only NumPy. It uses a four-neighbour inner contour, distances between pixel centres, the maximum of the two directional percentiles for HD95, and a pooled mean for ASSD. Surface Dice is an illustrative approximation that gives every boundary pixel the same weight. The code also materializes all pairwise distances, so it is neither a reference implementation nor a solution for real medical volumes.

```python
import numpy as np


def boundary(mask: np.ndarray) -> np.ndarray:
    """Four-neighbour inner boundary of a 2-D binary mask."""
    m = np.pad(mask, 1, constant_values=False)
    interior = (
        m[1:-1, 1:-1]
        & m[:-2, 1:-1]
        & m[2:, 1:-1]
        & m[1:-1, :-2]
        & m[1:-1, 2:]
    )
    return mask & ~interior


def directed_distances(source: np.ndarray, target: np.ndarray) -> np.ndarray:
    """Euclidean distance from each source-boundary pixel to the target."""
    a = np.argwhere(boundary(source))
    b = np.argwhere(boundary(target))
    squared = ((a[:, None, :] - b[None, :, :]) ** 2).sum(axis=2)
    return np.sqrt(squared.min(axis=1))


def count_components(mask: np.ndarray) -> int:
    """Number of four-connected foreground components."""
    remaining = set(map(tuple, np.argwhere(mask)))
    total = 0
    while remaining:
        total += 1
        stack = [remaining.pop()]
        while stack:
            row, column = stack.pop()
            for neighbour in (
                (row - 1, column),
                (row + 1, column),
                (row, column - 1),
                (row, column + 1),
            ):
                if neighbour in remaining:
                    remaining.remove(neighbour)
                    stack.append(neighbour)
    return total


def count_holes(mask: np.ndarray) -> int:
    """Background components that do not reach the image border."""
    padded_background = np.pad(~mask, 1, constant_values=True)
    return count_components(padded_background) - 1


def metrics(reference: np.ndarray, prediction: np.ndarray, tolerance=2.0):
    intersection = np.logical_and(reference, prediction).sum()
    union = np.logical_or(reference, prediction).sum()
    ref_to_pred = directed_distances(reference, prediction)
    pred_to_ref = directed_distances(prediction, reference)
    pooled = np.concatenate((ref_to_pred, pred_to_ref))
    return {
        "Dice": 2 * intersection / (reference.sum() + prediction.sum()),
        "IoU": intersection / union,
        "HD95": max(np.percentile(ref_to_pred, 95), np.percentile(pred_to_ref, 95)),
        "ASSD": pooled.mean(),
        "SD@2": np.mean(pooled <= tolerance),
        "RVE_pct": 100 * (prediction.sum() - reference.sum()) / reference.sum(),
        "components": count_components(prediction),
        "holes": count_holes(prediction),
    }


reference = np.zeros((192, 192), dtype=bool)
reference[48:112, 48:112] = True

shift = np.zeros_like(reference)
shift[48:112, 50:114] = True

island = reference.copy()
island[48:112, 110:112] = False
island[144:152, 144:160] = True

hole = reference.copy()
hole[76:84, 72:88] = False
hole[48:112, 112:114] = True

for name, prediction in {
    "shift": shift,
    "island": island,
    "hole": hole,
}.items():
    values = metrics(reference, prediction)
    text = " ".join(f"{key}={value:.3f}" for key, value in values.items())
    print(name, text)

# shift  Dice=0.969 IoU=0.939 HD95=2.000  ASSD=1.000 SD@2=1.000 RVE_pct=0.000 components=1.000 holes=0.000
# island Dice=0.969 IoU=0.939 HD95=57.347 ASSD=4.887 SD@2=0.919 RVE_pct=0.000 components=2.000 holes=0.000
# hole   Dice=0.969 IoU=0.939 HD95=27.000 ASSD=2.626 SD@2=0.914 RVE_pct=0.000 components=1.000 holes=1.000
```

The table adds boundary distances and topology to the overlap results:

| Prediction | Dice ↑ | IoU ↑ | HD95 ↓ (px) | ASSD ↓ (px) | SD@2 ↑ | Volume error | Components / holes |
|---|---:|---:|---:|---:|---:|---:|---:|
| Shift | 0.969 | 0.939 | 2.000 | 1.000 | 1.000 | 0.0% | 1 / 0 |
| Island | 0.969 | 0.939 | 57.347 | 4.887 | 0.919 | 0.0% | 2 / 0 |
| Hole | 0.969 | 0.939 | 27.000 | 2.626 | 0.914 | 0.0% | 1 / 1 |

The example was designed to isolate geometry, not to represent clinical risk. Dice and IoU are identical and high, while volume error is zero in all three cases. HD95 reacts to the remote island. Component counting records the prediction's two objects, while hole counting captures a change that component count would miss.

Surface Dice at two pixels considers the entire shift acceptable because no part of its boundary lies beyond the tolerance. Between the two structural defects, it gives the island a slightly higher value than the hole, whereas HD95 judges the island far worse because of the remote component. One metric counts the fraction of surface within tolerance; the other summarizes the tail of the distances. The ordering depends on the property selected for the task: acceptable boundary extent, severe local error, connectivity, or something else.

The tie in Dice is what interests me in this example. If I used that column alone to compare the predictions, I would treat a shift, a distant island, and a hole as equivalent. To study boundaries, I need to distinguish these failures and justify which ones I want to reduce. The other columns help describe them, but deciding what is acceptable still depends on the application.

## The relative price of a pixel

Object size creates another effect. If a reference has area \\(n\\) and an erosion removes \\(e\\) pixels, the prediction is contained in the reference and \\(|P|=|P\cap G|=n-e\\). In that case,

\\[
\operatorname{Dice}=\frac{2(n-e)}{2n-e}.
\\]

The ratio \\(e/n\\) tends to be larger for small structures, where the boundary accounts for a greater fraction of the area. Applying one four-neighbour erosion to two disks on the same grid makes the effect visible:

```python
def disk(radius: int, size=128) -> np.ndarray:
    y, x = np.ogrid[:size, :size]
    center = (size - 1) / 2
    return (y - center) ** 2 + (x - center) ** 2 <= radius**2


def four_neighbour_erosion(mask: np.ndarray) -> np.ndarray:
    m = np.pad(mask, 1, constant_values=False)
    return (
        m[1:-1, 1:-1]
        & m[:-2, 1:-1]
        & m[2:, 1:-1]
        & m[1:-1, :-2]
        & m[1:-1, 2:]
    )


for radius in (10, 40):
    reference = disk(radius)
    prediction = four_neighbour_erosion(reference)
    intersection = np.logical_and(reference, prediction).sum()
    dice = 2 * intersection / (reference.sum() + prediction.sum())
    removed = reference.sum() - prediction.sum()
    print(f"radius={radius:2d} area={reference.sum():4d} removed={removed:3d} Dice={dice:.3f}")

# radius=10 area= 316 removed= 56 Dice=0.903
# radius=40 area=5024 removed=224 Dice=0.977
```

The boundary operation is the same in both cases, but the Dice drop is much larger for the small disk. The result is consistent with the coefficient's definition of overlap, but it prevents the same Dice difference from being interpreted as the same geometric difference across structures of different sizes. This is why I would also want to see the results of my comparison broken down by structure size. A mean alone would leave me unsure whether the gains reached small targets, which already featured among the failures in the U-Net comparison.

# Distance to the boundary

To evaluate the contour, we first need to represent it. Let \\(\partial P\\) and \\(\partial G\\) be the surfaces of the prediction and reference, and let

\\[
d(x,S)=\inf\_{y\in S}\lVert x-y\rVert\_2
\\]

be the distance from point \\(x\\) to the closest point on surface \\(S\\). The two directed collections,

\\[
D\_{P\to G}=\{d(p,\partial G):p\in\partial P\},
\qquad
D\_{G\to P}=\{d(g,\partial P):g\in\partial G\},
\\]

retain information that pixel counts discard. Different summaries of those collections answer different questions.[^4]

## Hausdorff and HD95

The symmetric Hausdorff distance takes the largest error in either direction:

\\[
HD(P,G)=\max\bigl(\sup D\_{P\to G},\sup D\_{G\to P}\bigr).
\\]

It finds the point of greatest disagreement, so it reacts strongly to a remote island or a single stray pixel. That sensitivity may expose a serious failure or annotation noise. Under a directional, area-weighted convention, replacing the maximum with the 95th percentile discards the upper 5% of each distance distribution; other conventions truncate a different tail. A distant false component may not appear in HD95 if it occupies a small enough fraction of the surface.

Even the name "HD95" does not specify an implementation. One can take the maximum of the directional percentiles, as in the example above, or pool both collections before taking the percentile; one can measure between voxel centres or mesh elements; one can weight by physical surface area or not. A comparison of five libraries found systematic differences caused by choices of this kind.[^5] The percentile, boundary extraction, weighting, connectivity, library, and version therefore belong in the experimental method.

This also makes me cautious about comparisons between models. I would only interpret a difference in HD95 as evidence of improved boundaries after checking that both values were computed in the same way. Otherwise, some of the difference could come from the metric's implementation, and I could end up crediting the architecture for it.

## Average symmetric surface distance

One convention for average symmetric surface distance, or ASSD, pools both directions and weights each surface element:

\\[
\operatorname{ASSD}\_{\mathrm{pool}}=
\frac{
\sum\_{p\in\partial P} a\_p d(p,\partial G)
{}+\sum\_{g\in\partial G} a\_g d(g,\partial P)
}{
\sum\_{p\in\partial P}a\_p+\sum\_{g\in\partial G}a\_g
},
\\]

where \\(a\_p\\) and \\(a\_g\\) are lengths in 2-D or areas in 3-D. It describes typical contour separation and is less dominated by a single extreme than Hausdorff. A severe local failure, however, can be diluted among thousands of elements close to the reference.

Another convention also called ASSD first computes a mean in each direction and then averages the two. The formulas differ when the surfaces have unequal areas. The illustrative code used the pooled form with \\(a=1\\); a paper should state the convention and preserve physical surface areas.

## Surface Dice

Surface Dice at tolerance \\(\tau\\) asks what fraction of both surfaces lies within a distance deemed acceptable from the other. With \\(A(\cdot)\\) denoting surface area,

\\[
SD\_{\tau}(P,G)=
\frac{
A\bigl(\{p\in\partial P:d(p,\partial G)\le\tau\}\bigr)
{}+A\bigl(\{g\in\partial G:d(g,\partial P)\le\tau\}\bigr)
}{A(\partial P)+A(\partial G)}.
\\]

The metric was proposed for delineating organs at risk in radiotherapy, with structure-specific tolerances estimated from variation between specialists.[^6] The Medical Segmentation Decathlon also combined volumetric Dice with normalized surface Dice, using different physical tolerances by task and anatomy, selected through clinical feedback.[^7]

The parameter \\(\tau\\) formalizes contour tolerance and must come from the task: annotation variability, editing tolerance, acquisition resolution, or a criterion defined with specialists. It also creates a cutoff: points just below and above \\(\tau\\) receive different outcomes, and the metric does not say how far beyond the limit an error lies.

In three-dimensional medical images, all these distances must respect physical spacing. In a volume with \\(0.8\times0.8\times5.0\\) mm voxels, one step in the axial plane does not equal one step between slices. Reporting "3 voxels" without a direction, or computing on a resampled array without recording the transformation, answers a different question. For surface Dice, counting boundary voxels is also insufficient: surface elements should be weighted by their physical length or area.[^6]

# What boundary metrics also leave out

My interest in boundaries also means I need to be careful about what I leave out of the evaluation. Even if an architecture reduces contour distances, I would still need to know whether it missed small objects or broke a structure that should be continuous. Error direction, object count, topology, and volume may remain invisible in a comparison restricted to distances.

## Error direction and volume

Precision and recall separate the two terms that Dice combines:

\\[
\operatorname{Precision}=\frac{TP}{TP+FP},
\qquad
\operatorname{Recall}=\frac{TP}{TP+FN}.
\\]

If missing tissue and including background have unequal costs, that asymmetry should appear in the report or in a prespecified weighted measure. Signed relative volume error,

\\[
RVE=\frac{V\_P-V\_G}{V\_G},
\\]

shows a tendency toward oversegmentation (positive) or undersegmentation (negative); multiply the result by 100 to express it as a percentage. Precision is undefined for an empty prediction; recall and RVE are undefined for an empty reference unless a declared convention is imposed. RVE should only answer a volume question: two disjoint masks can have \\(RVE=0\\). If volumetry is the outcome, absolute error in millilitres or cubic centimetres and patient-level bias are more interpretable measures; Dice is a poor proxy.[^2]

## Objects and topology

In multifocal segmentation, a Dice computed over the full volume implicitly weights each lesion by its voxel count. One large, correctly segmented mass can hide several missing small lesions. Object-level evaluation must first match predicted and reference components using a declared rule; it can then report lesion-wise recall, precision or false positives per scan, and delineation quality only for detected lesions. Recent results on metastases in PET/CT document how global metrics favour larger components.[^8]

For vessels, airways, neurons, and other network structures, connectivity may matter more than area. Centerline Dice, or clDice, intersects morphological skeletons with the masks. Here \\(S\_P\\) and \\(S\_G\\) denote the prediction and reference skeletons, not the surfaces used in the previous section:

\\[
T\_{\mathrm{prec}}=\frac{|S\_P\cap G|}{|S\_P|},
\qquad
T\_{\mathrm{sens}}=\frac{|S\_G\cap P|}{|S\_G|},
\qquad
clDice=2\frac{T\_{\mathrm{prec}}T\_{\mathrm{sens}}}{T\_{\mathrm{prec}}+T\_{\mathrm{sens}}}.
\\]

Those properties concern tubular structures under specific assumptions.[^9] For compact tumours or organs, component count, hole count, Euler characteristic, Betti numbers, or an application-specific rule may be more appropriate. The relevant topology must be defined before its measure is selected.

# When implementation changes the question

A metric value also depends on the protocol that produced it. Each case below changes the quantity being estimated.

1. **Empty masks.** If both reference and prediction are empty, the Dice formula gives \\(0/0\\); depending on the convention, the result may be one, zero, or `NaN`. If only one mask is empty, surface metrics do not have two surfaces to compare. In datasets where the structure may be absent, presence or absence should be assessed as a classification task, with delineation assessed in the applicable cases. Each metric's result for empty masks must be specified in advance. Silently removing these cases also removes false positives and can inflate the result.[^10]
2. **Decision threshold.** Turning probabilities into a mask requires a threshold. Tuning it on the test set transfers information from the final set to the model; the threshold and any post-processing should be selected on validation data and frozen before evaluation.
3. **Resampling.** Categorical masks require suitable interpolation, usually nearest neighbour. Orientation, origin, and spacing must remain aligned; resampling can smooth or move boundaries and alter precisely the metrics under study.
4. **Two or three dimensions.** Averaging Dice per slice, computing one whole-volume mask, and pooling every voxel in the dataset estimate three different quantities. The unit should follow the use case: slice, scan, structure, or patient.
5. **Aggregation.** A global Dice obtained by concatenating all voxels gives more weight to cases and classes with larger foreground masks, that is, larger \\(|P|+|G|\\). Computing by patient before summarizing respects the hierarchy of the data; classes and structures should also remain separate when an average would conceal a specific failure.[^2]
6. **Uncertainty and hard cases.** A mean without a distribution does not show tails or heterogeneity. The median and interquartile range, a patient-level bootstrap confidence interval, and strata defined before analysis&mdash;such as structure size and acquisition centre&mdash;show where a gain occurred. Qualitative cases should follow a selection rule, not convenience.
7. **Executable definition.** The name, formula, parameters, empty-case handling, unit, library, and version should be recorded. HD95 from two libraries should not be presumed identical.[^5]

# A minimum evaluation protocol

The metric set should follow the decision that segmentation will support. An initial configuration, to be narrowed or expanded for the anatomy and use case, can be organized by the questions below.

| Question | Candidate measure | What must be declared |
|---|---|---|
| How much do the regions overlap? | Dice **or** IoU | unit of analysis, classes, and per-case distribution |
| Does the prediction tend to undersegment or oversegment? | recall, precision, and RVE | positive class and relevant asymmetry |
| How far apart are the boundaries typically? | ASSD | spacing, surface extraction and weighting, and directional or pooled convention |
| What fraction of the boundary is within tolerance? | surface Dice | spacing, surface weighting, \\(\tau\\), and the tolerance's provenance |
| How large are the near-worst boundary errors? | HD95 | spacing, surface extraction and weighting, percentile, directional convention, and empty-case rule |
| Were objects missed or invented? | lesion-wise recall and precision | connectivity and matching rule |
| Was connectivity preserved? | clDice or a task-specific topology metric | skeletonization, foreground/background connectivity, empty-case rule, and why the property matters |
| Is the final volume correct? | absolute and relative volume error | physical unit and downstream use |

I would begin with the analysis unit and presence rule. I would then choose one overlap measure and add only the families tied to the intended use. Contour tolerance would be prespecified from clinical acceptability, inter-annotator variation, or an external task protocol without examining test predictions. Decision threshold and post-processing would be selected using training and validation data; empty-case rules would also be frozen before testing. Results would be computed by patient and class, with uncertainty and size stratification. Finally, I would publish the implementation or, at minimum, its executable definition and tests on known synthetic masks.

The result is an error profile distributed across several measures. Metrics Reloaded similarly recommends selecting metrics from a problem fingerprint and combining complementary families.[^2] The table becomes wider, but it shows why two models differ.

# What I take into my research

My reading so far is that I need to be clearer about what I expect from an architecture before deciding how to compare it with others.

For my problem, a claim that an architecture "improves boundaries" should answer at least three questions on the same test set: how much overlap changed, whether surface distance fell and by how many millimetres, and which structure sizes benefited. If there are multiple lesions, I would add how many were actually found. A higher Dice answers only the first.

Two questions remain open for me. Do methods designed to refine contours reduce physical distances without losing lesion-wise recall? And do apparent gains persist after stratifying by size, or are they concentrated in the large structures for which Dice is more forgiving? These are questions I would like to take into my experiments, with the evaluation rules defined before looking at test results.

# References

[^1]: REINKE, A.; TIZABI, M. D.; BAUMGARTNER, M.; et al. [Understanding metric-related pitfalls in image analysis validation](https://doi.org/10.1038/s41592-023-02150-0). *Nature Methods*, vol. 21, pp. 182&ndash;194, 2024.

[^2]: MAIER-HEIN, L.; REINKE, A.; GODAU, P.; et al. [Metrics reloaded: recommendations for image analysis validation](https://doi.org/10.1038/s41592-023-02151-z). *Nature Methods*, vol. 21, pp. 195&ndash;212, 2024.

[^3]: DICE, L. R. [Measures of the amount of ecologic association between species](https://doi.org/10.2307/1932409). *Ecology*, vol. 26, no. 3, pp. 297&ndash;302, 1945.

[^4]: TAHA, A. A.; HANBURY, A. [Metrics for evaluating 3D medical image segmentation: analysis, selection, and tool](https://doi.org/10.1186/s12880-015-0068-x). *BMC Medical Imaging*, vol. 15, art. 29, 2015.

[^5]: PODOBNIK, G.; VRTOVEC, T. [HDilemma: are open-source Hausdorff distance implementations equivalent?](https://papers.miccai.org/miccai-2024/375-Paper2469.html). In: *Medical Image Computing and Computer Assisted Intervention &mdash; MICCAI 2024*, pp. 308&ndash;317, 2024.

[^6]: NIKOLOV, S.; BLACKWELL, S.; ZVEROVITCH, A.; et al. [Clinically applicable segmentation of head and neck anatomy for radiotherapy: deep learning algorithm development and validation study](https://doi.org/10.2196/26151). *Journal of Medical Internet Research*, vol. 23, no. 7, e26151, 2021.

[^7]: ANTONELLI, M.; REINKE, A.; BAKAS, S.; et al. [The Medical Segmentation Decathlon](https://doi.org/10.1038/s41467-022-30695-9). *Nature Communications*, vol. 13, art. 4128, 2022.

[^8]: JAUS, A.; SEIBOLD, C. M.; REIß, S.; et al. [Every component counts: rethinking the measure of success for medical semantic segmentation in multi-instance segmentation tasks](https://doi.org/10.1609/aaai.v39i4.32408). In: *Proceedings of the AAAI Conference on Artificial Intelligence*, vol. 39, no. 4, pp. 3904&ndash;3912, 2025.

[^9]: SHIT, S.; PAETZOLD, J. C.; SEKUBOYINA, A.; et al. [clDice &mdash; a novel topology-preserving loss function for tubular structure segmentation](https://openaccess.thecvf.com/content/CVPR2021/html/Shit_clDice_-_A_Novel_Topology-Preserving_Loss_Function_for_Tubular_Structure_CVPR_2021_paper.html). In: *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition*, pp. 16560&ndash;16569, 2021.

[^10]: OSTMEIER, S.; AXELROD, B.; ISENSEE, F.; et al. [USE-Evaluator: performance metrics for medical image segmentation models supervised by uncertain, small or empty reference annotations in neuroimaging](https://doi.org/10.1016/j.media.2023.102927). *Medical Image Analysis*, vol. 90, art. 102927, 2023.
