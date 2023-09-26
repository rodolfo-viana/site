---
date: "2023-09-01"
title: ""
---

Olá!

Meu nome é Rodolfo Viana, tenho <span id="age"></span> anos e sou engenheiro de dados sênior na [Farfetch](http://farfetch.com/). Trabalho no time de [FPS](https://www.farfetchplatformsolutions.com/), que desenvolve e implementa soluções tecnológicas para marcas de luxo como Harrods, Balenciaga, Marc Jacobs e outras dezenas. 

Também sou professor no [MBA em Jornalismo de Dados](https://www.idp.edu.br/techschool/mba-jornalismo-de-dados/) do [IDP](https://www.idp.edu.br/). Minhas disciplinas são Introdução a Python e Web Scraping com Python.

Fora isso, estou fazendo especialização em Data Science na Esalq-USP. Meu trabalho consiste na criação de um algoritmo de clusterização para detecção de anomalias nos gastos da Assembleia Legislativa de São Paulo.

Neste site você vai encontrar publicações sobre estatística, machine learning e temas correlatos, além de projetos que desenvolvi no campo da ciência de dados. 

Meu currículo é este [aqui](cv_2023.pdf). Você pode me encontrar no [Linkedin](https://www.linkedin.com/in/rodolfoviana/) e no [Github](https://github.com/rodolfo-viana). Se quiser mandar uma mensagem, escreva para eu@rodolfoviana.com.br.

Boa leitura.

<script>
    const today = new Date();
    const birthdate = new Date(1981, 3, 17);
    function age() {
        const one_or_zero = (today.getMonth() < birthdate.getMonth()) ||
                            (today.getMonth() === birthdate.getMonth() &&
                            today.getDate() < birthdate.getDate());
        let year_difference = today.getFullYear() - birthdate.getFullYear();
        const age = year_difference - one_or_zero;
        return age;
    }
    document.getElementById("age").innerHTML = age();
</script>