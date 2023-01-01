// const gameSchema = {
//   name: "",
//   url: "",
//   genre: "",
//   subject: "",
//   topic: ""
// };

// const questionSchema = {
//   name: "",
//   choice1: "",
//   choice2: "",
//   choice3: ""
// };

// Filter game by tag
function filterByTag(gameArray, gameProperty, requirement) {
  let filteredArray = [];

  switch (gameProperty) {
    case "genre":
      filteredArray = gameArray.filter((game) => (game.genre == requirement));
      break;
    case "subject":
      filteredArray = gameArray.filter((game) => (game.subject == requirement));
      break;
    case "topic":
      filteredArray = gameArray.filter((game) => (game.topic == requirement));
      break;
    default:
      return filteredArray;
  }
  return filteredArray;
}

function displayResult() {
  console.log(games);
  const header = document.getElementById("quizQuestion");
  header.innerHTML = "TADA YOUR GAMES RECOMMENDATION!!";

  let list = document.createElement("ul");

  for (let i = 0; i < games.length; i++) {
    let gameLink = document.createElement("a");
    gameLink.setAttribute("href", games[i].url);
    gameLink.setAttribute("target", "_blank")
    gameLink.setAttribute("style", "color: black;")
    gameLink.innerHTML = games[i].name;

    let gameButton = document.createElement("button");
    gameButton.appendChild(gameLink);
    let listItem = document.createElement("li");
    listItem.appendChild(gameButton);
    list.appendChild(listItem);
  }

  //remove the choices buttons
  document.getElementById("quizChoices").innerHTML = "";
  document.getElementById("quizChoices").appendChild(list);
}

async function parseGames() {
  //csv parsing
  await fetch('games.csv')
    .then(response => response.text())
    .then(text => {
      const data = Papa.parse(text, {
        header: true
      });
      console.log(data.data)
      games = data.data;
      // return data.data;
    });
}
async function parseQuestions() {
  console.log("Starting Questions")
  //csv parsing
  await fetch('questions.csv')
    .then(response => response.text())
    .then(text => {
      const data = Papa.parse(text, {
        header: true // turns first line into categories
      });
      console.log(data.data);
      questions = data.data;
    });
}

function loadQuestion() {
  const element = document.getElementById("quizQuestion");
  element.innerHTML = questions[currentQuestion].name;

  const choice1ele = document.getElementById("choice1");
  const choice2ele = document.getElementById("choice2");
  const choice3ele = document.getElementById("choice3");
  choice1ele.innerHTML = questions[currentQuestion].choice1;
  choice2ele.innerHTML = questions[currentQuestion].choice2;
  choice3ele.innerHTML = questions[currentQuestion].choice3;
}

let games = [];
let questions = [];
let currentQuestion = 0;
let secondQuestionAnswer;

window.onload = function() {
  //await for async fetch function to parse the games
  async function asyncParseGames() {
    await parseGames();
  }
  asyncParseGames();

  //await for async fetch function to parse the questions
  async function asyncParseQuestions() {
    await parseQuestions();
    loadQuestion();
  }
  asyncParseQuestions();

  document.getElementById("choice1").onclick = function() { button1Listener(); }
  document.getElementById("choice2").onclick = function() { button2Listener(); }
  document.getElementById("choice3").onclick = function() { button3Listener(); }
}

function button1Listener() {
  switch (currentQuestion) {
    //currentQuestion == 0
    case 0:
      games = filterByTag(games, "genre", "id");
      break;
    case 1:
      games = filterByTag(games, "subject", "nature");
      secondQuestionAnswer = "nature";
      break;
    case 3:
    case 4:
    case 2:
      switch (secondQuestionAnswer) {
        case "nature":
          games = filterByTag(games, "topic", "plants");
          break;
        case "space":
          games = filterByTag(games, "topic", "stars");
          break;
        case "med":
          games = filterByTag(games, "topic", "genetics");
          break;
      }
      break;
  }

  //load next question
  if (currentQuestion == 0 || currentQuestion == 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    displayResult();
  }
}

function button2Listener() {
  switch (currentQuestion) {
    //currentQuestion == 0
    case 0:
      games = filterByTag(games, "genre", "create");
      break;
    case 1:
      games = filterByTag(games, "subject", "space");
      secondQuestionAnswer = "space";
      break;
    case 3:
    case 4:
    case 2:
      switch (secondQuestionAnswer) {
        case "nature":
          games = filterByTag(games, "topic", "animals");
          break;
        case "space":
          games = filterByTag(games, "topic", "planets");
          break;
        case "med":
          games = filterByTag(games, "topic", "cellbio");
          break;
      }
      break;
  }

  //load next question
  if (currentQuestion == 0) {
    currentQuestion++;
    loadQuestion();
  } else if (currentQuestion == 1) {
    currentQuestion = 3;
    loadQuestion();
  } else {
    displayResult();
  }
}

function button3Listener() {
  switch (currentQuestion) {
    //currentQuestion == 0
    case 0:
      games = filterByTag(games, "genre", "project");
      break;
    case 1:
      games = filterByTag(games, "subject", "med");
      secondQuestionAnswer = "med";
      break;
    case 3:
    case 4:
    case 2:
      switch (secondQuestionAnswer) {
        case "nature":
          games = filterByTag(games, "topic", "micro");
          break;
        case "space":
          games = filterByTag(games, "topic", "gravity");
          break;
        case "med":
          games = filterByTag(games, "topic", "health");
          break;
      }
      break;

  }

  //load next question
  if (currentQuestion == 0) {
    currentQuestion++;
    loadQuestion();
  } else if (currentQuestion == 1) {
    currentQuestion = 4;
    loadQuestion();
  } else {
    displayResult();
  }
}






