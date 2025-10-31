(function () {
  const navContainer = document.querySelector('[data-nav]');
  if (!navContainer) return;

  const basePath = document.body.dataset.base || '.';
  const sidebar = document.getElementById('sidebar');
  const mobileToggle = document.querySelector('[data-mobile-nav-toggle]');

  const fallbackSections = Array.isArray(window.__TOC_DATA) && window.__TOC_DATA.length
    ? window.__TOC_DATA
    : [
        {
          title: 'Foundations',
          items: [
            { title: 'Read Me First', url: 'guides/00_readme.html' },
            { title: 'Getting Started', url: 'guides/01_getting-started.html' },
            { title: 'How ChatGPT Works', url: 'guides/02_how-chatgpt-works.html' },
            { title: 'Prompt Basics', url: 'guides/03_prompt-basics.html' },
            { title: 'Response Contracts', url: 'guides/04_response-contracts.html' },
            { title: 'Structured Output', url: 'guides/05_structured-output.html' },
            { title: 'Foundations Assessment', url: 'guides/foundations-assessment.html' }
          ]
        },
        {
          title: 'Sessions & Context',
          items: [
            { title: 'Sessions & Context', url: 'guides/10_sessions-and-context.html' },
            { title: 'Custom Instructions', url: 'guides/11_custom-instructions.html' },
            { title: 'Memory & Privacy', url: 'guides/12_memory-and-privacy.html' },
            { title: 'Handoff Between Chats', url: 'guides/13_handoff-between-chats.html' },
            { title: 'Sessions & Context Assessment', url: 'guides/context-assessment.html' }
          ]
        },
        {
          title: 'Projects & Files',
          items: [
            { title: 'Project Folders Setup', url: 'guides/20_project-folders-setup.html' },
            { title: 'File Upload Best Practices', url: 'guides/21_file-upload-best-practices.html' },
            { title: 'Context from Files & RAG Basics', url: 'guides/22_context-from-files_rag-basics.html' },
            { title: 'Chunking & Abstracts', url: 'guides/23_chunking-and-abstracts.html' },
            { title: 'Citations & Attribution', url: 'guides/24_citations-and-attribution.html' },
            { title: 'Redaction & Sanitization', url: 'guides/25_redaction-and-sanitization.html' },
            { title: 'Projects & Files Assessment', url: 'guides/projects-assessment.html' }
          ]
        },
        {
          title: 'Research & Reasoning',
          items: [
            { title: 'Browsing & Search', url: 'guides/30_browsing-and-search.html' },
            { title: 'Deep Research Playbook', url: 'guides/31_deep-research-playbook.html' },
            { title: 'Source Quality & Fact Checking', url: 'guides/32_source-quality-and-fact-checking.html' },
            { title: 'News & Recency', url: 'guides/33_news-and-recency.html' },
            { title: 'Math & Calcs', url: 'guides/34_math-and-calcs.html' },
            { title: 'Research & Reasoning Assessment', url: 'guides/research-assessment.html' }
          ]
        },
        {
          title: 'Agentic Workflows',
          items: [
            { title: 'Agentic Mode Overview', url: 'guides/40_agentic-mode_overview.html' },
            { title: 'Task Chains & Delegation', url: 'guides/41_task-chains-and-delegation.html' },
            { title: 'Planners, Critics & Validators', url: 'guides/42_planners-critics-validators.html' },
            { title: 'Automations & Reminders', url: 'guides/43_automations-and-reminders.html' },
            { title: 'Agentic Workflows Assessment', url: 'guides/agentic-assessment.html' }
          ]
        },
        {
          title: 'Collaboration',
          items: [
            { title: 'Collaboration Workflows', url: 'guides/50_collaboration-workflows.html' },
            { title: 'Meeting Notes & Actions', url: 'guides/51_meeting-notes-and-actions.html' },
            { title: 'Email Drafts & Templates', url: 'guides/52_email-drafts-and-templates.html' },
            { title: 'Brainstorm to Execution', url: 'guides/53_brainstorm-to-execution.html' },
            { title: 'Collaboration Assessment', url: 'guides/collaboration-assessment.html' }
          ]
        },
        {
          title: 'Applied Skills',
          items: [
            { title: 'Code Help for Non-Developers', url: 'guides/60_code-help_for-non-devs.html' },
            { title: 'Codegen Best Practices for Developers', url: 'guides/61_codegen-best-practices_for-devs.html' },
            { title: 'Data Analysis Basics', url: 'guides/62_data-analysis_basics.html' },
            { title: 'Tables, Visuals, and Diagrams', url: 'guides/63_tables-visuals-and-diagrams.html' },
            { title: 'Applied Skills Assessment', url: 'guides/applied-skills-assessment.html' }
          ]
        },
        {
          title: 'Safety & Quality',
          items: [
            { title: 'Safety and Ethics', url: 'guides/70_safety-and-ethics.html' },
            { title: 'Troubleshooting Bad Answers', url: 'guides/71_troubleshooting-bad-answers.html' },
            { title: 'Power User Checklists', url: 'guides/72_power-user-checklists.html' },
            { title: 'Safety & Quality Assessment', url: 'guides/safety-quality-assessment.html' },
            { title: 'Quality Assurance Loops', url: 'guides/82_quality-assurance_loops.html' }
          ]
        },
        {
          title: 'Templates & Integrations',
          items: [
            { title: 'Templates Library', url: 'guides/80_templates-library.html' },
            { title: 'Project Blueprints', url: 'guides/81_project-blueprints.html' },
            { title: 'Integrations & Tools', url: 'guides/83_integrations-and-tools.html' },
            { title: 'Prompt Library', url: 'guides/84_prompt-library.html' },
            { title: 'Templates & Integrations Assessment', url: 'guides/templates-integrations-assessment.html' }
          ]
        },
        {
          title: 'Assessments',
          items: [
            { title: 'Orientation', url: 'guides/orientation-assessment.html' },
            { title: 'Foundations', url: 'guides/foundations-assessment.html' },
            { title: 'Sessions & Context', url: 'guides/context-assessment.html' },
            { title: 'Projects & Files', url: 'guides/projects-assessment.html' },
            { title: 'Research & Reasoning', url: 'guides/research-assessment.html' },
            { title: 'Agentic Workflows', url: 'guides/agentic-assessment.html' },
            { title: 'Collaboration', url: 'guides/collaboration-assessment.html' },
            { title: 'Applied Skills', url: 'guides/applied-skills-assessment.html' },
            { title: 'Safety & Quality', url: 'guides/safety-quality-assessment.html' },
            { title: 'Templates & Integrations', url: 'guides/templates-integrations-assessment.html' },
            { title: 'Scorecard', url: 'guides/scorecard.html' }
          ]
        }
      ];

  function normalizePath(path) {
    return path.replace(/\\/g, '/');
  }

  function getCurrentPath() {
    const path = normalizePath(window.location.pathname || '');
    const marker = '/everyday-ai-guide/';
    const idx = path.lastIndexOf(marker);
    if (idx !== -1) {
      return path.slice(idx + marker.length);
    }
    const segments = path.split('/');
    return segments[segments.length - 1] || '';
  }

  function closeMobileMenu() {
    sidebar?.classList.remove('is-open');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function resolveUrl(url) {
    if (!url) return '#';
    if (/^(?:https?:)?\/\//.test(url) || url.startsWith('#')) {
      return url;
    }

    const sanitized = normalizePath(url).replace(/^\.\//, '');
    const normalizedBase = normalizePath(basePath || '.');

    if (!normalizedBase || normalizedBase === '.' || normalizedBase === './') {
      return sanitized;
    }

    const baseSegments = normalizedBase.split('/');
    const targetSegments = sanitized.split('/');
    const segments = [];

    const applySegment = (segment) => {
      if (!segment || segment === '.') {
        return;
      }

      if (segment === '..') {
        if (!segments.length || segments[segments.length - 1] === '..') {
          segments.push('..');
        } else {
          segments.pop();
        }
        return;
      }

      segments.push(segment);
    };

    baseSegments.forEach(applySegment);
    targetSegments.forEach((segment, index) => {
      if (index === 0 && segments.length && segment && segment === segments[segments.length - 1]) {
        return;
      }
      applySegment(segment);
    });

    return segments.join('/') || '.';
  }

  function shouldUseFallback() {
    return typeof fetch !== 'function' || window.location.protocol === 'file:';
  }

  function loadNavigationData() {
    if (shouldUseFallback()) {
      return Promise.resolve(fallbackSections);
    }

  return fetch(`${basePath}/data/toc.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load navigation data');
        return res.json();
      })
      .then((sections) => (Array.isArray(sections) && sections.length ? sections : fallbackSections))
      .catch((error) => {
        console.warn('[nav] Falling back to embedded navigation data', error);
        return fallbackSections;
      });
  }

  loadNavigationData()
    .then((sections) => {
      const currentPath = getCurrentPath();
      navContainer.innerHTML = '';

      const pathMatches = (url) => {
        if (!currentPath || !url) return false;
        const normalizedUrl = normalizePath(url).replace(/^[.\/]*/, '');
        const normalizedCurrent = normalizePath(currentPath).replace(/^[.\/]*/, '');
        return (
          normalizedCurrent === normalizedUrl ||
          normalizedCurrent.endsWith(`/${normalizedUrl}`) ||
          normalizedUrl.endsWith(normalizedCurrent)
        );
      };

      const itemIsActive = (item) => {
        if (!item) return false;
        if (pathMatches(item.url)) return true;
        if (Array.isArray(item.children)) {
          return item.children.some((child) => itemIsActive(child));
        }
        return false;
      };

      sections.forEach((group, index) => {
        const groupEl = document.createElement('section');
        groupEl.className = 'sidebar-group';

        const list = document.createElement('ul');
        list.className = 'sidebar-list';
        const groupId = `sidebar-group-${index}`;
        list.id = groupId;

  const hasActiveChild = (group.items || []).some((item) => itemIsActive(item));
  const hasHeading = Boolean(group.title);
  const shouldDefaultOpen = hasActiveChild || index === 0 || !hasHeading;

  if (group.title) {
          const headingButton = document.createElement('button');
          headingButton.type = 'button';
          headingButton.className = 'sidebar-heading';
          headingButton.textContent = group.title;
          headingButton.setAttribute('aria-controls', groupId);
          headingButton.setAttribute('aria-expanded', String(shouldDefaultOpen));

          headingButton.addEventListener('click', () => {
            const isExpanded = headingButton.getAttribute('aria-expanded') === 'true';
            headingButton.setAttribute('aria-expanded', String(!isExpanded));
            groupEl.classList.toggle('is-collapsed', isExpanded);
            list.hidden = isExpanded;
          });

          groupEl.appendChild(headingButton);
        }

        if (!shouldDefaultOpen && hasHeading) {
          groupEl.classList.add('is-collapsed');
          list.hidden = true;
        }

        (group.items || []).forEach((item) => {
          const li = document.createElement('li');
          const link = document.createElement('a');

          link.className = 'sidebar-link';
          link.href = resolveUrl(item.url);
          link.textContent = item.title;

          if (item.updated) {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = 'Updated';
            link.appendChild(badge);
          }

          if (pathMatches(item.url)) {
            link.classList.add('is-active');
            groupEl.classList.remove('is-collapsed');
            list.hidden = false;
            const headingBtn = groupEl.querySelector('.sidebar-heading');
            if (headingBtn) {
              headingBtn.setAttribute('aria-expanded', 'true');
            }
          }

          link.addEventListener('click', () => {
            closeMobileMenu();
          });

          li.appendChild(link);

          if (Array.isArray(item.children) && item.children.length) {
            const subList = document.createElement('ul');
            subList.className = 'sidebar-sublist';

            item.children.forEach((child) => {
              const subLi = document.createElement('li');
              const subLink = document.createElement('a');
              const normalizedChildUrl = normalizePath(child.url || '');

              subLink.className = 'sidebar-link';
              subLink.href = resolveUrl(child.url);
              subLink.textContent = child.title;

              if (normalizedChildUrl && (currentPath.endsWith(normalizedChildUrl) || normalizedChildUrl.endsWith(currentPath))) {
                subLink.classList.add('is-active');
                link.classList.add('is-active');
                groupEl.classList.remove('is-collapsed');
                list.hidden = false;
                const headingBtn = groupEl.querySelector('.sidebar-heading');
                if (headingBtn) {
                  headingBtn.setAttribute('aria-expanded', 'true');
                }
              }

              subLink.addEventListener('click', () => {
                closeMobileMenu();
              });

              subLi.appendChild(subLink);
              subList.appendChild(subLi);
            });

            li.appendChild(subList);
          }

          list.appendChild(li);
        });

        groupEl.appendChild(list);
        navContainer.appendChild(groupEl);
      });
    })
    .catch((error) => {
      console.error('[nav] Unable to build navigation', error);
      navContainer.innerHTML = '<p>Navigation failed to load.</p>';
    });

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!sidebar.classList.contains('is-open')) return;
      if (sidebar.contains(event.target) || mobileToggle.contains(event.target)) return;
      closeMobileMenu();
    });
  }
})();
