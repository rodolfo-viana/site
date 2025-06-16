+++
title= ""
template = "homepage.html"
+++

Hello!

My name is Rodolfo Viana and I'm <span id="age"></span> years old. I hold a specialization in Data Science and Analytics from USP and I'm currently pursuing a Master’s degree in Computer Science at Unesp.

I work as a data engineer at [Stadium Goods](https://www.stadiumgoods.com/), a renowned sneaker marketplace based in New York. There, I'm involved in data infrastructure projects: creating, maintaining, and optimizing pipelines and routines, as well as designing tests to ensure data quality, integrity, and availability.

I also teach in the [MBA in Data Journalism](https://www.idp.edu.br/techschool/mba-jornalismo-de-dados/) program at [IDP](https://www.idp.edu.br/). My courses are Introduction to Python and Web Scraping with Python.

On this website you'll find publications on statistics, machine learning, and related topics, as well as projects I've developed in the field of data science.

You can view my résumé [here](/en/curriculo). You can also find me on [LinkedIn](https://www.linkedin.com/in/rodolfoviana/) and [Github](https://github.com/rodolfo-viana). If you'd like to send me a message, write to [eu@rodolfoviana.com.br](mailto:eu@rodolfoviana.com.br).

Enjoy your reading!

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
