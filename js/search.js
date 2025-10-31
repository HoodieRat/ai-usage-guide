/*
  Global site search (guides only). The prompt library page has its own local search logic.
*/
(function () {
  const searchInput = document.querySelector('[data-search-input]');
  const resultsPanel = document.querySelector('[data-search-results]');
  const resultsList = document.querySelector('[data-search-results-list]');
  const closeButton = document.querySelector('[data-search-close]');
  const body = document.body;
  const SEARCH_ENDPOINT = '../data/search.json';
  let index = [];
  let activeItemIndex = -1;
  let lastQuery = '';
  let previousFocus;

  if (!searchInput || !resultsPanel || !resultsList || !closeButton) {
    return;
  }

  async function loadIndex() {
    try {
      const response = await fetch(SEARCH_ENDPOINT, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error(`Search request failed: ${response.status}`);
      }
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Search index is not an array.');
      }

      // Skip prompt catalog entries (guarded by type flag).
      index = data.filter((item) => item.type !== 'prompt');
    } catch (error) {
      console.error('Search index failed to load:', error);
    }
  }

  function openPanel() {
    if (resultsPanel.hidden) {
      resultsPanel.hidden = false;
      body.classList.add('search-open');
    }
  }

  function closePanel() {
    resultsPanel.hidden = true;
    body.classList.remove('search-open');
    resultsList.innerHTML = '';
    searchInput.value = '';
    activeItemIndex = -1;
    lastQuery = '';

    if (previousFocus) {
      previousFocus.focus();
      previousFocus = null;
    }
  }

  function highlight(text, query) {
    if (!query) return text;
    const normalized = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${normalized})`, 'ig');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function renderResults(items, query) {
    resultsList.innerHTML = '';
    activeItemIndex = -1;

    if (!items.length) {
      const emptyItem = document.createElement('li');
      emptyItem.className = 'search-results-empty';
      emptyItem.textContent = 'No results found.';
      resultsList.appendChild(emptyItem);
      return;
    }

    items.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'search-results-item';

      const link = document.createElement('a');
      link.href = item.url;
      link.innerHTML = `
        <span class="search-results-title">${highlight(item.title, query)}</span>
        <span class="search-results-unit">${highlight(item.unit, query)}</span>
        <span class="search-results-snippet">${highlight(item.snippet, query)}</span>
      `;

      link.addEventListener('focus', () => {
        activeItemIndex = index;
      });

      listItem.appendChild(link);
      resultsList.appendChild(listItem);
    });
  }

  function rankResults(query) {
    if (!query) {
      return [];
    }

    const normalized = query.toLowerCase();

    const scored = index
      .map((item) => {
        let score = 0;
        const title = item.title.toLowerCase();
        const unit = item.unit.toLowerCase();
        const snippet = item.snippet.toLowerCase();

        if (title.includes(normalized)) score += 5;
        if (unit.includes(normalized)) score += 2;
        if (snippet.includes(normalized)) score += 1;

        if (item.tags) {
          const tagScore = item.tags.some((tag) => tag.toLowerCase().includes(normalized));
          if (tagScore) score += 2;
        }

        if (score === 0) return null;

        return { ...item, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

    return scored.slice(0, 12);
  }

  function handleSearchEvent(event) {
    const query = event.target.value.trim();
    if (query === lastQuery) {
      return;
    }

    lastQuery = query;

    if (!query) {
      resultsList.innerHTML = '';
      resultsPanel.hidden = true;
      body.classList.remove('search-open');
      return;
    }

    const ranked = rankResults(query);
    renderResults(ranked, query);
    openPanel();
  }

  function focusNextItem(direction) {
    const items = resultsList.querySelectorAll('.search-results-item a');
    if (!items.length) {
      return;
    }

    activeItemIndex = (activeItemIndex + direction + items.length) % items.length;
    items[activeItemIndex].focus();
  }

  function handleKeydown(event) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        openPanel();
        focusNextItem(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        openPanel();
        focusNextItem(-1);
        break;
      case 'Escape':
        closePanel();
        break;
      case 'Enter':
      case 'Tab':
        if (!resultsPanel.hidden && activeItemIndex === -1) {
          const items = resultsList.querySelectorAll('.search-results-item a');
          if (items.length) {
            items[0].focus();
          }
        }
        break;
      default:
        break;
    }
  }

  searchInput.addEventListener('input', handleSearchEvent);
  searchInput.addEventListener('focus', () => {
    previousFocus = document.activeElement;
  });
  searchInput.addEventListener('keydown', handleKeydown);

  closeButton.addEventListener('click', closePanel);

  document.addEventListener('click', (event) => {
    if (!resultsPanel.contains(event.target) && event.target !== searchInput) {
      closePanel();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !resultsPanel.hidden) {
      closePanel();
    }
  });

  loadIndex();
}());
