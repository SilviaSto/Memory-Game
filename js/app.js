/*** Create a list that holds all of your cards ***/
const deck = document.querySelector('.deck');
let card = deck.querySelectorAll('li.card');
let cardList = [...card];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*** Creat/Restart new game board ***/
function newDeck() {
  cardList = shuffle(cardList);
  for (card of cardList) {
    cardList.forEach(function() {
      deck.appendChild(card);
    });
    countReset();
    card.classList.remove('open', 'show', 'match');
  }
}


/*** Shuffle function from http://stackoverflow.com/a/2450976 ***/
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


/*** Clicks counter ***/
const moves = document.querySelector('.moves');
let counter = 0;

function countMoves() {
  counter++;
  moves.innerHTML = counter;
}

function countReset() {
  moves.innerHTML = '0';
  counter = 0;
}

/*** An empty array for storing open cards ***/
let listOfOpen = [];

function openCards(e) {
  e.target.classList.add('open', 'show');
  listOfOpen.push(e.target);
  if (listOfOpen.length === 2) {
    if (listOfOpen[0].innerHTML !== listOfOpen[1].innerHTML) {
      unmatchedCards();
      /*cardList.push(this);????*/
    }
    if (listOfOpen[0].innerHTML === listOfOpen[1].innerHTML) {
      matchedCards();
      /*matchCollector.push(this);????*/
    }
  }

  if (listOfOpen.length % 2 === 0) { //starts counting of clicked pairs of cards
    countMoves();
  }
}
/*** Matching cards ***/
let matchCollector = []; //collect matching cards, which are needed for the end of the game
let match = deck.querySelectorAll('.match');

function matchedCards() {
  listOfOpen[0].classList.toggle('match');
  listOfOpen[1].classList.toggle('match');
}


function unmatchedCards() {
  listOfOpen[0].classList.remove('open', 'show');
  listOfOpen[1].classList.remove('open', 'show');
}



/*** Stars ***/
let star = document.querySelectorAll('.fa-star');
let starCounter = [...star];

/*** Restart ***/
const restart = document.querySelector('.restart');
restart.addEventListener('click', newDeck);

function Play() {
  for (card of cardList) {
    card.addEventListener('click', openCards);
  }
}

window.onload = newDeck();
Play()






/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */