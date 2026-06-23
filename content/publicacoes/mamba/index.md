+++
title = "Notas sobre Mamba"
description = "Leitura comentada de três artigos sobre modelos de espaço de estados seletivos: Mamba, a dualidade SSD do Mamba-2 e os refinamentos do Mamba-3"
date = "2026-06-23"
weight = 1

[taxonomies]
tags=["aprendizado de máquina", "modelos de sequência", "modelos de espaço de estados", "mamba"]

[extra]
toc = true

+++

# Por que estas notas

Tenho estudado SSM e Mamba para minha dissertação de mestrado, e ando tomando notas. A ideia central com este texto é sedimentar tais leituras. 

E por que estudar SSM e Mamba? Por eficiência. O mecanismo de atenção[^1] processa uma sequência de comprimento \\(L\\) comparando cada posição com todas as demais, o que custa \\(\mathcal{O}(L^2)\\) em tempo e memória e torna proibitivo o processamento de contextos muito longos. Modelos de espaço de estados (SSM, de _state space models_) oferecem uma alternativa com custo \\(\mathcal{O}(L)\\), mas historicamente pagavam esse barateamento com perda de capacidade de raciocínio dependente de conteúdo. Os três artigos a seguir contam a história de como essa lacuna foi sendo fechada:

1. **Mamba**[^2] introduz a _seleção_ &mdash; deixar os parâmetros do SSM dependerem da entrada &mdash; e um algoritmo de varredura ciente do hardware que mantém o custo linear.
2. **Mamba-2**[^3] revela que SSMs e atenção são duas faces da mesma operação com matrizes estruturadas (a _dualidade de espaços de estados estruturados_, ou SSD), e usa essa equivalência para construir um algoritmo 2 a 8 vezes mais rápido.
3. **Mamba-3**[^4] refina a recorrência com três princípios extraídos da teoria de SSMs: discretização trapezoidal, estados complexos e uma formulação de múltiplas entradas e saídas (MIMO).

# Preliminares: o modelo de espaço de estados

Um SSM, em sua forma contínua, é um sistema linear que mapeia um sinal de entrada \\(x(t) \in \mathbb{R}\\) em uma saída \\(y(t) \in \mathbb{R}\\) por meio de um estado latente \\(h(t) \in \mathbb{R}^{N}\\):

\\[
\begin{aligned}
h'(t) &= \mathbf{A}\,h(t) + \mathbf{B}\,x(t) \\\\
y(t) &= \mathbf{C}\,h(t)
\end{aligned}
\\]

onde \\(\mathbf{A} \in \mathbb{R}^{N \times N}\\) governa a dinâmica do estado, \\(\mathbf{B} \in \mathbb{R}^{N \times 1}\\) injeta a entrada e \\(\mathbf{C} \in \mathbb{R}^{1 \times N}\\) projeta o estado na saída. O tamanho \\(N\\) do estado é a "memória" do modelo: tudo o que a sequência viu até o instante \\(t\\) precisa caber em \\(h(t)\\).

Para operar sobre sequências discretas, o sistema é discretizado com um passo \\(\Delta\\). A discretização por retenção de ordem zero (ZOH, de _zero-order hold_), que assume a entrada constante dentro de cada intervalo \\(\Delta\\), produz

\\[
\begin{aligned}
\bar{\mathbf{A}} &= \exp(\Delta \mathbf{A}) \\\\
\bar{\mathbf{B}} &= (\Delta \mathbf{A})^{-1}\bigl(\exp(\Delta \mathbf{A}) - \mathbf{I}\bigr)\cdot \Delta \mathbf{B}
\end{aligned}
\\]

de modo que a recorrência discreta se torna

\\[
\begin{aligned}
h\_t &= \bar{\mathbf{A}}\,h\_{t-1} + \bar{\mathbf{B}}\,x\_t \\\\
y\_t &= \mathbf{C}\,h\_t
\end{aligned}
\\]

Há, aqui, uma dualidade que sustenta toda a literatura de SSMs. Se \\(\bar{\mathbf{A}}, \bar{\mathbf{B}}, \mathbf{C}\\) são fixos &mdash; isto é, se o sistema é invariante no tempo (LTI, de _linear time-invariant_) &mdash;, então desenrolar a recorrência mostra que \\(y\\) é uma **convolução** de \\(x\\) com um núcleo fixo:

\\[
y\_t = \sum\_{k=0}^{t} \mathbf{C}\,\bar{\mathbf{A}}^{\,k}\,\bar{\mathbf{B}}\;x\_{t-k} \quad\Longleftrightarrow\quad y = \bar{\mathbf{K}} \ast x, \qquad \bar{\mathbf{K}} = (\mathbf{C}\bar{\mathbf{B}}, \mathbf{C}\bar{\mathbf{A}}\bar{\mathbf{B}}, \dots, \mathbf{C}\bar{\mathbf{A}}^{L-1}\bar{\mathbf{B}})
\\]

Essa equivalência é a chave do desempenho dos modelos S4[^5]: pode-se **treinar** em modo convolucional, paralelizando ao longo de toda a sequência com a transformada de Fourier, e **inferir** em modo recorrente, gerando um token por vez com estado de tamanho constante. O preço, porém, é que o núcleo \\(\bar{\mathbf{K}}\\) é o mesmo para toda a sequência: o modelo não consegue tratar um token de forma diferente de outro com base em seu conteúdo. É exatamente essa limitação que o Mamba ataca.

# Mamba: a seleção como mecanismo

## A limitação dos SSMs invariantes no tempo

O artigo de Gu e Dao[^2] parte de uma observação sobre tarefas sintéticas simples, como cópia seletiva e indução de padrões. Resolver essas tarefas exige _ignorar_ tokens irrelevantes e _lembrar_ os relevantes &mdash; ou seja, um comportamento dependente de conteúdo. Um SSM LTI não pode fazer isso: como \\(\bar{\mathbf{A}}, \bar{\mathbf{B}}, \mathbf{C}\\) não dependem da entrada, o modelo comprime o contexto de maneira uniforme, sem decidir o que reter. A atenção, em contraste, resolve essas tarefas trivialmente, porque compara conteúdos &mdash; mas ao custo quadrático.

A pergunta do artigo é, então: é possível dar a um SSM a capacidade de seleção dependente de conteúdo sem renunciar ao custo linear?

## O mecanismo de seleção (S6)

A resposta é deixar os parâmetros variarem com a entrada. No SSM seletivo &mdash; batizado de S6, por ser um S4 com mecanismo de seleção &mdash;, os parâmetros deixam de ser constantes e passam a ser funções do token \\(x\_t\\):

\\[
\begin{aligned}
\mathbf{B}\_t &= \text{Linear}\_B(x\_t) \\\\
\mathbf{C}\_t &= \text{Linear}\_C(x\_t) \\\\
\Delta\_t &= \text{softplus}\bigl(\text{Linear}\_\Delta(x\_t) + \text{bias}\bigr)
\end{aligned}
\\]

A matriz \\(\mathbf{A}\\) permanece fixa, mas, por ser discretizada por \\(\Delta\_t\\), a transição efetiva \\(\bar{\mathbf{A}}\_t = \exp(\Delta\_t \mathbf{A})\\) também passa a depender da entrada. Na prática, \\(\mathbf{A}\\) é mantida diagonal e parametrizada como \\(\mathbf{A} = -\exp(\mathbf{A}\_{\log})\\), o que garante autovalores reais negativos e, portanto, dinâmica estável e contrativa. A recorrência torna-se variante no tempo:

\\[
\begin{aligned}
h\_t &= \bar{\mathbf{A}}\_t\,h\_{t-1} + \bar{\mathbf{B}}\_t\,x\_t \\\\
y\_t &= \mathbf{C}\_t\,h\_t
\end{aligned}
\\]

O papel de \\(\Delta\_t\\) merece destaque, porque é o coração da seleção. Pode-se lê-lo como uma porta (_gate_): um \\(\Delta\_t\\) grande faz \\(\bar{\mathbf{A}}\_t \to 0\\) e \\(\bar{\mathbf{B}}\_t\\) dominar, de modo que o estado é "reiniciado" e foca o token atual; um \\(\Delta\_t\\) pequeno faz \\(\bar{\mathbf{A}}\_t \to \mathbf{I}\\) e \\(\bar{\mathbf{B}}\_t \to 0\\), de modo que o token atual é ignorado e o estado é mantido. O modelo aprende, token a token, o quanto prestar atenção a cada entrada &mdash; e é nesse sentido que a seleção generaliza os mecanismos de _gating_ de RNNs clássicas.

## A varredura paralela ciente do hardware

A seleção tem um custo: ao tornar os parâmetros dependentes da entrada, o modelo perde a propriedade LTI e, com ela, a equivalência com a convolução. Não há mais um núcleo fixo \\(\bar{\mathbf{K}}\\) a aplicar via Fourier; resta a recorrência, que é sequencial por natureza.

A solução do artigo é calcular a recorrência como uma **varredura associativa paralela** (_parallel scan_). A recorrência \\(h\_t = \bar{\mathbf{A}}\_t h\_{t-1} + \bar{\mathbf{B}}\_t x\_t\\) é uma operação associativa sobre os pares \\((\bar{\mathbf{A}}\_t, \bar{\mathbf{B}}\_t x\_t)\\), e varreduras associativas admitem algoritmos paralelos em \\(\mathcal{O}(\log L)\\) passos[^6]. A isso, o artigo soma três decisões de engenharia ciente do hardware:

- **Fusão de núcleos** (_kernel fusion_): os parâmetros discretizados são materializados na memória rápida (SRAM) da GPU, e não na memória principal (HBM), evitando o tráfego que dominaria o tempo de execução.
- **Varredura sem materializar o estado expandido**: o estado de dimensão \\(N\\) é mantido na SRAM e só a saída é escrita de volta.
- **Recomputação**: os estados intermediários não são guardados para o passo de retropropagação, mas recomputados, trocando memória por operações &mdash; o que é vantajoso em GPUs modernas.

O resultado é um SSM seletivo que escala linearmente em \\(L\\), gera tokens com estado de tamanho constante e atinge, segundo o artigo, vazão de inferência cerca de cinco vezes maior que a de um Transformer comparável.

## O bloco Mamba

A arquitetura final é deliberadamente simples. Em vez de alternar blocos de atenção e blocos de perceptron multicamadas (MLP), como faz o Transformer, o Mamba empilha um único bloco homogêneo. Esse bloco combina, em um caminho, uma projeção que expande a dimensão, uma convolução curta em profundidade (que captura contexto local antes da varredura), uma ativação SiLU e o SSM seletivo; em paralelo, um segundo caminho fornece um _gate_ multiplicativo (no espírito do _Gated Linear Unit_). A saída dos dois caminhos é combinada e projetada de volta à dimensão original. Sem atenção e sem MLP, todo o processamento da sequência recai sobre o SSM seletivo &mdash; o que dá à arquitetura sua economia e sua elegância.

{% mermaid() %}

flowchart TB
    x["Entrada"] --> inproj["Projeção de entrada"]
    inproj -->|"ramo x"| conv["Convolução curta em profundidade"]
    conv --> act["SiLU"]
    act --> ssm["SSM seletivo (S6)"]
    inproj -->|"ramo z (gate)"| gate["SiLU"]
    ssm --> mul["⊙ multiplicação"]
    gate --> mul
    mul --> outproj["Projeção de saída"]
    outproj --> y["Saída"]

{% end %}

# Mamba-2: a dualidade de espaços de estados estruturados

O segundo artigo[^3], de Dao e Gu, é mais teórico e, em certo sentido, mais ambicioso: ele explica _por que_ o Mamba funciona, situando-o num arcabouço que também contém a atenção. A tese, anunciada já no título &mdash; "Transformers are SSMs" &mdash;, é que as duas arquiteturas são fatorizações diferentes do mesmo objeto matemático.

## SSMs como matrizes semisseparáveis

O ponto de partida é escrever o SSM não como recorrência, mas como uma única transformação matricial. Desenrolando a recorrência (com \\(\mathbf{A}\_t\\) variante no tempo), cada saída é

\\[
y\_j = \sum\_{i \le j} \mathbf{C}\_j^\top \bigl(\bar{\mathbf{A}}\_j \bar{\mathbf{A}}\_{j-1}\cdots \bar{\mathbf{A}}\_{i+1}\bigr)\bar{\mathbf{B}}\_i\,x\_i
\\]

ou seja, \\(y = \mathbf{M}x\\), onde \\(\mathbf{M}\\) é a matriz triangular inferior de entradas

\\[
\mathbf{M}\_{ji} = \mathbf{C}\_j^\top \bar{\mathbf{A}}\_{j:i}\,\bar{\mathbf{B}}\_i, \qquad \bar{\mathbf{A}}\_{j:i} = \prod\_{k=i+1}^{j}\bar{\mathbf{A}}\_k
\\]

Matrizes dessa forma são chamadas **semisseparáveis** (mais precisamente, \\(N\\)-semisseparáveis sequenciais): qualquer submatriz inteiramente contida no triângulo inferior tem posto no máximo \\(N\\). Essa estrutura é o que permite calcular \\(y = \mathbf{M}x\\) em tempo linear, apesar de \\(\mathbf{M}\\) ser uma matriz \\(L \times L\\).

## A forma dual: atenção mascarada

A decisão arquitetural decisiva do Mamba-2 é restringir \\(\mathbf{A}\_t\\) a um **escalar vezes a identidade**, \\(\bar{\mathbf{A}}\_t = a\_t \mathbf{I}\\). Com isso, o produto de transições vira um produto de escalares, e a matriz \\(\mathbf{M}\\) fatora-se de modo notável:

\\[
\mathbf{M}\_{ji} = \Bigl(\prod\_{k=i+1}^{j} a\_k\Bigr)\,\mathbf{C}\_j^\top \mathbf{B}\_i = \mathbf{L}\_{ji}\,(\mathbf{C}\_j^\top \mathbf{B}\_i)
\\]

onde \\(\mathbf{L}\_{ji} = \prod\_{k=i+1}^{j} a\_k\\) é uma matriz triangular inferior de produtos cumulativos. Em notação compacta,

\\[
\mathbf{M} = \mathbf{L} \circ (\mathbf{C}\,\mathbf{B}^\top)
\\]

onde \\(\circ\\) é o produto de Hadamard. Aqui está a dualidade: \\(\mathbf{C}\mathbf{B}^\top\\) desempenha o papel de \\(\mathbf{Q}\mathbf{K}^\top\\) na atenção, e \\(\mathbf{L}\\) é uma máscara causal &mdash; só que, em vez de uma máscara de zeros e uns, é uma máscara de _decaimento_, cujas entradas são produtos cumulativos de \\(a\_k\\). Calcular \\(y = (\mathbf{L} \circ \mathbf{C}\mathbf{B}^\top)x\\) diretamente é precisamente uma forma de atenção linear mascarada, com custo quadrático em \\(L\\). Calcular a mesma coisa pela recorrência é o SSM, com custo linear. São a mesma função, computada por dois caminhos &mdash; a **dualidade de espaços de estados estruturados** (SSD, de _structured state space duality_).

## O algoritmo SSD

A equivalência não é só conceitual: ela rende um algoritmo melhor. A ideia é particionar a sequência em blocos e tratar cada parte da matriz \\(\mathbf{M}\\) com o método mais conveniente:

- Os **blocos diagonais** &mdash; interações dentro de um mesmo bloco curto &mdash; são computados pela forma dual quadrática, que é pequena e aproveita bem as unidades de multiplicação de matrizes (_tensor cores_) das GPUs.
- Os **blocos fora da diagonal** &mdash; o fluxo de informação entre blocos &mdash; são computados pela forma recorrente linear, propagando um estado resumido de bloco a bloco.

Esse algoritmo "por blocos" (_chunkwise_) combina o melhor dos dois mundos: a paralelização eficiente da atenção dentro de blocos e a escala linear do SSM entre blocos. Na prática, é de 2 a 8 vezes mais rápido que a varredura seletiva do Mamba original e permite estados substancialmente maiores, porque o gargalo de memória da varredura é aliviado. Mantém-se o custo \\(\mathcal{O}(L)\\), com aproveitamento muito maior do hardware.

{% mermaid() %}

flowchart TB
    seq["Sequência de comprimento L"] --> split["Particiona em blocos"]
    split --> diag["Blocos diagonais<br/>(dentro do bloco):<br/>forma dual quadrática, tipo atenção"]
    split --> off["Blocos fora da diagonal<br/>(entre blocos):<br/>forma recorrente linear, estado resumido"]
    diag --> comb["Combina"]
    off --> comb
    comb --> out["Saída y = M x"]

{% end %}

## Mudanças arquiteturais

A restrição de \\(\mathbf{A}\\) a escalar abre espaço para tratar o SSM como uma forma de atenção multi-cabeça. O Mamba-2 introduz, então, cabeças múltiplas e produz \\(\mathbf{B}, \mathbf{C}, \Delta\\) em paralelo a partir da entrada (em vez de sequencialmente, como no Mamba-1), o que melhora a paralelização e a interação com o paralelismo de tensores em treinos de grande escala. O resultado é um bloco mais simples e mais escalável, sem perda de qualidade em modelagem de linguagem.

# Mamba-3: refinando os princípios de espaço de estados

O terceiro artigo[^4], de Lahoti e colaboradores, mantém o fio recorrente da família Mamba, mas não é apenas um ajuste pontual do bloco anterior. Ele reorganiza a arquitetura em torno de uma receita mais próxima de Llama &mdash; alternando blocos Mamba-3 e blocos SwiGLU &mdash; e aperfeiçoa o mecanismo de SSM em três frentes, cada uma derivada de um princípio da teoria de espaços de estados. O motivador é a inferência: como o custo de gerar tokens com Transformers é alto, vale a pena extrair mais expressividade de cada unidade de estado de um SSM sem aumentar, ou aumentando muito pouco, a latência de decodificação.

## Recorrência trapezoidal

A primeira melhoria é trocar a discretização. O Mamba-3 chama a regra usada por Mamba-1 e Mamba-2 de **exponential-Euler**: depois de resolver analiticamente a parte exponencial da transição, a integral de entrada é aproximada por uma regra de Euler no endpoint direito. Isso recupera a atualização

\\[
h\_t = \exp(\Delta\_t A\_t)h\_{t-1} + \Delta\_t B\_t x\_t.
\\]

O Mamba-3 substitui essa aproximação por uma **discretização exponencial-trapezoidal generalizada**. A ideia continua sendo causal: a atualização não olha para \\(x\_{t+1}\\). Ela mistura o endpoint anterior e o endpoint atual do intervalo,

\\[
\begin{aligned}
h\_t
&= \exp(\Delta\_t A\_t)h\_{t-1}
   {}+ (1-\lambda\_t)\Delta\_t\exp(\Delta\_t A\_t)B\_{t-1}x\_{t-1}
   {}+ \lambda\_t\Delta\_t B\_t x\_t \\\\
&= \alpha\_t h\_{t-1} + \beta\_t B\_{t-1}x\_{t-1} + \gamma\_t B\_t x\_t,
\end{aligned}
\\]

com

\\[
\alpha\_t = \exp(\Delta\_t A\_t), \qquad
\beta\_t = (1-\lambda\_t)\Delta\_t\exp(\Delta\_t A\_t), \qquad
\gamma\_t = \lambda\_t\Delta\_t.
\\]

Quando \\(\lambda\_t = 1\\), a regra volta ao caso exponential-Euler. Quando \\(\lambda\_t = 1/2\\), aproxima a regra trapezoidal clássica. No modelo final, porém, \\(\lambda\_t\\) é aprendido como uma porta dependente do token, tipicamente \\(\lambda\_t = \sigma(u\_t)\\). Por isso, o ganho não deve ser lido como literalmente "sem parâmetros": há uma parametrização adicional pequena para a porta. O ponto central é outro: a recorrência passa a conter uma convolução causal de largura dois sobre o fluxo de entrada do estado, \\(B\_t x\_t\\), sem reintroduzir a convolução curta externa usada em Mamba-2.

## Estados complexos e rastreamento de estado

A segunda melhoria ataca uma limitação conhecida dos SSMs com transições reais. Quando a transição efetiva tem autovalores reais não negativos, a dinâmica do estado é essencialmente de escala: cada componente cresce ou decai sem rotação. Isso é útil para memória associativa, mas ruim para **rastreamento de estado** (_state tracking_) &mdash; tarefas como contar paridade, acompanhar contadores modulares ou rastrear estados que oscilam, em que o modelo precisa de dinâmica periódica, e não de mero decaimento.

O Mamba-3 introduz **estados de valor complexo**. Autovalores complexos correspondem a dinâmica _rotacional_: o estado não apenas decai, mas gira, codificando naturalmente amplitude e fase. Na implementação, essa dinâmica pode ser escrita como um SSM real com blocos de rotação \\(2 \times 2\\), isto é, como uma forma de RoPE dependente dos dados aplicada às projeções \\(\mathbf{B}\\) e \\(\mathbf{C}\\). Isso restaura a capacidade de representar padrões periódicos e oscilatórios e, com ela, a competência em tarefas de rastreamento de estado em que os modelos reais falhavam.

## Formulação MIMO

A terceira melhoria diz respeito à capacidade por unidade de estado. A forma SSD do Mamba-2, ao restringir \\(\mathbf{A}\\) a escalar, torna cada atualização efetivamente de **uma entrada e uma saída** (SISO, de _single-input single-output_): a interação \\(\mathbf{B}\_i\\) com \\(\mathbf{C}\_j\\) é de posto um por cabeça. O Mamba-3 generaliza para uma formulação de **múltiplas entradas e múltiplas saídas** (MIMO), em que o estado processa vários canais simultaneamente e as projeções \\(\mathbf{B}\\) e \\(\mathbf{C}\\) produzem interações de posto maior.

O efeito prático é aumentar a expressividade sem aumentar o tamanho do estado &mdash; e, portanto, sem aumentar muito a latência de decodificação, que é governada em grande parte pelo estado a ser lido e escrito a cada token. Como a decodificação dos SSMs costuma ser limitada por movimentação de memória, a formulação MIMO aumenta a intensidade aritmética: faz mais multiplicações úteis sobre praticamente o mesmo tráfego de estado. O artigo reporta que o Mamba-3 atinge perplexidade comparável à do Mamba-2 usando **metade** do tamanho de estado, o que expressa esse ganho de densidade informacional.

# Síntese

As três melhorias são complementares e, combinadas, deslocam a fronteira em três eixos: recuperação de informação (_retrieval_), rastreamento de estado e modelagem de linguagem. Em escala de 1,5 bilhão de parâmetros, o artigo reporta ganho de 1,8 ponto percentual de acurácia sobre modelos comparáveis, preservando a eficiência de inferência que é a razão de ser de toda a família. A mensagem é que ainda havia expressividade a extrair do arcabouço de SSMs &mdash; bastava revisitar a discretização, o domínio dos autovalores e a estrutura das projeções.

Lidos em sequência, os três artigos formam um arco coerente. O **Mamba** identificou que a invariância no tempo era a causa da fraqueza dos SSMs em tarefas dependentes de conteúdo e a removeu com o mecanismo de seleção, pagando o preço com um algoritmo de varredura ciente do hardware. O **Mamba-2** explicou esse sucesso de um ângulo mais alto, mostrando que SSMs e atenção são fatorizações do mesmo cálculo com matrizes semisseparáveis, e converteu essa dualidade em um algoritmo bem mais rápido. O **Mamba-3** voltou aos princípios &mdash; discretização, autovalores, posto das projeções &mdash; para espremer mais expressividade de cada unidade de estado, sem comprometer a inferência.

O fio condutor é a tensão permanente entre dois custos: o quadrático da atenção, que dá expressividade plena à troca de informação entre posições, e o linear dos SSMs, que comprime tudo num estado de tamanho fixo. A família Mamba é, em larga medida, uma sequência de respostas cada vez mais refinadas à pergunta de quanto da expressividade da atenção se consegue recuperar dentro de um orçamento linear &mdash; e cada artigo recupera um pouco mais.

# Referências

[^1]: VASWANI, A.; SHAZEER, N.; PARMAR, N.; USZKOREIT, J.; JONES, L.; GOMEZ, A. N.; KAISER, Ł.; POLOSUKHIN, I. Attention is all you need. In: *Advances in Neural Information Processing Systems*, v. 30, 2017.

[^2]: GU, A.; DAO, T. Mamba: linear-time sequence modeling with selective state spaces. In: *Conference on Language Modeling (COLM)*, 2024. *arXiv preprint arXiv:2312.00752*, 2023.

[^3]: DAO, T.; GU, A. Transformers are SSMs: generalized models and efficient algorithms through structured state space duality. In: *International Conference on Machine Learning (ICML)*, 2024. *arXiv preprint arXiv:2405.21060*.

[^4]: LAHOTI, A.; LI, K. Y.; CHEN, B.; WANG, C.; BICK, A.; KOLTER, J. Z.; DAO, T.; GU, A. Mamba-3: improved sequence modeling using state space principles. In: *International Conference on Learning Representations (ICLR)*, 2026. *arXiv preprint arXiv:2603.15569*.

[^5]: GU, A.; GOEL, K.; RÉ, C. Efficiently modeling long sequences with structured state spaces. In: *International Conference on Learning Representations (ICLR)*, 2022. *arXiv preprint arXiv:2111.00396*.

[^6]: BLELLOCH, G. E. Prefix sums and their applications. *Technical Report CMU-CS-90-190*, School of Computer Science, Carnegie Mellon University, 1990.
