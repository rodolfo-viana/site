---
title: "[MBA em Jornalismo de Dados, IDP] Introdução à linguagem Python"
date: 2024-02-01
---

{{< expandable label="Aula 1 - Variáveis, tipos de dados e operações" level="2" >}}

### Variáveis

Variável é um nome que faz referência a um valor e fica temporariamente salvo na memória do computador. Funciona como um apelido que damos a um determinado dado. Sempre que chamarmos o apelido &mdash;a variável&mdash;, o dado será evocado.

A atribuição é simples:

{{< code >}}
variavel = dado
{{< /code >}}

Vejamos um uso real:

{{< code >}}
vlr_dolar = 4.95
{{< /code >}}

O valor `4.95` está agora salvo na memória do meu computador. Para obter o valor, eu chamo `vlr_dolar`. Assim:

{{< code numbered=true >}}
[[[print(vlr_dolar)]]]
{{< /code >}}

1. A função `print()` é usada para imprimir em tela

{{< output >}}
4.95
{{< /output >}}

Uma variável serve, entre outros, para que não precisemos repetir a digitação ou operação sempre que precisamos do valor. Vamos pegar como exemplo o último verso de "A flor e a náusea", de Carlos Drummond de Andrade:

> É feia. Mas é uma flor. Furou o asfalto, o tédio, o nojo e o ódio.

Essa frase (um tanto extensa) não precisa mais ser digitada se for atribuída à uma variável:

{{< code >}}
frase = "É feia. Mas é uma flor. Furou o asfalto, o tédio, o nojo e o ódio."
print(frase)
{{< /code >}}
{{< output >}}
É feia. Mas é uma flor. Furou o asfalto, o tédio, o nojo e o ódio.
{{< /output >}}

{{< warning >}}
Mas lembre-se: a variável perde seu valor quando:

1. o script é finalizado; ou
2. o valor é alterado.
{{< /warning >}}

Sim, alterado. É possível mudar o valor de uma variável já existente &mdash;afinal, ela chama "variável". Para isso, basta atribuir novo valor:

{{< code numbered=true >}}
[[[print(vlr_dolar)]]]
[[[vlr_dolar = 4.91]]]
[[[print(vlr_dolar)]]]
{{< /code >}}

1. Até aqui, o valor de `vlr_dolar` é 4.95
2. Aqui altero o valor da variável para 4.91...
3. ...e a variável apresenta o novo valor

{{< output >}}
4.95
4.91
{{< /output >}}

Há algumas regras para criar variáveis:

- não pode começar com número ou símbolo, mas pode ter número e underscore (`_`) no meio ou no fim;

{{< code numbered=true >}}
[[[idade1]]] = 42
[[[1idade]]] = 42
{{< /code >}}

1. Correto, pois a variável termina com `1`, e números são permitidos tanto no meio quanto no fim
2. Incorreto, pois números não podem estar no início da variável

- não pode conter pontos e demais sinais gráficos, e acentos são desaconselháveis;

{{< code numbered=true >}}
[[[idade_1 = 42]]]
[[[idade.1 = 42]]]
{{< /code >}}

1. Correto, pois underscore é permitido
2. Incorreto, pois não se pode usar ponto na variável

- maiúsculas e minúsculas são diferentes;

{{< code >}}
nome = "Pedro"
Nome = "José"
print(Nome)
{{< /code >}}
{{< output >}}
José
{{< /output >}}

- não pode ser palavra-chave de Python.
| | | | | | | |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | 
| `and` | `as` | `assert` | `break` | `class` | `continue` | `def` |
| `del` | `elif` | `else` | `except` | `exec` | `finally` | `for` |
| `from` | `global` | `if` | `import` | `in` | `is` | `lambda` |
| `nonlocal` | `not` | `or` | `pass` | `raise` | `return` | `try` |
| `while` | `with` | `yield` | `True` | `False` | `None` | &nbsp; | 

{{< /expandable >}}