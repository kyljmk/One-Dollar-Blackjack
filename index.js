let currentDeckId;
let dealerFirst = document.getElementById("dealer-first");
let dealerSecond = document.getElementById("dealer-second");
let playerFirst = document.getElementById("player-first");
let playerSecond = document.getElementById("player-second");

const intialDeal = async () => {
  const res = await fetch(
    `https://www.deckofcardsapi.com/api/deck/${currentDeckId}/draw/?count=4`
  );
  const data = await res.json();
  console.log(data);
  dealerFirst.src = data.cards[0].images.png;
  dealerSecond.src = data.cards[1].images.png;
  playerFirst.src = data.cards[2].images.png;
  playerSecond.src = data.cards[3].images.png;
};

const startGame = async () => {
  const res = await fetch(
    "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
  );
  const data = await res.json();
  currentDeckId = data.deck_id;
  await intialDeal();
};