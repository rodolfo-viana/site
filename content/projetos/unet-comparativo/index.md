+++
title = "Análise comparativa de arquiteturas U-Net para segmentação de pólipo em colonoscopia"
description = "Versão editada de artigo escrito para a disciplina Aprendizado Profundo, do Prof. Dr. Denis Henrique Pinheiro Salvadeo, no curso de mestrado do Programa de Pós-Graduação em Ciência da Computação da Unesp"
date = "2025-11-13"
weight = 1

[taxonomies]
tags=["aprendizado de máquina", "u-net", "redes neurais", "medicina"]

[extra]
toc = true

+++

# Introdução

O câncer colorretal é um dos tumores mais prevalentes no mundo, correspondendo a cerca de 10\% dos casos e mais de 930 mil mortes anuais[^1]. A progressão de pólipos adenomatosos para carcinoma costuma levar entre 10 e 15 anos, oferecendo uma janela ampla para prevenção via detecção e remoção precoce[^2]; contudo, a taxa de detecção durante a realização de colonoscopias varia amplamente, sobretudo por diferenças de morfologia dos pólipos[^3].

Neste contexto, a ciência de dados, particularmente o aprendizado de máquina, muito tem a oferecer. A segmentação de pólipos pode ser tratada como um problema de classificação pixel a pixel. Tal trabalho é desafiador devido à heterogeneidade morfológica das lesões, baixo contraste entre tecido do pólipo e mucosa adjacente, e condições de iluminação variáveis na endoscopia; entretanto, avanços em redes neurais convolucionais têm impulsionado melhorias significativas na precisão de segmentação, superando métodos tradicionais baseados em atributos manuais[^4] [^5].

Neste cenário, U-Net se estabelece como o estado-da-arte para tal tarefa através de um esquema codificador-decodificador com *skip connections*[^6].

<img src="./unet.png" style="border: 5px solid #ef5350; width:75%; height:auto; max-width:75%;">

Suas limitações, porém, motivaram variantes que visam melhorar a fusão de representações e a seletividade de características. Este trabalho realiza comparações sistemáticas sob condições experimentais controladas, comparando cinco arquiteturas na segmentação de pólipos usando o conjunto Kvasir-SEG[^7].

# Referências

[^1]: World Health Organization, "Colorectal cancer", https://www.who.int/news-room/fact-sheets/detail/colorectal-cancer, Jul. 2023, online. Acessado em 25 de setembro de 2025.

[^2]: D. A. Corley, C. D. Jensen, A. R. Marks, W. K. Zhao, J. K. Lee, C. A. Doubeni, A. G. Zauber, J. de Boer, B. H. Fireman, J. E. Schottinger, and T. R. Levin, "Adenoma detection rate and risk of colorectal cancer and death", *The New England Journal of Medicine*, vol. 370, no. 14, pp. 1298–1306, 2014.

[^3]: J. Bernal, F. J. Sánchez, G. Fernández-Esparrach, D. Gil, C. Rodríguez, and F. Vilariño, "WM-DOVA maps for accurate polyp highlighting in colonoscopy: Validation vs. saliency maps from physicians", *Computerized Medical Imaging and Graphics*, vol. 43, pp. 99–111, 2015.

[^4]: P. Brandao, E. Mazomenos, G. Ciuti, R. Caliò, F. Bianchi, A. Menciassi, P. Dario, A. Koulaouzidis, A. Arezzo, and D. Stoyanov, "Fully convolutional neural networks for polyp segmentation in colonoscopy", in *Medical Imaging 2017: Computer-Aided Diagnosis, ser. Proceedings of SPIE*, vol. 10134, Orlando, FL, USA, 2017.

[^5]: N. Tajbakhsh, S. R. Gurudu, and J. Liang, "Automated polyp detection in colonoscopy videos using shape and context information", *IEEE Transactions on Medical Imaging*, vol. 35, no. 2, pp. 630–644, 2016.

[^6]: O. Ronneberger, P. Fischer, and T. Brox, "U-net: Convolutional networks for biomedical image segmentation", in *Medical Image Computing and Computer-Assisted Intervention - MICCAI 2015, ser. Lecture Notes in Computer Science*, vol. 9351. Cham: Springer, pp. 234–241, 2015.

[^7]: D. Jha, P. H. Smedsrud, M. A. Riegler, P. Halvorsen, T. de Lange, D. Johansen, and H. D. Johansen, "Kvasir-SEG: A segmented polyp dataset", in *MultiMedia Modeling (MMM 2020), Proceedings, Part II, ser. Lecture Notes in Computer Science*, vol. 11962. Cham: Springer, pp. 451–462, 2020.