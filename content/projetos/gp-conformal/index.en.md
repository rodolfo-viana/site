+++
title = "Uncertainty quantification with Gaussian processes and conformal prediction"
description = "Edited version of an article written for the Artificial Neural Networks course, by Prof. Dr. Lucas Ribas, in the master's program of the Computer Science Graduate Program at Unesp"
date = "2025-06-09"
weight = 1

[taxonomies]
tags=["machine learning", "gaussian processes", "neural networks"]

[extra]
toc = true

+++

# Introduction

In regression problems, machine learning models are generally capable of presenting rigorous point predictions; however, they often neglect the quantification of uncertainty inherent to such predictions[^1] [^2]. This limitation is particularly critical in real applications, where not only prediction accuracy, but also reliability and uncertainty quantification are crucial for informed decision-making[^3].

In this scenario, models based on Gaussian processes (GP) stand out as a robust approach[^4]. They are capable of providing not only point predictions, but also complete probability distributions for predictions[^5], allowing them to capture both epistemic and aleatoric uncertainty. Epistemic uncertainty refers to uncertainty in the model due to lack of data or knowledge, which can be reduced with more observations, while aleatoric uncertainty is inherent to the data generation process and cannot be reduced, representing the natural noise of the system[^6].

Gaussian processes assign probabilistic distribution to functions, so that any finite subset of sample points obeys a multivariate Gaussian distribution[^5]. They thus become suitable for constructing prediction intervals, as they delimit the expected range for the true value with a specific probability[^4].

In practice, however, intervals extracted directly from a GP may not deliver the desired nominal coverage[^7]. It is in this context that conformal prediction presents itself as a complementary approach[^8] [^9]. It is a statistical technique that allows calibrating prediction intervals to guarantee theoretical coverage properties, regardless of the underlying data distribution or model adequacy[^10] [^11].

A model configuration that integrates GP and conformal prediction becomes a promising approach for constructing intervals that are simultaneously informative and reliable. In this work, we investigate this configuration: we implement the Neural-Enhanced Gaussian Process (NE-GP) and the Neural-Enhanced Stochastic Variational Gaussian Process (NE-SVGP). For each of these models, we compare the performance of prediction intervals before and after applying the conformal method, in terms of coverage and interval width.

# Methodology

The implementation of the models proposed in this work follows a hybrid architecture that combines neural networks with Gaussian processes, creating the NE-GP and NE-SVGP models. This approach uses the PyTorch and GPyTorch libraries to implement a two-stage architecture: neural feature extraction followed by Gaussian probabilistic modeling.

The hybrid architecture consists of two main integrated components: a feature extractor based on multilayer perceptron (MLP) that transforms input data into higher-level representations, and a GP that operates on these extracted features to provide interval predictions. The MLP is structured with three fully connected layers: an input layer that receives the original data features, two hidden layers with 64 neurons each, applying ReLU activation functions and dropout of 0.1 for regularization, and an output layer with 32 neurons that produces the refined features.

## Exact Gaussian Processes

A GP is a family of random variables such that any finite subset follows a multivariate Gaussian distribution[^4] [^5]. This property guarantees exactness to Bayesian inference without the need to resort to numerical approximations.

Formally, a GP is specified by its mean function \\(m(\mathbf{x})\\) and covariance function \\(k(\mathbf{x}, \mathbf{x'})\\), where

\\[
\begin{aligned}
m(\mathbf{x}) &= \mathbb{E}[f(\mathbf{x})] \\\\
k(\mathbf{x}, \mathbf{x'}) &= \mathbb{E}[(f(\mathbf{x}) - m(\mathbf{x}))(f(\mathbf{x'}) - m(\mathbf{x'}))]
\end{aligned}
\\]

Thus, we have \\(f(\mathbf{x}) \sim \mathcal{GP}(m, k)\\) to indicate that function \\(f\\) follows a GP with mean function \\(m\\) and covariance function \\(k\\).

{{ video(file="/assets/GP.mp4",
         autoplay="true",
         loop="true",
         muted="true") }}

## Stochastic Variational Gaussian Process

An important limitation of exact GP is that it requires computational complexity of \\(\mathcal{O}(n^3)\\) for training and \\(\mathcal{O}(n^2)\\) for prediction, where \\(n\\) is the number of training points. Stochastic Variational Gaussian Process (SVGP) reduces these costs to \\(\mathcal{O}(nm^{2}+m^{3})\\) and \\(\mathcal{O}(m^{2})\\), respectively, by introducing a set of \\(m\\) inducing points at \\(\mathbf Z=\{\mathbf z_{j}\}_{j=1}^{m}\\), with \\(m\ll n\\)[^12] [^13] [^14] [^15].

## Conformal Prediction

Given the probabilistic nature of GP-based models, prediction intervals can be derived directly from the posterior distribution. For a confidence level \\(1-\alpha\\), the prediction interval for a new point \\(\mathbf{x}\_\*\\) is:

\\[
PI\_{1-\alpha}(\mathbf{x}\_\*) = [\mu(\mathbf{x}\_\*) - z\_{1-\alpha/2} \cdot \sigma(\mathbf{x}\_\*), \mu(\mathbf{x}\_\*) + z\_{1-\alpha/2} \cdot \sigma(\mathbf{x}\_\*)]
\\]

where \\(z\_{1-\alpha/2}\\) is the \\(1-\alpha/2\\) quantile of the standard normal distribution.

Conformal prediction[^9] [^10] is a statistical approach that allows calibrating prediction intervals to guarantee theoretical coverage properties, regardless of the underlying data distribution or model adequacy. The central idea is to use a calibration set to determine how much prediction intervals should be contracted to achieve the desired coverage.

{{ video(file="/assets/ConformalGPComparison.mp4",
         autoplay="true",
         loop="true",
         muted="true") }}

## Test Execution

We evaluated the models on three public datasets widely used in regression problems: _Combined Cycle Power Plant_[^19] (CCPP), _Concrete Compressive Strength_[^20] (Concrete), and _Condition Based Maintenance of Naval Propulsion Plants_[^21] (Naval).

| Datasets | Dimensionality | Samples | \\(y\\) Skewness | \\(y\\) Kurtosis |
| ---: | :---: | :---: | :---: | :---: |
| CCPP | 5 | 9,568 | 0.31 | 1.95 |
| Concrete | 9 | 1,030 | 0.42 | 2.69 |
| Naval | 18 | 11,934 | 0.00 | 1.80 |

To evaluate the performance of prediction intervals, we used as metrics coverage, mean prediction interval width (MPIW) and performance.

# Results

The results show interesting patterns in model behavior. First, we observe that raw prediction intervals generally have coverages significantly higher than the nominal level of 90%.

<table>
  <thead>
    <tr>
      <th rowspan="2">Model</th>
      <th rowspan="2">Dataset</th>
      <th colspan="2">Coverage (%)</th>
      <th colspan="2">MPIW</th>
      <th rowspan="2">R²</th>
    </tr>
    <tr>
      <th>Raw</th>
      <th>Conformal</th>
      <th>Raw</th>
      <th>Conformal</th>
    </tr>
  </thead>
  <tbody>
    <!-- NE-GP block -->
    <tr>
      <td rowspan="3">NE-GP</td>
      <td style="text-align:right;">CCPP</td>
      <td style="text-align:center;">99.89</td>
      <td style="text-align:center;">90.13</td>
      <td style="text-align:center;">2.64</td>
      <td style="text-align:center;">0.76</td>
      <td style="text-align:center;">0.941</td>
    </tr>
    <tr>
      <td style="text-align:right;">Concrete</td>
      <td style="text-align:center;">99.03</td>
      <td style="text-align:center;">91.55</td>
      <td style="text-align:center;">2.72</td>
      <td style="text-align:center;">1.47</td>
      <td style="text-align:center;">0.796</td>
    </tr>
    <tr>
      <td style="text-align:right;">Naval</td>
      <td style="text-align:center;">100.00</td>
      <td style="text-align:center;">89.38</td>
      <td style="text-align:center;">2.66</td>
      <td style="text-align:center;">0.83</td>
      <td style="text-align:center;">0.933</td>
    </tr>
    <!-- NE-SVGP block -->
    <tr>
      <td rowspan="3">NE-SVGP</td>
      <td style="text-align:right;">CCPP</td>
      <td style="text-align:center;">90.93</td>
      <td style="text-align:center;">90.13</td>
      <td style="text-align:center;">0.76</td>
      <td style="text-align:center;">0.75</td>
      <td style="text-align:center;">0.945</td>
    </tr>
    <tr>
      <td style="text-align:right;">Concrete</td>
      <td style="text-align:center;">98.83</td>
      <td style="text-align:center;">90.87</td>
      <td style="text-align:center;">2.14</td>
      <td style="text-align:center;">1.18</td>
      <td style="text-align:center;">0.877</td>
    </tr>
    <tr>
      <td style="text-align:right;">Naval</td>
      <td style="text-align:center;">96.65</td>
      <td style="text-align:center;">90.26</td>
      <td style="text-align:center;">0.52</td>
      <td style="text-align:center;">0.39</td>
      <td style="text-align:center;">0.984</td>
    </tr>
  </tbody>
</table>

The table shows that, in the case of NE-GP, raw prediction coverages vary from 99.03% to 100.00%, while for NE-SVGP they vary from 90.93% to 98.83%. This indicates that raw prediction intervals are frequently overly conservative, resulting in higher than necessary coverage.

After applying the conformal method, coverages are consistently adjusted to values close to 90%, which is the desired nominal coverage level. This result confirms the effectiveness of conformal prediction in calibrating prediction intervals to achieve desired coverage, regardless of model or dataset.

<img src="./combined_models_all_datasets.png" style="border: 5px solid #ef5350; width:100%; height:auto; max-width:100%;">

The figure illustrates the trade-off between coverage and interval width. With NE-GP, across all datasets, conformal calibration reduces coverage to approximately 90%, while also reducing interval width. The effect is particularly pronounced in the CCPP dataset, where mean width is reduced from 2.64 to 0.76, a reduction of 71.2%, while coverage goes from 99.89% to 90.13%.

# Conclusion

This work investigated in depth the integration of Gaussian processes enhanced by neural networks with conformal prediction as a strategy for calibrating prediction intervals. The results obtained on three datasets of diverse nature show that conformation provides substantial gains both in statistical reliability and informational efficiency.

Before calibration, raw intervals exhibited coverages much higher than the nominal level of 90%, reaching 100% in NE-GP for the Naval dataset and 99.89% in CCPP. This excess coverage, while seeming desirable at first glance, reveals excessively wide and therefore not very useful intervals in practice. The application of conformal prediction systematically adjusted coverage to values very close to 90%, confirming, in practice, the theoretical guarantees of the method.

The efficiency of this adjustment was directly reflected in the mean width of intervals. In the most expressive scenario, CCPP with NE-GP suffered a 71.2% reduction in width after calibration, from 2.64 to 0.76 units, without compromising the required hit rate.

These findings highlight a central point: conformal calibration not only corrects coverage, but also tends to remove statistical redundancy, compressing intervals to the limit necessary to preserve the confidence level. In other words, it transforms superabundant uncertainty into useful information.

# References

[^1]: GAL, Y. *Uncertainty in deep learning*. Thesis (PhD) — University of Cambridge, Cambridge, 2016.

[^2]: KULESHOV, V.; FENNER, N.; ERMON, S. Accurate uncertainties for deep learning using calibrated regression. In: *International Conference on Machine Learning*, 35., 2018, p. 2796–2804.

[^3]: HÜLLERMEIER, E.; WAEGEMAN, W. Aleatoric and epistemic uncertainty in machine learning: an introduction to concepts and methods. *Machine Learning*, v. 110, n. 3, p. 457–506, 2021.

[^4]: RASMUSSEN, C. E.; WILLIAMS, C. K. I. *Gaussian processes for machine learning*. Cambridge, MA: MIT Press, 2005.

[^5]: MURPHY, K. P. *Machine learning: a probabilistic perspective*. Cambridge, MA: MIT Press, 2012.

[^6]: KENDALL, A.; GAL, Y. What uncertainties do we need in Bayesian deep learning for computer vision? In: *Proceedings of the 31st Annual Conference on Neural Information Processing Systems (NIPS'17)*, Long Beach, CA, USA, p. 5580–5590, 2017.

[^7]: ANGELOPOULOS, A. N.; BATES, S. A gentle introduction to conformal prediction and distribution-free uncertainty quantification. *arXiv preprint arXiv:2107.07511*, 2022.

[^8]: BALASUBRAMANIAN, V.; HO, S.-S.; VOVK, V. *Conformal prediction for reliable machine learning: theory, adaptations and applications*. 1. ed. San Francisco: Morgan Kaufmann Publishers Inc., 2014.

[^9]: VOVK, V.; GAMMERMAN, A.; SHAFER, G. *Algorithmic learning in a random world*. New York, NY: Springer, 2005.

[^10]: SHAFER, G.; VOVK, V. A tutorial on conformal prediction. *The Journal of Machine Learning Research*, v. 9, p. 371–421, 2008.

[^11]: LEI, J.; G'S ELL, M.; RINALDO, A.; TIBSHIRANI, R. J.; WASSERMAN, L. Distribution-free predictive inference for regression. *Journal of the American Statistical Association*, v. 113, n. 523, p. 1094–1111, 2018.

[^12]: QUINONERO-CANDELA, J.; RASMUSSEN, C. E. A unifying view of sparse approximate Gaussian process regression. *Journal of Machine Learning Research*, v. 6, n. 65, p. 1939–1959, 2005.

[^13]: SNELSON, E.; GHAMRAMANI, Z. Sparse Gaussian processes using pseudo-inputs. In: *Advances in Neural Information Processing Systems*, v. 18, p. 1257–1264, 2005. MIT Press.

[^14]: TITSIAS, M. Variational learning of inducing variables in sparse Gaussian processes. In: *Proceedings of the Twelfth International Conference on Artificial Intelligence and Statistics*, 5., Clearwater, FL: PMLR, p. 567–574, 2009.

[^15]: HENSMAN, J.; FUSI, N.; LAWRENCE, N. D. Gaussian processes for big data. In: *Proceedings of the Twenty-Ninth Conference on Uncertainty in Artificial Intelligence*, Bellevue, WA; Arlington, VA: AUAI Press, p. 282–290, 2013.

[^19]: TFEKCI, P.; KAYA, H. Combined cycle power plant. UCI Machine Learning Repository, 2014.

[^20]: YEH, I.-C. Concrete compressive strength. UCI Machine Learning Repository, 1998.

[^21]: CORADDU, A.; ONETO, L.; GHIO, A.; SAVIO, S.; ANGIUTA, D.; FIGARI, M. Condition based maintenance of naval propulsion plants. UCI Machine Learning Repository, 2014.
