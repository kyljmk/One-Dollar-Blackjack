let currentDeckId;
let dealersHeldCard;
let dealerScoreEl = document.getElementById("dealer-score");
let playerScoreEl = document.getElementById("player-score");
let twistButton = document.getElementById("twist-button");
let stickButton = document.getElementById("stick-button");
let playerDiv = document.getElementById("player");
let dealerDiv = document.getElementById("dealer");
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

const startGame = async () => {
  const res = await fetch(
    "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
  );
  const data = await res.json();
  currentDeckId = data.deck_id;
};

const deal = async () => {
  if (!currentDeckId) {
    await startGame();
  }
  let playerElement = document.getElementById("player-container");
  while (playerElement.firstChild) {
    playerElement.removeChild(playerElement.firstChild);
  }
  let dealerElement = document.getElementById("dealer-container");
  while (dealerElement.firstChild) {
    dealerElement.removeChild(dealerElement.firstChild);
  }
  playerDiv.style.color = "white";
  dealerDiv.style.color = "white";
  twistButton.disabled = false;
  stickButton.disabled = false;
  const res = await fetch(
    `https://www.deckofcardsapi.com/api/deck/${currentDeckId}/draw/?count=4`
  );
  const data = await res.json();
  console.log(data);
  const dealerFirst = document.createElement("img");
  dealerFirst.src = data.cards[0].images.png;
  document.getElementById("dealer-container").appendChild(dealerFirst);
  dealersHeldCard = data.cards[1];
  const playerFirst = document.createElement("img");
  playerFirst.src = data.cards[2].images.png;
  document.getElementById("player-container").appendChild(playerFirst);
  const playerSecond = document.createElement("img");
  playerSecond.src = data.cards[3].images.png;
  document.getElementById("player-container").appendChild(playerSecond);
  dealerScore = cardConverter(data.cards[0].value);
  dealerScoreEl.textContent = dealerScore;
  playerScore =
    cardConverter(data.cards[2].value) + cardConverter(data.cards[3].value);
  playerScoreEl.textContent = playerScore;
  playerScore == 21 && stick();
};

let playerCardCount = 0;

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

const scoreCheck = async (dealer, player) => {
  if (dealer > 21 || player > dealer) {
    await playerWin();
  } else {
    await playerLoss();
  }
};

const stick = () => {
  setTimeout(async () => {
    const dealerHeld = document.createElement("img");
    dealerHeld.src = dealersHeldCard.images.png;
    document.getElementById("dealer-container").appendChild(dealerHeld);
    dealerScore += cardConverter(dealersHeldCard.value);
    dealerScoreEl.textContent = dealerScore;
    if (dealerScore < 17) {
      dealerDraws();
    } else {
      await scoreCheck(dealerScore, playerScore);
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
    if (dealerScore < 17) {
      dealerDraws();
    } else {
      await scoreCheck(dealerScore, playerScore);
    }
  }, 500);
};

const playerLoss = async () => {
  setTimeout(() => {
    balance = 1;
    balanceEl.textContent = balance;
    twistButton.disabled = true;
    stickButton.disabled = true;
    dealerDiv.style.color = "goldenrod";
  }, 1500);
};
const playerWin = async () => {
  setTimeout(() => {
    balance = balance * 2;
    balanceEl.textContent = balance;
    twistButton.disabled = true;
    stickButton.disabled = true;
    playerDiv.style.color = "goldenrod";
  }, 1500);
};

const cardcheck = () => {
  console.log();
};
