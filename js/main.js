(function () {
  const body = document.body;
  const THEME_KEY = 'everyday-ai-guide-theme';
  const themeToggle = document.querySelector('[data-theme-toggle]');

  function setTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('theme-dark');
      themeToggle?.setAttribute('data-theme', 'dark');
      themeToggle?.setAttribute('aria-pressed', 'true');
    } else {
      body.classList.remove('theme-dark');
      themeToggle?.setAttribute('data-theme', 'light');
      themeToggle?.setAttribute('aria-pressed', 'false');
    }
  }

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function toggleTheme() {
    const current = body.classList.contains('theme-dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }

  if (themeToggle) {
    setTheme(getPreferredTheme());
    themeToggle.addEventListener('click', toggleTheme);
  }

  /* Copy link anchors */
  function enhanceHeadings() {
    const selectors = '.guide h2, .guide h3, .guide h1';
    document.querySelectorAll(selectors).forEach((heading) => {
      if (heading.dataset.anchorEnhanced || heading.querySelector('.anchor-link')) return;
      
      let id = heading.id;
      if (!id) {
        // Create a slug from the heading text
        id = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        if(!id) return; // Cannot create a link without an ID
        heading.id = id;
      }

      const anchor = document.createElement('a');
      anchor.href = `#${id}`;
      anchor.className = 'anchor-link';
      anchor.innerHTML = `<span aria-hidden="true">#</span><span class="sr-only">Copy link to this section</span>`;
      anchor.setAttribute('aria-label', `Copy link to ${heading.textContent}`);
      
      anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const url = new URL(window.location.href);
        url.hash = id;
        navigator.clipboard?.writeText(url.toString()).then(() => {
            // Optional: show a temporary "Copied!" message
        }).catch(() => {
          window.location.hash = id;
        });
      });
      heading.appendChild(anchor);
      heading.dataset.anchorEnhanced = 'true';
    });
  }

  enhanceHeadings();

  // Re-run on view transitions if using a client-side router
  document.addEventListener('navigation:complete', enhanceHeadings);


  /* Active section highlight */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.target) return;
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-active-section', 'true');
        } else {
          entry.target.removeAttribute('data-active-section');
        }
      });
    },
    {
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0.1,
    }
  );

  document.querySelectorAll('.guide-section').forEach((section) => {
    observer.observe(section);
  });

  // Inject per-guide assessments after acceptance checklists when quiz data is available.
  async function initAssessments() {
    const acceptanceSection = document.querySelector('.guide #acceptance');
    if (!acceptanceSection) {
      return;
    }

    const guideTitle = document.querySelector('.guide-header h1')?.textContent?.trim();
    if (!guideTitle) {
      return;
    }

    const basePath = document.body.dataset.base || '.';
    const dataUrl = `${basePath}/data/assessments.json`;

    try {
      const response = await fetch(dataUrl, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error(`Failed to load assessments (${response.status})`);
      }

      const catalog = await response.json();
      const assessment = catalog?.[guideTitle];
      if (!assessment) {
        return;
      }

      const section = document.createElement('section');
      section.className = 'guide-section guide-assessment';
      section.id = 'assessment';

      const heading = document.createElement('h2');
      heading.textContent = assessment.title || 'Knowledge check';
      section.appendChild(heading);

      if (assessment.intro) {
        const intro = document.createElement('p');
        intro.textContent = assessment.intro;
        section.appendChild(intro);
      }

      if (Array.isArray(assessment.instructions) && assessment.instructions.length) {
        const instructionsList = document.createElement('ol');
        instructionsList.className = 'quiz-instructions';
        assessment.instructions.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item;
          instructionsList.appendChild(li);
        });
        section.appendChild(instructionsList);
      }

      if (assessment.scoring?.guidance) {
        const guidanceNote = document.createElement('p');
        guidanceNote.className = 'quiz-guidance';
        guidanceNote.textContent = `Scoring workflow: ${assessment.scoring.guidance}`;
        section.appendChild(guidanceNote);
      }

      const form = document.createElement('form');
      form.className = 'quiz-form';
      form.noValidate = true;

      const result = document.createElement('div');
      result.className = 'quiz-result';
      result.setAttribute('role', 'status');
      result.setAttribute('aria-live', 'polite');

      const actionsList = document.createElement('ul');
      actionsList.className = 'quiz-actions';
      actionsList.hidden = true;

      assessment.questions.forEach((question, index) => {
        const fieldset = document.createElement('fieldset');
        fieldset.className = 'quiz-question';
        fieldset.dataset.questionId = question.id;

        const legend = document.createElement('legend');
        legend.textContent = `${index + 1}. ${question.prompt}`;
        fieldset.appendChild(legend);

        question.options.forEach((option, optionIndex) => {
          const optionContainer = document.createElement('div');
          optionContainer.className = 'quiz-option';

          const input = document.createElement('input');
          input.type = 'radio';
          input.name = question.id;
          input.value = String(optionIndex);
          input.id = `${question.id}-${optionIndex}`;
          if (optionIndex === 0) {
            input.required = true;
          }

          const label = document.createElement('label');
          label.setAttribute('for', input.id);
          label.textContent = option.text;

          const feedback = document.createElement('div');
          feedback.className = 'quiz-feedback';
          feedback.dataset.optionIndex = String(optionIndex);
          feedback.hidden = true;
          feedback.textContent = option.feedback;

          optionContainer.appendChild(input);
          optionContainer.appendChild(label);
          optionContainer.appendChild(feedback);

          fieldset.appendChild(optionContainer);
        });

        form.appendChild(fieldset);
      });

      const controls = document.createElement('div');
      controls.className = 'quiz-controls';

      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.className = 'quiz-submit';
      submitButton.textContent = 'Check my answers';

      const resetButton = document.createElement('button');
      resetButton.type = 'button';
      resetButton.className = 'quiz-reset';
      resetButton.textContent = 'Reset';
      resetButton.hidden = true;

      controls.appendChild(submitButton);
      controls.appendChild(resetButton);
      form.appendChild(controls);
      form.appendChild(result);
      form.appendChild(actionsList);

      function resetFeedback() {
        form.querySelectorAll('.quiz-option').forEach((element) => {
          element.classList.remove('is-correct', 'is-incorrect');
        });
        form.querySelectorAll('.quiz-feedback').forEach((element) => {
          element.hidden = true;
        });
      }

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity()) {
          return;
        }

        resetFeedback();

        let score = 0;

        assessment.questions.forEach((question) => {
          const selected = form.querySelector(`input[name="${question.id}"]:checked`);
          const fieldset = form.querySelector(`[data-question-id="${question.id}"]`);
          if (!selected || !fieldset) {
            return;
          }

          const optionIndex = Number(selected.value);
          const option = question.options?.[optionIndex];
          const optionContainer = selected.closest('.quiz-option');

          if (!option || !optionContainer) {
            return;
          }

          if (option.correct) {
            score += 1;
            optionContainer.classList.add('is-correct');
          } else {
            optionContainer.classList.add('is-incorrect');
          }

          const feedback = fieldset.querySelector(`.quiz-feedback[data-option-index="${optionIndex}"]`);
          if (feedback) {
            feedback.hidden = false;
          }
        });

        const total = assessment.questions.length;
        const passingScore = typeof assessment.scoring?.passingScore === 'number'
          ? assessment.scoring.passingScore
          : total;
        const passed = score >= passingScore;

  const guidanceText = assessment.scoring?.guidance;

        result.textContent = passed
          ? `Nice work — you scored ${score}/${total}. ${guidanceText || 'Document the pass in your tracker.'}`
          : `You scored ${score}/${total}. Review the feedback, follow the remediation steps, and try again.`;

        const actions = Array.isArray(assessment.scoring?.actions)
          ? assessment.scoring.actions
          : [];
        actionsList.innerHTML = '';
        if (!passed && actions.length) {
          actions.forEach((action) => {
            const li = document.createElement('li');
            li.textContent = action;
            actionsList.appendChild(li);
          });
          actionsList.hidden = false;
        } else {
          actionsList.hidden = true;
        }

        resetButton.hidden = false;
      });

      resetButton.addEventListener('click', () => {
        form.reset();
        resetFeedback();
        result.textContent = 'Reset. Ready for another attempt when you are.';
        actionsList.hidden = true;
        resetButton.hidden = true;
      });

  section.appendChild(form);
  acceptanceSection.insertAdjacentElement('afterend', section);
    } catch (error) {
      console.error('Assessment module failed:', error);
    }
  }

  initAssessments();
})();
