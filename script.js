'use strict';

let questionPool = [

    {
        'category': 'HTML',
        'questions': [{
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
        ]
    },

    {
        'category': 'CSS',
        'questions': [{
                'question': 'Mit welchem Attribut lässt sich in einer Flexbox am einfachsten ein Abstand von 8px aller inneren Elemente erzeugen?',
                'answer_1': 'margin: 8px 8px 8px 8px;',
                'answer_2': 'justify-content: space-between 8px;',
                'answer_3': 'padding: 8px;',
                'answer_4': 'gap: 8px;',
                'right_answer': 4
            },

            {
                'question': 'Wie lässt sich die Füllfarbe eines .svg Bildes durch CSS manipulieren OHNE die Datei selbst zu bearbeiten?',
                'answer_1': 'background-color: green;',
                'answer_2': 'filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);',
                'answer_3': 'image-color: green;',
                'answer_4': 'fill: green;',
                'right_answer': 2
            },

            {
                'question': 'Wie heißt die CSS-Eigenschaft mit welcher Elemente gedreht, skaliert, schräg gestellt oder übersetzt werden können?',
                'answer_1': 'translate: ...',
                'answer_2': 'transition: ...',
                'answer_3': 'transform: ...',
                'answer_4': 'transfer: ...;',
                'right_answer': 3
            },

            {
                'question': 'Was passiert mit einem &ltimg&gt Element mit folgender Eigenschaft: "border-radius: 50%;"?',
                'answer_1': 'Die Form des Bildes wird oval',
                'answer_2': 'Die Form des Bildes wird rund',
                'answer_3': 'Die Form des Bildes ändert sich nicht',
                'answer_4': 'Das Bild bekommt eine border mit 50% breite des Bildes',
                'right_answer': 2
            },

            {
                'question': 'Mit welchem CSS-Selektor lassen sich ALLE Elemente ansprechen?',
                'answer_1': '* {...}',
                'answer_2': '. {...}',
                'answer_3': '$ {...}',
                'answer_4': '& {...}',
                'right_answer': 1
            },

            {
                'question': 'CSS-Klassen & ID\'S sollten in der "Kebab Case" Schreibweise benannt werden welche wie folgt aussieht:',
                'answer_1': '.meineKlasse {...}',
                'answer_2': '.meine_klasse {...}',
                'answer_3': '.-meineKlasse- {...}',
                'answer_4': '.meine-klasse {...}',
                'right_answer': 4
            }
        ]
    },

    {
        'category': 'JS',
        'questions': [{
                'question': 'Womit lässt sich der Strict-Mode für JS aktivieren?',
                'answer_1': '\'strict mode\'',
                'answer_2': '\'use strict\'',
                'answer_3': '\'enable strict\'',
                'answer_4': '\'strict\'',
                'right_answer': 2
            },

            {
                'question': 'Wie viele Code-Zeilen sollte eine Funktion maximal beinhalten um als "Clean Code" zu gelten?',
                'answer_1': '20',
                'answer_2': '16',
                'answer_3': '60',
                'answer_4': '14',
                'right_answer': 4
            },

            {
                'question': 'Funktionsnamen sollten in "Lower Camel Case" geschrieben werden. Diese sieht wie folgt aus:',
                'answer_1': 'MeineFunktion();',
                'answer_2': 'meinefunktion();',
                'answer_3': 'MEINEfunktion();',
                'answer_4': 'meineFunktion();',
                'right_answer': 4
            }
        ]
    }
];

let currentQuestionPool = 0;
let currentQuestion = 0;
let rightAnswers = 0;
let AUDIO_SUCCESS = new Audio('./sound/success.mp3');
let AUDIO_WRONG = new Audio('./sound/wrong.mp3');

function init() {
    renderNavElements();
    selectNavElement(0); // Start with first question pool
}

function renderNavElements() {
    let container = document.getElementById('nav-elements-container');
    container.innerHTML = '';

    for (let i = 0; i < questionPool.length; i++) {
        container.innerHTML += `
            <button id="nav-element-${i}" class="nav-element btns" onclick="switchQuestionPool(${i}); closeOtherNavElements(${i})">${questionPool[i].category}</button>
        `;
    }
}

function switchQuestionPool(selection) {
    currentQuestionPool = selection;
    currentQuestion = 0;

    showQuestions(selection);
}

function closeOtherNavElements(element) {
    for (let i = 0; i < questionPool.length; i++) {
        if (i != element) {
            document.getElementById(`nav-element-${i}`).classList.remove('nav-element-selected');
        }
    }
}

function showQuestions(selection) {
    selectNavElement(selection);

    let totalQuestions = questionPool[selection].questions.length;
    let question = questionPool[selection].questions[currentQuestion];

    document.getElementById('total-questions').innerHTML = totalQuestions;

    if (currentQuestion >= totalQuestions) {
        document.getElementById('end-screen').style = 'display: block;';
        document.getElementById('question-body').style = 'display: none;';

        document.getElementById('right-answers').innerHTML = rightAnswers;
        document.getElementById('amount-of-questions').innerHTML = totalQuestions;

        setProgressBar(totalQuestions);
    } else {
        setProgressBar(totalQuestions);

        document.getElementById('current-question').innerHTML = currentQuestion + 1;

        document.getElementById('question').innerHTML = question.question;
        document.getElementById('answer-1').innerHTML = question.answer_1;
        document.getElementById('answer-2').innerHTML = question.answer_2;
        document.getElementById('answer-3').innerHTML = question.answer_3;
        document.getElementById('answer-4').innerHTML = question.answer_4;
    }
}

function selectNavElement(element) {
    document.getElementById(`nav-element-${element}`).classList.add('nav-element-selected');
    currentQuestionPool = element;
}

function answer(selection) {
    if (selection == questionPool[currentQuestionPool].questions[currentQuestion].right_answer) {
        document.getElementById(`answer-btn-${selection}`).classList.add('bg-right-answer');
        rightAnswers++;

        disableOtherAnswerBtns(selection);

        // AUDIO_SUCCESS.play();
    } else {
        document.getElementById(`answer-btn-${selection}`).classList.add('bg-wrong-answer');
        document.getElementById(`answer-btn-${questionPool[currentQuestionPool].questions[currentQuestion].right_answer}`).classList.add('bg-right-answer-blinking');

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
    showQuestions(currentQuestionPool);

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

function setProgressBar(totalQuestions) {
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