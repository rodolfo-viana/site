+++
title = "Gaussian processes with variational inference for binary classification"
description = "Edited version of an article written for the Machine Learning course, taught by Prof. Dr. João Paulo Papa, in the master's program of the Graduate Program in Computer Science at Unesp"
date = "2025-12-03"
weight = 1

[taxonomies]
tags=["machine learning", "gaussian processes", "classification"]

[extra]
toc = true

+++

# Introduction

In classification problems, machine learning models are generally capable of presenting accurate point predictions; however, they often neglect the quantification of uncertainty inherent to such predictions[^1] [^2]. This limitation is particularly critical in real-world applications, where not only prediction accuracy but also reliability and uncertainty quantification are crucial for informed decision-making[^3].

In this context, Gaussian Processes (GP) represent one of the most theoretically grounded tools for probabilistic machine learning[^4]. Unlike parametric methods that assume a specific functional form, GPs assign a probability distribution over functions, such that any finite subset of sample points follows a multivariate Gaussian distribution[^5]. They thus become suitable for constructing prediction intervals, as they delimit the expected range for the true value with a specific probability.

However, exact inference in GPs for classification is computationally intractable due to the non-conjugacy between the Bernoulli likelihood and the Gaussian prior[^6]. Variational Inference (VI) emerges as an elegant solution to this problem, transforming inference into an optimization problem by approximating the true posterior distribution with a tractable variational distribution[^7]. The variational ELBO (evidence lower bound) method maximizes a lower bound of the marginal evidence, ensuring that the approximation is as close as possible to the true distribution within the chosen variational family.

We present an implementation of Gaussian Processes with Variational Inference (GP-VI) for binary classification. The approach employs the Matérn kernel[^8] with \\(\nu=1{.}5\\) to capture complex structures in the data. We use all training points as inducing points (\\(M = N\\)), prioritizing model expressiveness over computational efficiency[^9]. Experiments conducted on the Wisconsin Breast Cancer dataset[^10] demonstrate not only high predictive accuracy but also the model's ability to provide uncertainty estimates.

# Theoretical Foundation

## Gaussian Processes

A GP is a collection of random variables, any finite number of which has a joint Gaussian distribution[^4]. Formally, a GP is specified by its mean function \\(m(\mathbf{x})\\) and covariance function \\(k(\mathbf{x}, \mathbf{x'})\\), where

\\[
\begin{aligned}
m(\mathbf{x}) &= \mathbb{E}[f(\mathbf{x})] \\\\
k(\mathbf{x}, \mathbf{x'}) &= \mathbb{E}[(f(\mathbf{x}) - m(\mathbf{x}))(f(\mathbf{x'}) - m(\mathbf{x'}))].
\end{aligned}
\\]

Thus, we have \\(f(\mathbf{x}) \sim \mathcal{GP}(m, k)\\) to indicate that function \\(f\\) follows a GP with mean function \\(m\\) and covariance function \\(k\\).

Typically, \\(m(\mathbf{x}) = 0\\) is assumed for simplicity. The kernel function determines the smoothness properties and structural characteristics of functions sampled from the GP. In this work, we use the Matérn kernel[^8] with \\(\nu = 1{.}5\\), which produces once-differentiable functions, offering a balance between smoothness and flexibility.

Let \\(r = \parallel\mathbf{x} - \mathbf{x}'\parallel\\) be the Euclidean distance between two points, the Matérn kernel is defined as:

\\[
k\_{\text{Matérn}}(\mathbf{x}, \mathbf{x}') = \sigma^2 \left(1 + \frac{\sqrt{3}r}{\ell}\right) \exp\left(-\frac{\sqrt{3}r}{\ell}\right)
\\]

where \\(\ell > 0\\) is the length scale that controls the smoothness of the function, and \\(\sigma^2 > 0\\) is the scale variance that controls the amplitude of variations.

## Classification with Gaussian Processes

For binary classification, we model the latent function \\(f(\mathbf{x})\\) as a GP and connect this function to binary observations \\(y \in \{0,1\}\\) through a likelihood function. Using the Bernoulli likelihood[^5]:

\\[
p(y \mid \mathbf{x}) = \text{Bernoulli}(\sigma(f(\mathbf{x})))
\\]

where \\(\sigma(\cdot)\\) is the logistic function. The objective is to compute the posterior distribution \\(p(f \mid \mathcal{D})\\) given the dataset \\(\mathcal{D} = \{(\mathbf{x}\_i, y\_i)\}\_{i=1}^N\\).

## Variational Inference

The exact posterior \\(p(f \mid \mathcal{D})\\) is intractable due to the non-conjugacy between the Gaussian prior and the Bernoulli likelihood. Variational Inference approximates the true posterior with a tractable variational distribution \\(q(f)\\), minimizing the Kullback-Leibler divergence[^11]:

\\[
\mathcal{L}\_{\text{ELBO}} = \sum\_{i=1}^N \mathbb{E}\_{q(f\_i)}[\log p(y\_i \mid f\_i)] - \text{KL}(q(f) \parallel p(f))
\\]

Training minimizes \\(- \mathcal{L}\_{\text{ELBO}}\\), i.e., maximizes the ELBO.

## Variational Parametrization

Variational inference approximates the intractable posterior through a variational distribution \\(q(\mathbf{u})\\) over the function values at inducing points \\(\mathbf{u} = f(\mathbf{Z})\\), where \\(\mathbf{Z}\\) represents the set of inducing points[^6]. The variational distribution is parametrized as a Gaussian \\(q(\mathbf{u}) = \mathcal{N}(\mathbf{m}, \mathbf{S})\\), where \\(\mathbf{m}\\) is the mean vector and \\(\mathbf{S}\\) is the covariance matrix.

To ensure that \\(\mathbf{S}\\) remains positive definite during optimization, we use the Cholesky parametrization:

\\[
q(\mathbf{u}) = \mathcal{N}(\mathbf{m}, \mathbf{S}), \quad \mathbf{S} = \mathbf{L}\mathbf{L}^T
\\]

where \\(\mathbf{L}\\) is a lower triangular matrix. The variational parameters \\(\mathbf{m}\\) and \\(\mathbf{L}\\) are learned through ELBO maximization.

# Methodology

We implemented a variational GP model whose architecture consists of: (i) a mean module that uses a constant mean \\(m(\mathbf{x}) = c\\); (ii) a covariance module based on scaled kernel \\(k(\mathbf{x}, \mathbf{x}') = \sigma^2 k_{\text{Matérn}}(\mathbf{x}, \mathbf{x}')\\); (iii) a variational distribution \\(q(\mathbf{u})\\) parametrized via Cholesky decomposition, where we use all \\(N\\) training points as inducing points (\\(M = N = 455\\)); and (iv) a Bernoulli likelihood for binary classification.

This choice of \\(M = N\\) eliminates the sparse approximation, resulting in a more expressive model at the cost of greater computational complexity. For larger datasets, a strategy with \\(M \ll N\\) would be necessary for scalability[^9].

Training is performed by maximizing the ELBO through gradient-based optimization. The optimization process simultaneously updates: (i) kernel parameters (\\(\ell\\), \\(\sigma^2\\)); (ii) variational parameters (\\(\mathbf{m}\\), \\(\mathbf{L}\\)); and (iii) inducing point locations \\(\mathbf{Z}\\), when enabled.

To ensure numerical stability during training, we use the Cholesky parametrization for the variational covariance matrix. Additionally, we add a jitter term (\\(10^{-6}\\)) to the diagonal of covariance matrices when necessary, and gradients are computed through automatic differentiation, minimizing numerical errors.

During inference, for a test point \\(\mathbf{x}\_*\\), we compute the predictive distribution:

\\[
p(f\_{\*} \mid \mathcal{D}, \mathbf{x}\_{\*}) \approx \int p(f\_{\*} \mid \mathbf{u}) q(\mathbf{u}) \, d\mathbf{u}
\\]

This is a Gaussian distribution with mean \\(\mu\_\*\\) and variance \\(\sigma\_{\*}^2\\). The probability of the positive class is obtained by propagating this distribution through the likelihood:

\\[
p(y\_{\*}=1 \mid \mathcal{D}, \mathbf{x}\_{\*}) = \mathbb{E}\_{f\_{\*}\sim\mathcal{N}(\mu\_\*,\sigma\_{\*}^2})\big[\sigma(f\_\*)\big]
\\]

Predictive uncertainty is quantified by the standard deviation \\(\sigma_*\\) in the latent space, which reflects both epistemic uncertainty and data randomness.

## Dataset

We use the Wisconsin Breast Cancer dataset[^10] [^12]. This dataset contains 569 samples with 30 features calculated from digitized images of breast mass aspirates, with the task of classifying tumors as malignant (1) or benign (0).

The data was split into 80% training and 20% testing using stratification to maintain class proportions. All features were standardized on the training set.

## Evaluation Metrics

We evaluate the model using a comprehensive set of metrics. Classification metrics include accuracy,

\\[
\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN},
\\]

F1-Score, area under the ROC curve \\(\text{AUC-ROC} \in [0,1]\\) and area under the Precision-Recall curve \\(\text{AUPRC} \in [0,1]\\).

Calibration metrics comprise the Brier score:

\\[
\text{BS} = \frac{1}{N}\sum\_{i=1}^{N}(p\_i - y\_i)^2,
\\]

log loss, and expected calibration error (ECE).

# Experimental Results

## Classification Performance

The model achieved excellent predictive performance, with accuracy above 96% and AUC-ROC of 99.34%, indicating high discriminative capacity. The F1-Score of 97.22% demonstrates balance between precision and sensitivity. The AUPRC of 99.58% confirms robust performance even considering different decision thresholds.

<table style="margin: 0 auto; border-collapse: collapse;">
  <caption style="caption-side: top; font-weight: 600; padding: 8px 0;">
    GP-VI Model Results on Wisconsin Breast Cancer
  </caption>
  <thead>
    <tr>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Metric</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Accuracy</td><td style="border: 1px solid #ccc; padding: 8px;">96.49%</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">F1-Score</td><td style="border: 1px solid #ccc; padding: 8px;">97.22%</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">AUC-ROC</td><td style="border: 1px solid #ccc; padding: 8px;">99.34%</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">AUPRC</td><td style="border: 1px solid #ccc; padding: 8px;">99.58%</td></tr>
    <tr><td colspan="2" style="border: 0; padding: 0;"><hr style="border: none; border-top: 1px solid #ccc; margin: 0;"></td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Brier Score</td><td style="border: 1px solid #ccc; padding: 8px;">0.0355</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Log Loss</td><td style="border: 1px solid #ccc; padding: 8px;">0.1397</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">ECE</td><td style="border: 1px solid #ccc; padding: 8px;">0.3771</td></tr>
    <tr><td colspan="2" style="border: 0; padding: 0;"><hr style="border: none; border-top: 1px solid #ccc; margin: 0;"></td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Training Time</td><td style="border: 1px solid #ccc; padding: 8px;">8.19s</td></tr>
  </tbody>
</table>


The confusion matrix reveals only 4 incorrect predictions out of 114 test samples.

<figure style="width:60%; height:auto; max-width:60%; display:block; margin: 0 auto;">
  <img src="./matriz.png" style="border: 5px solid #ef5350; background-color: white">
  <figcaption style="margin-top: 1px; font-size: 0.8em; color: #555; line-height:1.5;">Confusion matrix</figcaption>
</figure>

## Probability Calibration

The Brier score of 0.0355 indicates excellent quality of predictive probabilities, with low discrepancy between predicted probabilities and real observations. The log loss of 0.1397 confirms that the model assigns high probability to the correct classes.

However, the ECE of 0.3771 reveals a significant calibration problem[^13]. ECE values above 0.1 indicate poor calibration, and an ECE above 0.3 suggests that the model is systematically over or under-confident in its predictions. This discrepancy between the low Brier score and high ECE can be explained by the nature of each metric: the Brier score is a global measure sensitive to overall probability accuracy, while ECE specifically evaluates whether calibrated probabilities reflect the actual frequency of correct predictions within each confidence bin.

The model's high precision (96.49% accuracy) combined with poor calibration suggests that the model is overly confident in its predictions, a common phenomenon in deep learning models and variational methods[^13]. Post-hoc recalibration techniques, such as temperature scaling or isotonic regression, could significantly improve ECE without compromising predictive accuracy.

## Uncertainty Analysis

The table below presents predictive uncertainty statistics, revealing an apparently counter-intuitive pattern: the average uncertainty of correct predictions (\\(1{.}024\pm0{.}156\\)) is slightly higher than that of incorrect predictions (\\(0{.}915\pm0{.}033\\)).

<table style="margin: 0 auto; border-collapse: collapse;">
  <caption style="caption-side: top; font-weight: 600; padding: 8px 0;">
    Predictive Uncertainty Statistics
  </caption>
  <thead>
    <tr>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Statistic</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Global Mean Uncertainty</td><td style="border: 1px solid #ccc; padding: 8px;">1.020</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Median Uncertainty</td><td style="border: 1px solid #ccc; padding: 8px;">1.004</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Uncertainty Standard Deviation</td><td style="border: 1px solid #ccc; padding: 8px;">0.154</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Q1</td><td style="border: 1px solid #ccc; padding: 8px;">0.906</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Q3</td><td style="border: 1px solid #ccc; padding: 8px;">1.134</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">IQR</td><td style="border: 1px solid #ccc; padding: 8px;">0.228</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Minimum Uncertainty</td><td style="border: 1px solid #ccc; padding: 8px;">0.736</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Maximum Uncertainty</td><td style="border: 1px solid #ccc; padding: 8px;">1.357</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Mean Uncertainty (Correct Predictions)</td><td style="border: 1px solid #ccc; padding: 8px;">1.024 &plusmn; 0.156</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Mean Uncertainty (Incorrect Predictions)</td><td style="border: 1px solid #ccc; padding: 8px;">0.915 &plusmn; 0.033</td></tr>
    <tr><td style="border: 1px solid #ccc; padding: 8px;">Two-tailed t-test</td><td style="border: 1px solid #ccc; padding: 8px;">t = 1.39, p = 0.168</td></tr>
  </tbody>
</table>

To assess the statistical significance of this difference, we performed an independent t-test comparing the uncertainty distributions. The test resulted in \\(t = 1{.}39\\) with \\(p = 0{.}168\\), indicating that there is no statistical evidence of a significant difference between the uncertainties of correct and incorrect predictions at the 5% significance level.

This result, although apparently counter-intuitive, can be explained by several factors. First, the reduced number of incorrect predictions (\\(n = 4\\)) limits the statistical power of the test. Second, incorrect predictions may occur in high-confidence regions due to outliers, label ambiguity, or noise in the data. Third, the model may exhibit high uncertainty in regions close to the decision boundary, where it still classifies correctly due to the 0.5 threshold. Finally, uncertainty in the latent space captures both epistemic uncertainty (lack of knowledge about the true function) and aleatoric uncertainty (intrinsic noise), making the relationship between uncertainty and prediction correctness inherently complex and not necessarily monotonic.

## Training Convergence

The ELBO loss converged smoothly from approximately 0.79 at epoch 10 to 0.202 at the final epoch, indicating stable optimization without significant oscillations. The total training time was 8.19 seconds, demonstrating the computational efficiency of the variational approach even when using all training points as inducers.

# Discussion

The results demonstrate that Gaussian Processes with Variational Inference constitute a promising approach for binary classification with uncertainty quantification. The model showed high predictive accuracy on the Wisconsin Breast Cancer dataset, with metrics above 96% in accuracy, F1-Score, AUC-ROC, and AUPRC.

The Brier score (0.0355) and log loss (0.1397) indicate good overall quality of predictive probabilities. However, the elevated ECE (0.3771) reveals a significant calibration problem, suggesting that the model is overly confident in its predictions. This is an important result that highlights the need for post-hoc recalibration techniques in applications where well-calibrated probabilities are critical.

The uncertainty analysis revealed that there is no statistically significant difference between the uncertainties of correct and incorrect predictions, indicating that the relationship between epistemic uncertainty and accuracy is more complex than initially expected. This result underscores the importance of rigorous statistical analyses when interpreting uncertainty estimates.

The variational approach with ELBO allows efficient training, with a training time of only 8.19 seconds even when using all 455 training points as inducers. This efficiency, however, does not scale well for much larger datasets.

# Conclusion

This work presented an implementation of Gaussian Processes with Variational Inference for binary classification, evaluated on the Wisconsin Breast Cancer dataset. The results demonstrate promising performance, with 96.49% accuracy and 99.34% AUC-ROC.

We identified that, despite the low Brier score, the model presents poor calibration according to ECE, revealing overconfidence in predictions. This result highlights the risk of evaluating a single calibration metric.

The statistical analysis of uncertainty revealed that there is no evidence of a significant difference between the uncertainties of correct and incorrect predictions (\\(p = 0{.}168\\)). This result emphasizes the complexity of the relationship between epistemic uncertainty and predictive performance, suggesting that simplistic interpretations of uncertainty can be misleading.

We recognize important limitations of this study. First, the results are based on a single small dataset, limiting the generalization of conclusions. Second, the choice of $M = N$ eliminates the scalability benefits of sparse approximation, making the approach impractical for datasets with tens of thousands of samples. Third, the elevated ECE indicates that the model requires recalibration before being used in critical applications where reliable probability estimates are essential.

Future work should focus on validation across multiple datasets from different domains and sizes, and systematic comparison with other probabilistic methods, such as Bayesian Dropout and Deep Ensembles. Additionally, one could investigate methods for automatic selection of inducing points for scalability (\\(M \ll N\\)) and application of recalibration techniques to improve ECE. Finally, there is room for exploration of different kernels or combinations.

# References

[^1]: Y. Gal, "Uncertainty in Deep Learning", PhD Thesis, University of Cambridge, 2016.

[^2]: V. Kuleshov, N. Fenner, and S. Ermon, "Accurate uncertainties for deep learning using calibrated regression", in *Proceedings of the 35th International Conference on Machine Learning*, vol. 80. PMLR, 2018, pp. 2796-2804.

[^3]: E. Hüllermeier and W. Waegeman, "Aleatoric and epistemic uncertainty in machine learning: an introduction to concepts and methods", in *Machine Learning*, vol. 110. Springer, 2021, pp. 457-506.

[^4]: C. E. Rasmussen and C. K. I. Williams, *Gaussian Processes for Machine Learning*. MIT Press, 2006.

[^5]: K. P. Murphy, *Machine Learning: A Probabilistic Perspective*. MIT Press, 2012.

[^6]: J. Hensman, A. Matthews, and Z. Ghahramani, "Scalable Variational Gaussian Process Classification", in *Proceedings of the 18th International Conference on Artificial Intelligence and Statistics*, vol. 38. PMLR, 2015, pp. 351-360.

[^7]: D. M. Blei, A. Kucukelbir, and J. D. McAuliffe, "Variational Inference: A Review for Statisticians", in *Journal of the American Statistical Association*, vol. 112, no. 518. Taylor \& Francis, 2017, pp. 859-877.

[^8]: B. Matérn, *Spatial Variation*, vol. 36. Springer-Verlag, 1986. (Orig. 1960).

[^9]: M. K. Titsias, "Variational Learning of Inducing Variables in Sparse Gaussian Processes", in *Proceedings of the 12th International Conference on Artificial Intelligence and Statistics*, vol. 5. PMLR, 2009, pp. 567-574.

[^10]: W. Wolberg, O. Mangasarian, N. Street and W. Street, "Breast Cancer Wisconsin (Diagnostic) [Data Set]", UCI Machine Learning Repository [Online], 1993. Available at https://archive.ics.uci.edu/. Accessed November 2, 2025.

[^11]: S. Kullback and R. A. Leibler, "On information and sufficiency", in *The Annals of Mathematical Statistics*, vol. 22, no. 1. Institute of Mathematical Statistics, 1951, pp. 79-86.

[^12]: W. H. Wolberg and O. L. Mangasarian, "Multisurface Method of Pattern Separation for Medical Diagnosis Applied to Breast Cytology", in *Proceedings of the National Academy of Sciences*, vol. 87, no. 23. National Academy of Sciences, 1990, pp. 9193-9196.

[^13]: C. Guo, G. Pleiss, Y. Sun, and K. Q. Weinberger, "On Calibration of Modern Neural Networks", in *Proceedings of the 34th International Conference on Machine Learning*, vol. 70. PMLR, 2017, pp. 1321-1330.
