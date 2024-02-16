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