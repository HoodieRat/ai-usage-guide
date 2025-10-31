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
  const FACETS = [
    { key: 'guide', label: 'Guides' },
    { key: 'prompt', label: 'Prompts' },
    { key: 'template', label: 'Templates' },
    { key: 'all', label: 'All' },
  ];

  let index = [];
  let activeItemIndex = -1;
  let lastQuery = '';
  let previousFocus;
  let typeFilter = 'guide';
  let facetButtons = [];
  const facetsContainer = document.createElement('div');
  facetsContainer.className = 'search-facets';

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

      index = data;
      renderFacetButtons();
    } catch (error) {
      console.error('Search index failed to load:', error);
    }
  }

  function renderFacetButtons() {
    const header = resultsPanel.querySelector('.search-results-header');
    if (!header || facetsContainer.childElementCount) {
      return;
    }

    facetButtons = FACETS.map((facet) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'search-facet';
      button.dataset.facet = facet.key;
      button.textContent = facet.label;
      button.setAttribute('aria-pressed', facet.key === typeFilter ? 'true' : 'false');
      button.addEventListener('click', () => {
        setFacet(facet.key);
      });
      facetsContainer.appendChild(button);
      return button;
    });

    header.insertAdjacentElement('afterend', facetsContainer);
  }

  function setFacet(key) {
    typeFilter = key;
    facetButtons.forEach((button) => {
      const isActive = button.dataset.facet === typeFilter;
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    if (lastQuery) {
      const ranked = rankResults(lastQuery);
      renderResults(ranked, lastQuery);
      if (ranked.length) {
        openPanel();
      }
    }
  }

  function normalize(value) {
    return (value || '').toString().toLowerCase();
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
    text = (text || '').toString();
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
        <span class="search-results-unit">${highlight(item.meta || item.unit || '', query)}</span>
        <span class="search-results-snippet">${highlight(item.snippet || '', query)}</span>
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
      .filter((item) => typeFilter === 'all' || item.type === typeFilter)
      .map((item) => {
        let score = 0;
        const title = normalize(item.title);
        const meta = normalize(item.meta || item.unit);
        const snippet = normalize(item.snippet);

        if (title.includes(normalized)) score += 5;
        if (meta.includes(normalized)) score += 2;
        if (snippet.includes(normalized)) score += 1;

        if (Array.isArray(item.tags) && item.tags.length) {
          const tagHit = item.tags.some((tag) => normalize(tag).includes(normalized));
          if (tagHit) score += 2;
        }

        if (score === 0) return null;

        // Favour guides when "all" is selected so core content stays on top.
        if (typeFilter === 'all' && item.type === 'guide') {
          score += 1;
        }

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
