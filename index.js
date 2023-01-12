let currentDeckId;
let dealersHeldCard;
let dealerFirst = document.getElementById("dealer-first");
let dealerSecond = document.getElementById("dealer-second");
let playerFirst = document.getElementById("player-first");
let playerSecond = document.getElementById("player-second");
let dealerScoreEl = document.getElementById("dealer-score");
let playerScoreEl = document.getElementById("player-score");
let dealerScore;
let playerScore;
let balance = 1;
let balanceEl = document.getElementById("balance");
balanceEl.textContent = balance;
let testTitle = document.getElementById("title");

const cardConverter = (card) => {
  if (card === "QUEEN" || card === "JACK" || card === "KING") {
    return 10;
  }
  if (card === "ACE") {
    return 11;
  } else {
    return Number(card);
  }
};

const reset = () => {
  playerScore = 0;
  dealerScore = 0;
  document.getElementById("player-container").removeChild("newImage");
  document.getElementById("dealer-container").removeChild("newImage");
  window.location.reload();
};

const startGame = async () => {
  const res = await fetch(
    "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
  );
  const data = await res.json();
  currentDeckId = data.deck_id;
  await intialDeal();
};

const intialDeal = async () => {
  const res = await fetch(
    `https://www.deckofcardsapi.com/api/deck/${currentDeckId}/draw/?count=4`
  );
  const data = await res.json();
  dealerFirst.src = data.cards[0].images.png;
  dealersHeldCard = data.cards[1];
  playerFirst.src = data.cards[2].images.png;
  playerSecond.src = data.cards[3].images.png;
  dealerScore = cardConverter(data.cards[0].value);
  dealerScoreEl.textContent = dealerScore;
  playerScore =
    cardConverter(data.cards[2].value) + cardConverter(data.cards[3].value);
  playerScoreEl.textContent = playerScore;
  playerScore == 21 && stick();
};

let playerCardCount = 2;

const twist = async () => {
  const res = await fetch(
    `https://www.deckofcardsapi.com/api/deck/${currentDeckId}/draw/?count=1`
  );
  const data = await res.json();
  const newImage = document.createElement("img");
  newImage.src = data.cards[0].images.png;
  document.getElementById("player-container").appendChild(newImage);
  playerScore += cardConverter(data.cards[0].value);
  playerScoreEl.textContent = playerScore;
  playerScore > 21 && playerLoss();
  playerScore == 21 && stick();
};

const scoreCheck = async () => {
  if (dealerScore < playerScore || dealerScore > 21) {
    await playerWin();
  } else {
    await playerLoss();
  }
};

const stick = () => {
  setTimeout(async () => {
    dealerSecond.src = dealersHeldCard.images.png;
    dealerScore += cardConverter(dealersHeldCard.value);
    dealerScoreEl.textContent = dealerScore;
    scoreCheck();
    if (dealerScore < 16) {
      dealerDraws();
    }
  }, 500);
};

const dealerDraws = () => {
  setTimeout(async () => {
    const res = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${currentDeckId}/draw/?count=1`
    );
    const data = await res.json();
    const newImage = document.createElement("img");
    newImage.src = data.cards[0].images.png;
    document.getElementById("dealer-container").appendChild(newImage);
    dealerScore += cardConverter(data.cards[0].value);
    dealerScoreEl.textContent = dealerScore;
    if (dealerScore < 16) {
      dealerDraws();
    }
    scoreCheck();
  }, 500);
};

const playerLoss = async () => {
  setTimeout(() => {
    testTitle.textContent = "Dealer wins";
    balance = 0;
    balanceEl.textContent = balance;
    reset();
  }, 1000);
};
const playerWin = async () => {
  setTimeout(() => {
    testTitle.textContent = "Player wins";
    balance *= 2;
    balanceEl.textContent = balance;
    reset();
  }, 1000);
};

const cardcheck = () => {
  console.log();
};
