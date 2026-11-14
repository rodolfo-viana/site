import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

mermaid.initialize({ startOnLoad: false });

const diagrams = Array.from(document.querySelectorAll('.mermaid'), element => {
  // Decode HTML entities without losing line breaks inside diagram labels.
  const source = document.createElement('textarea');
  source.innerHTML = element.innerHTML;
  return { element, source: source.value };
});

let requestedTheme;
let renderQueue = document.fonts.ready;
let renderId = 0;

function updateMermaidTheme() {
  const theme = document.body.classList.contains('dark') ? 'dark' : 'default';
  if (theme === requestedTheme) return;
  requestedTheme = theme;

  // Serialize renders and skip stale requests when the theme changes quickly.
  renderQueue = renderQueue.then(async () => {
    if (theme !== requestedTheme) return;
    mermaid.initialize({ startOnLoad: false, theme });

    for (const { element, source } of diagrams) {
      const { svg, bindFunctions } = await mermaid.render(`site-mermaid-${renderId++}`, source);
      if (theme !== requestedTheme) return;
      element.innerHTML = svg;
      element.dataset.processed = 'true';
      bindFunctions?.(element);
    }
  }).catch(error => console.error('Unable to render Mermaid diagrams:', error));
}

const themeObserver = new MutationObserver(updateMermaidTheme);
themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
updateMermaidTheme();
