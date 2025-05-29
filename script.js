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

let myDatabaseData = null;
const mediaQuery = "(min-width: 1025px)";
const mediaQueryList = window.matchMedia(mediaQuery);

document.addEventListener("DOMContentLoaded", async () => {
  const customButtons = document.querySelectorAll('[role="button"]');

  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    myDatabaseData = await response.json();
    console.log("Data fetched and stored:", myDatabaseData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  customButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const buttonText = button.querySelector("p").textContent;
      if (buttonText === "HTML") {
        openHtmlQuiz(myDatabaseData.quizzes[0]);
      } else if (buttonText === "CSS") {
        openCssQuiz(myDatabaseData.quizzes[1]);
      } else if (buttonText === "Javascript") {
        openJsQuiz(myDatabaseData.quizzes[2]);
      } else if (buttonText === "Accessibility") {
        openAccessQuiz(myDatabaseData.quizzes[3]);
      }
      // console.log(`Custom button "${buttonText}" clicked!`);
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        button.click();
      }
    });
  });
});

function openHtmlQuiz(htmlData) {
  logoContainer.style.visibility = "visible";
  welcomeContainer.style.display = "none";
  mainQuizContainer.style.display = mediaQueryList.matches ? "grid" : "flex";
  // Logic with data
  logoImage.src = htmlData.icon;
  logoText.innerText = htmlData.title;
  questionText.innerText = htmlData.questions[0].question;
  questionCurrentNumber.innerText = htmlData.questions.length - 9;
  progressBar.value = htmlData.questions.length - 9;
  answerTextA.innerText = htmlData.questions[0].options[0];
  answerTextB.innerText = htmlData.questions[0].options[1];
  answerTextC.innerText = htmlData.questions[0].options[2];
  answerTextD.innerText = htmlData.questions[0].options[3];
  console.log(htmlData.questions[0].answer);
  // Logic for answer buttons
  const answerText = document.querySelectorAll(".answer-text");
  answerText.forEach((button) => {
    button.addEventListener("click", (event) => {
      submitButton.addEventListener("click", () => {
        const buttonText = button.textContent;
        console.log(buttonText);
        if (buttonText === htmlData.questions[0].answer) {
          console.log(buttonText);
          console.log("It is correct");
          button.style.color = "red";
          button.classList.add("correct-answer-outline"); //I stopped here
        } else {
          console.log(buttonText);
          console.log("answer is Incorrect");
        }
      });
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        button.click();
      }
    });
  });
}

function openCssQuiz(cssData) {
  logoContainer.style.visibility = "visible";
  welcomeContainer.style.display = "none";
  mainQuizContainer.style.display = mediaQueryList.matches ? "grid" : "flex";
  // Logic with data
  logoImage.src = cssData.icon;
  logoText.innerText = cssData.title;
  questionText.innerText = cssData.questions[0].question;
  questionCurrentNumber.innerText = cssData.questions.length - 9;
  progressBar.value = cssData.questions.length - 9;
  answerTextA.innerText = cssData.questions[0].options[0];
  answerTextB.innerText = cssData.questions[0].options[1];
  answerTextC.innerText = cssData.questions[0].options[2];
  answerTextD.innerText = cssData.questions[0].options[3];
  console.log(cssData);
}

function openJsQuiz(jsData) {
  logoContainer.style.visibility = "visible";
  welcomeContainer.style.display = "none";
  mainQuizContainer.style.display = mediaQueryList.matches ? "grid" : "flex";
  // Logic with data
  logoImage.src = jsData.icon;
  logoText.innerText = jsData.title;
  questionText.innerText = jsData.questions[0].question;
  questionCurrentNumber.innerText = jsData.questions.length - 9;
  progressBar.value = jsData.questions.length - 9;
  answerTextA.innerText = jsData.questions[0].options[0];
  answerTextB.innerText = jsData.questions[0].options[1];
  answerTextC.innerText = jsData.questions[0].options[2];
  answerTextD.innerText = jsData.questions[0].options[3];
  console.log(jsData);
}

function openAccessQuiz(accessData) {
  logoContainer.style.visibility = "visible";
  welcomeContainer.style.display = "none";
  mainQuizContainer.style.display = mediaQueryList.matches ? "grid" : "flex";
  // Logic with data
  logoImage.src = accessData.icon;
  logoText.innerText = accessData.title;
  questionText.innerText = accessData.questions[0].question;
  questionCurrentNumber.innerText = accessData.questions.length - 9;
  progressBar.value = accessData.questions.length - 9;
  answerTextA.innerText = accessData.questions[0].options[0];
  answerTextB.innerText = accessData.questions[0].options[1];
  answerTextC.innerText = accessData.questions[0].options[2];
  answerTextD.innerText = accessData.questions[0].options[3];
  console.log(accessData);
}
