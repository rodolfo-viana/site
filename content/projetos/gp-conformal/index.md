+++
title = "Quantificação de incertezas com processos gaussianos e previsão conformal"
description = "Versão editada de artigo escrito para a disciplina Redes Neurais Artificiais, do Prof. Dr. Lucas Ribas, no curso de mestrado do Programa de Pós-Graduação em Ciência da Computação da Unesp"
date = "2025-05-25"
weight = 1

[taxonomies]
tags=["aprendizado de máquina", "processos gaussianos", "redes neurais"]

[extra]
toc = true

+++

# Introdução

Em problemas de regressão, modelos de aprendizado de máquina geralmente são capazes de apresentar predições pontuais com rigor; contudo, não raro negligenciam a quantificação da incerteza inerente a tais predições. Essa limitação é particularmente crítica em aplicações reais, onde não apenas a precisão da previsão, mas também a confiabilidade e a quantificação da incerteza são cruciais para a tomada de decisões informadas.

Neste cenário, modelos baseados em processos gaussianos (GP) destacam-se como uma abordagem robusta. São capazes de fornecer não apenas predições pontuais, mas também distribuições de probabilidade completas para as predições, permitindos capturar tanto a incerteza epistêmica quanto a incerteza aleatória. A incerteza epistêmica refere-se à incerteza no modelo devido à falta de dados ou conhecimento, podendo ser reduzida com mais observações, enquanto a incerteza aleatória é inerente ao processo de geração dos dados e não pode ser reduzida, representando o ruído natural do sistema.

Processos gaussianos atribuem distribuição probabilística a funções, de modo que qualquer subconjunto finito de pontos amostrais obedece a uma distribuição gaussiana multivariada. Tornam-se, assim, adequados para construir intervalos de predição, pois delimitam a faixa esperada para o valor real com uma probabilidade específica. 

Na prática, contudo, intervalos extraídos diretamente de um GP podem não entregar a cobertura nominal desejada. É neste contexto que a predição conformal se apresenta como uma abordagem complementar. Trata-se de uma técnica estatística que permite calibrar os intervalos de predição para garantir propriedades teóricas de cobertura, independentemente da distribuição subjacente dos dados ou da adequação do modelo. 

Uma configuração de modelo que integre GP e predição conformal torna-se uma abordagem promissora para a construção de intervalos que são simultaneamente informativos e confiáveis. Neste trabalho, investigamos essa configuração: implementamos o Processo Gaussiano aprimorado por rede neural (NE-GP, de _Neural-Enhanced Gaussian Process_) e o Processo Gaussiano Variacional Estocástico aprimorado por rede neural (NE-SVGP, de _Neural-Enhanced Stochastic Variational Gaussian Process_). Para cada um desses modelos, comparamos o desempenho dos intervalos de predição antes e após a aplicação do método conformal, em termos de cobertura e largura dos intervalos.

# Metodologia

A implementação dos modelos propostos neste trabalho segue uma arquitetura híbrida que combina redes neurais com processos gaussianos, criando os modelos NE-GP e NE-SVGP. Esta abordagem utiliza as bibliotecas PyTorch e GPyTorch para implementar uma arquitetura de duas etapas: extração de características neurais seguida de modelagem probabilística gaussiana.

A arquitetura híbrida consiste em dois componentes principais integrados: um extrator de características baseado em perceptron multicamadas (MLP) que transforma os dados de entrada em representações de maior nível, e um GP que opera sobre essas características extraídas para fornecer predições de intervalos. O MLP é estruturado com três camadas totalmente conectadas: uma camada de entrada que recebe as características originais dos dados, duas camadas ocultas com 64 neurônios cada, aplicando funções de ativação ReLU e dropout de 0,1 para regularização, e uma camada de saída com 32 neurônios que produz as características refinadas.

O GP subsequente opera sobre essas características extraídas (\\(\mathbf{z}\\)), utilizando uma função de base radial para modelar as correlações no espaço de características transformado. A escolha do kernel _Radial Basis Function_ deve-se à sua capacidade de capturar relações não-lineares suaves entre variáveis, sendo adequado para a maioria dos problemas de regressão. Outras opções como kernels periódicos ou Matérn poderiam ser usadas para capturar padrões específicos como sazonalidade ou diferentes graus de suavidade.

O treinamento conjunto otimiza simultaneamente os parâmetros do MLP (\\(\mathbf{W}\_i, \mathbf{b}\_i\\)) e os hiperparâmetros do GP (\\(\boldsymbol{\theta}\_{GP}\\)) através de gradiente descendente

\\[
\begin{aligned}
\mathcal{L}(\mathbf{W}, \mathbf{b}, \boldsymbol{\theta}\_{GP}) &= -\log p(\mathbf{y}\mid\text{MLP}(\mathbf{X}), \boldsymbol{\theta}\_{GP}) \\\\
\boldsymbol{\phi}\_{t+1} &= \boldsymbol{\phi}\_t - \eta \nabla_{\boldsymbol{\phi}} \mathcal{L}(\boldsymbol{\phi}\_t),
\end{aligned}
\\]

onde \\(\boldsymbol{\phi} = \\{\mathbf{W}, \mathbf{b}, \boldsymbol{\theta}\_{GP}\\}\\) representa todos os parâmetros treináveis do modelo híbrido.

Esta arquitetura híbrida une o poder das redes neurais na extração de características complexas com a precisão dos GPs na quantificação de incerteza.

## Processos Gaussianos Exatos

Um GP é uma família de variáveis aleatórias tal que qualquer subconjunto finito segue uma distribuição gaussiana multivariada. Tal propriedade garante exatidão à inferência bayesiana sem a necessidade de recorrer a aproximações numéricas &mdash; difere, por exemplo, de redes neurais bayesianas, que precisam de amostragem Monte Carlo ou métodos variacionais.

Formalmente, um GP é especificado por sua função de média \\(m(\mathbf{x})\\) e função de covariância \\(k(\mathbf{x}, \mathbf{x'})\\), onde

\\[
\begin{aligned}
m(\mathbf{x}) &= \mathbb{E}[f(\mathbf{x})] \\\\
k(\mathbf{x}, \mathbf{x'}) &= \mathbb{E}[(f(\mathbf{x}) - m(\mathbf{x}))(f(\mathbf{x'}) - m(\mathbf{x'}))]
\end{aligned}
\\]

Assim, temos \\(f(\mathbf{x}) \sim \mathcal{GP}(m, k)\\) para indicar que a função \\(f\\) segue um GP com função de média \\(m\\) e função de covariância \\(k\\).

No problema de regressão, dada uma amostra de treinamento \\(\mathcal{D} = \{(\mathbf{x}\_i, y\_i)\}\_{i=1}^{n}\\) e assumindo ruído gaussiano homoscedático \\(y\_i = f(\mathbf{x}\_i) + \varepsilon\_i\\), onde \\(\varepsilon\_i \sim \mathcal{N}(0, \sigma^2)\\), a posteriori para um novo ponto \\(\mathbf{x}\_*\\) é gaussiana com parâmetros 

\\[
\begin{aligned}
\mu(\mathbf{x}\_\*) &= \mathbf{k}\_\*^\top(\mathbf{K} + \sigma^2\mathbf{I})^{-1}\mathbf{y} \\\\
\sigma^2(\mathbf{x}\_\*) &= k(\mathbf{x}\_\*, \mathbf{x}\_\*) - \mathbf{k}\_\*^\top(\mathbf{K} + \sigma^2\mathbf{I})^{-1}\mathbf{k}\_\*
\end{aligned}
\\]

onde \\(\mathbf{K}\\) é a matriz de covariância entre os pontos de treinamento e \\(\mathbf{k}\_\*\\) contém as covariâncias entre \\(\mathbf{x}\_\*\\) e cada \\(\mathbf{x}\_i\\).

Neste trabalho, para obtermos funções-amostra suaves e isotrópicas, utilizamos a função de base radial para cálculo da covariância, definido como

\\[
k(\mathbf{x}, \mathbf{x'}) = \sigma_f^2 \exp\left(-\frac{||\mathbf{x} - \mathbf{x'}||^2}{{{2l^2}}}\right)
\\]

onde \\(\sigma_f^2\\) é a variância do sinal e \\(l\\) é o comprimento de escala, que controla a suavidade da função. Estes hiperparâmetros são otimizados maximizando a log-verossimilhança marginal dos dados de treinamento. A log-verossimilhança marginal é obtida integrando sobre a função latente \\(f\\), resultando em 

\\[
\log p(\mathbf{y}|\mathbf{X}, \boldsymbol{\theta}) = -\frac{1}{2}\mathbf{y}^\top(\mathbf{K} + \sigma^2\mathbf{I})^{-1}\mathbf{y} - \frac{1}{2}\log|\mathbf{K} + \sigma^2\mathbf{I}| - \frac{n}{2}\log(2\pi)
\\]

onde \\(\boldsymbol{\theta}\\) são os hiperparâmetros do kernel. Esta otimização equilibra o ajuste aos dados com a complexidade do modelo.

{{ video(file="/assets/GP.mp4",
         autoplay="true",
         loop="true",
         muted="true") }}

## Processo Gaussiano Variacional Estocástico

Uma limitação importante do GP exato é que ele exige complexidade computacional de \\(\mathcal{O}(n^3)\\) para treinamento e \\(\mathcal{O}(n^2)\\) para predição, onde \\(n\\) é o número de pontos de treinamento. Processo Gaussiano Variacional Estocástico (SVGP) reduz esses custos para \\(\mathcal{O}(nm^{2}+m^{3})\\) e \\(\mathcal{O}(m^{2})\\), respectivamente, ao introduzir um conjunto de \\(m\\) pontos-indutores em \\(\mathbf Z=\{\mathbf z_{j}\}_{j=1}^{m}\\), com \\(m\ll n\\). Estes pontos-indutores são variáveis latentes que resumem as informações do conjunto de treinamento completo.

Neste modelo, aproximamos a distribuição a posteriori \\(p(\mathbf{f} \mid \mathcal{D})\\) por uma distribuição variacional \\(q(\mathbf{f})\\), isto é,

\\[
q(\mathbf{f}, \mathbf{u}) = p(\mathbf{f} \mid \mathbf{u})q(\mathbf{u}),
\\]

onde \\(\mathbf{f}\\) são os valores da função nos pontos de treinamento, \\(\mathbf{u}\\) são os valores da função nos pontos-indutores, \\(p(\mathbf{f} \mid \mathbf{u})\\) é a distribuição condicional do GP, e \\(q(\mathbf{u})\\) é uma distribuição variacional gaussiana com parâmetros a serem otimizados.

A otimização é realizada minimizando a divergência Kullback-Leibler entre a distribuição variacional e a distribuição a posteriori verdadeira. A divergão entre duas distribuições contínuas de densidade \\(p\\) e \\(q\\) é definida como 

\\[
D_{\mathrm{KL}}(P \mid Q) = \int p(x)\,\ln\!\biggl(\frac{p(x)}{q(x)}\biggr)\,\mathrm{d}x
\\] 

Intuitivamente, \\(D_{\mathrm{KL}}(P \mid Q)\\) mede o excesso de informação exigido para representar amostras de \\(P\\) usando um código ótimo baseado em \\(Q\\) em vez de um código ótimo para \\(P\\) propriamente dito. Essa divergência é sempre não negativa e zera-se somente quando, para quase todo \\(x\\), tem-se \\(p(x)=q(x)\\).

A tarefa de minimizar a divergência equivale a maximizar um limite inferior da evidência (ELBO, _Evidence Lower Bound_).

A predição para um novo ponto \\(\mathbf{x}_\*\\) é dada por

\\[
\begin{aligned}
q(f(\mathbf{x}\_\*)) &= \int p(f(\mathbf{x}\_\*) \mid \mathbf{u})q(\mathbf{u})d\mathbf{u} \\\\
&= \mathcal{N}(f(\mathbf{x}\_\*) \mid \mu_q(\mathbf{x}\_\*), \sigma_q^2(\mathbf{x}\_\*)),
\end{aligned}
\\]

onde 

\\[
\begin{aligned}
\mu_q(\mathbf{x}\_\*) &= \mathbf{k}\_{\*z}\mathbf{K}_{zz}^{-1}\boldsymbol{\mu}\_u \\\\
\sigma_q^2(\mathbf{x}\_\*) &= k(\mathbf{x}\_\*, \mathbf{x}\_\*) - \mathbf{k}\_\{\*z}\mathbf{K}\_{zz}^{-1}(\mathbf{K}\_{zz} - \mathbf{S}\_u)\mathbf{K}\_{zz}^{-1}\mathbf{k}\_{z\*}
\end{aligned}
\\]

sendo \\(\mathbf{k}\_{\*z}\\) o vetor de covariâncias entre \\(\mathbf{x}\_\*\\) e os pontos-indutores, \\(\mathbf{K}\_{zz}\\) a matriz de covariância entre os pontos-indutores, e \\(\boldsymbol{\mu}\_u\\) e \\(\mathbf{S}\_u\\) os parâmetros da distribuição variacional \\(q(\mathbf{u}) = \mathcal{N}(\boldsymbol{\mu}\_u, \mathbf{S}\_u)\\).

Neste trabalho, inspirados nos gargalos de _underfitting_ e instabilidade numérica, utilizamos extensões ao SVGP padrão, tais como seleção adaptativa dos pontos-indutores com base na distribuição dos dados, otimização conjunta dos pontos-indutores e dos hiperparâmetros do kernel, uso de mini-batches durante o treinamento para melhorar a eficiência computacional, e implementação de técnicas de estabilidade numérica, como a decomposição de Cholesky &mdash; ou seja, fatoração de uma matriz simétrica e definida positiva \\(A\\) em \\(A = LL^\top\\), onde \\(L\\) é matriz triangular inferior com elementos positivos na diagonal &mdash; para o cálculo de inversas de matrizes.

Essas melhorias permitem que o SVGP retenha a interpretação probabilística do GP clássico, escale para conjuntos de dados com centenas de milhares de amostras e produza intervalos de predição que combinam validez estatística e largura competitiva.

## Predição Conformal

Dada a natureza probabilística dos modelos baseados em GP, os intervalos de predição podem ser derivados diretamente da distribuição a posteriori. Para um nível de confiança \\(1-\alpha\\), o intervalo de predição para um novo ponto \\(\mathbf{x}\_\*\\) é:

\\[
PI\_{1-\alpha}(\mathbf{x}\_\*) = [\mu(\mathbf{x}\_\*) - z\_{1-\alpha/2} \cdot \sigma(\mathbf{x}\_\*), \mu(\mathbf{x}\_\*) + z\_{1-\alpha/2} \cdot \sigma(\mathbf{x}\_\*)]
\\]

onde \\(z\_{1-\alpha/2}\\) é o quantil \\(1-\alpha/2\\) da distribuição normal padrão.

Este intervalo de predição tem uma interpretação bayesiana: assumindo que o modelo e seus hiperparâmetros estão corretos, o intervalo contém o valor verdadeiro com probabilidade \\(1-\alpha\\). No entanto, na prática, essas suposições podem não ser válidas, levando a intervalos que não atingem a cobertura nominal desejada. A predição conformal é uma abordagem estatística que permite calibrar os intervalos de predição para garantir propriedades teóricas de cobertura, independentemente da distribuição subjacente dos dados ou da adequação do modelo. A ideia central é usar um conjunto de calibração para determinar o quanto os intervalos de predição devem ser contraídos para atingir a cobertura desejada.

Neste trabalho, implementamos uma variante da predição conformal conhecida como predição conformal indutiva, que utiliza um conjunto de validação separado para calibração. Além disso, fazemos uso de um escore de não-conformidade natural, dado por

\\[
s\_i = \max\\{y\_i - l(\mathbf{x}\_i), u(\mathbf{x}\_i) - y\_i, 0\\}
\\]

e escolhido por sua simplicidade e interpretabilidade: trata-se do erro absoluto normalizado entre a predição e o valor verdadeiro; mede o quanto o valor verdadeiro está fora do intervalo de predição original.

Uma propriedade teórica importante da predição conformal é que, sob a suposição de permutabilidade dos dados, os intervalos de predição conformal garantem uma cobertura marginal de pelo menos \\(1-\alpha\\) no conjunto de teste. Isso significa que, em média, pelo menos uma fração \\(1-\alpha\\) dos intervalos conterá os valores verdadeiros, independentemente da adequação do modelo ou da distribuição dos dados.

{{ video(file="/assets/ConformalGPComparison.mp4",
         autoplay="true",
         loop="true",
         muted="true") }}



