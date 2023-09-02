---
title: "Detecção de anomalias em gastos dos deputados estaduais com K-Means"
date: 2023-09-01
---

{{< expandable label="Introdução" level="2" >}}
Cada um dos 94 parlamentares da Assembleia Legislativa do Estado de São Paulo [Alesp] tem direito aos Auxílio-Encargos Gerais de Gabinete de Deputado e Auxílio-Hospedagem, referenciados conjuntamente como “verba de gabinete”. Tal direito foi conferido pela resolução 783, artigo 11, de 1º de julho de 19971. Trata-se de um valor mensal devido pelo Estado aos deputados a fim de que eles possam cobrir gastos com o funcionamento e manutenção dos gabinetes, com hospedagem e demais despesas inerentes ao pleno exercício das atividades parlamentares.

Tais gastos previstos na legislação são agregados em 11 categorias, dentre as quais materiais e serviços gráficos, consultoria, combustíveis, locação de automóveis, hospedagem. Em 2022, considerando resolução 783, de 1º de julho de 19971, que estipula o limite máximo da verba de gabinete em 1.250 unidades fiscais do Estado de São Paulo [Ufesp], e o valor da Ufesp em R$ 31,972, o limite mensal da verba de gabinete que poderia ser ressarcido por deputado no ano passado foi de R$ 39.962,50.

Naquele ano, o valor total empenhado para custeio da verba de gabinete perfez R$ 26.652.243,513. O montante foi 24,43% maior que a soma em 2021, de R$ 21.419.316,88, e menor do que o valor anotado na rubrica para 2023, de R$ 28.607.099,96. Caso este montante se cumpra neste ano, será a primeira vez que o valor ultrapassa R$ 28,5 milhões desde 2018.

Tais somas de recursos públicos podem servir, ainda que parcialmente, para infringir a lei. Um exemplo é o processo investigatório SEI 29.0001.0246360.2021-544, cujo pedido de instauração foi feito pelo Procurador Mario Antonio de Campos Tebet em 5 de maio de 2022. A peça elenca possível malversação no uso da verba de gabinete por parte do deputado estadual Murilo Felix, que a teria empregado para pagar pela locação de imóveis pertencentes a aliados políticos e nunca utilizados.

Com este contexto, o presente trabalho busca ser um instrumento para avaliação de malversação de dinheiro público por meio de aprendizado de máquina não supervisionado. O objetivo desta peça não é afirmar peremptoriamente se determinada despesa é fraudulenta ou não; seu escopo é servir de ferramenta para uma observação inicial dos gastos, que podem ser analisados por meio de clusterização, onde se objetiva encontrar um grupo de despesas cujos valores são anômalos.
{{< /expandable >}}

{{< expandable label="Método" level="2" >}}
A primeira etapa consiste na captura, limpeza e normalização de dados relacionados às despesas dos deputados. Tais registros estão disponíveis no Portal de Dados Abertos da Alesp, e datam desde 2002. 

Inicialmente serão trabalhadas as despesas relacionadas a alimentação e hospedagem. Com os resultados da análise inicial, será feita a clusterização dos dados por meio da classificação por K-Means.

Na clusterização por K-Means, a coleção de dados é atribuída a conjuntos distintos com base em sua similaridade. A organização dos conjuntos é feita com a determinação aleatória de um centroide, um ponto que observa a distância euclidiana dos demais dados em relação a ele. Aqueles mais próximos ao centroide formam um conjunto. Em seguida, a localização do centroide é recalculada considerando o custo da função, e novamente os pontos mais próximos são agregados em conjuntos. Isso ocorre repetidas vezes até se obter convergência entre centroide e dados. Em outros termos, a classificação por K-Means particiona uma população de \\(n\\) dimensões em \\(k\\) conjuntos com base em uma amostra.

Para a maioria dos usos de K-Means, o algoritmo de Lloyd é escolhido, motivo pelo qual também é utilizado neste trabalho. Sabe-se que este algoritmo pode ser fortemente influenciado pela seleção dos centroides iniciais, levando à convergência a um optimum local, o que pode gerar clusters sem critérios rígidos. Para isso, o algoritmo Hartigan-Wong poderia ser um substitutivo. Contudo, análises iniciais mostraram que, neste trabalho, Hartigan-Wong não apresenta resultados diferentes de LLoyd.

Neste trabalho também se utiliza o método de inicialização K-Means++. Sua tendência é espalhar os centroides iniciais pelos dados, reduzindo as chances de o algoritmo K-Means convergir para uma solução abaixo do ideal — ou seja, sua abordagem garante que os pontos mais distantes dos centroides existentes tenham maior probabilidade de serem escolhidos como novos centroides.

A inicialização por K-Means++ segue os seguintes passos:

1. Seleção aleatória do primeiro centroide;
2. Cálculo de \\(D(x)\\), as distâncias entre pontos de dados \\(x\\) e centro mais próximo;
3. Escolha aleatória de um novo ponto de dados como um novo centro, usando uma distribuição de probabilidade ponderada onde um ponto \\(x\\) é escolhido com probabilidade proporcional a \\(D(x)^2\\) — isto é, tendo um conjunto de pontos \\(X\\) e um conjunto de centroides \\(C\\) já inicializados, para qualquer ponto \\(x_i\\) em \\(X\\), a probabilidade \\(P(x_i)\\) de escolher \\(x_i\\) como o próximo centroide é \\(P(x_i)=\frac{D(x_i)^2}{\sum_{x\in X}{D(x)^2}}\\), onde \\(D(x_i)\\) é a distância de \\(x_i\\) a partir do centroide mais próximo em \\(C\\);
4. Repetição dos passos 2 e 3 até que os centros k sejam escolhidos.

Aplicada aos dados de despesas dos deputados estaduais, esta metodologia permitirá agrupar aquelas que, segundo o valor, requerem investigação mais apurada por parte dos órgãos de controle.
{{< /expandable >}}