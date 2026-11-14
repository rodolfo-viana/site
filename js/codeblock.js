// Adds a language badge to every highlighted code block and keeps it pinned to
// the right edge while the block scrolls horizontally.
document.addEventListener('DOMContentLoaded', function () {
    // Select all `pre` elements containing `code`

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const pre = entry.target.parentNode;
            const label = pre.querySelector('.code-label');

            if (label) {
                // Adjust the position of the label similarly
                label.style.right = entry.isIntersecting ? '0px' : `-${entry.boundingClientRect.right - pre.clientWidth}px`;
            }
        });
    }, {
        root: null, // observing relative to viewport
        rootMargin: '0px',
        threshold: 1.0 // Adjust this to control when the callback fires
    });

    document.querySelectorAll('pre code').forEach(codeBlock => {
        const pre = codeBlock.parentNode;
        pre.style.position = 'relative'; // Ensure parent `pre` can contain absolute elements

        // Zola emits <code data-lang="python">, not class="language-python",
        // so the class lookup alone always fell through to 'default'.
        const lang = codeBlock.dataset.lang
            || (codeBlock.className.match(/language-([\w-]+)/) || [])[1]
            || 'default';

        // Create and append the label
        const label = document.createElement('span');
        label.className = 'code-label label-' + lang; // Use the specific language class
        label.textContent = lang.toUpperCase(); // Display the language as label
        pre.appendChild(label);

        let ticking = false;
        pre.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    label.style.right = `-${pre.scrollLeft}px`;
                    ticking = false;
                });
                ticking = true;
            }
        });

    });
});
