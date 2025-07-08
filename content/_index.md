+++
title= ""
template = "homepage.html"
+++

Olá!

Meu nome é Rodolfo Viana, tenho <span id="age"></span> anos e sou especialista em ciência de dados. Tenho pós-graduação em Data Science e Analytics pela USP e faço mestrado em Ciência da Computação na Unesp.

Atualmente atuo como engenheiro de dados sênior na [Stadium Goods](https://www.stadiumgoods.com/), um renomado marketplace de sneakers com sede em Nova York, onde gerencio iniciativas de infraestrutura de dados, incluindo a criação, manutenção e otimização de pipelines e rotinas automatizadas, bem como a elaboração de testes para garantir a qualidade, integridade e disponibilidade dos dados.

Neste site, você encontrará artigos sobre estatística, machine learning e temas correlatos, além de projetos que desenvolvi no campo da ciência de dados. 

Meu currículo está disponível [aqui](/curriculo). Você também pode me encontrar no [Linkedin](https://www.linkedin.com/in/rodolfoviana/) e no [Github](https://github.com/rodolfo-viana). Para contatos diretos, escreva para [eu@rodolfoviana.com.br](mailto:eu@rodolfoviana.com.br).

Boa leitura.

<script>
    const today = new Date();
    const birthdate = new Date(1981, 2, 17);
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
