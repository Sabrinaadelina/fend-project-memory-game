/*
 * Create a list that holds your cards
 */

const allCards = ["fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-diamond", "fa fa-diamond",
				  "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt","fa fa-cube", "fa fa-cube",
				  "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const cardsContainer = document.querySelector(".deck");
let shuffleAllCards = shuffle(allCards);

let openedCards = [];
let matchedCards = [];


function initGame() {


	for (let i = 0; i < allCards.length; i++) {
		const card = document.createElement("li");
		card.classList.add("card");
		card.innerHTML = `<i class="${allCards[i]}"> </i> `;
		shuffleAllCards.forEach(function (addCards) {
			cardsContainer.appendChild(card);
		});


		// call function shuffle

		click(card);


	}


}

//set up the event listener for a card. If a card is clicked:
function click(card) {

    
	card.addEventListener("click", function () {
		if (isFirstClick) {
			isFirstClick = true;
		}

		const currentCard = this;
		const previousCard = openedCards[0];
		

		if (openedCards.length === 1) {


			card.classList.add("open", "show", "disabled");
			openedCards.push(this);

			compare(currentCard, previousCard);

		} else {

			currentCard.classList.add("open", "show", "disabled");
			openedCards.push(this);

		}

	
	}, 400);
	
	

}

//if the cards do match, lock the cards in the open position
function compare(currentCard, previousCard) {

	if (currentCard.innerHTML === previousCard.innerHTML) {

		currentCard.classList.add("match");
		previousCard.classList.add("match");

		matchedCards.push(currentCard, previousCard);

		openedCards = [];

		//endGame();
		displayMessage();

	} else {
		//remove the cards from the list and hide the card's symbol
		setTimeout(function () {
			currentCard.classList.remove("open", "show", "disabled");

			previousCard.classList.remove("open", "show", "disabled");
			openedCards = [];
		}, 600);


	}
	moveCounter();
	
}


const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
//increment the move counter and display it on the page
function moveCounter() {
	moves++;
	movesContainer.innerHTML = moves;
	rating();

}
//star rating
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;

function rating() {

	if (moves < 12) {
		starsContainer.innerHTML = star + star + star;
	} else if (moves < 15) {
		starsContainer.innerHTML = star + star;
	} else {
		starsContainer.innerHTML = star;
	}
}
const timerContainer = document.querySelector(".timer");
let liveTimer,
	totalSeconds = 0;
timerContainer.innerHTML = totalSeconds + "s";

function startTimer() {
	liveTimer = setInterval(function () {
		totalSeconds++;
		//display time
		timerContainer.innerHTML = totalSeconds + "s";
	}, 1000);
}

function stopTimer() {
	clearInterval(liveTimer);
}

let isFirstClick = false;
//restart button
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function () {

	cardsContainer.innerHTML = "";

	initGame();

	matchedCards = [];
	moves = 0;
	movesContainer.innerHTML = moves;
	totalSeconds = 0;
	timerContainer = 0;


});

function reset() {
	matchedCards = [];
	moves = 0;
	movesContainer.innerHTML = moves;
	starsContainer.innerHTML = star + star + star;
	totalSeconds = 0;
	timerContainer.innerHTML = 0;
	restartButton = true;
	isFirstClick = true;

}
const modal = document.querySelector('.modal');

function displayMessage() {
	if (matchedCards.length == allCards.length) {
		clearInterval(liveTimer);
		modal.innerHTML = ` <h2>Congrats! <br/> You matched all the cards with 
            ${moves} moves, <br/>
            in ${totalSeconds} seconds <br/> and with the following number of stars: 
            ${starsContainer.innerHTML}`
		modal.classList.add('modal');
		modal.style.display = "block";

		stopTimer();
		clearInterval();

	}
}
//restart game by clicking on restart icon
const replay = document.querySelector('.restart');
replay.addEventListener('click', function () {
	window.location.reload();
});

//reload function for clicking on Yes button within modal
function reload() {
	window.location.reload();
}
// Shuffle function from http://stackoverflow.com/a/2450976
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

startTimer();
initGame();


/*
 * 
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
