function generateStartScreenHTML() {
    return `
        <div class="start-screen-container">
            <h1>Willkommen zum <span class="question-pool-text">${questionPool[currentQuestionPool].category}</span> Quiz!</h1>
            <h3>Bereit für die Herausforderung?</h3>
            <button class="start-quiz-btn btns" onclick="showQuestions(${currentQuestionPool})">JETZT STARTEN <img src="./img/icons/arrow_right.svg" alt="Arrow Right"></button>
        </div>
    `;
}

function generateQuestionsHTML() {
    return `
        <div class="question-header">
            <h5 class="question-text" id="question">Frage</h5>
        </div>

        <div id="question-body" class="question-body">
            <div class="answers">
                <button id="answer-btn-1" class="mb-2 answer-btn" onclick="answer(1)">
                    <div id="answer-option-letter-1" class="answer-option-letter">A</div>
                    <div class="answer-text" id="answer-1"></div>
                </button>

                <button id="answer-btn-2" class="mb-2 answer-btn" onclick="answer(2)">
                    <div id="answer-option-letter-2" class="answer-option-letter">B</div>
                    <div class="answer-text" id="answer-2"></div>
                </button>

                <button id="answer-btn-3" class="mb-2 answer-btn" onclick="answer(3)">
                    <div id="answer-option-letter-3" class="answer-option-letter">C</div>
                    <div class="answer-text" id="answer-3"></div>
                </button>

                <button id="answer-btn-4" class="mb-2 answer-btn" onclick="answer(4)">
                        <div id="answer-option-letter-4" class="answer-option-letter">D</div>
                        <div class="answer-text" id="answer-4"></div>
                </button>
            </div>

            <div class="question-footer">
                <button class="mobile-close-btn" onclick="init()">
                    <img src="./img/icons/close.svg" alt="Close">
                </button>
                
                <div class="question-footer-subcontainer">
                    <div>
                        <b id="current-question">1</b> von <b id="total-questions">5</b> Fragen
                    </div>
                    <button onclick="nextQuestion()" id="next-btn" class="btn btn-primary btns" disabled>Nächste Frage</button>
                </div>
            </div>
        </div>
    `;
}

function generateEndScreenHTML() {
    return `
        <div class="end-screen-body">
            <img src="./img/brain_result.png" alt="Brain Result" class="end-screen-result-img">
            <h3 class="end-screen-headline"><span class="question-pool-text">${questionPool[currentQuestionPool].category}</span> QUIZ <br>ABGESCHLOSSEN</h3>
            <h3 class="score-text">DEIN ERGEBNIS <b class="score-result"><span id="right-answers"></span> / <span id="amount-of-questions"></span></b></h3>
            <div class="end-screen-footer">
                <button onclick="restartQuiz()" id="restart-btn" class="btn btn-primary btns">Erneut starten</button>
            </div>
        </div>
    `;
}