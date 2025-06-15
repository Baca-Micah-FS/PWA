// Imports your SCSS stylesheet
import "@/styles/index.scss";

import cardImg from "./img/card-flip-card-image.png";

enum CardState {
  FLIPPED_UP,
  FLIPPED_DOWN,
  MATCHED,
}

type Card = {
  element?: HTMLElement;
  value: number;
  state: CardState;
  //   isMatched: boolean;
};

let cards: Card[] = [];

cards.push();
let attemptsLeft: number = 3;

let flippedCards: Card[] = [];
const statusText = document.getElementById("status");

const gameBoard = document.getElementById("game-board")!;

function setupGameBoard() {
  gameBoard.innerHTML = "";
  attemptStatus();
  initializeCardArray();

  cards.forEach((card, index) => {
    card.element?.addEventListener("click", () => {
      flipCardFaceUp(index);
    });
  });
}

function flipCardFaceUp(index: number) {
  const card = cards[index];
  if (attemptsLeft <= 0) {
    return;
  }

  if (card.state !== CardState.FLIPPED_DOWN || flippedCards.length >= 2) {
    return;
  }

  card.state = CardState.FLIPPED_UP;

  const image = card.element?.querySelector("img");
  console.log(index);
  if (image) {
    card.element?.removeChild(image);
  }

  const cardValue = document.createElement("p");
  cardValue.innerHTML = card.value.toString();
  card.element?.appendChild(cardValue);

  //   const cardImageFlipped = document.createElement("img");
  //   cardImageFlipped.src = "";
  //   cardImageFlipped.height = 200;
  //   card.element?.appendChild(cardImageFlipped);

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(matchingPair, 500);
  }
}

function matchingPair() {
  const [card1, card2] = flippedCards;

  if (card1.value === card2.value) {
    card1.state = CardState.MATCHED;
    card2.state = CardState.MATCHED;
  } else {
    attemptsLeft--;

    [card1, card2].forEach((card) => {
      card.state = CardState.FLIPPED_DOWN;
      const numberEl = card.element?.querySelector("p");
      if (numberEl) card.element?.removeChild(numberEl);

      const origImg = document.createElement("img");
      origImg.src = cardImg;
      origImg.height = 200;
      card.element?.appendChild(origImg);
    });
  }

  // resest array
  flippedCards = [];
  attemptStatus();

  if (checkWin()) {
    const youWon = document.getElementById("win-lose")!;
    youWon.innerHTML = "You Won!";
  }

  if (checkLose()) {
    const youLost = document.getElementById("win-lose")!;
    youLost.innerHTML = "You lost";
  }
}

function checkWin() {
  let playerWon = true;
  cards.forEach((card) => {
    if (card.state !== CardState.MATCHED) {
      playerWon = false;
    }
  });

  if (attemptsLeft > 0 && playerWon === true) {
    return true;
  } else {
    return false;
  }
}

function checkLose() {
  if (attemptsLeft === 0) {
    return true;
  } else {
    return false;
  }
}

function attemptStatus() {
  const status = document.getElementById("status");
  status!.innerHTML = `Attempts left: ${attemptsLeft}`;
}

function startOver() {
  cards = [];
  attemptsLeft = 3;
  flippedCards = [];
  const winStatus = document.getElementById("win-lose")!;
  winStatus.innerHTML = "";

  setupGameBoard();
}

document.getElementById("restart")?.addEventListener("click", startOver);

function initializeCardArray() {
  const uniqueNumbers: Set<number> = new Set();

  while (uniqueNumbers.size < 3) {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    uniqueNumbers.add(randomNumber);
  }

  uniqueNumbers.forEach((number) => {
    const card: Card = { value: number, state: CardState.FLIPPED_DOWN };
    cards.push({ value: number, state: CardState.FLIPPED_DOWN });
    cards.push({ value: number, state: CardState.FLIPPED_DOWN });
  });

  shuffle(cards);

  cards.forEach((card) => {
    card.element = document.createElement("div");
    card.element.classList.add("game-card");

    // const cardValue = document.createElement("p");
    // cardValue.innerHTML = card.value.toString();
    // card.element?.appendChild(cardValue);

    const cardImage = document.createElement("img");
    cardImage.src = cardImg;
    cardImage.height = 200;

    // Append elements
    card.element.appendChild(cardImage);

    gameBoard.appendChild(card.element);
  });
}

// Fisher Yates shuffle alogrithinm for shulffing cards

function shuffle(array: Card[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

setupGameBoard();
