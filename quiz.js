// get the buttons
var btnStart = document.getElementById("start-quiz");
var btnCalc = document.getElementById("calculate");
var btnRestart = document.getElementById("retry");
var btnNext = document.getElementById("next");
var btnPrev = document.getElementById("previous");

// add listeners to buttons
btnStart.addEventListener("click", startQuiz);
btnCalc.addEventListener("click", calcScore);
btnRestart.addEventListener("click", restartQuiz);
btnNext.addEventListener("click", nextQuestion);
btnPrev.addEventListener("click", previousQuestion);

// get the three divs
var divInstructions = document.getElementById("instructions-container");
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
        answers: ['rem', 'cm', '%', 'em'],
        correctAnswer: 1
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

// animations array 
var animations = ["slideRight", "slideLeft", "slideUp", "slideDown"];

// add a new animation to each question div
window.addEventListener("DOMContentLoaded", function () {

    var numRandom;
    var output = "";
    for (x in questions) {
        output += "<div class='inner box no-display ";

        // add a random animation class to each question
        numRandom = Math.floor(Math.random() * animations.length);
        output += animations[numRandom];

        output += "'>";
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

    document.getElementById("questions-container").innerHTML = output;

    // add an active class to the first question to show it
    document.querySelector(".inner").classList.add("active");

});



/* ========

Start Quiz

=========== */

function startQuiz() {
    divInstructions.style.display = 'none';
    divOne.classList.remove("no-display");
}

/* show next button */
function showNextBtn() {
    btnNext.classList.remove("no-display");
}

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

Check is question has been answered before activating next button

=========== */

/* Store the questions that have been answered */
var answeredQuestions = [];

var progress;

function isChecked(el) {

    // if the current radio box is checked
    if (el.checked === true) {

        // if the question has not been answered yet (is not in the answered questions array)
        if (answeredQuestions.indexOf(i) == -1) {

            // add to the answered questions array
            answeredQuestions.push(i);

            // add to the progress bar
            progress = (i * 10) + "%";
            document.getElementById("progress").style.width = progress;

            progressPercent.innerHTML = progress;

            if (progress == "100%") {
                document.getElementById("progress").style["border-radius"] = "5px";
            }

        }
        activateNextBtn();
    }

}

/* ========

Next Question

=========== */

// current question
var i = 1;

/* ========

Calculate Score

=========== */

// set the user's score
var score = 0;

function calcScore() {

    // build an array for incorrect questions
    var incorrect = [];

    for (var a = 0; a < questions.length; a++) {

        // store correct answer for each question 
        var correct = questions[a].correctAnswer;

        // get the radio buttons to loop through and see if they're checked
        var questionAnswers = document.querySelectorAll('[name=q' + questions[a].number + ']');
        var isChecked = false;

        // loop through all the answers to see if they are checked, if a checked answer is the correct answer, add 1 to the score
        for (var j = 0; j < questions[a].answers.length; j++) {
            // if an answer is checked, then see if it is the correct answer
            if (questionAnswers[j].checked == true) {
                isChecked = true;

                // if correct answer, add to score
                if (j == correct) {
                    score++;
                }

                // if question is incorrect, add to incorrect list
                else if (j != correct) {
                    incorrect.push(questions[a].number);
                }
            }
        }
    }

    var message = "";

    if (score < 6) {
        message = "Oh dear... looks like you could use some more practice.";
    }

    if (6 <= score && score <= 7) {
        message = "Not too shabby.";
    }

    if (8 <= score && score <= 9) {
        message = "Go you!";
    }


    if (score == 10) {
        message = "Wow, you got 100%! You clever cookie you (;";
    }


    /* build the html to display to the page */
    var output = "";
    output += "<p> Congratulations on completing the quiz!</p>"
    output += "<p> Your score is " + score + " out of " + questions.length + ". " + message + "</p><p>The following questions were incorrect:</p><ul>";

    for (var y = 0; y < incorrect.length; y++) {
        output += "<li class='incorrect-questions'>" + incorrect[y] + "</li>";

    }
    output += "</ul>";

    document.getElementById("score-container").innerHTML = output;

    /* hide the questions div and show the score div */
    divTwo.style.display = 'block';
    divOne.style.display = 'none';

    score = 0;

}


var progress;

function nextQuestion() {

    // show previous question button from question 2 onwards
    if (i >= 1) {

        // go to next question with next button being inactive
        btnPrev.classList.add("active");
    }

    // on the last question, hide the next button and show the calculation button
    if (i == 9) {
        btnNext.classList.remove("active");
        btnNext.classList.add("no-display");

        btnCalc.classList.add("active");
    }

    // get the current question and show it
    document.getElementsByClassName("inner")[i].classList.add("active");
    // get the question just been and hide it
    document.getElementsByClassName("inner")[i - 1].classList.remove("active");



    i++;

    // if current question has been answered, make next button active
    if (answeredQuestions.includes(i)) {

        activateNextBtn();
    }

    if (!answeredQuestions.includes(i)) {
        inactivateNextBtn();
    }



}

function previousQuestion() {

    activateNextBtn();

    // if on question 10 and previous button is pushed, hide calc score button and show next question button
    if (i == 10) {
        showNextBtn();
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

Restart Quiz

=========== */

function restartQuiz() {

    // set answered questions back to an empty array
    answeredQuestions = [];

    // get all radio buttons
    var allAnswers = document.querySelectorAll('input[type=radio]');

    // uncheck all radio buttons
    for (answer in allAnswers) {
        allAnswers[answer].checked = false;
    }

    // display questions, hide total div
    divTwo.style.display = 'none';
    divOne.style.display = 'block';

    // hide the 10th question, show the 1st question
    document.getElementsByClassName("inner")[9].classList.remove("active")
    document.getElementsByClassName("inner")[0].classList.add("active");

    // remove calculate score button, inactivate next button, show next button, hide previous button
    inactivateNextBtn();
    showNextBtn();
    btnCalc.classList.remove("active");
    btnPrev.classList.remove("active");

    // set question number back to 1
    i = 1;

    // reset progress bar + percentage
    progress = 0;
    progressPercent.innerHTML = progress + "%";
    document.getElementById("progress").style.width = progress;

    // reset border radius of progress bar
    document.getElementById("progress").style["border-radius"] = "5px 0 0 5px";


}
