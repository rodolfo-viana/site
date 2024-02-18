---
title: "[MBA em Jornalismo de Dados, IDP] Introdução à linguagem Python"
date: 2024-02-01
---

{{< expandable label="Aula 1 - Variáveis" level="2" >}}
Variável é um nome que faz referência a um valor e fica temporariamente salvo na memória do computador. Funciona como um apelido que damos a um determinado dado. Sempre que chamarmos o apelido &mdash;a variável&mdash;, o dado será evocado.

A atribuição é simples: `variavel = dado`

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
{{< expandable label="Aula 1 - Tipos de dados" level="2" >}}
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
{{< expandable label="Aula 1 - Operações" level="2" >}}
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

| operador | significado | entrada | output |
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

| operador | significado | input de exemplo | output |
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
{{< expandable label="Aula 2 - Controle de fluxo com `if`" level="2" >}}
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

<img style="display: block; margin-left: auto; margin-right: auto;" src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUMAAAGZCAYAAAATllNOAAAGD3RFWHRteGZpbGUAJTNDbXhmaWxlJTIwaG9zdCUzRCUyMmFwcC5kaWFncmFtcy5uZXQlMjIlMjBtb2RpZmllZCUzRCUyMjIwMjMtMDMtMDdUMTklM0EzMSUzQTQ2LjY1N1olMjIlMjBhZ2VudCUzRCUyMjUuMCUyMChXaW5kb3dzKSUyMiUyMHZlcnNpb24lM0QlMjIyMS4wLjIlMjIlMjBldGFnJTNEJTIyT1VBSjRiSUl5R2JJWVJORWVPMHglMjIlMjB0eXBlJTNEJTIyZGV2aWNlJTIyJTNFJTNDZGlhZ3JhbSUyMG5hbWUlM0QlMjJQJUMzJUExZ2luYS0xJTIyJTIwaWQlM0QlMjJlQXJqR0w5WFJEMkVtaTZwMHExcCUyMiUzRTdabEJrNXNnRk1jJTJGamNkMlZKVEU0MjUyMDE0NjdVdzYwJTJCNlJqU1F5UzRKRnNvbjk5TVVJS21qYVRCSTNwbTBPQmg3d2tQZiUyRkFZb09tS3gySHpoS2swOHN4dFR4M1hqbmdBZkg5ejBYaFBLdnNPU2xKUXlDMHJEa0pGYVZhc09NJTJGTVM2cGJKdVNJd3pvNkpnakFxU21zWTVXNiUyRnhYQmcyeERuYm10VVdqSnE5cG1pSlc0YlpITkcyOVJ1SlJWSmF4JTJGNm90biUyRkVaSm5vbmowWWxTVXJwQ3Vya1dRSml0bTJZUUtQRHBod3hrU1pXdTBtbUJiQjAzRXAyMDBQbEZZM3h2RmFITlBBTHh1OElycFJZM044U0dYVCUyQndXVEh1UU5pbHlOR3Y3WU1GM3dMdHRyY2ljcmVGRXFkYjJ2eTJWcVdmeFAyQW83RSUyQkRjalZnaGRYSFJ2a21uNDdZTHN0QXQ1QWlJdG1yYk03Y3RzbFo1Mjlyc0d4MzVuRzNXTVM2RzdzcmliVUlFbnFWb1hwUnVKYW5TbG9nVmxUbFBKalBCMlV1bEw2ajh2V0l1OE81Z3ZMMUtSWWslMkZsakVRUEpkVlZBTSUyRlVNSXI4c2NxdTYweDhxQ3lKUTJFZERPa3lGMVdubXR4WlVMcDI2MDE2RlByZFV4S3NmZFh3UDRta1NwRjNrS2xvRCUyQlZ2bkxwOGxxNkxBaWxNJTJCVXRRV0tlS051RVVjYjNQUUFJcDFNSXE5YU5FdGVGMEhVdm8yNmxYRzZwM1ZUWDcwbmRzRDkxcDRobTE1TzNKVmtVdWU1ZU1rdms2VFNTdndOQVhFQmVjRTE1WVglMkZ5Zms0eFI4TllZcHZLWll3V2cyJTJCcmZHZ3FROWpmVkFiJTJCRzJvOTZuRXFrNVYlMkJaS0tNcGJlOGw5clQ4VTBsR25kSVpFVUlyJTJCTzc0bzFBNXA0cG03JTJCWUlUSGpKNGZNOCUyQjlGNW4yb3MwJTJGTnNvZWRrY3RWTGtaWnNuZlNIV1Y1QzFOU2pPR2huaFk0dHQ1QUJPSkxMSXlIOWlORWFBUTU3SWl4dG5GTWtTQ3ZabzlkZ1ZjOWZHRmtUJTJGak8wbFElMkZMMW5TWld6RDUxZzFhcjZNV0g0QyUyQjdrTFdJN0tJTFFjN1RHb1JuMFVHZEV3eVBnVERIaEhSTU90ekQycCUyRm90MDdiVEk1TDhIcUJUQkFLakpGQmdhVThEYXhrOWt5dllUSFllVVZCN2xqV3BwVVNFN0V6bzlMMjZHdWdaek5ZRW5Vd2ZhMUFVRHA2NjFBcDJLblRjNmw3dnVmbng3NlIwYjV6MHlVWG84R1ZudnRwRDFla2MySEJpeWxSOU5nTDNDSFl1c2I2JTJCNFlUJTJGSUJuMGo2OThXc2hmZTI0TTJzbkJneUE1NGxUMW5kJTJCODZYJTJGMTN1QXZiM0ZXZlF3YkNYV3VGdTlSU0NZNThVZW1IdTY0VDQ0dHdaMUJYUXppc0xSciUyQjUlMkI1SzNIV2RaWiUyRkIzU1ZPU1FZamVlQkY3ME5USzNpaTZQYnpVdUJlNmxSRVp1c3Z6V1gxJTJCbnM5ZVB3RiUzQyUyRmRpYWdyYW0lM0UlM0MlMkZteGZpbGUlM0XBge47AAAgAElEQVR4Xu2dC5QV1Znvd2vGSDLK0OBolJUgSCaJS2m1G8YExgEj9ABhmbAUkAS5I3bz8CYZgxAgLJpBIBDvmOsV6G41Fx15hTE6KAwQI0no0RFQaZ/3BhoZpn3yEojjY5Se/VWffdinOHXqsXed2lX7X2vV6tOna3/17f+396+//Th1KhgOKAAFoAAUYBXQAApAASgABRhgiEYABaAAFCAFkBmiHUABKAAFAEO0ASgABaBApwLIDNESoAAUgAKAIdoAFIACUACZ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">

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

<img style="display: block; margin-left: auto; margin-right: auto;" src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVYAAAHpCAYAAADZMxQjAAAHk3RFWHRteGZpbGUAJTNDbXhmaWxlJTIwaG9zdCUzRCUyMmFwcC5kaWFncmFtcy5uZXQlMjIlMjBtb2RpZmllZCUzRCUyMjIwMjMtMDMtMDdUMjIlM0EyOCUzQTAzLjQ0NlolMjIlMjBhZ2VudCUzRCUyMjUuMCUyMChXaW5kb3dzKSUyMiUyMHZlcnNpb24lM0QlMjIyMS4wLjIlMjIlMjBldGFnJTNEJTIyNEFsZEl6SkU1MXotbFdRWFFlNmYlMjIlMjB0eXBlJTNEJTIyZGV2aWNlJTIyJTNFJTNDZGlhZ3JhbSUyMG5hbWUlM0QlMjJQJUMzJUExZ2luYS0xJTIyJTIwaWQlM0QlMjJSYlhRSWRyNHZXMFlOamJvREtCWSUyMiUzRTdWckJrcHM0RVAwYUh6ZUZrQUZ6bkdIR3U1Zk5idFdrS3NsUkE3SlJCU01pNDlqZXIwOWpKQU9TbkRnMkRKN3MlMkJHQ2pwdFZTOTN2cUZqSVRISzEyZndwU3BIJTJGemhHWVQxMGwyRSUyRnd3Y1YwVSUyQkE3OFZKSjlMUW5kYVMxWUNwWklwVWJ3eFA2alVpajdMVGNzb2V1T1lzbDVWcktpSzR4NW50TzQ3TWlJRUh6YlZWdndyRHRxUVpiVUVEekZKRE9sSDFsU3ByVjA1Z2FOJTJGQyUyRktscWthR2ZsaGZXZEZsTEwwWkoyU2hHOWJJdnc0d1pIZ3ZLeXZWcnVJWmxYd1ZGenFmdk1UZDQ4VEV6UXZ6JTJCbmcxaDIlMkJrV3dqZlpQekt2ZksyYVhnbTBLcVVWSFNuUzNFNUZtcE8lMkJZVTBORXhZQVRsSzFxS1BhaElROU9wN0xMdmdyeHRJb3VWU3RxSzZqU1FRaUxSWEI1Tk53N0RoZlRaN2olMkYlMkJ1ZiUyRmdmcDdRU3QlMkJaNFB0dHlrcjZWSkM0dXJzRmVvTXNMVmRnJTJGd0hCNWJvVSUyRkF1TmVNWUZTQks2SUpzTTVudSUyRllGbW1wQk1YUjlHak40Y3AzcCUyQk1henQlMkI3ZyUyRmpoMmJkJTJCTG1PR1VEa1d3S0klMkJnamcxQkpBdjNhWnclMkZ6YmtmUyUyRmJyaTY4Y2Y2c0tqdlFBR0Z4ZTRRQ1hVZnJwYlZid1N6bVVSNGNoZndLbGRVWDhvMnN4bzJUYkNGNmdGJTJCTUNWVnNtZWhTMENybnJZU1g4OEZsU0J3UDJocllBZG5ZajN0QVdwdlNLanpoTlZZSDc0eCUyRjQwd1F0NExndVFQQjlJSEFTYkhncVZLb0UlMkZTV2tyS09EV1RxdSUyRlA1NzUlMkZKWVFxaVdJTFp1NUFtQVhEWVRZbjJYbzgwTHJWRUNBS1F3YyUyQkpuVHplUWlmRXpEM3NDS1BOWEVNZUdmRHdmdFBRUVhSOHFhRGJtS1JybmxXQmNCRVdpNVNneHMlMkJmQTdjNkdINVlzc21jakI4d3dHWEwxdXByVSUyRkdlZkdhaXlMU2xpQU9YeEFpUlljZjdmTnBudHhWejRiUWVzNTQlMkZLVWJrMjRBd1dleCUyRjFRMTNubXElMkJibDk3MkhYYWUxbEt5SHI5R0RFSG1hWXdweFZUancwNjRBbXhyT29Gbko0JTJCQ1ZpU1ZXNDdDaTBvdXhaZ3F4a2dtYWtaTiUyQjZJOW9pTDBmNGw3TUR4UlhJdmdiV21tOUVUS1ZXJTJCemxVNjJqc21Wek5VTzJpWWVnQSUyRk5ITjg3aUFib01MUDRPZjdsalpNZ3V0ejNMODZyb3hXalgydjB5WkdwZ1daYm9zOGtabFVhQ1I0VUpTNlhabTUzRUtrQ2Y3bGxwUktheXZaZDBaSnkwM3hib1c1eG9HOXNrNnoyU2RmMU9zMDFQUXBiUXprdUl2ODg0JTJCanE4TkUzU08lMkJ1Q2lObmd4WTg4NEc3c2x4cUl4R0J1TXlkaFFJNENlMzg0bHJNWlhZOGZWRTE4SEo2enRMUEtHQ1R0OFlmZE53czdlVW16dnBkMTJNSG9GNzRiZ3o2VmN2b3gzZ2NrN05Dcng5QXgzYWFhY2Fpa01lMlB5em5iVzIwdSUyQjZ6Q2tJY3pONTd1WnlidndkNkNkWmdlZiUyQlhCODVZWnlpbnF1ejdaejdpdjRPc2hoeW1pbDBRdmZlZDN3NDB1TG80NmolMkZqOXZqMmNwTDMyMjdmNlB6N1pQJTJGSmZ4b21mZHlIYlkzVWZOUWElMkIxNXFBYkx6cjQwaU5aaExRME1sRFZHYnJzcUdsZms2Tm1SbzV5RmlUdTlva2dyb3hDV25MZTA2Mlp6bm9ZODgz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">

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

{{< /expandable >}}