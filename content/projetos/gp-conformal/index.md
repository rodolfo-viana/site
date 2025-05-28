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

O GP subsequente opera sobre essas características extraídas \(\mathbf{z}\), utilizando uma função de base radial para modelar as correlações no espaço de características transformado. A escolha do kernel _Radial Basis Function_ deve-se à sua capacidade de capturar relações não-lineares suaves entre variáveis, sendo adequado para a maioria dos problemas de regressão. Outras opções como kernels periódicos ou Matérn poderiam ser usadas para capturar padrões específicos como sazonalidade ou diferentes graus de suavidade.

O treinamento conjunto otimiza simultaneamente os parâmetros do MLP (\(\mathbf{W}_i, \mathbf{b}_i\)) e os hiperparâmetros do GP (\(\boldsymbol{\theta}_{GP}\)) através de gradiente descendente

$$
\begin{aligned}
\mathcal{L}(\mathbf{W}, \mathbf{b}, \boldsymbol{\theta}_{GP}) &= -\log p(\mathbf{y}\mid\text{MLP}(\mathbf{X}), \boldsymbol{\theta}_{GP}) \\
\boldsymbol{\phi}_{t+1} &= \boldsymbol{\phi}_t - \eta \nabla_{\boldsymbol{\phi}} \mathcal{L}(\boldsymbol{\phi}_t),
\end{aligned}
$$

onde \(\boldsymbol{\phi} = \{\mathbf{W}, \mathbf{b}, \boldsymbol{\theta}_{GP}\}\) representa todos os parâmetros treináveis do modelo híbrido.

Esta arquitetura híbrida une o poder das redes neurais na extração de características complexas com a precisão dos GPs na quantificação de incerteza.