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
const answerText = document.getElementById("answer-text"); // Change depending on answers array
const submitButton = document.getElementById("submit-answer-button"); // Check answer and switch to next question
const errorMessageContainer = document.getElementById(
  "error-message-container"
); // Change disply of container from flex to none
const finalResultContainer = document.getElementById("final-result-container"); // Change disply of container from flex/grid to none
const score = document.getElementById("score"); // Change depending on correct answers
const playAgainButton = document.getElementById("play-again-btn"); //Restart the state of the quiz and bring all to the first page

const correctIncorrectIcon = document.querySelectorAll(".correct-incorrect"); // Change visibility of img from visible to hidden and change icon (correct; inccorect)

let myDatabaseData = null;

async function fetchDataOnce() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    myDatabaseData = data;
    console.log("Data fetched and stored:", myDatabaseData);
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
