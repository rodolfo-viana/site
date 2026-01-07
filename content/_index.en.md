+++
title= ""
template = "homepage.html"
+++

Hi there!

I'm Rodolfo Viana, a <span id="age"></span>-year-old Brazilian data science specialist. I have a postgraduate degree in Data Science and Analytics from the University of São Paulo (USP) and I'm currently pursuing an M.Sc. in Computer Science at São Paulo State University (UNESP).

Here you'll find articles on statistics, machine learning, and related topics, as well as projects I've developed in the field of data science.

My résumé is available [here](/en/curriculo). You can also find me on [LinkedIn](https://www.linkedin.com/in/rodolfoviana/) and [Github](https://github.com/rodolfo-viana). Feel free to email me at [eu@rodolfoviana.com.br](mailto:eu@rodolfoviana.com.br).

Happy reading!

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
