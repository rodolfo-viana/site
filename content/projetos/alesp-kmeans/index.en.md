+++
title = "Anomaly detection in São Paulo state deputies' expenses using K-Means"
description = "Edited version of my MBA final project in Data Science and Analytics at USP-Esalq, supervised by Prof. Dr. Ana Julia Righetto, presented in January 2024"
date = "2023-09-01"
updated = "2023-11-16"
weight = 9

[taxonomies]
tags=["machine learning", "k-means"]

[extra]
toc = true

+++

# Introduction

Each of the 94 members of the Legislative Assembly of the State of São Paulo (Alesp) is entitled to General Office Expense Allowance and Lodging Allowance, jointly referred to as the "office allowance." This right was granted by Resolution 783, Article 11, of July 1, 1997[^1]. It is a monthly amount owed by the State so that representatives can be reimbursed for office operation and maintenance costs, lodging, and other expenses inherent to the full exercise of parliamentary activities.

These legally authorized expenses are grouped into 11 categories, including printing materials and services, consulting, fuel, car rental, lodging, and meals. In 2022, considering the maximum office-allowance limit of 1,250 São Paulo State Fiscal Units (Ufesp)[^1] and the Ufesp value of R$ 31.97[^2], the monthly reimbursement ceiling per representative was R$ 39,962.50.

That year, the total amount committed to the office allowance was R$ 26,652,243.51[^3]. The sum was 24.43 % higher than in 2021 (R$ 21,419,316.88[^3]) and lower than the amount recorded for 2023 (R$ 28,607,099.96[^3]). If this budget is indeed reached this year, it will be the first time the figure tops R$ 28.5 million since 2018.

These public funds are scrutinized by oversight bodies such as the State Court of Accounts and the São Paulo Public Prosecutor's Office, which often open proceedings to verify the legitimacy of reimbursements. One example is Investigative Proceeding 29.0001.0246360.2021-54[^4], initiated on 5 May 2022, concerning alleged misuse of the office allowance by Representative Murilo Felix, who supposedly paid rent on properties belonging to political allies that were never used. Another example is Criminal Case 0037174-14.2021.8.26.0000[^5], which points, among other issues, to reimbursement of expenses never incurred by Representative Rogério Nogueira.

Against this backdrop, the present work aims to be an instrument for evaluating expenses and detecting anomalies through unsupervised machine learning. Its objective is not to state categorically whether a given expense is fraudulent; its scope is to serve as a first-look tool by clustering the values.

# Method

## Exploratory analysis

The first step was to fetch data from Alesp's Open Data Portal [^6], where `xml` files dating back to 2002 contain fields indicating the reference period ("Year," "Month") as well as information on both the representative ("Registration," "Representative") and the expense ("Vendor," "CNPJ," "Type," "Value"). To avoid ideological bias, representatives' names were ignored. Given the temporal nature of expenses, "Year" and "Month" were used solely to deflate the amounts to December 31, 2022 according to the Broad Consumer Price Index (IPCA)[^7]. The time dimension of the expenses was thus discarded.

Only meal and lodging expenses from 2018 to 2022 were included. Vendors with fewer than 20 expenses in the five-year span were excluded because a significant count is needed for clustering.

## K-Means clustering algorithm

A K-Means clustering algorithm was implemented to process these records. In short, K-Means partitions a data set into a predefined number of non-overlapping clusters[^8]. Each data point belongs to the cluster whose centroid is closest on average.

Given a set of observations \\(x = \\{x_1, x_2, \ldots, x_n\\}\\), the algorithm divides the \\(n\\) observations into \\(k\\) (\\(\\ge n\\)) sets \\(S = \\{S_1, S_2, \ldots, S_k\\}\\) so as to minimize the sum of squares within clusters,

\\[
\\sum_{i = 1}^{k}\\sum_{x \\in S_i} \\lVert x - \\mu_i \\rVert^2
\\]

where

- \\(k\\): number of clusters  
- \\(S_i\\): cluster \\(i\\)  
- \\(x\\): data point  
- \\(\\mu_i\\): mean distance of points in \\(S_i\\)

Because our data set is univariate and the goal is anomaly detection,

1. points are laid out according to their values;  
2. given the predefined number of clusters, centroids are calculated by minimizing squared distances;  
3. points near centroids form clusters;  
4. points outside clusters are considered anomalies.

However, K-Means imposes some requirements such as prior determination of the number of clusters, a centroid-initialization method that seeks the global minimum and not the local minima, convergence criteria, and validation of results. These were addressed respectively with the elbow method, K-Means++, centroid-movement comparison, and validation via the silhouette method and the Davies–Bouldin index.

### Elbow method

The algorithm must know the number of clusters in advance. The elbow method[^9] provides that number by iterating over possible cluster centers and computing the sum of squared distances between them and the data points.

The logic is that increasing the number of clusters reduces intra-cluster distances because points are closer to their centroids. At some point, the reduction becomes marginal&mdash;in a graph, the line drops sharply at first and then levels out, forming an "elbow." That point is an estimate of the ideal number of clusters.number of clusters.

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

Considering merely the observation of a graph to measure results on the ideal number of clusters, statistical support is abdicated to ensure the robustness of the elbow method. Schubert[^10] shows the method applied to datasets with more or less visually cohesive clusters, in which results are similar even in uniform sets or when data contains a single normal distribution. Problems associated with the elbow graph include lack of significant angle metric and axis scaling, which can alter human interpretation of an "elbow".

To mitigate such problems, a less subjective method could be used, such as the Variance Ratio Criterion (VRC). While the elbow method relies on the sum of squared distances between each point and the cluster centroid, the VRC measures the ratio between the sum of dispersion between clusters and the sum of dispersion within clusters[^11]. Since we have a data set that does not point to uniformity or normal distribution, the elbow method was chosen.

### K-Means++

Defining the number of clusters, however, does not guarantee that the algorithm will find the best points to serve as centroids. When random initialization is used, where initial centroids are randomly selected within the cluster, points very close to each other may be chosen. The high sensitivity of the clustering technique can lead to a local minimum solution rather than a global one, generating suboptimal partitions[^12].

To overcome this limitation, this study used an initialization method called K-Means++[^13], where the centroid goes through iterations and is selected based on the probability that a given point is the best centroid based on distance relative to other data points. The successive change between centroids reduces the chances of the K-Means algorithm converging to a suboptimal solution.

Given a set of points \\(D\\) and a set of selected centroids \\(C\\), the probability of choosing point \\(x\\) as the next centroid is calculated by

$$
P(x) = \frac{D(x)^2}{\sum_{x^{\prime} \in D}D(x^{\prime})^2}
$$

where \\(D(x)\\): distance between point \\(x\\) and the nearest centroid in \\(C\\).

With centroids initialized, each point is assigned to the nearest centroid. These points form clusters. Considering point \\(x\\) and a set of centroids \\(C\\), the cluster label \\(l\\) to which \\(x\\) belongs is computed by

$$
l(x) = \arg \min_{c \in C}\Vert x - c \Vert
$$

Next, each centroid is recalculated by taking the mean distance of all points assigned to it,

$$
c_i = \frac{1}{\vert S_i \vert}\sum_{x \in S_i} x
$$

where \\(S_i\\): set of all points assigned to centroid \\(i\\).

At each centroid update iteration, inertia is computed. For a univariate set,

$$
\sum_{i=1}^{n}{\Vert {x_i} - {c_{l(x_i)}}\Vert}^2
$$

where \\(c\_{l(x_i)}\\): centroid of the cluster to which \\(x_i\\) was assigned.

### Advanced convergence criteria

In addition to K-Means++ initialization, the algorithm adopts advanced convergence criteria by comparing centroid movement between iterations. Let \\(C_t\\) be the set of centroids at iteration \\(t\\), the algorithm converges if

$$
\max_{c \in C_t}\Vert c - c_{t - 1} \Vert < tol
$$

where,

- \\(\Vert c - c\_{t - 1} \Vert\\): euclidean distance
- \\(tol\\): specified tolerance

### Validation by silhouette method

Validation of results obtained from implementing these techniques was performed, first, by the silhouette method[^14]. This technique observes the similarity of a point with its cluster compared to other clusters from

$$
s_i = \frac{{b_i} - {a_i}}{\max({a_i},{b_i})}
$$

where,

- \\(a_i\\): average distance from \\(i\\) to all other intra-cluster points
- \\(b_i\\): smallest average distance from \\(i\\) to all points in different clusters

The silhouette method returns results in the range -1 to 1. If the value is

- close to -1: the point is clustered incorrectly;
- close to 0: the point is between two clusters, so clustering can be improved;
- close to 1: the point is well clustered.

### Validation by Davies-Bouldin index

While the silhouette method compares a single point to clusters, the Davies-Bouldin index[^15], the second measure used in result validation, observes cluster cohesion, given the logic that adequate clustering is dense in itself while distant from other clusters.

The closer to 0 the index is, the better the clustering, a result obtained by

$$
\frac{1}{k}\sum_{i=1}^{k}\max_{i \ne j}\bigg(\frac{{S_i}+{S_j}}{M_{ij}}\bigg)
$$

where,

- \\(k\\): number of clusters
- \\(i\\), \\(j\\): different clusters
- \\(S_i\\), \\(S_j\\): internal dispersion of clusters \\(i\\) and \\(j\\), respectively
- \\(M\_{ij}\\): distance between clusters \\(i\\) and \\(j\\)

# Results

An exploratory analysis was performed to understand the data and its dispersion. In the observed five-year period, there were 4,453 expense records across 86 unique CNPJ numbers, totaling R$ 1,784,601.08 after inflation adjustment. Each expense had an average value of R$ 400.76, but with a coefficient of variation of 241.41%, indicating significant data dispersion relative to the mean.

It was also noted that the mean is higher than the third quartile. This denotes data skewness toward lower values. The set thus presents a longer right tail than left, which is corroborated by the skewness of 5.21, while the kurtosis of 32.67 demonstrates a sharp peak compared to normal distribution.

| Measure                     | Value      |
| --------------------------- | ---------- |
| Count                       | 4,453      |
| Mean (R$)                   | 400.763773 |
| Standard deviation (R$)     | 967.469752 |
| Minimum (R$)                | 6.49       |
| 1st Quartile (R$)           | 55.75      |
| 2nd Quartile (R$)           | 123.14     |
| 3rd Quartile (R$)           | 276.18     |
| Maximum (R$)                | 10,250.41  |
| Coefficient of variation (%) | 241.40648  |
| Skewness                    | 5.21061    |
| Kurtosis                    | 32.66851   |

Expenses were grouped by company to maintain spending behavior within the variability of values for each CNPJ. The present K-Means algorithm implementation processed information for each establishment following these parameters:

| Parameter                         | Value                                       |
| --------------------------------- | ------------------------------------------- |
| Minimum number of clusters        | 2                                           |
| Number of clusters used           | 2 to 10, selected by elbow method          |
| Maximum iterations                | 100                                         |
| Tolerance for convergence         | 0.0001                                      |
| Percentile for anomaly detection  | 95                                          |

The result was 262 anomalies totaling R$ 197,697.24 &mdash;11.08% of total expense value. Anomalies are understood as patterns in data that do not fit a well-defined notion of normal behavior[^16] &mdash;in the context of this work, anomalies are expense values that do not fit into clusters created by the algorithm. By definition, not every anomaly can be treated as fraud: there are anomalies in the middle of all expenses for a given company, not being the highest values in the set. Such anomalies between clusters are treated here as false positives.

Given the role of clusters in this algorithm and the K-Means++ implementation, there is great variability in the number of clusters. In the set of 86 companies, the number of clusters ranges from 2 to 10. We validated these values using the two aforementioned instruments:

1. Silhouette method, whose acceptable results should be between 0.5 and 1 on a scale from -1 to 1;
2. Davies-Bouldin index, with ideal results between 0 to 0.5, on a scale from 0 to 1.

The number of clusters for each CNPJ was validated using the two aforementioned instruments: the silhouette method and the Davies-Bouldin index. An adequate result for the first would be between 0.5 and 1 on a scale of -1 to 1; the second, from 0 to 0.5 on the scale of 0 to 1.

Given the set of 86 companies, all recorded ideal results for the silhouette method (values between 0.577 and 0.918); 79 showed ideal results for the Davies-Bouldin index (values between 0.166 and 0.489), while seven showed below-ideal results (values between 0.508 and 0.573).

With expense clustering, algorithm-based anomaly detection, and validation of applied methods, a final analysis was performed to consider anomalies subject to oversight body inquiry as those whose values are greater than the largest non-anomaly value of the last cluster. This discarded anomalies positioned between clusters, and the result obtained was 46 anomalies in 32 companies, with a total value of R$ 44,348.88.

{% note(clickable=true, hidden=true, header="See companies and anomalies") %}

| CNPJ | Original value (R$) | Corrected value (R$) | Number of clusters for CNPJ | Silhouette method result | Davies-Bouldin index |
|------|-------------------|-------------------|--------------------------------|--------------------------------|-------------------------------------|
| 02.012.862/0001-60 | 9,525.39 | 9,584.44 | 6 | 0.5996 | 0.4816 |
| 03.071.465/0001-21 | 1,340.00 | 1,658.78 | 3 | 0.6767 | 0.4664 |
| 03.300.974/0049-23 | 229.12 | 298.95 | 2 | 0.6579 | 0.4856 |
| 08.402.977/0001-47 | 266.51 | 269.26 | 4 | 0.7556 | 0.3117 |
| 09.060.964/0106-77 | 360.91 | 448.74 | 6 | 0.6681 | 0.5129 |
| 09.060.964/0106-77 | 314.57 | 389.17 | 6 | 0.6681 | 0.5129 |
| 09.399.877/0001-71 | 1,398.26 | 1,788.63 | 4 | 0.6203 | 0.5162 |
| 09.438.123/0001-83 | 445.86 | 570.85 | 3 | 0.6277 | 0.5329 |
| 09.456.178/0001-16 | 229.75 | 285.66 | 4 | 0.6632 | 0.3914 |
| 09.456.550/0001-94 | 379.80 | 487.44 | 3 | 0.6776 | 0.4350 |
| 09.456.550/0001-94 | 354.59 | 453.99 | 3 | 0.6776 | 0.4350 |
| 09.456.704/0001-48 | 432.16 | 438.34 | 4 | 0.6629 | 0.4534 |
| 09.456.704/0001-48 | 326.36 | 405.21 | 4 | 0.6629 | 0.4534 |
| 09.456.714/0001-83 | 458.39 | 567.66 | 4 | 0.6824 | 0.4745 |
| 09.536.662/0001-55 | 403.31 | 407.22 | 3 | 0.7288 | 0.3667 |
| 11.384.785/0001-60 | 678.58 | 840.34 | 3 | 0.6506 | 0.4524 |
| 13.232.868/0001-69 | 1,360.75 | 1,683.45 | 3 | 0.6969 | 0.4445 |
| 13.232.868/0001-69 | 1,209.82 | 1,498.23 | 3 | 0.6969 | 0.4445 |
| 42.591.651/0612-82 | 110.60 | 134.45 | 6 | 0.6872 | 0.3487 |
| 42.591.651/0612-82 | 118.80 | 119.93 | 6 | 0.6872 | 0.3487 |
| 43.386.903/0001-65 | 1,361.20 | 1,361.20 | 2 | 0.9177 | 0.2157 |
| 43.386.903/0001-65 | 1,030.60 | 1,036.99 | 2 | 0.9177 | 0.2157 |
| 43.386.903/0001-65 | 249.27 | 308.69 | 2 | 0.9177 | 0.2157 |
| 44.993.632/0001-79 | 2,004.54 | 2,621.23 | 6 | 0.6270 | 0.4621 |
| 44.993.632/0001-79 | 1,700.39 | 2,218.63 | 6 | 0.6270 | 0.4621 |
| 44.993.632/0001-79 | 1,441.83 | 1,887.10 | 6 | 0.6270 | 0.4621 |
| 45.007.937/0001-27 | 1,189.20 | 1,556.45 | 5 | 0.7601 | 0.3129 |
| 47.079.637/0001-89 | 1,800.00 | 1,805.09 | 2 | 0.7795 | 0.4130 |
| 49.967.557/0001-95 | 1,395.16 | 1,777.74 | 4 | 0.7310 | 0.3074 |
| 50.244.235/0001-05 | 93.50 | 108.86 | 3 | 0.7979 | 0.2713 |
| 51.483.956/0001-22 | 140.59 | 184.01 | 3 | 0.6680 | 0.4331 |
| 54.867.247/0001-39 | 361.15 | 447.56 | 4 | 0.6375 | 0.4426 |
| 54.867.247/0001-39 | 336.96 | 359.06 | 4 | 0.6375 | 0.4426 |
| 54.867.247/0001-39 | 174.04 | 216.09 | 4 | 0.6375 | 0.4426 |
| 54.951.561/0001-03 | 236.00 | 239.37 | 8 | 0.6219 | 0.4354 |
| 56.007.859/0001-87 | 453.85 | 593.48 | 3 | 0.8057 | 0.3859 |
| 58.699.232/0001-60 | 168.16 | 218.54 | 5 | 0.6550 | 0.4581 |
| 61.084.018/0001-03 | 1,073.17 | 1,372.78 | 4 | 0.6369 | 0.4892 |
| 61.359.691/0001-09 | 180.10 | 181.82 | 5 | 0.5769 | 0.5270 |
| 61.563.557/0001-25 | 238.45 | 242.33 | 4 | 0.7763 | 0.3427 |
| 61.980.272/0012-42 | 172.88 | 219.43 | 3 | 0.7751 | 0.4507 |
| 65.684.037/0003-93 | 636.78 | 790.71 | 5 | 0.6320 | 0.4574 |
| 65.684.037/0003-93 | 513.97 | 647.51 | 5 | 0.6320 | 0.4574 |
| 65.684.037/0003-93 | 422.30 | 525.07 | 5 | 0.6320 | 0.4574 |
| 65.684.037/0003-93 | 399.87 | 495.19 | 5 | 0.6320 | 0.4574 |
| 66.728.858/0001-85 | 482.40 | 603.21 | 7 | 0.6492 | 0.4156 |

{% end %}

# Commented code

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

{% note(clickable=true, hidden=true, header="Exec") %}

```python
import os
import asyncio
import glob
from typing import List, Dict, Union
from itertools import groupby
import xml.etree.ElementTree as ET
import aiohttp
from aiolimiter import AsyncLimiter
import pandas as pd
import numpy as np
import sys

sys.path.insert(0, "..")
from src.kmeans import KMeans, Score


async def download_xml(year: int, semaphore: asyncio.Semaphore) -> None:
    """
    Async download of xml file for a given year.

    Args:
        year (int): Year.
        semaphore (asyncio.Semaphore): Concurrent access controller.
    """
    limiter = AsyncLimiter(1, 0.125)
    USER_AGENT = ""
    headers = {"User-Agent": USER_AGENT}
    DATA_DIR = os.path.join(os.getcwd(), "../data")
    if not os.path.exists(DATA_DIR):
        os.mkdir(DATA_DIR)
    url = f"https://www.al.sp.gov.br/repositorioDados/deputados/despesas_gabinetes_{str(year)}.xml"
    async with aiohttp.ClientSession(headers=headers) as session:
        await semaphore.acquire()
        async with limiter:
            async with session.get(url) as resp:
                content = await resp.read()
                semaphore.release()
                file = f"despesas_gabinetes_{str(year)}.xml"
                with open(os.path.join(DATA_DIR, file), "wb") as f:
                    f.write(content)


async def fetch_expenses(year_start: int, year_end: int) -> None:
    """
    Async download of xml files for a given period of time.

    Args:
        year_start (int): Start of the period.
        year_end (int): End of the period.
    """
    tasks = set()
    semaphore = asyncio.Semaphore(value=10)
    for i in range(int(year_start), int(year_end) + 1):
        task = asyncio.create_task(download_xml(i, semaphore))
        tasks.add(task)
    await asyncio.wait(tasks, return_when=asyncio.ALL_COMPLETED)


def parse_data(list_files: List[str]) -> List[Dict[str, Union[str, None]]]:
    """
    Parses xml files and extracts useful info.

    Args:
        list_files (list): List of paths for xml files.

    Retorna:
        data (list): List of reimbursement dicts.
    """
    data = list()
    for file in list_files:
        tree = ET.parse(file)
        xroot = tree.getroot()
        for child in xroot.iter("despesa"):
            cols = [elem.tag for elem in child]
            values = [elem.text for elem in child]
            data.append(dict(zip(cols, values)))
    return data


asyncio.run(fetch_expenses(2013, 2022))
if os.path.exists(os.path.join(os.getcwd(), "../data")):
    os.chdir("../data")
    files = glob.glob("*.xml")
    load = parse_data(files)
    despesas = pd.DataFrame.from_dict(load)
ipca = pd.read_csv("../data/ipca.csv")
ipca["Data"] = pd.to_datetime(ipca["Data"])
despesas["Data"] = pd.to_datetime(
    despesas["Ano"].astype(str) + (despesas["Mes"].astype(str)).str.zfill(2) + "01"
)
despesas = despesas[
    despesas["Tipo"] == "I - HOSPEDAGEM, ALIMENTAÇÃO E DESPESAS DE LOCOMOÇÃO"
]
despesas = despesas[["Data", "CNPJ", "Valor"]]
despesas = despesas[despesas["Data"].dt.year > 2017]
data = pd.merge(left=despesas, right=ipca, on="Data", how="inner")
data["Valor_ref"] = ipca[ipca["Data"] == "2022-12-01"]["Valor"].values[0]
data["Valor_corrigido"] = round(
    (data["Valor_ref"].astype(float) / data["Valor_y"].astype(float))
    * data["Valor_x"].astype(float),
    2,
)
data = data[["CNPJ", "Valor_corrigido"]]
data = data[data["CNPJ"].notnull()]
data = data.groupby("CNPJ").filter(lambda x: len(x) >= 20)
sils, dbs = list(), list()
kmeans = KMeans()
selecao_dados = sorted(zip(data["CNPJ"], data["Valor_corrigido"]), key=lambda x: x[0])
resultados_lista = []

for cnpj, grupo in groupby(selecao_dados, key=lambda x: x[0]):
    centroids_list = []
    values = np.array([item[1] for item in grupo])
    kmeans.k = kmeans.get_optimal_k(values.reshape(-1, 1))
    kmeans.fit(values.reshape(-1, 1))
    anomalies_kmeans = kmeans.detect(values.reshape(-1, 1))
    silhouette_score = Score.silhouette(
        values.reshape(-1, 1), kmeans.get_labels(values.reshape(-1, 1))
    )
    db_score = Score.daviesbouldin(
        values.reshape(-1, 1), kmeans.get_labels(values.reshape(-1, 1))
    )
    labels = kmeans.get_labels(values.reshape(-1, 1))
    for value, label in zip(values, labels):
        centroids_list.append({"centroid": kmeans.centroids[label][0]})
    centroid_idx = 0
    for value in values:
        is_anomaly = 1 if value in anomalies_kmeans else 0
        resultados_lista.append(
            {
                "CNPJ": cnpj,
                "Valor": value,
                "Anomalia": is_anomaly,
                "Centroide": centroids_list[centroid_idx]["centroid"],
                "Clusters": kmeans.k,
                "Silhueta": silhouette_score,
                "Davies_Bouldin": db_score,
            }
        )
        centroid_idx += 1
        
resultados = pd.DataFrame(resultados_lista)
resultados.to_csv("../prd/resultado.csv", index=False, encoding="utf-8")
```
{% end %}

# References

[^1]: Legislative Assembly of the State of São Paulo [Alesp]. 1997. Resolution n. 783, of July 1, 1997. Amends Resolution n° 776, of October 14, 1996, which implemented the new administrative structure, creates the Quality Center and institutes the office allowance. Available at: https://www.al.sp.gov.br/repositorio/legislacao/resolucao.alesp/1997/original-resolucao.alesp-783-01.07.1997.html. Accessed: March 19, 2023.
[^2]: São Paulo State Government Treasury and Planning Secretariat. 2023. Indices. Available at: https://portal.fazenda.sp.gov.br/Paginas/Indices.aspx. Accessed: March 26, 2023.
[^3]: São Paulo State Government Treasury and Planning Secretariat. 2023. Budget and financial execution. Available at: https://www.fazenda.sp.gov.br/sigeolei131/paginas/flexconsdespesa.aspx. Accessed: March 19, 2023.
[^4]: São Paulo Public Prosecutor's Office. 2022. Electronic Information System. Available at: https://www.mpsp.mp.br/sei-sistema-eletronico-de-informacoes Accessed: March 26, 2023.
[^5]: São Paulo State Court of Justice. 2023. E-SAJ. Available at: https://esaj.tjsp.jus.br/esaj/portal.do?servico=190090 Accessed: September 24, 2023.
[^6]: Legislative Assembly of the State of São Paulo. 2023. Open Data Portal. Available at: https://www.al.sp.gov.br/dados-abertos/recurso/21 Accessed: March 26, 2023.
[^7]: Brazilian Institute of Geography and Statistics. IPCA. Available at: https://www.ibge.gov.br/estatisticas/economicas/precos-e-custos/9256-indice-nacional-de-precos-ao-consumidor-amplo.html?=&t=series-historicas Accessed: March 26, 2023.
[^8]: MacQueen, J. 1967. Some methods for classification and analysis of multivariate observations. In: 5th Berkeley Symposium on Mathematical Statistics and Probability, 1967, Los Angeles, LA, United States, Proceedings… p. 281-297.
[^9]: Joshi, K.D.; Nalwade, P.S. 2012. Modified K-Means for better initial cluster centres. International Journal of Computer Science and Mobile Computing 7: 219-223.
[^10]: Schubert, E. 2023. Stop using the elbow criterion for k-means and how to choose the number of clusters instead. SIGKDD Explorations Newsletter 25: 36-42.
[^11]: Caliński, T.; Harabasz, J. 1974. A dendrite method for cluster analysis. Communications in Statistics 3: 1-27.
[^12]: Morissette, L.; Chartier, S. 2013. The K-Means clustering technique: General considerations and implementation in Mathematica. Tutorials in Quantitative Methods for Psychology 9: 15-24.
[^13]: Arthur, D.; Vassilvitskii, S. 2007. K-Means++: The advantages of careful seeding. Proceedings of Annual ACM-SIAM Symposium on Discrete Algorithms: 1027-1035.
[^14]: Rousseeuw, P.J. 1987. Silhouettes: A graphical aid to the interpretation and validation of cluster analysis. Journal of Computational and Applied Mathematics 20: 53-65.
[^15]: Davies, D.L.; Bouldin, D.W. 1979. A cluster separation measure. IEEE Transactions on Pattern Analysis and Machine Intelligence 2: 224–227.
[^16]: Chandola, V; Banerjee, A.; Kumar, V. 2009. Anomaly detection: a survey. Association for Computing Machinery Computing Surveys 41: 1-58.
