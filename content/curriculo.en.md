+++
title = "Résumé"
+++

# Personal Info

Rodolfo Viana<br />
<!--<span id="age"></span> years old<br />-->
São Paulo, Brazil<br />
[LinkedIn](https://www.linkedin.com/in/rodolfoviana/) / [Github](https://github.com/rodolfo-viana) / [Email](mailto:eu@rodolfoviana.com.br)

# Summary

Data Engineer with <span id="working-age"></span>+ years of experience in developing and maintaining ETL pipelines and defining end-to-end data architecture. Experienced in managing and evolving data warehouses across different cloud providers, ensuring data quality, governance, performance, and reliability. Proven leadership in multidisciplinary projects and initiatives, focused on value delivery and scalability. Data Science specialist from ESALQ-USP, currently pursuing a Master's degree in Computer Science at UNESP.

# Professional Experience

⟶ Senior Data Engineer @ [Farfetch](https://www.farfetch.com/)<br />
[August 2021 &mdash; present]

> Responsibilities:
> 

> - Designs and implements ETL pipelines and automations to ensure data availability, integrity, and efficiency, supporting the operation of 200+ processes
> - Builds applications such as web scrapers and parsers to ingest external data
> - Conducts in-depth analyses to validate data consistency and reliability
> - Produces ad hoc studies and reports
> 
> Key contributions:
> 
> - Led a data infrastructure optimization project that reduced processing time by 63%, increased performance (IOPS) by 88%, and generated 67% savings in monthly costs
> - Mentored and trained more than 10 professionals, strengthening their technical skills

⟶ Lecturer @ [Universidade de Marília](https://oficial.unimar.br/bacharelado-em-inteligencia-artificial/)<br />
[January 2026 &mdash; present]

> Responsibilities: 
> 
> - Teaches "Autonomous Systems and Intelligent Agents" to undergraduate Artificial Intelligence students
> - Teaches "Introduction to Artificial Intelligence" to students across all IT programs at the institution
> - Plans and develops course materials, including lectures, assessments, and supporting resources

⟶ Lecturer @ [IDP](https://www.idp.edu.br/techschool/mba-jornalismo-de-dados/)<br />
[July 2021 &mdash; December 2025]

> Responsibility: 
> 
> - Taught "Introduction to Programming with Python" and "Web Scraping" in postgraduate programs, training 100+ professionals

⟶ Senior Data Scientist @ [Rede Globo](https://redeglobo.globo.com/)<br />
[December 2018 &mdash; August 2021]

> Responsibilities:
> 
> - Developed and implemented predictive models &mdash; including classification algorithms and neural networks &mdash; for business intelligence and content personalization
> - Performed exploratory data analysis and statistical modeling to generate story ideas and inform editorial planning
> - Led the design and implementation of ETL pipelines and large-scale web scraping processes to ingest external data for analysis
> 
> Key contribution:
> 
> - Conceived and implemented a system that delivered real-time SARS-CoV-2 statistics to 500+ journalists, expanding news coverage and increasing viewer engagement by 41%

# Education

⟶ M.Sc. in Computer Science @ [Ibilce-Unesp](https://www.ibilce.unesp.br/)<br />
2025 &mdash; in progress
- Ongoing research: Enhancing edge detection in U-Net architectures for medical image segmentation
- Advisor: Prof. Wallace Correa de Oliveira Casaca, PhD

⟶ MBA in Data Science and Analytics @ [Esalq-USP](https://www.esalq.usp.br/)<br />
2022 &mdash; 2023<br />
- Capstone project: [Anomaly detection in São Paulo state deputies' expenses using K-Means](/en/projetos/alesp-kmeans)
Advisor: Prof. Ana Julia Righetto, PhD

# Technical Skills

- Cloud Platforms
    > Google Cloud Platform (GCP), AWS, Microsoft Azure

- Data Engineering and Orchestration
    > Docker, dbt, Databricks, Airflow, Spark, Google Cloud Functions, AWS Lambda, Apache NiFi, Pentaho, Git, Terraform

- Machine Learning and AI
    > PyTorch, TensorFlow, Statsmodels, PyCaret, scikit-learn

- SQL and Databases
    > Google BigQuery, Amazon Redshift, Azure Synapse, Snowflake, Microsoft SQL Server, MySQL, PostgreSQL

- Visualization
    > Looker, Google Data Studio, PowerBI, Tableau

- Programming
    > Python, SQL, shell scripting

# Languages

Portuguese (native), English (fluent)

# Interests

- Machine Learning and AI
    > Computer vision, Scientific Machine Learning, Deep Reinforcement Learning

- Mathematics and Modeling
    > Bayesian statistics, Gaussian processes, differential-equation-based modeling

- Computer Science
    > Data structures and algorithms, bio-inspired computing, software engineering for data products

- Domains
    > AI in healthcare (medical imaging, computer-aided diagnosis), transparency and ethics in AI (accountability, bias, governance)

<script>
    document.addEventListener("DOMContentLoaded", () => {
      const today = new Date();
      // const birthdate = new Date(1981, 2, 17);
      const start = new Date(2018, 0, 1);

      function yearsSince(d) {
        let y = today.getFullYear() - d.getFullYear();
        const m = today.getMonth() - d.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < d.getDate())) y--;
        return y;
      }

      // document.getElementById("age").textContent = yearsSince(birthdate);
      document.getElementById("working-age").textContent = yearsSince(start);
    });
</script>
