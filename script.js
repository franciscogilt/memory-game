const colors = [
  "#0099e5",
  "#ff4c4c",
  "#00a98f",
  "#cf8d2e",
  "#e4e932",
  "#371777",
  "#6a737b",
  "#00112c",
];

document.querySelector(".btn").addEventListener("click", startGame);
const cards = document.querySelectorAll(".card");
const winMsg = document.querySelector("#win");
const numberOfCards = cards.length;
const numberOfColors = colors.length;
var clickedCards = [];

function startGame() {
  winMsg.classList.add("fade");
  winMsg.classList.remove("win");

  cards.forEach(card => {
    card.classList.add("hide");
    card.classList.remove("freeze");
  });

  for (let i = 0; i < numberOfCards; i++) {
    assignColorsToCards(cards, i);
    assignRandomOrderToCards(cards, i);
    cards[i].addEventListener("click", handleCardSelected);
  }
}

function assignColorsToCards(cards, i) {
  if (i >= numberOfColors) {
    cards[i].style.backgroundColor = colors[i - numberOfColors];
  } else {
    cards[i].style.backgroundColor = colors[i];
  }
}

function assignRandomOrderToCards(cards, i) {
  cards[i].style.order = Math.floor(Math.random() * numberOfCards);
}

function handleCardSelected() {
  this.classList.remove("hide");
  clickedCards.push(this);
  if (clickedCards.length == 2) {
    const card1 = clickedCards[0];
    const card2 = clickedCards[1];
    if (card1.style.backgroundColor == card2.style.backgroundColor) {
      card1.classList.add("freeze");
      card2.classList.add("freeze");
      card1.removeEventListener("click", handleCardSelected);
      card2.removeEventListener("click", handleCardSelected);
      clickedCards = [];
    } else {
      setTimeout(() => {
        card1.classList.add("hide");
        card2.classList.add("hide");
        clickedCards = [];
      }, 500);
    }
  }
  if (document.querySelectorAll(".freeze").length == numberOfCards) {
    finishGame();
  }
}

function finishGame() {
  winMsg.classList.add("win");
  winMsg.classList.remove("fade");
}

startGame();
