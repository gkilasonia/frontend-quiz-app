const logoContainer = document.getElementById("logo-container"); // Change visibility of container from visible to hidden
const logoImage = document.getElementById("logo-image"); // Change icon (HTML; CSS; JS; Accessibility)
const logoText = document.getElementById("logo-text"); //  Change text (HTML; CSS; JS; Accessibility)
const sunIcon = document.getElementById("sun-icon"); // Change icon (Dark; Light)
const moonIcon = document.getElementById("moon-icon"); // Change icon (Dark; Light)
const sunToggleCircle = document.getElementById("sun-toggle"); // Change visibility of circle from visible to hidden
const moonToggleCircle = document.getElementById("moon-toggle"); // Change visibility of circle from visible to hidden
const welcomeContainer = document.getElementById("welcome-container"); // Change disply of container from flex/grid to none
const htmlLogoContainer = document.getElementById("html-logo-container"); // Direct user to HTML questions page
const cssLogoContainer = document.getElementById("css-logo-container"); // Direct user to CSS questions page
const jsLogoContainer = document.getElementById("js-logo-container"); // Direct user to JS questions page
const accessLogoContainer = document.getElementById("access-logo-container"); // Direct user to Accessibility questions page
const mainQuizContainer = document.getElementById("main-quiz-container"); // Change disply of container from flex/grid to none
const questionCurrentNumber = document.getElementById(
  "question-current-number"
); // Increase/decrease depending on questions array
const questionText = document.getElementById("question-text"); // Change depending on questions array
const progressBar = document.getElementById("progress-bar"); // Increase/decrease depending on correct answers
const answerTextA = document.getElementById("answer-text-a"); // Change depending on answers array
const answerTextB = document.getElementById("answer-text-b"); // Change depending on answers array
const answerTextC = document.getElementById("answer-text-c"); // Change depending on answers array
const answerTextD = document.getElementById("answer-text-d"); // Change depending on answers array
const submitButton = document.getElementById("submit-answer-button"); // Check answer and switch to next question
const errorMessageContainer = document.getElementById(
  "error-message-container"
); // Change disply of container from flex to none
const finalResultContainer = document.getElementById("final-result-container"); // Change disply of container from flex/grid to none
const score = document.getElementById("score"); // Change depending on correct answers
const playAgainButton = document.getElementById("play-again-btn"); //Restart the state of the quiz and bring all to the first page

const correctIncorrectIcon = document.querySelectorAll(".correct-incorrect"); // Change visibility of img from visible to hidden and change icon (correct; inccorect)

const htmlLogoUrl = "./assets/images/icon-html.svg";
const cssLogoUrl = "./assets/images/icon-css.svg";
const jsLogoUrl = "./assets/images/icon-js.svg";
const accessLogoUrl = "./assets/images/icon-accessibility.svg";

let myDatabaseData = null;

async function fetchDataOnce() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    myDatabaseData = data;

    const mediaQuery = "(min-width: 1025px)";
    const mediaQueryList = window.matchMedia(mediaQuery);

    let qustionNumber = 1;
    let question = myDatabaseData.quizzes[0].questions[0].question;
    let answers = myDatabaseData.quizzes[0].questions[0].options;

    console.log(
      "Data fetched and stored:",
      myDatabaseData.quizzes[0].questions[0]
    );

    htmlLogoContainer.addEventListener("click", () => {
      openHtmlQuiz();
    });

    function openHtmlQuiz() {
      logoContainer.style.visibility = "visible";
      welcomeContainer.style.display = "none";
      mainQuizContainer.style.display = mediaQueryList ? "grid" : "flex";
      finalResultContainer.style.display = "none";
      logoImage.src = htmlLogoUrl;
      logoText.innerText = "HTML";
      questionCurrentNumber.innerText = qustionNumber;
      questionText.innerText = question;
      answerTextA.innerText = answers[0];
      answerTextB.innerText = answers[1];
      answerTextC.innerText = answers[2];
      answerTextD.innerText = answers[3];
    }

    processData();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function processData() {
  if (myDatabaseData) {
    console.log("Processing data:", myDatabaseData);
  } else {
    console.log("Data not yet available");
  }
}

fetchDataOnce();

cssLogoContainer.addEventListener("click", () => {
  openCssQuiz();
});
jsLogoContainer.addEventListener("click", () => {
  openJsQuiz();
});
accessLogoContainer.addEventListener("click", () => {
  openAccessQuiz();
});

function openCssQuiz() {
  logoContainer.style.visibility = "visible";
  welcomeContainer.style.display = "none";
  mainQuizContainer.style.display = "flex";
  logoImage.src = "./assets/images/icon-css.svg";
  logoText.innerText = "CSS";
}

function openJsQuiz() {
  logoContainer.style.visibility = "visible";
  welcomeContainer.style.display = "none";
  mainQuizContainer.style.display = "flex";
  logoImage.src = "./assets/images/icon-js.svg";
  logoText.innerText = "Javascript";
}

function openAccessQuiz() {
  logoContainer.style.visibility = "visible";
  welcomeContainer.style.display = "none";
  mainQuizContainer.style.display = "flex";
  logoImage.src = "./assets/images/icon-accessibility.svg";
  logoText.innerText = "Accessibility";
}
