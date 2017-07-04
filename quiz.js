// get the buttons
var btnCalc = document.getElementById("calculate");
var btnRestart = document.getElementById("retry");

// add listeners to buttons
btnCalc.addEventListener("click", calcScore);
btnRestart.addEventListener("click", restartQuiz);

// get the three divs
var divOne = document.getElementById("one");
var divTwo = document.getElementById("two");


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
    output += "<div class='inner hidden'>";
    output += "<div>";
    output += "<legend class='question-heading'>" + questions[x].number + ". " + questions[x].title + "</legend>";

    for (var j = 0; j < questions[x].answers.length; j++) {
        output += "<div class='questions'>";
        output += "<input type='radio' name='q" + questions[x].number + "'>";
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

/* ========

Next Question

=========== */


document.getElementById("next").addEventListener("click", nextQuestion);
document.getElementById("previous").addEventListener("click", previousQuestion);

var i = 1;

function nextQuestion() {

    // show previous question button if i > 2
    if (i >= 1) {
        document.getElementById("previous").classList.add("active");
    }

    // if press next button and i already equals 10  
    if (i == 9) {
        document.getElementById("next").classList.remove("active");
        btnCalc.classList.add("active");
        document.getElementById("next").classList.add("hidden");

    }


    // get element at index (starting with 0)
    document.getElementsByClassName("inner")[i - 1].classList.remove("active");

    // get the element 1 after the first one
    document.getElementsByClassName("inner")[i].classList.add("active");

    i++;
}

function previousQuestion() {
    if (i == 10) {
        document.getElementById("next").classList.remove("hidden");
        btnCalc.classList.remove("active");

    }
    if (i == 2) {
        document.getElementById("previous").classList.remove("active");
        document.getElementById("previous").classList.add("invisible");
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

Calculate Score

=========== */

function calcScore() {
    // set the user's score
    var score = 0;

    var unansweredMessage = "";

    for (x in questions) {
        // store correct answer for each question 
        var correct = questions[x].correctAnswer;

        // get the radio buttons to loop through and see if they're checked
        var questionAnswers = document.querySelectorAll('[name=q' + questions[x].number + ']');
        var isChecked = false;

        // loop through all the answers to see if they are checked, if a checked answer is the correct answer, add 1 to the score
        for (var j = 0; j < questions[x].answers.length; j++) {

            // if an answer is checked, then see if it is the correct answer
            if (questionAnswers[j].checked === true) {
                isChecked = true;

                // if correct answer, add to score
                if (j == correct) {
                    score++;
                }

            }
        }

        // If there was no radio buttons checked for the question we need to add to unanswered string.
        if (isChecked === false) {
            unansweredMessage += questions[x].number + ", ";
        }
    }


    // if none are checked, throw an error
    if (unansweredMessage !== "") {
        document.querySelector(".error-message").innerHTML = "Whoa there. You must answer all the questions first before you can calculate your score. You missed the following: <br>" + unansweredMessage;
    } else {
        // hide second div and show third 
        divOne.style.display = 'none';
        divTwo.style.display = 'block';
    }

    // update page to reflect score
    var scoreContainer = document.getElementById("score");
    scoreContainer.innerHTML = score;
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
