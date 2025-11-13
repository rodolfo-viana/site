+++
title = "Comparative Analysis of U-Net Architectures for Polyp Segmentation in Colonoscopy"
description = "Edited version of a paper written for the Deep Learning course, taught by Prof. Denis Henrique Pinheiro Salvadeo, PhD., in the master's program of the Graduate Program in Computer Science at Unesp"
date = "2025-11-13"
weight = 1

[taxonomies]
tags=["machine learning", "u-net", "neural networks", "medicine"]

[extra]
toc = true

+++

# Introduction

Colorectal cancer is one of the most prevalent tumors worldwide, accounting for approximately 10\% of cases and over 930,000 annual deaths[^1]. The progression from adenomatous polyps to carcinoma typically takes between 10 and 15 years, offering a wide window for prevention through early detection and removal[^2]; however, the detection rate during colonoscopy varies widely, especially due to differences in polyp morphology[^3].

In this context, data science, particularly machine learning, has much to offer. Polyp segmentation can be treated as a pixel-by-pixel classification problem. Such work is challenging due to the morphological heterogeneity of lesions, low contrast between polyp tissue and adjacent mucosa, and variable lighting conditions in endoscopy; however, advances in convolutional neural networks have driven significant improvements in segmentation accuracy, surpassing traditional methods based on manual features[^4] [^5].

In this scenario, U-Net has established itself as the state-of-the-art for such tasks through an encoder-decoder scheme with skip connections[^6].

<img src="./unet.png" style="border: 5px solid #ef5350; width:75%; height:auto; max-width:75%; display:block; margin: 0 auto;">

However, its limitations have motivated variants aimed at improving representation fusion and feature selectivity. This work performs systematic comparisons under controlled experimental conditions, comparing five architectures in polyp segmentation using the Kvasir-SEG dataset[^7].

# Related Work

Automated polyp segmentation has evolved significantly from classical methods to specialized deep architectures. Initial approaches relied on manual features and traditional computer vision techniques. Bernal et al.[^3] proposed WM-DOVA maps combining intensity and shape information, while Tajbakhsh et al.[^5] employed shallow convolutional networks with contextual features for detection in colonoscopy videos.

The introduction of fully convolutional networks (FCN)[^8] revolutionized semantic segmentation by eliminating final dense layers and enabling pixel-by-pixel predictions. Brandão et al.[^4] adapted FCNs for polyp segmentation, demonstrating superiority over traditional methods but still facing difficulties with imprecise edges and morphological variations. The U-Net architecture[^6], with its encoder-decoder paradigm and skip connections, became the reference for biomedical segmentation by preserving spatial information at multiple scales.

Various U-Net extensions have been proposed for polyp segmentation. Zhou et al.[^9] introduced nested dense connections to reduce semantic gaps, while Oktay et al.[^10] incorporated spatial attention mechanisms. Jha et al.[^11] proposed DoubleU-Net, combining two encoder-decoder paths with ASPP (Atrous Spatial Pyramid Pooling) blocks, achieving a Dice score of 82.3\% on Kvasir-SEG.

Recent approaches explore sophisticated attention mechanisms and multi-scale aggregation. Fan et al.[^12] developed PraNet with parallel reverse attention, reporting 89.8\% Dice on Kvasir-SEG. Fang et al.[^13] proposed selective feature aggregation with area-boundary constraints, while Zhang et al.[^14] introduced adaptive context selection to handle morphological variability. Srivastava et al.[^15] proposed MSRF-Net with multi-scale residual fusion.

More recent work investigates transformers for medical segmentation. Valanarasu et al.[^16] introduced Medical Transformer with axial attention, demonstrating competitiveness with CNNs. Huang et al.[^17] proposed HarDNet-MSEG, achieving Dice scores above 90\% at 86 FPS, balancing accuracy and computational efficiency.

Despite advances, direct comparisons are hindered by methodological variations: different data partitions, augmentation strategies, loss functions, and hyperparameters. Many works report results on multiple datasets but lack rigorous statistical analysis. This study addresses these gaps through systematic comparison of five fundamental U-Net architectures under controlled experimental conditions, with multiple seeds for variance analysis, providing a reproducible benchmark for the domain.

# Theoretical Foundations of U-Net Architectures

U-Net establishes the encoder-decoder paradigm with skip connections for biomedical segmentation[^6]. The encoder captures multi-scale semantic information through successive convolutions and pooling, while skip connections concatenate features from encoder to decoder, preserving spatial details.

Let \\(x\in\mathbb{R}^{H\times W\times C}\\) be an input image and \\(y\in{\{0,1\}}^{H\times W}\\) its binary reference mask. The network implements a mapping \\(f:\mathbb{R}^{H\times W\times C}\rightarrow[0,1]^{H\times W}\\) whose threshold at 0.5 produces \\(\hat{y}\in{\{0,1\}}^{H\times W}\\). At each encoder level \\(l\\), the number of channels (width) follows \\(c\_l = c\_0\cdot 2^{l}\\).

## U-Net++: Nested Dense Connections

U-Net++ addresses the semantic gap of U-Net through nested convolutional blocks[^9]. In U-Net, skip connections concatenate semantically distant features (low level in encoder, high level in decoder). U-Net++ resolves this by gradually connecting features through dense paths. Each node \\(\mathbf{X}^{i,j}\\) is

\\[
\begin{aligned}
\mathbf{X}^{i,j} = \begin{cases}
\mathcal{H}(\mathbf{X}^{i,j-1}), & j = 0 \\\\
\mathcal{H}\left(\left[\left[\mathbf{X}^{i,k}\right]\_{k=0}^{j-1}, \mathcal{U}(\mathbf{X}^{i+1,j-1})\right]\right), & j > 0,
\end{cases}
\end{aligned}
\\]

where \\(i\\) indexes resolution, \\(j\\) connection density, \\(\mathcal{H}(\cdot)\\) convolution, \\(\mathcal{U}(\cdot)\\) upsampling, \\([[\cdot]]\\) concatenation. This progressively reduces the semantic gap through successive transformations.

In addition to U-Net++, we also adopt a version with deep supervision, which adds multi-scale supervision \\(\mathcal{L}\_{\text{total}} = \sum\_{j=1}^{J} \omega\_j \mathcal{L}(\mathbf{y}, \mathbf{\hat{y}}^{(j)})\\), mitigating vanishing gradients and accelerating convergence.

## Attention U-Net: Spatial Attention Mechanisms

Attention U-Net incorporates attention gates that spatially weight features before concatenation[^10], suppressing irrelevant information transmitted by skip connections. Given \\(\mathbf{x}\\) from the encoder and gating signal \\(\mathbf{g}\\) from the decoder, attention coefficients are

\\[
\hat{\mathbf{x}} = \sigma\_2\left(\psi^T \sigma\_1(\mathbf{W}\_x^T \mathbf{x} + \mathbf{W}\_g^T \mathbf{g})\right) \odot \mathbf{x}
\\]

where \\(\sigma\_1\\) and \\(\sigma\_2\\) are ReLU and sigmoid respectively, allowing suppression of irrelevant regions and emphasis of salient structures.

## ResU-Net: Residual Connections for Deeper Networks

ResU-Net integrates the U-Net architecture with residual blocks inspired by ResNet[^18], addressing the performance degradation that occurs when training very deep networks[^19]. While standard U-Net uses double convolution blocks, ResU-Net replaces these blocks with residual blocks that implement identity connections. A residual block learns a residual function \\(\mathcal{F}(\mathbf{x})\\) instead of the desired direct mapping \\(\mathcal{H}(\mathbf{x})\\), through the shortcut connection

\\[
\mathbf{y} = \mathcal{F}(\mathbf{x}, \{W\_i\}) + \mathbf{x},
\\]

where \\(\mathbf{x}\\) and \\(\mathbf{y}\\) are input and output vectors, and \\(\mathcal{F}(\mathbf{x}, \{W\_i\})\\) represents the residual transformation to be learned. This architecture facilitates training deeper networks by allowing the model to learn incremental transformations instead of complete mappings, resulting in better gradient propagation and potential for capturing richer representations.

# Methodology

## Dataset and Preprocessing

Kvasir-SEG[^7] contains 1,000 colonoscopy images with pixel-by-pixel segmentation masks and bounding boxes, covering wide diversity in polyp size and shape. Images have varying resolutions (from 332\\(\times\\)487 to 1920\\(\times\\)1072), and are resized to 256\\(\times\\)256 pixels and normalized with ImageNet statistics. The partition considers 80\% of images for training, 10\% for validation, 10\% for testing.

## Implementation and Training

Our study examines five U-Net variants: standard U-Net (double 3\\(\times\\)3 convolution blocks, batch normalization, ReLU, five levels with \\(\{64, 128, 256, 512, 512\}\\) channels); U-Net++ (nested dense paths, with and without deep supervision); Attention U-Net (with attention gates); ResU-Net (residual blocks with identity connections, five levels with \\(\{64, 128, 256, 512, 512\}\\) channels).

All models were trained for a maximum of 100 epochs, with batch size 8, using AdamW optimizer (initial learning rate \\(10^{-4}\\), weight decay \\(10^{-5}\\)). Learning rate scheduling used 5 warmup epochs followed by reduction on plateau (factor 0.5, patience 5, minimum rate \\(10^{-6}\\)). The combined loss function is \\(\mathcal{L} = 0{,}4 \mathcal{L}\_{\text{BCE}} + 0{,}6 \mathcal{L}\_{\text{Dice}}\\). Augmentation includes flips, rotation, affine transformations, color jitter, Gaussian blur. Training adopts early stopping monitoring validation Dice score with patience of 10 epochs, stopping when no improvement occurs. To ensure reproducibility, each architecture was trained with three random seeds (42, 123, 456).

## Evaluation Metrics and Statistical Analysis

Our evaluation framework employs five complementary metrics that capture different aspects of segmentation performance, providing a comprehensive appreciation of model capabilities in various clinical scenarios, using information from false negatives (FN), false positives (FP), true positives (TP), and true negatives (TN).

The Dice Similarity Coefficient (Dice score) measures regional overlap between predicted \\(P\\) and ground truth \\(V\\) segmentations — for pixel-wise binary segmentation, the Dice score is equivalent to the F1 score. It is obtained with

\\[
\frac{2 \mid P \cap V \mid}{\mid P \mid + \mid V \mid}.
\\]

The Jaccard Index (Intersection over Union, or IoU) provides an alternative overlap measure from

\\[
\frac{\mid P \cap V \mid}{\mid P \cup V \mid}.
\\]

In addition to these main metrics, we calculate sensitivity, which measures the model's ability to detect polyp pixels; specificity, which quantifies the proportion of non-polyp pixels correctly identified; and precision, which evaluates the proportion of positive predictions that are correct.

# Results

Standard U-Net achieved the best overall performance (Dice: 83.66\\(\pm\\)0.52\%, IoU: 75.65\\(\pm\\)0.29\%), demonstrating remarkable consistency with the lowest standard deviation among the three seeds. U-Net++ with deep supervision obtained comparable performance (Dice: 83.48\\(\pm\\)0.89\%), presenting the highest sensitivity (89.39\\(\pm\\)0.88\%), indicating superior capability for detecting polyp pixels.

| Architecture     | Dice<br>(\%) | IoU<br>(\%) | Sensit.<br>(\%) | Specif.<br>(\%) | Precision<br>(\%) |
|-----------------|:------------:|:-----------:|:---------------:|:----------------:|:----------------:|
| U-Net           | 83.66\\(\pm\\)0.52 | 75.65\\(\pm\\)0.29 | 88.36\\(\pm\\)0.83 | 97.28\\(\pm\\)0.22 | 84.76\\(\pm\\)0.27 |
| U-Net++         | 82.24\\(\pm\\)1.33 | 73.64\\(\pm\\)1.46 | 87.52\\(\pm\\)2.51 | 97.22\\(\pm\\)0.57 | 83.24\\(\pm\\)1.03 |
| U-Net++ (DS)    | 83.48\\(\pm\\)0.89 | 75.46\\(\pm\\)1.03 | 89.39\\(\pm\\)0.88 | 97.13\\(\pm\\)0.30 | 83.42\\(\pm\\)1.09 |
| Attention U-Net | 82.24\\(\pm\\)0.23 | 73.63\\(\pm\\)0.16 | 88.74\\(\pm\\)0.67 | 96.82\\(\pm\\)0.06 | 82.01\\(\pm\\)0.12 |
| ResU-Net        | 82.43\\(\pm\\)0.52 | 73.85\\(\pm\\)0.88 | 86.60\\(\pm\\)0.63 | 97.52\\(\pm\\)0.28 | 84.35\\(\pm\\)1.06 |

ResU-Net, incorporating residual connections, obtained Dice of 82.43\\(\pm\\)0.52\% and stood out with the highest specificity (97.52\\(\pm\\)0.28\%), indicating excellent capability to reject false detections. Standard U-Net++ and Attention U-Net presented similar performance (Dice: 82.24\%), with Attention U-Net exhibiting slightly lower specificity (96.82\%), suggesting that attention mechanisms may occasionally compromise non-polyp tissue discrimination.

All architectures maintained specificity above 96.8\%, essential for clinical applications where false positives reduce endoscopist confidence. Standard U-Net also achieved the best precision (84.76\\(\pm\\)0.27\%), confirming its robustness. Results reveal that simpler architectures can offer competitive performance with greater consistency, questioning the cost-benefit of complex architectural modifications for this specific domain.

## Comparative Performance Analysis by Context

Analysis of architecture performance in the three distinct contexts (training, validation, and test) presented in the figure below reveals fundamental patterns about model generalization behavior. All architectures present a clear performance hierarchy, confirming the progressive task difficulty and adequate methodology.

<img src="./graph.png" style="border: 5px solid #ef5350; width:75%; height:auto; max-width:75%; display:block; margin: 0 auto;">

Standard U-Net demonstrates excellent consistency between validation and test, with minimal gap (\\(\sim\\)1.5 pp.), indicating robust generalization capability. Its low variability between seeds, visible in compact boxplots, suggests stable and predictable training — a desirable characteristic for clinical applications where reproducibility is critical.

U-Net++ with deep supervision presents similar behavior, maintaining good consistency and reduced gap between validation and test. The multi-scale supervision strategy effectively contributes to training stabilization, resulting in elevated sensitivity without significantly sacrificing other metrics. ResU-Net exhibits intermediate variability, with residual connections providing stable training but without decisive advantages in final performance.

Attention U-Net and standard U-Net++ show slightly larger gaps between validation and test, with Attention U-Net occasionally presenting lower specificity. This behavior questions the effectiveness of spatial attention mechanisms for this domain, suggesting that additional selectivity may not be necessary or may even be counterproductive when the object of interest presents great morphological variability.

## Qualitative Analysis of Segmentation Results

Visual inspection of predictions, as shown in the figure below, reveals significant and clinically relevant differences between architectures, particularly in challenging cases. The analysis considers five representative cases that expose distinct performance characteristics of the architectures.

<figure style="width:85%; height:auto; max-width:85%; display:block; margin: 0 auto;">
  <img src="./mask_comparison.png" style="border: 5px solid #ef5350;">
  <figcaption style="margin-top: 1px; font-size: 0.8em; color: #555; line-height:1.5;">From left to right: original image, ground truth, predictions from U-Net, U-Net++, U-Net++ with deep supervision, Attention U-Net, ResU-Net
  </figcaption>
</figure>

The first row shows a pedunculated polyp with right lateral lobe; only U-Net++ and U-Net++ with deep supervision recover this extension, reproducing the complete morphology. U-Net, Attention U-Net, and ResU-Net restrict themselves to the main body; among those covering integrally, the variant with deep supervision is the most consistent, with a discrete peripheral halo.

In the second row, with shiny mucosa, low contrast, and reflections, all architectures exhibit some degree of leakage or halo. U-Net and U-Net++ (standard and with deep supervision) expand the predicted area, but with diffuse contours; Attention U-Net and ResU-Net mitigate leakages but still lose definition in poorly lit edges. None fully reproduces the annotated contour.

The third row presents a small target near the wall and transition to dark lumen. U-Net undersegments; U-Net++ better approximates the shape; U-Net++ with deep supervision stabilizes the mask. Attention U-Net and ResU-Net provide the cleanest predictions, with fewer false positives in the background.

The fourth row represents a favorable case: clean visual field, relatively homogeneous background, and well-defined polyp boundaries. All achieve high accuracy, with only incremental gains. U-Net++ (with and without deep supervision) refines regularity; Attention U-Net avoids leakages; ResU-Net practically coincides with the ground truth.

Finally, the fifth row includes occlusion by instrument and deep shadows. U-Net undersegments at the base; U-Net++ improves continuity but creates an over-segmentation "collar"; U-Net++ with deep supervision recovers volume, rounding the occluded region. Attention U-Net and ResU-Net prove more robust, preserving lesion mass and continuity.

Architectural differences emerge especially in challenging cases. U-Net and U-Net++ are more susceptible to leakages and edge imprecision; deep supervision attenuates such effects modestly and not universally. In the examples, the incidence of false positives is low in complex backgrounds, which is clinically promising; nevertheless, such impressions must be corroborated by quantitative metrics on the complete dataset.

# Conclusion

This study compared five U-Net architecture variants for polyp segmentation in colonoscopy. Standard U-Net achieved the best overall performance (Dice: 83.66\\(\pm\\)0.52\%), demonstrating that architectural simplicity and consistency can be advantageous. Its low standard deviation indicates stable and reproducible training, an essential characteristic for clinical applications where predictability is crucial.

U-Net++ with deep supervision obtained comparable performance (Dice: 83.48\\(\pm\\)0.89\%) and higher sensitivity (89.39\%), suggesting that multi-scale supervision can improve polyp detection without compromising other metrics. ResU-Net stood out in specificity (97.52\%), indicating that residual connections contribute to better non-polyp tissue discrimination, though without decisive advantages in Dice score.

Standard U-Net++ and Attention U-Net presented similar but inferior performance (Dice: 82.24\%). The absence of significant gains for Attention U-Net questions the effectiveness of spatial attention mechanisms in this domain, especially considering the additional complexity. Results suggest that polyp characteristics — high morphological variability and low contrast — may not benefit from additional spatial selectivity.

All architectures maintained specificity above 96.8\%, essential for clinical acceptance where false positives reduce endoscopist confidence. Primary differences manifest in sensitivity and edge delineation, critical metrics for precise endoscopic interventions. Results highlight the value of well-calibrated fundamental architectures and question the cost-benefit of complex architectural modifications for polyp segmentation.

# Future Work

This study establishes promising directions for future research in automated polyp segmentation. First, cross-validation on additional datasets (CVC-ClinicDB, ETIS-Larib, CVC-ColonDB) would strengthen the generalization of findings and reveal possible biases specific to Kvasir-SEG. Evaluation on data from multiple hospital centers, with different endoscopic equipment and acquisition protocols, is essential to verify clinical robustness.

Future work should incorporate computational cost analysis, including number of parameters, inference time, and memory consumption. Such metrics are critical for deployment in real-time diagnostic aid systems during colonoscopy. Comparison with recent transformer-based architectures and hybrid CNN-transformer methods also merits investigation, considering the balance between accuracy and computational efficiency demonstrated by HarDNet-MSEG[^17].

Statistical analysis can be expanded through paired significance tests (Student's t-test, Wilcoxon test) to determine if observed differences between architectures are statistically significant. Confidence intervals would complement variance analysis between seeds, providing more robust estimates of model uncertainty.

Alternative training strategies merit systematic exploration. Investigation of different loss functions (Focal Loss, Tversky Loss, Boundary Loss) may improve edge delineation, a persistent challenge observed in qualitative analysis. Ensemble techniques combining predictions from multiple architectures may increase robustness, particularly in challenging cases with low contrast or occlusions.

Finally, prospective clinical studies with endoscopists evaluating automatic systems in real scenarios are fundamental for translational validation. User-centered metrics, including procedure time, adenoma detection rate, and clinical acceptability, should complement purely technical metrics to guide development of clinically useful and safe systems.

# Note on AI Use

The authors declare that no generative artificial intelligence tool was used for study conception, code creation, results analysis, illustration generation, or article writing, except for spelling and grammatical review, for which Claude Opus 4.1 was used.

# References

[^1]: World Health Organization, "Colorectal cancer", https://www.who.int/news-room/fact-sheets/detail/colorectal-cancer, Jul. 2023, online. Accessed September 25, 2025.

[^2]: D. A. Corley, C. D. Jensen, A. R. Marks, W. K. Zhao, J. K. Lee, C. A. Doubeni, A. G. Zauber, J. de Boer, B. H. Fireman, J. E. Schottinger, and T. R. Levin, "Adenoma detection rate and risk of colorectal cancer and death", *The New England Journal of Medicine*, vol. 370, no. 14, pp. 1298–1306, 2014.

[^3]: J. Bernal, F. J. Sánchez, G. Fernández-Esparrach, D. Gil, C. Rodríguez, and F. Vilariño, "WM-DOVA maps for accurate polyp highlighting in colonoscopy: Validation vs. saliency maps from physicians", *Computerized Medical Imaging and Graphics*, vol. 43, pp. 99–111, 2015.

[^4]: P. Brandão, E. Mazomenos, G. Ciuti, R. Caliò, F. Bianchi, A. Menciassi, P. Dario, A. Koulaouzidis, A. Arezzo, and D. Stoyanov, "Fully convolutional neural networks for polyp segmentation in colonoscopy", in *Medical Imaging 2017: Computer-Aided Diagnosis, ser. Proceedings of SPIE*, vol. 10134, Orlando, FL, USA, 2017.

[^5]: N. Tajbakhsh, S. R. Gurudu, and J. Liang, "Automated polyp detection in colonoscopy videos using shape and context information", *IEEE Transactions on Medical Imaging*, vol. 35, no. 2, pp. 630–644, 2016.

[^6]: O. Ronneberger, P. Fischer, and T. Brox, "U-net: Convolutional networks for biomedical image segmentation", in *Medical Image Computing and Computer-Assisted Intervention - MICCAI 2015, ser. Lecture Notes in Computer Science*, vol. 9351. Cham: Springer, 2015, pp. 234–241.

[^7]: D. Jha, P. H. Smedsrud, M. A. Riegler, P. Halvorsen, T. de Lange, D. Johansen, and H. D. Johansen, "Kvasir-SEG: A segmented polyp dataset", in *MultiMedia Modeling (MMM 2020), Proceedings, Part II, ser. Lecture Notes in Computer Science*, vol. 11962. Cham: Springer, 2020, pp. 451–462.

[^8]: E. Shelhamer, J. Long, and T. Darrell, "Fully convolutional networks for semantic segmentation", *IEEE Transactions on Pattern Analysis and Machine Intelligence*, vol. 39, no. 4, pp. 640–651. 2017.

[^9]: Z. Zhou, M. M. Rahman Siddiquee, N. Tajbakhsh, and J. Liang, "Unet++: A nested u-net architecture for medical image segmentation", in *4th International Workshop, DLMIA 2018, and 8th International Workshop, ML-CDS 2018, Held in Conjunction with MICCAI 2018*, vol. 11045, 2018, pp. 3–11.

[^10]: O. Oktay, J. Schlemper, L. L. Folgoc, M. Lee, M. Heinrich, K. Misawa, K. Mori, S. McDonagh, N. Y. Hammerla, B. Kainz et al., "Attention u-net: Learning where to look for the pancreas", arXiv preprint arXiv:1804.03999, 2018.

[^11]: D. Jha, P. H. Smedsrud, M. A. Riegler, H. D. Johansen, T. de Lange, P. Halvorsen, and D. Johansen, "DoubleU-Net: A deep convolutional neural network for medical image segmentation", in *2020 IEEE 33rd International Symposium on Computer-Based Medical Systems (CBMS)*. IEEE, 2020, pp. 558–564.

[^12]: D.-P. Fan, G.-P. Ji, T. Zhou, G. Chen, H. Fu, J. Shen, and L. Shao, "PraNet: Parallel reverse attention network for polyp segmentation", in *Medical Image Computing and Computer-Assisted Intervention – MICCAI 2020*. Springer International Publishing, 2020, pp. 263–273.

[^13]: Y. Fang, C. Chen, Y. Yuan, and K.-y. Tong, "Selective feature aggregation network with area-boundary constraints for polyp segmentation", in *Medical Image Computing and Computer-Assisted Intervention – MICCAI 2019*. Springer International Publishing, 2019, pp. 302–310.

[^14]: R. Zhang, G. Li, Z. Li, S. Cui, D. Qian, and Y. Yu, "Adaptive context selection for polyp segmentation", in *Medical Image Computing and Computer-Assisted Intervention – MICCAI 2020*. Springer International Publishing, 2020, pp. 253–262.

[^15]: A. Srivastava, D. Jha, S. Chanda, U. Pal, H. D. Johansen, D. Johansen, M. A. Riegler, S. Ali, and P. Halvorsen, "MSRF-Net: A multi-scale residual fusion network for biomedical image segmentation", *IEEE Journal of Biomedical and Health Informatics*, vol. 26, no. 5, pp. 2252–2263, 2022.

[^16]: J. M. J. Valanarasu, P. Oza, I. Hacihaliloglu, and V. M. Patel, "Medical transformer: Gated axial-attention for medical image segmentation", in *Medical Image Computing and Computer-Assisted Intervention – MICCAI 2021*. Springer International Publishing, 2021, pp. 36–46.

[^17]: C.-H. Huang, H.-Y. Wu, and Y.-L. Lin, "HarDNet-MSEG: A simple encoder-decoder polyp segmentation neural network that achieves over 0.9 mean dice and 86 fps", arXiv preprint arXiv:2101.07172, 2021.

[^18]: K. He, X. Zhang, S. Ren, and J. Sun, "Deep residual learning for image recognition", in *2016 IEEE Conference on Computer Vision and Pattern Recognition (CVPR)*. IEEE, 2016, pp. 770–778.

[^19]: Z. Zhang, Q. Liu, and Y. Wang, "Road extraction by deep residual u-net", *IEEE Geoscience and Remote Sensing Letters*, vol. 15, no. 5, pp. 749–753, 2018.
