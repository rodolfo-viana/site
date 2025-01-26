+++
title = "Introdução à linguagem Python"
description = "Aulas ministradas aos alunos do curso de pós-graduação em Jornalismo de Dados do IDP"
date = "2024-02-18"
weight = 1

[taxonomies]
tags=["python"]

[extra]
toc = false

+++

{% note(clickable=true, hidden=true, header="Variáveis") %}

__Variável__ é um nome que faz referência a um valor e fica temporariamente salvo na memória do computador. Funciona como um apelido que damos a um determinado dado. Sempre que chamarmos o apelido &mdash;a variável&mdash;, o dado será evocado.

A atribuição é simples: 

```
variavel = dado
```

Vejamos um uso real:

```python
vlr_dolar = 4.95
```

O valor `4.95` está agora salvo na memória do meu computador. Para obter o valor, eu chamo `vlr_dolar`. Assim:

```python
print(vlr_dolar)
```
```resultado
4.95
```

Uma variável serve, entre outros, para que não precisemos repetir a digitação ou operação para obter o valor. Vamos pegar como exemplo este verso de "A flor e a náusea", de Carlos Drummond de Andrade:

> É feia. Mas é uma flor. Furou o asfalto, o tédio, o nojo e o ódio.

Essa frase não precisa mais ser digitada se for atribuída à uma variável:

```python
frase = "É feia. Mas é uma flor. Furou o asfalto, o tédio, o nojo e o ódio."
print(frase)
```
```resultado
É feia. Mas é uma flor. Furou o asfalto, o tédio, o nojo e o ódio.
```

Mas lembre-se: a variável perde seu valor quando:

1. o script é finalizado; ou
2. o valor é alterado.

Sim, alterado. É possível mudar o valor de uma variável já existente &mdash;afinal, ela chama "variável". Para isso, basta atribuir novo valor:

```python
print(vlr_dolar) # até aqui, o valor de `vlr_dolar` é 4.95...
vlr_dolar = 4.91 # ...e aqui, altero o valor da variável para 4.91
print(vlr_dolar) # agora a variável apresenta o novo valor
```
```resultado
4.95
4.91
```

Há algumas regras para criar variáveis:

- não pode começar com número ou símbolo, mas pode ter número e underscore (`_`) no meio ou no fim;

```python
idade1 = 42 # correto, pois números são permitidos tanto no meio quanto no fim
1idade = 42 # incorreto, pois números não podem estar no início da variável
```

- não pode conter pontos e demais sinais gráficos, e acentos são desaconselháveis;

```python
idade_1 = 42 # correto, pois underscore é permitido
idade.1 = 42 # incorreto, pois não se pode usar ponto na variável
```

- maiúsculas e minúsculas são diferentes;

```python
nome = "Pedro" # variável com `n` minúsculo
Nome = "José" # variável com `n` maiúsculo
print(Nome)
```
```resultado
José
```

- não pode ser palavra-chave de Python.

<table>
<tbody>
<tr>
<td style="text-align:center"><code>and</code></td>
<td style="text-align:center"><code>as</code></td>
<td style="text-align:center"><code>assert</code></td>
<td style="text-align:center"><code>break</code></td>
<td style="text-align:center"><code>class</code></td>
<td style="text-align:center"><code>continue</code></td>
<td style="text-align:center"><code>def</code></td>
</tr>
<tr>
<td style="text-align:center"><code>del</code></td>
<td style="text-align:center"><code>elif</code></td>
<td style="text-align:center"><code>else</code></td>
<td style="text-align:center"><code>except</code></td>
<td style="text-align:center"><code>exec</code></td>
<td style="text-align:center"><code>finally</code></td>
<td style="text-align:center"><code>for</code></td>
</tr>
<tr>
<td style="text-align:center"><code>from</code></td>
<td style="text-align:center"><code>global</code></td>
<td style="text-align:center"><code>if</code></td>
<td style="text-align:center"><code>import</code></td>
<td style="text-align:center"><code>in</code></td>
<td style="text-align:center"><code>is</code></td>
<td style="text-align:center"><code>lambda</code></td>
</tr>
<tr>
<td style="text-align:center"><code>nonlocal</code></td>
<td style="text-align:center"><code>not</code></td>
<td style="text-align:center"><code>or</code></td>
<td style="text-align:center"><code>pass</code></td>
<td style="text-align:center"><code>raise</code></td>
<td style="text-align:center"><code>return</code></td>
<td style="text-align:center"><code>try</code></td>
</tr>
<tr>
<td style="text-align:center"><code>while</code></td>
<td style="text-align:center"><code>with</code></td>
<td style="text-align:center"><code>yield</code></td>
<td style="text-align:center"><code>True</code></td>
<td style="text-align:center"><code>False</code></td>
<td style="text-align:center"><code>None</code></td>
</tr>
</tbody>
</table>

---

__Neste capítulo vimos:__

- função `print(x)`
  - imprime em tela o valor de `x`
  - documentação: [https://docs.python.org/pt-br/3/library/functions.html#print](https://docs.python.org/pt-br/3/library/functions.html#print)

__Mais sobre os tópicos da aula:__

- [txt; inglês] [Variables in Python](https://realpython.com/python-variables/), em Real Python

{% end %}

{% note(clickable=true, hidden=true, header="Tipos de dados") %}

Repare que, quando trabalhamos com variáveis, às vezes usamos valores com aspas, e outras vezes sem aspas. Exemplos:

```python
pi = 3.1416
linguagem = "Python"
```

Isso porque os valores são de tipos diferentes: o primeiro pertence ao tipo numérico `float` (ponto flutuante, decimal), enquanto o segundo pertence ao tipo não-numérico `string` (texto). Em Python, cada tipo tem suas particularidades.

### Tipos numéricos

- Integer (`int`)
  - números inteiros
  - não usa aspas
  - conversão com `int()`

```python
numero = 32
print(numero)
print(type(numero))
```
```resultado
32
<class 'int'>
```

```python
numero = "123"
print(numero)
print(type(numero))
numero = int(numero) # conversão para `int`
print(numero)
print(type(numero))
```
```resultado
123
<class 'str'>
123
<class 'int'>
```

- Float (`float`)
    - números decimais; números com ponto flutuante; notação científica
    - não usa aspas
    - conversão com `float()`

```python
numero = 32.0
print(numero)
print(type(numero))
```
```resultado
32.0
<class 'float'>
```
```python
numero = 0.000000000000000000000000000001
print(numero)
print(type(numero))
```
```resultado
1e-30
<class 'float'>
```

- Complex (`complex`)
    - números complexos, com \\(\sqrt{-1}\\) em parte da equação
    - em Python, número imaginário representado pela letra `j`
    - não usa aspas

```python
from cmath import sqrt # veremos módulos nas próximas aulas

numero = sqrt(-1)
print(numero)
print(type(numero))
```
```resultado
1j
<class 'complex'>
```

### Tipo não-numérico

- String (`str`)
    - texto; sequência de caracteres alfanuméricos; letra
    - aparecem entre aspas duplas (") ou simples (')
    - conversão com `str()`

```python
txt = "Brasil registra 94 mortes por dengue; Belo Horizonte decreta emergência"
print(txt)
print(type(txt))
```
```resultado
Brasil registra 94 mortes por dengue; Belo Horizonte decreta emergência
<class 'str'>
```

```python
txt = 65.1
print(txt)
print(type(txt))
txt = str(txt) # conversão para `str`
print(txt)
print(type(txt))
```
```resultado
65.1
<class 'float'>
65.1
<class 'str'>
```

Fique atento! Se colocamos `"` ou `'` (aspas usadas em `str`) num valor numérico (digamos, `int`), o número deixa de ser número e se transforma em texto. Uma mudança que parece pequena muda completamente o tipo do dado.

```python
print(1234)
print(type(1234))
print('1234')
print(type('1234'))
```
```resultado
1234
<class 'int'>
1234
<class 'str'>
```

```python
print(12 + 34)
print('12' + '34')
```
```resultado
46
1234
```

Notem que, em linhas acima, eu ora usei aspas duplas, ora usei aspas simples. Os dois tipos de aspas valem, mas cuidado:

```python
# Aqui, aspas duplas indicam que o dado é `str`, e as aspas simples indicam grifo
print("Estou usando 'aspas simples' dentro de aspas duplas") 
```
```resultado
Estou usando 'aspas simples' dentro de aspas duplas
```
```python
# Aqui, aspas simples indicam que o dado é `str`, e as aspas duplas indicam grifo
print('Estou usando "aspas duplas" dentro de aspas simples')
```
```resultado
Estou usando "aspas duplas" dentro de aspas simples
```
```python
print('O que acontece se, dentro de 'aspas simples', eu usar aspas simples?')
```
```resultado
  Cell In[15], line 1
    print('O que acontece se, dentro de 'aspas simples', eu usar aspas simples?')
          ^
SyntaxError: invalid syntax. Perhaps you forgot a comma?
```
```python
print("O mesmo acontece com "aspas duplas" dentro de aspas duplas?")
```
```resultado
  Cell In[16], line 1
    print("O mesmo acontece com "aspas duplas" dentro de aspas duplas?")
          ^
SyntaxError: invalid syntax. Perhaps you forgot a comma?
```

Nos dois erros acima, o sistema não entende se as aspas servem para indicar `str` ou se são grifo. Temos `SyntaxError`, erro de sintaxe. Isso ocorre porque a máquina entende que os dados se encerram no fechamento de aspas e não sabe o que fazer com o restante da informação:

1. No primeiro erro, a máquina computou `'O que acontece se, dentro de '` e não soube o que fazer com o resto;
2. No segundo exemplo, a máquina computou `"O mesmo acontece com "` e não soube o que fazer com o resto.

Uma opção é usar escape (`\`) nas aspas internas. Escape funciona para eu avisar a máquina: "interprete de maneira literal, como aspas; não considere como fim de um texto".

```python
print('E agora? Consigo usar \'aspas simples\' dentro de aspas simples?')
```
```resultado
E agora? Consigo usar 'aspas simples' dentro de aspas simples?
```
```python
print("E \"aspas duplas\" dentro de aspas duplas?")
```
```resultado
E "aspas duplas" dentro de aspas duplas?
```

### Tipo lógico

- Boolean (`bool`)
    - comporta apenas dois valores: `True` (verdadeiro) e `False` (falso)
    - nos "bastidores", funciona como número, sendo `0` para `False` e `1` para `True`
    - assim como números, não usa aspas

```python
vdd_ou_falso = True
print(vdd_ou_falso)
print(type(vdd_ou_falso))
```
```resultado
True
<class 'bool'>
```
```python
vdd_ou_falso = False
print(vdd_ou_falso)
print(type(vdd_ou_falso))
```
```resultado
False
<class 'bool'>
```
```python
# veremos operações em breve, mas adianto aqui os 
# operadores `>` e `<` para mostrar um uso de `bool`
idade_rodolfo = 43
idade_pedro = 6
print(idade_pedro > idade_rodolfo) # `>` indica `maior que`
```
```resultado
False
```
```python
print(idade_pedro < idade_rodolfo) # `<` indica `menor que`
```
```resultado
True
```
```python
# Como se comportam como números, sendo True = 1
print(True + True)
```
```resultado
2
```

---
__Neste capítulo vimos:__

- a função `int(x)`
  - converte o valor de `x` para `int`
  - se não há como converter (exemplo: `int("palavra")`), retorna erro
  - documentação: [https://docs.python.org/pt-br/3/library/functions.html#int](https://docs.python.org/pt-br/3/library/functions.html#int)

- a função `float(x)`
  - converte o valor de `x` para `float`
  - se não há como converter (exemplo: `float("palavra")`), retorna erro
  - documentação: [https://docs.python.org/pt-br/3/library/functions.html#float](https://docs.python.org/pt-br/3/library/functions.html#float)
  
- a função `str(x)`
  - converte o valor de `x` para `str`
  - documentação: [https://docs.python.org/pt-br/3/library/functions.html#func-str](https://docs.python.org/pt-br/3/library/functions.html#func-str)

- a função `type(x)`
  - mostra o tipo de dado do objeto `x`
  - documentação: [https://docs.python.org/pt-br/3/library/functions.html#type](https://docs.python.org/pt-br/3/library/functions.html#type)

__Mais sobre os tópicos da aula:__

- [vid] [Conhecendo tipos de dados](https://www.youtube.com/watch?v=EosATvOIHEs), em Programação Dinâmica
- [vid] [Tipos de dados](https://www.youtube.com/watch?v=g6QJCal2_7w), em Procópio na Rede
- [txt; inglês] [Basic data types in Python](https://realpython.com/python-data-types/), em Real Python

{% end %}

{% note(clickable=true, hidden=true, header="Operações") %}

Agora que sabemos o que são variáveis e conhecemos os tipos básicos, podemos fazer cálculos ou comparar duas ou mais variáveis. Para isso realizações operações aritméticas, relacionais ou lógicas.

### Aritméticas

Que tal fazer matemática usando variáveis? É para isso que servem as operações aritméticas. Por exemplo, descobrir o salário mínimo por dia útil...

```python
sal_minimo = 1412
dias_uteis = 22
print(sal_minimo / dias_uteis)
```
```resultado
64.18181818181818
```

...ou então, calcular a área de um círculo de $n$ metros de raio, cuja fórmula é $A=\pi r^2$.

```python
raio = input("Digite o valor do raio: ")
pi = 3.14159
area = pi * (float(raio)**2)
print(area)
```
```resultado
Digite o valor do raio: 12.5
490.87343749999997
```

No primeiro exemplo, eu dividi o salário mínimo (`sal_minimo`) pela quantidade de dias úteis (`dias_uteis`) em um mês. Para isso, usei o símbolo de divisão (`/`).

No segundo exemplo, elevei ao quadrado o raio (`raio`) convertido para `float` (`float()`) usando o símbolo de exponenciação (`**`) e, a ele, multipliquei o valor de pi (`pi`) com o símbolo de multiplicação (`*`).

Abaixo estão os operadores aritméticos em Python (e nos exemplos, considere `x = 5` e `y = 2`):

| operador | significado | entrada | saída |
| :-: | :-: | :-: | :-: |
| `+` | adição | `x + y` | `7` |
| `-` | subtração | `x - y` | `3` |
| `*` | multiplicação | `x * y` | `10` |
| `/` | divisão | `x / y` | `2.5` |
| `**` | exponenciação | `x ** y` | `25` |
| `//` | parte inteira da divisão (descarta decimais) | `x // y` | `2` |
| `%` | módulo (resto da divisão) | `x % y` | `1` |

Cabe ressaltar: a ordem de execução de operações segue a ordem convencional na matemática:

1. exponenciação
2. multiplicação e divisão
3. soma e subtração

Podemos sobrescrever essa ordem usando parênteses:

```python
print(2 + 3 * 4) # Multiplica 3 e 4, e depois adiciona 2
```
```resultado
14
```
```python
print((2 + 3) * 4) # Soma 2 e 3, e depois multiplica por 4
```
```resultado
20
```

### Relacionais

Dados lógicos (`True`, `False`), como vimos um pouco antes, aparecem com mais frequência junto a operadores relacionais ou de comparação. São operações que checam se uma equivalência entre dados (sejam eles `int`, `float`, `str` etc.) é verdadeira ou falsa.

Estes são os operadores de comparação em Python (e nos exemplos, `x = 5` e `y = 2`):

| operador | significado | entrada | saída |
| :-: | :-: | :-: | :-: |
| `==` | igual à | `x == y` | `False` |
| `!=` | não-igual a | `x != y` | `True` |
| `>` | maior que | `x > y` | `True` |
| `>=` | maior que ou igual a | `x >= y` | `True` |
| `<` | menor que | `x < y` | `False` |
| `<=` | menor que ou igual a | `x <= y` | `False` |

Vamos ver como se usa numa conta simples:

```python
conta = 5 ** 2 / 2 # Faço um cálculo aritmético e salvo na variável `conta`
print(conta == 12) # Agora vejo se o valor de `conta` é igual a 12
```
```resultado
False
```
```python
print(conta >= 12) # Vejo se o valor de `conta` é maior que ou igual a 12 
```
```resultado
True
```
```python
print(conta)
```
```resultado
12.5
```

Um outro exemplo: ver se a quantidade de dígitos num número de CPF corresponde à quantidade oficial:

```python
cpf = "01234567890" # numeral em `str`
qtd_elem_cpf = 11 # estabeleço que a quantidade de elementos num CPF é 11
print(cpf)
print(len(cpf) == qtd_elem_cpf)
```
```resultado
01234567890
True
```

Ou ainda, comparar uma projeção rudimentar da balança comercial com uma meta imaginária:

```python
# fonte:
# https://agenciagov.ebc.com.br/rede-nacional-de-radio/programas/e-noticia/08-02-24-e-noticia-filippin-balanca-comercial-ve-ctl.mp3
exportacoes_jan2024 = 27.02
importacoes_jan2024 = 20.49
meta_balanca_2024 = 78

projecao_expo_2024 = exportacoes_jan2024 * 12
projecao_impo_2024 = importacoes_jan2024 * 12

print((projecao_expo_2024 - projecao_impo_2024) > meta_balanca_2024)
```
```resultado
True
```

### De atribuição

Por ora, já temos sedimentado o conhecimento de que o sinal `=` serve para atribuir um valor a uma variável, como vimos no item _Variáveis_. Exemplo:

```
variavel = valor
```

Mas `=`, junto a outros sinais, serve também para operações de adição, subtração etc., __quando o valor resultante dessa operação aritmética for atribuída à mesma variável__.

Ficou confuso, então vou explicar com um exemplo:

```python
idade = 43
print(idade)
idade = idade + 1
print(idade)
```
```resultado
43
44
```

No exemplo acima, note que, na terceira linha, temos `1` adicionado à variável `idade` (com valor `43`), e o resultado (`44`) será atribuído à mesma variável `idade`. A variável se repete: aparece tanto na operação aritmética (`idade + 1`) quanto no elemento onde o resultado da operação é salvo (`idade =`). 

Para não ter de repetir a variável, usamos operadores de atribuição. O exemplo acima poderia ser escrito assim:

```python
idade = 43
print(idade)
idade += 1 # equivalente a `idade = idade + 1`
print(idade)
```
```resultado
43
44
```

E não é apenas com adição que consigo fazer esse tipo de atribuição (considerando `x = 33`):

| operador | significado | entrada | equivalência | saída |
| :-: | :-: | :-: | :-: | :-: |
| `+=` | adição | `x += 3` | `x = x + 3` | `36` |
| `-=` | subtração | `x -= 3` | `x = x - 3` | `30` |
| `*=` | multiplicação | `x *= 3` | `x = x * 3` | `99` |
| `/=` | divisão | `x /= 3` | `x = x / 3` | `11` |
| `**=` | exponenciação | `x **= 3` | `x = x ** 3` | `35937` |
| `//=` | parte inteira da divisão (descarta decimais) | `x //= 3` | `x = x // 3` | `11` |
| `%=` | módulo (resto da divisão) | `x %= 3` | `x = x % 3` | `0` |

### Lógicos

Além dos operadores relacionais, há os operadores lógicos. Eles servem para agregar operadores relacionais. Por exemplo:

```python
x = 5
y = 2

print(y > x)
print(y == x)
print(y < x)

print(y < x and y > 3)
print(y < x and y > 1)
```
```resultado
False
False
True
False
True
```

No exemplo acima,

- na penúltima linha: `y` é menor do que `x`, dando resultado `True`; mas `y` não é maior do que `3`, levando ao resultado `False`. Como nem todas as relações são `True`, o resultado lógico (com o uso de `and`) é `False`.

- na última linha: `y` é menor do que `x`, dando resultado `True`; também `y` é maior do que `1`, levando ao resultado `True`. Como todas as relações são `True`, o resultado lógico (com o uso de `and`) é `True`.

Os operadores lógicos são os seguintes (considerando `x = 5` e `y = 2`):

| operador | significado | input de exemplo | saída |
| :-: | :-: | :-: | :-: |
| `and` | `e` lógico (ambas as comparações devem ser `True`) | `x > y and x < 10` | `True` |
| `or` | `ou` lógico (uma das comparações deve ser `True`) | `x != 5 or x > y` | `True` |
| `not` | negação lógica (inverte a resposta lógica) | `not x == 5` | `False` |


Vamos a um exemplo: observar a percepção da homofobia na região sudeste versus a quantidade de mortes violentas de LGBTQIA+ &mdash;podemos imaginar que, conforme há aumento da percepção, os crimes diminuem, certo?

```python
# fontes:
# https://www.poder360.com.br/poderdata/percepcao-sobre-homofobia-no-brasil-cresceu-sob-lula-diz-poderdata/
# https://g1.globo.com/ba/bahia/noticia/2024/01/20/mortes-violentas-de-pessoas-lgbtqia-na-ba-2023.ghtml
percepcao_2024 = 72
percepcao_2022 = 69
mortes_2023 = 100
mortes_2022 = 63
print(percepcao_2024 > percepcao_2022 and mortes_2023 < mortes_2022)
```
```resultado
False
```
---
__Neste capítulo vimos:__

- a função `input()`
  - pede ao usuário um valor e salva numa variável
  - todo valor inserido, seja numérico ou não, é tratado como `str`
  - documentação: [https://docs.python.org/pt-br/3/library/functions.html#input](https://docs.python.org/pt-br/3/library/functions.html#input)

- a função `len(x)`
  - retorna a quantidade de elementos no objeto `x`
  - documentação: [https://docs.python.org/pt-br/3/library/functions.html#len](https://docs.python.org/pt-br/3/library/functions.html#len)

__Mais sobre os tópicos da aula:__

- [vid] [Operadores e expressões aritméticas](https://www.youtube.com/watch?v=MzT7VHdSEes), em Bóson Treinamentos
- [txt; inglês] [Python operators](https://www.w3schools.com/python/python_operators.asp), em W3
- [txt] [Operadores e expressões](https://algoritmosempython.com.br/cursos/programacao-python/operadores/), em Algoritmos em Python
- [txt] [Variáveis, expressões e comandos](https://panda.ime.usp.br/pensepy/static/pensepy/02-Conceitos/conceitos.html), em Pense Python, IME-USP
- [txt] [Valores e operadores booleanos](https://panda.ime.usp.br/aulasPython/static/aulasPython/aula05.html), em IME-USP
- [txt] [Operadores aritméticos e lógicos](https://pythonacademy.com.br/blog/operadores-aritmeticos-e-logicos-em-python), em Python Academy

{% end %}

{% note(clickable=true, hidden=true, header="Exercícios - parte 1") %}

### Atividade 1

Segundo o [G1](https://g1.globo.com/bemestar/vacina/noticia/2021/07/09/vacinacao-no-brasil-mais-de-14percent-da-populacao-tomou-as-duas-doses-ou-dose-unica-de-vacinas-contra-a-covid.ghtml) em 9 de julho de 2021, até aquela data 82.908.617 pessoas haviam tomado a primeira dose da vacina contra a covid-19. Especificamente naquele dia, 994.468 pessoas tomaram a primeira dose.

Arredondando, o Brasil tinha, à época, 212 milhões de habitantes, dos quais cerca de 21% tinham menos de 18 anos &mdash;ou seja, não eram elegíveis para a vacinação.

1. Quantos brasileiros estavam elegíveis para a vacinação em 9 de julho?
2. Se o ritmo de vacinação da primeira dose tivesse se mantido como no dia 9 de julho de 2021, em quantos dias toda a população elegível teria recebido a primeira dose?

### Atividade 2

No mês passado, um certo influencer tinha 5.641.981 seguidores no Instagram. Como ele divulgava o "jogo do tigrinho" e a PF bateu na porta dele, o influencer teve uma queda significativa de seguidores: ficou com 4.567.093 neste mês. Calcule a queda percentual.

### Atividade 3

Uma certa empresa teve lucro de US\\$ 12.095.187,05 em dezembro de 2023, com o dólar a R\\$ 4,8526. Em janeiro de 2024, com o dólar a R\\$ 4,9163, a empresa teve lucro de US\\$ 11.567.011,87. Qual é a diferença percentual entre os valores em reais?

### Atividade 4

A fórmula para calcular IMC é: 

$$
IMC = \frac{peso em kg}{altura em metro^{2}}
$$

Crie um código que peça ao usuário seu peso, sua altura, e retorne o IMC.

{% end %}

{% note(clickable=true, hidden=true, header="Controle de fluxo com `if`") %}

Até o momento, estamos escrevendo códigos que são executados numa estrutura fixa: __de cima para baixo, linha a linha__. Exemplo:

```python
nome = input("Qual é o seu nome? ")
ano = input("Em que ano você nasceu? ")
idade = 2024 - int(ano)
print("Bom dia, {}. Você tem ou terá {} anos em 2024.".format(nome, idade))
# A função `format()` substititui `{}` pelo valor da variável
```
```resultado
Qual é o seu nome? Rodolfo
Em que ano você nasceu? 1981
Bom dia, Rodolfo. Você tem ou terá 43 anos em 2024.
```

Usamos a função `format(x)` que, como vimos, substititui `{}` pelo valor da variável `x`.

Uma outra forma de fazer isso (de maneira mais concisa e sem precisar de `format()`) é com __f-strings__. Em vez de...

```python
print("Bom dia, {}. Você tem ou terá {} anos em 2024.".format(nome, idade))
```

...pode fazer assim: 

```python
print(f"Bom dia, {nome}. Você tem ou terá {idade} anos em 2024.")
```

Repare que eu uso `f` antes das aspas da frase, e em vez de `{}` eu uso `{variavel}`.

Até aqui, nosso script processa a linha 1, depois a linha 2, depois a linha 3 e, por fim, a linha 4. Uma após a outra, sem nunca pular uma linha. É um fluxo fixo.

Mas podemos mudar isso. Podemos controlar a execução, o fluxo do script. Uma das formas é com `if`, que condiciona a execução de uma linha ao resultado de outra.

### `if`

A estrutura mais simples do controle de fluxo com `if` é assim:

```python
if condicao_1:
    operacao_1
```

Em português, o exemplo acima seria algo como "se `condicao_1` for `True`, execute `operacao_1`; se for `False`, não execute".

Reparem que há indentação de quatro espaços na linha abaixo de `if condicao_1:`. É algo obrigatório, e indica que as operações dentro do bloco `if` estão condicionadas à `condicao_1`. 

Um exemplo:

```python
if condicao_1:
    operacao_1
    operacao_2
```

Acima, `operacao_1` e `operacao_2` são executadas somente se `condicao_1` for `True`. A indentação coloca as operações dentro do bloco `if`. Este bloco forma uma unidade lógica, onde todas as operações dentro dele dependem da condição.

```python
if condicao_1:
    operacao_1
operacao_2
```

Aqui, `operacao_1` ainda depende de `condicao_1` ser `True` para ser executada. No entanto, `operacao_2` não faz parte do bloco de código que depende de `condicao_1` e, portanto, `operacao_2` será executada independentemente de `condicao_1` ser `True` ou não, já que ela está fora do bloco `if`.

Vamos ver isso na prática:

```python
salario = 1412 * 2 # dois salários mínimos
aluguel = 1600
luz = 90
agua = 80
telefone = 99
cartao = 200
contas = aluguel + luz + agua + telefone + cartao

print("Começou o fluxo.")

if salario >= contas: # se o salário for maior ou igual ao valor das contas...
    restos = salario - contas # ...calcule quanto sobra
    print(f"Consigo pagar as contas e me sobram {restos} reais.")
    
print("Acabou o fluxo.")
```
```resultado
Começou o fluxo.
Consigo pagar as contas e me sobram 755 reais.
Acabou o fluxo.
```

No exemplo acima o cálculo de `restos` foi executado e a frase foi impressa porque `salario >= contas` é `True`. Vejamos o que acontece se o salário for menor.

```python
salario = 1412 # um salário mínimo
aluguel = 1600
luz = 90
agua = 80
telefone = 99
cartao = 200
contas = aluguel + luz + agua + telefone + cartao

print("Começou o fluxo.")

if salario >= contas: # se o salário for maior ou igual ao valor das contas...
    restos = salario - contas # ...calcule quanto sobra
    print(f"Consigo pagar as contas e me sobram {restos} reais.")
    
print("Acabou o fluxo.")
```
```resultado
Começou o fluxo.
Acabou o fluxo.
```

Neste último exemplo, com apenas um salário mínimo, nem o cálculo de `restos`, nem a impressão da frase ocorreu porque `salario >= contas` é `False`.

### `if`-`else`

Quando utilizamos `if`, a operação é executada apenas se a condição for `True`; se for `False`, nada acontece. Contudo, há casos em que queremos executar uma operação alternativa caso a condição dê `False`. Para isso usamos `if`-`else`. Funciona assim:

```python
if condicao_1:
    operacao_1
else:
    operacao_2
```

Em português seria algo como "se `condicao_1` for `True`, execute `operacao_1`; se for `False`, realize `operacao_2`".

Vejamos um exemplo &mdash;primeiro, com dois salários; depois, com um salário:

```python
salario = 1412 * 2
aluguel = 1600
luz = 90
agua = 80
telefone = 99
cartao = 200
contas = aluguel + luz + agua + telefone + cartao

print("Começou o fluxo.")

if salario >= contas: # se o salário for maior ou igual ao valor das contas...
    restos = salario - contas # ...calcule quanto sobra
    print(f"Consigo pagar as contas e me sobram {restos} reais.")
else: # se não...
    divida = contas - salario # calcule a diferença...
    print(f"Não consigo pagar as contas. Minha dívida é de {divida} reais.")
   
print("Acabou o fluxo.")
```
```resultado
Começou o fluxo.
Consigo pagar as contas e me sobram 755 reais.
Acabou o fluxo.
```
```python
salario = 1412
aluguel = 1600
luz = 90
agua = 80
telefone = 99
cartao = 200
contas = aluguel + luz + agua + telefone + cartao

print("Começou o fluxo.")

if salario >= contas: # se o salário for maior ou igual ao valor das contas...
    restos = salario - contas # ...calcule quanto sobra
    print(f"Consigo pagar as contas e me sobram {restos} reais.")
else: # se não...
    divida = contas - salario # calcule a diferença...
    print(f"Não consigo pagar as contas. Minha dívida é de {divida} reais.")
    
print("Acabou o fluxo.")
```
```resultado
Começou o fluxo.
Não consigo pagar as contas. Minha dívida é de 657 reais.
Acabou o fluxo.
```

No primeiro exemplo, foi executado o bloco de operações dentro de `if`; no segundo, o bloco de operações dentro de `else`. Repare que não houve mudanças nos códigos `if`-`else`, eles são absolutamente iguais; o que mudou foi apenas a variável `salario`.

### `if`-`elif`-`else`

Vimos que o uso de `if`-`else` permite executar uma operação para resultado `True` e outra, distinta, para `False`. Mas e se tivermos três ou mais operações? Por exemplo:

> Se a temperatura estiver (1) igual ou superior a 30°C, devo usar protetor solar; (2) entre 20°C e 29°C, basta uma camiseta; (3) entre 10°C e 19°C, devo usar uma blusa; (4) abaixo de 10°C, preciso de jaqueta.

Repare que, na construção acima, tenho quatro condições que levam a quatro operações distintas:

| condição | operação |
| :-: | :-: |
| >= 30 | protetor solar |
| 20-29 | camiseta |
| 10-19 | blusa |
| < 10 | jaqueta |

Como ficaria isso em Python? Bem, teríamos de ir além de `if`-`else`. Temos de usar `if`-`elif`-`else`:

```python
if condicao_1:
    operacao_1
elif condicao_2:
    operacao_2
elif condicao_3:
    operacao_3
...    
elif condicao_n:
    operacao_n
else:
    operacao_z
```

Ou seja, em português seria algo como "se `condicao_1` for `True`, realize `operacao_1`; se não, veja se `condicao_2` é `True` e, se for, execute `operacao_2`; se não, veja se `condicao_3` é `True` e, se for, execute `operacao_3` etc. Se nenhuma das condições for satisfeita, execute `operacao_z`".

O exemplo das temperaturas ficaria assim:

```python
temperatura = 28
if temperatura >= 30:
    print("Devo usar protetor solar")
elif temperatura < 30 and temperatura >= 20:
    print("Devo usar apenas uma camiseta")
elif temperatura < 20 and temperatura >= 10: 
    print("Devo usar uma blusa")
else:
    print("Devo usar uma jaqueta")
# Repare que coloquei a última condição (temperatura < 10) no 
# `else`, pois é a única condição que resta dentre todas. 
# Ou seja, a condição fica implícita.
```
```resultado
Devo usar apenas uma camiseta
```
```python
temperatura = 13
if temperatura >= 30:
    print("Devo usar protetor solar")
elif temperatura < 30 and temperatura >= 20:
    print("Devo usar apenas uma camiseta")
elif temperatura < 20 and temperatura >= 10: 
    print("Devo usar uma blusa")
else:
    print("Devo usar uma jaqueta")
```
```resultado
Devo usar uma blusa
```

---
__Mais sobre os tópicos da aula:__

- [vid] [Estruturas de seleção com if e else](https://www.youtube.com/watch?v=zouf7AkISR4), em Cursos Kane Chan
- [txt] [Comandos if](https://docs.python.org/pt-br/3.8/tutorial/controlflow.html#if-statements), em Python.org
- [txt] [Comandos de decisão](https://www.inf.pucrs.br/pinho/PCB/ComandosDeDecisao/Decisao.htm), em Escola Politécnica - PUC-RS

{% end %}