const questions = [{
    question: "Satellite launching station is located at?",
    options: ["Sriharikotta", "Solapur", "Warangal", "Salem"],
    answer: "Sriharikotta"
},
{
    question: "The number of already named bones in the human skeleton is?",
    options: ["200", "206", "300", "250"],
    answer: "206"
},
{
    question: "India has largest deposits of ____ in the world.",
    options: ["Gold", "Mica", "Silver", "Copper"],
    answer: "Mica"
},
{
    question: "When is the International Workers' Day?",
    options: ["15th April", "12th December", "1st May", "17st July"],
    answer: "1st May"
},
{
    question: "Joule is the unit of?",
    options: ["Temperature", "Pressure", "Heat", "Energy"],
    answer: "Energy"
},
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

function displayQuestion() {
const currentQuestion = questions[currentQuestionIndex];
questionElement.textContent = currentQuestion.question;
questionElement.classList.add("que");
optionsElement.innerHTML = "";

currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(option));
    optionsElement.appendChild(button);

});

startTimer(10);
}

function startTimer(seconds) {
let timeLeft = seconds;
timerElement.textContent = `Time Left: ${timeLeft}s`;

timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft === 0) {
        clearInterval(timer);
        checkAnswer(null);
    }
}, 1000);
}

function stopTimer() {
clearInterval(timer);
}

function checkAnswer(selectedOption) {
stopTimer();

const currentQuestion = questions[currentQuestionIndex];
const correctAnswer = currentQuestion.answer;

if (selectedOption === correctAnswer) {
    score++;
    resultElement.textContent = "Correct!";
    resultElement.classList.add("correct");
} else {
    resultElement.textContent = "Incorrect!";
    resultElement.classList.add("error");
    resultElement.classList.remove("correct");
}

scoreElement.textContent = `Score: ${score}`;
nextButton.style.display = "block";
}


function nextQuestion() {
currentQuestionIndex++;
resultElement.textContent = "";
if (currentQuestionIndex < questions.length) {
    displayQuestion();
    nextButton.style.display = "none";
} else {
    showFinalScore();
}
}

function showFinalScore() {
questionElement.textContent = "Quiz Completed!";
optionsElement.innerHTML = "";
resultElement.textContent = "";
scoreElement.textContent = `Your Score: ${score} / ${questions.length}`;
restartButton.style.display = "block";
nextButton.style.display = "none";
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", () => {
currentQuestionIndex = 0;
score = 0;
resultElement.textContent = "";
scoreElement.textContent = "Score: 0";
displayQuestion();
restartButton.style.display = "none";
nextButton.style.display = "none";
});

displayQuestion();