'use strict';

let questions = [

    {
        'question': 'Wer hat HTML erfunden?',
        'answer_1': 'Robbie Williams',
        'answer_2': 'Lady Gaga',
        'answer_3': 'Tim Berners-Lee',
        'answer_4': 'Justin Bieber',
        'right_answer': 3
    },

    {
        'question': 'Was bedeutet das HTML-Tag &lt;a&gt;?',
        'answer_1': 'Text Fett',
        'answer_2': 'Container',
        'answer_3': 'Ein Link',
        'answer_4': 'Kursiv',
        'right_answer': 3
    },

    {
        'question': 'Wie bindet man eine Website in eine Website ein?',
        'answer_1': '&lt;iframe&gt;, &lt;frame&gt; und &lt;frameset&gt;',
        'answer_2': '&lt;iframe&gt;',
        'answer_3': '&lt;frame&gt;',
        'answer_4': '&lt;frameset&gt;',
        'right_answer': 2
    },

    {
        'question': 'Welches Attribut kann man nicht für &lt;textarea&gt; verwenden?',
        'answer_1': '\'readonly\'',
        'answer_2': '\'max\'',
        'answer_3': '\'from\'',
        'answer_4': '\'spellcheck\'',
        'right_answer': 1
    },

    {
        'question': 'Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem Attribut \'Title\' aus?',
        'answer_1': 'a[title] {...}',
        'answer_2': 'a > title {...}',
        'answer_3': 'a.title {...}',
        'answer_4': 'a=title {...}',
        'right_answer': 1
    },

    {
        'question': 'Wie definiert man in JavaScript eine Variable?',
        'answer_1': 'let 100 = rate;',
        'answer_2': '100 = let rate;',
        'answer_3': 'rate = 100;',
        'answer_4': 'let rate = 100;',
        'right_answer': 4
    }

];

let totalQuestions = questions.length;
let currentQuestion = 0;
let rightAnswers = 0;
let AUDIO_SUCCESS = new Audio('./sound/success.mp3');
let AUDIO_WRONG = new Audio('./sound/wrong.mp3');

function init() {
    document.getElementById('total-questions').innerHTML = totalQuestions;
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];

    if (currentQuestion >= totalQuestions) {
        document.getElementById('end-screen').style = 'display: block;';
        document.getElementById('question-body').style = 'display: none;';

        document.getElementById('right-answers').innerHTML = rightAnswers;
        document.getElementById('amount-of-questions').innerHTML = totalQuestions;

        setProgressBar();
    } else {
        setProgressBar();

        document.getElementById('current-question').innerHTML = currentQuestion + 1;

        document.getElementById('question').innerHTML = question.question;
        document.getElementById('answer-1').innerHTML = question.answer_1;
        document.getElementById('answer-2').innerHTML = question.answer_2;
        document.getElementById('answer-3').innerHTML = question.answer_3;
        document.getElementById('answer-4').innerHTML = question.answer_4;
    }
}

function answer(selection) {
    if (selection == questions[currentQuestion].right_answer) {
        document.getElementById(`answer-btn-${selection}`).classList.add('bg-right-answer');
        rightAnswers++;

        disableOtherAnswerBtns(selection);

        // AUDIO_SUCCESS.play();
    } else {
        document.getElementById(`answer-btn-${selection}`).classList.add('bg-wrong-answer');
        document.getElementById(`answer-btn-${questions[currentQuestion].right_answer}`).classList.add('bg-right-answer-blinking');

        disableOtherAnswerBtns(selection);

        // AUDIO_WRONG.play();
    }

    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    currentQuestion++;

    document.getElementById('next-btn').disabled = true;

    enableAnswerBtns();
    resetAnswerBtns();
    showQuestion();

    stopAudio();
}

function resetAnswerBtns() {
    document.getElementById('answer-1').parentNode.classList.remove('bg-wrong-answer');
    document.getElementById('answer-1').parentNode.classList.remove('bg-right-answer');
    document.getElementById('answer-1').parentNode.classList.remove('bg-right-answer-blinking');
    document.getElementById('answer-2').parentNode.classList.remove('bg-wrong-answer');
    document.getElementById('answer-2').parentNode.classList.remove('bg-right-answer');
    document.getElementById('answer-2').parentNode.classList.remove('bg-right-answer-blinking');
    document.getElementById('answer-3').parentNode.classList.remove('bg-wrong-answer');
    document.getElementById('answer-3').parentNode.classList.remove('bg-right-answer');
    document.getElementById('answer-3').parentNode.classList.remove('bg-right-answer-blinking');
    document.getElementById('answer-4').parentNode.classList.remove('bg-wrong-answer');
    document.getElementById('answer-4').parentNode.classList.remove('bg-right-answer');
    document.getElementById('answer-4').parentNode.classList.remove('bg-right-answer-blinking');
}

function setProgressBar() {
    let progress = (currentQuestion) / totalQuestions;
    progress = Math.round(progress * 100);

    document.getElementById('progress-bar').innerHTML = `${progress} %`;
    document.getElementById('progress-bar').style = `width: ${progress}%;`;
}

function restartQuiz() {
    currentQuestion = 0;
    rightAnswers = 0;

    document.getElementById('end-screen').style = 'display: none;';
    document.getElementById('question-body').style = 'display: block;';

    init();
}

function stopAudio() {
    AUDIO_SUCCESS.pause();
    AUDIO_SUCCESS.currentTime = 0;
    AUDIO_WRONG.pause();
    AUDIO_WRONG.currentTime = 0;
}

function disableOtherAnswerBtns(answer) {
    for (let i = 1; i <= 4; i++) {
        if (i != answer) {
            document.getElementById(`answer-btn-${i}`).disabled = true;
        }
    }
}

function enableAnswerBtns() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer-btn-${i}`).disabled = false;
    }
}