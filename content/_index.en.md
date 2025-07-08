+++
title= ""
template = "homepage.html"
+++

Hi there,

I am Rodolfo Viana, a Brazilian data engineer aged <span id="age"></span>. I hold a postgraduate specialization in Data Science and Analytics from the University of São Paulo (USP) and am presently pursuing an M.Sc. in Computer Science at São Paulo State University (UNESP).

I currently serve as a Sr Data Engineer at [Stadium Goods](https://www.stadiumgoods.com/), a renowned sneaker marketplace headquartered in New York, where I oversee data-infrastructure initiatives, including the creation, maintenance, and optimization of pipelines and automated routines, as well as the design of tests to safeguard data quality, integrity, and availability.

On this website you will find articles on statistics, machine learning, and related topics, together with projects I have developed in the field of Data Science.

My résumé is available [here](/en/curriculo). You can also find me on [LinkedIn](https://www.linkedin.com/in/rodolfoviana/) and [Github](https://github.com/rodolfo-viana). For direct inquiries, please write to [eu@rodolfoviana.com.br](mailto:eu@rodolfoviana.com.br).

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
