---
title: "Detecção de anomalias em gastos dos deputados estaduais com K-Means"
date: 2023-09-01
---

{{< warning >}}
O texto apresentado é uma versão resumida do meu trabalho de conclusão de curso do MBA em Data Science e Analytics na Esalq-USP, ainda **em desenvolvimento**. Ele sofrerá atualizações conforme o trabalho progride.
{{< /warning >}}

{{< expandable label="Introdução" level="2" >}}
Cada um dos 94 parlamentares da Assembleia Legislativa do Estado de São Paulo [Alesp] tem direito aos Auxílio-Encargos Gerais de Gabinete de Deputado e Auxílio-Hospedagem, referenciados conjuntamente como "verba de gabinete". Tal direito foi conferido pela resolução 783, artigo 11, de 1º de julho de 19971, e se trata de um valor mensal devido pelo Estado aos deputados a fim de que eles possam cobrir despesas inerentes ao pleno exercício das atividades parlamentares.

Tais gastos são agregados em 11 categorias, dentre as quais materiais e serviços gráficos, consultoria, combustíveis, locação de automóveis, hospedagem. Em 2022, considerando resolução 783, de 1º de julho de 19971, que estipula o limite máximo da verba de gabinete em 1.250 unidades fiscais do Estado de São Paulo [Ufesp], e o valor da Ufesp em R$ 31,97, o limite mensal da verba de gabinete que poderia ser ressarcido por deputado no ano passado foi de R$ 39.962,50.

Naquele ano, o valor total empenhado para custeio da verba de gabinete perfez R$ 26.652.243,51. O montante foi 24,43% maior que a soma em 2021, de R$ 21.419.316,88, e menor do que o valor anotado na rubrica para 2023, de R$ 28.607.099,96. Caso este montante se cumpra neste ano, será a primeira vez que o valor ultrapassa R$ 28,5 milhões desde 2018.

Tais somas de recursos públicos podem servir, ainda que parcialmente, para infringir a lei. Um exemplo é o processo investigatório SEI 29.0001.0246360.2021-544, cujo pedido de instauração foi feito pelo Procurador Mario Antonio de Campos Tebet em 5 de maio de 2022. A peça elenca possível malversação no uso da verba de gabinete por parte do deputado estadual Murilo Felix, que a teria empregado para pagar pela locação de imóveis pertencentes a aliados políticos e nunca utilizados.

Com este contexto, este projeto busca ser um instrumento para avaliação de malversação de dinheiro público por meio de *unsupervised machine learning*. Seu objetivo não é afirmar peremptoriamente se determinada despesa é fraudulenta ou não; seu escopo é servir de ferramenta para uma observação inicial dos gastos, que podem ser analisados por meio de clusterização, onde se objetiva encontrar um grupo de despesas cujos valores são anômalos.
{{< /expandable >}}
{{< expandable label="Método" level="2" >}}
A primeira etapa consiste na captura, limpeza e normalização de dados relacionados às despesas dos deputados. Tais registros estão disponíveis no Portal de Dados Abertos da Alesp, e datam desde 2002. 

Inicialmente serão trabalhadas as despesas relacionadas a alimentação e hospedagem a partir de clusterização por meio da classificação por K-Means em conjunto univariado.

Na clusterização por K-Means é feita a partição de uma população de \\(n\\) dimensões em \\(k\\) conjuntos com base em sua similaridade. A organização dos conjuntos é feita com a determinação aleatória de um centroide, um ponto que observa a distância euclidiana dos demais dados em relação a ele.

Enquanto a distância euclidiana para dados de \\(n\\) dimensões segue a fórmula

$$
d(P,Q) = \sqrt{\sum_{i=1}^{n}(q_i - p_i)^2}
$$

sendo \\(P\\) e \\(Q\\) vetores no espaço de \\(n\\) dimensões, para dados univariados temos somente a diferença absoluta entre os pontos, ou seja,

$$
d(P,Q) = \left|q−p\right|
$$

sendo \\(P\\) e \\(Q\\) pontos individuais no eixo unidimensional e que podem servir de centroides.

Aqueles mais próximos ao centroide formam um conjunto. Em seguida, a localização do centroide é recalculada considerando o custo da função &mdash; a inércia. Para conjunto univariado,

$$
J = \sum_{k=1}^{K}\sum_{x \in C_k}d^2(x, c_k)
$$

sendo

- \\(K\\) o número de clusters

- \\(C_k\\) o conjunto de dados atribuídos ao \\(k\\)-ésimo cluster
​
- \\(c_k\\) o centroide ​do \\(k\\)-ésimo cluster

- \\(d^2(x, c_k)\\) o quadrado da distância euclidiana entre ponto \\(x\\) e centroide \\(c_k\\)

Novamente os pontos mais próximos são agregados em conjuntos. Isso ocorre repetidas vezes até se obter convergência entre centroide e dados &mdash; isto é, a menor inércia.

Para a maioria dos usos de K-Means, o algoritmo de Lloyd é escolhido, motivo pelo qual também é utilizado neste trabalho. Sabe-se que este algoritmo pode ser fortemente influenciado pela seleção dos centroides iniciais, levando à convergência a um *optimum local*, o que pode gerar clusters sem critérios rígidos. Para isso, o algoritmo Hartigan-Wong poderia ser um substitutivo. Contudo, análises iniciais mostraram que, neste trabalho, Hartigan-Wong não apresenta resultados diferentes de LLoyd.

O projeto também se utiliza o método de inicialização K-Means++. Sua tendência é espalhar os centroides iniciais pelos dados, reduzindo as chances de o algoritmo K-Means convergir para uma solução abaixo do ideal — ou seja, sua abordagem garante que os pontos mais distantes dos centroides existentes tenham maior probabilidade de serem escolhidos como novos centroides.

A inicialização por K-Means++ segue os seguintes passos:

1. Seleção aleatória do primeiro centroide;
2. Cálculo de \\(D(x)\\), as distâncias entre pontos de dados \\(x\\) e centro mais próximo;
3. Escolha aleatória de um novo ponto de dados como um novo centro, usando uma distribuição de probabilidade ponderada onde um ponto \\(x\\) é escolhido com probabilidade proporcional a \\(D(x)^2\\) — isto é, tendo um conjunto de pontos \\(X\\) e um conjunto de centroides \\(C\\) já inicializados, para qualquer ponto \\(x_i\\) em \\(X\\), a probabilidade \\(P(x_i)\\) de escolher \\(x_i\\) como o próximo centroide é \\(P(x_i)=\frac{D(x_i)^2}{\sum_{x\in X}{D(x)^2}}\\), onde \\(D(x_i)\\) é a distância de \\(x_i\\) a partir do centroide mais próximo em \\(C\\);
4. Repetição dos passos 2 e 3 até que os centros \\(k\\) sejam escolhidos.

Aplicada aos dados de despesas dos deputados estaduais, esta metodologia permitirá agrupar aquelas que, segundo o valor, requerem investigação mais apurada por parte dos órgãos de controle.
{{< /expandable >}}
{{< expandable label="Código" level="2" >}}
```py
from typing import Tuple
import numpy as np


class KMeans:
    """
    k-means clustering class with enhanced convergence criteria.
    Attributes:
        k (int): Number of clusters.
        max_iters (int): Maximum number of iterations for k-means.
        tol (float): Convergence tolerance based on centroid movement.
        n_init (int): Number of times the algorithm will be run with different centroid seeds.
        threshold (int): Percentile for anomaly detection.
        centroids (np.ndarray): Centroids for the clusters.
    """
    def __init__(self,
                 k: int = 2,
                 max_iters: int = 100,
                 tol: float = 1e-4,
                 n_init: int = 30,
                 threshold: int = 95,
                 centroids: np.ndarray = None
                 ):
        """
        Initialize k-means with specified parameters.
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
        Initialize the centroids using the k-means++ method.
        Args:
            data (np.ndarray): Input data.
            k (int): Number of desired centroids.
        Returns:
            centroids (np.ndarray): Initialized centroids.
        """
        centroids = [data[np.random.choice(len(data))]]
        for _ in range(1, k):
            squared_dist = np.array(
                [np.min([np.linalg.norm(c - x) ** 2 for c in centroids]) for x in data])
            probs = squared_dist / squared_dist.sum()
            centroid = data[np.argmax(probs)]
            centroids.append(centroid)
        return np.array(centroids)

    def _single_run(self, data: np.ndarray) -> Tuple[np.ndarray, np.ndarray, float]:
        """
        Perform a single run of the k-means algorithm.
        Args:
            data (np.ndarray): Input data.
        Returns:
            centroids (np.ndarray): Best centroids after running k-means.
            labels (np.ndarray): Cluster assignments for each data point.
            inertia (float): Total distance of data points from their assigned centroids.
        """
        centroids = self._kpp_init(data, self.k)
        for _ in range(self.max_iters):
            dist = np.linalg.norm(data[:, np.newaxis] - centroids, axis=2)
            labels = np.argmin(dist, axis=1)
            new_centroids = np.array(
                [data[labels == i].mean(axis=0) for i in range(self.k)])

            # Check for convergence
            if np.all(np.abs(new_centroids - centroids) < self.tol):
                break

            centroids = new_centroids

        # Calculate inertia (sum of squared distances to the nearest centroid)
        inertia = np.sum(
            [np.linalg.norm(data[i] - centroids[labels[i]])**2 for i in range(len(data))])
        return centroids, labels, inertia

    def fit(self, data: np.ndarray) -> None:
        """
        Fit the k-means algorithm to the data.
        Args:
            data (np.ndarray): Input data.
        """
        min_inertia = float('inf')
        best_centroids = None
        best_labels = None

        for _ in range(self.n_init):
            centroids, labels, inertia = self._single_run(data)
            if inertia < min_inertia:
                min_inertia = inertia
                best_centroids = centroids
                best_labels = labels

        self.centroids = best_centroids
        self.labels = best_labels

    def detect(self, data: np.ndarray) -> np.ndarray:
        """
        Detect anomalies in the data based on the distance to the nearest centroid.
        Args:
            data (np.ndarray): Input data.
        Returns:
            anomalies (np.ndarray): Detected anomalies.
        """
        dist = np.min(np.linalg.norm(
            data[:, np.newaxis] - self.centroids, axis=2), axis=1)
        threshold = np.percentile(dist, self.threshold)
        anomalies = data[dist > threshold]
        return anomalies
```
{{< /expandable >}}
{{< expandable label="Animação: detecção de anomalias" level="2" >}}
<video controls width="100%" height="auto">
  <source src="anomalies_animation.mp4" type="video/mp4" />
</video>
{{< /expandable >}}
{{< expandable label="Referências" level="2" >}}
Arthur, D.; Vassilvitskii, S. 2007. K-Means++: The advantages of careful seeding. Proceedings of Annual ACM-SIAM Symposium on Discrete Algorithms: 1027-1035.

Assembleia Legislativa do Estado de São Paulo [Alesp]. 1997. Resolução n. 783, de 1° de julho de 1997. Altera a Resolução n° 776, de 14/10/1996, que implantou a nova estrutura administrativa, cria o Núcleo de Qualidade e institui a verba de gabinete. Disponível em: https://www.al.sp.gov.br/repositorio/legislacao/resolucao.alesp/1997/original-resolucao.alesp-783-01.07.1997.html. Acesso em: 19 março 2023.

Hartigan, J.A.; Wong, M.A. 1979. Algorithm AS 136: A K-Means clustering algorithm. Journal of the Royal Statistical Society, Series C (Applied Statistics) 28: 100-08.

Lloyd, S. 1982. Least squares quantization in PCM. IEEE Transactions on Information Theory 28: 129-137.

MacQueen, J. 1967. Classification and analysis of multivariate observations. In: 5th Berkeley Symposium on Mathematical Statistics and Probability, 1967, Los Angeles, LA, Estados Unidos, Anais… p. 281-297.

Ministério Público de São Paulo. 2022. Sistema Eletrônico de Informações. Disponível em: https://www.mpsp.mp.br/sei-sistema-eletronico-de-informacoes Acesso em: 26 março 2023.

Morissette, L.; Chartier, S. 2013. The K-Means clustering technique: General considerations and implementation in Mathematica. Tutorials in Quantitative Methods for Psychology 9: 15-24.

Secretaria da Fazenda e Planejamento do Governo do Estado de São Paulo. 2023. Execução orçamentária e financeira. Disponível em: https://www.fazenda.sp.gov.br/sigeolei131/paginas/flexconsdespesa.aspx. Acesso em: 19 março 2023.

Secretaria da Fazenda e Planejamento do Governo do Estado de São Paulo. 2023. Índices. Disponível em: https://portal.fazenda.sp.gov.br/Paginas/Indices.aspx. Acesso em: 26 março 2023.
{{< /expandable >}}