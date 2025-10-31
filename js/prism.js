// Lightweight placeholder for PrismJS highlighting.
// For demo snippets, it simply preserves existing markup and tags <pre><code> blocks.
(function () {
  document.querySelectorAll('pre code').forEach((block) => {
    const parent = block.parentElement;
    if (!parent) return;
    parent.setAttribute('tabindex', '0');
    if (!parent.classList.contains('language-text')) {
      parent.classList.add('language-text');
    }
  });
})();
