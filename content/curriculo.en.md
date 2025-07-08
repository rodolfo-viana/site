+++
title = "Résumé"
+++

# Personal Info

Rodolfo Viana<br />
<span id="age"></span> years old<br />
Marília, São Paulo, Brazil<br />
[LinkedIn](https://www.linkedin.com/in/rodolfoviana/) / [Github](https://github.com/rodolfo-viana) / [Email](mailto:eu@rodolfoviana.com.br)

# Summary

Data Engineer with <span id="working-age"></span>+ years of experience, an MBA in Data Science from the University of São Paulo and an M.Sc. in Computer Science in progress at Unesp. I currently serve as a Senior Data Engineer at Stadium Goods —the global leader in the sneaker market—driving projects in data architecture, pipeline development, and data-quality governance. Combining a solid academic foundation with extensive industry experience, I excel at designing and optimizing cloud-based data infrastructures and have a proven track record of automating workflows to boost availability, integrity, and scalability.

# Professional Experience

⟶ Senior Data Engineer @ [Stadium Goods](https://www.stadiumgoods.com/)<br />
[August 2021 &mdash; present]

> Responsibilities:
> 
> - Design and implement scalable data pipelines and automations that safeguard data availability, integrity, and efficiency, ensuring the operation of 200+ data processes
> - Conduct deep-dive analyses to verify data consistency and reliability
> - Ad hoc studies, reports and analytical tests
> 
> Key contributions:
> 
> - Leadership in Stadium Goods data infrastructure optimization project, with actions that reduced processing time by 63%, increased performance (IOPS) by 88% and generated 67% savings in monthly costs
> - Mentoring and training of more than 10 professionals at Stadium Goods, improving their technical skills

⟶ Adjunct Instructor @ [IDP](https://www.idp.edu.br/techschool/mba-jornalismo-de-dados/)<br />
[July 2021 &mdash; October 2024]

> Responsibilities: 
> 
> - Teach "Introduction to Programming with Python" and "Web Scraping" in graduate courses, training 100+ professionals to date

⟶ Senior Data Scientist @ [Rede Globo](https://redeglobo.globo.com/)<br />
[December 2018 &mdash; August 2021]

> Responsibilities:
> 
> - Developed and deployed predictive models&mdash;including classification algorithms and neural networks&mdash;for business intelligence and content personalization
> - Performed exploratory data analysis and statistical modeling to generate story ideas and inform editorial planning
> - Led the design and implementation of ETL pipelines and large-scale web-scraping processes to ingest external data for analysis
> 
> Key contribution:
> 
> - Conceived and implemented a system that provided real-time SARS-CoV-2 statistics to 500+ journalists, expanding news coverage and boosting viewer engagement by 41%

# Education

⟶ M.Sc. Computer Science @ [Ibilce-Unesp](https://www.ibilce.unesp.br/)<br />
2025 &mdash; in progress

⟶ MBA Data Science and Analytics @ [Esalq-USP](https://www.esalq.usp.br/)<br />
2022 &mdash; 2023<br />
- Work developed: [Anomaly detection in São Paulo state deputies' expenses using K-Means](/en/projetos/alesp-kmeans)

# Technical Skills

- Cloud Platforms
    > Google Cloud Platform (GCP), AWS, Microsoft Azure

- Data Engineering and Orchestration
    > Docker, dbt, Databricks, Apache Airflow, Apache Spark, Google Cloud Functions, AWS Lambda, Apache NiFi, Pentaho, Git, Terraform

- Machine Learning and AI
    > Pytorch, TensorFlow, Statsmodels, PyCaret, scikit-learn

- SQL and Databases
    > Google BigQuery, Amazon Redshift, Azure Synapse, Snowflake, Microsoft SQL Server, MySQL, PostgreSQL

- Visualization
    > Looker, Google Data Studio, PowerBI, Tableau

- Programming
    > Python, SQL, shell scripting

# Languages

Portuguese (native), English (fluent)

<script>
    document.addEventListener("DOMContentLoaded", () => {
      const today = new Date();
      const birthdate = new Date(1981, 2, 17);
      const start = new Date(2018, 0, 1);

      function yearsSince(d) {
        let y = today.getFullYear() - d.getFullYear();
        const m = today.getMonth() - d.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < d.getDate())) y--;
        return y;
      }

      document.getElementById("age").textContent = yearsSince(birthdate);
      document.getElementById("working-age").textContent = yearsSince(start);
    });
</script>
