+++
title = "A alquimia de regex"
date = "2025-02-09"
description = "Um breve passeio pelo fantástico universo das expressões regulares"

[taxonomies]
tags=["regex", "expressões regulares"]
+++

Quando eu dava aula de análise de dados num cursinho em São Paulo &mdash; há uns oito anos &mdash;, toda turma ficava espantada quando eu falava brevemente sobre _regex_ ("expressões regulares", em português). Achavam algo mágico. Entretanto, dada a carga horária do curso, eu nunca pude me aprofundar nesse tema.

Lembrei disso há uns dias e pensei em escrever este texto. Aqui, falarei bastante sobre _regex_, mas nunca tudo &mdash; sempre há algo novo para aprender.

Expressão regular é uma sequência de caracteres que define um padrão de pesquisa. É usada para encontrar, substituir ou validar textos em `strings` de forma eficiente. Quando falamos em "sequência de caracteres que define um padrão", para ilustrar, pense em endereços de e-mail (e aqui uso o meu: `eu@rodolfoviana.com.br`): 

1. todos têm o que chamamos de parte local ou nome do usuário (no meu caso, `eu`),
2. todos têm uma arroba (`@`) separando a parte local e o domínio, e
3. todos têm o domínio (aqui, `rodolfoviana.com.br`).

Ou seja, endereços de e-mail seguem um **padrão**. O mesmo vale para telefones celulares (`DDD` + `nove dígitos numéricos`), valores monetários (`símbolo da moeda` + `valor inteiro` + `,` + `decimais`) etc.

As expressões regulares são extremamente poderosas para manipulação de textos e são amplamente utilizadas em linguagens de programação como Python, JavaScript, Java, e muitas outras. Aqui veremos com Python, mas antes de entrarmos no campo de programação, vale contar um pouco da história de _regex_.

# História

A ideia de expressões regulares surgiu na década de 1950 com o matemático norte-americano Stephen Cole Kleene que, ao lado de Alan Turing, Emil Post e outros, é conhecido como um dos fundadores da teoria da recursão. 

Em dezembro de 1951, Kleene apresentou a teoria de autômatos finitos[^1] &mdash; ou seja, uma idealização sobre como máquinas simples (chamadas autômatos finitos) podem reconhecer padrões em sequências de símbolos. Ele também criou uma forma matemática de descrever esses padrões, chamada de álgebra de conjuntos regulares. 

De maneira mais simples, a álgebra de conjuntos regulares define regras matemáticas que permitem combinar palavras e criar novos conjuntos de palavras, facilitando a identificação e manipulação de padrões.

{% note(clickable=true, hidden=true, header="Explicação matemática") %}

Se quiser se aprofundar na álgebra de conjuntos regulares, ela define operações sobre linguagens regulares (subconjuntos do conjunto $\Sigma^*$, que é o conjunto de todas as cadeias possíveis sobre um alfabeto $\Sigma$). As três operações básicas são:

1. União ($\cup$): se $L_1$ e $L_2$ são linguagens regulares, então sua união $L_1 \cup L_2$ também é regular.
    - Exemplo: Se $L_1 = \lbrace\text{"ab"}, \text{"cd"}\rbrace$ e $L_2 = \lbrace\text{"ef"}, \text{"gh"}\rbrace$, então $L_1 \cup L_2 = \lbrace\text{"ab"},\text{"cd"},\text{"ef"},\text{"gh"}\rbrace$.
2. Concatenação ($\cdot$): se $L_1$ e $L_2$ são regulares, então sua concatenação $L_1L_2$ também é.
    - Exemplo: Se $L_1 = \lbrace\text{"ab"}, \text{"cd"}\rbrace$ e $L_2 = \lbrace\text{"ef"}, \text{"gh"}\rbrace$, então $L_1L_2 = \lbrace\text{"abef"},\text{"abgh"},\text{"cdef"},\text{"cdgh"}\rbrace$.
3. Fechamento de Kleene ($^{\*}$): se $L$ é uma linguagem regular, então $L^*$ (todas as repetições de palavras de $L$, incluindo a cadeia vazia $\epsilon$) também é.
    - Exemplo: Se $L = \lbrace\text{"a"}, \text{"b"}\rbrace$, então $L^* = \lbrace\epsilon, \text{"a"},\text{"b"},\text{"aa"},\text{"ab"},\text{"ba"},\text{"bb"},\text{"aaaa"},\text{...}\rbrace$.

Uma versão mais aprofundada do teorema consta no [capítulo _Kleene's Theorem_](https://books.google.com.br/books?id=MDQ_K7-z2AMC&pg=PA97#v=onepage&q&f=false) da obra "Finite Automata", de Mark V. Lawson.

{% end %}

Esse conceito matemático serviu de base para os primeiros algoritmos de busca computacional. Em 1968, Ken Thompson implementou expressões regulares no editor QED, que influenciou o Unix[^2]. Poucos anos depois, em 1973, ele incorporou _regex_ ao editor `ed` e ao comando `grep`, permitindo buscas avançadas em arquivos de texto. Já em 1986, Larry Wall criou a linguagem Perl, em que expressões regulares são uma ferramenta essencial. Desde então, _regex_ se popularizou e hoje é ubíquo na ciência da computação.

# Conceituação

Como foi dito acima, uma expressão regular especifica um conjunto de caracteres. Essa especificação adota o nome de *padrão*. Tomemos o nome "José". Num determinado banco de dados, por exemplo, ele pode ser grafado como `José`, `Jose`, `JOSÉ`, `JOSE`, `josé`, `jose`. São seis formas diferentes que indicam o mesmo elemento e, portanto, deveriam ser padronizados.

Mas como podemos achar tais variações do mesmo elemento no nosso banco de dados? O primeiro passo é reconhecer um padrão: todas as variáveis contêm as mesmas quatro letras. Se quisermos encontrar as seis variantes, escrevemos a seguinte expressão regular:

```regex
(?i)jos[eé]
```


[^1]: Kleene, S.C. 1951. Representation of events in nerve nets and finite automata. Memorando de Pesquisa 704, Projeto Rand, Força Aérea dos Estados Unidos da América. Disponível em: [https://www.rand.org/content/dam/rand/pubs/research_memoranda/2008/RM704.pdf](https://www.rand.org/content/dam/rand/pubs/research_memoranda/2008/RM704.pdf) Acesso em: 9 fevereiro 2025.
[^2]: Thompson, K. 1968. Regular expression search algorithm. Communications of the ACM vol. 11, ed. 6: 419-422. Disponível em: [https://dl.acm.org/doi/pdf/10.1145/363347.363387](https://dl.acm.org/doi/pdf/10.1145/363347.363387) Acesso em: 9 fevereiro 2025.
