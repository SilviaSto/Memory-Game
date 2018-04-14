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
    card.classList.remove('open', 'show', 'match');
    closeModal();
    starRateReset();
    countReset();
    resetTimer();
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


/*** Play ***/
function openCards() {
  for (card of cardList) {
    card.addEventListener('click', playGame);
  }
}


function playGame(e) {
  e.target.classList.add('open', 'show');
  listOfOpen.push(this);
  compare();
  starRate();
  countMoves();
  if (counter === 0) {
    time = setInterval(playTime, 1000);
  }
}

/*** Compare pairs of cards ***/
let listOfOpen = []; //temporary collector of open cards
let matchCollector = []; //temporary collector of matching pairs of cards

function compare() {
  if (listOfOpen.length === 2) {
    if (listOfOpen[0].innerHTML !== listOfOpen[1].innerHTML) {
      for (card of cardList) {
        card.removeEventListener('click', playGame);
      }
      setTimeout(mismatchedCards, 400);
      setTimeout(openCards, 550);
    } else if (listOfOpen[0].innerHTML === listOfOpen[1].innerHTML) {
      matchedCards();
    }
  }
}


function matchedCards() {
  listOfOpen[0].classList.remove('open', 'show');
  listOfOpen[0].classList.toggle('match');
  matchCollector.push(listOfOpen[0]); //collect matched pairs
  listOfOpen[1].classList.remove('open', 'show');
  listOfOpen[1].classList.toggle('match');
  matchCollector.push(listOfOpen[1]);
  listOfOpen = []; //match ->empty array
  if (matchCollector.length === 16) {
    stopTimer();
    setTimeout(function() {
      displayMessage();
      matchCollector = []; //empty the array after displaing message
    }, 600);
  }
}


function mismatchedCards() {
  listOfOpen[0].classList.remove('open', 'show');
  listOfOpen[1].classList.remove('open', 'show');
  listOfOpen = []; //no match -> empty array
}



/*** Moves counter ***/
const moves = document.querySelector('.moves');
let counter = 0;

function countMoves() {
  if (listOfOpen.length % 2 === 0) { //starts counting of clicked pairs of cards
    counter++;
    moves.innerHTML = counter;
  }
}

function countReset() {
  moves.innerHTML = '0';
  counter = 0;
}

/*** Timer ***/
let timer = document.querySelector('.timer');
let minutes = 0;
let seconds = 0;
let time;


function playTime() {
  seconds++;
  if ((seconds < 10) && (minutes < 10)) {
    timer.innerHTML = `0${minutes} : 0${seconds}`;
  } else if ((seconds >= 10) && (minutes < 10)) {
    timer.innerHTML = `0${minutes} : ${seconds}`;
  } else {
    timer.innerHTML = `${minutes} : ${seconds}`;
  }
  if (seconds > 59) {
    minutes++;
    seconds = 0;
  }
  if (minutes > 29) {
    stopTimer();
  }
}

function stopTimer() {
  clearInterval(time);
}

function resetTimer() {
  stopTimer();
  timer.innerHTML = '00:00';
  seconds = 0;
  minutes = 0;
}


/*** Stars ***/
let stars = document.querySelectorAll('.stars li');
let starCounter = [...stars];

function starRate() {
  if (counter === 15) {
    starCounter[0].classList.add('hide');
  } else if (counter === 24) {
    starCounter[1].classList.add('hide');
  } else if (counter >= 40) {
    starCounter[2].classList.add('hide');
  }
}

function starRateReset() {
  for (stars of starCounter) {
    stars.classList.remove('hide');
  }
}

/*** Modal Box ***/
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('.close');
let starWon = document.querySelector('.star-m span');
let t = document.querySelector('.time-m span');
let finalStars = document.querySelector('.stars');

function displayMessage() {
  modal.style.display = 'block';
  addStarsAndTime();
}

function closeModal() {
  modal.style.display = 'none';
}

function addStarsAndTime() {
  starWon.innerHTML = finalStars.innerHTML;
  t.innerHTML = timer.innerHTML;
}


/*** Play Again button ***/
const btnRestart = document.querySelector('.button');

function playAgain() {
  btnRestart.addEventListener('click', newDeck);
}


/*** Restart ***/
const restart = document.querySelector('.restart');
restart.addEventListener('click', newDeck);


window.onload = newDeck();
openCards();
playAgain();
closeBtn.addEventListener('click', closeModal);


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