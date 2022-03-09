'use strict';

let currentQuestionPool = 0;
let currentQuestion = 0;
let rightAnswers = 0;
let AUDIO_SUCCESS = new Audio('./sound/success.mp3');
let AUDIO_WRONG = new Audio('./sound/wrong.mp3');
let mobileNavIsOpen = false;

function init() {
    renderStartScreen();
    renderNavElements();
    selectNavElement(0); // Start with first question pool
}

function renderStartScreen() {
    document.getElementById('progress').classList.add('d-none');
    document.getElementById('mobile-menu-btn').classList.remove('d-none');
    let container = document.getElementById('quiz-render-container');
    container.innerHTML = generateStartScreenHTML();
}

function renderNavElements() {
    let container = document.getElementById('nav-elements-container');
    container.innerHTML = '';

    for (let i = 0; i < questionPool.length; i++) {
        container.innerHTML += `
            <button id="nav-element-${i}" class="nav-element btns" onclick="switchQuestionPool(${i}); closeOtherNavElements(${i}); toggleMobileMenu();">${questionPool[i].category}</button>
        `;
    }
}

function renderQuestions() {
    let container = document.getElementById('quiz-render-container');
    container.innerHTML = generateQuestionsHTML();
}

function renderEndScreen() {
    document.getElementById('mobile-menu-btn').classList.remove('d-none');
    let container = document.getElementById('quiz-render-container');
    container.innerHTML = generateEndScreenHTML();
}

function switchQuestionPool(selection) {
    currentQuestionPool = selection;
    currentQuestion = 0;

    selectNavElement(selection);
    renderStartScreen();
}

function closeOtherNavElements(element) {
    for (let i = 0; i < questionPool.length; i++) {
        if (i != element) {
            document.getElementById(`nav-element-${i}`).classList.remove('nav-element-selected');
        }
    }
}

function showQuestions(selection) {
    renderQuestions();
    selectNavElement(selection);

    document.getElementById('progress').classList.remove('d-none');
    document.getElementById('mobile-menu-btn').classList.add('d-none');

    let totalQuestions = questionPool[selection].questions.length;
    let question = questionPool[selection].questions[currentQuestion];

    document.getElementById('total-questions').innerHTML = totalQuestions;

    if (currentQuestion >= totalQuestions) { // If no more questions are left
        gameFinished(totalQuestions);
    } else {
        continueWithQuestions(totalQuestions, question);
    }
}

function selectNavElement(element) {
    document.getElementById(`nav-element-${element}`).classList.add('nav-element-selected');
    currentQuestionPool = element;
}

function answer(selection) {
    // Right answer
    if (selection == questionPool[currentQuestionPool].questions[currentQuestion].right_answer) {
        document.getElementById(`answer-btn-${selection}`).classList.add('bg-right-answer');
        document.getElementById(`answer-option-letter-${selection}`).classList.add('bg-right-answer-option-letter');
        rightAnswers++;

        disableOtherAnswerBtns(selection);

        AUDIO_SUCCESS.play();

        // Wrong answer
    } else {
        document.getElementById(`answer-btn-${selection}`).classList.add('bg-wrong-answer');
        document.getElementById(`answer-btn-${questionPool[currentQuestionPool].questions[currentQuestion].right_answer}`).classList.add('bg-right-answer-blinking');
        document.getElementById(`answer-option-letter-${selection}`).classList.add('bg-wrong-answer-option-letter');

        disableOtherAnswerBtns(selection);

        AUDIO_WRONG.play();
    }

    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    currentQuestion++;

    document.getElementById('next-btn').disabled = true;

    enableAnswerBtns();
    resetAnswerBtns();
    showQuestions(currentQuestionPool);
    stopAudio();
}

function resetAnswerBtns() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer-btn-${i}`).classList.remove('bg-wrong-answer');
        document.getElementById(`answer-btn-${i}`).classList.remove('bg-right-answer');
        document.getElementById(`answer-btn-${i}`).classList.remove('bg-right-answer-blinking');
        document.getElementById(`answer-option-letter-${i}`).classList.remove('bg-right-answer-option-letter');
        document.getElementById(`answer-option-letter-${i}`).classList.remove('bg-wrong-answer-option-letter');
    }
}

function setProgressBar(totalQuestions) {
    let progress = (currentQuestion) / totalQuestions;
    progress = Math.round(progress * 100);

    document.getElementById('progress-bar').innerHTML = `${progress} %`;
    document.getElementById('progress-bar').style = `width: ${progress}%;`;
}

function continueWithQuestions(totalQuestions, question) {
    setProgressBar(totalQuestions);

    document.getElementById('current-question').innerHTML = currentQuestion + 1;

    document.getElementById('question').innerHTML = question.question;
    document.getElementById('answer-1').innerHTML = question.answer_1;
    document.getElementById('answer-2').innerHTML = question.answer_2;
    document.getElementById('answer-3').innerHTML = question.answer_3;
    document.getElementById('answer-4').innerHTML = question.answer_4;
}

function gameFinished(totalQuestions) {
    renderEndScreen();

    // Show quiz score
    document.getElementById('right-answers').innerHTML = rightAnswers;
    document.getElementById('amount-of-questions').innerHTML = totalQuestions;

    setProgressBar(totalQuestions);
}

function restartQuiz() {
    currentQuestion = 0;
    rightAnswers = 0;

    showQuestions(currentQuestionPool);
}

function stopAudio() {
    AUDIO_SUCCESS.pause();
    AUDIO_SUCCESS.currentTime = 0;

    AUDIO_WRONG.pause();
    AUDIO_WRONG.currentTime = 0;
}

function disableOtherAnswerBtns(answer) {
    for (let i = 1; i <= 4; i++) {
        // First remove all pointer events so the user can't click anymore
        document.getElementById(`answer-btn-${i}`).classList.add('disable-pointer-ev');

        // Only the selected answer button should be active
        if (i != answer) {
            document.getElementById(`answer-btn-${i}`).disabled = true;
        }
    }
}

function enableAnswerBtns() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer-btn-${i}`).disabled = false;
        document.getElementById(`answer-btn-${i}`).classList.remove('disable-pointer-ev');
    }
}

function toggleMobileMenu() {
    // Activate only 600px and below
    if (document.body.offsetWidth <= 600) {
        if (mobileNavIsOpen == false) {
            mobileNavIsOpen = !mobileNavIsOpen;
            document.getElementById('nav').classList.add('nav-mobile-visible');
        } else {
            mobileNavIsOpen = !mobileNavIsOpen;
            document.getElementById('nav').classList.remove('nav-mobile-visible');
        }
    }
}