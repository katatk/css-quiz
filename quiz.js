// get the buttons
var btnCalc = document.getElementById("calculate");
var btnRestart = document.getElementById("retry");
var btnNext = document.getElementById("next");
var btnPrev = document.getElementById("previous");

// add listeners to buttons
btnCalc.addEventListener("click", displayScore);
btnRestart.addEventListener("click", restartQuiz);
btnNext.addEventListener("click", nextQuestion);
btnPrev.addEventListener("click", previousQuestion);

// get the three divs
var divOne = document.getElementById("one");
var divTwo = document.getElementById("two");

// get the progress bar + percent
var progressBar = document.getElementById("progress-bar");
var progressPercent = document.getElementById("percent-progress");


// question array
var questions = [
questionOne = {
        number: 1,
        title: 'What does CSS stand for?',
        answers: ['Cascading CSS', 'Cascading style sheets', 'Cascading separate style'],
        correctAnswer: 1
},

questionTwo = {
        number: 2,
        title: 'Which attribute can set text to bold?',
        answers: ['text-decoration', 'font-style', 'font-weight'],
        correctAnswer: 2
},

questionThree = {
        number: 3,
        title: 'Which tag is used to link an external CSS file?',
        answers: ['<code>&lt;script&gt;</code>', '<code>&lt;link&gt;</code>', '<code>&lt;rel&gt;</code>'],
        correctAnswer: 1
},

questionFour = {
        number: 4,
        title: 'Which attribute sets the underline property?',
        answers: ['font-style', 'text-decoration', 'font-weight'],
        correctAnswer: 1
},

questionFive = {
        number: 5,
        title: 'Which measurement is NOT relative?',
        answers: ['px', 'cm', '%', 'em'],
        correctAnswer: 0
},

questionSix = {
        number: 6,
        title: 'Which measurement unit IS relative?',
        answers: ['em', 'cm', 'mm', 'inch'],
        correctAnswer: 0
},

questionSeven = {
        number: 7,
        title: 'What attribute is used move an elements content away from its border?',
        answers: ['margin', 'padding', 'border', 'width'],
        correctAnswer: 1
},

questionEight = {
        number: 8,
        title: 'Which attribute does not contribute to a block elements total width?',
        answers: ['width', 'border', 'background-image', 'padding'],
        correctAnswer: 2
},

questionNine = {
        number: 9,
        title: 'What property changes positioned elements display order?',
        answers: ['width', 'background', 'z-index', 'azimuth'],
        correctAnswer: 2
},

questionTen = {
        number: 10,
        title: 'Which value of background-repeat will cause a background to repeat vertically?',
        answers: ['repeat-x', 'repeat', 'repeat-y', 'no-repeat'],
        correctAnswer: 2
}

];

// get the container to set the output to
var questionsContainer = document.getElementById("questions-container");

var output = "";
// build the html

// add a new animation to each question div


for (x in questions) {
    output += "<div class='inner no-display'>";
    output += "<div>";
    output += "<legend class='question-heading'>" + questions[x].number + ". " + questions[x].title + "</legend>";

    for (var j = 0; j < questions[x].answers.length; j++) {
        output += "<div class='questions'>";
        output += "<input type='radio' name='q" + questions[x].number + "' onclick='isChecked(this)'>";
        output += "<label>" + questions[x].answers[j] + "</label>";
        output += "</div>";
    }

    output += "</div>";
    output += "</div>";
}

questionsContainer.innerHTML = output;

// add an active class to the first question to show it
document.querySelector(".inner").classList.add("active");

// print total to page (equal to length of questions array)
document.getElementById("total").innerHTML = questions.length;


/* make next button active */
function activateNextBtn() {
    btnNext.classList.remove("inactive");
    btnNext.removeAttribute("disabled");
    btnNext.classList.add("animate-right-arrow");
}

/* make next button inactive */
function inactivateNextBtn() {
    btnNext.classList.add("inactive");
    btnNext.setAttribute("disabled", "");
    btnNext.classList.remove("animate-right-arrow");
}

/* ========

Calculate Score

=========== */
// set the user's score
var score = 0;

function calcScore() {

    // store correct answer for each question 
    var correct = questions[i - 1].correctAnswer;

    // get the radio buttons to loop through and see if they're checked
    var questionAnswers = document.querySelectorAll('[name=q' + questions[i - 1].number + ']');
    var isChecked = false;

    // loop through all the answers to see if they are checked, if a checked answer is the correct answer, add 1 to the score
    for (var j = 0; j < questions[i - 1].answers.length; j++) {

        // if an answer is checked, then see if it is the correct answer
        if (questionAnswers[j].checked === true) {
            isChecked = true;

            // if correct answer, add to score
            if (j == correct) {
                score++;
            }
        }
    }

    // if none are checked, throw an error
    if (isChecked === false) {
        document.querySelector(".error-message").innerHTML = "Whoa there. You must answer this question before moving on to the next.";


    } else {
        document.querySelector(".error-message").innerHTML = "";

    }


}


/* ==== 

display score

====== */

function displayScore() {

    divTwo.style.display = 'block';
    divOne.style.display = 'none';

    // update page to reflect score
    var scoreContainer = document.getElementById("score");
    scoreContainer.innerHTML = score;

}

/* ========

Is checked

=========== */

function isChecked(el) {
    if (el.checked === true) {
        activateNextBtn();
    }

}

/* ========

Next Question

=========== */

var i = 1;
var progress;

function nextQuestion() {

    // add to the progress bar
    progress = parseInt(progressBar.getAttribute("value"));
    progress = progress + 10;
    progressBar.setAttribute("value", progress);
    progressPercent.innerHTML = progress + "%";


    // make sure question is answered before moving on the next
    if (questions[i]) {

        // show previous question button if i > 2
        if (i >= 1) {



            // go to next question with next button being inactive
            inactivateNextBtn();
            btnPrev.classList.add("active");
        }


        // on the last question, hide the next button and show the calculation button
        if (i == 9) {
            btnNext.classList.remove("active");
            btnNext.classList.add("no-display");

            btnCalc.classList.add("active");
        }



        // get the element 1 after the first one
        document.getElementsByClassName("inner")[i].classList.add("active");
        // get element at index (starting with 0)
        document.getElementsByClassName("inner")[i - 1].classList.remove("active");



        i++;
    }
}

function previousQuestion() {
    
    progress = progress - 10;
    progressBar.setAttribute("value", progress);
    progressPercent.innerHTML = progress + "%";


    activateNextBtn();

    if (i == 10) {
        btnNext.classList.remove("no-display");
        btnCalc.classList.remove("active");

    }
    if (i == 2) {
        btnPrev.classList.remove("active");
        btnPrev.classList.add("invisible");
    }
    if (i > 1) {
        // get element at index (starting with 0)
        document.getElementsByClassName("inner")[i - 1].classList.remove("active");

        // get the element 1 after the first one
        document.getElementsByClassName("inner")[i - 2].classList.add("active");

        i--;
    }
}



/* ========

Retry Quiz

=========== */


function retryQuiz() {

    // get all radio buttons
    var allAnswers = document.querySelectorAll('input[type=radio]');

    // uncheck all radio buttons
    for (answer in allAnswers) {
        allAnswers[answer].checked = false;
    }
    document.querySelector(".error-message").innerHTML = "";
}


/* ========

Restart Quiz

=========== */

function restartQuiz() {
    divTwo.style.display = 'none';
    divOne.style.display = 'block';

    // clear all radio buttons and remove missed questions message
    retryQuiz();

    document.getElementsByClassName("inner")[10].classList.remove("active")
    document.getElementsByClassName("inner")[1].classList.add("active");


    i = 1;


}
