+++
title = "Anomaly detection in São Paulo state deputies' expenses using K-Means"
description = "Edited version of my MBA final project in Data Science and Analytics at USP-Esalq, supervised by Prof. Dr. Ana Julia Righetto, defended in January 2024"
date = "2023-09-01"
updated = "2023-11-16"
weight = 9

[taxonomies]
tags=["machine learning", "k-means"]

[extra]
toc = true

+++

# Introduction

Each of the 94 parliamentarians of the Legislative Assembly of the State of São Paulo [Alesp] is entitled to General Office Assistance and Accommodation Assistance, collectively referred to as "office allowance". This right was conferred by resolution 783, article 11, of July 1, 1997[^1]. This is a monthly amount due by the State to deputies so they can be reimbursed for expenses with the operation and maintenance of offices, accommodation and other expenses inherent to the full exercise of parliamentary activities.

These expenses provided for in the legislation are aggregated into 11 categories, including graphic materials and services, consulting, fuel, car rental, accommodation and food. In 2022, considering the maximum limit of the office allowance at 1,250 fiscal units of the State of São Paulo [Ufesp][^1] and the Ufesp value at R$ 31.97[^2], the monthly limit of the office allowance that could be reimbursed per deputy last year was R$ 39,962.50.

That year, the total amount committed to fund the office allowance reached R$ 26,652,243.51[^3]. The amount was 24.43% higher than the sum in 2021, of R$ 21,419,316.88[^3], and lower than the amount recorded in the budget line for 2023, of R$ 28,607,099.96[^3]. If this amount is fulfilled this year, it will be the first time the value exceeds R$ 28.5 million since 2018.

Such sums of public resources are scrutinized by control agencies, such as the State Court of Accounts and the São Paulo Public Prosecutor's Office, which not infrequently open procedures to investigate the legality of the reimbursement process to parliamentarians. An example is investigative process 29.0001.0246360.2021-54[^4], initiated on May 5, 2022, which discusses possible misuse of office allowance by state deputy Murilo Felix, who allegedly used it to pay for the rental of properties belonging to political allies and never used. Another example is criminal action 0037174-14.2021.8.26.0000[^5], which points out, among other elements, the reimbursement of expenses never incurred by deputy Rogério Nogueira.

From this context, this work seeks to be an instrument for expense evaluation and anomaly detection through unsupervised machine learning. The objective of this piece is not to categorically affirm whether a certain expense is fraudulent or not; its scope is to serve as a tool for an initial observation of values through clustering.

# Method

## Exploratory analysis

The first stage consisted of capturing data from the Alesp Open Data Portal[^6], where files in `xml` format dating from 2002 are available and contain elements that indicate the reference period ("Year", "Month"), as well as information from both the parliamentarian ("Registration", "Deputy") and the expense ("Supplier", "CNPJ", "Type", "Value"). For this work, the names of parliamentarians were ignored in order to disregard possible ideological biases. Given the temporal context of expenses, "Year" and "Month" were used solely to deflate values until December 31, 2022 following the broad consumer price index [IPCA][^7]. With this, the temporality of expenses was discarded.

Only expenses related to food and accommodation between 2018 and 2022 were included in the study. Suppliers with fewer than 20 expenses in the five-year period were also discarded, given the need to have a significant number for clustering.

## K-Means Algorithm

A K-Means clustering algorithm was implemented to process these records. In general terms, K-Means is an algorithm that partitions a set of data points into non-overlapping clusters, with the number of clusters being predetermined[^8]. Each data point belongs to the cluster with the smallest average distance between it and a center (centroid).

Given a set of observations \\(x = \lbrace x_1, x_2, ..., x_n\rbrace\\), the algorithm partitions the \\(n\\) observations into \\(k \(\geq n\)\\) sets \\(S = \lbrace S_1, S_2, ..., S_k \rbrace\\) in order to minimize the sum of squares within the cluster.

$$
\sum_{i = 1}^{k}\sum_{x \in S_i}{\Vert x - \mu_i \Vert}^2
$$

where,

- \\(k\\): number of clusters
- \\(S_i\\): cluster \\(i\\)
- \\(x\\): data point
- \\(\mu_i\\): mean distance of points in \\(S_i\\)

Considering that this work's dataset is univariate and the applied algorithm aims to find anomalies,

1. points are distributed according to their values,
2. with the predetermined number of clusters, centroids are calculated from minimizing the square of distances,
3. points close to centroids form clusters,
4. points that are not in clusters are considered anomalies.

The application of K-Means, however, imposes some needs on this work, such as prior determination of the number of clusters, a centroid initialization method that considers global minimum instead of local minimum, criteria for ideal centroid convergence and result validation. To address these limitations, the elbow method, the K-Means++ method, comparison of centroid movement between iterations and validation through the silhouette method and Davies-Bouldin index were used, respectively.

### Elbow Method

The number of clusters to be used by the algorithm must be known a priori. The elbow method[^9] is a way to obtain this number based on the iteration between possible cluster centers and the sum of squares of distances between them and data points.

The method operates under the logic that, by increasing the number of groupings, there will be a decrease in intracluster distances, given the greater proximity of points in relation to the centroids of their respective groupings. At a certain point, the value of such decrease will become marginal — translated visually in a graph, a line would initially have steep drops and then stabilize in the horizontal position, forming an "elbow". The point where this stabilization becomes perceptible represents an estimate of the ideal number of clusters.

<div id="elbow-container" class="d3js"></div>

<script>
  (function() {
      const points = [{
              x: 1,
              y: 9000
          },
          {
              x: 2,
              y: 4000
          },
          {
              x: 3,
              y: 2000
          },
          {
              x: 4,
              y: 1500
          },
          {
              x: 5,
              y: 1300
          },
          {
              x: 6,
              y: 1200
          },
          {
              x: 7,
              y: 1100
          }
      ];
      const virtualWidth = 600;
      const virtualHeight = 300;
      const margin = {
          top: 20,
          right: 50,
          bottom: 60,
          left: 85
      };
      const width = virtualWidth - margin.left - margin.right;
      const height = virtualHeight - margin.top - margin.bottom;
      const svg = d3.select("#elbow-container")
          .append("svg")
          .attr("viewBox", `0 0 ${virtualWidth} ${virtualHeight}`)
          .attr("preserveAspectRatio", "xMidYMid meet");
      const chartArea = svg.append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
      const xScale = d3.scaleLinear().domain([1, 7]).range([0, width]);
      const yScale = d3.scaleLinear().domain([0, 10000]).range([height, 0]);
      const xAxis = d3.axisBottom(xScale)
          .tickValues([1, 2, 3, 4, 5, 6, 7])
          .tickFormat(d3.format("d"));
      const yAxis = d3.axisLeft(yScale)
          .tickValues([0, 2000, 4000, 6000, 8000, 10000])
          .tickFormat(d => d === 0 ? "" : d);
      const xAxisGroup = chartArea.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis);
      xAxisGroup.selectAll("path, line")
          .attr("stroke", "#f0f0f0");
      xAxisGroup.selectAll("text")
          .attr("fill", "#f0f0f0")
          .style("font-size", "14px")
      const yAxisGroup = chartArea.append("g")
          .call(yAxis);
      yAxisGroup.selectAll("path, line")
          .attr("stroke", "#f0f0f0");
      yAxisGroup.selectAll("text")
          .attr("fill", "#f0f0f0")
          .style("font-size", "14px")
      chartArea.append("text")
          .attr("x", width / 2)
          .attr("y", height + 50)
          .attr("text-anchor", "middle")
          .attr("fill", "#f0f0f0")
          .style("font-size", "14px")
          .text("Number of clusters");
      chartArea.append("text")
          .attr("text-anchor", "middle")
          .attr("transform", `translate(${-70}, ${height / 2}) rotate(-90)`)
          .attr("fill", "#f0f0f0")
          .style("font-size", "14px")
          .text("Sum of squared distances");
      const lineGenerator = d3.line()
          .x(d => xScale(d.x))
          .y(d => yScale(d.y));
      chartArea.append("path")
          .datum(points)
          .attr("fill", "none")
          .attr("stroke", "#ababab")
          .attr("stroke-width", 2)
          .attr("d", lineGenerator);
      chartArea.selectAll("circle.point")
          .data(points)
          .enter()
          .append("circle")
          .attr("r", 5)
          .attr("cx", d => xScale(d.x))
          .attr("cy", d => yScale(d.y))
          .attr("fill", "#ababab");
      const elbowPoint = points[2]; // x=3, y=2000
      chartArea.append("circle")
          .attr("cx", xScale(elbowPoint.x))
          .attr("cy", yScale(elbowPoint.y))
          .attr("r", 10)
          .attr("fill", "none")
          .attr("stroke", "#ef5350")
          .attr("stroke-width", 2);
      chartArea.append("line")
          .attr("x1", xScale(elbowPoint.x) + 10)
          .attr("y1", yScale(elbowPoint.y) - 10)
          .attr("x2", xScale(elbowPoint.x) + 60)
          .attr("y2", yScale(elbowPoint.y) - 60)
          .attr("stroke", "#ef5350")
          .attr("stroke-width", 2)
          .attr("stroke-dasharray", "5,5");
      chartArea.append("text")
          .attr("x", xScale(elbowPoint.x) + 70)
          .attr("y", yScale(elbowPoint.y) - 70)
          .attr("fill", "#f0f0f0")
          .style("font-size", "12px")
          .text("Elbow");
  })();
</script>

Considering merely the observation of a graph to measure results on the ideal number of clusters, statistical support is abdicated to ensure the robustness of the elbow method. Schubert[^10] presents the method applied to datasets with more or less visually cohesive clusters, where results are similar even in uniform sets or when data contains a single normal distribution. Problems associated with the elbow graph include the absence of significant angle measurement and axis scale changes, which can alter human interpretation of an "elbow".

To mitigate such problems, one could use a less subjective method, such as the Variance Ratio Criterion [VRC]. While the elbow method relies on the sum of squares of distances between each point and the cluster centroid, VRC measures the ratio between the sum of dispersion between clusters and the sum of dispersion within clusters[^11]. Since we have a dataset that does not point to uniformity or normal distribution, we opted for the elbow method.

### K-Means++

The determination of the number of clusters, however, does not guarantee that the algorithm finds the best points to serve as centroids. When using random initialization, where initial centroids are selected randomly within the cluster, it is possible that points very close to each other are chosen. The high sensitivity of the grouping technique can lead to a local minimum solution instead of a global one, generating partitions that are not ideal[^12].

To overcome this limitation, this work used the initialization method called K-Means++[^13], where the centroid goes through iterations, and is selected based on the probability of a certain point being the best centroid based on distance relative to other data points. The successive change between centroids reduces the chances of the K-Means algorithm converging to a suboptimal solution.

Given a set of points \\(D\\) and a set of selected centroids \\(C\\), the probability of choosing point \\(x\\) as the next centroid is calculated by

$$
P(x) = \frac{D(x)^2}{\sum_{x^{\prime} \in D}D(x^{\prime})^2}
$$

where \\(D(x)\\): distance between point \\(x\\) and the nearest centroid in \\(C\\).

With centroids initialized, each point is assigned to the nearest centroid. These points form clusters. Considering point \\(x\\) and a set of centroids \\(C\\), the cluster label \\(l\\) to which \\(x\\) belongs is computed by

$$
l(x) = \arg \min_{c \in C}\Vert x - c \Vert
$$

Then, each centroid is recalculated taking the mean distance of all points assigned to them,

$$
c_i = \frac{1}{\vert S_i \vert}\sum_{x \in S_i} x
$$

where \\(S_i\\): set of all points assigned to centroid \\(i\\).

At each centroid update iteration, inertia is computed. For univariate set,

$$
\sum_{i=1}^{n}{\Vert {x_i} - {c_{l(x_i)}}\Vert}^2
$$

where \\(c\_{l(x_i)}\\): centroid of the cluster to which \\(x_i\\) was assigned.

### Enhanced Convergence Criteria

In addition to K-Means++ initialization, the algorithm adopts advanced convergence criteria by comparing centroid movement between iterations. Being \\(C_t\\) the set of centroids at iteration \\(t\\), the algorithm converges if

$$
\max_{c \in C_t}\Vert c - c_{t - 1} \Vert < tol
$$

where,

- \\(\Vert c - c\_{t - 1} \Vert\\): euclidean distance
- \\(tol\\): specified tolerance

### Validation by Silhouette Method

The validation of results obtained from implementing these techniques was performed, first, by the silhouette method[^14]. This technique observes the similarity of a point with its cluster compared to other clusters from

$$
s_i = \frac{{b_i} - {a_i}}{\max({a_i},{b_i})}
$$

where,

- \\(a_i\\): average distance from \\(i\\) to all other intra-cluster points
- \\(b_i\\): smallest average distance from \\(i\\) to all points in different clusters

The silhouette method returns results in the range from -1 to 1. If the value is:

- close to -1: the point is incorrectly clustered;
- close to 0: the point is between two clusters, so clustering can be improved;
- close to 1: the point is well clustered.

### Validation by Davies-Bouldin Index

While the silhouette method makes comparisons between a single point and clusters, the Davies-Bouldin index[^15], the second measure used in result validation, observes cluster cohesion, given the logic that adequate clustering is dense in itself, while being distant from other clusters.

The better the clustering, the closer to 0 the index is, a result obtained by

$$
\frac{1}{k}\sum_{i=1}^{k}\max_{i \ne j}\bigg(\frac{{S_i}+{S_j}}{M_{ij}}\bigg)
$$

where,

- \\(k\\): number of clusters
- \\(i\\), \\(j\\): different clusters
- \\(S_i\\), \\(S_j\\): internal dispersion of clusters \\(i\\) and \\(j\\), respectively
- \\(M\_{ij}\\): distance between clusters \\(i\\) and \\(j\\)

# Results

An exploratory analysis was performed to understand the data and its dispersion. In the observed five-year period, there were 4,453 expense records in 86 unique CNPJ numbers, totaling R$ 1,784,601.08 after inflationary adjustment. Each expense had an average value of R$ 400.76, but with a coefficient of variation of 241.41%, indicating significant data dispersion relative to the mean.

It was also noted that the mean is higher than the third quartile. This denotes data inclination toward lower values. The set thus presents a right tail longer than the left, which is corroborated by the asymmetry of 5.21, while the kurtosis of 32.67 demonstrates a sharp peak compared to normal distribution.

| Measure                      | Value      |
| ---------------------------- | ---------- |
| Count                        | 4,453      |
| Mean (R$)                    | 400,763773 |
| Standard deviation (R$)      | 967,469752 |
| Minimum (R$)                 | 6,49       |
| 1st Quartile (R$)            | 55,75      |
| 2nd Quartile (R$)            | 123,14     |
| 3rd Quartile (R$)            | 276,18     |
| Maximum (R$)                 | 10.250,41  |
| Coefficient of variation (%) | 241,40648  |
| Skewness                     | 5,21061    |
| Kurtosis                     | 32,66851   |

Expenses were grouped by company, in order to maintain expense behavior within value variability for each CNPJ. The present K-Means algorithm implementation processed information for each establishment following these parameters:

| Parameter                           | Value                                       |
| ----------------------------------- | ------------------------------------------- |
| Minimum number of clusters          | 2                                           |
| Number of clusters used             | 2 to 10, selected by elbow method          |
| Maximum iterations                  | 100                                         |
| Tolerance for convergence           | 0,0001                                      |
| Percentile for anomaly detection    | 95                                          |

As a result, 262 anomalies were obtained that totaled R$ 197,697.24 — 11.08% of the total expense value. By anomalies we understand patterns in data that do not fit the well-defined notion of normal behavior[^16] — in the context of this work, anomalies are expense values that do not fit into the clusters created by the algorithm. By definition, not every anomaly can be treated as fraud: there are anomalies that are in the middle of all expenses of a certain company, not being the highest values in the set. Such anomalies between clusters are treated here as false positives.

Given the role of clusters in this algorithm and the K-Means++ implementation, there is great variability in the number of clusters. In the set of 86 companies, the number of clusters ranges from 2 to 10. We validated these values through the two aforementioned instruments:

1. Silhouette method, whose acceptable results should be between 0.5 and 1 on a scale from -1 to 1;
2. Davies-Bouldin index, with ideal results between 0 to 0.5, on a scale from 0 to 1.

The number of clusters for each CNPJ was validated through the two aforementioned instruments: the silhouette method and the Davies-Bouldin index. An adequate result for the first would be between 0.5 and 1 on a scale from -1 to 1; the second, from 0 to 0.5 on a scale from 0 to 1.

Of the set of 86 companies, all recorded ideal results for the silhouette method (values between 0.577 and 0.918); 79 presented ideal results for the Davies-Bouldin index (values between 0.166 and 0.489), while seven showed results below ideal (values between 0.508 and 0.573).

With expense clustering, anomaly detection according to the algorithm and validation of applied methods, a final analysis was performed to consider anomalies subject to inquiry by control agencies those whose values are greater than the largest non-anomaly value of the last cluster. With this, anomalies positioned between clusters were discarded, and the result obtained was 46 anomalies in 32 companies, with a total value of R$ 44,348.88.

{% note(clickable=true, hidden=true, header="See companies and anomalies") %}

| CNPJ | Original value (R$) | Corrected value (R$) | Number of clusters for CNPJ | Silhouette method result | Davies-Bouldin index result |
|------|-------------------|-------------------|--------------------------------|--------------------------------|-------------------------------------|
| 02.012.862/0001-60 | 9.525,39 | 9.584,44 | 6 | 0,5996 | 0,4816 |
| 03.071.465/0001-21 | 1.340,00 | 1.658,78 | 3 | 0,6767 | 0,4664 |
| 03.300.974/0049-23 | 229,12 | 298,95 | 2 | 0,6579 | 0,4856 |
| 08.402.977/0001-47 | 266,51 | 269,26 | 4 | 0,7556 | 0,3117 |
| 09.060.964/0106-77 | 360,91 | 448,74 | 6 | 0,6681 | 0,5129 |
| 09.060.964/0106-77 | 314,57 | 389,17 | 6 | 0,6681 | 0,5129 |
| 09.399.877/0001-71 | 1.398,26 | 1.788,63 | 4 | 0,6203 | 0,5162 |
| 09.438.123/0001-83 | 445,86 | 570,85 | 3 | 0,6277 | 0,5329 |
| 09.456.178/0001-16 | 229,75 | 285,66 | 4 | 0,6632 | 0,3914 |
| 09.456.550/0001-94 | 379,80 | 487,44 | 3 | 0,6776 | 0,4350 |
| 09.456.550/0001-94 | 354,59 | 453,99 | 3 | 0,6776 | 0,4350 |
| 09.456.704/0001-48 | 432,16 | 438,34 | 4 | 0,6629 | 0,4534 |
| 09.456.704/0001-48 | 326,36 | 405,21 | 4 | 0,6629 | 0,4534 |
| 09.456.714/0001-83 | 458,39 | 567,66 | 4 | 0,6824 | 0,4745 |
| 09.536.662/0001-55 | 403,31 | 407,22 | 3 | 0,7288 | 0,3667 |
| 11.384.785/0001-60 | 678,58 | 840,34 | 3 | 0,6506 | 0,4524 |
| 13.232.868/0001-69 | 1.360,75 | 1.683,45 | 3 | 0,6969 | 0,4445 |
| 13.232.868/0001-69 | 1.209,82 | 1.498,23 | 3 | 0,6969 | 0,4445 |
| 42.591.651/0612-82 | 110,60 | 134,45 | 6 | 0,6872 | 0,3487 |
| 42.591.651/0612-82 | 118,80 | 119,93 | 6 | 0,6872 | 0,3487 |
| 43.386.903/0001-65 | 1.361,20 | 1.361,20 | 2 | 0,9177 | 0,2157 |
| 43.386.903/0001-65 | 1.030,60 | 1.036,99 | 2 | 0,9177 | 0,2157 |
| 43.386.903/0001-65 | 249,27 | 308,69 | 2 | 0,9177 | 0,2157 |
| 44.993.632/0001-79 | 2.004,54 | 2.621,23 | 6 | 0,6270 | 0,4621 |
| 44.993.632/0001-79 | 1.700,39 | 2.218,63 | 6 | 0,6270 | 0,4621 |
| 44.993.632/0001-79 | 1.441,83 | 1.887,10 | 6 | 0,6270 | 0,4621 |
| 45.007.937/0001-27 | 1.189,20 | 1.556,45 | 5 | 0,7601 | 0,3129 |
| 47.079.637/0001-89 | 1.800,00 | 1.805,09 | 2 | 0,7795 | 0,4130 |
| 49.967.557/0001-95 | 1.395,16 | 1.777,74 | 4 | 0,7310 | 0,3074 |
| 50.244.235/0001-05 | 93,50 | 108,86 | 3 | 0,7979 | 0,2713 |
| 51.483.956/0001-22 | 140,59 | 184,01 | 3 | 0,6680 | 0,4331 |
| 54.867.247/0001-39 | 361,15 | 447,56 | 4 | 0,6375 | 0,4426 |
| 54.867.247/0001-39 | 336,96 | 359,06 | 4 | 0,6375 | 0,4426 |
| 54.867.247/0001-39 | 174,04 | 216,09 | 4 | 0,6375 | 0,4426 |
| 54.951.561/0001-03 | 236,00 | 239,37 | 8 | 0,6219 | 0,4354 |
| 56.007.859/0001-87 | 453,85 | 593,48 | 3 | 0,8057 | 0,3859 |
| 58.699.232/0001-60 | 168,16 | 218,54 | 5 | 0,6550 | 0,4581 |
| 61.084.018/0001-03 | 1.073,17 | 1.372,78 | 4 | 0,6369 | 0,4892 |
| 61.359.691/0001-09 | 180,10 | 181,82 | 5 | 0,5769 | 0,5270 |
| 61.563.557/0001-25 | 238,45 | 242,33 | 4 | 0,7763 | 0,3427 |
| 61.980.272/0012-42 | 172,88 | 219,43 | 3 | 0,7751 | 0,4507 |
| 65.684.037/0003-93 | 636,78 | 790,71 | 5 | 0,6320 | 0,4574 |
| 65.684.037/0003-93 | 513,97 | 647,51 | 5 | 0,6320 | 0,4574 |
| 65.684.037/0003-93 | 422,30 | 525,07 | 5 | 0,6320 | 0,4574 |
| 65.684.037/0003-93 | 399,87 | 495,19 | 5 | 0,6320 | 0,4574 |
| 66.728.858/0001-85 | 482,40 | 603,21 | 7 | 0,6492 | 0,4156 |

{% end %}

# Commented Code

{% note(clickable=true, hidden=true, header="Algorithm") %}

```python
from typing import Tuple
import numpy as np


class KMeans:
    """
    k-means with enhanced convergence criteria.

    Attributes:
        k (int): Number of clusters.
        max_iters (int): Maximum number of iterations for k-means.
        tol (float): Convergence tolerance based on centroid movement.
        n_init (int): Number of times the algorithm will run with
            different centroid seeds.
        threshold (int): Percentile for anomaly detection.
        centroids (np.ndarray): Centroids for clusters.
    """

    def __init__(
        self,
        k: int = 2,
        max_iters: int = 100,
        tol: float = 1e-4,
        n_init: int = 30,
        threshold: int = 95,
        centroids: np.ndarray = None,
    ):
        """
        Initialization with specified parameters.
        """
        self.k = k
        self.max_iters = max_iters
        self.tol = tol
        self.n_init = n_init
        self.threshold = threshold
        self.centroids = centroids

    @staticmethod
    def _kpp_init(data: np.ndarray, k: int) -> np.ndarray:
        """
        K-Means++ initialization for better centroid selection.
        """
        centroids = np.zeros((k, data.shape[1]))
        centroids[0] = data[np.random.choice(data.shape[0])]
        
        for i in range(1, k):
            distances = np.array([min([np.linalg.norm(x - c) ** 2 
                                     for c in centroids[:i]]) for x in data])
            probabilities = distances / distances.sum()
            cumulative_prob = probabilities.cumsum()
            r = np.random.rand()
            
            for j, p in enumerate(cumulative_prob):
                if r < p:
                    centroids[i] = data[j]
                    break
                    
        return centroids

    def fit(self, data: np.ndarray) -> None:
        """
        Fit K-Means to the data.
        """
        best_inertia = float('inf')
        best_centroids = None
        
        for _ in range(self.n_init):
            # Initialize centroids using K-Means++
            centroids = self._kpp_init(data, self.k)
            
            for iteration in range(self.max_iters):
                # Assign points to clusters
                distances = np.sqrt(((data - centroids[:, np.newaxis])**2).sum(axis=2))
                labels = np.argmin(distances, axis=0)
                
                # Update centroids
                new_centroids = np.array([data[labels == i].mean(axis=0) 
                                        for i in range(self.k)])
                
                # Check for convergence
                if np.max(np.linalg.norm(new_centroids - centroids, axis=1)) < self.tol:
                    break
                    
                centroids = new_centroids
            
            # Calculate inertia
            inertia = sum([np.linalg.norm(data[labels == i] - centroids[i])**2 
                          for i in range(self.k)])
            
            if inertia < best_inertia:
                best_inertia = inertia
                best_centroids = centroids
        
        self.centroids = best_centroids

    def predict(self, data: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """
        Predict cluster labels and detect anomalies.
        """
        distances = np.sqrt(((data - self.centroids[:, np.newaxis])**2).sum(axis=2))
        labels = np.argmin(distances, axis=0)
        
        # Anomaly detection based on distance threshold
        min_distances = np.min(distances, axis=0)
        threshold = np.percentile(min_distances, self.threshold)
        anomalies = min_distances > threshold
        
        return labels, anomalies
```

{% end %}

# References

[^1]: Legislative Assembly of the State of São Paulo [Alesp]. 1997. Resolution n. 783, of July 1, 1997. Available at: https://www.al.sp.gov.br/repositorio/legislacao/resolucao.alesp/1997/original-resolucao.alesp-783-01.07.1997.html. Accessed: March 19, 2023.

[^2]: Ministry of Finance and Planning of the Government of the State of São Paulo. 2023. Indices. Available at: https://portal.fazenda.sp.gov.br/Paginas/Indices.aspx. Accessed: March 26, 2023.

[^3]: Ministry of Finance and Planning of the Government of the State of São Paulo. 2023. Budget and financial execution. Available at: https://www.fazenda.sp.gov.br/sigeolei131/paginas/flexconsdespesa.aspx. Accessed: March 19, 2023.

[^4]: Public Prosecutor's Office of São Paulo. 2022. Electronic Information System. Available at: https://www.mpsp.mp.br/sei-sistema-eletronico-de-informacoes Accessed: March 26, 2023.

[^5]: Court of Justice of the State of São Paulo. 2023. E-SAJ. Available at: https://esaj.tjsp.jus.br/esaj/portal.do?servico=190090 Accessed: September 24, 2023.

[^6]: Legislative Assembly of the State of São Paulo. 2023. Open Data Portal. Available at: https://www.al.sp.gov.br/dados-abertos/recurso/21 Accessed: March 26, 2023.

[^7]: Brazilian Institute of Geography and Statistics. IPCA. Available at: https://www.ibge.gov.br/estatisticas/economicas/precos-e-custos/9256-indice-nacional-de-precos-ao-consumidor-amplo.html?=&t=series-historicas Accessed: March 26, 2023.

[^8]: MacQueen, J. 1967. Some methods for classification and analysis of multivariate observations. In: 5th Berkeley Symposium on Mathematical Statistics and Probability, 1967, Los Angeles, LA, United States, Proceedings... p. 281-297.

[^9]: Joshi, K.D.; Nalwade, P.S. 2012. Modified K-Means for better initial cluster centres. International Journal of Computer Science and Mobile Computing 7: 219-223.

[^10]: Schubert, E. 2023. Stop using the elbow criterion for k-means and how to choose the number of clusters instead. SIGKDD Explorations Newsletter 25: 36-42.

[^11]: Caliński, T.; Harabasz, J. 1974. A dendrite method for cluster analysis. Communications in Statistics 3: 1-27.

[^12]: Morissette, L.; Chartier, S. 2013. The K-Means clustering technique: General considerations and implementation in Mathematica. Tutorials in Quantitative Methods for Psychology 9: 15-24.

[^13]: Arthur, D.; Vassilvitskii, S. 2007. K-Means++: The advantages of careful seeding. Proceedings of Annual ACM-SIAM Symposium on Discrete Algorithms: 1027-1035.

[^14]: Rousseeuw, P.J. 1987. Silhouettes: A graphical aid to the interpretation and validation of cluster analysis. Journal of Computational and Applied Mathematics 20: 53-65.

[^15]: Davies, D.L.; Bouldin, D.W. 1979. A cluster separation measure. IEEE Transactions on Pattern Analysis and Machine Intelligence 2: 224–227.

[^16]: Chandola, V; Banerjee, A.; Kumar, V. 2009. Anomaly detection: a survey. Association for Computing Machinery Computing Surveys 41: 1-58.
