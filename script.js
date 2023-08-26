//variables
var questionArray = [
  {
    questionTitle: "What is JavaScript",
    a: "Programming Language",
    b: "type of video",
    C: "dictionnary",
    correctAnswer: "a",
  },
  {
    questionTitle: "What is HTML?",
    a: "video channel",
    b: "music platform",
    c: "basic building block of the Web",
    correctAnswer: "c",
  },
  {
    questionTitle: "What is jquery?",
    a: "it is a game",
    b: "it is a fast, small, and feature-rich JavaScript library",
    c: "it is a movie name",
    correctAnswer: "b",
  },
  {
    questionTitle: "What is Node.js",
    a: "it isan open-source, cross-platform, back-end JavaScript runtime environment t",
    b: "it is a language",
    c: "it is math function",
    correctAnswer: "a",
  },
];

let quiz = document.getElementById("quiz");
let answerEls = document.querySelectorAll(".answer");
let questionEl = document.querySelector(".question");
let a_text = document.getElementById("a_text");
let b_text = document.getElementById("b_text");
let c_text = document.getElementById("c_text");
let submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("Start");
var timePara = document.querySelector("#timePara");
var myScoreBox = document.querySelector(".scoreBox");
var myFinalBox = document.querySelector("#finalBox");
var isPlaying = false;

let currentQuiz = 0;
let score = 0;
// need to add addEventlistener + my function
startBtn.addEventListener("click", startGame);

function startGame() {
  console.log(startGame);
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  userGuessArray = [];
  //update quiz time
  timeLeft = 30;
  // chosenWord = words[Math.floor(Math.random() * words.length)];
  // chosenWord = chosenWord.split("");
  // console.log("chosenword: ", chosenWord);
  // for (let i = 0; i < chosenWord.length; i++) {
  //   userGuessArray.push("_");
  // }
  // console.log("userGuess:", userGuessArray);
  // wordPara.textContent = userGuessArray.join(" ");
  startTimer();
  loadQuiz();
}
function startTimer() {
  timePara.textContent = timeLeft;
  timer = setInterval(function () {
    if (isPlaying == false) {
      endTimer();
      clearInterval(timer);
      console.log("clearInterval");
    }
    console.log(timeLeft);
    timeLeft--;
    timePara.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      gameOver();
      // console.log("LOST!");
      // wordPara.textContent = `To Slow! the word was: ${chosenWord.join(" ")}`;
      // // losses++;
      // localStorage.setItem("losses", losses);
      // lossesSpan.textContent = losses;
      isPlaying = false;
    }
  }, 1000);
}

// function endTimer() {
//   clearInterval(timer);
// }

function loadQuiz() {
  deselectAnswers();

  var currentQuizData = questionArray[currentQuiz];
  console.log(currentQuizData);
  console.log(questionEl);
  questionEl.innerText = currentQuizData.questionTitle;

  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === questionArray[currentQuiz].correctAnswer) {
      score++;
    }
    currentQuiz++;

    if (currentQuiz < questionArray.length) {
      loadQuiz();
    } else {
      gameOver();
    }
  }
});

function gameOver() {
  quiz.innerHTML = `
  <h2> You answered ${score}/${questionArray.length} question correctly </h2>

  <button onclick="location.reload()"> Reload</button>
  `;
  clearInterval(timer);
  myScoreBox.style.display = "block";

  myFinalBox.style.display = "block";
}

function storeData() {
  //build array
  //display  on the page
  var myScore = JSON.parse(localStorage.getItem("highScore")) || [];
  //grabbing array from the local  storage
  // var takeScore = document.querySelector("#lossesSpan").textContent;
  // console.log(takeScore);
  //because the user gonna  put a value
  var takeInit = document.querySelector("#myInput").value;
  console.log(myScore);
  var currentScore = `Initials: ${takeInit}, Score: ${score}`;
  myScore.push(currentScore);
  console.log(currentScore);
  //add new data to array

  //storing new array in local storage
  localStorage.setItem("highScore", JSON.stringify(myScore));
  //displaying data on the page

  let text = JSON.parse(localStorage.getItem("highScore")) || [];
  console.log("...............hello..................");
  console.log(text);
  window.alert(text);
  document.getElementById("finalBox").innerHTML = text;
}
