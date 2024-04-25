let randomNumber = parseInt(Math.random() * 100 + 30);
const $submitButton = document.querySelector("#submitButton");
const $userInput = document.querySelector("#guessField");
const $guessSlot = document.querySelector(".guesses");
const $remainingCount = document.querySelector(".lastResult");
const $startOverGame = document.querySelector(".resultParas");
const $guessingResult = document.querySelector(".guessingResult");
const $newGameGuide = document.createElement("p");
const $circleArea = document.querySelector(".circleArea");
const $answerCircleArea = document.querySelector(".answerCircleArea");
const $guessCircleArea = document.querySelector(".guessCircleArea");

let numGuesses = 1;
let playGame = true;

if (playGame) {
  makeAnswerCircle(randomNumber, "answer");
  $guessingResult.innerHTML = `<h1>숫자를 입력해 주세요.</h1>`;
  $submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt($userInput.value);
    checkGuess(guess);
  });
}

function checkGuess(guess) {
  if (validate(guess)) {
    if (numGuesses === 10 && guess !== randomNumber) {
      displayGuesses(guess);
      displayMessage(`패배했습니다! 정답은 ${randomNumber} 였습니다.`);
      endGame();
    } else {
      displayGuesses(guess);
      clearCircle();
      compareGuess(guess);
    }
  }
}

function validate(guess) {
  if (isNaN(guess)) {
    alert("숫자를 입력해 주세요");
    return false;
  } else if (guess < 20) {
    alert("20 이상의 정수를 입력해 주세요");
    return false;
  } else if (guess > 120) {
    alert("120 이하의 정수를 입력해 주세요");
    return false;
  }

  return true;
}

function clearCircle() {
  if ($guessCircleArea.childElementCount >= 1) {
    $guessCircleArea.removeChild($guessCircleArea.firstChild);
  }
}

function compareGuess(guess) {
  if (guess === randomNumber) {
    makeGuessCircle(guess, "guess");
    displayMessage(`정답입니다!`);
    endGame();
  } else if (guess < randomNumber) {
    makeGuessCircle(guess, "guess");
    displayMessage(`너무 낮아요! 다시 도전해 주세요!`);
  } else if (guess > randomNumber) {
    makeGuessCircle(guess, "guess");
    displayMessage(`너무 높아요! 다시 도전해 주세요!`);
  }
}

function displayGuesses(guess) {
  $userInput.value = "";
  $guessSlot.innerHTML += `${guess}  `;
  numGuesses++;
  $remainingCount.innerHTML = `${11 - numGuesses}  `;
}

function displayMessage(message) {
  $guessingResult.innerHTML = `<h1>${message}</h1>`;
}

function endGame() {
  $userInput.value = "";
  $userInput.setAttribute("disabled", "");
  $submitButton.setAttribute("disabled", "");
  $newGameGuide.classList.add("button");
  $startOverGame.appendChild($newGameGuide);
  playGame = false;
  newGame();
}

function makeAnswerCircle(guess) {
  const CIRCLE_NAME = "answer";
  showCircle(guess, CIRCLE_NAME, $answerCircleArea).then((div) => {
    div.id = "answerCircle";
    div.append(CIRCLE_NAME);
  });
}

function makeGuessCircle(guess) {
  const CIRCLE_NAME = "guess";
  showCircle(guess, CIRCLE_NAME, $guessCircleArea).then((div) => {
    div.id = "guessCircle";
    div.append(CIRCLE_NAME);
  });
}

function showCircle(size, circleName, area) {
  const cx = size + 20;
  const cy = size + 20;
  const radius = size + 20;

  let div = document.createElement("div");
  area.appendChild(div);

  div.id = `${circleName}`;
  div.className = "circle";
  div.style.width = 0;
  div.style.height = 0;
  div.style.left = cx + "px";
  div.style.top = cy + "px";

  return new Promise((resolve) => {
    setTimeout(() => {
      div.style.width = radius * 2 + "px";
      div.style.height = radius * 2 + "px";

      div.addEventListener("transitionend", function handler() {
        div.removeEventListener("transitionend", handler);
        resolve(div);
      });
    }, 10);
  });
}