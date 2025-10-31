(function () {
    const pageRoot = document.querySelector('[data-unit-assessment]');
    if (!pageRoot) {
        return;
    }

    const quizSection = pageRoot.querySelector('[data-unit-quiz]');
    if (!quizSection) {
        return;
    }

    const unitId = pageRoot.getAttribute('data-unit-assessment');
    if (!unitId) {
        showError('Could not determine the unit for this assessment.');
        return;
    }

    const basePath = (document.body.getAttribute('data-base') || '.').replace(/\/$/, '');
    const inlineData = readInlineData();
    const globalData = typeof window !== 'undefined' ? window.__UNIT_ASSESSMENT_DATA : null;
    let bundledDataPromise = null;

    let quizData = null;
    let userAnswers = {};

    loadState();
    init();

    async function init() {
        const dataset = await loadDataset();
        if (!dataset) {
            showError('Failed to load quiz data. Please try again later.');
            return;
        }

        renderQuiz(dataset);
    }

    async function loadDataset() {
        const fromFetch = await fetchDataset();
        if (fromFetch) {
            return fromFetch;
        }

        const fromInline = extractUnit(inlineData);
        if (fromInline) {
            return fromInline;
        }

        const fromGlobal = extractUnit(globalData);
        if (fromGlobal) {
            return fromGlobal;
        }

        const fromBundled = extractUnit(await loadBundledDataset());
        if (fromBundled) {
            return fromBundled;
        }

        return null;
    }

    async function fetchDataset() {
        try {
            const response = await fetch(`${basePath}/data/unit-assessments.json`, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const payload = await response.json();
            const unit = extractUnit(payload);
            if (!unit) {
                console.warn(`Quiz data loaded but unit "${unitId}" was not found in the dataset.`);
            }
            return unit;
        } catch (error) {
            console.warn('Primary quiz fetch failed. Falling back to inline or bundled data.', error);
            return null;
        }
    }

    async function loadBundledDataset() {
        if (typeof window === 'undefined') {
            return null;
        }

        if (window.__UNIT_ASSESSMENT_DATA) {
            return window.__UNIT_ASSESSMENT_DATA;
        }

        if (!bundledDataPromise) {
            bundledDataPromise = new Promise((resolve, reject) => {
                const target = document.head || document.body;
                if (!target) {
                    bundledDataPromise = null;
                    reject(new Error('Unable to attach bundled dataset script'));
                    return;
                }

                const script = document.createElement('script');
                script.src = `${basePath}/data/unit-assessments.js`;
                script.async = false;
                script.onload = () => resolve(window.__UNIT_ASSESSMENT_DATA || null);
                script.onerror = (error) => {
                    bundledDataPromise = null;
                    reject(error);
                };
                target.appendChild(script);
            });
        }

        try {
            return await bundledDataPromise;
        } catch (error) {
            console.warn('Bundled quiz dataset failed to load.', error);
            return null;
        }
    }

    function readInlineData() {
        const script = pageRoot.querySelector('script[type="application/json"][data-unit-data]');
        if (!script) {
            return null;
        }

        try {
            return JSON.parse(script.textContent);
        } catch (error) {
            console.error('Inline assessment data could not be parsed:', error);
            return null;
        }
    }

    function extractUnit(payload) {
        if (!payload) {
            return null;
        }

        if (Array.isArray(payload.units)) {
            const match = payload.units.find((unit) => unit.id === unitId);
            if (match) {
                return match;
            }
        }

        if (payload.id === unitId && Array.isArray(payload.questions)) {
            return payload;
        }

        if (payload[unitId] && Array.isArray(payload[unitId].questions)) {
            return payload[unitId];
        }

        if (Array.isArray(payload.questions) && !payload.id) {
            return { id: unitId, ...payload };
        }

        return null;
    }

    function renderQuiz(unit) {
        quizData = unit;

        const heading = quizSection.querySelector('h2');
        const headingClone = heading ? heading.cloneNode(true) : null;

        const wrapper = document.createElement('div');
        wrapper.setAttribute('data-quiz-body', '');

        let html = '';
        if (unit.intro) {
            html += `<p class="quiz-intro">${unit.intro}</p>`;
        }

        if (Array.isArray(unit.instructions) && unit.instructions.length > 0) {
            const instructionItems = unit.instructions.map((item) => `<li>${item}</li>`).join('');
            html += `<div class="instructions"><ul>${instructionItems}</ul></div>`;
        }

        html += unit.questions.map(buildQuestionMarkup).join('');
        html += `<button type="button" class="quiz-submit" data-quiz-submit>Submit answers</button>`;
        html += `<div class="quiz-results" data-quiz-results></div>`;

        wrapper.innerHTML = html;

        quizSection.innerHTML = '';
        if (headingClone) {
            quizSection.appendChild(headingClone);
        }
        quizSection.appendChild(wrapper);

        attachEventListeners();
        if (Object.keys(userAnswers).length > 0) {
            renderFeedback();
            updateScore();
        }
    }

    function buildQuestionMarkup(question, index) {
        const saved = normalizeSavedAnswer(question.id, question);
        const promptNumber = index + 1;

        const optionsMarkup = question.options
            .map((option, optionIndex) => {
                const inputId = `${unitId}-${question.id}-${optionIndex}`;
                const isChecked = saved === optionIndex;
                return `
                    <label class="quiz-option" for="${inputId}">
                        <input type="radio"
                               id="${inputId}"
                               name="${question.id}"
                               value="${optionIndex}"
                               ${isChecked ? 'checked' : ''}
                               data-question-id="${question.id}">
                        ${option.text}
                    </label>
                `;
            })
            .join('');

        return `
            <section class="question" data-question-id="${question.id}">
                <p><strong>Question ${promptNumber}:</strong> ${question.prompt}</p>
                <div class="options">
                    ${optionsMarkup}
                </div>
            </section>
        `;
    }

    function attachEventListeners() {
        quizSection.addEventListener('change', handleOptionChange);

        const submitButton = quizSection.querySelector('[data-quiz-submit]');
        if (submitButton) {
            submitButton.addEventListener('click', handleSubmit);
        }
    }

    function handleOptionChange(event) {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || target.type !== 'radio') {
            return;
        }

        const selectedIndex = Number(target.value);
        const questionId = target.getAttribute('data-question-id');
        if (!Number.isInteger(selectedIndex) || !questionId) {
            return;
        }

        userAnswers[questionId] = selectedIndex;
        saveState();

        const parentQuestion = target.closest('[data-question-id]');
        if (!parentQuestion) {
            return;
        }

        const existingFeedback = parentQuestion.querySelector('.feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        renderFeedback();
        updateScore();
    }

    function renderFeedback() {
        if (!quizData) {
            return;
        }

        quizData.questions.forEach((question) => {
            const questionNode = quizSection.querySelector(`[data-question-id="${question.id}"]`);
            if (!questionNode) {
                return;
            }

            questionNode.querySelectorAll('.feedback').forEach((node) => node.remove());

            const selectedIndex = normalizeSavedAnswer(question.id, question);
            if (selectedIndex === null) {
                return;
            }

            const selectedOption = question.options[selectedIndex];
            if (!selectedOption) {
                return;
            }

            const feedback = document.createElement('div');
            feedback.className = `feedback ${selectedOption.correct ? 'correct' : 'incorrect'}`;
            feedback.textContent = selectedOption.feedback || '';
            const optionsNode = questionNode.querySelector('.options');
            if (optionsNode) {
                optionsNode.insertAdjacentElement('afterend', feedback);
            }
        });
    }

    function updateScore() {
        if (!quizData) {
            return;
        }

        const resultsNode = quizSection.querySelector('[data-quiz-results]');
        if (!resultsNode) {
            return;
        }

        const totalQuestions = quizData.questions.length;
        let answered = 0;
        let score = 0;

        quizData.questions.forEach((question) => {
            const selectedIndex = normalizeSavedAnswer(question.id, question);
            if (selectedIndex === null) {
                return;
            }

            answered += 1;
            const correctIndex = question.options.findIndex((option) => option.correct);
            if (selectedIndex === correctIndex) {
                score += 1;
            }
        });

        if (answered < totalQuestions) {
            resultsNode.innerHTML = '';
            return;
        }

        const passingScore = quizData.scoring && typeof quizData.scoring.passingScore === 'number'
            ? quizData.scoring.passingScore
            : totalQuestions;
        const passed = score >= passingScore;

        let html = `<h3>Your Score: ${score} / ${totalQuestions}</h3>`;
        if (passed) {
            html += `<p class="passed"><strong>Congratulations! You passed.</strong></p>`;
            if (quizData.scoring && quizData.scoring.guidance) {
                html += `<p>${quizData.scoring.guidance}</p>`;
            }
            if (quizData.scoring && Array.isArray(quizData.scoring.actions) && quizData.scoring.actions.length > 0) {
                const actions = quizData.scoring.actions.map((action) => `<li>${action}</li>`).join('');
                html += `<ul>${actions}</ul>`;
            }
            saveCompletion(unitId, score, totalQuestions);
        } else {
            html += `<p class="failed">You need to score at least ${passingScore} to pass. Please review the materials and try again.</p>`;
        }

        resultsNode.innerHTML = html;
    }

    function normalizeSavedAnswer(questionId, question) {
        const stored = userAnswers[questionId];
        if (typeof stored === 'number' && Number.isInteger(stored)) {
            return stored;
        }

        if (typeof stored === 'string') {
            const asNumber = Number(stored);
            if (Number.isInteger(asNumber)) {
                userAnswers[questionId] = asNumber;
                return asNumber;
            }

            const matchIndex = question.options.findIndex((option) => option.text === stored);
            if (matchIndex >= 0) {
                userAnswers[questionId] = matchIndex;
                return matchIndex;
            }
        }

        return null;
    }

    function loadState() {
        try {
            const savedState = localStorage.getItem(`quiz_progress_${unitId}`);
            if (!savedState) {
                userAnswers = {};
                return;
            }

            const parsed = JSON.parse(savedState);
            if (parsed && typeof parsed === 'object') {
                userAnswers = parsed;
            } else {
                userAnswers = {};
            }
        } catch (error) {
            console.error('Failed to load quiz state', error);
            userAnswers = {};
        }
    }

    function saveState() {
        try {
            localStorage.setItem(`quiz_progress_${unitId}`, JSON.stringify(userAnswers));
        } catch (error) {
            console.error('Failed to save quiz state', error);
        }
    }

    function saveCompletion(unitKey, score, total) {
        try {
            const raw = localStorage.getItem('quiz_completions');
            const completions = raw ? JSON.parse(raw) : {};
            completions[unitKey] = {
                passed: true,
                score,
                total,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('quiz_completions', JSON.stringify(completions));
        } catch (error) {
            console.error('Failed to save completion state', error);
        }
    }

    function showError(message) {
        const heading = quizSection.querySelector('h2');
        const headingClone = heading ? heading.cloneNode(true) : null;

        quizSection.innerHTML = '';
        if (headingClone) {
            quizSection.appendChild(headingClone);
        }

        const errorParagraph = document.createElement('p');
        errorParagraph.className = 'error';
        errorParagraph.textContent = message;
        quizSection.appendChild(errorParagraph);
    }
})();
