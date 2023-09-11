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

Inicialmente foram trabalhadas as despesas relacionadas a alimentação e hospedagem compreendidas entre os anos de 2018 e 2022. Dado o contexto temporal dos gastos, realizou-se a deflação dos valores até 31 de dezembro de 2022 seguindo o índice de preço ao consumidor amplo [IPCA], conforme divulgado pelo IBGE a partir de dados do Banco Central. Isso permitiu que os valores de todos os anos se mantivessem no mesmo contexto temporal.

Uma análise exploratória foi realizada para compreender os dados e sua dispersão no conjunto. No quinquênio observado, foram 14.127 registros de despesas em 4.414 números de CNPJ únicos, totalizando R$ 4.135.666,70. Cada despesa apresentou valor médio de R$ 292,75, porém com desvio-padrão elevado (R$ 681,29), indicando significativa dispersão dos dados em relação à média. O coeficiente de variação de 232,72% demonstrou alto grau de variabilidade relativo à média.

Notou-se ainda que a média é superior ao terceiro quartil. Isso indica que o conjunto de dados está inclinado para valores mais baixos, apesar da significante presença de outliers que puxa o terceiro quartil para cima. Graficamente, o valor médio maior que o terceiro quartil sugere assimetria positiva: a cauda do lado direito é mais longa do que do lado esquerdo. Essa indicação é corroborada com a assimetria de 7, enquanto a curtose de 64,8 comprova cauda longa e picos acentuados em comparação à distribuição normal.

| Medida | Valor |
|--------|-------|
| Contagem | 14.127 |
| Média (R$) | 292,749112 |
| Desvio-padrão (R$) | 681,290247 |
| Mínimo (R$) | 0 |
| 1º Quartil (R$) | 54,265 |
| 2º Quartil (R$) | 115,33 |
| 3º Quartil (R$) | 253,33 |
| Máximo (R$) | 10.259,41 |
| Coeficiente de variação (%) | 232,72154207553792% |
| Assimetria | 7,040865107241919 |
| Curtose | 64,79066970927987 |

Em seguida, foi construído um algoritmo de clusterização por K-Means, em que é feita a partição de uma população de \\(n\\) dimensões em \\(k\\) conjuntos com base em sua similaridade. A organização dos conjuntos é feita com a determinação aleatória de um centroide, um ponto que observa a distância euclidiana dos demais dados em relação a ele. 

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

O projeto também se utiliza o método de inicialização K-Means++. Sua tendência é espalhar os centroides iniciais pelos dados, reduzindo as chances de o algoritmo K-Means convergir para uma solução abaixo do ideal — ou seja, sua abordagem garante que os pontos mais distantes dos centroides existentes tenham maior probabilidade de serem escolhidos como novos centroides.

A inicialização por K-Means++ segue as seguintes etapas:

1. Seleção aleatória do primeiro centroide \\(c_1\\) no conjunto de dados \\(X\\);
2. Cálculo de distâncias \\(D(x)\\) entre pontos de dados e centro mais próximo;
3. Escolha do novo centroide \\(c_i\\) sendo \\(c_1=x^\prime\in X\\) com probabilidade ponderada \\(P(x^\prime)=\frac{D(x^\prime)^2}{\sum_{x\in X}{D(x)^2}}\\);
4. Repetição das etapas 2 e 3 até que \\(D(x)\\) seja o menor valor.

Além da inicialização por K-Means++, o algoritmo adota critérios de convergência avançados ao comparar o movimento dos centroides entre iterações. Sendo \\(C_t\\) o conjunto de centroides na iteração \\(t\\), o algoritmo converge se \\(\max_{c\in C_t}\lVert c-c_{t-1} \rVert < tol\\), onde \\(tol\\) é a tolerância especificada, e \\(\lVert c-c_{t-1} \rVert\\) denota a distância euclidiana.

Aplicada aos dados de despesas dos deputados estaduais, esta metodologia permitiu agrupar aquelas que, segundo o valor, requerem investigação mais apurada por parte dos órgãos de controle.
{{< /expandable >}}
{{< expandable label="Código comentado" level="2" >}}
```py
from typing import Tuple
import numpy as np


class KMeans:
    """
    k-means com critérios de convergência aprimorados.

    Atributos:
        k (int): Número de clusters.
        max_iters (int): Número máximo de iterações para o k-means.
        tol (float): Tolerância de convergência baseada no movimento do centroide.
        n_init (int): Número de vezes que o algoritmo será executado com diferentes seeds de centroides.
        threshold (int): Percentil para detecção de anomalias.
        centroids (np.ndarray): Centroides para os clusters.
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
        Inicialização com parâmetros especificados.
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
        Inicializa os centroides usando o método k-means++.

        Argumentos:
            data (np.ndarray): Dados de entrada.
            k (int): Número de centroides desejados.

        Retorna:
            centroids (np.ndarray): Centroides inicializados.
        """
        # selciona o primeiro centroide randomicamente
        centroids = [data[np.random.choice(len(data))]]
        # looping para escolher os k-1 centroides restantes
        for _ in range(1, k):
            # calcula a distância ao quadrado mínima de cada ponto de dado em relação aos centroides já selecionados
            squared_dist = np.array(
                [np.min([np.linalg.norm(c - x) ** 2 for c in centroids]) for x in data])
            # calcula a distribuição de probabilidades
            probs = squared_dist / squared_dist.sum()
            # seleciona o ponto de dados com maior probabilidade para ser próximo centroide
            centroid = data[np.argmax(probs)]
            # adiciona à lista de centroides
            centroids.append(centroid)
        # retorna os centroides inicializados
        return np.array(centroids)

    def _single_run(self, data: np.ndarray) -> Tuple[np.ndarray, np.ndarray, float]:
        """
        Realiza execução única do algoritmo k-means.

        Argumentos:
            data (np.ndarray): Dados de entrada.

        Retorna:
            centroids (np.ndarray): Melhores centroides após a execução do k-means.
            labels (np.ndarray): Atribuições de cluster para cada ponto de dado.
            inertia (float): Distância total dos pontos de dados a partir de seus centroides atribuídos.
        """
        centroids = self._kpp_init(data, self.k)
        # looping para o número máximo de iterações
        for _ in range(self.max_iters):
            # calcula a distância euclidiana entre cada ponto de dado e cada centroide
            dist = np.linalg.norm(data[:, np.newaxis] - centroids, axis=2)
            # atribui cada ponto de dado ao centroide mais próximo
            labels = np.argmin(dist, axis=1)
            # recalcula os centroides com base na média dos pontos de dados em cada cluster
            new_centroids = np.array(
                [data[labels == i].mean(axis=0) for i in range(self.k)])
            # observa a convergência e encerra o looping se a mudança de centroides estiver abaixo da tolerância
            if np.all(np.abs(new_centroids - centroids) < self.tol):
                break
            # atualiza os centroides
            centroids = new_centroids
        # calcula a distância total entre os pontos de dados e os centroides a eles atribuídos
        inertia = np.sum(
            [np.linalg.norm(data[i] - centroids[labels[i]])**2 for i in range(len(data))])
        # retorna os centroides finais, as labels atribuídas e a inércia
        return centroids, labels, inertia

    def fit(self, data: np.ndarray) -> None:
        """
        Ajusta o algoritmo k-means aos dados.

        Argumentos:
            data (np.ndarray): Dados de entrada.
        """
        # ajusta a inércia mínima inicial a valor infinito
        min_inertia = float('inf')
        # atribuiu o valor None ao melhores centroides e labels
        best_centroids = None
        best_labels = None
        # looping para o número de inicializações
        for _ in range(self.n_init):
            # executa `_single_run`
            centroids, labels, inertia = self._single_run(data)
            # observa se a execução atual tem inércia menor do que a melhor inércia
            if inertia < min_inertia:
                # em caso positivo, atualiza inércia, centroides e labels
                min_inertia = inertia
                best_centroids = centroids
                best_labels = labels
        # atribuiu novos melhores centroides e labels à classe `KMeans`
        self.centroids = best_centroids
        self.labels = best_labels

    def detect(self, data: np.ndarray) -> np.ndarray:
        """
        Detecta anomalias nos dados com base na distância ao centroide mais próximo.

        Argumentos:
            data (np.ndarray): Dados de entrada.

        Retorna:
            anomalies (np.ndarray): Anomalias detectadas.
        """
        # calcula a distância mínima de cada ponto de dado em relação a seu centroide
        dist = np.min(np.linalg.norm(
            data[:, np.newaxis] - self.centroids, axis=2), axis=1)
        # determina o limite da distância com base no percentil de KMeans
        threshold = np.percentile(dist, self.threshold)
        # identifica pontos de dados com distâncias maiores do que o limite
        anomalies = data[dist > threshold]
        # retorna os valores anômalos
        return anomalies

    def get_labels(self, data: np.ndarray) -> np.ndarray:
        """
        Atribui cada ponto de dado ao centroide mais próximo para determinar seu cluster.

        Argumentos:
            data (np.ndarray): Conjunto de dados.

        Retorna:
            np.ndarray: Array de labels de cluster correspondentes a cada ponto de dado.
        """
        # calcula a distância de cada ponto de dado em relação aos centroides
        dist = np.linalg.norm(data[:, np.newaxis] - self.centroids, axis=2)
        # atribuiu cada ponto ao centroide mais próximo
        labels = np.argmin(dist, axis=1)
        # retorna as labels atribuídas
        return labels

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