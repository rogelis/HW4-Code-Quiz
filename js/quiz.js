// Create variables for all the items that are within quizpg
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const timerElement = document.getElementById("timerCount");

//Once a value comes back place into a subsequent var
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let startQuestions = [];

var timerInterval;
var timerCount = 60;

let questions = [
  {
    question:"Which are the different value types in JavaScript?",
    choice1: "boolean, integer, float, string, array, object and null",
    choice2: "boolean, number, string, function, object and undefined",
    choice3: "boolean, number, date, regexp, array and object",
    choice4: "boolean, number, string, function, object, null and undefined",
    answer: 2
  },
  {
    question: "What is the value of “x” after the following code runs? var x; x++;",
    choice1: "1",
    choice2: "Throws a TypeError on the “x++;” statement",
    choice3: "0",
    choice4: "NaN",
    answer: 3
  },
  {
    question: "What best describes the Math.random() js code?",
    choice1: "Returns a random number from and including 0 to less than 1",
    choice2: "Returns a random number more than 0 up to and including 1",
    choice3: "Randomly selects a number 1-10",
    choice4: "Randomly put numbers in descending and ascending order",
    answer: 1
  },
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
];

//CONSTANTS
const correctQ = 10;
const maxQ = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  timerInterval = setInterval(timer, 1000);
  startQuestions = [...questions];
  getNewQuestion();
};

timer = () => {
  timerCount--;
  if (timerCount === 0) {
    clearInterval(timerInterval);
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("final.html");
  } 
  else {
    timerElement.textContent = timerCount;
  }
};

getNewQuestion = () => {
  if (startQuestions.length === 0 || questionCounter >= maxQ) {
    clearInterval(timerInterval);
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("final.html");
  }
  questionCounter++;
  console.log(questionCounter)
  progressText.innerText = `Question ${questionCounter}/${maxQ}`;
  console.log(questionCounter)
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / maxQ) * 100}%`;
  console.log(progressBarFull)

  const questionIndex = Math.floor(Math.random() * startQuestions.length);
  currentQuestion = startQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  startQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      timerCount = timerCount + 10;
      incrementScore(correctQ);
    } else {
      timerCount = timerCount - 10;
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();