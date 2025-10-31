(function() {
    const scorecardContainer = document.getElementById('scorecard-container');
    if (!scorecardContainer) {
        return;
    }

    async function fetchData() {
        try {
            const [assessmentsResponse, completionsResponse] = await Promise.all([
                fetch('../data/unit-assessments.json'),
                Promise.resolve(localStorage.getItem('quiz_completions'))
            ]);

            if (!assessmentsResponse.ok) {
                throw new Error(`HTTP error! status: ${assessmentsResponse.status}`);
            }

            const assessmentsData = await assessmentsResponse.json();
            const completionsData = completionsResponse ? JSON.parse(completionsResponse) : {};

            renderScorecard(assessmentsData.units, completionsData);

        } catch (error) {
            console.error("Could not fetch or parse data:", error);
            scorecardContainer.innerHTML = `<p class="error">Failed to load scorecard data. Please try again later.</p>`;
        }
    }

    function renderScorecard(units, completions) {
        const completedUnits = units.filter(unit => completions[unit.id] && completions[unit.id].passed);

        if (completedUnits.length < units.length) {
            scorecardContainer.innerHTML = `<p>You must complete all unit assessments before your scorecard is revealed. Keep going!</p>`;
            return;
        }

        let totalScore = 0;
        let totalPossible = 0;

        const chartHtml = completedUnits.map(unit => {
            const completion = completions[unit.id];
            const score = completion.score;
            const total = completion.total;
            const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
            totalScore += score;
            totalPossible += total;

            let barClass = 'risk';
            if (percentage >= 80) {
                barClass = 'success';
            } else if (percentage >= 60) {
                barClass = 'caution';
            }

            return `
                <div class="score-bar-container">
                    <div class="score-bar-label">${unit.title}</div>
                    <div class="score-bar">
                        <div class="score-bar-fill ${barClass}" style="width: ${percentage}%;">${percentage}%</div>
                    </div>
                </div>
            `;
        }).join('');

        const overallPercentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

        let overallBarClass = 'risk';
        if (overallPercentage >= 80) {
            overallBarClass = 'success';
        } else if (overallPercentage >= 60) {
            overallBarClass = 'caution';
        }

        const scorecardHtml = `
            <h2>Overall Progress</h2>
            <div class="score-bar-container overall">
                <div class="score-bar-label"><strong>Total Score</strong></div>
                <div class="score-bar">
                    <div class="score-bar-fill ${overallBarClass}" style="width: ${overallPercentage}%;">${overallPercentage}%</div>
                </div>
            </div>
            <hr>
            <h3>Unit Breakdown</h3>
            ${chartHtml}
        `;

        scorecardContainer.innerHTML = scorecardHtml;
    }

    fetchData();
})();
