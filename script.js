let myDatabaseData = null;
const mediaQuery = "(min-width: 1025px)";
const mediaQueryList = window.matchMedia(mediaQuery);
const backgroundColors = {
  htmlColor: "var(--Orange-50)",
  cssColor: "var(--Green-100)",
  jsColor: "var(--Blue-50)",
  accessColor: "var(--Purple-100)",
};

let currentQuizData = null;
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerData = null;
let lightMode = true;

const logoContainer = document.getElementById("logo-container");
const logoBackground = document.querySelector(".logo");
const logoBackground2 = document.querySelector(".logo-background");
const lightDarkMode = document.getElementById("light-dark-mode");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
const sunToggleCircle = document.getElementById("sun-toggle");
const moonToggleCircle = document.getElementById("moon-toggle");
const welcomeContainer = document.getElementById("welcome-container");
const headerText = document.querySelectorAll(".header-text");
const mainQuizContainer = document.getElementById("main-quiz-container");
const logoImage = document.getElementById("logo-image");
const logoText = document.getElementById("logo-text");
const questionText = document.getElementById("question-text");
const questionCurrentNumber = document.getElementById(
  "question-current-number"
);
const progressBar = document.getElementById("progress-bar");
const answerOptionElements = {
  A: {
    textEl: document.getElementById("answer-text-a"),
    containerEl: document.getElementById("answer-container-a"),
    feedbackIconEl: document.getElementById("answer-icon-a"),
    letterEl: document.getElementById("answer-letter-a"),
  },
  B: {
    textEl: document.getElementById("answer-text-b"),
    containerEl: document.getElementById("answer-container-b"),
    feedbackIconEl: document.getElementById("answer-icon-b"),
    letterEl: document.getElementById("answer-letter-b"),
  },
  C: {
    textEl: document.getElementById("answer-text-c"),
    containerEl: document.getElementById("answer-container-c"),
    feedbackIconEl: document.getElementById("answer-icon-c"),
    letterEl: document.getElementById("answer-letter-c"),
  },
  D: {
    textEl: document.getElementById("answer-text-d"),
    containerEl: document.getElementById("answer-container-d"),
    feedbackIconEl: document.getElementById("answer-icon-d"),
    letterEl: document.getElementById("answer-letter-d"),
  },
};
const allAnswerButtons = document.querySelectorAll(".answer-container");
const allAnswerText = document.querySelectorAll(".answer-text");
const submitButton = document.getElementById("submit-answer-button");
const errorMessageContainer = document.getElementById(
  "error-message-container"
);
const errorText = document.querySelector(".error-text");
const finalResultContainer = document.getElementById("final-result-container");
const scoreContainer = document.querySelector(".score-container");
const scoreLogoContainer = document.getElementById("score-logo-container");
const scoreLogoImage = document.getElementById("score-logo-image");
const scoreLogoText = document.getElementById("score-logo-text");
const scoreEl = document.getElementById("score");
const outOfNumberText = document.querySelector(".out-of-nmb-text");
const playAgainButton = document.getElementById("play-again-btn");
const customButtons = document.querySelectorAll("[data-quiz-index]");

document.addEventListener("DOMContentLoaded", async () => {
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

// Event listener for answer options

allAnswerButtons.forEach((answerButton) => {
  answerButton.addEventListener("click", handleAnswerSelection);
});

// Single event listener for the submit button

if (submitButton) submitButton.addEventListener("click", handleSubmitAnswer);

// Restart the quiz

if (playAgainButton) playAgainButton.addEventListener("click", restartQuiz);

// Light/Dark toggler

lightDarkMode.addEventListener("click", lightDarkToggler);

// Current quiz logic function

function startQuiz(quizData) {
  currentQuizData = quizData;
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswerData = null;

  // Update UI for quiz start
  if (logoContainer) logoContainer.style.visibility = "visible";
  if (currentQuizData && currentQuizData.title === "HTML") {
    logoBackground.style.background = backgroundColors.htmlColor;
    logoBackground2.style.background = backgroundColors.htmlColor;
  } else if (currentQuizData && currentQuizData.title === "CSS") {
    logoBackground.style.background = backgroundColors.cssColor;
    logoBackground2.style.background = backgroundColors.cssColor;
  } else if (currentQuizData && currentQuizData.title === "JavaScript") {
    logoBackground.style.background = backgroundColors.jsColor;
    logoBackground2.style.background = backgroundColors.jsColor;
  } else if (currentQuizData && currentQuizData.title === "Accessibility") {
    logoBackground.style.background = backgroundColors.accessColor;
    logoBackground2.style.background = backgroundColors.accessColor;
  }
  if (welcomeContainer) welcomeContainer.style.display = "none";
  if (mainQuizContainer)
    mainQuizContainer.style.display = mediaQueryList.matches ? "grid" : "flex";
  if (logoImage) logoImage.src = currentQuizData.icon;
  if (logoText) logoText.innerText = currentQuizData.title;
  if (questionCurrentNumber)
    questionCurrentNumber.innerText = currentQuizData.questions.length;
  if (progressBar) progressBar.value = currentQuizData.questions.length;

  displayQuestion();
  if (submitButton) submitButton.textContent = "Submit Answer";
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

  const optionKeys = Object.keys(answerOptionElements);

  question.options.forEach((optionText, index) => {
    const key = optionKeys[index];
    if (answerOptionElements[key] && answerOptionElements[key].textEl) {
      const elements = answerOptionElements[key];
      elements.textEl.innerText = optionText;
      elements.textEl.disabled = false;

      //Reset styles
      elements.containerEl.classList.remove(
        "correct-answer-outline",
        "incorrect-answer-outline"
      );
      if (elements.letterEl)
        elements.letterEl.classList.remove(
          "correct-answer-background",
          "incorrect-answer-background"
        );
      if (elements.feedbackIconEl)
        elements.feedbackIconEl.style.visibility = "hidden";
    }
  });

  // Disable any extra answer options if not enough options for this question
  for (let i = question.options.length; i < optionKeys.length; i++) {
    const key = optionKeys[i];
    if (answerOptionElements[key] && answerOptionElements[key].textEl) {
      answerOptionElements[key].textEl.innerText = "";
      answerOptionElements[key].textEl.disabled = true;
    }
  }

  selectedAnswerData = null;
  if (submitButton) {
    submitButton.textContent = "Submit Answer";
  }
  allAnswerButtons.forEach((btn) => {
    btn.disabled = false;
  });
}

function handleAnswerSelection(event) {
  errorMessageContainer.style.visibility = "hidden";

  const clickedButton = event.currentTarget;
  const grandParentEl = clickedButton.firstChild.nextElementSibling;
  const parentEl = grandParentEl.firstChild.nextElementSibling;
  const contentEl = parentEl.nextElementSibling;

  let keyForElements = null;
  for (const key in answerOptionElements) {
    if (
      answerOptionElements[key].textEl.textContent === contentEl.textContent
    ) {
      keyForElements = key;
      break;
    }
  }

  // Assigment to variables to store clicked button credentials

  if (keyForElements) {
    //????????/
    const elements = answerOptionElements[keyForElements];

    selectedAnswerData = {
      isCorrect:
        contentEl.textContent ===
        currentQuizData.questions[currentQuestionIndex].answer,
      container: elements.containerEl,
      feedbackIcon: elements.feedbackIconEl,
      letterContainer: elements.letterEl,
    };
  }
}

function handleSubmitAnswer() {
  if (!selectedAnswerData) {
    errorMessageContainer.style.visibility = "visible";
    return;
  }

  if (submitButton.textContent === "Submit Answer") {
    allAnswerButtons.forEach((btn) => {
      btn.classList.add("effects-disabled");
      btn.disabled = true;
    });
  }
  if (submitButton.textContent === "Next Question") {
    currentQuestionIndex++;
    displayQuestion();
    allAnswerButtons.forEach((btn) => {
      btn.classList.remove("effects-disabled");
      btn.disabled = false;
    });
    return;
  }

  if (submitButton.textContent === "Show Results") {
    showFinalResults();
    return;
  }

  // Disable all answer buttons after submitting

  const { isCorrect, container, feedbackIcon, letterContainer } =
    selectedAnswerData;

  if (isCorrect) {
    if (container) container.classList.add("correct-answer-outline");
    if (letterContainer)
      letterContainer.classList.add("correct-answer-background");
    if (feedbackIcon) {
      feedbackIcon.src = "./assets/images/icon-correct.svg";
      feedbackIcon.style.visibility = "visible";
    }
    score++;
  } else {
    if (container) container.classList.add("incorrect-answer-outline");
    if (letterContainer)
      letterContainer.classList.add("incorrect-answer-background");
    if (feedbackIcon) {
      feedbackIcon.src = "./assets/images/icon-incorrect.svg";
      feedbackIcon.style.visibility = "visible";
    }
  }

  // Update submit button for next action
  if (currentQuestionIndex < currentQuizData.questions.length - 1) {
    if (submitButton) submitButton.textContent = "Next Question";
  } else {
    if (submitButton) submitButton.textContent = "Show Results";
  }
}

function showFinalResults() {
  if (mainQuizContainer) mainQuizContainer.style.display = "none";
  if (finalResultContainer)
    finalResultContainer.style.display = mediaQueryList.matches
      ? "grid"
      : "flex";
  if (scoreLogoContainer) scoreLogoContainer.style.visibility = "visible";
  if (scoreLogoImage) scoreLogoImage.src = currentQuizData.icon;
  if (scoreLogoText) scoreLogoText.innerText = currentQuizData.title;
  if (score) scoreEl.textContent = score;
}

function restartQuiz() {
  if (welcomeContainer)
    welcomeContainer.style.display = mediaQueryList.matches ? "grid" : "flex";
  if (logoContainer) logoContainer.style.visibility = "hidden";
  if (finalResultContainer) finalResultContainer.style.display = "none";
}

function lightDarkToggler() {
  lightMode = !lightMode;
  if (lightMode === false) {
    document.body.style.background = mediaQueryList.matches // აქ ტაბლეტსაც თუ დავამატებ კაცი ვარ
      ? "url(../assets/images/pattern-background-desktop-dark.svg)"
      : "url(../assets/images/pattern-background-mobile-dark.svg)";
    document.body.style.backgroundColor = "var(--Blue-900)";
    document.body.style.color = "var(--White)";
    sunToggleCircle.style.visibility = "hidden";
    moonToggleCircle.style.visibility = "visible";
    sunIcon.src = "./assets/images/icon-sun-light.svg";
    moonIcon.src = "./assets/images/icon-moon-light.svg";
    customButtons.forEach((button) => {
      button.classList.add("dark-button");
    });
    headerText.forEach((header) => {
      header.classList.add("header-text-dark");
    });
    progressBar.classList.add("progress");
    allAnswerButtons.forEach((button) => {
      button.classList.add("dark-button");
    });
    allAnswerText.forEach((answer) => {
      answer.classList.add("answer-text-dark");
    });
    errorText.classList.add("error-text-dark");
    scoreContainer.classList.add("score-container-dark");
    outOfNumberText.classList.add("out-of-nmb-text-dark");
  } else if (lightMode === true) {
    document.body.style.background = mediaQueryList.matches
      ? "url(../assets/images/pattern-background-desktop-light.svg)"
      : "url(../assets/images/pattern-background-mobile-light.svg)";
    document.body.style.backgroundColor = "var(--Gray-50)";
    document.body.style.color = "var(--Blue-900)";
    sunToggleCircle.style.visibility = "visible";
    moonToggleCircle.style.visibility = "hidden";
    sunIcon.src = "./assets/images/icon-sun-dark.svg";
    moonIcon.src = "./assets/images/icon-moon-dark.svg";
    customButtons.forEach((button) => {
      button.classList.remove("dark-button");
    });
    headerText.forEach((header) => {
      header.classList.remove("header-text-dark");
    });
    progressBar.classList.remove("progress");
    allAnswerButtons.forEach((button) => {
      button.classList.remove("dark-button");
    });
    allAnswerText.forEach((answer) => {
      answer.classList.remove("answer-text-dark");
    });
    errorText.classList.remove("error-text-dark");
    scoreContainer.classList.remove("score-container-dark");
    outOfNumberText.classList.remove("out-of-nmb-text-dark");
  }
}
