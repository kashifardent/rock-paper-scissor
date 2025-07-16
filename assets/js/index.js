// Functionality of the page should appear here

const computerHand = document.querySelector(".computer .hand");
const userHand = document.querySelector(".user .hand");
const choicesCta = document.querySelectorAll(".choices button");
const computerScoreContainer = document.querySelector(".computer-score .score");
const userScoreContainer = document.querySelector(".user-score .score");
const chancesContainer = document.querySelector(".chances-text");
const resetCta = document.querySelector('.reset')
const choices = ["rock", "paper", "scissors"];

let computerScore = 0;
let userScore = 0;
const totalChances = 5
let chances = totalChances
let shuffling = false

initialRender()

resetCta.addEventListener("click", handleReset)

choicesCta.forEach((cta) => {
  cta.addEventListener("click", handleSelectChoice);
});

function handleReset() {
  computerScore = 0
  userScore = 0
  chances = totalChances
  chancesContainer.className = 'chances-text'
  initialRender()
}

function handleSelectChoice(e) {
  if(chances <= 0 || shuffling) return

  shuffling = true
  const clearShuffleUserInterval = setInterval(() => {
    shuffleHand(userHand);
  }, 100);

  const clearShuffleComputerInterval = setInterval(() => {
    shuffleHand(computerHand);
  }, 100);

  setTimeout(() => {
    clearInterval(clearShuffleUserInterval);
    clearInterval(clearShuffleComputerInterval);
    shuffleHand(userHand, e.target.className);
    const computerValue = choices.find((choice) =>
      computerHand.className.includes(choice)
    );
    const userValue = choices.find((choice) =>
      userHand.className.includes(choice)
    );
    const result = checkResult(userValue, computerValue);
    if (result === 1) {
      userScore++;
      chances--
    } else if (result === 2) {
      computerScore++;
      chances--
    }
    if (computerScore >= Math.ceil(totalChances / 2)) {
      chancesContainer.innerHTML = 'you lose'
      chancesContainer.classList.add('lose', 'result')
      chances = 0
    } else if (userScore >= Math.ceil(totalChances / 2)) {
      chancesContainer.innerHTML = 'you win'
      chancesContainer.classList.add('win', 'result')
      chances = 0
    } else {
      chancesContainer.innerHTML = `${chances} chances left`
    }
    shuffling = false
    renderScore()
  }, 3000);
}

function checkResult(userValue, computerValue) {
  if (userValue === "rock") {
    if (computerValue === "scissors") {
      return 1;
    } else if (computerValue === "paper") {
      return 2;
    } else {
      return null;
    }
  } else if (userValue === "scissors") {
    if (computerValue === "paper") {
      return 1;
    } else if (computerValue === "rock") {
      return 2;
    } else {
      return null;
    }
  } else if (userValue === "paper") {
    if (computerValue === "rock") {
      return 1;
    } else if (computerValue === "scissors") {
      return 2;
    } else {
      return null;
    }
  }
}

function initialRender() {
  chancesContainer.innerHTML = `${chances} chances left`
  renderScore()
}

function renderScore() {
  computerScoreContainer.innerHTML = computerScore;
  userScoreContainer.innerHTML = userScore;
}

function shuffleHand(player, value) {
  player.setAttribute("class", "");

  if (value) {
    const selectedId = choices.findIndex((choice) => value.includes(choice));
    console.log(selectedId);
    player.classList.add(`${choices[selectedId]}-hand`, "hand");
  } else {
    const randomNumber = Math.ceil(Math.random() * 3);
    player.classList.add(`${choices[randomNumber - 1]}-hand`, "hand");
  }
}
