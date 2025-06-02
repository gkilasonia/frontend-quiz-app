const sunIcon = document.getElementById("sun-icon"); // Change icon (Dark; Light)
const moonIcon = document.getElementById("moon-icon"); // Change icon (Dark; Light)
const sunToggleCircle = document.getElementById("sun-toggle"); // Change visibility of circle from visible to hidden
const moonToggleCircle = document.getElementById("moon-toggle"); // Change visibility of circle from visible to hidden

const htmlLogoContainer = document.getElementById("html-logo-container"); // Direct user to HTML questions page
const cssLogoContainer = document.getElementById("css-logo-container"); // Direct user to CSS questions page
const jsLogoContainer = document.getElementById("js-logo-container"); // Direct user to JS questions page
const accessLogoContainer = document.getElementById("access-logo-container"); // Direct user to Accessibility questions page

const answerTextA = document.getElementById("answer-text-a"); // Change depending on answers array
const answerTextB = document.getElementById("answer-text-b"); // Change depending on answers array
const answerTextC = document.getElementById("answer-text-c"); // Change depending on answers array
const answerTextD = document.getElementById("answer-text-d"); // Change depending on answers array

const errorMessageContainer = document.getElementById(
  "error-message-container"
); // Change disply of container from flex to none
const finalResultContainer = document.getElementById("final-result-container"); // Change disply of container from flex/grid to none
const scoreEl = document.getElementById("score"); // Change depending on correct answers
const playAgainButton = document.getElementById("play-again-btn"); //Restart the state of the quiz and bring all to the first page

let myDatabaseData = null;
const mediaQuery = "(min-width: 1025px)";
const mediaQueryList = window.matchMedia(mediaQuery);

let quizActive = false;
let currentQuizData = null;
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerData = null;

const logoContainer = document.getElementById("logo-container");
const welcomeContainer = document.getElementById("welcome-container");
const mainQuizContainer = document.getElementById("main-quiz-container");
const logoImage = document.getElementById("logo-image");
const logoText = document.getElementById("logo-text");
const questionText = document.getElementById("question-text");
const questionCurrentNumber = document.getElementById(
  "question-current-number"
);
const progressBar = document.getElementById("progress-bar");
const answerOptionElements = {
  A: { textEl: document.getElementById("answer-text-a") }, // აქ გავჩერდი
};
const submitButton = document.getElementById("submit-answer-button");

document.addEventListener("DOMContentLoaded", async () => {
  const customButtons = document.querySelectorAll("[data-quiz-index]");

  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    myDatabaseData = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  customButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const quizIndex = parseInt(event.currentTarget.dataset.quizIndex, 10);
      startQuiz(myDatabaseData.quizzes[quizIndex]);
    });
  });
});

// Current quiz logic function

function startQuiz(quizData) {
  quizActive = true;
  currentQuizData = quizData;
  currentQuestionIndex = 0; // Why?
  score = 0; //Why?
  selectedAnswerData = null; //Why?

  // Update UI for quiz start
  if (logoContainer) logoContainer.style.visibility = "visible";
  if (welcomeContainer) welcomeContainer.style.display = "none";
  if (mainQuizContainer)
    mainQuizContainer.style.display = mediaQueryList.matches ? "grid" : "flex";

  if (logoImage) logoImage.src = currentQuizData.icon;
  if (logoText) logoText.innerText = currentQuizData.title;
  if (questionCurrentNumber)
    questionCurrentNumber.innerText = currentQuizData.questions.length;
  if (progressBar) progressBar.value = currentQuizData.questions.length;

  displayQuestion();
  if (submitButton) {
    submitButton.textContent = "Submit Answer";
    submitButton.disabled = true;
  } // ამ ღილაკის გათიშვა რაოდენ საჭიროა უნდა გავარკვიო
}

function displayQuestion() {
  if (
    !currentQuizData ||
    currentQuestionIndex >= currentQuizData.questions.length
  ) {
    showFinalResults();
    return;
  }

  const question = currentQuizData.questions[currentQuestionIndex];
  if (questionText) questionText.innerText = question.question;
  if (questionCurrentNumber)
    questionCurrentNumber.innerText = currentQuestionIndex + 1;
  if (progressBar) progressBar.value = currentQuestionIndex + 1;
  console.log(answ);
}

// function openQuiz(quizData) {
//   logoContainer.style.visibility = "visible";
//   welcomeContainer.style.display = "none";
//   mainQuizContainer.style.display = mediaQueryList.matches ? "grid" : "flex";
//   // Logic with data
//   logoImage.src = quizData.icon;
//   logoText.innerText = quizData.title;
//   questionText.innerText = quizData.questions[0].question;
//   questionCurrentNumber.innerText = quizData.questions.length - 9;
//   progressBar.value = quizData.questions.length - 9;
//   answerTextA.innerText = quizData.questions[0].options[0];
//   answerTextB.innerText = quizData.questions[0].options[1];
//   answerTextC.innerText = quizData.questions[0].options[2];
//   answerTextD.innerText = quizData.questions[0].options[3];
//   console.log(quizData.questions[0].answer);
//   // Logic for answer buttons
//   const answerText = document.querySelectorAll(".answer-text");
//   answerText.forEach((button) => {
//     button.addEventListener("click", (event) => {
//       submitButton.addEventListener("click", () => {
//         const buttonText = button.textContent;
//         console.log(buttonText);
//         let grandParent = event.target.closest(".answer-container");
//         let sibling = button.previousElementSibling;
//         let uncle = event.target.closest(
//           ".answer-text-container"
//         ).nextElementSibling;
//         if (buttonText === quizData.questions[0].answer) {
//           // Change the button style to indicate correct answer
//           grandParent.classList.add("correct-answer-outline");
//           // Change the button background to indicate correct answer
//           sibling.classList.add("correct-answer-background");
//           // Appear the icon to indicate correct answer
//           uncle.src = "./assets/images/icon-correct.svg";
//           uncle.style.visibility = "visible";
//           submitButton.textContent = "Next Question";
//           // Update the question text and options for the next question
//         } else {
//           // Change the button style to indicate incorrect answer
//           grandParent.classList.add("incorrect-answer-outline");
//           // Change the button background to indicate incorrect answer
//           sibling.classList.add("incorrect-answer-background");
//           // Appear the icon to indicate incorrect answer
//           uncle.src = "./assets/images/icon-incorrect.svg";
//           uncle.style.visibility = "visible";
//           submitButton.textContent = "Next Question";
//         }
//       });
//     });
//   });
// }
