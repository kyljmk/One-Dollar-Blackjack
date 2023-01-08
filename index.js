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

const intialDeal = async () => {
  const res = await fetch(
    `https://www.deckofcardsapi.com/api/deck/${currentDeckId}/draw/?count=4`
  );
  const data = await res.json();
  console.log(data);
  dealerFirst.src = data.cards[0].images.png;
  dealersHeldCard = data.cards[1];
  playerFirst.src = data.cards[2].images.png;
  playerSecond.src = data.cards[3].images.png;
  dealerScore = cardConverter(data.cards[0].value);
  dealerScoreEl.textContent = dealerScore;
  playerScore =
    cardConverter(data.cards[2].value) + cardConverter(data.cards[3].value);
  playerScoreEl.textContent = playerScore;
};

const startGame = async () => {
  const res = await fetch(
    "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
  );
  const data = await res.json();
  currentDeckId = data.deck_id;
  await intialDeal();
};

let playerCardCount = 2;

const twist = async () => {
  const res = await fetch(
    `https://www.deckofcardsapi.com/api/deck/${currentDeckId}/draw/?count=1`
  );
  const data = await res.json();
  console.table(data.cards[0]);
  const newImage = document.createElement("img");
  newImage.src = data.cards[0].images.png;
  document.getElementById("player-container").appendChild(newImage);
  playerScoreEl.textContent = playerScore + cardConverter(data.cards[0].value);
  balance = 4;
};

const stick = async () => {
  dealerSecond.src = dealersHeldCard.images.png;
  dealerScoreEl.textContent =
    dealerScore + cardConverter(dealersHeldCard.value);
};

const playerLoss = async () => {};

const endHand = async (playerScore, dealerScore) => {};
