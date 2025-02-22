+++
title = "Modo de usar: regressão linear simples"
description = "Explore de forma prática os fundamentos e cálculos deste algoritmo básico de machine learning"
date = "2025-02-17"
updated = "2025-02-21"

[taxonomies]
tags=["aprendizado de máquina", "regressão linear"]
+++

Recentemente encontrei nas minhas bagunças um caderno com as anotações que fiz enquanto estudava _machine learning_ pela primeira vez, há uns cinco anos. Relendo as notas vi que tinham alguns cálculos, uns gráficos, e me dei conta: naquela época eu fazia regressão linear simples à mão, para treinar. Sempre aprendo melhor quando pratico.

Daí me surgiu a ideia de transcrever essas notas &mdash; melhor: passar para este blog explicações de conceitos de aprendizado de máquina. O primeiro texto é este. E é justamente sobre regressão linear.

Em estatística, regressão linear é o modelo que estima a relação linear entre uma variável dependente e uma ou mais variáveis explanatórias. Uma ilustração simples:

> Você quer comprar um carro. Você observa a marca, o modelo, o ano de fabricação, se é câmbio manual ou automático etc. Todos esses elementos que você observa são importantes para você analisar se o preço pedido por ele é aceitável. Esses elementos (marca, modelo, ano...) são variáveis explanatórias; o preço é a variável dependente. 

Em _machine learning_ utilizamos regressão linear nos problemas em que desejamos prever um **valor contínuo** a partir de um conjunto de variáveis de entrada (também chamadas de _features_). Um exemplo:

> Em determinado bairro da cidade, há 99 casas à venda. Os preços variam entre R$ 151 mil e R$ 1,150 milhão, seguindo relativamente sua metragem. Algumas casas têm 100m², outras 150m², 200²... A sua casa tem 182m². Quanto você deve pedir por ela?

{% note(clickable=true, hidden=true, header="Veja metragens e valores das 99 casas") %}
| i   | metragem | valor   |
|-----|----------|---------|
| 1   | 100.4    | 151001  |
| 2   | 103.2    | 177313  |
| 3   | 104.9    | 194625  |
| 4   | 105.6    | 217938  |
| 5   | 109.8    | 277250  |
| 6   | 111.0    | 210563  |
| 7   | 112.9    | 191875  |
| 8   | 116.3    | 253188  |
| 9   | 117.5    | 413500  |
| 10  | 117.7    | 310813  |
| 11  | 117.9    | 299125  |
| 12  | 122.1    | 345438  |
| 13  | 124.3    | 362750  |
| 14  | 124.4    | 419063  |
| 15  | 128.6    | 431375  |
| 16  | 131.8    | 454688  |
| 17  | 132.0    | 375000  |
| 18  | 134.2    | 415313  |
| 19  | 139.4    | 485625  |
| 20  | 141.6    | 535938  |
| 21  | 143.8    | 556250  |
| 22  | 146.0    | 556563  |
| 23  | 147.1    | 596875  |
| 24  | 149.3    | 517188  |
| 25  | 149.5    | 590199  |
| 26  | 154.7    | 664836  |
| 27  | 154.9    | 618100  |
| 28  | 156.1    | 700892  |
| 29  | 158.3    | 610533  |
| 30  | 162.4    | 591643  |
| 31  | 163.6    | 651266  |
| 32  | 165.8    | 662045  |
| 33  | 177.0    | 671092  |
| 34  | 171.6    | 640001  |
| 35  | 172.2    | 428751  |
| 36  | 174.2    | 597501  |
| 37  | 175.7    | 756251  |
| 38  | 176.1    | 575001  |
| 39  | 178.6    | 593751  |
| 40  | 178.9    | 642501  |
| 41  | 181.6    | 531251  |
| 42  | 183.1    | 490001  |
| 43  | 184.9    | 568751  |
| 44  | 186.1    | 707501  |
| 45  | 186.6    | 606251  |
| 46  | 189.8    | 625001  |
| 47  | 190.6    | 643751  |
| 48  | 192.0    | 662501  |
| 49  | 193.5    | 701251  |
| 50  | 193.9    | 650001  |
| 51  | 196.3    | 788751  |
| 52  | 198.1    | 597501  |
| 53  | 199.6    | 776251  |
| 54  | 200.1    | 765001  |
| 55  | 200.7    | 803751  |
| 56  | 205.5    | 822501  |
| 57  | 205.8    | 811251  |
| 58  | 207.0    | 830001  |
| 59  | 208.1    | 868751  |
| 60  | 209.6    | 1017501 |
| 61  | 211.6    | 926251  |
| 62  | 211.8    | 855001  |
| 63  | 213.4    | 903751  |
| 64  | 214.3    | 1002501 |
| 65  | 218.2    | 961251  |
| 66  | 220.1    | 951094  |
| 67  | 221.0    | 840001  |
| 68  | 223.5    | 890939  |
| 69  | 225.9    | 921876  |
| 70  | 228.4    | 1012814 |
| 71  | 230.4    | 973751  |
| 72  | 233.3    | 794689  |
| 73  | 235.8    | 925626  |
| 74  | 238.3    | 976564  |
| 75  | 240.8    | 917501  |
| 76  | 243.2    | 998439  |
| 77  | 245.7    | 929376  |
| 78  | 248.2    | 980314  |
| 79  | 250.6    | 951251  |
| 80  | 253.1    | 972189  |
| 81  | 255.6    | 913126  |
| 82  | 258.0    | 994064  |
| 83  | 260.5    | 925001  |
| 84  | 263.0    | 985939  |
| 85  | 265.4    | 1006876 |
| 86  | 267.9    | 1037814 |
| 87  | 270.4    | 1008751 |
| 88  | 272.8    | 1019689 |
| 89  | 275.3    | 1040626 |
| 90  | 277.8    | 1051564 |
| 91  | 280.3    | 942501  |
| 92  | 282.7    | 1123439 |
| 93  | 285.2    | 1014376 |
| 94  | 287.7    | 1095314 |
| 95  | 290.1    | 996251  |
| 96  | 292.6    | 1127189 |
| 97  | 295.1    | 1148126 |
| 98  | 297.5    | 1129064 |
| 99  | 300.0    | 1150000 |
{% end %}

Se colocarmos em gráfico as 99 casas, com suas metragens e valores, teríamos algo assim:

<div id="graph1" class="d3js"></div>
<div id="tooltip" style="position: absolute; display: none; pointer-events: none; background: #fff; border: 1px solid #121212; padding: 5px; font-size: 12px; color: #121212;"></div>

<script>
  (function(){
  const data = [
    { metragem: 100.4, valor: 151001 },
    { metragem: 103.2, valor: 177313 },
    { metragem: 104.9, valor: 194625 },
    { metragem: 105.6, valor: 217938 },
    { metragem: 109.8, valor: 277250 },
    { metragem: 111.0, valor: 210563 },
    { metragem: 112.9, valor: 191875 },
    { metragem: 116.3, valor: 253188 },
    { metragem: 117.5, valor: 413500 },
    { metragem: 117.7, valor: 310813 },
    { metragem: 117.9, valor: 299125 },
    { metragem: 122.1, valor: 345438 },
    { metragem: 124.3, valor: 362750 },
    { metragem: 124.4, valor: 419063 },
    { metragem: 128.6, valor: 431375 },
    { metragem: 131.8, valor: 454688 },
    { metragem: 132.0, valor: 375000 },
    { metragem: 134.2, valor: 415313 },
    { metragem: 139.4, valor: 485625 },
    { metragem: 141.6, valor: 535938 },
    { metragem: 143.8, valor: 556250 },
    { metragem: 146.0, valor: 556563 },
    { metragem: 147.1, valor: 596875 },
    { metragem: 149.3, valor: 517188 },
    { metragem: 149.5, valor: 590199 },
    { metragem: 154.7, valor: 664836 },
    { metragem: 154.9, valor: 618100 },
    { metragem: 156.1, valor: 700892 },
    { metragem: 158.3, valor: 610533 },
    { metragem: 162.4, valor: 591643 },
    { metragem: 163.6, valor: 651266 },
    { metragem: 165.8, valor: 662045 },
    { metragem: 177.0, valor: 671092 },
    { metragem: 171.6, valor: 640001 },
    { metragem: 172.2, valor: 428751 },
    { metragem: 174.2, valor: 597501 },
    { metragem: 175.7, valor: 756251 },
    { metragem: 176.1, valor: 575001 },
    { metragem: 178.6, valor: 593751 },
    { metragem: 178.9, valor: 642501 },
    { metragem: 181.6, valor: 531251 },
    { metragem: 183.1, valor: 490001 },
    { metragem: 184.9, valor: 568751 },
    { metragem: 186.1, valor: 707501 },
    { metragem: 186.6, valor: 606251 },
    { metragem: 189.8, valor: 625001 },
    { metragem: 190.6, valor: 643751 },
    { metragem: 192.0, valor: 662501 },
    { metragem: 193.5, valor: 701251 },
    { metragem: 193.9, valor: 650001 },
    { metragem: 196.3, valor: 788751 },
    { metragem: 198.1, valor: 597501 },
    { metragem: 199.6, valor: 776251 },
    { metragem: 200.1, valor: 765001 },
    { metragem: 200.7, valor: 803751 },
    { metragem: 205.5, valor: 822501 },
    { metragem: 205.8, valor: 811251 },
    { metragem: 207.0, valor: 830001 },
    { metragem: 208.1, valor: 868751 },
    { metragem: 209.6, valor: 1017501 },
    { metragem: 211.6, valor: 926251 },
    { metragem: 211.8, valor: 855001 },
    { metragem: 213.4, valor: 903751 },
    { metragem: 214.3, valor: 1002501 },
    { metragem: 218.2, valor: 961251 },
    { metragem: 220.1, valor: 951094 },
    { metragem: 221.0, valor: 840001 },
    { metragem: 223.5, valor: 890939 },
    { metragem: 225.9, valor: 921876 },
    { metragem: 228.4, valor: 1012814 },
    { metragem: 230.4, valor: 973751 },
    { metragem: 233.3, valor: 794689 },
    { metragem: 235.8, valor: 925626 },
    { metragem: 238.3, valor: 976564 },
    { metragem: 240.8, valor: 917501 },
    { metragem: 243.2, valor: 998439 },
    { metragem: 245.7, valor: 929376 },
    { metragem: 248.2, valor: 980314 },
    { metragem: 250.6, valor: 951251 },
    { metragem: 253.1, valor: 972189 },
    { metragem: 255.6, valor: 913126 },
    { metragem: 258.0, valor: 994064 },
    { metragem: 260.5, valor: 925001 },
    { metragem: 263.0, valor: 985939 },
    { metragem: 265.4, valor: 1006876 },
    { metragem: 267.9, valor: 1037814 },
    { metragem: 270.4, valor: 1008751 },
    { metragem: 272.8, valor: 1019689 },
    { metragem: 275.3, valor: 1040626 },
    { metragem: 277.8, valor: 1051564 },
    { metragem: 280.3, valor: 942501 },
    { metragem: 282.7, valor: 1123439 },
    { metragem: 285.2, valor: 1014376 },
    { metragem: 287.7, valor: 1095314 },
    { metragem: 290.1, valor: 996251 },
    { metragem: 292.6, valor: 1127189 },
    { metragem: 295.1, valor: 1148126 },
    { metragem: 297.5, valor: 1129064 },
    { metragem: 300.0, valor: 1150000 }
  ];

  const virtualWidth = 600;
  const virtualHeight = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const width = virtualWidth - margin.left - margin.right;
  const height = virtualHeight - margin.top - margin.bottom;

  const svg0 = d3.select("#graph1")
    .append("svg")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("width", `${virtualWidth}`)
      .attr("height", `${virtualHeight}`)
      .attr("viewBox", `0 0 ${virtualWidth} ${virtualHeight}`);

  const svg = svg0.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleLinear()
                   .domain([100, 300])
                   .range([0, width])
                   .nice();

  const yScale = d3.scaleLinear()
                   .domain([150000, 1150000])
                   .range([height, 0])
                   .nice();

  const xAxis = d3.axisBottom(xScale)
                  .tickFormat(d => `${d}m²`)
                  .ticks(5);

  const yAxis = d3.axisLeft(yScale)
                  .tickFormat(d => `R$ ${(d/1000).toFixed(0)}k`)
                  .ticks(5);

  svg.append("g")
     .attr("class", "axis")
     .attr("transform", `translate(0, ${height})`)
     .call(xAxis);

  svg.append("g")
     .attr("class", "axis")
     .call(yAxis);

  svg.selectAll(".dot")
     .data(data)
     .enter()
     .append("circle")
       .attr("class", "dot")
       .attr("cx", d => xScale(d.metragem))
       .attr("cy", d => yScale(d.valor))
       .attr("r", 5)
       .attr("fill", "#ef5350")
       .on("mouseover", function(event, d) {
          d3.select("#tooltip")
            .style("display", "block")
            .html(`Metragem: ${d.metragem.toFixed(1)} m²<br>Valor: R$ ${(d.valor/1000).toFixed(0)}k`);
       })
       .on("mousemove", function(event) {
          d3.select("#tooltip")
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
       })
       .on("mouseout", function() {
          d3.select("#tooltip").style("display", "none");
       });
         })();
</script>

Neste cenário, o **valor contínuo** que queremos prever é o preço da casa que você deve pedir; o **conjunto de _features_** é composto por apenas uma variável: a metragem. (Poderíamos ter mais de uma variável no conjunto de _features_, como quantidade de quartos ou de banheiros, idade do imóvel etc. Mas para ficarmos numa explicação mais simples, vamos trabalhar apenas com uma variável.)

Em termos mais técnicos, buscamos modelar a relação entre as variáveis de entrada (%%x%%) e a variável alvo (%%y%%) para determinar o valor previsto (%%\hat{y}%%) da sua casa.

Aqui, aliás, temos uma **regressão linear simples**, ou seja, com apenas uma variável preditora. Sua tarefa é tentar encontrar a melhor reta que descreve a relação entre nossos dados &mdash; afinal, cada %%x%% tem um %%y%% e, portanto, temos um conjunto %%(x_1,y_1),(x_2, y_2),...,(z_n,y_n)%%. Em termos matemáticos, nosso %%\hat{y}%% é encontrado por meio desta fórmula:

$$
\hat{y}_i=\beta_0 + \beta_1 x_i
$$

sendo,

- %%\hat{y}_i%%: o valor previsto para %%y%% dada a variável de entrada %%x_i%%
- %%\beta_0%%: o intercepto da reta (isto é, o valor de %%\hat{y}%% quando %%x=0%%)
  - É o ponto onde a reta cruza o eixo %%y%%. Mesmo que %%x=0%%, você ainda terá um resultado básico. No nosso exemplo, de preço de casa a partir da metragem, %%\beta_0%% representa o valor previsto quando a metragem (%%x%%) é 0. (Pode parecer lógico que uma casa com 0m² custe R$ 0, mas para a modelagem não funciona assim.)
- %%\beta_1%%: a inclinação (_slope_) da reta
  - Indica quanto o valor previsto (%%\hat{y}%%) muda quando %%x%% aumenta em 1 unidade. Se %%\beta_1%% é positivo, a reta inclina para cima; se negativo, para baixo.

Desenhando melhor, para chegar a essa operação precisamos:

1. Encontrar as médias de todos os valores %%x%% (ou seja, %%\bar{x}%%): %%\bar{x}=\frac{1}{99}\sum_{i=1}^{99}x_i%%

> %%\bar{x} \approx 196.4626%%

2. Encontrar as médias de todos os valores %%y%% (ou seja, %%\bar{y}%%): %%\bar{y}=\frac{1}{99}\sum_{i=1}^{99}y_i%%

> %%\bar{y} \approx 721273.0202%%

2. Para cada ponto %%i%%, calcular desvios de %%x%% e %%y%%, e seus produtos:

  - Tomar a diferença entre a metragem do ponto e a média: %%d_{x,i}=x_{i}-\bar{x}%%
  - Calcular o quadrado do desvio de %%x%%: %%dd_{x,i}=(x_{i}-\bar{x})^2%%
  - Tomar a diferença entre o valor do ponto e a média: %%d_{y,i}=y_{i}-\bar{y}%%
  - Calcular o produto dessas diferenças: %%p_{i}=d_{x,i}d_{y,i}%%

> | %%i%% | %%x%% | %%y%% | %%d_{x,i}%% | %%dd_{x,i}%% | %%d_{y,i}%% | %%p_{i}%% |
> | --- | --- | --- | --- | --- | --- | --- |
> | 1   | 100.4 | 151001  | -96.0626 | 9228.0231 | -570272.0202 | 54781812.9677 |
> | 2   | 103.2 | 177313  | -93.2626 | 8697.9125 | -543960.0202 | 50731125.7799 |
> | 3   | 104.9 | 194625  | -91.5626 | 8383.7097 | -526648.0202 | 48221262.0144 |
> | ... | ... | ... | ... | ... | ... |
> | 97 | 295.1 | 1148126 | 98.6374 | 9729.3367 | 426852.9798 | 42103668.1097 |
> | 98 | 297.5 | 1129064 | 101.0374 | 10208.5562 | 407790.9798 | 41202140.3424 | 
> | 99 | 300.0 | 1150000 | 103.5374 | 10719.9932 | 428726.9798 | 44389276.7983 |

3. Somar todos os produtos: %%S_{xy} = \sum_{i=1}^{99}p_{i}%%

> %%S_{xy} \approx 1379676325.7747%%

4. Somar os quadrados de desvios de %%x%%: %%S_{xx} = \sum_{i=1}^{99}dd_{x,i}%%

> %%S_{xx} \approx 303018.3117%%

5. Com base nos cálculos, é possível obter a inclinação da reta: %%\beta_1 = \frac{S_{xy}}{S_{xx}}%%

> %%\beta_1 \approx 4553.1120%%

  - Isso significa que, em termos práticos, para cada 1m² a mais na metragem, o valor previsto aumenta em cerca de R$ 4.553,11.

6. Calcular o intercepto a partir do _slope_ e das médias: %%\beta_0=\bar{y}- \beta_1\bar{x}%%

> %%\beta_0 \approx -173243.3304%%

  - Representa que, quando a metragem é 0 (ou seja, %%x=0%%), o valor da casa é de aproximadamente R$ -173.243,33. (Obviamente não faz sentido uma casa com metragem 0 e valor negativo no mundo real, mas em regressão o intercepto é matematicamente necessário para ajustar a reta aos dados.)

Com todos esses cálculos, conseguimos desenhar uma reta:

<div id="graph2" class="d3js"></div>
<div id="tooltip" style="position: absolute; display: none; pointer-events: none; background: #fff; border: 1px solid #121212; padding: 5px; font-size: 12px; color: #121212;"></div>

<script>
  (function(){
  const data = [
    { metragem: 100.4, valor: 151001 },
    { metragem: 103.2, valor: 177313 },
    { metragem: 104.9, valor: 194625 },
    { metragem: 105.6, valor: 217938 },
    { metragem: 109.8, valor: 277250 },
    { metragem: 111.0, valor: 210563 },
    { metragem: 112.9, valor: 191875 },
    { metragem: 116.3, valor: 253188 },
    { metragem: 117.5, valor: 413500 },
    { metragem: 117.7, valor: 310813 },
    { metragem: 117.9, valor: 299125 },
    { metragem: 122.1, valor: 345438 },
    { metragem: 124.3, valor: 362750 },
    { metragem: 124.4, valor: 419063 },
    { metragem: 128.6, valor: 431375 },
    { metragem: 131.8, valor: 454688 },
    { metragem: 132.0, valor: 375000 },
    { metragem: 134.2, valor: 415313 },
    { metragem: 139.4, valor: 485625 },
    { metragem: 141.6, valor: 535938 },
    { metragem: 143.8, valor: 556250 },
    { metragem: 146.0, valor: 556563 },
    { metragem: 147.1, valor: 596875 },
    { metragem: 149.3, valor: 517188 },
    { metragem: 149.5, valor: 590199 },
    { metragem: 154.7, valor: 664836 },
    { metragem: 154.9, valor: 618100 },
    { metragem: 156.1, valor: 700892 },
    { metragem: 158.3, valor: 610533 },
    { metragem: 162.4, valor: 591643 },
    { metragem: 163.6, valor: 651266 },
    { metragem: 165.8, valor: 662045 },
    { metragem: 177.0, valor: 671092 },
    { metragem: 171.6, valor: 640001 },
    { metragem: 172.2, valor: 428751 },
    { metragem: 174.2, valor: 597501 },
    { metragem: 175.7, valor: 756251 },
    { metragem: 176.1, valor: 575001 },
    { metragem: 178.6, valor: 593751 },
    { metragem: 178.9, valor: 642501 },
    { metragem: 181.6, valor: 531251 },
    { metragem: 183.1, valor: 490001 },
    { metragem: 184.9, valor: 568751 },
    { metragem: 186.1, valor: 707501 },
    { metragem: 186.6, valor: 606251 },
    { metragem: 189.8, valor: 625001 },
    { metragem: 190.6, valor: 643751 },
    { metragem: 192.0, valor: 662501 },
    { metragem: 193.5, valor: 701251 },
    { metragem: 193.9, valor: 650001 },
    { metragem: 196.3, valor: 788751 },
    { metragem: 198.1, valor: 597501 },
    { metragem: 199.6, valor: 776251 },
    { metragem: 200.1, valor: 765001 },
    { metragem: 200.7, valor: 803751 },
    { metragem: 205.5, valor: 822501 },
    { metragem: 205.8, valor: 811251 },
    { metragem: 207.0, valor: 830001 },
    { metragem: 208.1, valor: 868751 },
    { metragem: 209.6, valor: 1017501 },
    { metragem: 211.6, valor: 926251 },
    { metragem: 211.8, valor: 855001 },
    { metragem: 213.4, valor: 903751 },
    { metragem: 214.3, valor: 1002501 },
    { metragem: 218.2, valor: 961251 },
    { metragem: 220.1, valor: 951094 }, 
    { metragem: 221.0, valor: 840001 },
    { metragem: 223.5, valor: 890939 },
    { metragem: 225.9, valor: 921876 },
    { metragem: 228.4, valor: 1012814 },
    { metragem: 230.4, valor: 973751 },
    { metragem: 233.3, valor: 794689 },
    { metragem: 235.8, valor: 925626 },
    { metragem: 238.3, valor: 976564 },
    { metragem: 240.8, valor: 917501 },
    { metragem: 243.2, valor: 998439 },
    { metragem: 245.7, valor: 929376 },
    { metragem: 248.2, valor: 980314 },
    { metragem: 250.6, valor: 951251 },
    { metragem: 253.1, valor: 972189 },
    { metragem: 255.6, valor: 913126 },
    { metragem: 258.0, valor: 994064 },
    { metragem: 260.5, valor: 925001 },
    { metragem: 263.0, valor: 985939 },
    { metragem: 265.4, valor: 1006876 },
    { metragem: 267.9, valor: 1037814 },
    { metragem: 270.4, valor: 1008751 },
    { metragem: 272.8, valor: 1019689 },
    { metragem: 275.3, valor: 1040626 },
    { metragem: 277.8, valor: 1051564 },
    { metragem: 280.3, valor: 942501 },
    { metragem: 282.7, valor: 1123439 },
    { metragem: 285.2, valor: 1014376 },
    { metragem: 287.7, valor: 1095314 },
    { metragem: 290.1, valor: 996251 },
    { metragem: 292.6, valor: 1127189 },
    { metragem: 295.1, valor: 1148126 },
    { metragem: 297.5, valor: 1129064 },
    { metragem: 300.0, valor: 1150000 }
  ];

  const virtualWidth = 600;
  const virtualHeight = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const width = virtualWidth - margin.left - margin.right;
  const height = virtualHeight - margin.top - margin.bottom;

  const svg0 = d3.select("#graph2")
    .append("svg")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("width", `${virtualWidth}`)
      .attr("height", `${virtualHeight}`)
      .attr("viewBox", `0 0 ${virtualWidth} ${virtualHeight}`);

  const svg = svg0.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleLinear()
                   .domain([100, 300])
                   .range([0, width])
                   .nice();

  const yScale = d3.scaleLinear()
                   .domain([150000, 1150000])
                   .range([height, 0])
                   .nice();

  const xAxis = d3.axisBottom(xScale)
                  .tickFormat(d => `${d}m²`)
                  .ticks(5);

  const yAxis = d3.axisLeft(yScale)
                  .tickFormat(d => `R$ ${(d/1000).toFixed(0)}k`)
                  .ticks(5);

  svg.append("g")
     .attr("class", "axis")
     .attr("transform", `translate(0, ${height})`)
     .call(xAxis);

  svg.append("g")
     .attr("class", "axis")
     .call(yAxis);

  svg.selectAll(".dot")
     .data(data)
     .enter()
     .append("circle")
       .attr("class", "dot")
       .attr("cx", d => xScale(d.metragem))
       .attr("cy", d => yScale(d.valor))
       .attr("r", 5)
       .attr("fill", "#ef5350")
       .on("mouseover", function(event, d) {
          d3.select("#tooltip")
            .style("display", "block")
            .html(`Metragem: ${d.metragem.toFixed(1)} m²<br>Valor: R$ ${(d.valor/1000).toFixed(0)}k`);
       })
       .on("mousemove", function(event) {
          d3.select("#tooltip")
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
       })
       .on("mouseout", function() {
          d3.select("#tooltip").style("display", "none");
       });

  const n = data.length;
  let sumX = 0, sumY = 0;
  data.forEach(d => {
    sumX += d.metragem;
    sumY += d.valor;
  });
  const meanX = sumX / n;
  const meanY = sumY / n;

  let num = 0, den = 0;
  data.forEach(d => {
    num += (d.metragem - meanX) * (d.valor - meanY);
    den += Math.pow(d.metragem - meanX, 2);
  });
  const slope = num / den;
  const intercept = meanY - slope * meanX;

  const x1 = 100;
  const x2 = 300;
  const y1 = slope * x1 + intercept;
  const y2 = slope * x2 + intercept;

  svg.append("line")
     .attr("class", "regression-line")
     .attr("x1", xScale(x1))
     .attr("y1", yScale(y1))
     .attr("x2", xScale(x2))
     .attr("y2", yScale(y2))
     .attr("stroke", "#f0f0f0")
     .attr("stroke-width", 2);
       })();
</script>

Para o nosso exemplo, em que o estimado leitor tem uma casa tem 182m², aplicamos a equação inicial:

$$
\hat{y}_i=\beta_0 + \beta_1 x_i
$$

$$
= -173243.33037111675 + 4553.112047771215 \times 182
$$

$$
\approx 655423.06
$$

E obtemos o resultado: a casa vale R$ 655.423,06.

{% note(clickable=true, hidden=true, header="Implementação em Python") %}

```python
import pandas as pd

# Dados
data = {
    "x": [100.4, 103.2, 104.9, 105.6, 109.8, 111.0, 112.9, 116.3, 117.5, 117.7,
          117.9, 122.1, 124.3, 124.4, 128.6, 131.8, 132.0, 134.2, 139.4, 141.6,
          143.8, 146.0, 147.1, 149.3, 149.5, 154.7, 154.9, 156.1, 158.3, 162.4,
          163.6, 165.8, 177.0, 171.6, 172.2, 174.2, 175.7, 176.1, 178.6, 178.9,
          181.6, 183.1, 184.9, 186.1, 186.6, 189.8, 190.6, 192.0, 193.5, 193.9,
          196.3, 198.1, 199.6, 200.1, 200.7, 205.5, 205.8, 207.0, 208.1, 209.6,
          211.6, 211.8, 213.4, 214.3, 218.2, 220.1, 221.0, 223.5, 225.9, 228.4,
          230.4, 233.3, 235.8, 238.3, 240.8, 243.2, 245.7, 248.2, 250.6, 253.1,
          255.6, 258.0, 260.5, 263.0, 265.4, 267.9, 270.4, 272.8, 275.3, 277.8,
          280.3, 282.7, 285.2, 287.7, 290.1, 292.6, 295.1, 297.5, 300.0],
    "y": [151001, 177313, 194625, 217938, 277250, 210563, 191875, 253188, 413500, 310813,
          299125, 345438, 362750, 419063, 431375, 454688, 375000, 415313, 485625, 535938,
          556250, 556563, 596875, 517188, 590199, 664836, 618100, 700892, 610533, 591643,
          651266, 662045, 671092, 640001, 428751, 597501, 756251, 575001, 593751, 642501,
          531251, 490001, 568751, 707501, 606251, 625001, 643751, 662501, 701251, 650001,
          788751, 597501, 776251, 765001, 803751, 822501, 811251, 830001, 868751, 1017501,
          926251, 855001, 903751, 1002501, 961251, 951094, 840001, 890939, 921876, 1012814,
          973751, 794689, 925626, 976564, 917501, 998439, 929376, 980314, 951251, 972189,
          913126, 994064, 925001, 985939, 1006876, 1037814, 1008751, 1019689, 1040626, 1051564,
          942501, 1123439, 1014376, 1095314, 996251, 1127189, 1148126, 1129064, 1150000]
}

df = pd.DataFrame(data)

# Parâmetros para regressão
mean_x, mean_y = df["x"].mean(), df["y"].mean()
sxy = ((df["x"] - mean_x) * (df["y"] - mean_y)).sum()
sxx = ((df["x"] - mean_x) ** 2).sum()

beta_1 = sxy / sxx
beta_0 = mean_y - beta_1 * mean_x

# Previsão para x=182
x_new = 182
yhat = beta_0 + beta_1 * x_new

# Resultado
print(yhat)
```

```resultado
655423.0623232443
```
{% end %}

