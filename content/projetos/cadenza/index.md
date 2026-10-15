+++
title = "Cadenza"
description = "Apresentações para Linux, macOS e Windows, com editor visual, gráficos, LaTeX, Mermaid, teleprompter e diversos recursos"
date = "2026-10-13"
updated = "2026-10-15"
weight = 0

[taxonomies]
tags=["rust", "reveal.js", "apresentações", "software livre"]

[extra]
toc = true

+++

O **Cadenza** é um aplicativo de apresentações para Linux, macOS e Windows, construído sobre o [reveal.js](https://revealjs.com). Você monta os slides num editor visual, com layouts prontos, temas, gráficos, diagramas e equações, apresenta em tela cheia com uma tela do apresentador e exporta o resultado como página web ou PDF. Não é preciso escrever HTML ou JavaScript para preparar uma apresentação.

O trabalho fica em arquivos locais. Uma apresentação pode levar consigo as imagens, os vídeos importados e as fontes incorporadas, sem exigir uma conta ou o envio do material para um serviço de nuvem. O aplicativo é software livre, desenvolvido em Rust e tecnologias web com [Tauri](https://tauri.app), sob a licença MIT.

Essa combinação é especialmente útil em aulas, seminários e apresentações técnicas. Dá para explicar um algoritmo destacando suas linhas, corrigir uma fórmula pelo código LaTeX, alterar um fluxograma em Mermaid e publicar os slides no próprio site. Também há os recursos de uma apresentação convencional: texto, fotografias, tabelas, transições e notas de fala.

<figure style="width:85%; height:auto; max-width:85%; display:block; margin: 0 auto;">
  <img src="./editor-pt.png" alt="O editor com um diagrama Mermaid no slide e a lista de slides ao lado">
  <figcaption style="margin-top: 1px; font-size: 0.8em; color: #555; line-height:1.5;">Editando um slide com um diagrama Mermaid. Foto do slide 9: "Life is Beautiful", de Gabe Kronisch, <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>
  </figcaption>
</figure>

# Baixar

Baixe a versão mais recente na [página de versões][versoes] do GitHub, que também mostra as novidades de cada versão. Escolha o arquivo do seu sistema (x.y.z é o número da versão):

<div role="region" aria-label="Downloads por sistema operacional" tabindex="0" style="overflow-x: auto;">

| Sistema | Arquivo |
|---------|---------|
| Windows 10 e 11 | `Cadenza_x.y.z_x64-setup.exe` (instalador) ou `Cadenza_x.y.z_x64_en-US.msi` (pacote MSI) |
| macOS 12 ou mais recente (Apple Silicon e Intel) | `Cadenza_x.y.z_universal.dmg` |
| Ubuntu, Debian e derivados | `Cadenza_x.y.z_amd64.deb` |
| Fedora e openSUSE | `Cadenza-x.y.z-1.x86_64.rpm` |
| Linux (AppImage) | `Cadenza_x.y.z_amd64.AppImage` |

</div>

[versoes]: https://github.com/rodolfo-viana/cadenza/releases

## Instalação

Os pacotes incluem o aplicativo; o procedimento muda conforme o sistema. No Linux, escolha uma das alternativas abaixo, de acordo com a distribuição ou o formato baixado.

- **Windows:** execute o instalador. Ele instala o Microsoft WebView2 se for preciso.
- **macOS:** abra o arquivo `.dmg` e arraste o **Cadenza** para a pasta **Aplicativos**.
- **Linux:** instale o pacote pelo terminal, na pasta onde ele foi baixado, trocando x.y.z pela versão baixada. O AppImage não precisa de instalação: basta torná-lo executável e abri-lo.

```sh
sudo apt install ./Cadenza_x.y.z_amd64.deb         # Ubuntu, Debian
sudo dnf install ./Cadenza-x.y.z-1.x86_64.rpm      # Fedora
sudo zypper install ./Cadenza-x.y.z-1.x86_64.rpm   # openSUSE
chmod +x Cadenza_x.y.z_amd64.AppImage              # AppImage
```

As versões para Linux e Windows são de 64 bits (x86-64). Os pacotes `.deb` e `.rpm` precisam do WebKitGTK 4.1, presente no Ubuntu 22.04, no Debian 12, no Fedora 37 e em versões mais recentes.

{% note(header="Na primeira vez que você abrir") %}
Os instaladores ainda não têm assinatura digital, então o sistema pede uma confirmação:

- **Windows:** o SmartScreen pode avisar que o aplicativo não é reconhecido. Clique em **Mais informações > Executar assim mesmo**.
- **macOS:** o sistema avisa que não consegue verificar o aplicativo. Abra **Ajustes do Sistema > Privacidade e Segurança**, role até a mensagem sobre o **Cadenza** e clique em **Abrir Mesmo Assim**. É preciso fazer isso só uma vez por versão.
{% end %}

# Recursos

O editor reúne a preparação do conteúdo e a apresentação ao vivo. Você pode começar com um layout, ajustar os objetos livremente e manter no mesmo arquivo o material visual e as notas que usará para falar.

## Edição

Há **12 layouts**, incluindo título, seção, duas colunas, citação, número em destaque e código. Eles oferecem um ponto de partida, e os objetos podem ser movidos, redimensionados, duplicados, alinhados e bloqueados. Réguas, guias arrastáveis, guias inteligentes e grade com encaixe ajudam a manter o alinhamento entre elementos.

A formatação pode valer para uma caixa de texto inteira ou apenas para o trecho selecionado: fonte, tamanho, cor, negrito, itálico e sublinhado. Tabelas têm células editáveis e permitem ajustar o número de linhas e colunas. Desfazer, refazer e a paleta de comandos (**Ctrl+K**, ou **⌘K** no Mac) ajudam nas operações do dia a dia.

## Gráficos e mapas

Os gráficos são editados numa grade de dados e desenhados em SVG, que mantém a nitidez ao mudar de tamanho. São **18 tipos**: colunas, colunas empilhadas, barras, barras empilhadas, linhas, área, área empilhada, streamgraph, pizza, rosca, treemap, parlamento, dispersão, mapa de calor, candlestick, Sankey, rede e mapa geográfico.

Isso permite mostrar desde uma comparação entre categorias até fluxos entre entidades ou a distribuição de assentos num parlamento. Sankey e rede usam relações de origem, destino e valor. Nos mapas, você escolhe o mundo, um continente ou as divisões administrativas de um país e associa valores às regiões por nome ou código. Os limites geográficos vêm do [Natural Earth](https://www.naturalearthdata.com).

Durante a apresentação, um gráfico pode aparecer por etapas: uma série de cada vez, uma fatia de pizza ou um partido no gráfico de parlamento. É uma forma de acompanhar a explicação sem colocar todos os dados na tela de uma só vez.

## Código, equações e diagramas

Blocos de código têm destaque de sintaxe, numeração de linhas e realce de linhas passo a passo. Numa aula de programação, por exemplo, você pode manter o mesmo trecho no slide e conduzir a atenção para partes diferentes a cada avanço.

As equações usam **LaTeX com KaTeX**, como objetos separados ou dentro do texto, como em `$e^{i\pi}+1=0$`. A expressão continua editável pelo seu código. O suporte é o do KaTeX, voltado à composição matemática; não se trata de um compilador de documentos LaTeX completos.

Os diagramas usam [Mermaid](https://mermaid.js.org): fluxogramas, sequências, linhas do tempo, mapas mentais e outros formatos. Alterar um rótulo ou uma relação significa editar a descrição do diagrama e renderizá-lo novamente. Isso facilita revisar uma explicação técnica sem reconstruir uma imagem em outro programa.

## Design

O **Cadenza** inclui **22 temas**: oito próprios e os temas clássicos do reveal.js. O construtor de temas permite definir a aparência, reutilizá-la em outras apresentações e compartilhar um arquivo `.cadenza-theme`, com suas fontes incorporadas. Também é possível exportar o tema como CSS do reveal.js ou acrescentar CSS específico a uma apresentação.

As animações incluem entradas por etapas, transições e **Magic Move**, baseado no *auto-animate* do reveal.js. Há ainda trajetórias de movimento desenhadas no slide, com segmentos retos ou curvas. Esses recursos permitem revelar uma explicação aos poucos ou acompanhar a mudança de posição de um objeto.

<figure style="width:85%; height:auto; max-width:85%; display:block; margin: 0 auto;">
  <img src="./themes-pt.png" alt="Tela inicial, com a escolha de tema para uma nova apresentação">
  <figcaption style="margin-top: 1px; font-size: 0.8em; color: #555; line-height:1.5;">A escolha de tema ao criar uma apresentação, com a interface no modo claro
  </figcaption>
</figure>

## Mídia

Você pode inserir imagens e vídeos do computador ou buscar material na biblioteca de mídia. Openverse e Wikimedia Commons dispensam chave de API; Pexels, Pixabay e GIPHY usam chaves configuradas no aplicativo. As condições de uso variam conforme a fonte e o arquivo: confira a licença e mantenha os créditos necessários.

A busca também aceita um endereço de imagem, uma página de arquivo do Wikimedia Commons ou da Wikipedia, ou uma página web com imagem de prévia. No caso dos arquivos do Wikimedia, as informações de autoria e licença acompanham a importação. Para YouTube e Vimeo, é possível colar o link ou navegar pelo serviço e inserir o vídeo escolhido. Esses vídeos continuam dependendo do serviço e da conexão; não viram arquivos locais ao salvar a apresentação.

O recurso **Câmera ao vivo** coloca a imagem da câmera num slide, em formato retangular ou circular, com opção de espelhamento. Ele funciona na janela do público durante a apresentação no Cadenza.

## Apresentação e compartilhamento

A tela do apresentador reúne slide atual, próximo slide, notas, cronômetro e relógio. Com dois monitores, você pode manter esses controles numa tela e mostrar os slides ao público na outra. Com uma só tela, a tecla **X** alterna entre a apresentação e a tela do apresentador. Numa videochamada, compartilhe apenas a janela da apresentação para manter as notas fora da transmissão.

O **teleprompter** usa as notas do slide atual e acompanha a troca de slides. Você pode movê-lo, redimensioná-lo, pausar a rolagem e ajustar velocidade, fonte, tamanho do texto, espaçamento, cores e transparência. Há espelhamento para uso com vidro de teleprompter e uma linha de leitura. Ele pertence à tela do apresentador e não é desenhado na janela do público.

Além da sequência horizontal, há **subslides verticais**: um tópico pode ter uma sequência de aprofundamento abaixo dele. Slides ocultos permitem manter material de apoio no arquivo, e o avanço automático atende apresentações que devem seguir sem intervenção. Quem começa pelo texto pode importar Markdown no estilo do reveal.js e continuar a edição visual.

<figure style="width:85%; height:auto; max-width:85%; display:block; margin: 0 auto;">
  <img src="./presenter-pt.png" alt="A tela do apresentador, com o slide atual, o próximo slide, as notas e o cronômetro">
  <figcaption style="margin-top: 1px; font-size: 0.8em; color: #555; line-height:1.5;">A tela do apresentador, com o slide atual, o próximo, as notas e o cronômetro
  </figcaption>
</figure>

## Idiomas

A interface está disponível em alemão, árabe, bengali, chinês (simplificado), espanhol, francês, hindi, holandês, inglês, italiano, japonês, polonês, português, português do Brasil, russo e turco. O inglês é o idioma padrão; para trocar, use **Ajustes > Idioma**.

# Cadenza, Keynote, PowerPoint e Google Slides

Os quatro aplicativos atendem ao trabalho básico de montar e apresentar slides. As diferenças ficam mais claras ao considerar onde o arquivo vive, como o conteúdo técnico é editado, como a apresentação será distribuída e se outras pessoas precisam trabalhar nela ao mesmo tempo.

A comparação abaixo foi revisada em **15 de outubro de 2026**. Ela considera o **Cadenza 0.3.1**, o **Keynote para Mac**, o **PowerPoint para desktop do Microsoft 365** e o **Google Slides no navegador**; os editores web e móveis de cada família aparecem numa linha própria. **Sim** indica suporte integrado; **&#45;&#45;** indica que não há suporte nativo documentado para aquela função nesse recorte. Condições de plano, plataforma, serviço ou complemento são indicadas nas células. Isso não impede reproduzir um resultado com imagens, ferramentas externas ou extensões.

<style>
.cadenza-comparison table { min-width: 44rem; font-size: 0.85em; }
.cadenza-comparison th, .cadenza-comparison td { padding: 0.5rem 0.65rem; line-height: 1.5; text-align: left; }
</style>

<div class="cadenza-comparison" role="region" aria-label="Comparação de recursos entre Cadenza, Keynote, PowerPoint e Google Slides" tabindex="0" style="overflow-x: auto;">

| Recurso | Cadenza | Keynote | PowerPoint | Google Slides |
|:--|:--|:--|:--|:--|
| Texto, imagens, formas e tabelas | Sim | Sim | Sim | Sim |
| Temas e layouts | Sim | Sim | Sim | Sim |
| Gráficos com dados editáveis | Sim; 18 tipos | Sim | Sim | Sim; dados no [Sheets][google-charts] |
| Transições e animação de objetos | Sim | Sim | Sim | Sim |
| Notas e tela do apresentador | Sim | Sim | Sim | Sim |
| PDF | Sim; impressão | Sim | Sim | Sim |
| Aplicativo de desktop | Linux, macOS e Windows | macOS | Windows e macOS | Editor no navegador |
| Edição offline | Sim | Sim | Sim; após instalação e ativação[^offline] | Sim; exige configuração prévia[^offline] |
| Software livre | Sim; MIT | &#45;&#45;; proprietário | &#45;&#45;; proprietário | &#45;&#45;; proprietário |
| Equações a partir de LaTeX | Sim; KaTeX | Sim; LaTeX e MathML[^math] | &#45;&#45;; editor com UnicodeMath[^math] | &#45;&#45;; por complemento, como MathType[^math] |
| Código com sintaxe colorida e realce de linhas por etapas | Sim | &#45;&#45; | &#45;&#45; | &#45;&#45; |
| Mermaid com código editável | Sim | &#45;&#45; | &#45;&#45; | &#45;&#45; |
| Importação de Markdown no estilo reveal.js | Sim | &#45;&#45; | &#45;&#45; | &#45;&#45; |
| Subslides com navegação vertical | Sim | &#45;&#45; | &#45;&#45; | &#45;&#45; |
| CSS próprio por apresentação | Sim | &#45;&#45; | &#45;&#45; | &#45;&#45; |
| Teleprompter com rolagem automática | Sim; durante a apresentação | &#45;&#45;; notas com leitura manual | Na gravação no Windows[^teleprompter] | No Google Vids, para gravação[^teleprompter] |
| Câmera ao vivo dentro do slide | Sim; ao apresentar no app | [Sim][keynote-camera] | [Sim; Cameo][powerpoint-camera] | [Speaker spotlight; contas elegíveis][google-camera] |
| HTML para hospedar por conta própria | Sim; arquivo único ou pasta | [Sim; exportação HTML][keynote-export] | [&#45;&#45;; sem exportação HTML direta][powerpoint-html] | &#45;&#45;; publicação hospedada pelo Google[^html] |
| Abrir e exportar PPTX | &#45;&#45; | Sim; conversão | Sim; formato nativo | [Sim; importação/exportação][google-office] |
| Edição simultânea por várias pessoas | &#45;&#45; | Sim; iCloud[^collaboration] | Sim; OneDrive/SharePoint[^collaboration] | Sim[^collaboration] |
| Comentários de revisão | &#45;&#45; | Sim | Sim | Sim |
| Editor web ou móvel | &#45;&#45; | iCloud; iPhone e iPad | Web; Android e iOS | Web; Android e iOS |
| Gravar a apresentação em vídeo | &#45;&#45; | [Sim][keynote-export] | [Sim][powerpoint-recording] | [Via Google Vids; contas elegíveis][google-recording] |

</div>

As funções gerais e a disponibilidade por plataforma estão documentadas nos guias do [Keynote][keynote-guide], do [PowerPoint][powerpoint-platforms] e do [Google Slides][google-guide]. Para abrir arquivos PowerPoint no Keynote e exportá-los novamente, veja também os [formatos aceitos pela Apple][keynote-formats].

## O que o Cadenza ainda não oferece

As limitações de formato e colaboração pesam na escolha tanto quanto os recursos de edição. Na versão 0.3.1, não há importação ou exportação de **PPTX**, coedição em tempo real, comentários de revisão ou histórico compartilhado na nuvem. Enviar um `.cadenza` a outra pessoa permite que ela trabalhe numa cópia; isso não equivale a editar o mesmo documento em conjunto.

Também não há editor web ou aplicativo móvel, nem gravação integrada da apresentação em vídeo. O HTML exportado pode ser apresentado num navegador, mas não oferece o editor do Cadenza. Para gravar uma aula, é necessário usar uma ferramenta de captura de tela. A câmera ao vivo e o teleprompter do aplicativo não constituem um gravador.

# Privacidade

O **Cadenza** não exige conta para criar, editar, salvar ou apresentar arquivos locais. Os recursos on-line, como download de fontes, busca de mídia e reprodução de vídeos externos, acessam os respectivos serviços quando usados.

As chaves de API ficam no cofre de senhas do sistema: Secret Service no Linux, Acesso às Chaves no macOS e Gerenciador de Credenciais no Windows. Elas não são gravadas nas apresentações.

# Arquivos

O arquivo de edição e os formatos de distribuição têm funções diferentes. Guarde o `.cadenza` para continuar o trabalho; escolha HTML para distribuir uma apresentação navegável e PDF para uma cópia estática.

- **`.cadenza`**: uma apresentação, guardada como um arquivo zip com o `deck.json` e as mídias e fontes que ela usa.
- **`.cadenza-theme`**: um tema criado no construtor de temas (JSON, com as fontes incluídas).
- **HTML em um arquivo**: reúne a apresentação e seus recursos incorporados num `.html`, que pode ser aberto num navegador sem instalar o Cadenza. Referências a serviços externos ainda dependem de rede.
- **HTML em uma pasta**: separa a página e os recursos, para publicação num servidor próprio ou serviço de hospedagem estática.
- **PDF**: usa a impressão do sistema para produzir páginas estáticas. Vídeos, transições e interações não são preservados como recursos executáveis.

O HTML mantém a navegação e os recursos de apresentação compatíveis com o navegador. Ele não substitui o `.cadenza` como formato de edição, e não há importação de um HTML arbitrário para reconstruir o projeto. Para material com vídeos ou fontes específicas, vale conferir o resultado no computador e no navegador em que será apresentado.

# Código-fonte

O código do **Cadenza** está no [GitHub](https://github.com/rodolfo-viana/cadenza), com as instruções para [compilar a partir do código-fonte](https://github.com/rodolfo-viana/cadenza#building-from-source), o [histórico de mudanças](https://github.com/rodolfo-viana/cadenza/blob/main/CHANGELOG.md) e o [guia de contribuição](https://github.com/rodolfo-viana/cadenza/blob/main/CONTRIBUTING.md). Relatos de erro, sugestões e traduções são bem-vindos nas [issues](https://github.com/rodolfo-viana/cadenza/issues).

O **Cadenza** é distribuído sob a [licença MIT](https://github.com/rodolfo-viana/cadenza/blob/main/LICENSE). Ele inclui reveal.js, KaTeX, Mermaid, highlight.js, Preact, htm e ícones Lucide, cada um sob a própria licença.

As descrições do Cadenza nesta página seguem o [README](https://github.com/rodolfo-viana/cadenza/blob/main/README.md) e o [histórico da versão 0.3.1](https://github.com/rodolfo-viana/cadenza/blob/main/CHANGELOG.md#031--2026-10-15). As referências abaixo detalham as condições da comparação.

[^offline]: A Microsoft documenta o [uso offline após instalação e ativação][powerpoint-offline], com reconexão periódica para o Microsoft 365. O Google Slides exige [preparação do acesso offline][google-offline], incluindo Chrome ou Edge e a extensão Google Docs Offline no computador.
[^math]: O Keynote aceita [LaTeX e MathML][keynote-math]. A Microsoft distingue o LaTeX do Word do [UnicodeMath disponível nos demais aplicativos do Office][powerpoint-math]. No Google Slides, [MathType][google-math] é um complemento de terceiros, com condições próprias de assinatura.
[^teleprompter]: A Microsoft descreve a rolagem automática no [modo Teleprompter da gravação no Windows][powerpoint-recording]. O [estúdio do Google Vids][google-teleprompter] também oferece rolagem, mas é outro aplicativo e não o modo de apresentação ao vivo do Slides; a disponibilidade dos serviços depende da conta.
[^html]: O [Publish to the web do Google][google-publish] publica uma apresentação no serviço ou fornece sua incorporação numa página. O [PowerPoint também pode ser incorporado via OneDrive][powerpoint-embed]. Esses caminhos dependem da hospedagem do fornecedor; não equivalem a exportar a apresentação completa para um servidor próprio.
[^collaboration]: Veja a [colaboração no Keynote com iCloud][keynote-collaboration], a [coautoria, os comentários e o histórico do Microsoft 365][powerpoint-collaboration] e os [recursos de compartilhamento e histórico do Slides][google-guide]. Sincronização de arquivos e recuperação local não equivalem a coedição.

[keynote-guide]: https://support.apple.com/guide/keynote/welcome/mac
[keynote-export]: https://support.apple.com/guide/keynote/export-to-powerpoint-or-another-file-format-tana0d19882a/mac
[keynote-formats]: https://support.apple.com/en-gb/105050
[keynote-math]: https://support.apple.com/guide/keynote/add-mathematical-equations-tan72a69d01f/mac
[keynote-camera]: https://support.apple.com/en-au/guide/keynote/tan6a7b90433/mac
[keynote-collaboration]: https://support.apple.com/en-ie/guide/icloud/mm94c7734855/icloud
[powerpoint-platforms]: https://support.microsoft.com/en-us/powerpoint/compare-powerpoint-features-on-different-platforms
[powerpoint-offline]: https://support.microsoft.com/en-us/office/lifecycle/lc-account/what-s-the-difference-between-microsoft-365-and-office-2024
[powerpoint-math]: https://support.microsoft.com/en-gb/word/linear-format-equations-using-unicodemath-and-latex-in-word
[powerpoint-camera]: https://support.microsoft.com/en-us/powerpoint/presenting-with-cameo
[powerpoint-recording]: https://support.microsoft.com/en-gb/powerpoint/record-your-presentation
[powerpoint-html]: https://support.microsoft.com/en-us/powerpoint/publish-your-presentation-to-the-web
[powerpoint-embed]: https://support.microsoft.com/en-us/powerpoint/embed-a-presentation-in-a-web-page-or-blog
[powerpoint-collaboration]: https://support.microsoft.com/en-gb/office/collaborate-with-others-b85eef71-e96b-4325-9501-228588728bc9
[google-guide]: https://support.google.com/a/users/answer/9300133?hl=en
[google-office]: https://support.google.com/a/users/answer/9283194?hl=en
[google-charts]: https://support.google.com/docs/answer/7009814?hl=en
[google-offline]: https://support.google.com/docs/answer/6388102?hl=en
[google-math]: https://workspace.google.com/marketplace/app/mathtype/742924286153
[google-camera]: https://support.google.com/docs/answer/14260821?hl=en
[google-recording]: https://support.google.com/docs/answer/17570752?hl=en
[google-teleprompter]: https://support.google.com/docs/answer/14956207?hl=en
[google-publish]: https://support.google.com/a/users/answer/13004062?hl=en
