// store buttons as variables

// only called once
document.getElementById("start-quiz").addEventListener("click", startQuiz);
document.getElementById("retry").addEventListener("click", restartQuiz);

var btnCalcScore = document.getElementById("calculate");
var btnNextQuestion = document.getElementById("next");
var btnPreviousQuestion = document.getElementById("previous");

// add listeners to buttons
btnCalcScore.addEventListener("click", calcScore);
btnNextQuestion.addEventListener("click", nextQuestion);
btnPreviousQuestion.addEventListener("click", previousQuestion);

// question array
var questions = [
    {
        number: 1,
        title: 'What does CSS stand for?',
        answers: ['Cascading CSS', 'Cascading style sheets', 'Cascading separate style'],
        correctAnswer: 1
},
    {
        number: 2,
        title: 'Which attribute can set text to bold?',
        answers: ['text-decoration', 'font-style', 'font-weight'],
        correctAnswer: 2
},
    {
        number: 3,
        title: 'Which tag is used to link an external CSS file?',
        answers: ['<code>&lt;script&gt;</code>', '<code>&lt;link&gt;</code>', '<code>&lt;rel&gt;</code>'],
        correctAnswer: 1
},
    {
        number: 4,
        title: 'Which attribute sets the underline property?',
        answers: ['font-style', 'text-decoration', 'font-weight'],
        correctAnswer: 1
},
    {
        number: 5,
        title: 'Which measurement is NOT relative?',
        answers: ['rem', 'cm', '%', 'em'],
        correctAnswer: 1
},
    {
        number: 6,
        title: 'Which measurement unit IS relative?',
        answers: ['em', 'cm', 'mm', 'inch'],
        correctAnswer: 0
},
    {
        number: 7,
        title: 'What attribute is used move an elements content away from its border?',
        answers: ['margin', 'padding', 'border', 'width'],
        correctAnswer: 1
},
    {
        number: 8,
        title: 'Which attribute does not contribute to a block elements total width?',
        answers: ['width', 'border', 'background-image', 'padding'],
        correctAnswer: 2
},
    {
        number: 9,
        title: 'What property changes positioned elements display order?',
        answers: ['width', 'background', 'z-index', 'azimuth'],
        correctAnswer: 2
},
    {
        number: 10,
        title: 'Which value of background-repeat will cause a background to repeat vertically?',
        answers: ['repeat-x', 'repeat', 'repeat-y', 'no-repeat'],
        correctAnswer: 2
}

];

// add a new animation to each question div
window.addEventListener("DOMContentLoaded", function () {
    // animations array 
    var animations = ["slideRight", "slideLeft", "slideUp", "slideDown"];

    var numRandom;
    var output = "";
    for (x in questions) {
        output += "<div class='inner box no-display ";

        // add a random animation class to each question
        numRandom = Math.floor(Math.random() * animations.length);
        output += animations[numRandom];

        output += "'>";
        output += "<legend class='question-heading'>" + questions[x].number + ". " + questions[x].title + "</legend>";

        for (var j = 0; j < questions[x].answers.length; j++) {
            output += "<div class='questions'>";
            output += "<label><input type='radio' name='q" + questions[x].number + "' onclick='processChecked(this)'>";
            output += questions[x].answers[j] + "</label>";
            output += "</div>";
        }

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
    document.getElementById("instructions-container").style.display = 'none';
    document.getElementById("one").classList.remove("no-display");
}

/* show next button */
function showNextBtn() {
    btnNextQuestion.classList.remove("no-display");
}

/* make next button active */
function activateNextBtn() {
    btnNextQuestion.classList.remove("inactive");
    btnNextQuestion.removeAttribute("disabled");
    btnNextQuestion.classList.add("animate-right-arrow");
}

/* make next button inactive */
function inactivateNextBtn() {
    btnNextQuestion.classList.add("inactive");
    btnNextQuestion.setAttribute("disabled", "");
    btnNextQuestion.classList.remove("animate-right-arrow");
}


/* ========

Check if question has been answered

=========== */

/* store the questions that have been answered */
var answeredQuestions = [];

/* everytime a radio is selected, check to see if the current question has been answered, if not, add it to the answeredQuestions array */
function processChecked(el) {

    // if the current radio box is checked
    if (el.checked === true) {

        // if the question has not been answered yet (is not in the answered questions array)
        if (answeredQuestions.indexOf(currentQuestion) == -1) {

            // add to the answered questions array
            answeredQuestions.push(currentQuestion);

            updateProgress(currentQuestion * 10);

            // when the last question is answered, enabled and show the calc score button
            if (currentQuestion == 10) {
                btnCalcScore.classList.remove("inactive");
                btnCalcScore.removeAttribute("disabled");
            }

            activateNextBtn();

        }

    }

}


/* Update progress bar */

function updateProgress(progress) {
    // add to the progress bar
    progress += "%";
    document.getElementById("progress").style.width = progress;

    document.getElementById("percent-progress").innerHTML = progress;

    // make corners of progress bar rounded at 100% to fit in the container
    if (progress == "100%") {
        document.getElementById("progress").style["border-radius"] = "5px";
    }
    if (progress == "0%") {
        document.getElementById("progress").style["border-radius"] = "5px 0 0 5px";
    }

}


/* ========

Generate Score

=========== */

/* generates the score message */
function generateScoreMessage(score, totalQuestions) {

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
    var scoreOutput = "<div class='box'>";
    scoreOutput += "<p> Congratulations on completing the quiz!</p>";
    scoreOutput += "<p> Your score is " + score + " out of " + totalQuestions + ". " + message + "</p>";

    return scoreOutput;

}

function generateIncorrectQuestions(incorrectQuestions) {

    var output = "";
    output += generateIncorrectSummary(incorrectQuestions);
    output += generateIncorrectDetail(incorrectQuestions);

    return output;
}

// list the incorrect answers
function generateIncorrectSummary(incorrectQuestions) {
    var output = "<p>The following questions were incorrect:</p><ul>";
    // list the numbers of the incorrect questions
    for (var y = 0; y < incorrectQuestions.length; y++) {
        output += "<li class='question incorrect'>" + incorrectQuestions[y].question.number + "</li>";

    }
    output += "</ul>";
    output += "</div>";

    return output;

}

// list the incorrect answers in full
function generateIncorrectDetail(incorrectQuestions) {

    var output = "";
    for (x = 0; x < incorrectQuestions.length; x++) {

        output += "<div class='box'>";
        output += "<legend class='question-heading'>" + incorrectQuestions[x].question.number + ". " + incorrectQuestions[x].question.title + "</legend>";

        for (var j = 0; j < incorrectQuestions[x].question.answers.length; j++) {
            output += "<div class='questions'>";
            output += "<li class='question ";
            if (j == incorrectQuestions[x].question.correctAnswer) {
                output += "correct'>";
            } else if (j == incorrectQuestions[x].incorrectIndex) {
                output += "incorrect'>";
            } else {
                output += "other'>";
            }
            output += "<label>" + incorrectQuestions[x].question.answers[j] + "</label>";
            output += "</li>";
            output += "</div>";
        }
        output += "</div>";

    }

    return output;

}

/* ========

Calculate Score

=========== */

function calcScore() {

    // store the incorrect questions as objects in an array
    var incorrectQuestions = [];

    // set the user's score
    var score = 0;

    // a is the current question
    for (var a = 0; a < questions.length; a++) {

        // store correct answer for certain question 
        var correct = questions[a].correctAnswer;

        // get the radio buttons of current question to loop through and see if they're checked
        var questionAnswers = document.querySelectorAll('[name=q' + questions[a].number + ']');

        // loop through all the answers to see if they are checked, if a checked answer is the correct answer, add 1 to the score
        for (var j = 0; j < questions[a].answers.length; j++) {
            // if an answer is checked, then see if it is the correct answer
            if (questionAnswers[j].checked == true) {

                // if correct answer, add to score
                if (j == correct) {
                    score++;
                }

                // if question is incorrect, add to incorrect array
                // incorrectIndex is the index of the user's chosen incorrect answer
                else {
                    var incorrect = {
                        question: questions[a],
                        incorrectIndex: j
                    };

                    incorrectQuestions.push(incorrect);
                }
            }
        }
    }

    var output = "";

    // generate the score message
    output += generateScoreMessage(score, questions.length);

    // generate the incorrect questions in the format they appear in the quiz
    output += generateIncorrectQuestions(incorrectQuestions);


    document.getElementById("score-container").innerHTML = output;

    /* hide the questions div and show the score div */
    document.getElementById("two").style.display = 'block';
    document.getElementById("one").style.display = 'none';
}


var currentQuestion = 1;

function nextQuestion(e) {
    // show previous question button from question 2 onwards
    if (currentQuestion >= 1) {

        // go to next question with next button being inactive
        btnPreviousQuestion.classList.add("active");
    }

    // on the last question, hide the next button and show the calculation button
    if (currentQuestion == 9) {
        btnNextQuestion.classList.remove("active");
        btnNextQuestion.classList.add("no-display");

        btnCalcScore.classList.remove("no-display");
    }

    // get the current question and show it
    document.getElementsByClassName("inner")[currentQuestion].classList.add("active");
    // get the question just been and hide it
    document.getElementsByClassName("inner")[currentQuestion - 1].classList.remove("active");

    currentQuestion++;

    // if current question has been answered, make next button active
    if (answeredQuestions.includes(currentQuestion)) {
        activateNextBtn();
    } else if (!answeredQuestions.includes(currentQuestion)) {
        inactivateNextBtn();
    }

}

function previousQuestion() {

    activateNextBtn();

    // if on question 10 and previous button is pushed, hide calc score button and show next question button
    if (currentQuestion == 10) {
        showNextBtn();
        btnCalcScore.classList.remove("active");
        btnCalcScore.classList.add("no-display");

    }
    if (currentQuestion == 2) {
        btnPreviousQuestion.classList.remove("active");
        btnPreviousQuestion.classList.add("invisible");
    }
    if (currentQuestion > 1) {
        // get element at index (starting with 0)
        document.getElementsByClassName("inner")[currentQuestion - 1].classList.remove("active");

        // get the element 1 after the first one
        document.getElementsByClassName("inner")[currentQuestion - 2].classList.add("active");

        currentQuestion--;
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
    document.getElementById("two").style.display = 'none';
    document.getElementById("one").style.display = 'block';

    // hide the 10th question, show the 1st question
    document.getElementsByClassName("inner")[9].classList.remove("active")
    document.getElementsByClassName("inner")[0].classList.add("active");

    // remove calculate score button, inactivate next button, show next button, hide previous button
    inactivateNextBtn();
    showNextBtn();
    btnCalcScore.classList.add("no-display");
    btnCalcScore.classList.add("inactive");
    btnCalcScore.setAttribute("disabled", "");
    btnPreviousQuestion.classList.remove("active");

    // set question number back to 1
    currentQuestion = 1;

    // reset progress bar + percentage
    updateProgress(0);




}
