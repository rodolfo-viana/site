+++
title = "Currículo"
path = "curriculo"
+++

# Informações

Rodolfo Viana<br />
<span id="age"></span> anos<br />
Marília, São Paulo<br />
[Linkedin](https://www.linkedin.com/in/rodolfoviana/) / [Github](https://github.com/rodolfo-viana) / [E-mail](mailto:eu@rodolfoviana.com.br)

# Resumo

Engenheiro de dados com mais de <span id="working-age"></span> anos de experiência. Possuo MBA em Data Science pela USP e sou aluno de mestrado em Ciência da Computação na Unesp. Com uma combinação de sólida fundação acadêmica e vasta experiêcia no mercado, destaco-me na construção e otimização de infraestruturas de dados baseadas em nuvem e tenho histórico comprovado em automação de fluxos para aumentar a disponibilidade, a integridade e a escalabilidade de dados.

# Experiência profissional

⟶ Engenheiro de Dados Sr @ [Stadium Goods](https://www.stadiumgoods.com/)<br />
[agosto de 2021 &mdash; o momento]

> Responsabilidades:
> 
> - Projetar e implementar pipelines de dados escaláveis e automações que garantem a disponibilidade, integridade e eficiência dos dados, assegurando a operação de mais de 200 processos de dados
> - Conduzir análises aprofundadas para verificar a consistência e confiabilidade dos dados
> - Estudos ad hoc, relatórios e testes analíticos
> 
> Principais contribuições:
> 
> - Liderança no projeto de otimização da infraestrutura de dados, com ações que reduziram o tempo de processamento em 63%, aumentaram a performance (IOPS) em 88% e geraram 67% de economia nos custos mensais
> - Mentoria e treinamento de mais de 10 profissionais na Stadium Goods, aprimorando suas habilidades técnicas

⟶ Professor @ [Universidade de Marília](https://oficial.unimar.br/bacharelado-em-inteligencia-artificial/)<br />
[janeiro de 2026 &mdash; presente]

> Responsabilidades:
> 
> - Lecionar a disciplina "Sistemas Autônomos e Agentes Inteligentes" para alunos de graduação em Inteligência Artificial
> - Planejar e elaborar materiais didáticos da disciplina, incluindo aulas, atividades avaliativas e materiais de apoio

⟶ Professor Adjunto @ [IDP](https://www.idp.edu.br/techschool/mba-jornalismo-de-dados/)<br />
[julho de 2021 &mdash; dezembro de 2025]

> Responsabilidades: 
> 
> - Lecionar "Introdução à Programação com Python" e "Web Scraping" em cursos de pós-graduação, tendo treinado mais de 100 profissionais

⟶ Cientista de Dados Sr @ [Rede Globo](https://redeglobo.globo.com/)<br />
[dezembro de 2018 &mdash; agosto de 2021]

> Responsabilidades:
> 
> - Desenvolver e implementar modelos preditivos &mdash;incluindo algoritmos de classificação e redes neurais&mdash; para business intelligence e personalização de conteúdo
> - Realizar análise exploratória de dados e modelagem estatística para gerar ideias de pautas e informar o planejamento editorial
> - Liderar o design e implementação de pipelines ETL e processos de web scraping em larga escala para ingestão de dados externos para análise
> 
> Principal contribuição:
> 
> - Concebi e implementei um sistema que forneceu estatísticas em tempo real de SARS-CoV-2 para mais de 500 jornalistas, expandindo a cobertura de notícias e aumentando o engajamento dos telespectadores em 41%

# Formação

⟶ Mestrado em Ciência da Computação @ [Ibilce-Unesp](https://www.ibilce.unesp.br/)<br />
2025 &mdash; em andamento
- Trabalho em desenvolvimento: Aprimoramento em detecção de bordas em arquiteturas U-Net para segmentação de imagens médicas
- Orientador: Prof Dr Wallace Correa de Oliveira Casaca

⟶ MBA em Data Science e Analytics @ [Esalq-USP](https://www.esalq.usp.br/)<br />
2022 &mdash; 2023<br />
- Trabalho desenvolvido: [Detecção de anomalias em gastos de deputados estaduais de São Paulo usando K-Means](/projetos/alesp-kmeans)
- Orientadora: Profª Drª Ana Julia Righetto

# Habilidades Técnicas

- Plataformas de Nuvem
    > Google Cloud Platform (GCP), AWS, Microsoft Azure

- Engenharia de Dados e Orquestração
    > Docker, dbt, Databricks, Apache Airflow, Apache Spark, Google Cloud Functions, AWS Lambda, Apache NiFi, Pentaho, Git, Terraform

- Machine Learning e IA
    > Pytorch, TensorFlow, Statsmodels, PyCaret, scikit-learn

- SQL e Bancos de Dados
    > Google BigQuery, Amazon Redshift, Azure Synapse, Snowflake, Microsoft SQL Server, MySQL, PostgreSQL

- Visualização
    > Looker, Google Data Studio, PowerBI, Tableau

- Programação
    > Python, SQL, shell scripting

# Idiomas

Português (nativo), Inglês (fluente)

# Interesses

- Aprendizado de Máquina e IA
    > Visão computacional, Scientific Machine Learning, Deep Reinforcement Learning

- Matemática e Modelagem
    > Estatística bayesiana, processos gaussianos, modelagem baseada em equações diferenciais
 
- Ciência da Computação
    > Estruturas de dados e algoritmos, computação bioinspirada, engenharia de software para data products

- Domínios
    > Aplicações de IA em saúde (imagens médicas, diagnóstico assistido), transparência e ética em IA (responsabilidade, viés, governança)

<script>
    document.addEventListener("DOMContentLoaded", () => {
      const today = new Date();
      const birthdate = new Date(1981, 2, 17);
      const start = new Date(2017, 0, 1);

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
