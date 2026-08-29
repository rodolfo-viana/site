+++
title = "O que o Dice não vê"
description = "Uma leitura crítica do coeficiente de Dice e das métricas que revelam erros de borda, distância, topologia, objetos e volume em segmentação de imagens médicas"
date = "2026-08-29"
weight = 1

[taxonomies]
tags=["aprendizado de máquina", "segmentação de imagens", "imagens médicas", "métricas de avaliação", "u-net"]

[extra]
math = true
toc = true

+++

# Por que olhar além do Dice

Minha pesquisa de mestrado trata do aprimoramento da detecção de bordas em arquiteturas U-Net para segmentação de imagens médicas. Uma comparação encerrada numa única coluna de Dice deixa sem resposta justamente o que quero medir: onde a borda falhou e por quantos milímetros.

Em um [comparativo de arquiteturas U-Net](/projetos/unet-comparativo/) que publiquei aqui, a U-Net padrão obteve o maior Dice médio. A inspeção das máscaras, porém, separava erros muito diferentes: vazamento para o fundo, halo periférico, perda de um lóbulo, descontinuidade e falha em alvos pequenos. Todos alteram a sobreposição, mas o número não informa qual deles ocorreu, onde ocorreu ou quão longe a borda prevista ficou da referência.

O Dice é simples, dispensa a contagem dos numerosos verdadeiros negativos do fundo e responde bem à pergunta para a qual foi definido: **quanto duas regiões se sobrepõem?** Sua resposta fica incompleta quando passa a representar sozinha a qualidade da segmentação. A literatura de validação em imagens médicas documenta essa inadequação entre a métrica escolhida e o interesse real da aplicação.[^1] [^2]

Quero delimitar seu campo de visão e identificar as perguntas que exigem outras medidas.

# O que o Dice mede

## Uma estatística de sobreposição

Sejam \\(G\\) a máscara binária de referência e \\(P\\) a máscara predita. Proposto por Lee Dice em 1945 para medir associação ecológica,[^3] o coeficiente assume, em segmentação, a forma

\\[
\operatorname{Dice}(P,G)
= \frac{2|P\cap G|}{|P|+|G|}
= \frac{2TP}{2TP+FP+FN}.
\\]

Quando ao menos uma máscara não é vazia, o valor fica entre zero e um: é um para máscaras não vazias idênticas e zero quando não há interseção. Quando \\(P\\) e \\(G\\) são não vazias, ele também é o \\(F\_1\\) calculado no nível de pixel ou voxel: a média harmônica entre precisão e sensibilidade. Três propriedades explicam boa parte de sua popularidade.

Primeiro, verdadeiros negativos não aparecem na fórmula. Em uma imagem na qual a anatomia de interesse ocupa uma região pequena, o fundo corretamente classificado não domina o resultado como dominaria a acurácia. Segundo, a medida é simétrica: trocar referência e predição não muda o valor. Terceiro, sua interpretação geométrica é direta e independe da unidade física da imagem.

A mesma fórmula omite a direção e a posição do erro. Falsos positivos e falsos negativos entram no mesmo denominador; o Dice não diz se o modelo tende a expandir ou contrair a estrutura. As coordenadas não entram na fórmula: um falso positivo encostado na borda e outro a trinta milímetros dela têm o mesmo peso. A divisão pela soma dos volumes também torna a penalização relativa ao tamanho, de modo que o mesmo erro absoluto consome uma fração maior de uma estrutura pequena.[^1]

## Dice e IoU contam a mesma história por outra escala

A interseção sobre união, ou IoU, é

\\[
\operatorname{IoU}(P,G)=\frac{|P\cap G|}{|P\cup G|}
=\frac{TP}{TP+FP+FN}.
\\]

Para uma dupla de máscaras com união não vazia, Dice e IoU estão ligados exatamente por

\\[
\operatorname{Dice}=\frac{2\operatorname{IoU}}{1 + \operatorname{IoU}},
\qquad
\operatorname{IoU}=\frac{\operatorname{Dice}}{2 - \operatorname{Dice}}.
\\]

Logo, uma máscara com Dice maior também tem IoU maior. Reportar as duas não fornece duas leituras geométricas independentes; fornece uma transformação monotônica do mesmo conjunto de contagens.[^4] Há uma ressalva: como a transformação é não linear, médias de Dice e de IoU calculadas caso a caso não precisam preservar diferenças ou ordenações depois da agregação. Isso é um efeito do resumo estatístico, não informação espacial nova.

Também convém separar métrica e função de perda. O Dice acima compara máscaras binárias após uma regra de decisão. A chamada *soft Dice loss* opera sobre probabilidades, depende de redução entre classes e lotes e costuma incluir um termo de suavização. Treinar com uma dessas versões não determina como a avaliação final deve ser feita; apenas define parte do problema de otimização.

# O mesmo Dice, erros diferentes

Considere uma referência quadrada de \\(64\times64\\) pixels, com área \\(4096\\). Construí três predições, todas também com \\(4096\\) pixels e com a mesma interseção de \\(3968\\) pixels com a referência:

1. **Deslocamento**: o quadrado inteiro é movido dois pixels para a direita.
2. **Ilha**: uma faixa de \\(128\\) pixels é retirada da borda e recolocada longe do objeto, formando um segundo componente.
3. **Buraco**: \\(128\\) pixels são retirados do interior e recolocados como uma faixa ligada à borda externa.

Por construção, as três predições têm

\\[
\operatorname{Dice}=\frac{2\cdot3968}{4096+4096}=0{,}96875,
\qquad
\operatorname{IoU}=\frac{3968}{4224}\approx0{,}93939.
\\]

O código abaixo reproduz o exemplo apenas com NumPy. Ele usa o contorno interno de quatro vizinhos, distância entre centros de pixels, o máximo dos dois percentis direcionais para HD95 e uma média agrupada para ASSD. O Dice de superfície é uma aproximação ilustrativa que atribui o mesmo peso a cada pixel de contorno. O código também materializa todas as distâncias entre pares de pontos, portanto não é uma implementação de referência nem uma solução para volumes médicos reais.

```python
import numpy as np


def contorno(mascara: np.ndarray) -> np.ndarray:
    """Contorno interno de quatro vizinhos de uma máscara binária 2-D."""
    m = np.pad(mascara, 1, constant_values=False)
    interior = (
        m[1:-1, 1:-1]
        & m[:-2, 1:-1]
        & m[2:, 1:-1]
        & m[1:-1, :-2]
        & m[1:-1, 2:]
    )
    return mascara & ~interior


def distancias_direcionais(origem: np.ndarray, destino: np.ndarray) -> np.ndarray:
    """Distância euclidiana de cada pixel de contorno de origem ao destino."""
    a = np.argwhere(contorno(origem))
    b = np.argwhere(contorno(destino))
    quadrados = ((a[:, None, :] - b[None, :, :]) ** 2).sum(axis=2)
    return np.sqrt(quadrados.min(axis=1))


def contar_componentes(mascara: np.ndarray) -> int:
    """Número de componentes de primeiro plano com quatro vizinhos."""
    restantes = set(map(tuple, np.argwhere(mascara)))
    total = 0
    while restantes:
        total += 1
        pilha = [restantes.pop()]
        while pilha:
            linha, coluna = pilha.pop()
            for vizinho in (
                (linha - 1, coluna),
                (linha + 1, coluna),
                (linha, coluna - 1),
                (linha, coluna + 1),
            ):
                if vizinho in restantes:
                    restantes.remove(vizinho)
                    pilha.append(vizinho)
    return total


def contar_buracos(mascara: np.ndarray) -> int:
    """Componentes de fundo que não alcançam a margem da imagem."""
    fundo_com_margem = np.pad(~mascara, 1, constant_values=True)
    return contar_componentes(fundo_com_margem) - 1


def metricas(referencia: np.ndarray, predicao: np.ndarray, tolerancia=2.0):
    intersecao = np.logical_and(referencia, predicao).sum()
    uniao = np.logical_or(referencia, predicao).sum()
    ref_pred = distancias_direcionais(referencia, predicao)
    pred_ref = distancias_direcionais(predicao, referencia)
    agrupadas = np.concatenate((ref_pred, pred_ref))
    return {
        "Dice": 2 * intersecao / (referencia.sum() + predicao.sum()),
        "IoU": intersecao / uniao,
        "HD95": max(np.percentile(ref_pred, 95), np.percentile(pred_ref, 95)),
        "ASSD": agrupadas.mean(),
        "SD@2": np.mean(agrupadas <= tolerancia),
        "RVE_pct": 100 * (predicao.sum() - referencia.sum()) / referencia.sum(),
        "componentes": contar_componentes(predicao),
        "buracos": contar_buracos(predicao),
    }


referencia = np.zeros((192, 192), dtype=bool)
referencia[48:112, 48:112] = True

deslocamento = np.zeros_like(referencia)
deslocamento[48:112, 50:114] = True

ilha = referencia.copy()
ilha[48:112, 110:112] = False
ilha[144:152, 144:160] = True

buraco = referencia.copy()
buraco[76:84, 72:88] = False
buraco[48:112, 112:114] = True

for nome, predicao in {
    "deslocamento": deslocamento,
    "ilha": ilha,
    "buraco": buraco,
}.items():
    valores = metricas(referencia, predicao)
    texto = " ".join(f"{chave}={valor:.3f}" for chave, valor in valores.items())
    print(nome, texto)

# deslocamento Dice=0.969 IoU=0.939 HD95=2.000  ASSD=1.000 SD@2=1.000 RVE_pct=0.000 componentes=1.000 buracos=0.000
# ilha        Dice=0.969 IoU=0.939 HD95=57.347 ASSD=4.887 SD@2=0.919 RVE_pct=0.000 componentes=2.000 buracos=0.000
# buraco      Dice=0.969 IoU=0.939 HD95=27.000 ASSD=2.626 SD@2=0.914 RVE_pct=0.000 componentes=1.000 buracos=1.000
```

A tabela acrescenta à sobreposição as distâncias e a topologia de cada máscara:

| Predição | Dice ↑ | IoU ↑ | HD95 ↓ (px) | ASSD ↓ (px) | SD@2 ↑ | Erro de volume | Componentes / buracos |
|---|---:|---:|---:|---:|---:|---:|---:|
| Deslocamento | 0,969 | 0,939 | 2,000 | 1,000 | 1,000 | 0,0% | 1 / 0 |
| Ilha | 0,969 | 0,939 | 57,347 | 4,887 | 0,919 | 0,0% | 2 / 0 |
| Buraco | 0,969 | 0,939 | 27,000 | 2,626 | 0,914 | 0,0% | 1 / 1 |

O exemplo foi desenhado para isolar geometria, não para representar risco clínico. Dice e IoU são idênticos e altos; o erro de volume é zero nos três casos. HD95 reage à ilha remota. A contagem de componentes registra os dois objetos da predição, enquanto a contagem de buracos captura uma alteração que o número de componentes perderia.

O Dice de superfície a dois pixels considera todo o deslocamento aceitável, pois nenhuma parte da borda se afasta mais que a tolerância. Entre os dois defeitos estruturais, ele atribui valor ligeiramente maior à ilha que ao buraco, enquanto o HD95 julga a ilha muito pior por causa da distância do componente remoto. Uma métrica conta a fração de superfície dentro da tolerância; a outra resume a cauda das distâncias. A ordenação depende da propriedade escolhida para a tarefa: extensão da borda aceitável, erro local extremo, conectividade ou outra.

## O preço relativo de um pixel

O tamanho do objeto cria outro efeito. Se uma referência tem área \\(n\\) e uma erosão remove \\(e\\) pixels, a predição fica contida na referência, com \\(|P|=|P\cap G|=n-e\\). Nesse caso,

\\[
\operatorname{Dice}=\frac{2(n-e)}{2n-e}.
\\]

A razão \\(e/n\\) tende a ser maior em estruturas pequenas, nas quais a borda representa uma fração maior da área. Aplicar uma única erosão de quatro vizinhos a dois discos na mesma grade torna o efeito visível:

```python
def disco(raio: int, tamanho=128) -> np.ndarray:
    y, x = np.ogrid[:tamanho, :tamanho]
    centro = (tamanho - 1) / 2
    return (y - centro) ** 2 + (x - centro) ** 2 <= raio**2


def erosao_quatro_vizinhos(mascara: np.ndarray) -> np.ndarray:
    m = np.pad(mascara, 1, constant_values=False)
    return (
        m[1:-1, 1:-1]
        & m[:-2, 1:-1]
        & m[2:, 1:-1]
        & m[1:-1, :-2]
        & m[1:-1, 2:]
    )


for raio in (10, 40):
    referencia = disco(raio)
    predicao = erosao_quatro_vizinhos(referencia)
    intersecao = np.logical_and(referencia, predicao).sum()
    dice = 2 * intersecao / (referencia.sum() + predicao.sum())
    removidos = referencia.sum() - predicao.sum()
    print(f"raio={raio:2d} área={referencia.sum():4d} removidos={removidos:3d} Dice={dice:.3f}")

# raio=10 área= 316 removidos= 56 Dice=0.903
# raio=40 área=5024 removidos=224 Dice=0.977
```

A operação de borda é a mesma nos dois casos, mas a queda do Dice é muito maior no disco pequeno. O resultado é coerente com a definição de sobreposição do coeficiente, mas impede interpretar a mesma diferença de Dice como a mesma diferença geométrica em estruturas de tamanhos distintos.

# A distância até a borda

Para avaliar o contorno, primeiro é preciso representá-lo. Sejam \\(\partial P\\) e \\(\partial G\\) as superfícies da predição e da referência, e

\\[
d(x,S)=\inf\_{y\in S}\lVert x-y\rVert\_2
\\]

a distância do ponto \\(x\\) ao ponto mais próximo da superfície \\(S\\). As duas coleções direcionais,

\\[
D\_{P\to G}=\{d(p,\partial G):p\in\partial P\},
\qquad
D\_{G\to P}=\{d(g,\partial P):g\in\partial G\},
\\]

guardam informação que as contagens de pixels descartam. Diferentes resumos dessas coleções respondem a perguntas diferentes.[^4]

## Hausdorff e HD95

A distância de Hausdorff simétrica toma o maior erro nas duas direções:

\\[
HD(P,G)=\max\bigl(\sup D\_{P\to G},\sup D\_{G\to P}\bigr).
\\]

Ela encontra o ponto de maior desacordo, por isso reage fortemente a uma ilha remota ou a um único pixel espúrio. Essa sensibilidade pode revelar uma falha grave ou apenas ruído de anotação. Numa convenção direcional e ponderada pela área, trocar o máximo pelo percentil 95 descarta os 5% superiores de cada distribuição de distâncias; outras convenções truncam uma cauda diferente. Um componente falso e distante pode não aparecer no HD95 se ocupar uma fração pequena o bastante da superfície.

Mesmo o nome "HD95" não especifica uma implementação. Pode-se tomar o máximo dos percentis direcionais, como no exemplo acima, ou agrupar as duas coleções antes do percentil; pode-se medir entre centros de voxels ou entre elementos de uma malha; pode-se ponderar ou não pela área física da superfície. Uma comparação de cinco bibliotecas encontrou diferenças sistemáticas causadas por escolhas desse tipo.[^5] Por isso, percentil, extração da borda, ponderação, conectividade, biblioteca e versão pertencem ao método experimental.

## Distância média simétrica de superfície

Uma convenção para a distância média simétrica de superfície, ou ASSD, agrupa as duas direções e pondera cada elemento de superfície:

\\[
\operatorname{ASSD}\_{\mathrm{pool}}=
\frac{
\sum\_{p\in\partial P} a\_p d(p,\partial G)
{}+\sum\_{g\in\partial G} a\_g d(g,\partial P)
}{
\sum\_{p\in\partial P}a\_p+\sum\_{g\in\partial G}a\_g
},
\\]

onde \\(a\_p\\) e \\(a\_g\\) são comprimentos em 2-D ou áreas em 3-D. Ela descreve o afastamento típico do contorno e sofre menos influência de um único extremo que Hausdorff. Uma falha local severa, porém, pode se diluir entre milhares de elementos próximos da referência.

Há outra convenção chamada ASSD que calcula primeiro a média em cada direção e depois tira a média das duas. As duas fórmulas divergem quando as superfícies têm áreas distintas. O código ilustrativo usou a forma agrupada com \\(a=1\\); um artigo precisa declarar a convenção e preservar as áreas físicas.

## Dice de superfície

O Dice de superfície na tolerância \\(\tau\\) pergunta qual fração das duas superfícies está a uma distância considerada aceitável da outra. Com \\(A(\cdot)\\) denotando área de superfície,

\\[
SD\_{\tau}(P,G)=
\frac{
A\bigl(\{p\in\partial P:d(p,\partial G)\le\tau\}\bigr)
{}+A\bigl(\{g\in\partial G:d(g,\partial P)\le\tau\}\bigr)
}{A(\partial P)+A(\partial G)}.
\\]

A métrica foi proposta no contexto de delineamento de órgãos de risco em radioterapia, com tolerâncias específicas por estrutura estimadas a partir da variação entre especialistas.[^6] O Medical Segmentation Decathlon também combinou Dice volumétrico e Dice de superfície normalizado, com tolerâncias físicas diferentes por tarefa e anatomia, selecionadas com avaliação clínica.[^7]

O parâmetro \\(\tau\\) formaliza a tolerância de contorno e precisa vir da tarefa: variabilidade de anotação, tolerância de edição, resolução da aquisição ou um critério definido com especialistas. Ele também cria um corte: pontos logo abaixo e logo acima de \\(\tau\\) recebem resultados diferentes, e a métrica não informa quão longe do limite ficou o erro que o ultrapassou.

Em imagens médicas tridimensionais, todas essas distâncias devem respeitar o espaçamento físico. Em um volume com voxels de \\(0{,}8\times0{,}8\times5{,}0\\) mm, um passo no plano axial não equivale a um passo entre cortes. Reportar "3 voxels" sem a direção, ou calcular em uma matriz reamostrada sem registrar a transformação, responde a outra pergunta. Para Dice de superfície, contar voxels de borda também não basta: elementos da superfície devem ser ponderados por seu comprimento ou sua área física.[^6]

# O que as métricas de borda também deixam de fora

Trocar Dice por uma coluna de HD95 não resolve o problema de fundo. Distância de contorno continua sendo apenas uma família de respostas; direção do erro, número de objetos, topologia e volume podem continuar invisíveis.

## Direção e volume

Precisão e sensibilidade separam os dois termos que o Dice combina:

\\[
\operatorname{Precisão}=\frac{TP}{TP+FP},
\qquad
\operatorname{Sensibilidade}=\frac{TP}{TP+FN}.
\\]

Se perder tecido e incluir fundo têm custos diferentes, essa assimetria deve aparecer no relatório ou numa medida ponderada definida de antemão. O erro relativo de volume com sinal,

\\[
RVE=\frac{V\_P-V\_G}{V\_G},
\\]

mostra tendência de supersegmentação (positivo) ou subsegmentação (negativo); para expressá-lo em porcentagem, multiplica-se o resultado por 100. Precisão é indefinida para uma predição vazia; sensibilidade e RVE são indefinidos para uma referência vazia, salvo se uma convenção declarada for imposta. O RVE só deve responder a uma pergunta de volume: duas máscaras disjuntas podem ter \\(RVE=0\\). Se a volumetria for o desfecho, o erro absoluto em mililitros ou centímetros cúbicos e o viés por paciente são mais interpretáveis; o Dice é uma aproximação inadequada.[^2]

## Objetos e topologia

Em segmentação multifocal, um Dice calculado sobre o volume inteiro pondera implicitamente cada lesão pelo número de voxels. Uma massa grande corretamente segmentada pode esconder a ausência de várias lesões pequenas. Uma avaliação por objeto precisa primeiro parear componentes preditos e de referência por uma regra declarada; depois pode reportar sensibilidade por lesão, precisão ou falsos positivos por exame e qualidade de delineamento apenas nas lesões encontradas. Resultados recentes com metástases em PET/CT documentam o viés das métricas globais em favor dos maiores componentes.[^8]

Para vasos, vias aéreas, neurônios e outras estruturas em rede, a conectividade pode importar mais que a área. O *centerline Dice*, ou clDice, cruza os esqueletos morfológicos com as máscaras. Agora, \\(S\_P\\) e \\(S\_G\\) denotam os esqueletos da predição e da referência, não as superfícies usadas na seção anterior:

\\[
T\_{\mathrm{prec}}=\frac{|S\_P\cap G|}{|S\_P|},
\qquad
T\_{\mathrm{sens}}=\frac{|S\_G\cap P|}{|S\_G|},
\qquad
clDice=2\frac{T\_{\mathrm{prec}}T\_{\mathrm{sens}}}{T\_{\mathrm{prec}}+T\_{\mathrm{sens}}}.
\\]

Essas propriedades dizem respeito a estruturas tubulares e a hipóteses específicas.[^9] Para tumores ou órgãos compactos, número de componentes, número de buracos, característica de Euler, números de Betti ou uma regra própria da aplicação podem ser mais adequados. A topologia relevante precisa ser definida antes de escolher sua medida.

# Quando a implementação muda a pergunta

Um valor de métrica também depende do protocolo que o produziu. Cada caso abaixo altera a quantidade estimada.

1. **Máscaras vazias.** Se a referência e a predição estiverem vazias, a fórmula do Dice produz \\(0/0\\); conforme a convenção, o resultado pode ser um, zero ou `NaN`. Se apenas uma delas estiver vazia, métricas de superfície não têm duas superfícies para comparar. Em conjuntos nos quais a estrutura pode estar ausente, presença ou ausência deve ser avaliada como tarefa de classificação, e o delineamento, nos casos pertinentes. O resultado de cada métrica para máscaras vazias precisa ser definido de antemão. Remover silenciosamente esses casos também remove falsos positivos e pode inflar o resultado.[^10]
2. **Limiar de decisão.** Converter probabilidades em máscara exige um limiar. Ajustá-lo no teste transfere informação do conjunto final para o modelo; o limiar e qualquer pós-processamento devem ser escolhidos na validação e congelados antes da avaliação.
3. **Reamostragem.** Máscaras categóricas devem ser reamostradas com interpolação apropriada, em geral pelo método do vizinho mais próximo. A matriz de orientação, a origem e o espaçamento precisam permanecer alinhados; uma reamostragem pode suavizar ou deslocar bordas e alterar precisamente as métricas que se pretende estudar.
4. **Duas ou três dimensões.** Tirar a média do Dice por corte, calcular uma máscara volumétrica inteira e agrupar todos os voxels do conjunto são três estimandos diferentes. A unidade deve acompanhar o uso: corte, exame, estrutura ou paciente.
5. **Agregação.** Um Dice global obtido ao concatenar todos os voxels concede mais peso aos casos e às classes com máscaras de primeiro plano maiores, isto é, com maior \\(|P|+|G|\\). Calcular por paciente e depois resumir respeita a hierarquia dos dados; classes e estruturas também devem permanecer separadas quando a média esconderia uma falha específica.[^2]
6. **Incerteza e casos difíceis.** Uma média sem distribuição não mostra caudas nem heterogeneidade. Mediana e intervalo interquartil, intervalo de confiança por *bootstrap* no nível do paciente e estratos definidos antes da análise &mdash; por exemplo, tamanho da estrutura e centro de aquisição &mdash; tornam visível onde o ganho apareceu. Exemplos qualitativos devem seguir uma regra de seleção, não conveniência.
7. **Definição executável.** Nome, fórmula, parâmetros, tratamento de vazios, unidade, biblioteca e versão precisam ser registrados. HD95 calculado por duas bibliotecas não deve ser presumido idêntico.[^5]

# Um protocolo mínimo de avaliação

O conjunto de métricas deve nascer da decisão que a segmentação apoiará. Uma configuração inicial, a ser reduzida ou ampliada conforme a anatomia e o uso, pode ser organizada pelas perguntas abaixo.

| Pergunta | Medida candidata | O que precisa ser declarado |
|---|---|---|
| Quanto as regiões se sobrepõem? | Dice **ou** IoU | unidade de análise, classes e distribuição por caso |
| A predição tende a subsegmentar ou supersegmentar? | sensibilidade, precisão e RVE | qual classe é positiva e qual assimetria importa |
| Quanto a borda costuma se afastar? | ASSD | espaçamento, extração e ponderação da superfície, e convenção direcional ou agrupada |
| Qual fração da borda respeita a tolerância? | Dice de superfície | espaçamento, ponderação da superfície, \\(\tau\\) e origem da tolerância |
| Quão grandes são os erros de borda próximos do pior caso? | HD95 | espaçamento, extração e ponderação da superfície, percentil, convenção direcional e regra para vazios |
| Objetos foram perdidos ou inventados? | sensibilidade e precisão por lesão | conectividade e regra de pareamento |
| A conectividade foi preservada? | clDice ou métrica topológica específica | esqueletização, conectividade do primeiro plano e do fundo, regra para vazios e relevância da propriedade |
| O volume final está correto? | erro absoluto e relativo de volume | unidade física e uso na decisão subsequente |

Eu começaria pela unidade de análise e pela regra de presença. Depois escolheria uma medida de sobreposição e acrescentaria apenas as famílias ligadas ao uso pretendido. A tolerância de contorno seria predefinida a partir da aceitabilidade clínica, da variação entre anotadores ou de um protocolo externo, sem consultar as predições de teste. Limiar de decisão e pós-processamento seriam escolhidos com treinamento e validação; as regras para vazios também seriam congeladas antes do teste. Os resultados seriam calculados por paciente e classe, com incerteza e estratificação por tamanho. Por fim, publicaria a implementação ou, no mínimo, sua definição executável e testes em máscaras sintéticas conhecidas.

O resultado é um perfil de erro distribuído por várias medidas. O Metrics Reloaded recomenda selecionar métricas a partir de uma impressão digital do problema e combinar famílias complementares.[^2] A tabela fica maior, mas passa a mostrar por que dois modelos diferem.

# Síntese

O experimento das três máscaras mostra como eu formularia uma comparação. As predições empataram exatamente em Dice, IoU e volume, mas as medidas adicionais separaram propriedades diferentes: HD95 destacou a distância do componente remoto, o Dice de superfície quantificou a fração dentro da tolerância e os descritores topológicos registraram componentes e buracos. A ordenação só ganha sentido depois que a propriedade de interesse da tarefa é declarada.

Para o meu problema, uma afirmação de que uma arquitetura "melhora bordas" deveria responder, no mesmo conjunto de teste, pelo menos a três perguntas: quanto mudou a sobreposição, se a distância de superfície caiu e em quantos milímetros, e em quais tamanhos de estrutura o ganho apareceu. Se houver múltiplas lesões, acrescentaria quantas foram de fato encontradas. Um Dice maior responde apenas à primeira.

Duas perguntas ficam abertas. Métodos desenhados para refinar contornos reduzem distâncias físicas sem perder sensibilidade por lesão? E os ganhos aparentes permanecem quando os resultados são estratificados por tamanho, ou concentram-se nas estruturas grandes para as quais o Dice é mais tolerante?

# Referências

[^1]: REINKE, A.; TIZABI, M. D.; BAUMGARTNER, M.; et al. [Understanding metric-related pitfalls in image analysis validation](https://doi.org/10.1038/s41592-023-02150-0). *Nature Methods*, v. 21, p. 182&ndash;194, 2024.

[^2]: MAIER-HEIN, L.; REINKE, A.; GODAU, P.; et al. [Metrics reloaded: recommendations for image analysis validation](https://doi.org/10.1038/s41592-023-02151-z). *Nature Methods*, v. 21, p. 195&ndash;212, 2024.

[^3]: DICE, L. R. [Measures of the amount of ecologic association between species](https://doi.org/10.2307/1932409). *Ecology*, v. 26, n. 3, p. 297&ndash;302, 1945.

[^4]: TAHA, A. A.; HANBURY, A. [Metrics for evaluating 3D medical image segmentation: analysis, selection, and tool](https://doi.org/10.1186/s12880-015-0068-x). *BMC Medical Imaging*, v. 15, art. 29, 2015.

[^5]: PODOBNIK, G.; VRTOVEC, T. [HDilemma: are open-source Hausdorff distance implementations equivalent?](https://papers.miccai.org/miccai-2024/375-Paper2469.html). In: *Medical Image Computing and Computer Assisted Intervention &mdash; MICCAI 2024*, p. 308&ndash;317, 2024.

[^6]: NIKOLOV, S.; BLACKWELL, S.; ZVEROVITCH, A.; et al. [Clinically applicable segmentation of head and neck anatomy for radiotherapy: deep learning algorithm development and validation study](https://doi.org/10.2196/26151). *Journal of Medical Internet Research*, v. 23, n. 7, e26151, 2021.

[^7]: ANTONELLI, M.; REINKE, A.; BAKAS, S.; et al. [The Medical Segmentation Decathlon](https://doi.org/10.1038/s41467-022-30695-9). *Nature Communications*, v. 13, art. 4128, 2022.

[^8]: JAUS, A.; SEIBOLD, C. M.; REIß, S.; et al. [Every component counts: rethinking the measure of success for medical semantic segmentation in multi-instance segmentation tasks](https://doi.org/10.1609/aaai.v39i4.32408). In: *Proceedings of the AAAI Conference on Artificial Intelligence*, v. 39, n. 4, p. 3904&ndash;3912, 2025.

[^9]: SHIT, S.; PAETZOLD, J. C.; SEKUBOYINA, A.; et al. [clDice &mdash; a novel topology-preserving loss function for tubular structure segmentation](https://openaccess.thecvf.com/content/CVPR2021/html/Shit_clDice_-_A_Novel_Topology-Preserving_Loss_Function_for_Tubular_Structure_CVPR_2021_paper.html). In: *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition*, p. 16560&ndash;16569, 2021.

[^10]: OSTMEIER, S.; AXELROD, B.; ISENSEE, F.; et al. [USE-Evaluator: performance metrics for medical image segmentation models supervised by uncertain, small or empty reference annotations in neuroimaging](https://doi.org/10.1016/j.media.2023.102927). *Medical Image Analysis*, v. 90, art. 102927, 2023.
