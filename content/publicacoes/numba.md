---
title: "Potencializando Python para computação científica com Numba"
date: 2023-09-04
tags: []
---

Por sua facilidade de uso e um rico ecossistema, Python se tornou uma linguagem de referência para computação científica. Dada sua versatilidade, contudo, ela pode ser lenta para algumas tarefas, sobretudo numéricas. Um exemplo é o processamento de iterações que contenham cálculos exaustivos. NumPy pode ser de grande auxílio, mas ainda assim a performance pode ser maior.  

É neste contexto que Numba se torna essencial. Trata-se de um compilador just-in-time &mdash; isto é, a compilação ocorre em tempo de execução &mdash; que traduz um subconjunto de funções Python e NumPy para código de máquina otimizado usando LLVM.

Vamos compreender como utilizar Numba para potencializar um código Python. Primeiro, a instalação:

```shell
pip install numba
```

Com a biblioteca instalada, vamos criar uma função que gera um [conjunto de Mandelbrot](https://pt.wikipedia.org/wiki/Conjunto_de_Mandelbrot) com apenas NumPy. 

```py
import timeit
import numpy as np

def mandelbrot(xmin, xmax, ymin, ymax, width, height, max_iter):
    r1 = np.linspace(xmin, xmax, width)
    r2 = np.linspace(ymin, ymax, height)
    n3 = np.empty((width, height))
    for i in range(width):
        for j in range(height):
            x, y, n = 0, 0, 0
            while x*x + y*y < 4 and n < max_iter:
                x, y = x*x - y*y + r1[i], 2*x*y + r2[j]
                n += 1
            n3[i, j] = n
    return n3

width, height = 400, 400
xmin, xmax, ymin, ymax = -2, 1, -1, 1
max_iter = 1000

print(timeit.timeit(lambda: mandelbrot(
    xmin, xmax, ymin, ymax, width, height, max_iter), number=10))
```

Dado o valor de `max_iter`, o código realizará a computação numérica 1 mil vezes, e o método `timeit` correrá com 10 execuções. Isso exigirá muito de processamento.

No meu computador (Intel Core i7, 16 GB RAM, Windows 11), este foi o tempo de execução:

```shell
256.83382020000136
```

Ou seja, o código ficou rodando por mais de 4 minutos para concluir os cálculos.

Este mesmo código, com os mesmos argumentos, será usado com Numba. E seu uso é simples: com o decorator `@jit(nopython=True)`:

```py
import timeit
import numpy as np
from numba import jit

@jit(nopython=True)
def mandelbrot(xmin, xmax, ymin, ymax, width, height, max_iter):
    r1 = np.linspace(xmin, xmax, width)
    r2 = np.linspace(ymin, ymax, height)
    n3 = np.empty((width, height))
    for i in range(width):
        for j in range(height):
            x, y, n = 0, 0, 0
            while x*x + y*y < 4 and n < max_iter:
                x, y = x*x - y*y + r1[i], 2*x*y + r2[j]
                n += 1
            n3[i, j] = n
    return n3

width, height = 400, 400
xmin, xmax, ymin, ymax = -2, 1, -1, 1
max_iter = 1000

print(timeit.timeit(lambda: mandelbrot(
    xmin, xmax, ymin, ymax, width, height, max_iter), number=10))
```

Reparem que, com exceção do decorator, nada mudou no código. E o resultado:

```shell
1.8241732999886153
```

Ou seja, Numba tornou a computação quase 139 vezes mais rápida.

{{< warning >}}
Numba é recomendado apenas quando há computações pesadas especialmente com NumPy. Em computações simples, ele pode **piorar a performance**. Segundo o site oficial, o funcionamento de Numba "depende de como é o código, se é orientado a cálculos numéricos, usa muito NumPy e/ou tem muitos loops". Pandas, por exemplo, não é compreendido por Numba. Ver mais [aqui](https://numba.readthedocs.io/en/stable/user/5minguide.html#will-numba-work-for-my-code).
{{< /warning >}}

### Saiba mais

- [leitura] Site Oficial: https://numba.pydata.org/

- [leitura] Documentação de Numba: https://numba.readthedocs.io/en/stable/index.html

- [vídeo] Make Python code 1000x Faster with Numba: https://www.youtube.com/watch?v=x58W9A2lnQc