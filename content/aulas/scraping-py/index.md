---
title: "[IDP] Web scraping com Python"
date: 2024-03-17
---

{{< warning >}}
As aulas aqui apresentadas intregam o módulo "Web scraping com Python" do MBA em Jornalismo de Dados, do IDP. Mais informações [aqui](https://www.idp.edu.br/techschool/mba-jornalismo-de-dados/).
{{< /warning >}}

<!-- ++ -->
{{< expandable label="Exemplo de raspagem em DDJ" level="2" >}}
Começamos aqui o módulo de _web scraping_ (ou, em português, raspagem de dados). Trata-se de uma técnica de extração de informações dispostas em websites ou aplicações. Isso pode ser feito manualmente, por meio de sistemas específicos (como webscraper.io), ou a partir da criação de um script (em Python, R, Java ou outras linguagens) para esta finalidade.

No jornalismo, _web scraping_ tem sido fundamental para a elaboração de reportagens baseadas em dados que estão disponíveis na internet. Como a notícia sobre uso de verba de gabinete da Câmara de São Paulo para envio de cartões de aniversário ([link](https://g1.globo.com/sp/sao-paulo/noticia/tres-vereadores-usam-um-terco-de-toda-a-verba-de-correio-da-camara-de-sp.ghtml)).

<img style="display: block; margin-left: auto; margin-right: auto; width:auto;max-height:100vh;border: 1px solid black;" src="repo_01.png">

A reportagem começou com a raspagem de dados de relatórios disponibilizados pela Câmara em https://www.saopaulo.sp.leg.br/relatorio-por-natureza-de-despesa-partir-de-2015/.

<img style="display: block; margin-left: auto; margin-right: auto; width:auto;max-height:100vh;border: 1px solid black;" src="repo_02.png">

<img style="display: block; margin-left: auto; margin-right: auto; width:auto;max-height:100vh;border: 1px solid black;" src="repo_03.png">

O script para raspar os dados é [este aqui](https://github.com/rodolfo-viana/ddj_stuff/blob/main/py/vereadores_sp_gastos_nfs.py). Com os dados baixados, foi feita uma análise com Pandas que constatou os gastos exorbitantes.

<img style="display: block; margin-left: auto; margin-right: auto; width:auto;max-height:100vh;border: 1px solid black;" src="repo_04.png">

A análise na íntegra está [aqui](https://github.com/rodolfo-viana/ddj_stuff/blob/main/ipynb/2018-02-24-vereadores_correios.ipynb).

{{< /expandable >}}

{{< expandable label="Como funciona um site" level="2" >}}
A primeira coisa que precisamos compreender é como funciona a internet:

<img style="display: block; margin-left: auto; margin-right: auto; width:auto;max-height:100vh;" src="repo_05.png">

De forma simples:

1. o usuário, via browser, faz uma solicitação ao servidor do site (request);
2. o servidor responde à solicitação (response) entregando ao browser arquivos `.html`, `.css`, `.js` etc.;
3. o browser renderiza esses arquivos e transforma no que conhecemos como website.

Este ponto inicial é importante porque, quando falamos em raspagem de dados, estamos falando de __capturar informações que estão dentro de tags de HTML, atributos de CSS__ etc.

Quando abrimos um site qualquer temos na tela diversos elementos: textos de diversos tamanhos, estilos e cores; imagens que podem ser fotos ou ilustrações; gráficos de toda sorte; ícones de redes sociais. 

<img style="display: block; margin-left: auto; margin-right: auto; width:auto;max-height:100vh; border: 1px solid black;" src="repo_06.png">

Os elementos gráficos que vemos são códigos renderizados. São linhas de código (HTML, CSS, JavaScript etc.) que o navegador (Google Chrome, Firefox, Safari etc.) interpreta para apresentar ao usuário.

Por exemplo, o site do UOL é, na verdade, assim:

```html
[...]
<article aria-labelledby="ltxnjpes" class="headlineMain
section__grid__main__highlight__item">
  <a href="https://www.uol.com.br/esporte/futebol/ultimas-noticias/2024/03/18/
  libertadores-veja-como-ficaram-os-grupos-e-como-foi-o-sorteio.htm" 
  class="hyperlink headlineMain__link">
    <div>
      <h3 id="ltxnjpes" class="title__element headlineMain__title">Palmeiras 
        cai no grupo da morte da Libertadores; veja chaves sorteadas</h3>
    </div>
    <p class="standfirst headlineMain__standfirst">Primeira rodada da fase de 
        grupos está prevista para os dias 2 e 4 de abril</p>
  </a>
  <aside class="relatedList headlineMain__related-list">
    <ul class="relatedList__container relatedList__container--vertical">
      <li class="relatedList__container__item">
        <a href="https://www.uol.com.br/esporte/futebol/ultimas-noticias/2024/
        03/18/premios-aumentam-e-campeao-da-libertadores-vai-faturar-quase-r-
        150-mihoes.htm" title="Prêmios aumentam, e campeão da Libertadores vai 
        faturar quase R$ 157 milhões" class="hyperlink relatedList__related">
          <p class="title__element">Prêmios aumentam, e campeão da Libertadores 
            vai faturar quase R$ 157 milhões</p>
        </a>
      </li>
      <li class="relatedList__container__item">
        <a href="https://www.uol.com.br/esporte/colunas/julio-gomes/2024/03/18/tem-que-se-esrorcar-para-ver-problemas-para-brasileiros-na-america-do-
        sul.htm" title="Julio Gomes: Tem de se esforçar para ver problemas para 
        brasileiros na América do Sul" class="hyperlink relatedList__related">
          <p class="title__element">Julio Gomes: Tem de se esforçar para ver 
            problemas para brasileiros na América do Sul</p>
        </a>
      </li>
    </ul>
  </aside>
</article>
[...]
```

Este é só um trecho do código HTML do site, que o browser traduz em elementos gráficos.

Repare que a chamada "Palmeiras cai no grupo da morte da Libertadores; veja chaves sorteadas" está dentro de uma tag (`<h3>`) e duas classes (`class="title__element headlineMain__title"`). Essa tag e essas classes dizem para o navegador como o texto em questão deve ser interpretado.

Ou seja, se criarmos um script em Python para capturar a informação contida em `<h3 class="title__element headlineMain__title">`, teremos como resposta "Palmeiras cai no grupo da morte da Libertadores; veja chaves sorteadas".

Note também que as duas chamadas seguintes ("Prêmios aumentam, e campeão da Libertadores vai faturar quase R$ 157 milhões" e "Julio Gomes: Tem de se esforçar para ver problemas para brasileiros na América do Sul") estão, ambas, dentro de `<p class="title__element">` &mdash;que, por sua vez, estão dentro de `<li class="relatedList__container__item">`. Significa que, se numa raspagem, eu pedir ao meu código para capturar as informações dentro de todas as ocorrências de `<p class="title__element">`, terei essas duas chamadas como resultado.

Isso é raspagem de dados: __dizer ao script para visitar determinado site e trazer todos os dados "envelopados" por tags e atributos específicos__.
{{< /expandable >}}

{{< expandable label="HTML e CSS" level="2" >}}
Se as informações que estamos buscando estão em tags de HTML e classes de CSS, precisamos compreender &mdash;ainda que superficialmente&mdash; como essas tags funcionam. __Não é necessário decorar HTML ou CSS, mas entender sua lógica.__

Uma tag de HTML vem dentro de `<` e `>`, e indica o que é o elemento: título, parágrafo, imagem, lista etc. Muitas requerem indicação de fim da tag, com uso de `/`. Por exemplo:

```html
<div>
    <h1>Lista de compras</h1>
    <p>Aqui estão os itens a serem comprados nesta semana:</p>
    <ul>
        <li>Arroz</li>
        <li>Feijão</li>
        <li>Óleo</li>
    </ul>
    <p>Em caso de dúvidas, acesse <a href="linkparaosite">este formulário</a></p>
</div>
```

No exemplo acima:

- `div` representa container para o conteúdo que segue
- `h1` significa heading 1, ou seja, cabeçalho, título. Traz o texto em letras grandes. Conforme o número aumenta (`h2`, `h3`, até `h6`), o tamanho da letra vai diminuindo
- `p` indica parágrafo
- `ul` representa que os elementos a seguir estão numa lista não ordenada ("ul" vem de _unordered list_)
- `li` indica item da lista
- `a` indica link

Então o exemplo acima é renderizado pelo browser assim:

<div style="border: 1px solid black; padding:10px;">
<div>
    <h1>Lista de compras</h1>
    <p>Aqui estão os itens a serem comprados nesta semana:</p>
    <ul>
        <li>Arroz</li>
        <li>Feijão</li>
        <li>Óleo</li>
    </ul>
    <p>Em caso de dúvidas, acesse <a href="linkparaosite">este formulário</a></p>
</div>
</div>

Portanto, tags de HTML indicam o que é o elemento: parágrafo, título, lista etc. Mas ele não é o único componente. Há ainda atributos de CSS.

CSS significa _cascading style sheet_, ou folha de estilo em cascata. Seus atributos, portanto, indicam o estilo de um elemento. Em suma: __tag de HTML mostra o que é o elemento, e atributo de CSS mostra como é o elemento__.

Um exemplo:

```html
<style>
    .verm{color:red;}
    .az{color:blue;}
</style>

<h1 class="verm">Título 1</h1>
<h1 class="az">Título 2</h1>
```

Repare que "Título 1" e "Título 2" são ambos `h1` &mdash;ou seja, são headings, títulos. Mas eles não são iguais: "Título 1" tem a classe `verm`, enquanto "Título 2" tem a classe `az`. Essas classes estão definidas na tag `style`: `verm` deixa o elemento vermelho; `az`, azul.

Com isso, apesar de ambos serem `h1`, são interpretados pelo browser assim:

<div style="border: 1px solid black; padding:10px;">
<style>
    .verm{color:red;}
    .az{color:blue;}
</style>

<h1 class="verm">Título 1</h1>
<h1 class="az">Título 2</h1>
</div>

É possível ainda usar mais de um atributo para o mesmo elemento. Vejamos outro exemplo a partir do mesmo código:

```html
<style>
    .verm{color:red;}
    .az{color:blue;}
    .mono{font-family:monospace;}
    .serif{font-family:serif;}
</style>

<h1 class="verm mono">Título 1</h1>
<h1 class="az serif">Título 2</h1>
```

Aqui, não apenas mudamos as cores de cada `h1`, como a família da fonte. Agora os elementos são interpretados assim:

<div style="border: 1px solid black; padding:10px;">
<style>
    .verm{color:red;}
    .az{color:blue;}
    .mono{font-family:monospace;}
    .serif{font-family:serif;}
</style>

<h1 class="verm mono">Título 1</h1>
<h1 class="az serif">Título 2</h1>
</div>
{{< /expandable >}}

{{< expandable label="Ferramentas" level="2" >}}
Conforme dito anteriormente, há diversas formas de se fazer web scraping, tanto com uso de linguagens como Python, R e JavaScript, como sem qualquer tipo de programação, com aplicações como webscraper.io. Neste curso, usaremos Python e algumas bibliotecas externas:

- [Requests](https://requests.readthedocs.io/en/latest/), para capturar o conteúdo de sites
- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/), para interpretar o conteúdo capturado por Requests

Vamos discorrer sobre essas bibliotecas nas próximas aulas. Por ora, é necessário instalá-las, apenas. No Prompt de Comando (Windows) ou Terminal (MacOS/Linux), digite:

```
python -m pip install requests beautifulsoup4
```

ou:

```
python3 -m pip install requests beautifulsoup4
```

As bibliotecas serão instaladas e poderão ser usadas nos scripts de web scraping.
{{< /expandable >}}
