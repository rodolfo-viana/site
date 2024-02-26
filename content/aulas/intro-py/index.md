---
title: "[IDP] Introdução à linguagem Python"
date: 2024-02-18
---

{{< warning >}}
As aulas aqui apresentadas intregam o módulo "Introdução à linguagem Python" do MBA em Jornalismo de Dados, do IDP. Mais informações [aqui](https://www.idp.edu.br/techschool/mba-jornalismo-de-dados/).
{{< /warning >}}

{{< expandable label="Variáveis" level="2" >}}
Variável é um nome que faz referência a um valor e fica temporariamente salvo na memória do computador. Funciona como um apelido que damos a um determinado dado. Sempre que chamarmos o apelido &mdash;a variável&mdash;, o dado será evocado.

A atribuição é simples: 

```
variavel = dado
```

Vejamos um uso real:

```py
vlr_dolar = 4.95
```

O valor `4.95` está agora salvo na memória do meu computador. Para obter o valor, eu chamo `vlr_dolar`. Assim:

```py
print(vlr_dolar) # A função `print()` é usada para imprimir em tela
```
```textfile 
4.95
```

Uma variável serve, entre outros, para que não precisemos repetir a digitação ou operação sempre que precisamos do valor. Vamos pegar como exemplo o último verso de "A flor e a náusea", de Carlos Drummond de Andrade:

> É feia. Mas é uma flor. Furou o asfalto, o tédio, o nojo e o ódio.

Essa frase (um tanto extensa) não precisa mais ser digitada se for atribuída à uma variável:

```py
frase = "É feia. Mas é uma flor. Furou o asfalto, o tédio, o nojo e o ódio."
print(frase)
```
```textfile
É feia. Mas é uma flor. Furou o asfalto, o tédio, o nojo e o ódio.
```

{{< warning >}}
Mas lembre-se: a variável perde seu valor quando:

1. o script é finalizado; ou
2. o valor é alterado.
{{< /warning >}}

Sim, alterado. É possível mudar o valor de uma variável já existente &mdash;afinal, ela chama "variável". Para isso, basta atribuir novo valor:

```py
print(vlr_dolar) # Até aqui, o valor de `vlr_dolar` é 4.95...
vlr_dolar = 4.91 # ...e aqui, altero o valor da variável para 4.91
print(vlr_dolar) # Agora a variável apresenta o novo valor
```
```textfile
4.95
4.91
```

Há algumas regras para criar variáveis:

- não pode começar com número ou símbolo, mas pode ter número e underscore (`_`) no meio ou no fim;

```py
idade1 = 42 # Correto, pois números são permitidos tanto no meio quanto no fim
1idade = 42 # Incorreto, pois números não podem estar no início da variável
```

- não pode conter pontos e demais sinais gráficos, e acentos são desaconselháveis;

```py
idade_1 = 42 # Correto, pois underscore é permitido
idade.1 = 42 # Incorreto, pois não se pode usar ponto na variável
```

- maiúsculas e minúsculas são diferentes;

```py
nome = "Pedro" # Variável com `n` minúsculo
Nome = "José" # Variável com `n` maiúsculo
print(Nome)
```
```textfile
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
{{< /expandable >}}
{{< expandable label="Tipos de dados" level="2" >}}
Repare que, quando usamos variáveis, às vezes usamos valores com aspas, e outras vezes sem aspas. Exemplos:

```py
pi = 3.1416
linguagem = "Python"
```

Isso porque os valores são de tipos diferentes: o primeiro pertence ao tipo numérico `float` (ponto flutuante, decimal), enquanto o segundo pertence ao tipo não-numérico `string` (texto). Em Python, cada tipo tem suas particularidades.

### Tipos numéricos

- Integer (`int`)
  - números inteiros
  - não usa aspas

```py
numero = 32
print(numero)
print(type(numero)) # a função type() mostra o tipo de dado
```
```textfile
32
<class 'int'>
```

- Float (`float`)
    - números decimais; números com ponto flutuante; notação científica
    - não usa aspas

```py
numero = 32.0
print(numero)
print(type(numero))
```
```textfile
32.0
<class 'float'>
```
```py
numero = 0.000000000000000000000000000001
print(numero)
print(type(numero))
```
```textfile
1e-30
<class 'float'>
```

- Complex (`complex`)
    - números complexos, com \\(\sqrt{-1}\\) em parte da equação
    - em Python, número imaginário representado pela letra `j`
    - não usa aspas

```py
from cmath import sqrt  # Veremos módulos nas próximas aulas

numero = sqrt(-1)
print(numero)
print(type(numero))
```
```textfile
1j
<class 'complex'>
```

### Tipo não-numérico

- String (`str`)
    - texto; sequência de caracteres alfanuméricos; letra
    - aparecem entre aspas duplas (") ou simples (')

```py
txt = "Brasil registra 94 mortes por dengue; Belo Horizonte decreta emergência"
print(txt)
print(type(txt))
```
```textfile
Brasil registra 94 mortes por dengue; Belo Horizonte decreta emergência
<class 'str'>
```

{{< warning >}}
Fique atento! Se colocamos `"` ou `'` (aspas usadas em `str`) num valor numérico (digamos, `int`), o número deixa de ser número, e se transforma em texto. Uma mudança que parece pequena muda completamente o tipo do dado.

```py
print(1234)
print(type(1234))
print('1234')
print(type('1234'))
```
```textfile
1234
<class 'int'>
1234
<class 'str'>
```
{{< /warning >}}

{{< warning >}}
Notem que, em linhas acima, eu ora usei aspas duplas, ora usei aspas simples. Os dois tipos de aspas valem, mas cuidado:

```py
# Aqui, aspas duplas indicam que o dado é `str`, e as aspas simples indicam grifo
print("Estou usando 'aspas simples' dentro de aspas duplas") 
```
```textfile
Estou usando 'aspas simples' dentro de aspas duplas
```
```py
# Aqui, aspas simples indicam que o dado é `str`, e as aspas duplas indicam grifo
print('Estou usando "aspas duplas" dentro de aspas simples')
```
```textfile
Estou usando "aspas duplas" dentro de aspas simples
```
```py
print('O que acontece se, dentro de 'aspas simples', eu usar aspas simples?')
```
```textfile
  Cell In[15], line 1
    print('O que acontece se, dentro de 'aspas simples', eu usar aspas simples?')
          ^
SyntaxError: invalid syntax. Perhaps you forgot a comma?
```
```py
print("O mesmo acontece com "aspas duplas" dentro de aspas duplas?")
```
```textfile
  Cell In[16], line 1
    print("O mesmo acontece com "aspas duplas" dentro de aspas duplas?")
          ^
SyntaxError: invalid syntax. Perhaps you forgot a comma?
```

Nos dois erros acima, o sistema não entende se as aspas servem para indicar `str` ou se são grifo. temos `SyntaxError`, erro de sintaxe. Isso ocorre porque a máquina entende que os dados se encerram no fechamento de aspas e não sabe o que fazer com o restante da informação:

1. No primeiro erro, a máquina computou `'O que acontece se, dentro de '` e não soube o que fazer com o resto;
2. No segundo exemplo, a máquina computou `"O mesmo acontece com "` e não soube o que fazer com o resto.

Uma opção é usar escape (`\`) nas aspas internas. Escape funciona para eu avisar a máquina: "interprete de maneira literal, como aspas; não considere como fim de um texto".

```py
print('E agora? Consigo usar \'aspas simples\' dentro de aspas simples?')
```
```textfile
E agora? Consigo usar 'aspas simples' dentro de aspas simples?
```
```py
print("E \"aspas duplas\" dentro de aspas duplas?")
```
```textfile
E "aspas duplas" dentro de aspas duplas?
```
{{< /warning >}}

### Tipo lógico

- Boolean (`bool`)
    - comporta apenas dois valores: `True` (verdadeiro) e `False` (falso)
    - nos "bastidores", funciona como número, sendo `0` para `False` e `1` para `True`
    - assim como números, não usa aspas

```py
vdd_ou_falso = True
print(vdd_ou_falso)
print(type(vdd_ou_falso))
```
```textfile
True
<class 'bool'>
```
```py
vdd_ou_falso = False
print(vdd_ou_falso)
print(type(vdd_ou_falso))
```
```textfile
False
<class 'bool'>
```
```py
# veremos operações em breve, mas adianto aqui os 
# operadores `>` e `<` para mostrar um uso de `bool`
idade_rodolfo = 43
idade_pedro = 6
print(idade_pedro > idade_rodolfo) # `>` indica `maior que`
```
```textfile
False
```
```py
print(idade_pedro < idade_rodolfo) # `<` indica `menor que`
```
```textfile
True
```
```py
# Como se comportam como números, sendo True = 1
print(True + True)
```
```textfile
2
```
{{< /expandable >}}
{{< expandable label="Operações" level="2" >}}
Agora que sabemos o que são variáveis e conhecemos os tipos básicos, podemos fazer cálculos ou comparar duas ou mais variáveis. Para isso realizações operações aritméticas, relacionais ou lógicas.

### Aritméticas

Que tal fazer matemática usando variáveis? É para isso que servem as operações aritméticas. Por exemplo, descobrir o salário mínimo por dia útil...

```py
sal_minimo = 1412
dias_uteis = 22
print(sal_minimo / dias_uteis)
```
```textfile
64.18181818181818
```

...ou então, calcular a área de um círculo de 12,5 metros de raio, cuja fórmula é \\(A=\pi r^2\\).

```py
raio = 12.5
pi = 3.14159
area = pi * (raio**2)
print(area)
```
```textfile
490.87343749999997
```

No primeiro exemplo, eu dividi o salário mínimo (`sal_minimo`) pela quantidade de dias úteis (`dias_uteis`) em um mês. Para isso, usei o símbolo de divisão (`/`).

No segundo exemplo, elevei o raio (`raio`) ao quadrado usando o símbolo de exponenciação (`**`) e, a ele, multipliquei o valor de pi (`pi`) com o símbolo de multiplicação (`*`).

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

{{< warning >}}
Cabe ressaltar: a ordem de execução de operações segue a ordem convencional na matemática:

1. exponenciação
2. multiplicação e divisão
3. soma e subtração

Podemos sobrescrever essa ordem usando parênteses:

```py
print(2 + 3 * 4) # Multiplica 3 e 4, e depois adiciona 2
```
```textfile
14
```
```py
print((2 + 3) * 4) # Soma 2 e 3, e depois multiplica por 4
```
```textfile
20
```
{{< /warning >}}


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

```py
conta = 5 ** 2 / 2 # Faço um cálculo aritmético e salvo na variável `conta`
print(conta == 12) # Agora vejo se o valor de `conta` é igual a 12
```
```textfile
False
```
```py
print(conta >= 12) # Vejo se o valor de `conta` é maior que ou igual a 12 
```
```textfile
True
```
```py
print(conta)
```
```textfile
12.5
```

Um outro exemplo: ver se a quantidade de dígitos num número de CPF corresponde à quantidade oficial:

```py
cpf = "01234567890" # Repare que coloquei aspas no numeral, convertendo-o para `str`
qtd_elem_cpf = 11 # Estabeleço que a quantidade de elementos num CPF é 11
print(cpf)
print(len(cpf) == qtd_elem_cpf) # len() retorna a quantidade número de elementos num objeto
```
```textfile
01234567890
True
```

Ou ainda, comparar uma projecao rudimentar da balança comercial com uma meta imaginária:

```py
# fonte:
# https://agenciagov.ebc.com.br/rede-nacional-de-radio/programas/e-noticia/08-02-24-e-noticia-filippin-balanca-comercial-ve-ctl.mp3
exportacoes_jan2024 = 27.02
importacoes_jan2024 = 20.49
meta_balanca_2024 = 78

projecao_expo_2024 = exportacoes_jan2024 * 12
projecao_impo_2024 = importacoes_jan2024 * 12

print((projecao_expo - projecao_impo) > meta_balanca_2024)
```
```textfile
True
```

### De atribuição

Por ora, já temos sedimentado o conhecimento de que o sinal `=` serve para atribuir um valor a uma variável, como vimos no item _Variáveis_. Exemplo:

```
variavel = valor
```

Mas `=`, junto a outros sinais, serve também para operações de adição, subtração etc., __quando o valor resultante dessa operação aritmética for atribuída à mesma variável__.

Ficou confuso, então vou explicar com um exemplo:

```py
idade = 43
print(idade)
idade = idade + 1
print(idade)
```
```textfile
43
44
```

No exemplo acima, note que, na terceira linha, temos `1` adicionado à variável `idade` (com valor `43`), e o resultado (`44`) será atribuído à mesma variável `idade`. A variável se repete: aparece tanto na operação aritmética (`idade + 1`) quanto no elemento onde o resultado da operação é salvo (`idade =`). 

Para não ter de repetir a variável, usamos operadores de atribuição. O exemplo acima poderia ser escrito assim:

```py
idade = 43
print(idade)
idade += 1 # equivalente a `idade = idade + 1`
print(idade)
```
```textfile
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

### Lógicas

Além dos operadores relacionais, há os operadores lógicos. Eles servem para agregar operadores relacionais. Por exemplo:

```py
x = 5
y = 2

print(y > x)
print(y == x)
print(y < x)

print(y < x and y > 3)
print(y < x and y > 1)
```
```textfile
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

```py
# fontes:
# https://www.poder360.com.br/poderdata/percepcao-sobre-homofobia-no-brasil-cresceu-sob-lula-diz-poderdata/
# https://g1.globo.com/ba/bahia/noticia/2024/01/20/mortes-violentas-de-pessoas-lgbtqia-na-ba-2023.ghtml
percepcao_2024 = 72
percepcao_2022 = 69
mortes_2023 = 100
mortes_2022 = 63
print(percepcao_2024 > percepcao_2022 and mortes_2023 < mortes_2022)
```
```textfile
False
```

{{< /expandable >}}
{{< expandable label="Controle de fluxo com `if`" level="2" >}}
Até o momento, estamos escrevendo códigos que são executados numa estrutura fixa: __de cima para baixo, linha a linha__. Exemplo:

```py
nome = "Rodolfo"
ano = 1981
idade = 2024 - ano
print("Bom dia, {}. Você tem ou terá {} anos em 2024.".format(nome, str(idade)))
# A função `format()` substititui `{}` pelo valor da variável
# A função `str()` converte o dado para string
```
```textfile
Bom dia, Rodolfo. Você tem ou terá 43 anos em 2024.
```

Até aqui, nosso script processa a linha 1, depois a linha 2, depois a linha 3 e, por fim, a linha 4. Uma após a outra, sem nunca pular uma linha. É um fluxo fixo.

Mas podemos mudar isso. Podemos controlar a execução, o fluxo do script. Uma das formas é com `if`, que condiciona a execução de uma linha ao resultado de outra.

### `if`

A estrutura mais simples do controle de fluxo com `if` é assim:

```py
if condicao_1:
    operacao_1
```

Em português, o exemplo acima seria algo como "se `condicao_1` for `True`, execute `operacao_1`; se for `False`, não execute".

{{< warning >}}
Reparem que há indentação de quatro espaços na linha abaixo de `if condicao_1:`. É algo obrigatório, e indica que as operações dentro do bloco `if` estão condicionadas à `condicao_1`. 

Um exemplo:

```py
if condicao_1:
    operacao_1
    operacao_2
```

Acima, `operacao_1` e `operacao_2` são executadas somente se `condicao_1` for `True`. A indentação coloca as operações dentro do bloco `if`. Este bloco forma uma unidade lógica, onde todas as operações dentro dele dependem da condição.

```py
if condicao_1:
    operacao_1
operacao_2
```

Aqui, `operacao_1` ainda depende de `condicao_1` ser `True` para ser executada. No entanto, `operacao_2` não faz parte do bloco de código que depende de `condicao_1` e, portanto, `operacao_2` será executada independentemente de `condicao_1` ser `True` ou não, já que ela está fora do bloco `if`.
{{< /warning>}}

Desenhando,

<img style="display: block; margin-left: auto; margin-right: auto; max-width: 323px; max-height: unset;max-height: unset; aspect-ratio:1;" src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUMAAAGZCAYAAAATllNOAAAGD3RFWHRteGZpbGUAJTNDbXhmaWxlJTIwaG9zdCUzRCUyMmFwcC5kaWFncmFtcy5uZXQlMjIlMjBtb2RpZmllZCUzRCUyMjIwMjMtMDMtMDdUMTklM0EzMSUzQTQ2LjY1N1olMjIlMjBhZ2VudCUzRCUyMjUuMCUyMChXaW5kb3dzKSUyMiUyMHZlcnNpb24lM0QlMjIyMS4wLjIlMjIlMjBldGFnJTNEJTIyT1VBSjRiSUl5R2JJWVJORWVPMHglMjIlMjB0eXBlJTNEJTIyZGV2aWNlJTIyJTNFJTNDZGlhZ3JhbSUyMG5hbWUlM0QlMjJQJUMzJUExZ2luYS0xJTIyJTIwaWQlM0QlMjJlQXJqR0w5WFJEMkVtaTZwMHExcCUyMiUzRTdabEJrNXNnRk1jJTJGamNkMlZKVEU0MjUyMDE0NjdVdzYwJTJCNlJqU1F5UzRKRnNvbjk5TVVJS21qYVRCSTNwbTBPQmg3d2tQZiUyRkFZb09tS3gySHpoS2swOHN4dFR4M1hqbmdBZkg5ejBYaFBLdnNPU2xKUXlDMHJEa0pGYVZhc09NJTJGTVM2cGJKdVNJd3pvNkpnakFxU21zWTVXNiUyRnhYQmcyeERuYm10VVdqSnE5cG1pSlc0YlpITkcyOVJ1SlJWSmF4JTJGNm90biUyRkVaSm5vbmowWWxTVXJwQ3Vya1dRSml0bTJZUUtQRHBod3hrU1pXdTBtbUJiQjAzRXAyMDBQbEZZM3h2RmFITlBBTHh1OElycFJZM044U0dYVCUyQndXVEh1UU5pbHlOR3Y3WU1GM3dMdHRyY2ljcmVGRXFkYjJ2eTJWcVdmeFAyQW83RSUyQkRjalZnaGRYSFJ2a21uNDdZTHN0QXQ1QWlJdG1yYk03Y3RzbFo1Mjlyc0d4MzVuRzNXTVM2RzdzcmliVUlFbnFWb1hwUnVKYW5TbG9nVmxUbFBKalBCMlV1bEw2ajh2V0l1OE81Z3ZMMUtSWWslMkZsakVRUEpkVlZBTSUyRlVNSXI4c2NxdTYweDhxQ3lKUTJFZERPa3lGMVdubXR4WlVMcDI2MDE2RlByZFV4S3NmZFh3UDRta1NwRjNrS2xvRCUyQlZ2bkxwOGxxNkxBaWxNJTJCVXRRV0tlS051RVVjYjNQUUFJcDFNSXE5YU5FdGVGMEhVdm8yNmxYRzZwM1ZUWDcwbmRzRDkxcDRobTE1TzNKVmtVdWU1ZU1rdms2VFNTdndOQVhFQmVjRTE1WVglMkZ5Zms0eFI4TllZcHZLWll3V2cyJTJCcmZHZ3FROWpmVkFiJTJCRzJvOTZuRXFrNVYlMkJaS0tNcGJlOGw5clQ4VTBsR25kSVpFVUlyJTJCTzc0bzFBNXA0cG03JTJCWUlUSGpKNGZNOCUyQjlGNW4yb3MwJTJGTnNvZWRrY3RWTGtaWnNuZlNIV1Y1QzFOU2pPR2huaFk0dHQ1QUJPSkxMSXlIOWlORWFBUTU3SWl4dG5GTWtTQ3ZabzlkZ1ZjOWZHRmtUJTJGak8wbFElMkZMMW5TWld6RDUxZzFhcjZNV0g0QyUyQjdrTFdJN0tJTFFjN1RHb1JuMFVHZEV3eVBnVERIaEhSTU90ekQycCUyRm90MDdiVEk1TDhIcUJUQkFLakpGQmdhVThEYXhrOWt5dllUSFllVVZCN2xqV3BwVVNFN0V6bzlMMjZHdWdaek5ZRW5Vd2ZhMUFVRHA2NjFBcDJLblRjNmw3dnVmbng3NlIwYjV6MHlVWG84R1ZudnRwRDFla2MySEJpeWxSOU5nTDNDSFl1c2I2JTJCNFlUJTJGSUJuMGo2OThXc2hmZTI0TTJzbkJneUE1NGxUMW5kJTJCODZYJTJGMTN1QXZiM0ZXZlF3YkNYV3VGdTlSU0NZNThVZW1IdTY0VDQ0dHdaMUJYUXppc0xSciUyQjUlMkI1SzNIV2RaWiUyRkIzU1ZPU1FZamVlQkY3ME5USzNpaTZQYnpVdUJlNmxSRVp1c3Z6V1gxJTJCbnM5ZVB3RiUzQyUyRmRpYWdyYW0lM0UlM0MlMkZteGZpbGUlM0XBge47AAAgAElEQVR4Xu2dC5QV1Znvd2vGSDLK0OBolJUgSCaJS2m1G8YExgEj9ABhmbAUkAS5I3bz8CYZgxAgLJpBIBDvmOsV6G41Fx15hTE6KAwQI0no0RFQaZ/3BhoZpn3yEojjY5Se/VWffdinOHXqsXed2lX7X2vV6tOna3/17f+396+//Th1KhgOKAAFoAAUYBXQAApAASgABRhgiEYABaAAFCAFkBmiHUABKAAFAEO0ASgABaBApwLIDNESoAAUgAKAIdoAFIACUACZ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">

Vamos ver isso na prática:

```py
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
    print("Consigo pagar as contas e me sobram {} reais.".format(restos))
    
print("Acabou o fluxo.")
```
```textfile
Começou o fluxo.
Consigo pagar as contas e me sobram 755 reais.
Acabou o fluxo.
```

No exemplo acima o cálculo de `restos` foi executado e a frase foi impressa porque `salario >= contas` é `True`. Vejamos o que acontece se o salário for menor.

```py
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
    print("Consigo pagar as contas e me sobram {} reais.".format(restos))
    
print("Acabou o fluxo.")
```
```textfile
Começou o fluxo.
Acabou o fluxo.
```

Neste último exemplo, com apenas um salário mínimo, nem o cálculo de `restos`, nem a impressão da frase ocorreu porque `salario >= contas` é `False`.

### `if`-`else`

Quando utilizamos `if`, a operação é executada apenas se a condição for `True`; se for `False`, nada acontece. Contudo, há casos em que queremos executar uma operação alternativa caso a condição dê `False`. Para isso usamos `if`-`else`. Funciona assim:

```py
if condicao_1:
    operacao_1
else:
    operacao_2
```

Em português seria algo como "se `condicao_1` for `True`, execute `operacao_1`; se for `False`, realize `operacao_2`".

Desenhando,

<img style="display: block; margin-left: auto; margin-right: auto; max-width: 342px; max-height: unset;max-height: unset; aspect-ratio:1;" src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVYAAAHpCAYAAADZMxQjAAAHk3RFWHRteGZpbGUAJTNDbXhmaWxlJTIwaG9zdCUzRCUyMmFwcC5kaWFncmFtcy5uZXQlMjIlMjBtb2RpZmllZCUzRCUyMjIwMjMtMDMtMDdUMjIlM0EyOCUzQTAzLjQ0NlolMjIlMjBhZ2VudCUzRCUyMjUuMCUyMChXaW5kb3dzKSUyMiUyMHZlcnNpb24lM0QlMjIyMS4wLjIlMjIlMjBldGFnJTNEJTIyNEFsZEl6SkU1MXotbFdRWFFlNmYlMjIlMjB0eXBlJTNEJTIyZGV2aWNlJTIyJTNFJTNDZGlhZ3JhbSUyMG5hbWUlM0QlMjJQJUMzJUExZ2luYS0xJTIyJTIwaWQlM0QlMjJSYlhRSWRyNHZXMFlOamJvREtCWSUyMiUzRTdWckJrcHM0RVAwYUh6ZUZrQUZ6bkdIR3U1Zk5idFdrS3NsUkE3SlJCU01pNDlqZXIwOWpKQU9TbkRnMkRKN3MlMkJHQ2pwdFZTOTN2cUZqSVRISzEyZndwU3BIJTJGemhHWVQxMGwyRSUyRnd3Y1YwVSUyQkE3OFZKSjlMUW5kYVMxWUNwWklwVWJ3eFA2alVpajdMVGNzb2V1T1lzbDVWcktpSzR4NW50TzQ3TWlJRUh6YlZWdndyRHRxUVpiVUVEekZKRE9sSDFsU3ByVjA1Z2FOJTJGQyUyRktscWthR2ZsaGZXZEZsTEwwWkoyU2hHOWJJdnc0d1pIZ3ZLeXZWcnVJWmxYd1ZGenFmdk1UZDQ4VEV6UXZ6JTJCbmcxaDIlMkJrV3dqZlpQekt2ZksyYVhnbTBLcVVWSFNuUzNFNUZtcE8lMkJZVTBORXhZQVRsSzFxS1BhaElROU9wN0xMdmdyeHRJb3VWU3RxSzZqU1FRaUxSWEI1Tk53N0RoZlRaN2olMkYlMkJ1ZiUyRmdmcDdRU3QlMkJaNFB0dHlrcjZWSkM0dXJzRmVvTXNMVmRnJTJGd0hCNWJvVSUyRkF1TmVNWUZTQks2SUpzTTVudSUyRllGbW1wQk1YUjlHak40Y3AzcCUyQk1henQlMkI3ZyUyRmpoMmJkJTJCTG1PR1VEa1d3S0klMkJnamcxQkpBdjNhWnclMkZ6YmtmUyUyRmJyaTY4Y2Y2c0tqdlFBR0Z4ZTRRQ1hVZnJwYlZid1N6bVVSNGNoZndLbGRVWDhvMnN4bzJUYkNGNmdGJTJCTUNWVnNtZWhTMENybnJZU1g4OEZsU0J3UDJocllBZG5ZajN0QVdwdlNLanpoTlZZSDc0eCUyRjQwd1F0NExndVFQQjlJSEFTYkhncVZLb0UlMkZTV2tyS09EV1RxdSUyRlA1NzUlMkZKWVFxaVdJTFp1NUFtQVhEWVRZbjJYbzgwTHJWRUNBS1F3YyUyQkpuVHplUWlmRXpEM3NDS1BOWEVNZUdmRHdmdFBRUVhSOHFhRGJtS1JybmxXQmNCRVdpNVNneHMlMkJmQTdjNkdINVlzc21jakI4d3dHWEwxdXByVSUyRkdlZkdhaXlMU2xpQU9YeEFpUlljZjdmTnBudHhWejRiUWVzNTQlMkZLVWJrMjRBd1dleCUyRjFRMTNubXElMkJibDk3MkhYYWUxbEt5SHI5R0RFSG1hWXdweFZUancwNjRBbXhyT29Gbko0JTJCQ1ZpU1ZXNDdDaTBvdXhaZ3F4a2dtYWtaTiUyQjZJOW9pTDBmNGw3TUR4UlhJdmdiV21tOUVUS1ZXJTJCemxVNjJqc21Wek5VTzJpWWVnQSUyRk5ITjg3aUFib01MUDRPZjdsalpNZ3V0ejNMODZyb3hXalgydjB5WkdwZ1daYm9zOGtabFVhQ1I0VUpTNlhabTUzRUtrQ2Y3bGxwUktheXZaZDBaSnkwM3hib1c1eG9HOXNrNnoyU2RmMU9zMDFQUXBiUXprdUl2ODg0JTJCanE4TkUzU08lMkJ1Q2lObmd4WTg4NEc3c2x4cUl4R0J1TXlkaFFJNENlMzg0bHJNWlhZOGZWRTE4SEo2enRMUEtHQ1R0OFlmZE53czdlVW16dnBkMTJNSG9GNzRiZ3o2VmN2b3gzZ2NrN05Dcng5QXgzYWFhY2Fpa01lMlB5em5iVzIwdSUyQjZ6Q2tJY3pONTd1WnlidndkNkNkWmdlZiUyQlhCODVZWnlpbnF1ejdaejdpdjRPc2hoeW1pbDBRdmZlZDN3NDB1TG80NmolMkZqOXZqMmNwTDMyMjdmNlB6N1pQJTJGSmZ4b21mZHlIYlkzVWZOUWElMkIxNXFBYkx6cjQwaU5aaExRME1sRFZHYnJzcUdsZms2Tm1SbzV5RmlUdTlva2dyb3hDV25MZTA2Mlp6bm9ZODgz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">

Vejamos um exemplo &mdash;primeiro, com dois salários; depois, com um salário:

```py
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
    print("Consigo pagar as contas e me sobram {} reais.".format(restos))
else: # se não...
    divida = contas - salario # calcule a diferença...
    print("Não consigo pagar as contas. Minha dívida é de {} reais.".format(divida))
   
print("Acabou o fluxo.")
```
```textfile
Começou o fluxo.
Consigo pagar as contas e me sobram 755 reais.
Acabou o fluxo.
```
```py
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
    print("Consigo pagar as contas e me sobram {} reais.".format(restos))
else: # se não...
    divida = contas - salario # calcule a diferença...
    print("Não consigo pagar as contas. Minha dívida é de {} reais.".format(divida))
    
print("Acabou o fluxo.")
```
```textfile
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

```py
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

Desenhando,

<img style="display: block; margin-left: auto; margin-right: auto; max-width: 442px; max-height: unset;max-height: unset; aspect-ratio:1;" src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAboAAAKJCAYAAADN8ewbAAALA3RFWHRteGZpbGUAJTNDbXhmaWxlJTIwaG9zdCUzRCUyMmFwcC5kaWFncmFtcy5uZXQlMjIlMjBtb2RpZmllZCUzRCUyMjIwMjMtMDMtMDdUMjIlM0E1NCUzQTA1LjE3OFolMjIlMjBhZ2VudCUzRCUyMjUuMCUyMChXaW5kb3dzKSUyMiUyMHZlcnNpb24lM0QlMjIyMS4wLjIlMjIlMjBldGFnJTNEJTIyYTBiZjJBTVpXUHpZWlpOeDN5dlAlMjIlMjB0eXBlJTNEJTIyZGV2aWNlJTIyJTNFJTNDZGlhZ3JhbSUyMG5hbWUlM0QlMjJQJUMzJUExZ2luYS0xJTIyJTIwaWQlM0QlMjIyR2c4U09td1Q2TFAyaVpCYTdhYiUyMiUzRTdWeExjNk00RVA0MUhDZUZKQjdtbURoaDlySzdxY3BXN2V5UkdNV21CbHRlakNmMiUyRnZvVlJzSkl5RFlQWVhES1BpU21FUTNxJTJGdWh1ZlpKbG9PbHk5ejBKMW92ZlNZaGpBNXJoemtEUEJvVEFkVXo2TDVQc2M0a0hyVnd3VDZLUU5Ub0szcUwlMkZNQk95NiUyQmJiS01RYm9XRktTSnhHYTFFNEk2c1ZucVdDTEVnUzhpazIlMkJ5Q3hlTmQxTU1jVndkc3NpS3ZTdjZNd1hlVFNDWFNQOHQ5d05GJTJGd093UEh5ODhzQTk2WTlXU3pDRUx5V1JLaEZ3Tk5FMExTJTJGTnR5TjhWeFpqeHVsJTJGdzYlMkY4VFo0c0VTdkVyclhBRHpDMzRGOFpiMWpUMVh1dWVkblNka3UyYk5jSkxpbmNyRXdUdHZibFlmQVJRZG80akFaSW5UWkUlMkJiTUVVVGkxMnlGNTM4ZWJTc3hac3NTbFoxRUJNR3pKdnpRdld4dyUyRlFMNjdPNiUyRjZodSUyRjlIVEprM0lUendsTVVub2lSVlowZk5QbmV3Q3o5dEZOQXYwcW5hQnJzSXUwSUxkN1dKZHRnczF5eXJFV1h1VEd1SnpFYVg0YlIzTXNyT2Y5TFduc2tXNnBQcWZ3U25qZlVSeHpFVUdSQyUyQk83MCUyQm5WQjRHbThWQk1UaG40Yklsa2RxU3pIUXVyRmdPT0FyTEFWY0RvdXd2WVRsMmdhdkFuS213bkE3RE9WJTJGUmNLZGptcWN3NDBTREdkM0xac1NyOERITGdrZXpDTjB2MlRDVHZ3WnBpcFBWUVFKTlZGaVdaejVxaFNmUk1kUkd5ZjRIVTNFNCUyQktkODhMd3J0M3ZlODZOZGxQNG9mUyUyQnVvZCUyQlBsMlFIJTJGSXE4WXppc0pHdkpTN1R6Wkp2TXNCRGEwaUNaNDdRa3F2cXk1QzFiNFMwdVMzQWNwTkV2OFNGVUxtUjNlQ1VSZmJ3Q0tyWVU1NkVFZ3Z6WjJVWGxWQzdwQWFhRU9mbWx6SHRjVVhRQVZOSHJXaGliakJWajVvTnIxNFFaNkJsbWRoVm16cEF3QTFKSUt2UTJ4cG1rU0E1YSUyQm1EbWpRQm1pcUJrbmtWTEFVenp3VUlUQVp5WGtKa2R2ZUlrb2liQ2lXN3dEUnJqSnVjaFV6JTJGRVhRbDUlMkZFWTNDajNRQkhiYUVHYVBDR0dnSmNKa29FcERLWTBJQSUyQk5CV1AxVWVFZFlaNFJkMHFNUllsQUJNU2RPczJFUU9UelNFV3ZPdjF2Q1QzemJIQWkzUjlvQVROYTdnd1A1ZVNyN0NHYmlOVlBhODRnbUxHaiUyQmdUJTJGTFRaMDUlMkI5JTJGMW5uZEZkMFdGb25mdG1uRWNmWEJsOUtYSzlZbjNvT0xLZlU4M3ZUR3hsSFpTdkV1TlpsUUtFd1Z4Tk04UzBJekc5YXlDZmNvNGxHZ1d4SSUyRnN4RElLdyUyQncyU3U1R1RFNUdkeEpHcmhlJTJGTVlxcGxDOVVOS0FPWGhuVUlKWTdzRmtoJTJGZ2kyT2ZoRlFtczZmYkY5djY3NTRIbnpTWmtLT2Rma1VZR0tncjVucjd1aTIxYlVSJTJGYmE0SHYydXNYc2RUNzhJam44MnZiMTBwZHFGcXNoWHIwVGVKM1N4ekdteUhoMENXMFdabiUyQjQ3a2lwdUtwQ0tOZWl5aXVXTk1WTWkwek1SOVZJajdNbFh5dm0zWlNaMXRMaGE5WEVtelpmcjhJb2QlMkZiaEw4cThEYjZRbzRCOVRVJTJCcDV2WTBlZXF2WklzSDgwc1dqTiUyQll0a1dRemhaR3BiQjFITjkzbkk0JTJCNUZNZlNPRTAySmZUVkpObG1wem1CNlhjZjNXdmlYbVYlMkJzanpUUHFwJTJCczczUGZvNTRXY2RBeFZwNXZPNiUyRm0wMlMlMkZVZWs5bFAwYkluSmpiTmgySXFzdzdKS2xERFZXZlJSJTJGQ2pyQk4xR1ZuV2l6TDlDZ2JsWDR1dzJwbHhsV2ZZOVZHdVhQUFFZTGprJTJGMkp1S1ZlcmF4cWNkN2JFNGdNRmpROUdOUkhlbHNodk9ROU9mUiUyRnNTODNXV1lOTlY5dzFtMDBhSG5jbDFCMHhxQlYzamdKMzdxaHcxM3FoajZ4SURveU5rYWUlMkJqeVBkeGhXV0V0TXZ1Y0xXbUlXM2hWa3dER1luUTJMV2t5RFFkdUdHdlBaSUxydzBJYlozeU5aZzljY0UyU3VrOTY4UlVpWGNvSnFUOHYzazhocHI3NXVBYkVSZ0dUU1d5VEdvYlN3YkYxaDZKV29WNUIyOFpmSU95SlM2WWwxJTJCYiUyQnlkOGdjT2QlMkZhdXVSTWx0Z2NwZmhqVkc5dWolMkZIbkZuYzNUeWVhaFFmM2I3S2NOdzFkNHZROUtWT3N3aCUyRjBsZzc1TUxpbENOWW5CcHNNU0lGY01TUE93WkNRVTlIaEcwa3JRRGp0VWtZYlNTSTVXYmRrZnklMkJ3SHRLaG4wUEk1bWxzQmJmJTJGRG95OFNWZVZvWjlYOEhXSXY0eU9rbVJnZkVWcEd4YnhZYmNPWkhHYUdSUXRVb0VWVGRmJTJGbkdpZkJlSmJDbEl2M0RZa3pDMVFMZlRab3F3d05IUG94dXk1ek96Y0c3NnU4UnlvQ3QwOEhEMGVYRE8lMkZnRSUyQk4xUzdXNHJUZUhhMWhGM3NqaDZPNXdlUUIlMkZYWWYzU0lqNjBkSmdLMVpqUXRhM3pJVEtTNlpzMVRyRzNueFVZNnVYSmtWWkwwdWZCcXZEYmUlMkZCRm4zanRheXQ1Sm1LeW81WiUyQmhZJTJCb1diYnpneFNaeDlIaU1MNDhQS1dJWFVoSXhib3ZKZ3NjeEJvMEJWMHVrWjQwbzQxZGs4TWhFeEFUTXl6VHlVMXQ4WG0zZm1LM3BoaEVZM3dFaHJITXdUbDFmUjRFSzV0V0ZwUjFIbDFYejJ5eEhZMG8xWXpOWHdSZkNlMlphcTdLOU1WUUd1TkRiUVdsTkowMnhXcDZFcWdsVGtiVyUyRk15SyUyRjdTM3VUJTJCWXZWUk9acXR3YUMwQTZz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">

O exemplo das temperaturas ficaria assim:

```py
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
```textfile
Devo usar apenas uma camiseta
```
```py
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
```textfile
Devo usar uma blusa
```
{{< /expandable >}}
{{< expandable label="Controle de fluxo com `while`" level="2" >}}
Vimos que a execução das linhas pode ser controlada, que o código nem sempre precisa ter todas as suas linhas lidas. E vimos que uma forma de controlar o fluxo é com `if`.

Há outra forma: `while`. Diferentemente de `if`, que checa se a condição é `True` ou `False`, `while` executa a operação enquanto a condição for `True`. Sua sintaxe é assim:

```py
while condicao:
    operacao
```

Um exemplo concreto:

> Tenho um micro-ônibus com nenhum passageiro e capacidade para 20 pessoas. Enquanto a lotação for menor que ou igual a 20, adiciono passageiro.

Em Python, ficaria assim:

```py
passageiros = 0
lotacao = 20
while passageiros < lotacao:
    passageiros += 1
    print("Tenho {} passageiro(s) no meu ônibus.".format(passageiros))
```
```textfile
Tenho 1 passageiro(s) no meu ônibus.
Tenho 2 passageiro(s) no meu ônibus.
Tenho 3 passageiro(s) no meu ônibus.
Tenho 4 passageiro(s) no meu ônibus.
Tenho 5 passageiro(s) no meu ônibus.
Tenho 6 passageiro(s) no meu ônibus.
Tenho 7 passageiro(s) no meu ônibus.
Tenho 8 passageiro(s) no meu ônibus.
Tenho 9 passageiro(s) no meu ônibus.
Tenho 10 passageiro(s) no meu ônibus.
Tenho 11 passageiro(s) no meu ônibus.
Tenho 12 passageiro(s) no meu ônibus.
Tenho 13 passageiro(s) no meu ônibus.
Tenho 14 passageiro(s) no meu ônibus.
Tenho 15 passageiro(s) no meu ônibus.
Tenho 16 passageiro(s) no meu ônibus.
Tenho 17 passageiro(s) no meu ônibus.
Tenho 18 passageiro(s) no meu ônibus.
Tenho 19 passageiro(s) no meu ônibus.
Tenho 20 passageiro(s) no meu ônibus.
```

No código acima, o bloco dentro de `while` (a operação de adição e a impressão da frase) foi executado 20 vezes &mdash;foi executado sempre que a operação `passageiros < lotacao` deu `True`. Quando a quantidade de passageiros chegaria a 21, a execução é interrompida.

Desenhando,

<img style="display: block; margin-left: auto; margin-right: auto; max-width: 442px; max-height: unset;max-height: unset; aspect-ratio:1;" src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAGYCAYAAABvd3jMAAAGX3RFWHRteGZpbGUAJTNDbXhmaWxlJTIwaG9zdCUzRCUyMmFwcC5kaWFncmFtcy5uZXQlMjIlMjBtb2RpZmllZCUzRCUyMjIwMjMtMDMtMDhUMDUlM0ExMSUzQTE5LjY4NFolMjIlMjBhZ2VudCUzRCUyMjUuMCUyMChXaW5kb3dzKSUyMiUyMHZlcnNpb24lM0QlMjIyMS4wLjIlMjIlMjBldGFnJTNEJTIyNXkyMzJpdVl6SWk2cVZSS1NZOGwlMjIlMjB0eXBlJTNEJTIyZGV2aWNlJTIyJTNFJTNDZGlhZ3JhbSUyMG5hbWUlM0QlMjJQJUMzJUExZ2luYS0xJTIyJTIwaWQlM0QlMjJZb291M3NxcDNCWlpST3VPeDZ2WSUyMiUzRTdWcE5jNXN3RVAwMVB0WUR5SUE1Sms3Y1hqcnRqRHZUNXFnWUJUVEJGaFZ5YlBmWFZ4Z0owSWRieDRIZ3BPVkFwS2RscGQzM2tKQ2NFWml0ZGg4cHpOUFBKRWJaeUhQaTNRamNqRHh2T25YNHZRVDJGVEFKdkFwSUtJNHJ5RzJBQmY2RkJDaWVTelk0Um9WaXlBakpHTTVWY0VuV2E3UmtDZ1lwSlZ2VjdJRmthcTg1VEpBQkxKWXdNOUh2T0dhcENNc0xHJTJGd1R3a2txZTNhRHFHcFpRV2tzSWlsU0dKTnRDd0szSXpDamhMQ3F0TnJOVUZibVR1YWxlbTUlMkJwTFVlR0VWcmRzb0RJdTlQTU51STJNUzQyRjRHbTFDeXlZVVpvZ3p0YkNtRzk5TGNNWWZnMW9GeFFTQ3lRb3p1dVlsMEpCOFJZdkFkVWQ4MnFRVyUyQndOSldXa0VrUUNqb1RHcmZUY1M4SUlLMkp3QllFaEJrdklmckI4TEgzODVFOEhORFpNT0g0aURLSzI3Z1JqbVA1THBwNTZXayUyRkR2am94bk53T2dxSktYV3k1djBqYVhOTnNYY3UwRDVXT3NHaWQxVEhlRlcxZEFrclBIRjZWckhxQXpQcVRwZ2FKSERaZG02NVc4angxSzI0dW00Y1hteFlKUTgxaUlHSE9HRU1valhpQW9IUjVsdk0lMkJ6OW1XRlhaVGcwQ1hZREM4R1REdmlkOU1udk9zWVZ3WWM3SU8lMkJaTk5kJTJGUmRiOCUyRmxqN1JqZG9NSjRlY0pZdGhMY1VzbVVxc0JuSkNEMzBBSUpnUGclMkJDZmpnRktxVjF2VTJwMXhPbFFYJTJCVXptRldETWRwaGJRWWpDS0hYeWF6ODNuRXJ5TXE2SUh0UWVrTyUyQjZQN1M0NG92SXg1dDgxa1FiSXllSk4xOFQ0Yk9nbjRkZEJKJTJGMjg2Y0YlMkJSJTJCbW1QYnpwZXlVJTJCcGpKRDhQYTIzZzFJV1dTalRNb2JXOFZXNWRlSzElMkI0d3NIOVVVcWZua0lkUDlqN0l5OW1YMXJ0MTJzMU5xZTFHTFlaRWVuTml6em9jd3gyVU1yWnlqMk5pcWFSbm5lME5JRXlRM0RYWVNXa20yYlRVa1JsRUdHWDVTZTdRbFh2VHdsZUNENHFVbzlCMUxRVFowaVlSVmU1dW1QUWowanpGUGMxU0ZhRGc2OEY2SGVaSVVaRTlEYSUyQkZ2OUtNZFppMjN2SFluJTJCaSUyRkxqZE95c24lMkIyWkNwaVdwSlJWVFFaVWtXZW80bmhURkhwZnFhbmFZb3pEJTJGY3RzN3cwS0Y2cU92ZU5xYTZsT1djYyUyQmozSWJtTEt6cjhvMmVsejBMbTZxM2VSWnd2UDNrJTJCa2RUTlZqc0o0b1hKNHRtUzl0eVZaVjVIc0t5azJHSFM1OWV3S2VMWmlYVTJ4eGpkWFI0bzFKQnQyTEZuYmFlY0ZTN2IlMkZ0ZDAzSlJ2JTJCbjJRN1g5MXRwN0QlMkZ0TzRDVTNmVFFhZEtmWWJyYXFvRUolMkI1VSUyQnRHZDdSeTVFOTBwcWh0N2ZsZkM2MzJORGszaERicVp1V0RoYWYxSXY4Q3hqME9iYUR0YnMyMEg1eSUyRlFjQzluTElNdGw5Tm83S3UwJTJCJTJCY3VtTnEzbCUyRkhyOHRsSExMemElMkZLQmZtVGYlMkZGUUZ1ZndNJTNEJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRf3I3JsAACAASURBVHhe7Z0NlBXVle9Pq5OJzhIC6MRnGEVQQ3QiPaaBCYH3BhTogM/gGG2IGWSepIHWmUSiICAPWAQQlhPe8iF0N5gYE/kY4jJjBIFMZObBmBEIoX2iSfiMg75EgQ4QP2J0+p1dfc/l3Opbt77OrdpV53/XqtXd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">

{{< warning >}}
Cuidado ao usar `while`! Como dissemos, ele executa uma operação __enquanto__ uma condição for `True`. Se a condição for `True` para sempre, o código será executado até o seu computador travar. Um exemplo de condição infinita:

```py
numero = 1
while numero > 0:
    print("O número agora é {}.".format(numero))
    numero += 1
```
```textfile
O número agora é 1.
O número agora é 2.
O número agora é 3.
O número agora é 4.
...
...
...
[Até o travamento da máquina]
```

No exemplo acima, `numero` começa como `1` e, a cada looping no bloco, há adição de `1` a ele. Ou seja, a condição `while numero > 0` começa como `True` e nunca será `False` &mdash;`numero` será `> 0` para sempre! O código vai rodar, rodar, rodar... Quando a memória da máquina estiver exausta, ela vai travar.

É preciso, portanto, estabelecer um limite, um ponto em que `True` se tornará `False`.
{{< /warning >}}
{{< /expandable >}}
{{< expandable label="Laboratório" level="2" >}}
Nas aulas anteriores vimos muita coisa sobre Python:

- variáveis
- tipos
- operações aritméticas
- operações relacionais
- operações lógicas
- controle de fluxo com `if`
- as diversas formas de `if`
- controle de fluxo com `while`

É muita coisa num tempo bastante curto. Portanto, a aula de hoje será um encontro voltado para a prática e o experimento, e para tirar eventuais dúvidas sobre os temais supracitados.

Há cinco atividades abaixo. Elas enfocam um ou mais itens já vistos em aula. Em duplas, resolvam as atividades; em seguida, vamos conversar sobre as soluções, o que funcionou, o que não funcionou, e quais dúvidas ainda existem.

Em algumas atividades vocês verão ou terão de usar a função `input()`. Trata-se de uma função que pede ao usuário para inserir um dado e o salva numa variável. Assim:

```py
nome = input("Qual o seu nome? ")
print("Boa tarde, {}!".format(nome))
```

Repare que `nome` não tem um valor. O dado será informado pelo usuário.

### Atividade 1

O código abaixo contém um ou mais erros, e é preciso corrigi-lo(s). Copie o código no seu editor, encontre o(s) erro(s) e faça a(s) correção(ões) necessária(s).

```py
# Este é um programa para calcular o fatorial de um número
numero = int(input("Digite um número de 1 a 20: "))
resultado = 1

while numero != 0
resultado = resultado * 'numero'
numero = numero - 1

print('O fatorial é {}.".format('resultado')
```

### Atividade 2

Imagine uma loja. Cada vendedor da loja tem um salário fixo de R$ 2.000,00, além de uma comissão variável:

- vendas igual a ou acima de R$ 30.000,00: comissão de 5% sobre as vendas;
- vendas entre R$ 15.000,01 e R$ 29.999,99: comissão de 4% sobre as vendas;
- vendas até R$ 15.000,00: comissão de 2,5% sobre as vendas.

Escreva um código que pede ao vendedor:

- o nome,
- o mês (em número entre 1 e 12),
- o valor de vendas que ele efetuou no mês.

Com as informações obtidas, o código deve fazer os cálculos de quanto o vendedor deve receber naquele mês e retornar uma frase parecida com isso:

> Rodolfo vendeu R$ 18.761,09 em março e deve receber R$ 2.750.44.

### Atividade 3

Escreva um código que diz se o número digitado pelo usuário é par ou ímpar.

### Atividade 4

Na noite de 3 de julho de 2021, o painel de vacinação contra a covid-19 do Ministério da Saúde apontava pouco mais de 97 milhões de doses de vacina aplicadas na população brasileira. ([Fonte fora do ar](https://qsprod.saude.gov.br/extensions/DEMAS_C19Vacina/DEMAS_C19Vacina.html))

Com os dados separados por estado, torna-se possível calcular a proporção de doses aplicadas em certa unidade da federação ou certa região em relação ao total. É o que faremos aqui: calcularemos o percentual de doses aplicadas na região sudeste em relação ao Brasil.

O código, contudo, está embaralhado &mdash;os blocos estão em lugares errados. Precisamos colocá-lo em ordem! Mesmo sem saber muito do código abaixo &mdash;ainda há muito o que aprender!&mdash;, você consegue ordená-los usando apenas a lógica e a descrição de cada bloco de código.

Ah, quando a ordenação estiver correta, o resultado será este:

> A região sudeste aplicou 44.83237513295442% do total de 97135737 doses consumidas no Brasil

```py
# Este bloco conta as vacinas de todos os estados
total = 0 # Começamos com zero em `total`...
for i in estados: # ...e para cada elemento na lista `estados`...
    total += i["doses"] # ...adicionamos o valor de `doses` ao `total`
    
# Esta linha imprime o resultado
print("A região sudeste aplicou {}% do total de {} doses consumidas no Brasil".format(calculo, total))

# Este bloco é a coleção de dados de todos os estados
estados = [
    {"uf": "AC", "doses": 364906},
    {"uf": "AL", "doses": 1421213},
    {"uf": "AM", "doses": 1773255},
    {"uf": "AP", "doses": 271691},
    {"uf": "BA", "doses": 6152177},
    {"uf": "CE", "doses": 3270535},
    {"uf": "DF", "doses": 1283699},
    {"uf": "ES", "doses": 2219656},
    {"uf": "GO", "doses": 3111799},
    {"uf": "MA", "doses": 3106822},
    {"uf": "MG", "doses": 9357072},
    {"uf": "MS", "doses": 1615951},
    {"uf": "MT", "doses": 1351618},
    {"uf": "PA", "doses": 2890438},
    {"uf": "PB", "doses": 1834443},
    {"uf": "PE", "doses": 3750035},
    {"uf": "PI", "doses": 1391719},
    {"uf": "PR", "doses": 5830476},
    {"uf": "RJ", "doses": 8084518},
    {"uf": "RN", "doses": 1652963},
    {"uf": "RO", "doses": 688403},
    {"uf": "RR", "doses": 222025},
    {"uf": "RS", "doses": 6832516},
    {"uf": "SC", "doses": 3225600},
    {"uf": "SE", "doses": 923887},
    {"uf": "SP", "doses": 23887012},
    {"uf": "TO", "doses": 621308}
]

# Este bloco conta as vacinas dos estados do sudeste
vacinas_sudeste = 0 # Começamos com zero em `vacinas_sudeste`...
for i in estados: # ...e para cada elemento na lista `estados`...
    if i["uf"] in sudeste: # ...se o valor de "uf" estiver na lista `sudeste`...
        vacinas_sudeste += i["doses"] #...adicionamos o valor de `doses` a `vacinas_sudeste`

# Esta linha calcula a proporção de vacinas no sudeste em relação ao total
calculo = (vacinas_sudeste / total) * 100

# Esta linha é uma lista dos estados da região sudeste
sudeste = ["SP", "RJ", "MG", "ES"]
```

### Atividade 5

A fórmula para converter Celsius para Fahrenheit é \\(Fahrenheit = (Celsius\times\frac{9}{5})+32\\).

Já de Fahrenheit para Celsius, \\(Celsius = (Fahrenheit - 32)\times\frac{5}{9}\\).

Crie um programa que:

- pede ao usuário a temperatura,
- pede ao usuário se está em Celsius ou Faherenheit,
- realize a operação de conversão &mdash;se é Celsius, traz resultado em Fahrenheit; se Fahrenheit, em Celsius.

{{< /expandable >}}
{{< expandable label="Coleções de dados: lista" level="2" >}}
Em aulas anteriores vimos os tipos primitivos de dados, como:

- integer (`int`): `4`, `-12`, `6745`...

- float (`float`): `4.67`, `-12.01973`, `6745.0`...

- boolean (`bool`): `True`, `False`

- string (`str`): `"Python"`, `"maçã"`, `"jornalismo de dados"`, `"6.0"`...

Também vimos como armazenar dados na memória com o uso de variáveis. Por exemplo:

```py
idade = 43
nome = "Rodolfo"
print("{} tem {} anos.".format(nome, idade))
```

Muitas vezes, porém, precisamos armazenar mais de um valor numa variável. Por exemplo, as contas do mês:

```py
# Como eu posso colocar todas as contas distintas numa variável única?
aluguel = 1400
luz = 110
agua = 90
internet = 100
gas = 25
cartao = 800
```

Para armazenamos múltiplos dados numa variável, há as __coleções de dados__ do Python. Há quatro coleções muito comuns, cada uma com características e funções próprias.

### Lista

A primeira coleção é a __lista__ (classe `list`), feita com valores dentro de colchetes (`[` e `]`) ou simplesmente chamando a função `list()`.

```py
aluguel = 1400
luz = 110
agua = 90
internet = 100
gas = 25
cartao = 800

contas = [aluguel, luz, agua, internet, gas, cartao] # Aqui eu crio uma lista

print(contas)
print(type(contas))
```
```textfile
[1400, 110, 90, 100, 25, 800]
<class 'list'>
```
```py
linguagens = ["Python", "SQL", "Javascript", "C++"]
print(linguagens)
print(type(linguagens))
print(len(linguagens))
```
```textfile
['Python', 'SQL', 'Javascript', 'C++']
<class 'list'>
4
```

Posso também misturar tipos de dados dentro de uma lista...

```py
mix = [12, "Cenoura", 3.72, True]
print(mix)
```
```textfile
[12, 'Cenoura', 3.72, True]
```

...fazer lista de listas...

```py
lista1 = [1, 2, 3] # Uma lista
lista2 = [4, 5, 6] # Outra lista
listona = [lista1, lista2] # Uma lista com as duas listas
print(listona)
```
```textfile
[[1, 2, 3], [4, 5, 6]]
```

...e juntar várias listas numa só.

```py
listona2 = lista1 + lista2
print(listona2)
```
```textfile
[1, 2, 3, 4, 5, 6]
```

Para acessar cada elemento da lista, é preciso usar a posição do elemento dentro de colchetes (`[` e `]`). 

{{< warning >}}
Mas lembre-se: __Python começa a contagem no índice 0__ (ou seja, o primeiro elemento é 0, o segundo é 1, o terceiro é 2...).

```py
linguagens = ["Python", "SQL", "Javascript", "C++", "Java", "HTML"]
# Índice         0        1          2         3       4      5
print("A linguagem na terceira posição é {}".format(linguagens[2]))
print("A linguagem na quarta posição é {}".format(linguagens[3]))
print("A linguagem na primeira posição é {}".format(linguagens[0]))
```
```textfile
A linguagem na terceira posição é Javascript
A linguagem na quarta posição é C++
A linguagem na primeira posição é Python
```
{{< /warning >}}

A indexação permite, inclusive, realizar cálculos:

```py
lista = [3.14, 2.09, 8.21, -7,55]
print(lista[1] * lista[3]) # Ou seja, 2.09 * -7.55
```
```textfile
-14.629999999999999
```

É possível, ainda, acessar múltiplos elementos passando o índice de começo e de fim (mas preste atenção: __o resultado exclui o último item__). Funciona assim: `[onde começa:onde termina + 1]`

```py
linguagens = ["Python", "SQL", "Javascript", "C++", "Java", "HTML"]
# índice         0        1          2         3       4      5

print(linguagens[2:5]) # Começa no índice 2 e termina no índice 4
```
```textfile
['Javascript', 'C++', 'Java']
```

"E como funciona essa indexação quanto temos uma lista de listas?" Vamos ver com um exemplo:

```py
exemplo = [["vermelho", "amarelo", "azul"], ["verde", "roxo", "preto"]]
```

Neste caso, temos duas listas dentro de uma lista. O desenho é assim:

<img style="display: block; margin-left: auto; margin-right: auto; max-width: 361px; max-height: unset;max-height: unset; aspect-ratio:1;" src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWkAAAD7CAYAAACoomWyAAAFaXRFWHRteGZpbGUAJTNDbXhmaWxlJTIwaG9zdCUzRCUyMmFwcC5kaWFncmFtcy5uZXQlMjIlMjBtb2RpZmllZCUzRCUyMjIwMjMtMDMtMTdUMDUlM0EyMCUzQTI1LjkxMlolMjIlMjBhZ2VudCUzRCUyMjUuMCUyMChXaW5kb3dzKSUyMiUyMHZlcnNpb24lM0QlMjIyMS4wLjIlMjIlMjBldGFnJTNEJTIyYlhQcjJ4X3loeXEtSDZoMzFjRDMlMjIlMjB0eXBlJTNEJTIyZGV2aWNlJTIyJTNFJTNDZGlhZ3JhbSUyMG5hbWUlM0QlMjJQJUMzJUExZ2luYS0xJTIyJTIwaWQlM0QlMjJXWEpzTWJVZzRiOTZ2dTJsR1BlUyUyMiUzRTVacEJrNW93Rk1jJTJGRFRQdFlXY0lVZFRqU3QzMjBQYmlvZWNzUk1oc0lEUUd3ZjMwRFJBRU51eXNZd0ZaOVNMOGswamVMeSUyRkpld1lET21IMm5hTTQlMkJNVThUQTNMOURJRGZqTXNDNnhtUUg3bHlyRlU1cXRaS2ZpY2VLcFNMV3pKSzFhaXFkU0VlSGpmcWlnWW80TEViZEZsVVlSZDBkSVE1eXh0VjlzeDJuNXFqSHlzQ1ZzWFVWMzlRendSbE9yU1d0VDZEMHo4b0hveXNGZGxTWWlxeXNxU2ZZQThsallrdURHZ3d4a1Q1VldZT1pqbThDb3VaYnVuZDBwUEhlTTRFdWMwc01vR0IwUVRaWnZxbHpoV3huS1dSQjdPNjVzR1hLY0JFWGdiSXpjdlRlWHdTaTBRSVpWM1FGNnFuOE5jNE96ZExvR1RvZEpETUF1eDRFZFpSVFY0cUVZNXJkRkNXMmxCQTZzMVZ5SlN3JTJCbWZmcXUyV0Y0b283c0J3SjRCN0FpbERxT01GMjNoayUyRnc0VGo5Z1pzcmNZJTJGdTJnUWxZSFpqQXFnZE1zJTJCbjV5YktOWTZualdIVFFtUFVBWTY3QmtJYUVtQVpNZ3lMTkUyM0w5NEt6RjF5NVNNUWlySHZOeGxaZWd5anhJNm01a2dtV2hldWNHSkVMMGFNcUNJbm41YyUyRnE1TjBla1UlMkJOM05hUW14cnIlMkY1dW5qdFBYUEoxJTJGU0FrT1JHa3glMkJWa0s0SGclMkJzOVJvb0ZEMm05N1pMQjBUJTJCV3I2RGpqaW9sVUZNazBQZkUzb25ibmZtTUNCQmh4OGxtMmlhNW9PdFU4QVBlenZPJTJCd2RqdE9JJTJCeW5RczRQcGhoMmd6YWtqUGVqQzFFdDJBUHBPRHdiTW9zN2dORndhQmZUVTRlb2I1Qm54Nm1EcnRSN1dTMU04Zk9NNzVEV0o2eW5DZEZlMFU5JTJGR3o2U0FuanhNYnFLT0dkZ0RQYkxuTEx2MVRPcWF4Q3ZmbjdRSGpyaHlXWHBzSDNNczdzNEZ4MFN1cHduVFRhZmViaFpqNWxNZHB3alR6YWMwVUNOdXF4M25DTlAxS1BEbW40d3hNNnFPTTRhZlpDOVFINnVka2lhMjBGMTR1Z1g3Z0sybklUY08lMkI5SWt1QmZhZWdweVFKd1lEalFld2FGNFU4Q3diSnFEM2pGcFRuTUU3TDlKZmpLJTJCZmtidWkxOVFlWEJMMEklMkJ5SHZlZnZ4U0RLZnRnTmklMkIlMkJGdFNxeGxMYmxYaHJ6V0VKSjNKZ0xQTTNUcHRWYlQlMkYlMkZ4aGtPNCUyRnpnb095WE5MSHNXbGw2dTM1eTlsbjhCWTRoYiUyQnYzSElxeXh0c2ljUE1QJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRcp2xMoAAB8tSURBVHhe7Z39i11XucfX/AcSQoMllUCVpCJJEzVQSKFQnQnU0BZ6DTP5xTqh2NbBQEBrk/H2OomtcgOBgb6R0ftLZiiKWlTIBKWBlhRqXjSUNrFaQi3em1BL/4O58+ywTvfs2eectc9+1n72y+dA6UzOWmuv/X0+63u+Z+19zow551ZW/+OBAiiAAihQQwXGxKRXHzWcGlNCARRAgW4rMDY25jDpbjPA2aMACtRYAUy6xsVhaiiAAiiAScMACqAACtRYAUy6xsVhaiiAAiiAScMACqAACtRYAUy6xsVhaiiAAiiAScMACqAACtRYAUy6xsVp69QuX77sdu3a5ebm5tzRo0fVTvOf//yn2lhWA91xxx1Wh+a4NVUAk65pYdowLW/Gi4uLbnJysndKe/fudXv27BnZoPuNi0m3gRrOIasAJg0TlSsgJrtz586Rj9sUk/7JT37iXnzxRfeZz3zGXblyJeh8SdJBMnWqESbd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">

A variável exemplo tem dois elementos. Cada elemento é uma lista. Então, se eu chamar isso...

```py
exemplo[1] # o segundo item da variável `exemplo`
```

...terei como retorno isso:

```
["verde", "roxo", "preto"] # uma lista
```

Se eu quero acessar o elemento `"preto"`, preciso então indicar o índice dentro da lista que acesso com `exemplo[1]`. Fica assim:

```py
exemplo[1][2] # do segundo item, quero o terceiro item, ou seja, "preto"
```

Vamos ver na prática:

```py
exemplo = [["vermelho", "amarelo", "azul"], ["verde", "roxo", "preto"]]
print(exemplo[1])
print(exemplo[1][2])
```
```textfile
['verde', 'roxo', 'preto']
preto
```

Como na aula passada vimos `if`-`elif`-`else`, vale a gente ver o uso de controle de fluxo com listas e apresentar dois operadores &mdash;e, para o exemplo abaixo, consideramos `nomes = ["João", "André", "Ana", "Maria"]`:

| operador | significado | entrada | saída |
| :-: | :-: | :-: | :-: |
| `in` | está contido em | `"João" in nomes` | `True` |
| `not in` | não está contido em | `"Pedro" not in nomes` | `True` |

```py
nomes = ["João", "André", "Ana", "Maria"]

print('Ana' not in nomes)
print('Maria' in nomes)
```
```textfile
False
True
```

```py
nome = "Claudio"
lista_nomes = ["Renato", "Ana", "Fernanda"]

if nome not in lista_nomes: # "Se o nome não estiver na lista..."
    print("O nome {} não está na lista.".format(nome))
else:
    print("O nome {} está na lista.".format(nome))
```
```textfile
O nome Claudio não está na lista.
```

As listas são __mutáveis__: posso adicionar e excluir elementos, mostrar em ordem reversa etc. com algumas funções:

- `.append(x)` para adicionar um elemento `x`
- `.pop(i)` para tirar da lista um elemento de índice i e mostrar esse elemento
- `.remove(x)` para excluir um elemento `x`
- `.reverse()` para inverter a ordem dos elementos
- `.sort()` para organizar os elementos do menor ao maior (ou do maior ao menor, se usar `reverse=True`)
- `.count(x)` para contar quantas vezes o elemento `x` aparece na lista

```py
lista = ["Carlos", "Antonio", "Cesar"]
print(lista)

lista.append("Rodolfo") # adicionar "Rodolfo"
print(lista)

lista.remove("Cesar") # remover "Cesar"
print(lista)

lista.reverse() # colocar em ordem reversa
print(lista)

lista.sort(reverse=True) # ordenar do maior para o menor
print(lista)

print(lista.count("Rodolfo")) # contar quantas vezes aparece "Rodolfo"
```
```textfile
['Carlos', 'Antonio', 'Cesar']
['Carlos', 'Antonio', 'Cesar', 'Rodolfo']
['Carlos', 'Antonio', 'Rodolfo']
['Rodolfo', 'Antonio', 'Carlos']
['Rodolfo', 'Carlos', 'Antonio']
1
```
{{< /expandable >}}
{{< expandable label="Coleções de dados: tupla" level="2" >}}
Outra coleção de dados é a tupla (classe `tuple`), feita com valores dentro de parênteses (`(` e `)`) ou com a função `tuple()`.

```py
valores = (1, 2, 99)
print(valores)
print(type(valores))
```
```textfile
(1, 2, 99)
<class 'tuple'>
```

Assim como listas, tuplas podem conter dados de tipos variados, e é possível criar uma tupla de tuplas (ou de listas). Também a forma de localizar elementos por meio da indexação é similar.

```py
tupla_1 = (4, False, "maçã", 8.91) # tupla com diversos tipos
print(tupla_1)

tupla_2 = ((1, 2, 3), (9, 8, 7)) # tupla contendo duas tuplas
print(tupla_2)

tupla_3 = tuple([1, 2, 3]) # tupla a partir de lista
print(tupla_3)

tupla_4 = (("Ana", "Pedro", "Claudio"), ("José", "Maria", "João"))
print(tupla_4[0][2]) # indexação para encontrar "Claudio"
```
```textfile
(4, False, 'maçã', 8.91)
((1, 2, 3), (9, 8, 7))
(1, 2, 3)
Claudio
```

Entretanto, as semelhanças acabam aí. Ao contrário de listas, __tuplas são imutáveis__. Ou seja, elementos não podem ser removidos, adicionados, reordenados etc.

```py
vegetais = ("acelga", "repolho", "alface")
vegetais.remove("acelga")
```
```textfile
---------------------------------------------------------------------------
AttributeError                            Traceback (most recent call last)
Cell In[16], line 1
----> 1 vegetais.remove("acelga")

AttributeError: 'tuple' object has no attribute 'remove'
```
```py
vegetais.append("rúcula")
```
```textfile
---------------------------------------------------------------------------
AttributeError                            Traceback (most recent call last)
Cell In[17], line 1
----> 1 vegetais.append("rúcula")

AttributeError: 'tuple' object has no attribute 'append'
```

Daí a importância de tuplas: __elas são úteis quando precisamos nos certificar de que os elementos não foram ou não serão alterados__. É comum, inclusive, converter listas em tuplas para que seus dados não sejam modificados.

```py
cores = ["amarelo", "verde", "azul", "vermelho"] 
print("Temos {}, o que permite que eu altere seus elementos: {}".format(type(cores), cores))

cores = tuple(cores) # converto a lista para tupla
print("Agora temos {}, impossibilitando alterações: {}".format(type(cores), cores))
```
```textfile
Temos <class 'list'>, o que permite que eu altere seus elementos: ['amarelo', 'verde', 'azul', 'vermelho']
Agora temos <class 'tuple'>, impossibilitando alterações: ('amarelo', 'verde', 'azul', 'vermelho')
```
{{< /expandable >}}
{{< expandable label="Coleções de dados: conjunto" level="2" >}}
A terceira coleção é o conjunto (classe `set`), feita com valores dentro de chaves (`{` e `}`) ou com a função `set()`.

```py
conjunto = {1, 2, 3, 4, 5}
print(conjunto)
print(type(conjunto))
```
```textfile
{1, 2, 3, 4, 5}
<class 'set'>
```
As diferenças mais significativas entre conjuntos e as coleções anteriores são que, ao contrário de listas e tuplas,

1. conjuntos não retornam repetições.

```py
valores = [1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5] # lista
print(valores)

valores = tuple(valores) # tupla
print(valores)

valores = set(valores) # conjunto
print(valores)
```
```textfile
[1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5]
(1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5)
{1, 2, 3, 4, 5}
```

2. conjuntos não permitem indexação.

```py
print(valores[1])
```
```textfile
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
Cell In[21], line 1
----> 1 print(valores[1])

TypeError: 'set' object is not subscriptable
```

Com essas peculiaridades, é comum haver conversões de listas para conjuntos e, de novo, para listas: imagine que temos uma lista com 30 valores, e queremos (1) reordená-los do maior para o menor, (2) excluindo valores duplicados, e (3) encontrar os valores que estão nas posições 3 a 5.

Sabemos que exclusão de duplicatas pode ser feita com conjuntos, e não com listas; sabemos que reordenação e indexação podem ser executadas com listas, e não com conjuntos. Então...

```py
nums = [
    7, 1, 5, 3, 3, 4, 9, 5, 3, 1,
    8, 9, 1, 1, 8, 5, 5, 7, 2, 6,
    5, 4, 7, 1, 6, 3, 2, 3, 1, 9,
]
print(nums)

nums = set(nums) # com conjunto, excluo duplicatas...
print(nums)

nums = list(nums) # ...aí converto de volta para lista...
print(nums)

nums.sort(reverse=True) # ...e, na lista, reordeno do maior para o menor...
print(nums)

print(nums[3:6]) # ...para buscar valores por indexação
```
```textfile
[7, 1, 5, 3, 3, 4, 9, 5, 3, 1, 8, 9, 1, 1, 8, 5, 5, 7, 2, 6, 5, 4, 7, 1, 6, 3, 2, 3, 1, 9]
{1, 2, 3, 4, 5, 6, 7, 8, 9}
[1, 2, 3, 4, 5, 6, 7, 8, 9]
[9, 8, 7, 6, 5, 4, 3, 2, 1]
[6, 5, 4]
```

{{< warning >}}
No exemplo acima, usamos dois comandos para converter a lista em conjunto e, em seguida, em lista novamente:

```py
nums = set(nums)
nums = list(nums)
```
Podemos fazer isso numa linha só, de maneira encadeada:

```py
nums = list(set(nums))
```
{{< /warning >}}
{{< /expandable >}}
{{< expandable label="Coleções de dados: dicionário" level="2" >}}
anteriormente vimos três coleções de dados: __lista__, __tupla__ e __conjunto__. Apenas para recapitular suas características:

| lista | tupla | conjunto |
| :-: | :-: | :-: |
| exemplo: `x = [1, 2, 3, 4]` | exemplo: `y = (1, 2, 3, 4)` | exemplo: `z = {1, 2, 3, 4}` |
| uso de `[` e `]` | uso de `(` e `)` | uso de `{` e `}` |
| `list()` para lista vazia ou conversão | `tuple()` para tupla vazia ou conversão | `set()` para conjunto vazio ou conversão |
| aceita itens repetidos | aceita itens repetidos | aceita itens repetidos, mas retorna itens únicos |
| é mutável | é imutável | é imutável |
| aceita métodos para manipulação | não aceita métodos para manipulação | não aceita métodos para manipulação |
| itens acessados a partir da posição | itens acessados a partir da posição | itens inacessíveis a partir da posição |

Além dessas três coleções, há outra muito importante: dicionário. Ao contrário das demais, um dicionário não tem apenas valor, mas também tem chave. Aliás, os itens de um dicionário são `sempre em pares chave-valor.` Por exemplo:

```py
prof = {"nome": "Rodolfo"}
```

Repare na sintaxe de um dicionário: `{chave: valor}`. Portanto, um dicionário é feito de `{` e `}`, além de `:`, que é o que separa a chave &mdash;no exemplo, `"nome"`&mdash; do valor &mdash;`"Rodolfo"`. Para criá-lo eu também posso usar a função `dict()`. Vamos ver um exemplo:

```py
curso = {"instituicao": "IDP"}
print(curso)
print(type(curso))
```
```textfile
{'instituicao': 'IDP'}
<class 'dict'>
```

Isso muda bastante a forma de trabalharmos com coleções: se antes o usual era ter listas ou tuplas com dados de um mesmo tipo...

```py
frutas = ["maçã", "laranja", "banana"]
precos = [1.45, 2.07, 3.99]
```
...agora podemos ter uma coleção com diversos tipos de dados...

```py
frutas = {"produto": "maçã", "preco": 1.45} # a vírgula separa os pares chave-valor
```
...ou até mesmo uma coleção de coleções, como lista de dicionários (algo bem comum, aliás).
```py
frutas = [
    {"produto": "maçã", "preco": 1.45},
    {"produto": "laranja", "preco": 2.07},
    {"produto": "banana", "preco": 3.99}
]
```

Vou fazer o meu perfil usando dicionário e os mais variados tipos de dados:

```py
prof = {
    "nome": "Rodolfo",
    "sobrenome": "Viana",
    "idade": 43,
    "domicilio": "Marília, SP",
    "tem_pet": True,
    "qtde_pet": 1,
    "nome_pet": "Pitoco",
    "peso_pet": 11.5
}

print(prof)
print("Tenho {} elementos numa única variável!". format(len(prof))) 
```
```textfile
{'nome': 'Rodolfo', 'sobrenome': 'Viana', 'idade': 43, 'domicilio': 'Marília, SP', 'tem_pet': True, 'qtde_pet': 1, 'nome_pet': 'Pitoco', 'peso_pet': 11.5}
Tenho 8 elementos numa única variável!
```

Mas agora que temos a estrutura chave-valor, como localizar um valor? Ou adicionar outro? Simples: basta usar a chave entre `[]`!

```py
print(prof) # tenho o dicionário todo...
print(prof["tem_pet"]) #... e aqui, apenas o valor da chave "tem_pet"
```
```textfile
{'nome': 'Rodolfo', 'sobrenome': 'Viana', 'idade': 43, 'domicilio': 'Marília, SP', 'tem_pet': True, 'qtde_pet': 1, 'nome_pet': 'Pitoco', 'peso_pet': 11.5}
True
```
```py
print("{} tem {} anos e mora em {}".format(
    prof["nome"], prof["idade"], prof["domicilio"]
))
```
```textfile
Rodolfo tem 43 anos e mora em Marília, SP
```
Para adicionar um par chave-valor que não existe, funciona assim:

```
variavel["novachave"] = "novovalor"
```
Vamos ver na prática:

```py
print(prof) # repare que não tenho chave "signo"...
prof["signo"] = "Peixes" # ...mas eu a adiciono, e com o valor "Peixes"...
print(prof) # e o dicionário é atualizado
```
```textfile
{'nome': 'Rodolfo', 'sobrenome': 'Viana', 'idade': 43, 
'domicilio': 'Marília, SP', 'tem_pet': True, 'qtde_pet': 1, 
'nome_pet': 'Pitoco', 'peso_pet': 11.5}
{'nome': 'Rodolfo', 'sobrenome': 'Viana', 'idade': 43, 
'domicilio': 'Marília, SP', 'tem_pet': True, 'qtde_pet': 1, 
'nome_pet': 'Pitoco', 'peso_pet': 11.5, 'signo': 'Peixes'}
```
{{< /expandable >}}
{{< expandable label="Iteração com `for` - parte 1" level="2" >}}
Agora que conhecemos coleções de dados, podemos imaginar:

> E se o programador quiser realizar a mesma operação para cada item da coleção? Deve escrever tudo de novo?

A resposta é: não. Podemos usar controle de fluxo com `for` (ou `for` loop, como é conhecido).

O `for` loop itera (ou seja, repete) a operação ou o comando para cada item da coleção. Sua sintaxe é assim:

```
for elemento in colecao:
    operacao
```
Seria como dizer em português: "para cada elemento de `colecao`, faça determinada `operacao`". Em desenho,

<img style="display: block; margin-left: auto; margin-right: auto; max-width: 360px; max-height: unset;max-height: unset; aspect-ratio:1;" src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAGsCAYAAADwnD13AAAGxXRFWHRteGZpbGUAJTNDbXhmaWxlJTIwaG9zdCUzRCUyMmFwcC5kaWFncmFtcy5uZXQlMjIlMjBtb2RpZmllZCUzRCUyMjIwMjMtMDMtMThUMDQlM0E1NCUzQTIwLjAzMlolMjIlMjBhZ2VudCUzRCUyMjUuMCUyMChXaW5kb3dzKSUyMiUyMHZlcnNpb24lM0QlMjIyMS4wLjclMjIlMjBldGFnJTNEJTIySE00d1d4ZVAyV2lqV1N0TmM2VDQlMjIlMjB0eXBlJTNEJTIyZGV2aWNlJTIyJTNFJTNDZGlhZ3JhbSUyMG5hbWUlM0QlMjJQJUMzJUExZ2luYS0xJTIyJTIwaWQlM0QlMjJua3ZCRlVYOTlSSEkxdFJBX050cSUyMiUzRTVacExjOW93RU1jJTJGRGNka3NJVU5QaVlrYmklMkJkZHByT3REa3FXR0JQQkhKbEVhQ2Z2bXNzWWV1UmhwZkhKT1ZBck5WYWolMkYzJTJGdEpZY2VtZzhYMyUyRmlPRSUyQiUyRnNJVFFudDlQMWoxMDElMkZOOXolMkZNRzhLZTBiQ3BMRUVuRGpHZUpkS29ORDlrZklvMTlhVjFtQ1NrMFI4RVlGVm11R3lkc3NTQVRvZGt3NTJ5bHUwMFoxWHZOOFl4WWhvY0pwcmIxWjVhSXRMS08lMkZHRnQlMkYweXlXYXA2OXNLb3FwbGo1U3huVXFRNFlhdUdDZDMzMEpnekpxcXIlMkJYcE1hQms4RlpmcXZ2aVYydDNBT0ZtSWZXN3dxeHRlTUYzS3VjbHhpWTJhN0l5elpTN2RDQmRrN1FveGZsTHVmWHNJM201aVFBUmhjeUw0Qmx6V3VxZ2J2YmlxQTRzQ2FVc2JRUjBvUnl6Rm5PMWFydWNMRjNMSzd1a2p4JTJGUkRDajNjVGhtTXZobUg4UGVTcVlxcllvdmtEVGg0VVE3enVLM3I0V3BXJTJGaDNEYUhwajFMc1pzcEwwOGt1MW5Ua2J0cHVZTWc2ZWxMRmMzUW56eVZTdHNqMXgwd0plMWZDVjJWQVVCRjBrcEF4Qkg2cFhhU2JJUTQ0blplMEtGaXpZVWpHSGtOMTVjRmtJenA1M21DT3dnT1FDWnd2Q1pRT3ZzdEZrd1A4bkEwT2RnYUhOZ0Q5d01YQUdCQWJ0SWZDZEZBS0RBNkZrRG9Fb0VWamc3WnFoRW8zdE4ySTlGSDhrTlQxelNRZTJubDdvMERNOGc1NUJlM3IlMkI0TkJrVnpwTk0wb2ZaR3NwRnBOVTJzYU1Ncjd0QVlWaEhJZGhPNW9pWFZMZkphbmYwaElOMjVNMHhyVG9UdFBLMGxBd2l2cndzWldONHdnJTJCcjFEUWd0cWR5ajFzVCUyQjZ2T2VGWVQ3MWxPcDdETjlNUzlRVXM4b0xSTWlJMkNuS1JXJTJGQ0U4Tm5DMHdZUU9nOElPWGh3UGFIUGtkRkhMUzclMkZiSzQyWjgxdDFrZDRDSnRMMkNsWlcwczRja2htUkl3c2twdnlLQWFsSjhvbXozcUk5SGpDbFBubVYxbTREbFR4c1ZsM3Q5WktHMWxLY0pGdUczRkhIWVlRWiUyQlVjR2pFbmlYWDBNeUlPWjAzTVowUTBUaEMyQ0kwZ3V3NHZ5c1lKeFNKNzBYdDBCVjcyOEkxbFclMkJJVkZKR2hWY0dXZkVLa1YlMkZQWVo5eUl6QjJhYnpSVVRkRnFhS3Y3YnBwN29hQjY2cHFGdCUyQlFuNjB3MG1vWFNvJTJCeSUyRnZLNGJMUXViZzVHcGhHa2dvMU0wNkpJaXYlMkI4JTJCZ1I4S2xkbk9hRCUyQm1RSG04YWJqbHBVTnhLblhlTzZPdXdWeE40RG1wRzlqVUJSZEZuWm1DanNYT00lMkZjY0IzUG43aWN5dWhscGI5YmdvbXJ3YUdMOTkwV3Mxd1d4WWFkUFc5OU53TUhFZWdheDFwYnJUTVMyanF6cjlla0ZJOXYlMkJvejJ3a1IxZVZKSTFTVHM2eVhiNmNIZTlzJTJGMnZ1UXR0N2thZHBrb0RGOVElMkZVNnBFSjZmS1U3aHp2VnMlMkJnYnRXanFlZHBacFJkQjNvV2cyUFRUYkdjOHY2Vjk4WlQ2ZXVkOHNuU05yR2ZyOU9UMXB5dXZhRE4lMkZMVGNibGthT2VTVG8lMkJuVjhhN0NtVHU3JTJGZkZ5bXpvN0FjRlk0RFdPSGI5QmdhMUIyM0RvRmolMkZQcUJ5cjM5bGdlNyUyRkFnJTNEJTNEJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRV09jRgAACAASURBVHhe7Z0L2FVVue/HZ6V1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">

Por exemplo, quero aumentar os preços da minha loja em 15% &mdash;e aqui, vamos usar também a função `round(x, quantidade_de_casas_decimais)`, que arredonda o valor de `x` estabelecendo determinada quantidade de casas decimais:

```py
precos_atuais = [8.77, 9.12, 10.09, 6.71] # lista de preços atuais
precos_novos = list() # lista vazia que conterá os preços novos
percentual_aumento = 0.15 # percentual de aumento

for i in precos_atuais: # para cada item (apelidado de i) na lista `precos_atuais`...
    novo_valor = round(i + (i * percentual_aumento), 2) # ...calculo o novo valor...
    precos_novos.append(novo_valor) # ...e adiciono o novo valor na lista `precos_novos`
    
print(precos_novos)
```
```textfile
[10.09, 10.49, 11.6, 7.72]
```

É possível ordenar ao sistema que realize qualquer operação, como passar uma lista de nomes, pedir as primeiras duas letras de cada nome e converter para letra minúscula com `lower()`...

```py
nomes = ["José", "Manuel", "Carlos"]

for x in nomes:
    primeiras_letras = x[0:2]
    print(primeiras_letras.lower())
```
```textfile
jo
ma
ca
```

...ou pedir ao usuário três números, salvá-los numa lista e pedir ao sistema que, para cada número, imprima se é par ou ímpar.

```py
lista_nums = list()

while len(lista_nums) < 3:
    num = int(input("Digite um número inteiro: "))
    lista_nums.append(num)

for x in lista_nums:
    if x % 2 == 0:
        print("É par")
    else:
        print("É ímpar")
```
```textfile
Digite um número inteiro: 786
Digite um número inteiro: 955
Digite um número inteiro: 1205
É par
É ímpar
É ímpar
```

{{< warning >}}
Nos exemplos acima, `x` aparece duas vezes: primeiro em...

```
for x in nomes:
```

...e depois, em...
```
for x in lista_nums:
```

Afinal, o que é esse `x`?

É, digamos, uma "variável temporária". É o nome que damos para o item da coleção que está sendo processado no momento &mdash;ou seja, as operações serão feitas em cima da "variável temporária". Quando o item termina de ser processado, a "variável temporária" é atribuída ao próximo item da coleção, e assim sucessivamente.

E não precisa ser `x`! Pode ser qualquer letra, nome etc. Vamos ver um exemplo:

```py
lista_exemplo = ["André", "Regina", "Fernanda", "Pedro"]
contador = 0
# eu uso `nome` como variável temporária para o item...
for nome in lista_exemplo: 
    contador += 1
    # ...e faço operação com essa variável temporária
    print("No {}º loop, a 'variável temporária' `nome` é {}".format(contador, nome))
```
```textfile
No 1º loop, a 'variável temporária' `nome` é André
No 2º loop, a 'variável temporária' `nome` é Regina
No 3º loop, a 'variável temporária' `nome` é Fernanda
No 4º loop, a 'variável temporária' `nome` é Pedro
```
{{< /warning >}}

Aqui, um exemplo uso de `for` loop no contexto de jornalismo de dados: numa série de reportagens na TV Globo sobre o retrato da mobilidade em São Paulo &mdash;projeto "Anda SP"&mdash;, tínhamos uma pesquisa com diversas informações sobre os entrevistados, todos ciclistas, como idade. Precisávamos agrupar essas pessoas em categorias de acordo com a faixa etária. A lógica era:

1. do arquivo `csv` a que tínhamos, eu precisava de ver linha a linha o campo `IDADE`;
   - ou seja, uso de `for` loop
2. e, dependendo do valor no campo, descrever o grupo ao qual pertencia
   - ou seja, uso de condicionais com `if`

Então a operação foi esta:

```py
# Segregação por faixa etária
fx_et = []
for row in bike_limpo['IDADE']:
    if row < 18:
        fx_et.append('Menor de 18 anos')
    elif row >= 18 and row < 25:
        fx_et.append('18 a 24 anos')
    elif row >= 25 and row < 31:
        fx_et.append('25 a 30 anos')
    elif row >= 31 and row < 41:
        fx_et.append('31 a 40 anos')
    elif row >= 41 and row < 51:
        fx_et.append('41 a 50 anos')
    elif row >= 51 and row < 61:
        fx_et.append('51 a 60 anos')
    else:
        fx_et.append('61 anos ou mais')
```

Aqui, o estudo na íntegra: [2019-06-28-od_bicicleta](https://github.com/rodolfo-viana/ddj_stuff/blob/main/ipynb/2019-06-28-od_bicicleta.ipynb).
{{< /expandable >}}
{{< expandable label="Iteração com `for` - parte 2" level="2" >}}
Anteriormente vimos como `for` loop funciona com listas, tuplas... Recapitulando:

```py
nums_gerais = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
nums_pares = list()

for i in nums_gerais: # para cada item de `nums_gerais...
    if i % 2 = 0: # ...o item dividido por 2 tiver como resto 0...
        nums_pares.append(i) # ...adicione o item na lista `nums_pares`

print(nums_pares)
```
```textfile
[2, 4, 6, 8, 10]
```

Outro exemplo:

```py
cidades = ["São Paulo", "Brasília", "Rio de Janeiro", "Curitiba", "Salvador"]
trecho = list()

for c in cidades:
    if c in ["São Paulo", "Rio de Janeiro"]:
        trecho.append("Eixo Rio-São Paulo")
    else:
        trecho.append("Fora do eixo Rio-São Paulo")

print(trecho)
```
```textfile
['Eixo Rio-São Paulo', 'Fora do eixo Rio-São Paulo', 'Eixo Rio-São Paulo', 
'Fora do eixo Rio-São Paulo', 'Fora do eixo Rio-São Paulo']
```

O `for` loop &mdash;que permite a iteração (repetição) de determinada operação para cada elemento de uma coleção&mdash; é algo simples de compreender, mas diferente quando trabalhamos com __dicionários__. Isso porque dicionários, como sabemos, é feito de __par chave-valor__. Veja que interessante:

```py
lista = ["Cachorro", "Gato", "Passarinho"]

for a in lista:
    print(a)
```
```textfile
Cachorro
Gato
Passarinho
```
```py
dicionario = {"animal_1": "Cachorro", "animal_2": "Gato", "animal_3": "Passarinho"}

for a in dicionario:
    print(a)
```
```textfile
animal_1
animal_2
animal_3
```

Quando fazemos `for` loop "convencional" em dicionário, ele retorna somente as chaves, e não os valores. Isso porque, na construção do `for` loop, eu pedi apenas um elemento, na linha:

```
for a in dicionario: 
# pedi apenas `a`
```

Como dicionário é feito de par chave-valor, eu preciso pedir dois elementos &mdash;um para a chave, outro para o valor. E também usar `.items()`, para indicar ao sistema para procurar dentro dos itens. Algo assim:

```
for a, b in dicionario.items(): 
# pedi `a` para chave, `b` para valor dentro dos itens
```

Vamos testar com o exemplo:

```py
dicionario = {"animal_1": "Cachorro", "animal_2": "Gato", "animal_3": "Passarinho"}

for a, b in dicionario.items(): # `a` para chave, `b` para valor
    print("A chave {} tem o valor {}".format(a, b))
```
```textfile
A chave animal_1 tem o valor Cachorro
A chave animal_2 tem o valor Gato
A chave animal_3 tem o valor Passarinho
```

Trabalhar com chaves e valores abre inúmeras possibilidades de análise. Por exemplo:

```py
precos = {"banana": 1.49, "maçã": 1.79, "mamão": 2.15}
print('Preços originais:', precos)

# Quero aumentar os preços de todos os produtos em 10%
for k, v in precos.items():
    precos[k] = round(v * 1.1, 2) # 1.1 porque 10% é 1 + 0.1

print(precos)
print('Preços ajustados (10% de aumento):', precos)

# Quero reduzir em 5% o preço do mamão
for k, v in precos.items():
    if k == "mamão":
        precos[k] = round(v * 0.95, 2)

print('Preços ajustados (10% de aumento; -5% se for mamão:', precos)
```
```textfile
Preços originais: {'banana': 1.49, 'maçã': 1.79, 'mamão': 2.15}
Preços ajustados (10% de aumento): {'banana': 1.64, 'maçã': 1.97, 'mamão': 2.37}
Preços ajustados (10% de aumento; -5% se for mamão): {'banana': 1.64, 'maçã': 1.97, 'mamão': 2.25}
```
{{< /expandable >}}
{{< expandable label="Funções" level="2" >}}
Seja com `for` loop ou `if`-`else`; seja com coleções ou não, estamos sempre fazendo uma ou mais operações em Python. Por exemplo:

```py
salario = 2500 # operação 1
despesa = 1875 # operação 2

if salario > despesa: # operação 3
    calculo = salario - despesa # operação 4
    print("Sobram-me {} reais.".format(calculo)) # operação 5
elif salario < despesa: # operação 6
    calculo = despesa - salario # operação 7
    print("Faltam-me {} reais.".format(calculo)) # operação 8
else: # operação 9
    print("Salário e despesas têm o mesmo valor. Não me sobra nada.") # operação 10
```

Chamamos essas operações encadeadas de rotinas. Muitas vezes, queremos repetir uma rotina:

```py
lista_1 = [2.35, 6.78, 12.07]
lista_2 = [1.15, 9.78, 10.12]

for n in lista_1:
    calculo = 2 * n
    print(calculo)

for n in lista_2:
    calculo = 2 * n
    print(calculo)
```

No exemplo acima, repare que tenho duas listas distintas (`lista_1` e `lista_2`), e para cada faço a mesma rotina:

1. faço `for` loop,
2. faço o cálculo de multiplicação por 2
3. imprimo o valor do cálculo

__Simplesmente repito o código__, linha a linha!

Para evitar repetições, podemos contar com __funções__. Funções são rotinas que têm um nome e ficam temporariamente salvas na sua máquina. São sequências de operações determinadas pelo programador que podem ser usadas sempre que necessárias.

Python tem várias funções prontas, muitas das quais já vimos nas aulas: `bool()`, `dict()`, `float()`, `format()`, `input()`, `int()`, `len()`, `print()`, `round()`, `set()`, `str()`, `tuple()`, `type()`... E há ainda outras tantas, que podem ser vistas [neste link](https://docs.python.org/pt-br/3.11/library/functions.html). Mas além das funções prontas, podemos criar as nossas próprias! A sintaxe para definir uma função é assim:

```
def nomedafuncao():
    operacao
```

E a sintaxe para chamar (usar) uma função é assim:

```
nomedafuncao()
```

Por exemplo, uma função que:

1. pergunta o nome do usuário,
2. deixa todas as letras em caixa alta,
3. imprime "Bom dia", acompanhado do nome do usuário.

```py
def bomdia(): # defino o nome da minha função
    nome = input("Qual o seu nome? ") # operação 1: pedir o nome
    nome = nome.upper() # operação 2: deixar o nome em caixa alta
    print("Bom dia, {}".format(nome)) # operação 3: imprimir a frase

bomdia() # chamo a função...
```
```textfile
Qual o seu nome? Rodolfo
Bom dia, RODOLFO
```
```py
bomdia() # ...de novo...
```
```textfile
Qual o seu nome? André
Bom dia, ANDRÉ
```
```py
bomdia() # ...e de novo, sem precisar reescrever as operações definidas
```
```textfile
Qual o seu nome? Ana Maria
Bom dia, ANA MARIA
```

Com o exemplos das listas, poderíamos usar uma função. Assim:

```py
def multiplicar():
    calculo = 2 * n
    print(calculo)

lista_1 = [2.35, 6.78, 12.07]
lista_2 = [1.15, 9.78, 10.12]

for n in lista_1:
    multiplicar()

for n in lista_2:
    multiplicar()
```
```textfile
4.7
13.56
24.14
2.3
19.56
20.24
```

### Argumentos

No exemplo acima, criei uma função para multiplicar por 2. Mas e se eu quiser multiplicar por 3 ou por 6 ou por 127? E se o número multiplicador for dinâmico?

Para isso contamos com parâmetros e argumentos.

- __Parâmetro__ é o nome dado ao atributo que uma função pode receber

- __Argumento__ é o valor recebido pela função

A sintaxe para criar uma função com parâmetro é assim:

```
def nomedafuncao(parametro):
    bloco de código, rotina que usa o parâmetro
```

E a sintaxe para chamar a função é:

```
nomedafuncao(argumento)
```

Vamos refazer o exemplo de multiplicação, mas com parâmetros e argumentos:

```py
def multiplicar(n_mult): # `n_mult` é o parâmetro...
    calculo = n_mult * n # ...que é usado no bloco da rotina
    print(calculo)

lista_1 = [2.35, 6.78, 12.07]
lista_2 = [1.15, 9.78, 10.12]

for n in lista_1:
    multiplicar(6) # o argumento `6` entra no lugar do parâmetro `n_mult`

for n in lista_2:
    multiplicar(127) # o número 127 é o argumento
```
```textfile
14.100000000000001
40.68
72.42
146.04999999999998
1242.06
1285.24
```

Posso usar quantos parâmetros e argumentos eu quiser, do tipo que eu quiser.

```py
def multiplicar(lista, multiplicador): # tenho dois parâmetros...
    for i in lista:
        calculo = multiplicador * i
        print(calculo)

lista_1 = [3.89, 0.99, 17.15, 1.89]

multiplicar(lista_1, 7) # ...e uso dois argumentos
```
```textfile
27.23
6.93
120.04999999999998
13.229999999999999
```

Mas se eu passar um parâmetro e ele não tiver argumento, ou se eu usar um argumento sem parâmetro, encontro erro:

```py
def multiplicar(lista, multiplicador): # tenho dois parâmetros...
    for i in lista:
        calculo = multiplicador * i
        print(calculo)

lista_1 = [3.89, 0.99, 17.15, 1.89]

multiplicar(lista_1) # ...e uso apenas um argumento
```
```textfile
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
Cell In[10], line 1
----> 1 multiplicar(lista_1) # ...e uso apenas um argumento

TypeError: multiplicar() missing 1 required positional argument: 'multiplicador'
```

```py
multiplicar(lista_1, 7, 9) # ...e uso três argumentos
```
```textfile
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
Cell In[11], line 1
----> 1 multiplicar(lista_1, 7, 9) # ...e uso três argumentos

TypeError: multiplicar() takes 2 positional arguments but 3 were given
```

### `return` vs. `print`

Vimos até aqui que `print()` é a função que usamos para imprimir algo na tela. Contudo, nem sempre queremos imprimir algo, mas sim salvar o resultado da função na memória para uso posterior. Nesse caso usamos, dentro da função, `return`. Vamos ver um exemplo:

Preciso calcular o volume de um cilindro (fórmula: \\(V = \pi r^2 h\\), onde \\(r\\) é o raio; \\(h\\) é a altura). Com o volume, preciso calcular o preço, sendo R$ 1,50 para cada unidade de volume. (Repare: eu não quero imprimir o volume; quero usá-lo para operações futuras &mdash;no caso, calcular o valor total.)

```py
# crio uma função para determinar o volume de um cilindro
def volume(r, h):
    pi = 3.14159
    vol = pi * r**2 * h
    return vol # uso `return` no final, com o dado que quero obter

# crio outra função, para calcular o valor
def valor(volume):
    vlr_unit = 1.5
    vlr_final = volume * vlr_unit
    return vlr_final


# calculo o volume usando a função que criei
# o resultado ficará armazenado em `cilindro_1`
cilindro_1 = volume(16, 3)

# agora uso `cilindro_1` para calcular o valor
# o resultado ficará armazenado em `valor_1`
valor_1 = valor(cilindro_1)

# reuso a função
cilindro_2 = volume(13, 6)
valor_2 = valor(cilindro_2)

# até aqui, nada é impresso na tela, pois não usei `print()`,
# mas sim `return`, para devolver o resultado das operações
# em uma variável

# só aqui imprimo
print(valor_1)
print(valor_2)
```
```textfile
3619.1116799999995
4778.358389999999
```

Um exemplo de como funções são usadas no jornalismo de dados é este código escrito pela equipe do FiveThirtyEight para obter dados metereológicos do site Weather Underground. A reportagem em que tais dados foram usados é esta: ["What 12 Months Of Record-Setting Temperatures Looks Like Across The U.S."](https://fivethirtyeight.com/features/what-12-months-of-record-setting-temperatures-looks-like-across-the-u-s/). O código na íntegra está [aqui](https://github.com/fivethirtyeight/data/blob/76c471a9124d690ba92709ca21cbfcdde226b44e/us-weather-history/wunderground_scraper.py), mas abaixo segue uma versão editada e comentada para melhor compreensão:

```py
# importação de módulos para...
from datetime import datetime, timedelta # ...trabalhar com datas
from urllib.request import urlopen # ...abrir sites


def scrape_station(station): # parâmetro é `station`
    current_date = datetime(year=2014, month=7, day=1) # data atual
    end_date = datetime(year=2015, month=7, day=1) # data final
    lookup_URL = 'http://www.wunderground.com/history/airport/{}/{}/{}/{}/DailyHistory.html'

    while current_date != end_date: # enquanto a data atual é diferente da data final...
        formatted_lookup_URL = lookup_URL.format(
            station, current_date.year, current_date.month, current_date.day
        ) # ...formate `lookup_URL`
        html = urlopen(formatted_lookup_URL).read().decode('utf-8') # ...abra e leia o site
        current_date += timedelta(days=1) # ...adicione `1` dia na data atual

# para cada uma das estações na lista...
for station in ['KCLT', 'KCQT', 'KHOU', 'KIND', 'KJAX', 'KMDW', 'KNYC', 'KPHL', 'KPHX', 'KSEA']:
    # ...execute a função para cada estação
    scrape_station(station)
```
{{< /expandable >}}