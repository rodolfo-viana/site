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

<!-- +++ -->
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

{{< expandable label="Requests" level="2" >}}
Agora que vimos o que web scraping no contexto do jornalismo e entendemos a estrutura de um site como uma coleção de tags de HTML e atributos de CSS, podemos partir para a prática.

E a prática começa com __Requests__, uma biblioteca externa bastante popular para lidar com o trânsito de _request_ e _response_.

<img style="display: block; margin-left: auto; margin-right: auto; width:auto;max-height:100vh;" src="repo_05.png">

É Requests que vai até o servidor onde o site está hospedado, pega o conteúdo e traz para o Python. E ele faz isso de maneira bastante intuitiva. A primeira coisa que precisamos é importar a biblioteca.

```python
import requests
```

### Funções comuns

Com a biblioteca importada no script, podemos começar o trânsito de dados. Por exemplo, vamos supor que queremos importar o conteúdo do site do fictício Ministério dos Riachos Brasileiros, e cujo link é https://rodolfoviana.com.br/aulas/scraping-py/site_exemplo/.

```python
# Vamos salvar a url na variável `site`
site = 'https://rodolfoviana.com.br/aulas/scraping-py/site_exemplo/'

# A função `requests.get(url)` traz os dados para nosso script,
# mais especificamente para a variável `dados`
dados = requests.get(site)
```

As poucas linhas de código acima bastam para meu script ir até o site e baixar todo o conteúdo. Agora eu tenho o site todo salvo em `dados`. Com outras funções de Requests podemos ver o que temos na variável.

```python
# `status_code` mostra o status HTTP.
# 200 significa que a página existe e a conexão foi bem-sucedida.
# 401, que você não é autorizado a acessá-lo.
# 404, que não existe.
# Veja todos os códigos em https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
print(dados.status_code)
```
```textfile
200
```

```python
# `headers` mostra os metadados que integram o 
# cabeçalho do site, como a última vez que o site 
# foi modificado, o nome do servidor etc.
print(dados.headers)
```
```textfile
{'Connection': 'keep-alive', 'Content-Length': '2051', 'Server': 'GitHub.com', 'Content-Type': 'text/html; charset=utf-8', 'Last-Modified': 'Tue, 19 Mar 2024 01:41:35 GMT', 'Access-Control-Allow-Origin': '*', 'Strict-Transport-Security': 'max-age=31556952', 'ETag': 'W/"65f8ed4f-223e"', 'expires': 'Fri, 22 Mar 2024 12:16:21 GMT', 'Cache-Control': 'max-age=600', 'Content-Encoding': 'gzip', 'x-proxy-cache': 'MISS', 'X-GitHub-Request-Id': '5C20:11DBDD:69BD4:79635:65FD743D', 'Accept-Ranges': 'bytes', 'Date': 'Fri, 22 Mar 2024 12:10:39 GMT', 'Via': '1.1 varnish', 'Age': '126', 'X-Served-By': 'cache-gru-sbgr1930050-GRU', 'X-Cache': 'HIT', 'X-Cache-Hits': '1', 'X-Timer': 'S1711109439.344515,VS0,VE1', 'Vary': 'Accept-Encoding', 'X-Fastly-Request-ID': 'e8dc5db9be4003348926e6fa23afba8b384efaae'}
```

```python
# `content` e `text` trazem o conteúdo do site,
# sendo `content` para ver o conteúdo em bytes
# e `text` para ver o conteúdo em unicode 
# (como normalmente lemos)
print(dados.content)
```
```textfile
b'<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Minist\xc3\xa9rio dos Riachos Brasileiros</title>\n    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"\n        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">\n\n</head>\n\n<body>\n    <style>\n        #carouselExampleCaptions .carousel-item img {  \n          object-fit: cover;\n          object-position: center;\n          overflow: hidden;\n          height:50vh;\n          filter: brightness(40%)\n        }\n        </style>\n    <nav class="navbar bg-body-tertiary" data-bs-theme="dark">\n        <div class="container">\n        <div class="container-fluid">\n            <a class="navbar-brand" href="#">\n                <img src="https://riverradio.com/wp-content/uploads/2019/01/cropped-River-Favicon-2019.png" alt="Logo" width="30" height="30"\n                    class="d-inline-block me-2">\n                Minist\xc3\xa9rio dos Riachos Brasileiros\n            </a>\n        </div>\n    </div>\n    </nav>\n    <div id="carouselExampleCaptions" class="carousel slide">\n        <div class="carousel-indicators">\n          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>\n          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>\n          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>\n        </div>\n        <div class="carousel-inner">\n          <div class="carousel-item active">\n            <img src="https://live.staticflickr.com/7870/33282841998_4fef53e5be_b.jpg" class="d-block w-100" alt="...">\n            <div class="carousel-caption d-none d-md-block">\n              <h5>Comit\xc3\xaa participa de audi\xc3\xaancia na C\xc3\xa2mara</h5>\n            </div>\n          </div>\n          <div class="carousel-item">\n            <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/Reuni%C3%B5es_Administrativas_%2852722653872%29.jpg" class="d-block w-100" alt="...">\n            <div class="carousel-caption d-none d-md-block">\n              <h5>Ministra se re\xc3\xbane com representantes da sociedade civil</h5>\n            </div>\n          </div>\n          <div class="carousel-item">\n            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Foz_do_Riacho_Tabatinga%2C_Alagoas%2C_visto_do_mar.jpg/2560px-Foz_do_Riacho_Tabatinga%2C_Alagoas%2C_visto_do_mar.jpg" class="d-block w-100" alt="...">\n            <div class="carousel-caption d-none d-md-block">\n              <h5>Projeto estipula multa e guilhotina para quem polui riachos</h5>\n            </div>\n          </div>\n        </div>\n        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">\n          <span class="carousel-control-prev-icon" aria-hidden="true"></span>\n          <span class="visually-hidden">Previous</span>\n        </button>\n        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">\n          <span class="carousel-control-next-icon" aria-hidden="true"></span>\n          <span class="visually-hidden">Next</span>\n        </button>\n      </div>\n      <h2 class="my-5 text-center">Agenda da Ministra</h2>\n\n    <div class="container">\n        <div class="card mb-3 text-bg-secondary">\n            <div class="card-body">\n                <h5 class="card-title">Entrevista para a CBN</h5>\n                <p class="card-text">Imprensa</p>\n            </div>\n            <ul class="list-group list-group-flush">\n                <li class="list-group-item">Gabinete da ministra</li>\n                <li class="list-group-item">12 de maio de 2024</li>\n                <li class="list-group-item">08:30</li>\n            </ul>\n        </div>\n        <div class="card mb-3 text-bg-secondary">\n            <div class="card-body">\n                <h5 class="card-title">Reuni\xc3\xa3o com secret\xc3\xa1rios</h5>\n                <p class="card-text">Expediente</p>\n            </div>\n            <ul class="list-group list-group-flush">\n                <li class="list-group-item">Gabinete da ministra</li>\n                <li class="list-group-item">12 de maio de 2024</li>\n                <li class="list-group-item">09:30</li>\n            </ul>\n        </div>\n        <div class="card mb-3 text-bg-secondary">\n            <div class="card-body">\n                <h5 class="card-title">Visita \xc3\xa0 comunidade do Riacho Branco</h5>\n               <p class="card-text">Evento p\xc3\xbablico</p>\n            </div>\n            <ul class="list-group list-group-flush">\n                <li class="list-group-item">Sede da ATRB</li>\n                <li class="list-group-item">12 de maio de 2024</li>\n                <li class="list-group-item">11:00</li>\n            </ul>\n        </div>\n        <div class="card mb-3 text-bg-secondary">\n            <div class="card-body">\n          <h5 class="card-title">Viagem a Bel\xc3\xa9m - PA</h5>\n                <p class="card-text">Expediente</p>\n            </div>\n            <ul class="list-group list-group-flush">\n                <li class="list-group-item">&nbsp;</li>\n                <li class="list-group-item">12 de maio de 2024</li>\n                <li class="list-group-item">13:00</li>\n            </ul>\n        </div>\n        <div class="card mb-3 text-bg-secondary">\n            <div class="card-body">\n                <h5 class="card-title">Reuni\xc3\xa3o com pescadores</h5>\n                <p class="card-text">Expediente</p>\n            </div>\n            <ul class="list-group list-group-flush">\n                <li class="list-group-item">Cooperativa de Pesca do Bel\xc3\xa9m do Par\xc3\xa1</li>\n                <li class="list-group-item">12 de maio de 2024</li>\n                <li class="list-group-item">15:00</li>\n            </ul>\n        </div>\n        <div class="card mb-3 text-bg-secondary">\n            <div class="card-body">\n                <h5 class="card-title">Retorno a Bras\xc3\xadlia</h5>\n                <p class="card-text">Expediente</p>\n            </div>\n            <ul class="list-group list-group-flush">\n                <li class="list-group-item">&nbsp;</li>\n                <li class="list-group-item">12 de maio de 2024</li>\n                <li class="list-group-item">17:00</li>\n            </ul>\n        </div>\n        <div class="card mb-3 text-bg-secondary">\n            <div class="card-body">\n                <h5 class="card-title">Entrevista \xc3\xa0 TV Senado</h5>\n                <p class="card-text">Imprensa</p>\n            </div>\n            <ul class="list-group list-group-flush">\n                <li class="list-group-item">Sede da TV Senado</li>\n                <li class="list-group-item">12 de maio de 2024</li>\n                <li class="list-group-item">18:30</li>\n            </ul>\n        </div>\n    </div>\n    <footer class="bd-footer py-2 py-md-2 mt-5 bg-body-tertiary" data-bs-theme="dark" style="color: white;">\n        <div class="container py-2 py-md-2 px-4 px-md-3">\n            <div class="row">\n                <div class="col-lg-6 mb-6">\n                    <a class="d-inline-flex align-items-center mb-2 link-dark text-decoration-none" href="/"\n                        aria-label="Bootstrap">\n                        <img src="https://riverradio.com/wp-content/uploads/2019/01/cropped-River-Favicon-2019.png"\n                            alt="MRB" width="20" height="20" class="d-inline-block align-text-center">\n                        <span class="mx-2 small" style="color: white;">Minist\xc3\xa9rio dos Riachos Brasileiros</span>\n                    </a>\n              </div>\n                <div class="col-lg-6 mb-6">\n                    <span class="small" style="color: white;">Mapa do site</span>\n                    <ul class="list-unstyled" >\n                        <li class="mb-2"><span class="small"><a href="#">In\xc3\xadcio</a></span></li>\n                        <li class="mb-2"><span class="small"><a href="#">Contato</a></span></li>\n                        <li class="mb-2"><span class="small"><a href="#">Dados abertos</a></span></li>\n                        <li class="mb-2"><span class="small"><a href="#">Resolu\xc3\xa7\xc3\xb5es</a></span></li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </footer>\n\n\n    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"\n        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"\n        crossorigin="anonymous"></script>\n</body>\n\n</html>'
```

```python
print(dados.text)
```
```textfile
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministério dos Riachos Brasileiros</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"      
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

</head>

<body>
    <style>
        #carouselExampleCaptions .carousel-item img {
          object-fit: cover;
          object-position: center;
          overflow: hidden;
          height:50vh;
          filter: brightness(40%)
        }
        </style>
    <nav class="navbar bg-body-tertiary" data-bs-theme="dark">
        <div class="container">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="https://riverradio.com/wp-content/uploads/2019/01/cropped-River-Favicon-2019.png" alt="Logo" width="30" height="30"
                    class="d-inline-block me-2">
                Ministério dos Riachos Brasileiros
            </a>
        </div>
    </div>
    </nav>
    <div id="carouselExampleCaptions" class="carousel slide">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://live.staticflickr.com/7870/33282841998_4fef53e5be_b.jpg" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>Comitê participa de audiência na Câmara</h5>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/Reuni%C3%B5es_Administrativas_%2852722653872%29.jpg" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>Ministra se reúne com representantes da sociedade civil</h5>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Foz_do_Riacho_Tabatinga%2C_Alagoas%2C_visto_do_mar.jpg/2560px-Foz_do_Riacho_Tabatinga%2C_Alagoas%2C_visto_do_mar.jpg" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>Projeto estipula multa e guilhotina para quem polui riachos</h5>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <h2 class="my-5 text-center">Agenda da Ministra</h2>

    <div class="container">
        <div class="card mb-3 text-bg-secondary">
            <div class="card-body">
                <h5 class="card-title">Entrevista para a CBN</h5>
                <p class="card-text">Imprensa</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Gabinete da ministra</li>
                <li class="list-group-item">12 de maio de 2024</li>
                <li class="list-group-item">08:30</li>
            </ul>
        </div>
        <div class="card mb-3 text-bg-secondary">
            <div class="card-body">
                <h5 class="card-title">Reunião com secretários</h5>
                <p class="card-text">Expediente</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Gabinete da ministra</li>
                <li class="list-group-item">12 de maio de 2024</li>
                <li class="list-group-item">09:30</li>
            </ul>
        </div>
        <div class="card mb-3 text-bg-secondary">
            <div class="card-body">
                <h5 class="card-title">Visita à comunidade do Riacho Branco</h5>
                <p class="card-text">Evento público</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Sede da ATRB</li>
                <li class="list-group-item">12 de maio de 2024</li>
                <li class="list-group-item">11:00</li>
            </ul>
        </div>
        <div class="card mb-3 text-bg-secondary">
            <div class="card-body">
                <h5 class="card-title">Viagem a Belém - PA</h5>
                <p class="card-text">Expediente</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">&nbsp;</li>
                <li class="list-group-item">12 de maio de 2024</li>
                <li class="list-group-item">13:00</li>
            </ul>
        </div>
        <div class="card mb-3 text-bg-secondary">
            <div class="card-body">
                <h5 class="card-title">Reunião com pescadores</h5>
                <p class="card-text">Expediente</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Cooperativa de Pesca do Belém do Pará</li>
                <li class="list-group-item">12 de maio de 2024</li>
                <li class="list-group-item">15:00</li>
            </ul>
        </div>
        <div class="card mb-3 text-bg-secondary">
            <div class="card-body">
                <h5 class="card-title">Retorno a Brasília</h5>
                <p class="card-text">Expediente</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">&nbsp;</li>
                <li class="list-group-item">12 de maio de 2024</li>
                <li class="list-group-item">17:00</li>
            </ul>
        </div>
        <div class="card mb-3 text-bg-secondary">
            <div class="card-body">
                <h5 class="card-title">Entrevista à TV Senado</h5>
                <p class="card-text">Imprensa</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Sede da TV Senado</li>
                <li class="list-group-item">12 de maio de 2024</li>
                <li class="list-group-item">18:30</li>
            </ul>
        </div>
    </div>
    <footer class="bd-footer py-2 py-md-2 mt-5 bg-body-tertiary" data-bs-theme="dark" style="color: white;">   
        <div class="container py-2 py-md-2 px-4 px-md-3">
            <div class="row">
                <div class="col-lg-6 mb-6">
                    <a class="d-inline-flex align-items-center mb-2 link-dark text-decoration-none" href="/"   
                        aria-label="Bootstrap">
                        <img src="https://riverradio.com/wp-content/uploads/2019/01/cropped-River-Favicon-2019.png"
                            alt="MRB" width="20" height="20" class="d-inline-block align-text-center">
                        <span class="mx-2 small" style="color: white;">Ministério dos Riachos Brasileiros</span>
                    </a>
                </div>
                <div class="col-lg-6 mb-6">
                    <span class="small" style="color: white;">Mapa do site</span>
                    <ul class="list-unstyled" >
                        <li class="mb-2"><span class="small"><a href="#">Início</a></span></li>
                        <li class="mb-2"><span class="small"><a href="#">Contato</a></span></li>
                        <li class="mb-2"><span class="small"><a href="#">Dados abertos</a></span></li>
                        <li class="mb-2"><span class="small"><a href="#">Resoluções</a></span></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>

</html>
```

Observe que `text` traz o código-fonte inteiro do site! É essa nossa matéria-prima numa raspagem de dados; portanto, vamos salvar numa variável para uso posterior.

```python
codigo = dados.text
```
{{< /expandable >}}

{{< expandable label="Beautiful Soup" level="2" >}}
Agora que temos o código-fonte salvo na variável `codigo`, o passo seguinte é interpretar esse código, é "quebrar" cada tag de HTML e atributo de CSS para, enfim, encontrar os dados que desejamos. É aí que entra __Beautiful Soup__. Seu papel é reconhecer os elementos do código.

Vamos importar essa biblioteca.

```python
from bs4 import BeautifulSoup as bs
# Repare no trecho `as bs`. Significa que dei 
# à biblioteca o apelido de `bs` para não ter 
# de ficar digitando `BeautifulSoup` sempre
# que eu precisar usá-la
```

### Funções comuns

Com Beautiful Soup importado, preciso antes de tudo passar o conteúdo de `codigo` para que a biblioteca interprete.

```python
# Ao chamar `BeautifulSoup()`, tenho dois argumentos:
# 1. o primeiro é o que eu quero interpretar (no caso,
# o que está contido na variável `codigo`)
# 2. o segundo é o método para fazer a interpretação
# (no caso, `html.parser`, o interpretador mais
# básico de Beautiful Soup. Há outros, mas por ora
# vamos nos manter com este.)
cod_parseado = bs(codigo, 'html.parser')
```

Agora que codigo está interpretado e salvo na variável `cod_parseado`, temos todas as tags de HTML e atributos de CSS reconhecidos. Veja alguns exemplos:

```python
# `title` traz o título da página
print(cod_parseado.title)
```
```textfile
<title>Ministério dos Riachos Brasileiros</title>
```

```python
# `nav` traz tudo o que estiver contido na tag `nav`
print(cod_parseado.nav)
```
```textfile
<nav class="navbar bg-body-tertiary" data-bs-theme="dark">
<div class="container">
<div class="container-fluid">
<a class="navbar-brand" href="#">
<img alt="Logo" class="d-inline-block me-2" height="30" src="https://riverradio.com/wp-content/uploads/2019/01/cropped-River-Favicon-2019.png" width="30"/>
                Ministério dos Riachos Brasileiros
            </a>
</div>
</div>
</nav>
```

```python
# `h2` traz a tag `h2`
print(cod_parseado.h2)
```
```textfile
<h2 class="my-5 text-center">Agenda da Ministra</h2>
```

Olhando o código-fonte, porém, notamos que as informações que buscamos estão dentro de `div.card` (ou seja, tag `div` com a classe `card`). E que há diversos `div.card`.

Há funções de Beautiful Soup que capturam as diversas menções a elementos.

```python
# Aqui, `find_all()` tem dois argumentos:
# 1. a tag de HTML,
# 2. a classe de CSS referente à tag de HTML
# que queremos.
# Com isso, não pegamos todos os `div`, mas
# somente aqueles com `card` como classe.
divs = cod_parseado.find_all('div', class_='card')

# O resultado de `find_all()` é uma lista
# com os elementos --neste caso, sete
# elementos; sete `div` com a classe `card`
print(len(divs))
print(divs)
```
```textfile
7
[<div class="card mb-3 text-bg-secondary">
<div class="card-body">
<h5 class="card-title">Entrevista para a CBN</h5>
<p class="card-text">Imprensa</p>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item">Gabinete da ministra</li>
<li class="list-group-item">12 de maio de 2024</li>
<li class="list-group-item">08:30</li>
</ul>
</div>, <div class="card mb-3 text-bg-secondary">
<div class="card-body">
<h5 class="card-title">Reunião com secretários</h5>
<p class="card-text">Expediente</p>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item">Gabinete da ministra</li>
<li class="list-group-item">12 de maio de 2024</li>
<li class="list-group-item">09:30</li>
</ul>
</div>, <div class="card mb-3 text-bg-secondary">
<div class="card-body">
<h5 class="card-title">Visita à comunidade do Riacho Branco</h5>
<p class="card-text">Evento público</p>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item">Sede da ATRB</li>
<li class="list-group-item">12 de maio de 2024</li>
<li class="list-group-item">11:00</li>
</ul>
</div>, <div class="card mb-3 text-bg-secondary">
<div class="card-body">
<h5 class="card-title">Viagem a Belém - PA</h5>
<p class="card-text">Expediente</p>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item"> </li>
<li class="list-group-item">12 de maio de 2024</li>
<li class="list-group-item">13:00</li>
</ul>
</div>, <div class="card mb-3 text-bg-secondary">
<div class="card-body">
<h5 class="card-title">Reunião com pescadores</h5>
<p class="card-text">Expediente</p>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item">Cooperativa de Pesca do Belém do Pará</li>
<li class="list-group-item">12 de maio de 2024</li>
<li class="list-group-item">15:00</li>
</ul>
</div>, <div class="card mb-3 text-bg-secondary">
<div class="card-body">
<h5 class="card-title">Retorno a Brasília</h5>
<p class="card-text">Expediente</p>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item"> </li>
<li class="list-group-item">12 de maio de 2024</li>
<li class="list-group-item">17:00</li>
</ul>
</div>, <div class="card mb-3 text-bg-secondary">
<div class="card-body">
<h5 class="card-title">Entrevista à TV Senado</h5>
<p class="card-text">Imprensa</p>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item">Sede da TV Senado</li>
<li class="list-group-item">12 de maio de 2024</li>
<li class="list-group-item">18:30</li>
</ul>
</div>]
```

Agora que temos os elementos que queremos separados numa lista, podemos selecionar o que queremos exatamente com laço `for`.

```python
for i in divs:
    # `text` pega somente o texto contido na tag, e não toda a tag
    evento = i.h5.text
    local = i.find_all('li')[0].text
    data = i.find_all('li')[1].text
    horario = i.find_all('li')[2].text
    
    print(f"Evento: {evento}")
    print(f"Local: {local}")
    print(f"Data: {data}")
    print(f"Horário: {horario}\n") # \n dá quebra de linha a mais
```
```textfile
Evento: Entrevista para a CBN
Local: Gabinete da ministra
Data: 12 de maio de 2024
Horário: 08:30

Evento: Reunião com secretários
Local: Gabinete da ministra
Data: 12 de maio de 2024
Horário: 09:30

Evento: Visita à comunidade do Riacho Branco
Local: Sede da ATRB
Data: 12 de maio de 2024
Horário: 11:00

Evento: Viagem a Belém - PA
Local:  
Data: 12 de maio de 2024
Horário: 13:00

Evento: Reunião com pescadores
Local: Cooperativa de Pesca do Belém do Pará
Data: 12 de maio de 2024
Horário: 15:00

Evento: Retorno a Brasília
Local:  
Data: 12 de maio de 2024
Horário: 17:00

Evento: Entrevista à TV Senado
Local: Sede da TV Senado
Data: 12 de maio de 2024
Horário: 18:30
```

Para nós, porém, não é interessante imprimir na tela com `print()`, mas sim salvar numa lista de dicionários para, porteriormente, trabalhar com Pandas.

```python
lista_eventos = list()
for i in divs:
    compromisso = {
        'evento': i.h5.text,
        'local': i.find_all('li')[0].text,
        'data': i.find_all('li')[1].text,
        'horario': i.find_all('li')[2].text
    }
    lista_eventos.append(compromisso)

print(lista_eventos)
```
```textfile
[{'evento': 'Entrevista para a CBN', 'local': 'Gabinete da ministra', 'data': '12 de maio de 2024', 'horario': '08:30'}, {'evento': 'Reunião com secretários', 'local': 'Gabinete da ministra', 'data': '12 de maio de 2024', 'horario': '09:30'}, {'evento': 'Visita à comunidade do Riacho Branco', 'local': 'Sede da ATRB', 'data': '12 de maio de 2024', 'horario': '11:00'}, {'evento': 'Viagem a Belém - PA', 'local': '\xa0', 'data': '12 de maio de 2024', 'horario': '13:00'}, {'evento': 'Reunião com pescadores', 'local': 'Cooperativa de Pesca do Belém do Pará', 'data': '12 de maio de 2024', 'horario': '15:00'}, {'evento': 'Retorno a Brasília', 'local': '\xa0', 'data': '12 de maio de 2024', 'horario': '17:00'}, {'evento': 'Entrevista à TV Senado', 'local': 'Sede da TV Senado', 'data': '12 de maio de 2024', 'horario': '18:30'}]
```

Agora, sim, podemos usar Pandas e começar nossas análises.

```python
import pandas as pd

df = pd.DataFrame(lista_eventos)
print(df)
```
```textfile
|   | evento                               | local                                 | data               | horario |
| - | ------------------------------------ | ------------------------------------- | ------------------ | ------- |
| 0 | Entrevista para a CBN                | Gabinete da ministra                  | 12 de maio de 2024 | 08:30   |
| 1 | Reunião com secretários              | Gabinete da ministra                  | 12 de maio de 2024 | 09:30   |
| 2 | Visita à comunidade do Riacho Branco | Sede da ATRB                          | 12 de maio de 2024 | 11:00   |
| 3 | Viagem a Belém - PA                  |                                       | 12 de maio de 2024 | 13:00   |
| 4 | Reunião com pescadores               | Cooperativa de Pesca do Belém do Pará | 12 de maio de 2024 | 15:00   |
| 5 | Retorno a Brasília                   |                                       | 12 de maio de 2024 | 17:00   |
| 6 | Entrevista à TV Senado               | Sede da TV Senado                     | 12 de maio de 2024 | 18:30   |
```
{{< /expandable >}}

{{< expandable label="Exercícios - parte 1" level="2" >}}

### Atividade 1

A URL http://cnes2.datasus.gov.br/Mod_Ind_Leitos_Listar.asp?VCod_Leito=03&VTipo_Leito=1&VListar=1&VEstado=00&VMun=&VComp= traz dados do Ministério da Saúde acerca de leitos cirúrgicos (cirurgia geral) existentes e dedicados ao SUS para todas as cidades de todos os estados do Brasil.

Raspe esta página e, num dataframe de Pandas, para cada hospital, retorne:

1. código CNES
2. nome do estabelecimento
3. total de leitos existentes
4. total de leitos para SUS
5. proporção de leitos para SUS &mdash;esta informação não está no site, mas pode ser calculada

### Atividade 2

O site do IMDb traz a lista dos melhores filmes brasileiros, segundo votação popular. A URL é esta: https://www.imdb.com/list/ls060310079/?sort=user_rating,desc&st_dt=&mode=detail&page=1.

Há diversas informações ali, como nome do filme, ano de lançamento, a nota, a sinopse etc. São mais de 90 filmes.

Crie um script para obter:

1. nome do filme
2. ano de lançamento
3. duração do filme
4. nota

Salve os dados num dataframe de Pandas.

{{< /expandable >}}

{{< expandable label="Raspagem de múltiplas páginas: dados na URL" level="2" >}}

Até o momento, vimos como raspar uma única página. Trata-se de uma raspagem simples, para aprender o contexto, os elementos, os comandos. Na vida prática, porém, raramente _web scraping_ em página única resolve nossos projetos, uma vez que os dados que necessitamos podem estar em mais de uma página.

É preciso, assim, criar estratégias para captura de informações em páginas múltiplas. O primeiro passo é compreender como esses dados estão segregados no site alvo da raspagem.

Tomemos, por exemplo, o site com os nomes e modalidades de todos os atletas do Comitê Olímpico Brasileiro: https://www.cob.org.br/pt/cob/time-brasil/atletas. Reparem que os dados não estão todos numa só página: existem letras na parte de cima, para buscar pela inicial do atleta; também há números na parte inferior, uma paginação &mdash;ou seja, a primeira página é 1, a segunda é 2 etc.

```py
import requests
from bs4 import BeautifulSoup as bs
import urllib3 # importo esta biblioteca apenas...
urllib3.disable_warnings() # ...para tirar o aviso `InsecureRequestWarning`

url = "https://www.cob.org.br/pt/cob/time-brasil/atletas"
req = requests.get(url, verify=False)
soup = bs(req.text, 'html.parser')
divs = soup.find_all("div", class_="dados")
print(divs[0:4])
```
```textfile
[<div class="dados">
<h3>Abner Teixeira</h3>
</div>, <div class="dados">
<h3>Abner Vinícius</h3>
</div>, <div class="dados">
<h3>Ademir Kaefer</h3>
</div>, <div class="dados">
<h3>Adenizia</h3>
</div>]
```

Para cada página, precisamos mudar a URL &mdash;o restante do código, porém, permanece igual.

```py
url = "https://www.cob.org.br/pt/cob/time-brasil/atletas?&page=5"
req = requests.get(url, verify=False)
soup = bs(req.text, 'html.parser')
divs = soup.find_all("div", class_="dados")
print(divs[0:4])
```
```textfile
[<div class="dados">
<h3>Daniela Alves</h3>
</div>, <div class="dados">
<h3>Daniela Polzin</h3>
</div>, <div class="dados">
<h3>Daniele Hypolito</h3>
</div>, <div class="dados">
<h3>Danilo Luiz</h3>
</div>]
```

Outro exemplo: a quantidade de leitos no estado do Rio de Janeiro por especialidade e data de competência: http://cnes2.datasus.gov.br/Mod_Ind_Tipo_Leito.asp?VEstado=33&VMun=&VComp=202304. Notem que a URL tem `VComp` para o mês de competência. Com faríamos para raspar todos os meses? Mesmo procedimento: usamos a URL de uma página...

```py
url = "http://cnes2.datasus.gov.br/Mod_Ind_Tipo_Leito.asp?VEstado=33&VMun=&VComp=202304"
req = requests.get(url, verify=False)
soup = bs(req.text, 'html.parser')
tables = soup.find_all('table')[5]
print(tables.find_all('tr')[2])
```
```textfile
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202304">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">142</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">56</font></td></tr>
```

...E depois, trocamos a URL para a página seguinte.

```py
url = "http://cnes2.datasus.gov.br/Mod_Ind_Tipo_Leito.asp?VEstado=33&VMun=&VComp=202303"
req = requests.get(url, verify=False)
soup = bs(req.text, 'html.parser')
tables = soup.find_all('table')[5]
print(tables.find_all('tr')[2])
```
```textfile
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202303">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">141</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">57</font></td></tr>
```

Em ambos os exemplos acima, notem: __a estrutura da primeira página se repete nas demais —a única mudança é na URL__. Tendo isso em mente, podemos usar um código único, mas iterando por diversas páginas (com um _for-loop_, por exemplo).

### Paginação

No exemplo dos atletas do COB, vimos que há uma paginação &mdash;notem que a URL muda a cada página. Mas a estrutura (tags de HTML e atributos de CSS) são os mesmos. Então vamos raspar apenas a primeira página:

```py
url = "https://www.cob.org.br/pt/cob/time-brasil/atletas?&page=1" # página 1
req = requests.get(url, verify=False)
soup = bs(req.text, 'html.parser')
divs = soup.find_all("div", class_="dados")
print(divs[0:4]) # imprimo 5 elementos apenas para checar
```
```textfile
[<div class="dados">
<h3>Abner Teixeira</h3>
</div>, <div class="dados">
<h3>Abner Vinícius</h3>
</div>, <div class="dados">
<h3>Ademir Kaefer</h3>
</div>, <div class="dados">
<h3>Adenizia</h3>
</div>]
```

Com _for-loop_ e `range()` para substituir o número da página na URL, podemos raspar, por exemplo, as cinco primeiras páginas sem esforço:

```py
for p in range(1, 6):
    url = f"https://www.cob.org.br/pt/cob/time-brasil/atletas?&page={p}"
    req = requests.get(url, verify=False)
    soup = bs(req.text, 'html.parser')
    divs = soup.find_all("div", class_="dados")
    print(divs[0:4])
```
```textfile
[<div class="dados">
<h3>Abner Teixeira</h3>
</div>, <div class="dados">
<h3>Abner Vinícius</h3>
</div>, <div class="dados">
<h3>Ademir Kaefer</h3>
</div>, <div class="dados">
<h3>Adenizia</h3>
</div>]
[<div class="dados">
<h3>Alison dos Santos </h3>
</div>, <div class="dados">
<h3>Allan do Carmo</h3>
</div>, <div class="dados">
<h3>Aloísio</h3>
</div>, <div class="dados">
<h3>Amaral</h3>
</div>]
[<div class="dados">
<h3>Antony</h3>
</div>, <div class="dados">
<h3>Arnaldo Oliveira</h3>
</div>, <div class="dados">
<h3>Arthur Nory</h3>
</div>, <div class="dados">
<h3>Arthur Zanetti</h3>
</div>]
[<div class="dados">
<h3>Bruno Uvini</h3>
</div>, <div class="dados">
<h3>Burkhard Cordes</h3>
</div>, <div class="dados">
<h3>Camila Brait</h3>
</div>, <div class="dados">
<h3>Carlão</h3>
</div>]
[<div class="dados">
<h3>Daniela Alves</h3>
</div>, <div class="dados">
<h3>Daniela Polzin</h3>
</div>, <div class="dados">
<h3>Daniele Hypolito</h3>
</div>, <div class="dados">
<h3>Danilo Luiz</h3>
</div>]
```

Agora, com um pequeno ajuste, o código na íntegra, pegando todas as 18 páginas do site:

```py
import requests
from bs4 import BeautifulSoup as bs
import urllib3
urllib3.disable_warnings()

atletas = list()
for p in range(1, 19):
    url = f"https://www.cob.org.br/pt/cob/time-brasil/atletas?&page={p}"
    req = requests.get(url, verify=False)
    soup = bs(req.text, 'html.parser')
    articles = soup.find_all("article", class_="reg-atletas")
    for i in articles:
        dicio = {
            "nome": i.find('div', class_="dados").text.strip(),
            "modalidade": i.find('div', class_="texto").text.replace("+", "").strip()
        }
        atletas.append(dicio)
print(atletas)
```
```textfile
[{'nome': 'Abner Teixeira', 'modalidade': 'Boxe'},
{'nome': 'Abner Vinícius', 'modalidade': 'Futebol'},
{'nome': 'Ademir Kaefer', 'modalidade': 'Futebol'},
{'nome': 'Adenizia', 'modalidade': 'Vôlei'},
{'nome': 'Adhemar Ferreira da Silva', 'modalidade': 'Atletismo'},
{'nome': 'Adriana Aparecida da Silva', 'modalidade': 'Atletismo'},
{'nome': 'Adriana Araújo', 'modalidade': 'Boxe'},
{'nome': 'Adriana Behar', 'modalidade': 'Vôlei de praia'},
{'nome': 'Adriana Samuel', 'modalidade': 'Vôlei de praia'},
{'nome': 'Adriana Santos', 'modalidade': 'Basquete'},
{'nome': 'Adrianinha', 'modalidade': 'Basquete'},
{'nome': 'Affonso Évora', 'modalidade': 'Basquete'},
{'nome': 'Afrânio Costa', 'modalidade': 'Tiro esportivo'},
{'nome': 'Ágatha Rippel', 'modalidade': 'Vôlei de praia'},
{'nome': 'Aída dos Santos', 'modalidade': 'Atletismo'},
{'nome': 'Alberto Marson', 'modalidade': 'Basquete'},
{'nome': 'Aldair', 'modalidade': 'Futebol'},
{'nome': 'Alessandra Oliveira', 'modalidade': 'Basquete'},
{'nome': 'Alex Garcia', 'modalidade': 'Basquete'},
{'nome': 'Alex Sandro', 'modalidade': 'Futebol'},
{'nome': 'Alex Silva', 'modalidade': 'Futebol'},
{'nome': 'Alex Welter', 'modalidade': 'Vela'},
{'nome': 'Alexandra Nascimento)', 'modalidade': 'Handebol'},
{'nome': 'Alexandre Gemignani', 'modalidade': 'Basquete'},
{'nome': 'Alexandre Pato', 'modalidade': 'Futebol'},
{'nome': 'Alfredo da Motta', 'modalidade': 'Basquete'},
{'nome': 'Algodão', 'modalidade': 'Basquete'},
{'nome': 'Aline Pellegrino', 'modalidade': 'Futebol'},
{'nome': 'Aline Reis', 'modalidade': 'Futebol'},
{'nome': 'Alison Cerutti', 'modalidade': 'Vôlei de praia'},
{'nome': 'Alison dos Santos', 'modalidade': 'Atletismo'},
{'nome': 'Allan do Carmo', 'modalidade': 'Águas Abertas'},
{'nome': 'Aloísio', 'modalidade': 'Futebol'},
{'nome': 'Amaral', 'modalidade': 'Futebol'},
{'nome': 'Amauri Ribeiro', 'modalidade': 'Vôlei'},
{'nome': 'Amaury Pasos', 'modalidade': 'Basquete'},
{'nome': 'Ana Carolina da Silva', 'modalidade': 'Vôlei'},
{'nome': 'Ana Claudia Lemos', 'modalidade': 'Atletismo'},
{'nome': 'Ana Cristina', 'modalidade': 'Vôlei'},
{'nome': 'Ana Flávia', 'modalidade': 'Vôlei'},
{'nome': 'Ana Luiza Barbachan', 'modalidade': 'Vela'},
{'nome': 'Ana Marcela Cunha', 'modalidade': 'Águas Abertas'},
{'nome': 'Ana Moser', 'modalidade': 'Vôlei'},
{'nome': 'Ana Paula Henkel', 'modalidade': 'Vôlei'},
{'nome': 'Ana Paula Rodrigues', 'modalidade': 'Handebol'},
{'nome': 'Ana Sátila', 'modalidade': 'Canoagem Slalom'},
{'nome': 'Anderson Oliveira', 'modalidade': 'Futebol'},
{'nome': 'Anderson Rodrigues', 'modalidade': 'Vôlei'},
{'nome': 'André Cruz', 'modalidade': 'Futebol'},
{'nome': 'André Domingos', 'modalidade': 'Atletismo'},
{'nome': 'André Heller', 'modalidade': 'Vôlei'},
{'nome': 'André Johannpeter', 'modalidade': 'Hipismo'},
{'nome': 'André Luis Ferreira', 'modalidade': 'Futebol'},
{'nome': 'André Luiz', 'modalidade': 'Futebol'},
{'nome': 'André Nascimento', 'modalidade': 'Vôlei'},
{'nome': 'Andréia Rosa', 'modalidade': 'Futebol'},
{'nome': 'Andréia Suntaque', 'modalidade': 'Futebol'},
{'nome': 'Andressa (Andressinha)', 'modalidade': 'Futebol'},
{'nome': 'Andressa Morais', 'modalidade': 'Atletismo'},
{'nome': 'Andressa Silva', 'modalidade': 'Futebol'},
{'nome': 'Antony', 'modalidade': 'Futebol'},
{'nome': 'Arnaldo Oliveira', 'modalidade': 'Atletismo'},
{'nome': 'Arthur Nory', 'modalidade': 'Ginástica Artística'},
{'nome': 'Arthur Zanetti', 'modalidade': 'Ginástica Artística'},
{'nome': 'Augusto Brito', 'modalidade': 'Basquete'},
{'nome': 'Aurélio Miguel', 'modalidade': 'Judô'},
{'nome': 'Babi Arenhart', 'modalidade': 'Handebol'},
{'nome': 'Baby Futuro', 'modalidade': 'Rugby de 7'},
{'nome': 'Badalhoca', 'modalidade': 'Vôlei'},
{'nome': 'Bárbara Micheline', 'modalidade': 'Futebol'},
{'nome': 'Bárbara Seixas', 'modalidade': 'Vôlei de praia'},
{'nome': 'Beatriz (Bia)', 'modalidade': 'Futebol'},
{'nome': 'Beatriz Feres', 'modalidade': 'Nado Artístico'},
{'nome': 'Beatriz Ferreira', 'modalidade': 'Boxe'},
{'nome': 'Bebeto', 'modalidade': 'Futebol'},
{'nome': 'Bernard Rajzman', 'modalidade': 'Vôlei'},
{'nome': 'Bernardinho', 'modalidade': 'Vôlei'},
{'nome': 'Branca', 'modalidade': 'Basquete'},
{'nome': 'Branca Feres', 'modalidade': 'Nado Artístico'},
{'nome': 'Brenno', 'modalidade': 'Futebol'},
{'nome': 'Breno Borges', 'modalidade': 'Futebol'},
{'nome': 'Bruna Takahashi', 'modalidade': 'Tênis de mesa'},
{'nome': 'Bruninho', 'modalidade': 'Vôlei'},
{'nome': 'Brunno Mendonça', 'modalidade': 'Hóquei sobre Grama'},
{'nome': 'Bruno Fratus', 'modalidade': 'Natação'},
{'nome': 'Bruno Fuchs', 'modalidade': 'Futebol'},
{'nome': 'Bruno Guimarães', 'modalidade': 'Futebol'},
{'nome': 'Bruno Lins', 'modalidade': 'Atletismo'},
{'nome': 'Bruno Prada', 'modalidade': 'Vela'},
{'nome': 'Bruno Schmidt', 'modalidade': 'Vôlei de praia'},
{'nome': 'Bruno Uvini', 'modalidade': 'Futebol'},
{'nome': 'Burkhard Cordes', 'modalidade': 'Vela'},
{'nome': 'Camila Brait', 'modalidade': 'Vôlei'},
{'nome': 'Carlão', 'modalidade': 'Vôlei'},
{'nome': 'Carlos Honorato', 'modalidade': 'Judô'},
{'nome': 'Carlos Jayme', 'modalidade': 'Natação'},
{'nome': 'Carol Albuquerque', 'modalidade': 'Vôlei'},
{'nome': 'Carol Gattaz', 'modalidade': 'Vôlei'},
{'nome': 'Cassius Duran', 'modalidade': 'Saltos Ornamentais'},
{'nome': 'Cesar Cielo', 'modalidade': 'Natação'},
{'nome': 'Chiaki Ishii', 'modalidade': 'Judô'},
{'nome': 'Chicão Vidal', 'modalidade': 'Futebol'},
{'nome': 'Chico Barretto', 'modalidade': 'Ginástica Artística'},
{'nome': 'Cíntia Tuiú', 'modalidade': 'Basquete'},
{'nome': 'Cláudia Pastor', 'modalidade': 'Basquete'},
{'nome': 'Claudinei Quirino', 'modalidade': 'Atletismo'},
{'nome': 'Claudinha', 'modalidade': 'Basquete'},
{'nome': 'Cláudio Roberto', 'modalidade': 'Atletismo'},
{'nome': 'Clínio Freitas', 'modalidade': 'Vela'},
{'nome': 'Clodoaldo do Carmo', 'modalidade': 'Atletismo'},
{'nome': 'Codó', 'modalidade': 'Atletismo'},
{'nome': 'Cristiane', 'modalidade': 'Futebol'},
{'nome': 'Cristiano Felício', 'modalidade': 'Basquete'},
{'nome': 'Cyro Delgado', 'modalidade': 'Natação'},
{'nome': 'Daiane dos Santos', 'modalidade': 'Ginástica Artística'},
{'nome': 'Dani Lins', 'modalidade': 'Vôlei'},
{'nome': 'Dani Piedade', 'modalidade': 'Handebol'},
{'nome': 'Daniel Adler', 'modalidade': 'Vela'},
{'nome': 'Daniel Alves', 'modalidade': 'Futebol'},
{'nome': 'Daniel Cargnin', 'modalidade': 'Judô'},
{'nome': 'Daniela Alves', 'modalidade': 'Futebol'},
{'nome': 'Daniela Polzin', 'modalidade': 'Judô'},
{'nome': 'Daniele Hypolito', 'modalidade': 'Ginástica Artística'},
{'nome': 'Danilo Luiz', 'modalidade': 'Futebol'},
{'nome': 'Danrlei', 'modalidade': 'Futebol'},
{'nome': 'Dante Amaral', 'modalidade': 'Vôlei'},
{'nome': 'Dario Barbosa', 'modalidade': 'Tiro esportivo'},
{'nome': 'Davi Silva', 'modalidade': 'Futebol'},
{'nome': 'Dayane Rocha', 'modalidade': 'Futebol'},
{'nome': 'Débora (Debinha)', 'modalidade': 'Futebol'},
{'nome': 'Deonise', 'modalidade': 'Handebol'},
{'nome': 'Dida', 'modalidade': 'Futebol'},
{'nome': 'Diego Alves', 'modalidade': 'Futebol'},
{'nome': 'Diego Carlos', 'modalidade': 'Futebol'},
{'nome': 'Diego Hypolito', 'modalidade': 'Ginástica Artística'},
{'nome': 'Diego Ribas', 'modalidade': 'Futebol'},
{'nome': 'Diogo Martins', 'modalidade': 'Triatlo'},
{'nome': 'Diogo Silva', 'modalidade': 'Taekwondo'},
{'nome': 'Djan Madruga', 'modalidade': 'Natação'},
{'nome': 'Doda Miranda', 'modalidade': 'Hipismo Saltos'},
{'nome': 'Domingos Maracanã', 'modalidade': 'Vôlei'},
{'nome': 'Douglas Chiarotti', 'modalidade': 'Vôlei'},
{'nome': 'Douglas Luiz', 'modalidade': 'Futebol'},
{'nome': 'Douglas Santos', 'modalidade': 'Futebol'},
{'nome': 'Douglas Souza', 'modalidade': 'Vôlei'},
{'nome': 'Douglas Vieira', 'modalidade': 'Judô'},
{'nome': 'Duda Amorim', 'modalidade': 'Handebol'},
{'nome': 'Dunga', 'modalidade': 'Futebol'},
{'nome': 'Éder Carbonera', 'modalidade': 'Vôlei'},
{'nome': 'Edmar Bernardes', 'modalidade': 'Futebol'},
{'nome': 'Edson Bindilatti', 'modalidade': 'Bobsled'},
{'nome': 'Édson Bispo', 'modalidade': 'Basquete'},
{'nome': 'Edson Luciano', 'modalidade': 'Atletismo'},
{'nome': 'Edu Penido', 'modalidade': 'Vela'},
{'nome': 'Eduard Soghomonyan', 'modalidade': 'Wrestling'},
{'nome': 'Edvaldo Valério', 'modalidade': 'Natação'},
{'nome': 'Edvar Simões', 'modalidade': 'Basquete'},
{'nome': 'Elaine Moura', 'modalidade': 'Futebol'},
{'nome': 'Elisângela Oliveira', 'modalidade': 'Vôlei'},
{'nome': 'Emanuel Rego', 'modalidade': 'Vôlei de praia'},
{'nome': 'Emerson Duarte', 'modalidade': 'Tiro esportivo'},
{'nome': 'Érika Coimbra', 'modalidade': 'Vôlei'},
{'nome': 'Érika Cristiano', 'modalidade': 'Futebol'},
{'nome': 'Erlon Souza', 'modalidade': 'Canoagem Velocidade'},
{'nome': 'Esquiva Falcão', 'modalidade': 'Boxe'},
{'nome': 'Ester Santos', 'modalidade': 'Futebol'},
{'nome': 'Etiene Medeiros', 'modalidade': 'Natação'},
{'nome': 'Evandro Guerra', 'modalidade': 'Vôlei'},
{'nome': 'Evandro Júnior', 'modalidade': 'Vôlei de praia'},
{'nome': 'Fabi Alvim', 'modalidade': 'Vôlei'},
{'nome': 'Fabiana (Dara)', 'modalidade': 'Handebol'},
{'nome': 'Fabiana Beltrame', 'modalidade': 'Remo'},
{'nome': 'Fabiana Claudino', 'modalidade': 'Vôlei'},
{'nome': 'Fabiana Murer', 'modalidade': 'Atletismo'},
{'nome': 'Fabiana Simões', 'modalidade': 'Futebol'},
{'nome': 'Fabiano Peçanha', 'modalidade': 'Atletismo'},
{'nome': 'Fábio Luiz', 'modalidade': 'Vôlei de praia'},
{'nome': 'Felipe Anderson', 'modalidade': 'Futebol'},
{'nome': 'Felipe Kitadai', 'modalidade': 'Judô'},
{'nome': 'Felipe Wu', 'modalidade': 'Tiro esportivo'},
{'nome': 'Fernanda Garay', 'modalidade': 'Vôlei'},
{'nome': 'Fernanda Nunes', 'modalidade': 'Remo'},
{'nome': 'Fernanda Oliveira', 'modalidade': 'Vela'},
{'nome': 'Fernanda Venturini', 'modalidade': 'Vôlei'},
{'nome': 'Fernandão', 'modalidade': 'Vôlei'},
{'nome': 'Fernandinha Ferreira', 'modalidade': 'Vôlei'},
{'nome': 'Fernando Brobró', 'modalidade': 'Basquete'},
{'nome': 'Fernando Reis', 'modalidade': 'Levantamento de Pesos'},
{'nome': 'Fernando Scheffer', 'modalidade': 'Natação'},
{'nome': 'Fernando Scherer', 'modalidade': 'Natação'},
{'nome': 'Fernando Soledade', 'modalidade': 'Tiro esportivo'},
{'nome': 'Filó', 'modalidade': 'Vôlei'},
{'nome': 'Flávio Canto', 'modalidade': 'Judô'},
{'nome': 'Flávio Conceição', 'modalidade': 'Futebol'},
{'nome': 'Fofão', 'modalidade': 'Vôlei'},
{'nome': 'Formiga', 'modalidade': 'Futebol'},
{'nome': 'Francielle Alberto', 'modalidade': 'Futebol'},
{'nome': 'Fritz Braun', 'modalidade': 'Basquete'},
{'nome': 'Gabi Guimarães', 'modalidade': 'Vôlei'},
{'nome': 'Gabigol', 'modalidade': 'Futebol'},
{'nome': 'Gabriel Jesus', 'modalidade': 'Futebol'},
{'nome': 'Gabriel Menino', 'modalidade': 'Futebol'},
{'nome': 'Gabriel Vasconcellos', 'modalidade': 'Futebol'},
{'nome': 'Geovani Silva', 'modalidade': 'Futebol'},
{'nome': 'Gerson Victalino', 'modalidade': 'Basquete'},
{'nome': 'Giba', 'modalidade': 'Vôlei'},
{'nome': 'Gilmar Popoca', 'modalidade': 'Futebol'},
{'nome': 'Gilmar Rinaldi', 'modalidade': 'Futebol'},
{'nome': 'Gilvan Ribeiro', 'modalidade': 'Canoagem Velocidade'},
{'nome': 'Giovane Gávio', 'modalidade': 'Vôlei'},
{'nome': 'Grazielle Nascimento', 'modalidade': 'Futebol'},
{'nome': 'Grummy', 'modalidade': 'Desportos Aquaticos'},
{'nome': 'Guilherme Arana', 'modalidade': 'Futebol'},
{'nome': 'Guilherme Giovannoni', 'modalidade': 'Basquete'},
{'nome': 'Guilherme Guido', 'modalidade': 'Natação'},
{'nome': 'Guilherme Paraense', 'modalidade': 'Tiro esportivo'},
{'nome': 'Gustavo Borges', 'modalidade': 'Natação'},
{'nome': 'Gustavo Endres', 'modalidade': 'Vôlei'},
{'nome': 'Hamilton Careca', 'modalidade': 'Futebol'},
{'nome': 'Hebert Conceição', 'modalidade': 'Boxe'},
{'nome': 'Helen Luz', 'modalidade': 'Basquete'},
{'nome': 'Henrique Guimarães', 'modalidade': 'Judô'},
{'nome': 'Hernanes', 'modalidade': 'Futebol'},
{'nome': 'Hilma Caldeira', 'modalidade': 'Vôlei'},
{'nome': 'Hortência', 'modalidade': 'Basquete'},
{'nome': 'Hugo Calderano', 'modalidade': 'Tênis de mesa'},
{'nome': 'Hugo Hoyama', 'modalidade': 'Tênis de mesa'},
{'nome': 'Hulk', 'modalidade': 'Futebol'},
{'nome': 'Ida Álvares', 'modalidade': 'Vôlei'},
{'nome': 'Ilsinho', 'modalidade': 'Futebol'},
{'nome': 'Isabel Clark', 'modalidade': 'Snowboard'},
{'nome': 'Isabel Swan', 'modalidade': 'Vela'},
{'nome': 'Isadora Williams', 'modalidade': 'Patinação Artística'},
{'nome': 'Isaquias Queiroz', 'modalidade': 'Canoagem Velocidade'},
{'nome': 'Italo Ferreira', 'modalidade': 'Surfe'},
{'nome': 'Iziane', 'modalidade': 'Basquete'},
{'nome': 'Jackie Silva', 'modalidade': 'Vôlei de praia'},
{'nome': 'Jade Barbosa', 'modalidade': 'Ginástica Artística'},
{'nome': 'Janelson Carvalho', 'modalidade': 'Vôlei'},
{'nome': 'Janeth Arcain', 'modalidade': 'Basquete'},
{'nome': 'Janina', 'modalidade': 'Vôlei'},
{'nome': 'Jaqueline Carvalho', 'modalidade': 'Vôlei'},
{'nome': 'Jaqueline Mourão', 'modalidade': 'Ciclismo Mountain Bike'},
{'nome': 'Jatyr Schall', 'modalidade': 'Basquete'},
{'nome': 'Jefferson Sabino', 'modalidade': 'Atletismo'},
{'nome': 'Jô', 'modalidade': 'Futebol'},
{'nome': 'Joana Cortez', 'modalidade': 'Tênis'},
{'nome': 'Joanna Maranhão', 'modalidade': 'Natação'},
{'nome': 'João Batista', 'modalidade': 'Futebol'},
{'nome': 'João do Pulo', 'modalidade': 'Atletismo'},
{'nome': 'João Francisco Bráz', 'modalidade': 'Basquete'},
{'nome': 'João Kita', 'modalidade': 'Futebol'},
{'nome': 'João Paulo', 'modalidade': 'Futebol'},
{'nome': 'Joaquim Cruz', 'modalidade': 'Atletismo'},
{'nome': 'Jorge Edson', 'modalidade': 'Vôlei'},
{'nome': 'Jorge Fernandes', 'modalidade': 'Natação'},
{'nome': 'Jorge Luis Andrade', 'modalidade': 'Futebol'},
{'nome': 'Jorginho', 'modalidade': 'Futebol'},
{'nome': 'José Ferreira Neto', 'modalidade': 'Futebol'},
{'nome': 'José Telles da Conceição', 'modalidade': 'Atletismo'},
{'nome': 'Juan Jesus', 'modalidade': 'Futebol'},
{'nome': 'Juan Nogueira', 'modalidade': 'Boxe'},
{'nome': 'Juliana Cabral', 'modalidade': 'Futebol'},
{'nome': 'Juliana Felisberta', 'modalidade': 'Vôlei de praia'},
{'nome': 'Juninho Paulista', 'modalidade': 'Futebol'},
{'nome': 'Kahena Kunze', 'modalidade': 'Vela'},
{'nome': 'Karin Rodrigues', 'modalidade': 'Vôlei'},
{'nome': 'Kátia Lopes', 'modalidade': 'Vôlei'},
{'nome': 'Keila Costa', 'modalidade': 'Atletismo'},
{'nome': 'Kelly Cristina', 'modalidade': 'Futebol'},
{'nome': 'Kelly Santos', 'modalidade': 'Basquete'},
{'nome': 'Kelvin Hoefler', 'modalidade': 'Skate'},
{'nome': 'Kely Fraga', 'modalidade': 'Vôlei'},
{'nome': 'Ketleyn Quadros', 'modalidade': 'Judô'},
{'nome': 'Kiko Pellicano', 'modalidade': 'Vela'},
{'nome': 'Lara Cianciarulo', 'modalidade': 'Nado Artístico'},
{'nome': 'Larissa França', 'modalidade': 'Vôlei de praia'},
{'nome': 'Lars Björkström', 'modalidade': 'Vela'},
{'nome': 'Lars Grael', 'modalidade': 'Vela'},
{'nome': 'Laura Pigossi', 'modalidade': 'Tênis'},
{'nome': 'Leandrinho', 'modalidade': 'Basquete'},
{'nome': 'Leandro Damião', 'modalidade': 'Futebol'},
{'nome': 'Leandro Guilheiro', 'modalidade': 'Judô'},
{'nome': 'Leandro Vissotto', 'modalidade': 'Vôlei'},
{'nome': 'Leila Barros', 'modalidade': 'Vôlei'},
{'nome': 'Leila Sobral', 'modalidade': 'Basquete'},
{'nome': 'Lilian Gonçalves', 'modalidade': 'Basquete'},
{'nome': 'Lipe Fonteles', 'modalidade': 'Vôlei'},
{'nome': 'Lorena Molinos', 'modalidade': 'Nado Artístico'},
{'nome': 'Luan Garcia', 'modalidade': 'Futebol'},
{'nome': 'Luan Guilherme', 'modalidade': 'Futebol'},
{'nome': 'Lucão', 'modalidade': 'Vôlei'},
{'nome': 'Lucas Duque', 'modalidade': 'Rugby de 7'},
{'nome': 'Lucas Leiva', 'modalidade': 'Futebol'},
{'nome': 'Lucas Moura', 'modalidade': 'Futebol'},
{'nome': 'Lucimar Moura', 'modalidade': 'Atletismo'},
{'nome': 'Luís Henrique', 'modalidade': 'Futebol'},
{'nome': 'Luisa Borges', 'modalidade': 'Nado Artístico'},
{'nome': 'Luísa Stefani', 'modalidade': 'Tênis'},
{'nome': 'Luiz Carlos Winck', 'modalidade': 'Futebol'},
{'nome': 'Luiz Felipe Azevedo', 'modalidade': 'Hipismo'},
{'nome': 'Luiz Onmura', 'modalidade': 'Judô'},
{'nome': 'Luizão', 'modalidade': 'Futebol'},
{'nome': 'Macris', 'modalidade': 'Vôlei'},
{'nome': 'Magic Paula', 'modalidade': 'Basquete'},
{'nome': 'Maicon Andrade', 'modalidade': 'Taekwondo'},
{'nome': 'Malcom', 'modalidade': 'Futebol'},
{'nome': 'Manoel dos Santos', 'modalidade': 'Natação'},
{'nome': 'Maravilha', 'modalidade': 'Futebol'},
{'nome': 'Marcelinho Elgarten', 'modalidade': 'Vôlei'},
{'nome': 'Marcelinho Machado', 'modalidade': 'Basquete'},
{'nome': 'Marcelinho Paulista', 'modalidade': 'Futebol'},
{'nome': 'Marcelo Chierighini', 'modalidade': 'Natação'},
{'nome': 'Marcelo Ferreira', 'modalidade': 'Vela'},
{'nome': 'Marcelo Huertas)', 'modalidade': 'Basquete'},
{'nome': 'Marcelo Negrão', 'modalidade': 'Vôlei'},
{'nome': 'Marcelo Vieira', 'modalidade': 'Futebol'},
{'nome': 'Márcia Fu', 'modalidade': 'Vôlei'},
{'nome': 'Márcio Araújo', 'modalidade': 'Vôlei de praia'},
{'nome': 'Marcos Soares', 'modalidade': 'Vela'},
{'nome': 'Marcus (Marquinhos)', 'modalidade': 'Basquete'},
{'nome': "Marcus D'Almeida", 'modalidade': 'Tiro com arco'},
{'nome': 'Marcus Mattioli', 'modalidade': 'Natação'},
{'nome': 'Marcus Vinícius Dias', 'modalidade': 'Basquete'},
{'nome': 'Marcus Vinícius Freire', 'modalidade': 'Vôlei'},
{'nome': 'Mari Steinbrecher', 'modalidade': 'Vôlei'},
{'nome': 'Maria Bruno', 'modalidade': 'Nado Artístico'},
{'nome': 'Maria Coutinho', 'modalidade': 'Nado Artístico'},
{'nome': 'Maria Lenk', 'modalidade': 'Natação'},
{'nome': 'Maria Miccuci', 'modalidade': 'Desportos Aquaticos'},
{'nome': 'Mariany Nonaka', 'modalidade': 'Tênis de mesa'},
{'nome': 'Marquinhos', 'modalidade': 'Futebol'},
{'nome': 'Marta', 'modalidade': 'Futebol'},
{'nome': 'Marta Sobral', 'modalidade': 'Basquete'},
{'nome': 'Martine Grael', 'modalidade': 'Vela'},
{'nome': 'Massinet Sorcinelli', 'modalidade': 'Basquete'},
{'nome': 'Matheus Cunha', 'modalidade': 'Futebol'},
{'nome': 'Matheus Henrique', 'modalidade': 'Futebol'},
{'nome': 'Maurício Borges', 'modalidade': 'Vôlei'},
{'nome': 'Maurício Lima', 'modalidade': 'Vôlei'},
{'nome': 'Maurício Souza', 'modalidade': 'Vôlei'},
{'nome': 'Maurine', 'modalidade': 'Futebol'},
{'nome': 'Mauro Galvão', 'modalidade': 'Futebol'},
{'nome': 'Maurren Maggi', 'modalidade': 'Atletismo'},
{'nome': 'Maycon', 'modalidade': 'Futebol'},
{'nome': 'Mayra Aguiar', 'modalidade': 'Judô'},
{'nome': 'Mazinho', 'modalidade': 'Futebol'},
{'nome': 'Melânia Luz', 'modalidade': 'Atletismo'},
{'nome': 'Milton Cruz', 'modalidade': 'Futebol'},
{'nome': 'Milton Luiz', 'modalidade': 'Futebol'},
{'nome': "Miriam D'Agostini", 'modalidade': 'Tênis'},
{'nome': 'Mônica de Paula', 'modalidade': 'Futebol'},
{'nome': 'Mônica Rodrigues', 'modalidade': 'Vôlei de praia'},
{'nome': 'Montanaro', 'modalidade': 'Vôlei'},
{'nome': 'Mosquito', 'modalidade': 'Basquete'},
{'nome': 'Moysés Blás', 'modalidade': 'Basquete'},
{'nome': 'Murilo Endres', 'modalidade': 'Vôlei'},
{'nome': 'Nalbert', 'modalidade': 'Vôlei'},
{'nome': 'Narciso', 'modalidade': 'Futebol'},
{'nome': 'Natália Falavigna', 'modalidade': 'Taekwondo'},
{'nome': 'Natália Gaudio', 'modalidade': 'Ginástica Rítmica'},
{'nome': 'Natalia Zilio', 'modalidade': 'Vôlei'},
{'nome': 'Nelson Falcão', 'modalidade': 'Vela'},
{'nome': 'Nelson Pessoa', 'modalidade': 'Hipismo Saltos'},
{'nome': 'Nelson Prudêncio', 'modalidade': 'Atletismo'},
{'nome': 'Nenê Hilário', 'modalidade': 'Basquete'},
{'nome': 'Neymar', 'modalidade': 'Futebol'},
{'nome': 'Nilton Pacheco', 'modalidade': 'Basquete'},
{'nome': 'Nino', 'modalidade': 'Futebol'},
{'nome': 'Norberto Murara Neto', 'modalidade': 'Futebol'},
{'nome': 'Oscar dos Santos', 'modalidade': 'Futebol'},
{'nome': 'Pâmela Nogueira', 'modalidade': 'Nado Artístico'},
{'nome': 'Pâmella Oliveira', 'modalidade': 'Triatlo'},
{'nome': 'Pampa', 'modalidade': 'Vôlei'},
{'nome': 'Paula Pequeno', 'modalidade': 'Vôlei'},
{'nome': 'Paulão', 'modalidade': 'Vôlei'},
{'nome': 'Paulinho', 'modalidade': 'Futebol'},
{'nome': 'Paulo André', 'modalidade': 'Atletismo'},
{'nome': 'Paulo Henrique Ganso', 'modalidade': 'Futebol'},
{'nome': 'Paulo Santos', 'modalidade': 'Futebol'},
{'nome': 'Pedro Barros', 'modalidade': 'Skate'},
{'nome': 'Pepê Gonçalves', 'modalidade': 'Canoagem Slalom'},
{'nome': 'Peter Ficker', 'modalidade': 'Vela'},
{'nome': 'Pinga', 'modalidade': 'Futebol'},
{'nome': 'Poliana Medeiros', 'modalidade': 'Futebol'},
{'nome': 'Poliana Okimoto', 'modalidade': 'Águas Abertas'},
{'nome': 'Pretinha', 'modalidade': 'Futebol'},
{'nome': 'Rafael Andrade', 'modalidade': 'Ginástica de Trampolim'},
{'nome': 'Rafael Hettsheimeir', 'modalidade': 'Basquete'},
{'nome': 'Rafael Luz', 'modalidade': 'Basquete'},
{'nome': 'Rafael Pereira da Silva', 'modalidade': 'Futebol'},
{'nome': 'Rafael Silva', 'modalidade': 'Judô'},
{'nome': 'Rafael Sóbis', 'modalidade': 'Futebol'},
{'nome': 'Rafaela Silva', 'modalidade': 'Judô'},
{'nome': 'Rafaelle Souza', 'modalidade': 'Futebol'},
{'nome': 'Rafinha', 'modalidade': 'Futebol'},
{'nome': 'Rafinha Alcântara', 'modalidade': 'Futebol'},
{'nome': 'Ramires', 'modalidade': 'Futebol'},
{'nome': 'Raquel Peluci', 'modalidade': 'Vôlei'},
{'nome': 'Raquel Santos', 'modalidade': 'Futebol'},
{'nome': 'Raul (Raulzinho)', 'modalidade': 'Basquete'},
{'nome': 'Rayssa Leal', 'modalidade': 'Skate'},
{'nome': 'Rebeca Andrade', 'modalidade': 'Ginástica Artística'},
{'nome': 'Reinaldo Conrad', 'modalidade': 'Vela'},
{'nome': 'Renan Brito Soares', 'modalidade': 'Futebol'},
{'nome': 'Renan Dal Zotto', 'modalidade': 'Vôlei'},
{'nome': 'Renata Costa', 'modalidade': 'Futebol'},
{'nome': 'Renato Augusto', 'modalidade': 'Futebol'},
{'nome': 'Ricarda', 'modalidade': 'Vôlei'},
{'nome': 'Ricardinho', 'modalidade': 'Vôlei'},
{'nome': 'Ricardo Gomes', 'modalidade': 'Futebol'},
{'nome': 'Ricardo Graça', 'modalidade': 'Futebol'},
{'nome': 'Ricardo Lucarelli', 'modalidade': 'Vôlei'},
{'nome': 'Ricardo Prado', 'modalidade': 'Natação'},
{'nome': 'Ricardo Santos', 'modalidade': 'Vôlei de praia'},
{'nome': 'Richarlison', 'modalidade': 'Futebol'},
{'nome': 'Rivaldo', 'modalidade': 'Futebol'},
{'nome': 'Robert Scheidt', 'modalidade': 'Vela'},
{'nome': 'Roberta Ratzke', 'modalidade': 'Vôlei'},
{'nome': 'Roberto Carlos', 'modalidade': 'Futebol'},
{'nome': 'Robson Caetano', 'modalidade': 'Atletismo'},
{'nome': 'Robson Conceição', 'modalidade': 'Boxe'},
{'nome': 'Rodrigão', 'modalidade': 'Vôlei'},
{'nome': 'Rodrigo Caio', 'modalidade': 'Futebol'},
{'nome': 'Rodrigo Dourado', 'modalidade': 'Futebol'},
{'nome': 'Rodrigo Pessoa', 'modalidade': 'Hipismo Saltos'},
{'nome': 'Rogério Sampaio', 'modalidade': 'Judô'},
{'nome': 'Romário', 'modalidade': 'Futebol'},
{'nome': 'Rômulo Monteiro', 'modalidade': 'Futebol'},
{'nome': 'Ronaldinho Gaúcho', 'modalidade': 'Futebol'},
{'nome': 'Ronaldo Guiaro', 'modalidade': 'Futebol'},
{'nome': 'Ronaldo Moraes', 'modalidade': 'Futebol'},
{'nome': 'Ronaldo Nazário', 'modalidade': 'Futebol'},
{'nome': 'Ronaldo Senfft', 'modalidade': 'Vela'},
{'nome': 'Rosa Branca', 'modalidade': 'Basquete'},
{'nome': 'Rosamaria', 'modalidade': 'Vôlei'},
{'nome': 'Rosana Augusto', 'modalidade': 'Futebol'},
{'nome': 'Rosângela Santos', 'modalidade': 'Atletismo'},
{'nome': 'Roseli de Belo', 'modalidade': 'Futebol'},
{'nome': 'Roseli Gustavo', 'modalidade': 'Basquete'},
{'nome': 'Rosemar Coelho Neto', 'modalidade': 'Atletismo'},
{'nome': 'Rui Campos', 'modalidade': 'Vôlei'},
{'nome': 'Ruy de Freitas', 'modalidade': 'Basquete'},
{'nome': 'Samuel Fuchs', 'modalidade': 'Vôlei'},
{'nome': 'Sandra Pires', 'modalidade': 'Vôlei de praia'},
{'nome': 'Sandra Suruagy', 'modalidade': 'Vôlei'},
{'nome': 'Sandro Raniere', 'modalidade': 'Futebol'},
{'nome': 'Sandro Viana', 'modalidade': 'Atletismo'},
{'nome': 'Santos', 'modalidade': 'Futebol'},
{'nome': 'Sarah Menezes', 'modalidade': 'Judô'},
{'nome': 'Sassá', 'modalidade': 'Vôlei'},
{'nome': 'Sávio', 'modalidade': 'Futebol'},
{'nome': 'Sebastián Cuattrin', 'modalidade': 'Canoagem Velocidade'},
{'nome': 'Sebástian Pereira', 'modalidade': 'Judô'},
{'nome': 'Sebastião Wolf', 'modalidade': 'Tiro esportivo'},
{'nome': 'Serginho', 'modalidade': 'Vôlei'},
{'nome': 'Sérgio Macarrão', 'modalidade': 'Basquete'},
{'nome': 'Servílio de Oliveira', 'modalidade': 'Boxe'},
{'nome': 'Sheilla Castro', 'modalidade': 'Vôlei'},
{'nome': 'Shelda', 'modalidade': 'Vôlei de praia'},
{'nome': 'Sidão', 'modalidade': 'Vôlei'},
{'nome': 'Silvinha Luz', 'modalidade': 'Basquete'},
{'nome': 'Silvinho', 'modalidade': 'Futebol'},
{'nome': 'Simone Jatobá', 'modalidade': 'Futebol'},
{'nome': 'Sucar', 'modalidade': 'Basquete'},
{'nome': 'Sylvio Padilha', 'modalidade': 'Atletismo'},
{'nome': 'Taffarel', 'modalidade': 'Futebol'},
{'nome': 'Talmo', 'modalidade': 'Vôlei'},
{'nome': 'Tamires Gomes', 'modalidade': 'Futebol'},
{'nome': 'Tandara', 'modalidade': 'Vôlei'},
{'nome': 'Tande', 'modalidade': 'Vôlei'},
{'nome': 'Tânia Maranhão', 'modalidade': 'Futebol'},
{'nome': 'Tetsuo Okamoto', 'modalidade': 'Natação'},
{'nome': 'Thaisa Daher', 'modalidade': 'Vôlei'},
{'nome': 'Thaisa Moreno', 'modalidade': 'Futebol'},
{'nome': 'Thaissa Barbosa Presti', 'modalidade': 'Atletismo'},
{'nome': 'Thiago Alves', 'modalidade': 'Vôlei'},
{'nome': 'Thiago Braz', 'modalidade': 'Atletismo'},
{'nome': 'Thiago Maia', 'modalidade': 'Futebol'},
{'nome': 'Thiago Neves', 'modalidade': 'Futebol'},
{'nome': 'Thiago Pereira', 'modalidade': 'Natação'},
{'nome': 'Thiago Silva', 'modalidade': 'Futebol'},
{'nome': 'Thiagus Petrus', 'modalidade': 'Handebol'},
{'nome': 'Tiago Camilo', 'modalidade': 'Judô'},
{'nome': 'Tonho Gil', 'modalidade': 'Futebol'},
{'nome': 'Torben Grael', 'modalidade': 'Vela'},
{'nome': 'Ubiratan', 'modalidade': 'Basquete'},
{'nome': 'Uilson', 'modalidade': 'Futebol'},
{'nome': 'Valdo', 'modalidade': 'Futebol'},
{'nome': 'Valeskinha', 'modalidade': 'Vôlei'},
{'nome': 'Vanderlei Cordeiro de Lima', 'modalidade': 'Atletismo'},
{'nome': 'Vicente Lenílson', 'modalidade': 'Atletismo'},
{'nome': 'Victor Mirshawka', 'modalidade': 'Basquete'},
{'nome': 'Virna', 'modalidade': 'Vôlei'},
{'nome': 'Vitor Benite', 'modalidade': 'Basquete'},
{'nome': 'Walace', 'modalidade': 'Futebol'},
{'nome': 'Waldemar Blatkauskas', 'modalidade': 'Basquete'},
{'nome': 'Waldyr Boccardo', 'modalidade': 'Basquete'},
{'nome': 'Walewska', 'modalidade': 'Vôlei'},
{'nome': 'Wallace Souza', 'modalidade': 'Vôlei'},
{'nome': 'Walter Carmona', 'modalidade': 'Judô'},
{'nome': 'Weverton', 'modalidade': 'Futebol'},
{'nome': 'William Arjona', 'modalidade': 'Vôlei'},
{'nome': 'William Carvalho', 'modalidade': 'Vôlei'},
{'nome': 'William Furtado', 'modalidade': 'Futebol'},
{'nome': 'Wlamir Marques', 'modalidade': 'Basquete'},
{'nome': 'Xandó', 'modalidade': 'Vôlei'},
{'nome': 'Yamaguchi Falcão', 'modalidade': 'Boxe'},
{'nome': 'Yane Marques', 'modalidade': 'Pentatlo Moderno'},
{'nome': 'Ygor Coelho', 'modalidade': 'Badminton'},
{'nome': 'Zagallo', 'modalidade': 'Futebol'},
{'nome': 'Zaine', 'modalidade': 'Basquete'},
{'nome': 'Zé Carlos', 'modalidade': 'Futebol'},
{'nome': 'Zé Elias', 'modalidade': 'Futebol'},
{'nome': 'Zé Marco', 'modalidade': 'Vôlei de praia'},
{'nome': 'Zé Maria', 'modalidade': 'Futebol'},
{'nome': 'Zé Roberto Guimarães', 'modalidade': 'Vôlei'},
{'nome': 'Zeca', 'modalidade': 'Futebol'}]
```

### Data

Já no exemplo dos leitos no Rio de Janeiro, não há paginação: o que muda é a data de competência. E tal data fica exposta na URL, no formato `{aaaa}{mm}` (ano com 4 dígitos seguido por mês com 2 dígitos):

- VComp=202304 para dados de abril de 2023
- VComp=202303 para dados de março de 2023
- VComp=202302 para dados de fevereiro de 2023
- etc.

Ou seja, para pegar todas as datas, eu preciso iterar sobre datas e alterar na URL. Para isso podemos usar bibliotecas nativas de Python, como `datetime` e `dateutil`:

```py
from datetime import date
from dateutil import rrule

datas = list() # crio uma lista vazia...
end_date = date(2023, 4, 1) # defino a data final do período (1.4.2023)
start_date = date(2022, 1, 1) # defino a data inicial do período (1.1.2022)

# rrule lida com regras de recorrência de datas (por exemplo, há meses 
# com 31 dias e mês com 28 dias); especifico aqui que as datas serão
# mensais, e indico onde começa e onde termina o período
for dt in rrule.rrule(rrule.MONTHLY, dtstart=start_date, until=end_date):
    # strftime() converte data para string, no formato que desejo
    # aqui, %Y%m representa:
    # - %Y: ano com quatro dígitos
    # - %m: mês com dois dígitos
    # para mais opções, veja: 
    # https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes
    datas.append(dt.strftime("%Y%m")) 

print(datas)
```
```textfile
['202201', '202202', '202203', '202204', '202205', 
'202206', '202207', '202208', '202209', '202210', 
'202211', '202212', '202301', '202302', '202303', 
'202304']
```

Agora que criamos uma lista de datas no exato formato que a URL pede, podemos iterar:

```py
for dt in datas:
    url = f"http://cnes2.datasus.gov.br/Mod_Ind_Tipo_Leito.asp?VEstado=33&VMun=&VComp={dt}"
    req = requests.get(url, verify=False)
    soup = bs(req.text, 'html.parser')
    tables = soup.find_all('table')[5]
    print(tables.find_all('tr')[2])
```
```textfile
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202201">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">140</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">58</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202202">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">140</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">58</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202203">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">140</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">58</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202204">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">138</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">58</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202205">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">133</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">60</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202206">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">142</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">60</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202207">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">142</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">60</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202208">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">142</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">60</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202209">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">132</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">57</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202210">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">142</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">57</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202211">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">142</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">57</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202212">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">143</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">57</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202301">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">141</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">57</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202302">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">141</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">57</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202303">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">141</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">57</font></td></tr>
<tr bgcolor="#cccccc">
<td align="center"><font color="#003366" face="verdana,arial" size="1">01</font></td>
<td>
<font color="#003366" face="verdana,arial" size="1">
<a href="Mod_Ind_Leitos_Listar.asp?VCod_Leito=01&amp;VTipo_Leito=1&amp;VListar=1&amp;VEstado=33&amp;VMun=&amp;VComp=202304">BUCO MAXILO FACIAL
                                                                                        </a>
</font>
</td><td align="right"><font color="#003366" face="verdana,arial" size="1">142</font></td><td align="right"><font color="#003366" face="verdana,arial" size="1">56</font></td></tr>
```

Com pequenos ajustes, o código limpo fica assim:

```py
from datetime import date
from dateutil import rrule
import pandas as pd
import requests
from bs4 import BeautifulSoup as bs
import urllib3
urllib3.disable_warnings()

end_date = date(2023, 4, 1)
start_date = date(2022, 1, 1)

dados = list()
for dt in rrule.rrule(rrule.MONTHLY, dtstart=start_date, until=end_date):
    url = f"http://cnes2.datasus.gov.br/Mod_Ind_Tipo_Leito.asp?VEstado=33&VMun=&VComp={dt.strftime('%Y%m')}"
    req = requests.get(url, verify=False)
    soup = bs(req.text, 'html.parser')
    tables = soup.find_all('table')[5]
    trs = tables.find_all('tr', {"bgcolor": "#cccccc"})
    for tr in trs:
        dicio = {
            "competencia": dt.strftime('%Y-%m'),
            "codigo": tr.find_all('td')[0].text.strip(),
            "descicao": tr.find_all('td')[1].text.strip(),
            "lt_existente": int(tr.find_all('td')[2].text.strip()),
            "lt_sus": int(tr.find_all('td')[3].text.strip())
        }
        dados.append(dicio)
df = pd.DataFrame(dados)
print(df)
```
```textfile
     competencia codigo                                           descicao  lt_existente  lt_sus
0        2022-01     01                                 BUCO MAXILO FACIAL           140      58
1        2022-01     02                                        CARDIOLOGIA           543     316
2        2022-01     03                                     CIRURGIA GERAL          3916    2014
3        2022-01     04                                     ENDOCRINOLOGIA            49      10
4        2022-01     05                                  GASTROENTEROLOGIA           143      52
...          ...    ...                                                ...           ...     ...
1027     2023-04     86            UTI CORONARIANA TIPO III - UCO TIPO III            63       0
1028     2023-04     92  UNIDADE DE CUIDADOS INTERMEDIARIOS NEONATAL CO...           395     221
1029     2023-04     93  UNIDADE DE CUIDADOS INTERMEDIARIOS NEONATAL CA...            84      64
1030     2023-04     94      UNIDADE DE CUIDADOS INTERMEDIARIOS PEDIATRICO            79      50
1031     2023-04     95          UNIDADE DE CUIDADOS INTERMEDIARIOS ADULTO           779     416
```

{{< /expandable >}}

{{< expandable label="Raspagem de múltiplas páginas: URL no código-fonte" level="2" >}}

Em muitos casos, os dados que buscamos não estão numa URL, mas sim em __URLs dentro do código da URL__. Tomemos por exemplo o site Busca de Pedidos e Respostas, da CGU, onde é possível ver todas as solicitações feitas via LAI aos órgãos e entidades do governo federal — para este exemplo, vamos usar a Petrobrás: https://buscalai.cgu.gov.br/?handler=search&ConsultaBasica.TermoPesquisa=&ConsultaBasica.IdOuvidoriaSelecionada=311&ConsultaBasica.OuvidoriaSelecionada=PETROBRAS+%E2%80%93+Petr%C3%B3leo+Brasileiro+S.A.&estados-simples=311&ConsultaBasica.IdTipoDecisaoSelecionada=&ConsultaBasica.TipoDecisaoSelecionada=&numPagina=0&maximoRegistrosPorPagina=30

Notem que, ao entrar no link, temos algumas informações interessantes:

- o título da solicitação
- as primeiras linhas do pedido
- o resultado (se o acesso foi concedido, se não foi etc.)
- a data da solicitação

Apesar de interessantes, não há todas as informações ali: para ler a solicitação na íntegra e ver a resposta também na íntegra, é preciso clicar no link. Aí, sim, é aberta outra página com as informações.

Para raspar essa página, portanto, teríamos de:

- entrar na URL inicial
- capturar na URL inicial:
    - título
    - status
    - data/hora
    - URL da página de detalhes
- entrar na URL da página de detalhes
- capturar na URL da página de detalhes
    - pedido na íntegra
    - resposta na íntegra

Reparem que, em determinado momento, estaremos fazendo __raspagem de uma URL que conseguimos na raspagem de outra URL__.

### Links

Apesar de parecer coisa do filme _Inception_, em que personagens sonham dentro de sonhos dentro de sonhos, é bastante simples obter a URL de dentro de uma URL. Vejamos um comparativo no exemplo abaixo:

```html
<html>
    <head>
        <title>Site sobre Aleatoriedades</title>
    </head>
    <body>
        <h1>Bem-vindo ao Site sobre Aleatoriedades!</h1>
        <a href="https://sitesobrealeatoriedades/posts_antigos">Clique aqui para ver posts antigos</a>
    </body>
</html>
```

Para raspar este site, sobretudo a tag a, usamos, até o momento:

```py
import requests
from bs4 import BeautifulSoup as bs

url = "https://sitesobrealeatoriedades"
req = requests.get(url)
soup = bs(req.text, 'html.parser')
link = soup.find('a').text
```

O código acima retorna como resultado _Clique aqui para ver posts antigos_. Ele retorna o texto do link.

Se eu mudar ligeiramente o código...

```py
import requests
from bs4 import BeautifulSoup as bs

url = "https://sitesobrealeatoriedades"
req = requests.get(url)
soup = bs(req.text, 'html.parser')
link = soup.find('a')['href']
```

...ele me trará o valor de `href` &mdash;ou seja, a URL https://sitesobrealeatoriedades/posts_antigos.

Consigo, assim, fazer outra requisição de Request para raspar https://sitesobrealeatoriedades/posts_antigos:

```py
import requests
from bs4 import BeautifulSoup as bs

url = "https://sitesobrealeatoriedades"
req = requests.get(url)
soup = bs(req.text, 'html.parser')
link = soup.find('a')['href']
req_de_novo = requests.get(link)
soup_de_novo = bs(req_de_novo, 'html.parser')
[etc.]
```

Daí a ideia de raspar dados de uma URL que está dentro de outra URL!

No exemplo dos pedidos via LAI à Petrobrás, a raspagem da página inicial seria assim:

```py
import requests
from bs4 import BeautifulSoup as bs
import urllib3
urllib3.disable_warnings()

url = "https://buscalai.cgu.gov.br/?handler=search&ConsultaBasica.TermoPesquisa=&ConsultaBasica.IdOuvidoriaSelecionada=311&ConsultaBasica.OuvidoriaSelecionada=PETROBRAS+%E2%80%93+Petr%C3%B3leo+Brasileiro+S.A.&estados-simples=311&ConsultaBasica.IdTipoDecisaoSelecionada=&ConsultaBasica.TipoDecisaoSelecionada=&numPagina=0&maximoRegistrosPorPagina=30"
req = requests.get(url, verify=False)
soup = bs(req.text, 'html.parser')
table = soup.find('div', {'id': 'Groups'})
divs = table.find_all('div', {'id': 'PedidoLai'})
for i in divs:
    titulo = i.find('a').text.strip() # estamos raspando o **texto** do link
    print(titulo)
```
```textfile
Solicitação de Contrato
Acesso a contratos e edital de pré-qualificação
Acesso aos documentos contratuais do ICJ 5900.0120767.22.2 - AHTS - Área Submarina
Solicitação de contrato firmado entre a Petrobras e o consórcio 3T FLEXIVEIS
Solicitação de arquivos de contrato
Comite de pessoas
Solicitação de Minuta contratual
Solicitação de informações de contrato
Solicitação de Contrato
Acesso à informação - contrato n° 4600558214
Solicito o instrumento contratual numero 4600672816, contrato com a DGC SERVIÇOS PARA MONTAGENS e todos os seus anexos.
Solicitação de Contrato
lista das embarcações do tipo AHTS E AHTS-r EM CONTRATO COM a Petrobras
Incêndio Vila Socó - Cubatão 1984
acesso a lista das embarcações do tipo sdSV contratadas pela Petrobras desde 2018
acesso a lista das embarcações do tipo RSV contratadas pela Petrobras desde 2018
Resultado - Processo Administrativo
Solicitação de Contrato
Solicitação de Contrato
Protocolo CGU Manifestação 48023.000237.2023-53
Contratação de terceirizados
INFORMAÇÕES EMPRESA NUTRI SABOR
cópias dos Aditivos N. 1 e N. 2 do contrato ICJ N. 5900.0114051.20.2
Acesso aos arquivos do Projeto Memória Petrobras
Presença de pregoeiros na apólice de seguros de D&O
cópia do contrato SAP N. 4600665424
Salários - Força de Trabalho Terceirizada
Solicitação de Ficha de Registro de Empregado (FRE)
Solicitação Dados/Informações Detalhadas Processo 7003948897 / Número do ICJ 5900.0123076.22.2
Número de Engenheiros Mecânicos Terceirizados
```

Mas se adicionarmos para pegar as informações de `href`, teremos isso:

```py
import requests
from bs4 import BeautifulSoup as bs
import urllib3
urllib3.disable_warnings()

url = "https://buscalai.cgu.gov.br/?handler=search&ConsultaBasica.TermoPesquisa=&ConsultaBasica.IdOuvidoriaSelecionada=311&ConsultaBasica.OuvidoriaSelecionada=PETROBRAS+%E2%80%93+Petr%C3%B3leo+Brasileiro+S.A.&estados-simples=311&ConsultaBasica.IdTipoDecisaoSelecionada=&ConsultaBasica.TipoDecisaoSelecionada=&numPagina=0&maximoRegistrosPorPagina=30"
req = requests.get(url, verify=False)
soup = bs(req.text, 'html.parser')
table = soup.find('div', {'id': 'Groups'})
divs = table.find_all('div', {'id': 'PedidoLai'})
for i in divs:
    titulo = i.find('a').text.strip() # estamos raspando o **texto** do link
    link = i.find('a')['href'] # estamos raspando a URL, o dado contido em `href`
    print(titulo)
    print(link)
```
```textfile
Solicitação de Contrato
/PedidosLai/DetalhePedido?id=5517882
Acesso a contratos e edital de pré-qualificação
/PedidosLai/DetalhePedido?id=5515575
Acesso aos documentos contratuais do ICJ 5900.0120767.22.2 - AHTS - Área Submarina
/PedidosLai/DetalhePedido?id=5445309
Solicitação de contrato firmado entre a Petrobras e o consórcio 3T FLEXIVEIS
/PedidosLai/DetalhePedido?id=5449256
Solicitação de arquivos de contrato
/PedidosLai/DetalhePedido?id=5475834
Comite de pessoas
/PedidosLai/DetalhePedido?id=5454910
Solicitação de Minuta contratual
/PedidosLai/DetalhePedido?id=5528990
Solicitação de informações de contrato
/PedidosLai/DetalhePedido?id=5532490
Solicitação de Contrato
/PedidosLai/DetalhePedido?id=5518039
Acesso à informação - contrato n° 4600558214
/PedidosLai/DetalhePedido?id=5438903
Solicito o instrumento contratual numero 4600672816, contrato com a DGC SERVIÇOS PARA MONTAGENS e todos os seus anexos.
/PedidosLai/DetalhePedido?id=5513451
Solicitação de Contrato
/PedidosLai/DetalhePedido?id=5518027
lista das embarcações do tipo AHTS E AHTS-r EM CONTRATO COM a Petrobras
/PedidosLai/DetalhePedido?id=5493665
Incêndio Vila Socó - Cubatão 1984
/PedidosLai/DetalhePedido?id=5414676
acesso a lista das embarcações do tipo sdSV contratadas pela Petrobras desde 2018
/PedidosLai/DetalhePedido?id=5495607
acesso a lista das embarcações do tipo RSV contratadas pela Petrobras desde 2018
/PedidosLai/DetalhePedido?id=5493624
Resultado - Processo Administrativo
/PedidosLai/DetalhePedido?id=5399173
Solicitação de Contrato
/PedidosLai/DetalhePedido?id=5518006
Solicitação de Contrato
/PedidosLai/DetalhePedido?id=5517987
Protocolo CGU Manifestação 48023.000237.2023-53
/PedidosLai/DetalhePedido?id=5422449
Contratação de terceirizados
/PedidosLai/DetalhePedido?id=5460922
INFORMAÇÕES EMPRESA NUTRI SABOR
/PedidosLai/DetalhePedido?id=5536376
cópias dos Aditivos N. 1 e N. 2 do contrato ICJ N. 5900.0114051.20.2
/PedidosLai/DetalhePedido?id=5489407
Acesso aos arquivos do Projeto Memória Petrobras
/PedidosLai/DetalhePedido?id=5494879
Presença de pregoeiros na apólice de seguros de D&O
/PedidosLai/DetalhePedido?id=5440891
cópia do contrato SAP N. 4600665424
/PedidosLai/DetalhePedido?id=5375540
Salários - Força de Trabalho Terceirizada
/PedidosLai/DetalhePedido?id=5505415
Solicitação de Ficha de Registro de Empregado (FRE)
/PedidosLai/DetalhePedido?id=5476472
Solicitação Dados/Informações Detalhadas Processo 7003948897 / Número do ICJ 5900.0123076.22.2
/PedidosLai/DetalhePedido?id=5505799
Número de Engenheiros Mecânicos Terceirizados
/PedidosLai/DetalhePedido?id=5462255
```

Notem que temos o final da URL, mas o começo, não. Podemos acrescentar o começo...

```py
import requests
from bs4 import BeautifulSoup as bs
import urllib3
urllib3.disable_warnings()

url = "https://buscalai.cgu.gov.br/?handler=search&ConsultaBasica.TermoPesquisa=&ConsultaBasica.IdOuvidoriaSelecionada=311&ConsultaBasica.OuvidoriaSelecionada=PETROBRAS+%E2%80%93+Petr%C3%B3leo+Brasileiro+S.A.&estados-simples=311&ConsultaBasica.IdTipoDecisaoSelecionada=&ConsultaBasica.TipoDecisaoSelecionada=&numPagina=0&maximoRegistrosPorPagina=30"
req = requests.get(url, verify=False)
soup = bs(req.text, 'html.parser')
table = soup.find('div', {'id': 'Groups'})
divs = table.find_all('div', {'id': 'PedidoLai'})
for i in divs:
    titulo = i.find('a').text.strip()
    link = f"https://buscalai.cgu.gov.br{i.find('a')['href']}"
    print(titulo)
    print(link)
```
```textfile
Solicitação de Contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5517882
Acesso a contratos e edital de pré-qualificação
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5515575
Acesso aos documentos contratuais do ICJ 5900.0120767.22.2 - AHTS - Área Submarina
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5445309
Solicitação de contrato firmado entre a Petrobras e o consórcio 3T FLEXIVEIS
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5449256
Solicitação de arquivos de contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5475834
Comite de pessoas
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5454910
Solicitação de Minuta contratual
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5528990
Solicitação de informações de contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5532490
Solicitação de Contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5518039
Acesso à informação - contrato n° 4600558214
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5438903
Solicito o instrumento contratual numero 4600672816, contrato com a DGC SERVIÇOS PARA MONTAGENS e todos os seus anexos.
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5513451
Solicitação de Contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5518027
lista das embarcações do tipo AHTS E AHTS-r EM CONTRATO COM a Petrobras
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5493665
Incêndio Vila Socó - Cubatão 1984
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5414676
acesso a lista das embarcações do tipo sdSV contratadas pela Petrobras desde 2018
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5495607
acesso a lista das embarcações do tipo RSV contratadas pela Petrobras desde 2018
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5493624
Resultado - Processo Administrativo
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5399173
Solicitação de Contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5518006
Solicitação de Contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5517987
Protocolo CGU Manifestação 48023.000237.2023-53
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5422449
Contratação de terceirizados
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5460922
INFORMAÇÕES EMPRESA NUTRI SABOR
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5536376
cópias dos Aditivos N. 1 e N. 2 do contrato ICJ N. 5900.0114051.20.2
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5489407
Acesso aos arquivos do Projeto Memória Petrobras
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5494879
Presença de pregoeiros na apólice de seguros de D&O
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5440891
cópia do contrato SAP N. 4600665424
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5375540
Salários - Força de Trabalho Terceirizada
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5505415
Solicitação de Ficha de Registro de Empregado (FRE)
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5476472
Solicitação Dados/Informações Detalhadas Processo 7003948897 / Número do ICJ 5900.0123076.22.2
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5505799
Número de Engenheiros Mecânicos Terceirizados
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5462255
```

...E, por fim, podemos pedir ao código para entrar em cada link e capturar a informação que desejarmos &mdash;via requisição de Request.

```py
import requests
from bs4 import BeautifulSoup as bs
import urllib3
urllib3.disable_warnings()

url = "https://buscalai.cgu.gov.br/?handler=search&ConsultaBasica.TermoPesquisa=&ConsultaBasica.IdOuvidoriaSelecionada=311&ConsultaBasica.OuvidoriaSelecionada=PETROBRAS+%E2%80%93+Petr%C3%B3leo+Brasileiro+S.A.&estados-simples=311&ConsultaBasica.IdTipoDecisaoSelecionada=&ConsultaBasica.TipoDecisaoSelecionada=&numPagina=0&maximoRegistrosPorPagina=30"
req = requests.get(url, verify=False)
soup = bs(req.text, 'html.parser')
table = soup.find('div', {'id': 'Groups'})
divs = table.find_all('div', {'id': 'PedidoLai'})
for i in divs:
    titulo = i.find('a').text.strip()
    link = f"https://buscalai.cgu.gov.br{i.find('a')['href']}" # o script pega a URL...
    req = requests.get(link, verify=False) # ...entra na URL e começa a raspagem
    soup = bs(req.text, 'html.parser')
    rows = soup.find_all('div', {"class": 'row'})[1:3]
    pedido = rows[0].find('p').text.strip()
    print(titulo)
    print(link)
    print(pedido)    
```
```textfile
Solicitação de Contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5517882
Prezados Senhores, bom dia.

Solicito a cópia do contrato número 4600627562 firmado entre a Petróleo Brasileiro S.A. – PETROBRAS e a ALFA LAVAL LTDA., inscrita no CNPJ 43.474.212/0003-85 seus respectivos documentos anexos e aditivos.

Solicito que as informações sejam fornecidas em formato digital, quando disponíveis, conforme estabelece o artigo 11, parágrafo 5º da lei 12.527/2011. Na eventualidade de as informações solicitadas não serem fornecidas, requeiro que seja apontada a razão da negativa bem como, se for o caso, eventual grau de classificação de sigilo (ultrassecreto, secreto ou reservado), tudo nos termos do artigo 24, parágrafo 1º da Lei 12.527/2011.

Antecipadamente agradeço.

Atenciosamente,

Nilton Viana
Acesso a contratos e edital de pré-qualificação
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5515575
Prezados,
Solicito a cópia dos contratos 4600645610 e 4600645625 bem como o edital de pré-qualificação que elegeu as licenças da Salesforce como provedor de CRM da Petrobras com vistas a conhecer o processo utilizado e avaliar sua aderência ao processo de compra de licenças de CRM do Banco do Nordeste.
Acesso aos documentos contratuais do ICJ 5900.0120767.22.2 - AHTS - Área Submarina
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5445309
Solicitamos gentilmente acesso aos documentos contratuais do ICJ 5900.0120767.22.2 - AHTS - Área Submarina.
Solicitação de contrato firmado entre a Petrobras e o consórcio 3T FLEXIVEIS
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5449256
Prezados Srs., 

Venho através desta solicitar o contrato firmado entre as unidades administrativas 910816 - Petróleo Brasileiro S.A. e o consórcio 3T FLEXIVEIS, de CNPJ: 41.537.026/0001-50, cujo o número do contrato celebrado é: 4600662510. Com o ICJ de nº 5900.0119513.21.2. 

Agradeço desde já.
Solicitação de arquivos de contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5475834
SOLICITO ENVIO DO CONTRATO N° DO ICJ 5900.0116609.20.2, JUNTAMENTE COM OS RESPECTIVOS ANEXOS E SEUS ADITIVOS PARA FINS DE ESTUDO PARA A LICITAÇÃO QUE ESTÁ OCORRENDO. NO AGUARDO COM BREVIDADE. AGRADEÇO DESDE JÁ.
Comite de pessoas
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5454910
Gostaria de saber em que data we reunirá o Comitê de Pessoas da estatal, quais os membros do comitê bem como suas atribuições. Gostaria tambem de ter acesso ao relatório do Comitê a respeito das 2 ultimas nomeações de conselheiros da estatal.
Solicitação de Minuta contratual
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5528990
Prezados, poderiam disponibilizar a minuta contratual vigente e PPUs do contrato 4600672163, com obejto de contratação: Serviço Onshore e Offshore de Limpeza Quimica e por Hidrojateamento a ultra pressão de permutadores de calor?
Solicitação de informações de contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5532490
Prezados, solicito minuta contratual e/ou PPU do contrato 4600610870 firmado entre a Petrobras e Expander Manutenção Ltda.
Solicitação de Contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5518039
Prezados Senhores, bom dia.

Solicito a cópia do contrato número 4600610870 firmado entre a Petróleo Brasileiro S.A. – PETROBRAS e a EXPANDER MANUTENÇÃO LTDA., inscrita no CNPJ 54.240.411/0001-83 seus respectivos documentos anexos e aditivos.

Solicito que as informações sejam fornecidas em formato digital, quando disponíveis, conforme estabelece o artigo 11, parágrafo 5º da lei 12.527/2011. Na eventualidade de as informações solicitadas não serem fornecidas, requeiro que seja apontada a razão da negativa bem como, se for o caso, eventual grau de classificação de sigilo (ultrassecreto, secreto ou reservado), tudo nos termos do artigo 24, parágrafo 1º da Lei 12.527/2011.

Antecipadamente agradeço.

Atenciosamente,

Nilton Viana
Acesso à informação - contrato n° 4600558214
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5438903
Prezados,

Gostaria de solicitar planilha com as seguintes informações referentes ao contrato n° 4600558214 (n° contrato jurídico 0804.0106414.17.2), entre a Petrobrás e o fornecedor KERUI METODO CONSTRUCAO E MONTAGEM S.A. (CNPJ 29.479.594/0001-47):
Valores pagos ao fornecedor, separados por data de pagamento
Valores futuros a serem pagos ao fornecedor no contrato
Status do contrato - se ele segue ativo ou não
Solicito o instrumento contratual numero 4600672816, contrato com a DGC SERVIÇOS PARA MONTAGENS e todos os seus anexos.
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5513451
Solicito o instrumento contratual numero 4600672816, contrato com a DGC SERVIÇOS PARA MONTAGENS e todos os seus anexos. 
Número do ICJ:  5900.0122848.22.2
Solicitação de Contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5518027
Prezados Senhores, bom dia.

Solicito a cópia do contrato número 4600610554 firmado entre a Petróleo Brasileiro S.A. – PETROBRAS e a EXPANDER MANUTENÇÃO LTDA., inscrita no CNPJ 54.240.411/0001-83 seus respectivos documentos anexos e aditivos.

Solicito que as informações sejam fornecidas em formato digital, quando disponíveis, conforme estabelece o artigo 11, parágrafo 5º da lei 12.527/2011. Na eventualidade de as informações solicitadas não serem fornecidas, requeiro que seja apontada a razão da negativa bem como, se for o caso, eventual grau de classificação de sigilo (ultrassecreto, secreto ou reservado), tudo nos termos do artigo 24, parágrafo 1º da Lei 12.527/2011.

Antecipadamente agradeço.

Atenciosamente,

Nilton Viana
lista das embarcações do tipo AHTS E AHTS-r EM CONTRATO COM a Petrobras
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5493665
Solicito lista das embarcações do tipo AHTS E AHTS-r contratadas pela Petrobras, identificando seu nome, empresa contratada, datas de início e término do contrato e valor do contrato. Antecipo que, pela lista pública de contratos da Petrobras, não é possível verificar todos os contratos do tipo, visto que as informações que constam do objeto contratual são, em muitos casos, incompletas e não mantêm um padrão
Incêndio Vila Socó - Cubatão 1984
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5414676
Prezados, 

por favor podem me fornecer as seguintes informações sobre o incêndio da Vila Socó, ocorrido nas instalações da empresa em 1984:
a) o número de vítimas oficiais do incêndio?
b) a relação com nome e idade das vítimas? 
c) Os resultados da Sindicância realizada para averiguar as causas e responsabilidades pelo evento?
d) O número de pessoas e famílias indenizadas?
e) A forma de indenização e os valores destinados a cada atingido?
f) Os atingidos que receberam moradias tem a posse dos imóveis ou eles são apenas cedidos pela empresa?

Aguardo retorno
Atenciosamente,
acesso a lista das embarcações do tipo sdSV contratadas pela Petrobras desde 2018
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5495607
Prezados, bom dia! Solicito acesso a lista das embarcações do tipo sdSV contratadas pela Petrobras desde 2018 até a presente data identificando: nome da embarcação, ICJ de afretamento e prestação de serviços, data base dos contratos e/ou taxa de câmbio, empresas contratadas, data de início e término do contrato, valor total dos contratos de afretamento e prestação de serviços. Desde já agradeço muitíssimo a atenção
acesso a lista das embarcações do tipo RSV contratadas pela Petrobras desde 2018
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5493624
Prezados, boa tarde! Solicito acesso a lista das embarcações do tipo RSV contratadas pela Petrobras desde 2018 até a presente data identificando: nome da embarcação, ICJ de afretamento e prestação de serviços, data base dos contratos e/ou taxa de câmbio, empresas contratadas, data de início e término do contrato, valor total dos contratos de afretamento e prestação de serviços. Desde já agradeço muitíssimo pela atenção.
Resultado - Processo Administrativo
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5399173
Prezados, 

Em 1984 ocorreu o incêndio da Vila Socó, em Cubatão no oleoduto administrado pela Transpetro. Após o incêndio houve a abertura de um PAD para investigar as causas e responsabilizações do incêndio. Quais os resultados do PAD? Por gentileza, poderiam compartilhar o documento?

Outros questionamentos referentes ao PAD: 
Qual o valor destinado pela empresa para reconstrução da comunidade? 
Quais as famílias foram contempladas? 
Quantas casas foram construídas? 
Houve alguma sanção aos servidores envolvidos?
Quais as medidas adotadas pela empresa após o incêndio para melhorar a segurança das operações?

Aguardo retorno
Solicitação de Contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5518006
Prezados Senhores, bom dia.

Solicito a cópia do contrato número 4600568704 firmado entre a Petróleo Brasileiro S.A. – PETROBRAS e a EXPANDER MANUTENÇÃO LTDA., inscrita no CNPJ 54.240.411/0001-83 seus respectivos documentos anexos e aditivos.

Solicito que as informações sejam fornecidas em formato digital, quando disponíveis, conforme estabelece o artigo 11, parágrafo 5º da lei 12.527/2011. Na eventualidade de as informações solicitadas não serem fornecidas, requeiro que seja apontada a razão da negativa bem como, se for o caso, eventual grau de classificação de sigilo (ultrassecreto, secreto ou reservado), tudo nos termos do artigo 24, parágrafo 1º da Lei 12.527/2011.

Antecipadamente agradeço.

Atenciosamente,

Nilton Viana
Solicitação de Contrato
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5517987
Prezados Senhores, bom dia.

Solicito a cópia do contrato número 4600558188 firmado entre a Petróleo Brasileiro S.A. – PETROBRAS e a EXPANDER MANUTENÇÃO LTDA., inscrita no CNPJ 54.240.411/0001-83 seus respectivos documentos anexos e aditivos.

Solicito que as informações sejam fornecidas em formato digital, quando disponíveis, conforme estabelece o artigo 11, parágrafo 5º da lei 12.527/2011. Na eventualidade de as informações solicitadas não serem fornecidas, requeiro que seja apontada a razão da negativa bem como, se for o caso, eventual grau de classificação de sigilo (ultrassecreto, secreto ou reservado), tudo nos termos do artigo 24, parágrafo 1º da Lei 12.527/2011.

Antecipadamente agradeço.

Atenciosamente,

Nilton Viana
Protocolo CGU Manifestação 48023.000237.2023-53
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5422449
O Protocolo CGU Manifestação 48023.000237.2023-53  solicitou cópia do DIP SBS/OGBS/AP 005/2017 e seus despachos.

O acesso a informação foi concedido com o envio de 3 despachos (anexos), entretanto deixaram de ser anexados outros despachos existentes no referido DIP, despachos estes relacionados aos atos de gestão do Requerente e os seus desdobramentos em atendimento ao seu Objeto.

Desta forma solicito o complemento das informações com o envio dos demais despachos.

Atenciosamente.
Contratação de terceirizados
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5460922
Gostaria de ter informação sobre a quantidade de profissionais contratados por empresas terceirizadas que atuam na PETROBRAS no cargo de Engenheiro de Segurança do Trabalho.
INFORMAÇÕES EMPRESA NUTRI SABOR
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5536376
bom dia!

Pedimos acesso a informação conforme abaixo:

RELATORIO DE TODAS AS MULTAS APLICADAS - MARCO TEMPORAL DE JANEIRO/2018 A JANEIRO/2022
RELATORIO DE TODAS AS RO - REGISTRO DE OCORRÊNCIAS - COMUNICADAS

Caso não seja possivel a Petrobras o envio dos 2 (dois) relatorios, pedimos que seja enviado relatorio com todas as multas aplicadas a referida empresa.

a empresa abaixo:

CNPJ: 02.540.779/0001-63
RAZÃO SOCIAL: HIPERSERVE S.A.
cópias dos Aditivos N. 1 e N. 2 do contrato ICJ N. 5900.0114051.20.2
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5489407
Prezados,
Solicitamos uma cópias dos Aditivos N. 1 e N. 2 do contrato ICJ N. 5900.0114051.20.2 assinado com a empresa LIDER TAXI AEREO S/A - AIR BRASIL.
Atenciosamente,
Acesso aos arquivos do Projeto Memória Petrobras
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5494879
Este projeto, que teve seu site (memória.petrobras.com.br) sumariamente retirado do ar em 2016, no início do governo Temer, deve ter seu conteúdo novamente disponibilizado ao público . Tanto por representar uma guinada na medida autoritária que foi sonegar à sociedade os resultados de um projeto bem-sucedido, quanto pela necessidade de aprofundar a preservação e conservação do acervo histórico, documental e de memória das entidades sindicais.
Afinal de contas, estamos tratando também de parte fundamental da história da própria Petrobras, que, ao completar 70 anos em 2023, reforçaria sua homenagem às organizações de seus trabalhadores que, em especial neste passado recente, tanto lutaram pela preservação de seu caráter estatal e em defesa de uma política energética a serviço da maioria do povo brasileiro.
Presença de pregoeiros na apólice de seguros de D&O
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5440891
Prezados, 
bom dia.

Por favor, podem informar se o seguro D&O contratado pela empresa contempla pregoeiros, e a justificativa para a presença ou não dessa função na apólice de seguros? O objetivo da consulta é didático, para aprimoramento dos contratos firmados pela minha empresa. 

Grato desde já.
cópia do contrato SAP N. 4600665424
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5375540
Gostaríamos de receber uma cópia do contrato SAP N. 4600665424, juntamente com todos seus Anexos e Aditivos, assinados com a empresa RINA BRASIL SERVIÇOS TECNICOS LTDA., e os nomes do Gerente e do Fiscal deste contrato.
Salários - Força de Trabalho Terceirizada
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5505415
Prezados,

Solicito informar: 

- Se o atual Sr. Presidente da Petrobras Jean Paul Prates tem conhecimento dos salários ofertados aos prestadores de serviços desde a última gestão e o seu posicionamento sobre o tema. 

2) Solicito que caso ainda não seja do conhecimento do Sr. Presidente as condições salariais dos terceirizados:

- Seja apurado por esse canal o piso salarial dos terceirizados e dado a conhecer ao Presidente esses valores monetários,

- Parecer do Presidente sobre o tema.

Os terceirizados estão padecendo com a política salarial inadequada oferecida em torno de 4 ou 5 anos (há contratos de até 1 salário mínimo e meio). Os terceirizados compõem a força de trabalho da Petrobras, alguns prestam serviços há 10, 20, 30, 40 anos e encontram dificuldades de recolocação no mercado, tendo em vista a especialização do trabalho voltada exclusivamente para o âmbito Petrobras.
Esses trabalhadores são desvalorizados pela Petrobras, não há olhar humano ou políticas de sensibilização junto às empresas terceirizadas de valorização desse capital que atua nos processos e projetos da empresa ainda que de forma indireta.

Solicito que a resposta não seja de uma área específica responsável por contratações no sistema Petrobras, que esse pedido chegue ao Sr. Presidente e tenhamos um parecer sobre o tema.

Presidente Jean, ajude os contratados da Cia, são trabalhadores e trabalhadoras vivendo em grandes centros como o Rio de Janeiro com elevado custo de vida que servem à Petrobras e em contrapartida estão sobrevivendo com salário mínimo ou pouco mais que isso, em termos gerais.

Aproveito o ensejo para externar protestos de elevada estima e consideração.
Solicitação de Ficha de Registro de Empregado (FRE)
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5476472
Fui advogada da Petrobras no período de abril a julho de 2011 e gostaria de obter a Ficha de Registro de Empregado referente ao período trabalhado na companhia.
Solicitação Dados/Informações Detalhadas Processo 7003948897 / Número do ICJ 5900.0123076.22.2
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5505799
Prezados,

Favor enviar toda documentação integrante do processo licitatório (editais, anexos, etc), bem como toda documentação integrante da contratação existente até o momento (resultado, contrato, documentos exigidos pelo Edital e já enviados pelo contratado, etc):

Órgão superior: MINISTÉRIO DE MINAS E ENERGIA
Órgão subordinado:      PETROBRAS
Unidade administrativa: 910816 - Petróleo Brasileiro S.A.
Número do Processo:     7003948897
Número do ICJ:  5900.0123076.22.2
Enquadramento do Processo:      LICITAÇÃO
CNPJ / CPF:     03784680001141
Objeto: SERVIÇOS PARA O PROGRAMA DE CONTROLE DE EMISSÕES FUGITIVAS UTILIZANDO AS METODOLOGIAS LDAR E SMARTLDAR
Valor do contrato:      R$ 2.794.706,42
Saldo bruto do contrato:        R$ 2.794.706,42
Situação:       Ativo
Número de Engenheiros Mecânicos Terceirizados
https://buscalai.cgu.gov.br/PedidosLai/DetalhePedido?id=5462255
Bom dia,

Eu gostaria de saber quantos engenheiros mecânicos atuam na Petrobras como terceirizados e quanto ainda estarão atuando, nesta condição, até agosto de 2023.

Eu poderia ter essas informação? Ou como obter tal informação?

Atenciosamente,
Obrigado.
```

O código limpo, modificado um pouco, para pegar essas e outras informações ficaria assim:

```py
import requests
from bs4 import BeautifulSoup as bs
import pandas as pd
import urllib3
urllib3.disable_warnings()

dados = list()

url = "https://buscalai.cgu.gov.br/?handler=search&ConsultaBasica.TermoPesquisa=&ConsultaBasica.IdOuvidoriaSelecionada=311&ConsultaBasica.OuvidoriaSelecionada=PETROBRAS+%E2%80%93+Petr%C3%B3leo+Brasileiro+S.A.&estados-simples=311&ConsultaBasica.IdTipoDecisaoSelecionada=&ConsultaBasica.TipoDecisaoSelecionada=&numPagina=0&maximoRegistrosPorPagina=30"
req = requests.get(url, verify=False)
soup = bs(req.text, 'html.parser')
table = soup.find('div', {'id': 'Groups'})
divs = table.find_all('div', {'id': 'PedidoLai'})
for i in divs:
    titulo = i.find('a').text.strip()
    div_detalhes = i.find('div', {'id': 'Detalhes'})
    orgao = div_detalhes.find_all('div')[0].text.strip()
    status = div_detalhes.find_all('div')[1].text.strip()
    data_hora = div_detalhes.find_all('div')[2].text.strip()
    url = f"https://buscalai.cgu.gov.br{i.find('a')['href']}"
    req = requests.get(url, verify=False)
    soup = bs(req.text, 'html.parser')
    rows = soup.find_all('div', {"class": 'row'})[1:3]
    pedido = rows[0].find('p').text.strip()
    resposta = rows[1].find('p').text.strip()
    dicio = {
        'titulo': titulo,
        'orgao': orgao,
        'status': status,
        'data_hora': data_hora,
        'pedido': pedido,
        'resposta': resposta
    }
    dados.append(dicio)
df = pd.DataFrame(dados)
print(df)
```
```textfile

                                               titulo  ...                                           resposta
0                             Solicitação de Contrato  ...  Prezado (a) Sr, (a),\r\n \r\nA Petrobras, em a...
1     Acesso a contratos e edital de pré-qualificação  ...  Prezado Senhora,\r\n\r\nO seu pedido de inform...
2   Acesso aos documentos contratuais do ICJ 5900....  ...  Prezado Senhor,\r\nA Petrobras, em atenção ao ...
3   Solicitação de contrato firmado entre a Petrob...  ...  Prezado Senhor,\r\n\r\nA Petrobras, em atenção...
4                 Solicitação de arquivos de contrato  ...  Prezado(a) Senhor(a),\r\nA Petrobras, em atenç...
5                                   Comite de pessoas  ...  Prezado(a) Senhor(a), \r\n\r\nA Petrobras, em ...
6                    Solicitação de Minuta contratual  ...  Prezado(a) Sr,(a),  \r\n\r\nA Petrobras, em at...
7              Solicitação de informações de contrato  ...  Prezado(a) Sr,(a),  \r\n\r\nA Petrobras, em at...
8                             Solicitação de Contrato  ...  Prezado(a) Sr,(a),  \r\n\r\nA Petrobras, em at...
9        Acesso à informação - contrato n° 4600558214  ...  Prezado Senhor,\r\n\r\nA Petrobras, em atenção...
10  Solicito o instrumento contratual numero 46006...  ...  Prezado Senhor,\r\n\r\nA Petrobras, em atenção...
11                            Solicitação de Contrato  ...  Prezado (a) Sr,(a),\r\n\r\nA Petrobras informa...
12  lista das embarcações do tipo AHTS E AHTS-r EM...  ...  Prezado Senhor,\r\n\r\nA Petrobras, em atenção...
13                  Incêndio Vila Socó - Cubatão 1984  ...  Prezado(a) Senhor(a),\r\n\r\nA Petrobras, em a...
14  acesso a lista das embarcações do tipo sdSV co...  ...  Prezado Senhor,\r\n\r\nA Petrobras, em atenção...
15  acesso a lista das embarcações do tipo RSV con...  ...  Prezado Senhor,\r\n\r\nA Petrobras, em atenção...
16                Resultado - Processo Administrativo  ...  Prezado(a) Senhor(a),\r\n\r\nA Petrobras, em a...
17                            Solicitação de Contrato  ...  Prezado (a) Sr, (a),\r\n\r\nA Petrobras inform...
18                            Solicitação de Contrato  ...  Prezado (a) Sr, (a),\r\n\r\nA Petrobras inform...
19    Protocolo CGU Manifestação 48023.000237.2023-53  ...  Prezado Senhor,\r\n\r\nA Petrobras, em atenção...
20                       Contratação de terceirizados  ...  Prezada Senhora, \r\n\r\nA Petrobras, em atenç...
21                    INFORMAÇÕES EMPRESA NUTRI SABOR  ...  Prezada Senhora,\r\n\r\nO seu pedido de inform...
22  cópias dos Aditivos N. 1 e N. 2 do contrato IC...  ...  Prezado Senhor, \r\n\r\nA Petrobras, em atençã...
23   Acesso aos arquivos do Projeto Memória Petrobras  ...  Prezado(a) Senhor(a),\r\n\r\nA Petrobras, em a...
24  Presença de pregoeiros na apólice de seguros d...  ...  Prezado, \r\n\r\nEm atenção à solicitação de I...
25                cópia do contrato SAP N. 4600665424  ...  Prezado Senhor,\r\n\r\nA Petrobras, em atenção...
26          Salários - Força de Trabalho Terceirizada  ...  Prezado/a Senhor/a,\r\n\r\nA sua manifestação ...
27  Solicitação de Ficha de Registro de Empregado ...  ...  Prezada Senhora,\r\n\r\nO seu pedido de inform...
28  Solicitação Dados/Informações Detalhadas Proce...  ...  Prezado Senhor,\r\n\r\nO seu pedido de informa...
29      Número de Engenheiros Mecânicos Terceirizados  ...  Prezado(a) Senhor(a), \r\n\r\nA Petrobras, em ...
```
{{< /expandable >}}

{{< expandable label="Limitações e alternativas" level="2" >}}

Até o momento usamos duas ferramentas para criar nossos scripts de raspagem de dados: __requests__ e __BeautifulSoup__. São ferramentas que resolvem a maioria das raspagens de dados... Mas não todas.

Há sites cujos dados não estão no HTML do código-fonte, requisito para que BeautifulSoup opere. Ou ainda, sites que precisam de interação humana (como clicar num link para abrir uma aba onde estão os dados).

Nesses casos, os dados são entregues via JavaScript, por exemplo.

Tomemos o site da Secretaria de Segurança Pública de São Paulo, na página onde apresentam dados mensais [[link](https://www.ssp.sp.gov.br/estatistica/dados-mensais)]. Notem que, quando abrimos a página, automaticamente caímos na aba _Ocorrências por Mês_

<img style="display: block; margin-left: auto; margin-right: auto; width:auto; max-height:100vh; border: 1px solid black;" src="repo_07.png">

Se quisermos taxas de delitos, temos de clicar em _Taxa Delito_; contudo, __a URL não muda__.

<img style="display: block; margin-left: auto; margin-right: auto; width:auto; max-height:100vh; border: 1px solid black;" src="repo_08.png">

Se quisermos as taxas de delitos de uma única cidade &mdash;digamos, Campinas&mdash;, temos de clicar em _Municípios_ e escolher _Campinas_; e novamente, __a URL não muda__.

<img style="display: block; margin-left: auto; margin-right: auto; width:auto; max-height:100vh; border: 1px solid black;" src="repo_09.png">

E ainda assim, mesmo depois de todo o "esforço", o código-fonte não contém os dados que queremos: o `body` do site é apenas isto:

```html
  <body>
    <app-root></app-root>
    <div vw="" class="enabled">
      <div vw-access-button="" class="active"></div>
      <div vw-plugin-wrapper="">
        <div class="vw-plugin-top-wrapper"></div>
      </div>
    </div>

    <script>
      function loadVLibrasScript() {
        var script = document.createElement('script');
        script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
        script.onload = function () {
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        };
        document.head.appendChild(script);

        var scriptFonte = document.createElement('script');
        scriptFonte.src = 'assets/scripts/tamanhoFonte.js';
        document.head.appendChild(scriptFonte);

        var scriptContraste = document.createElement('script');
        scriptContraste.src = 'assets/scripts/contraste.js';
        document.head.appendChild(scriptContraste);

        // var cssContraste = document.createElement('link')
        // cssContraste.href = "https://saopaulo.sp.gov.br/barra-govsp/css/barra-contraste-govsp.min.css";
        // cssContraste.rel = "stylesheet";
        // document.head.appendChild(cssContraste);
      }

      document.addEventListener('DOMContentLoaded', loadVLibrasScript);
    </script>
  <script src="runtime.a5dc32c1ca8e6772.js" type="module"></script><script src="polyfills.15907b1c3beb54e7.js" type="module"></script><script src="scripts.c91eedceb4883133.js" defer></script><script src="main.655f818c036fdaf0.js" type="module"></script>

</body>
```
Ou seja, todo o conteúdo da página é entregue via JavaScript. Neste caso, com tantas ações requisitadas do usuário (como clicar na aba, escolher o município etc.) e mesmo sem dados no código-fonte, é possível fazer uma raspagem? __Sim!__ Mas não com as ferramentas que dispomos.

### Selenium
- Link da ferramenta: https://www.selenium.dev/pt-br/
- Link da biblioteca: https://pypi.org/project/selenium/

Selenium é uma ferramenta de automação de navegador. Tomemos uma navegação por humano, passo a passo:

1. Abrir o Chrome, Firefox ou outro navegador
2. Digitar o endereço do site
3. Esperar a página carregar
4. Ir ao link X e clicar
6. Esperar a página carregar
7. ...

Com Selenium, você passa os passos que deseja percorrer, e a ferramenta faz isso para você. Ou seja, Selenium imita a navegação humana. No contexto de raspagem de dados, Selenium faz ações que emulam as nossas (como clicar num link para obter os dados, caso da SSP-SP) para depois capturar as informações necessárias.

Em outros termos, com Python e Selenium, vamos criar um "robozinho" que atua como um humano. Um exemplo de código com Selenium:

```py
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup as bs
import time

url = "https://www.ssp.sp.gov.br/estatistica/dados-mensais"

# abro o navegador Chrome
driver = webdriver.Chrome()

# passo a URL
driver.get(url)

# espero 3 segundos para a página carregar
time.sleep(3)

# clico no XPath referente à aba "Taxa de Delito"
driver.find_element(
    By.XPATH, '/html/body/app-root/body/div[1]/div/app-dados-mensais/div[2]/div[1]/ul/li[1]/a').click()

# espero 2 segundos
time.sleep(2)

# clico no XPath referente ao município de "Campinas"
driver.find_element(
    By.XPATH, '/html/body/app-root/body/div[1]/div/app-dados-mensais/div[2]/div[2]/form/div[2]/div[1]/select/option[110]').click()

# espero 2 segundos
time.sleep(2)

# passo o código-fonte para Beautiful Soup trabalhar
soup = bs(driver.page_source, "html.parser")
dados = soup.find(
    'table', class_='table table-striped table-hover ng-star-inserted')
with open("ssp_selenium.txt", "w", encoding='utf-8') as f:
    f.write(str(dados))
```
```textfile
<table
  _ngcontent-ng-cli-universal-c72=""
  class="table table-striped table-hover ng-star-inserted"
>
  <thead _ngcontent-ng-cli-universal-c72="">
    <tr _ngcontent-ng-cli-universal-c72="" class="table-primary">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center" scope="col">
        Ano
      </th>
      <th _ngcontent-ng-cli-universal-c72="" class="text-center" scope="col">
        Homicídio Doloso por 100 mil habitantes
      </th>
      <th _ngcontent-ng-cli-universal-c72="" class="text-center" scope="col">
        Furto por 100 mil habitantes
      </th>
      <th _ngcontent-ng-cli-universal-c72="" class="text-center" scope="col">
        Roubo por 100 mil habitantes
      </th>
      <th _ngcontent-ng-cli-universal-c72="" class="text-center" scope="col">
        Furto e Roubo de Veículo por 100 mil habitantes
      </th>
      <th _ngcontent-ng-cli-universal-c72="" class="text-center" scope="col">
        Furto por 100 mil veículos
      </th>
      <th _ngcontent-ng-cli-universal-c72="" class="text-center" scope="col">
        Roubo por 100 mil veículos
      </th>
      <th _ngcontent-ng-cli-universal-c72="" class="text-center" scope="col">
        Furto e Roubo de Veículo por 100 mil veículos
      </th>
    </tr>
  </thead>
  <tbody _ngcontent-ng-cli-universal-c72="">
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2022</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">9,39</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.397,03</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">450,88</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">434,12</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">370,35</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">195,31</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">565,66</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2021</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">9,06</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.300,66</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">464,64</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">422,07</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">336,77</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">198,09</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">534,86</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2020</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">10,45</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">960,59</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">421,19</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">372,16</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">293,32</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">186,18</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">479,50</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2019</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">11,56</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.315,70</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">558,58</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">513,51</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">405,16</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">255,05</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">660,21</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2018</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">11,67</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.397,37</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">603,68</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">596,47</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">430,31</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">346,69</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">777,00</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2017</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">11,91</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.475,56</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">805,82</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">650,79</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">476,31</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">375,83</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">852,14</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2016</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">10,06</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.526,32</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">827,13</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">643,26</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">465,78</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">384,14</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">849,93</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2015</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">10,67</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.595,44</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">783,31</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">600,86</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">449,11</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">346,31</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">795,42</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2014</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">12,91</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.746,73</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">797,51</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">717,39</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">509,69</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">445,01</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">954,70</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2013</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">12,23</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.480,60</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">688,91</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">832,97</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">535,28</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">587,52</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.122,81</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2012</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">13,08</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.706,95</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">791,21</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">905,11</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">675,56</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">588,66</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.264,22</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2011</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">13,39</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.724,50</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">823,94</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">841,28</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">626,28</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">605,33</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.231,62</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2010</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">14,55</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.626,76</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">825,29</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">860,87</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">635,48</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">699,57</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.335,05</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2009</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">14,43</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.590,56</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">988,55</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">853,08</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">674,81</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">731,97</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.406,79</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2008</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">13,35</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.412,70</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">847,13</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">712,69</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">630,54</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">603,98</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.234,52</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2007</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">13,49</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.521,42</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">921,17</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">830,49</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">712,73</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">814,02</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.526,76</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2006</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">15,75</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.609,62</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">942,89</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.026,38</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">949,31</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.080,81</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">2.030,12</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2005</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">21,87</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.688,33</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">943,56</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">992,08</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.059,82</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.032,84</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">2.092,66</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2004</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">35,73</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.714,24</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">976,30</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">972,45</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.285,84</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">871,38</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">2.157,22</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2003</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">49,38</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.558,07</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">984,34</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.088,09</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.267,31</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.239,04</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">2.506,35</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2002</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">45,68</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.349,33</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">867,52</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.046,31</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.107,88</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.371,17</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">2.479,05</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2001</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">55,28</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.393,44</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.110,10</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.440,16</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.486,70</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.991,13</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">3.477,82</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">2000</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">50,17</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.134,37</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.136,65</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.838,94</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">-</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">-</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">-</td>
    </tr>
    <tr _ngcontent-ng-cli-universal-c72="" class="ng-star-inserted">
      <th _ngcontent-ng-cli-universal-c72="" class="text-center">1999</th>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">52,69</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.126,10</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">890,68</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">1.571,12</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">-</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">-</td>
      <td _ngcontent-ng-cli-universal-c72="" class="text-center">-</td>
    </tr>
  </tbody>
</table>
```

{{< /expandable >}}

{{< expandable label="Exercícios - parte 2" level="2" >}}

A agenda do presidente da República está em links como https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/agenda-do-presidente-da-republica-lula/agenda-do-presidente-da-republica/2024-05-16.

Raspe a agenda inteira de abril de 2024. Lembre-se: há dias sem compromissos e, portanto, sem dados.

Os dados devem vir em formato de dataframe do Pandas.

{{< /expandable >}}

{{< expandable label="Exame" level="2" >}}

O exame aqui proposto vale __7 pontos__ na composição da nota final, enquanto as atividades anteriores valem, cada, __1,5 pontos__.

Neste exame, vamos trabalhar projetos de lei da Câmara dos Deputados.

O link https://www.camara.leg.br/busca-portal?contextoBusca=BuscaProposicoes&pagina=1&order=relevancia&abaEspecifica=true&filtros=%5B%7B%22ano%22%3A%222024%22%7D%5D&tipos=PL contém todos os projetos de lei apresentados no ano de 2024. Até o presente momento, são 1.638 documentos.

O trabalho consiste em __capturar os 100 primeiros projetos de lei__ e extrair:

  - número do projeto
  - autor
  - ementa
  - data de apresentação
  - forma de apreciação
  - regime de tramitação
  - URL para o inteiro teor (não o conteúdo, mas o link que leva ao inteiro teor)

Note que algumas dessas informações não estão na URL acima, e sim dentro do link de cada projeto.

Após a captura, gerar um dataframe de Pandas.

Envie o código `py` até 1º de junho, via mensagem privada para o professor.

{{< /expandable >}}