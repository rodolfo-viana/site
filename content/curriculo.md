+++
title = "Currículo"
path = "curriculo"
+++

# Informações

Rodolfo Viana<br />
<!--<span id="age"></span> anos<br />-->
São Paulo, Brasil<br />
[Linkedin](https://www.linkedin.com/in/rodolfoviana/) / [Github](https://github.com/rodolfo-viana) / [E-mail](mailto:eu@rodolfoviana.com.br)

# Resumo

Engenheiro de Dados com mais de <span id="working-age"></span> anos de experiência, atuando no desenvolvimento e manutenção de pipelines de ETL e na definição de arquitetura de dados de ponta a ponta. Experiência em gestão e evolução de data warehouses em diferentes provedores de nuvem, garantindo qualidade, governança, performance e confiabilidade. Liderança de projetos e iniciativas multidisciplinares, com foco em entrega de valor e escalabilidade. Especialista em Data Science pela Esalq-USP, atualmente cursa mestrado em Ciência da Computação na Unesp.

# Experiência profissional

⟶ Engenheiro de Dados Sr @ [Farfetch](https://www.stadiumgoods.com/)<br />
[agosto de 2021 &mdash; o momento]

> Responsabilidades:
> 
> - Projeta e implementa pipelines de ETL e automações para garantir a disponibilidade, integridade e eficiência dos dados, assegurando a operação de mais de 200 processos
> - Cria aplicações como webscrapers e parsers para consumo de dados externos
> - Conduz análises aprofundadas para verificar a consistência e confiabilidade dos dados
> - Realiza estudos ad hoc e relatórios
> 
> Principais contribuições:
> 
> - Liderou projeto de otimização da infraestrutura de dados, com ações que reduziram o tempo de processamento em 63%, aumentaram a performance (IOPS) em 88% e geraram 67% de economia nos custos mensais
> - Deu mentoria e treinamento a mais de 10 profissionais, aprimorando suas habilidades técnicas

⟶ Professor @ [Universidade de Marília](https://oficial.unimar.br/bacharelado-em-inteligencia-artificial/)<br />
[janeiro de 2026 &mdash; presente]

> Responsabilidades:
> 
> - Leciona a disciplina "Sistemas Autônomos e Agentes Inteligentes" para alunos de graduação em Inteligência Artificial
> - Leciona a disciplina "Introdução à Inteligência Artificial" para alunos de todos os cursos de TI da instituição
> - Planeja e elabora materiais didáticos das disciplinas, incluindo aulas, atividades avaliativas e materiais de apoio

⟶ Professor @ [IDP](https://www.idp.edu.br/techschool/mba-jornalismo-de-dados/)<br />
[julho de 2021 &mdash; dezembro de 2025]

> Responsabilidade: 
> 
> - Lecionou "Introdução à Programação com Python" e "Web Scraping" em cursos de pós-graduação, tendo treinado mais de 100 profissionais

⟶ Cientista de Dados Sr @ [Rede Globo](https://redeglobo.globo.com/)<br />
[dezembro de 2018 &mdash; agosto de 2021]

> Responsabilidades:
> 
> - Desenvolveu e implementou modelos preditivos &mdash;incluindo algoritmos de classificação e redes neurais&mdash; para business intelligence e personalização de conteúdo
> - Realizou análises exploratórias de dados e modelagem estatística para gerar ideias de pautas e informar o planejamento editorial
> - Liderou o design e a implementação de pipelines ETL e processos de web scraping em larga escala para ingestão de dados externos para análise
> 
> Principal contribuição:
> 
> - Concebeu e implementou sistema responsável por fornecer estatísticas em tempo real de SARS-CoV-2 para mais de 500 jornalistas, expandindo a cobertura de notícias e aumentando o engajamento dos telespectadores em 41%

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
    > Docker, dbt, Databricks, Airflow, Spark, Google Cloud Functions, AWS Lambda, Apache NiFi, Pentaho, Git, Terraform

- Machine Learning e IA
    > PyTorch, TensorFlow, Statsmodels, PyCaret, scikit-learn

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
      // const birthdate = new Date(1981, 2, 17);
      const start = new Date(2017, 0, 1);

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
