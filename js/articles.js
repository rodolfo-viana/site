(function() {
  const status = document.querySelector('#bibtex-copy-status');

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand('copy');
    textArea.remove();
    if (!copied) throw new Error('Clipboard copy failed');
  }

  document.querySelectorAll('.bibtex-copy').forEach(function(button) {
    button.addEventListener('click', async function() {
      const entry = button.closest('.article-entry');
      const bibtex = entry.querySelector('.article-bibtex').textContent.trim();

      try {
        await copyText(bibtex);
        button.classList.add('copied');
        button.setAttribute('aria-label', button.dataset.copiedLabel);
        button.setAttribute('title', button.dataset.copiedLabel);
        if (status) status.textContent = button.dataset.copiedLabel;

        window.setTimeout(function() {
          button.classList.remove('copied');
          button.setAttribute('aria-label', button.dataset.copyLabel);
          button.setAttribute('title', button.dataset.copyLabel);
          if (status) status.textContent = '';
        }, 1500);
      } catch (error) {
        if (status) status.textContent = button.dataset.errorLabel;
      }
    });
  });
})();
