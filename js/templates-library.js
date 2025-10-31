(function () {
  const gallery = document.querySelector('[data-template-gallery]');
  if (!gallery) {
    return;
  }

  const filtersPanel = document.querySelector('[data-template-filters]');
  const errorNotice = document.querySelector('[data-template-error]');
  const tagContainer = document.querySelector('[data-template-tags]');
  const loadingCard = gallery.querySelector('[data-template-loading]');
  const filterControls = {
    category: document.querySelector('[data-template-filter="category"]'),
    difficulty: document.querySelector('[data-template-filter="difficulty"]'),
    format: document.querySelector('[data-template-filter="format"]'),
    search: document.querySelector('[data-template-filter="search"]'),
    clear: document.querySelector('[data-template-filter="clear"]'),
  };

  const state = {
    entries: [],
    filtered: [],
    category: 'all',
    difficulty: 'all',
    format: 'all',
    searchTerm: '',
    selectedTags: new Set(),
  };

  const basePath = document.body.dataset.base || '.';

  function resolveResource(path) {
    const sanitized = (path || '').replace(/^\.\//, '');
    if (!basePath || basePath === '.' || basePath === './') {
      return sanitized;
    }
    return `${basePath.replace(/\/$/, '')}/${sanitized}`;
  }

  function isLocalPreview() {
    return window.location.protocol === 'file:';
  }

  function normalize(value) {
    return (value || '').toString().toLowerCase();
  }

  function createBadge(text) {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = text;
    return badge;
  }

  function renderList(items) {
    const list = document.createElement('ul');
    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    return list;
  }

  function renderFields(fields) {
    const list = document.createElement('ul');
    fields.forEach((field) => {
      const li = document.createElement('li');
      li.textContent = `${field.label}: ${field.placeholder}`;
      list.appendChild(li);
    });
    return list;
  }

  function toCopyPayload(entry, mode) {
    if (mode === 'meta') {
      const guardrails = entry.guardrails.join('; ') || 'None listed';
      const deliverables = entry.deliverables.join(', ') || '—';
      const tags = entry.tags.join(', ') || '—';
      return [
        `${entry.id} · ${entry.title}`,
        `Category: ${entry.category}`,
        `Format: ${entry.format} · Difficulty: ${entry.difficulty}`,
        `Use case: ${entry.use_case}`,
        `Owner: ${entry.owner}`,
        `Last review: ${entry.last_review} · Cadence: ${entry.review_cadence_days} days`,
        `Guardrails: ${guardrails}`,
        `Deliverables: ${deliverables}`,
        `Tags: ${tags}`,
      ].join('\n');
    }

    return entry.full_template;
  }

  function copyText(entry, button, mode) {
    const text = toCopyPayload(entry, mode);

    const fallback = () => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } finally {
        document.body.removeChild(textarea);
      }
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(fallback);
    } else {
      fallback();
    }

    if (button) {
      const label = button.textContent;
      button.textContent = 'Copied';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = label;
        button.disabled = false;
      }, 1600);
    }
  }

  function matchesTags(entry) {
    if (!state.selectedTags.size) {
      return true;
    }
    const tags = new Set(entry.tags.map((tag) => normalize(tag)));
    for (const tag of state.selectedTags) {
      if (!tags.has(tag)) {
        return false;
      }
    }
    return true;
  }

  function matchesSearch(entry) {
    if (!state.searchTerm) {
      return true;
    }
    const haystack = [
      entry.id,
      entry.title,
      entry.summary,
      entry.use_case,
      entry.category,
      entry.format,
      entry.difficulty,
      entry.owner,
      entry.guardrails.join(' '),
      entry.deliverables.join(' '),
      entry.tags.join(' '),
    ]
      .map(normalize)
      .join(' ');
    return haystack.includes(state.searchTerm);
  }

  function applyFilters() {
    state.filtered = state.entries.filter((entry) => {
      if (state.category !== 'all' && entry.category !== state.category) {
        return false;
      }
      if (state.difficulty !== 'all' && entry.difficulty !== state.difficulty) {
        return false;
      }
      if (state.format !== 'all' && entry.format !== state.format) {
        return false;
      }
      if (!matchesTags(entry)) {
        return false;
      }
      return matchesSearch(entry);
    });

    renderGallery();
  }

  function renderGallery() {
    gallery.innerHTML = '';

    if (!state.filtered.length) {
      const empty = document.createElement('div');
      empty.className = 'card';
      empty.textContent = 'No templates match the current filters.';
      gallery.appendChild(empty);
      return;
    }

    state.filtered.forEach((entry) => {
      const card = document.createElement('article');
      card.className = 'card template-card';
      card.id = entry.id;

      const eyebrow = document.createElement('p');
      eyebrow.className = 'eyebrow';
      eyebrow.textContent = entry.category;
      card.appendChild(eyebrow);

      const title = document.createElement('h3');
      title.textContent = entry.title;
      card.appendChild(title);

      const summary = document.createElement('p');
      summary.className = 'template-summary';
      summary.textContent = entry.summary;
      card.appendChild(summary);

      const meta = document.createElement('div');
      meta.className = 'template-meta';
      meta.appendChild(createBadge(`Difficulty: ${entry.difficulty}`));
      meta.appendChild(createBadge(entry.format));
      meta.appendChild(createBadge(`Review ${entry.review_cadence_days}d`));
      card.appendChild(meta);

      const owner = document.createElement('p');
      owner.className = 'template-owner';
      owner.innerHTML = `<strong>Owner:</strong> <a href="mailto:${entry.owner}">${entry.owner}</a>`;
      card.appendChild(owner);

      const details = document.createElement('details');
      const summaryEl = document.createElement('summary');
      summaryEl.textContent = 'View guardrails, deliverables, and template';
      details.appendChild(summaryEl);

      const detailsBody = document.createElement('div');
      detailsBody.className = 'template-body';

      const guardrailHeading = document.createElement('h4');
      guardrailHeading.textContent = 'Guardrails';
      detailsBody.appendChild(guardrailHeading);
      detailsBody.appendChild(renderList(entry.guardrails));

      const deliverableHeading = document.createElement('h4');
      deliverableHeading.textContent = 'Deliverables';
      detailsBody.appendChild(deliverableHeading);
      detailsBody.appendChild(renderList(entry.deliverables));

      const fieldsHeading = document.createElement('h4');
      fieldsHeading.textContent = 'Fill before use';
      detailsBody.appendChild(fieldsHeading);
      detailsBody.appendChild(renderFields(entry.fields));

      if (entry.tags.length) {
        const tagsHeading = document.createElement('h4');
        tagsHeading.textContent = 'Tags';
        detailsBody.appendChild(tagsHeading);
        detailsBody.appendChild(renderList(entry.tags));
      }

      const templateHeading = document.createElement('h4');
      templateHeading.textContent = 'Template text';
      detailsBody.appendChild(templateHeading);
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = entry.full_template;
      pre.appendChild(code);
      detailsBody.appendChild(pre);

      details.appendChild(detailsBody);
      card.appendChild(details);

      const actions = document.createElement('div');
      actions.className = 'template-actions';

      const copyTemplateButton = document.createElement('button');
      copyTemplateButton.type = 'button';
      copyTemplateButton.className = 'link-button';
      copyTemplateButton.textContent = 'Copy template';
      copyTemplateButton.addEventListener('click', () => copyText(entry, copyTemplateButton));
      actions.appendChild(copyTemplateButton);

      const copyMetaButton = document.createElement('button');
      copyMetaButton.type = 'button';
      copyMetaButton.className = 'link-button';
      copyMetaButton.textContent = 'Copy metadata';
      copyMetaButton.addEventListener('click', () => copyText(entry, copyMetaButton, 'meta'));
      actions.appendChild(copyMetaButton);

      card.appendChild(actions);
      gallery.appendChild(card);
    });
  }

  function renderSelectOptions(entries, key, select) {
    const unique = Array.from(new Set(entries.map((entry) => entry[key]))).filter(Boolean);
    unique.sort((a, b) => a.localeCompare(b));
    unique.forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  function renderTags(entries) {
    if (!tagContainer) {
      return;
    }
    tagContainer.innerHTML = '';
    const unique = new Set();
    entries.forEach((entry) => {
      entry.tags.forEach((tag) => unique.add(tag));
    });
    const sorted = Array.from(unique).sort((a, b) => a.localeCompare(b));
    sorted.forEach((tag) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tag-chip';
      button.textContent = tag;
      button.dataset.tagValue = tag;
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        const normalizedTag = normalize(tag);
        const isSelected = state.selectedTags.has(normalizedTag);
        if (isSelected) {
          state.selectedTags.delete(normalizedTag);
          button.setAttribute('aria-pressed', 'false');
        } else {
          state.selectedTags.add(normalizedTag);
          button.setAttribute('aria-pressed', 'true');
        }
        applyFilters();
      });
      tagContainer.appendChild(button);
    });
  }

  function resetFilters() {
    state.category = 'all';
    state.difficulty = 'all';
    state.format = 'all';
    state.searchTerm = '';
    state.selectedTags.clear();

    if (filterControls.category) filterControls.category.value = 'all';
    if (filterControls.difficulty) filterControls.difficulty.value = 'all';
    if (filterControls.format) filterControls.format.value = 'all';
    if (filterControls.search) filterControls.search.value = '';

    if (tagContainer) {
      tagContainer.querySelectorAll('.tag-chip').forEach((chip) => {
        chip.setAttribute('aria-pressed', 'false');
      });
    }

    applyFilters();
  }

  async function loadTemplates() {
    const resource = resolveResource('data/templates/library.json');
    try {
      if (isLocalPreview()) {
        throw new Error('Local file previews block library loading.');
      }

      const response = await fetch(resource, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Template catalog is not an array.');
      }

      data.sort((a, b) => a.id.localeCompare(b.id));
      data.forEach((entry) => {
        entry.guardrails = Array.isArray(entry.guardrails) ? entry.guardrails : [];
        entry.deliverables = Array.isArray(entry.deliverables) ? entry.deliverables : [];
        entry.fields = Array.isArray(entry.fields) ? entry.fields : [];
        entry.tags = Array.isArray(entry.tags) ? entry.tags : [];
      });

      state.entries = data;
      state.filtered = data.slice();

      if (filtersPanel) {
        filtersPanel.hidden = false;
      }
      if (loadingCard) {
        loadingCard.remove();
      }

      renderSelectOptions(data, 'category', filterControls.category);
      renderSelectOptions(data, 'difficulty', filterControls.difficulty);
      renderSelectOptions(data, 'format', filterControls.format);
      renderTags(data);
      renderGallery();
    } catch (error) {
      console.error('Template library failed to load:', error);
      if (gallery) {
        gallery.innerHTML = '';
        const message = document.createElement('div');
        message.className = 'card';
        const advice = isLocalPreview()
          ? 'Serve the site from a web server (for example run "python -m http.server 8000" at the repository root) to browse the template catalog.'
          : `The request to ${resource} failed. ${error.message}`;
        message.textContent = `Template library unavailable. ${advice}`;
        gallery.appendChild(message);
      }
      if (errorNotice) {
        errorNotice.hidden = false;
      }
    }
  }

  if (filterControls.category) {
    filterControls.category.addEventListener('change', (event) => {
      state.category = event.target.value;
      applyFilters();
    });
  }

  if (filterControls.difficulty) {
    filterControls.difficulty.addEventListener('change', (event) => {
      state.difficulty = event.target.value;
      applyFilters();
    });
  }

  if (filterControls.format) {
    filterControls.format.addEventListener('change', (event) => {
      state.format = event.target.value;
      applyFilters();
    });
  }

  if (filterControls.search) {
    let timer;
    filterControls.search.addEventListener('input', (event) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        state.searchTerm = normalize(event.target.value);
        applyFilters();
      }, 160);
    });
  }

  if (filterControls.clear) {
    filterControls.clear.addEventListener('click', resetFilters);
  }

  loadTemplates();
}());
