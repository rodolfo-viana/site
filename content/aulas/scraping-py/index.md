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