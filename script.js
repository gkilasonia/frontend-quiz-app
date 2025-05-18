fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data.quizzes[0].questions[0].question);
  })
  .catch((error) => {
    console.error("Error fetching the JSON file:", error);
  });
