/*
 * Create a list that holds all of your cards
 */
var deckList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
var deckList = deckList.concat(deckList);

//var click = event.target.className;
//console.log(click);
var clickedCards = [];
var guessedCards = [];
var createNewDeck = false;
var moves = 1;
var maximumMoves = 30;
var openedCardId = [];
memoryGame();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function memoryGame() {
if (createNewDeck == false) {
	createDeck();
	document.getElementById("deck").addEventListener("click", openCard);
	document.getElementById("restart").addEventListener("click", restartGame);

	//document.getElementById("restart").addEventListener("click", restartGame);
	} 
}

function createDeck() {
document.getElementById("deck").innerHTML = "";

shuffle(deckList);
	for (i=0; i<deckList.length; i++) {
		var deckInternal = document.createDocumentFragment();
		var newCard = document.createElement("li");
		newCard.className = "card";
		newCard.id = i;
		var newCardInternal = document.createElement("i");

			var testText = document.createTextNode(deckList[i]); //for test purposes to identity card, delete when finished
			newCardInternal.appendChild(testText); //for test purposes to identity card, delete when finished

		newCardInternal.className = "fa ";
		newCardInternal.className += deckList[i];
		newCard.appendChild(newCardInternal);
		deckInternal.appendChild(newCard);
		document.getElementById("deck").appendChild(deckInternal);
}
	}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*checks how many cards are open*/

function openCard() {

/* 	store the unique ID of opened card in array, by appending to openedCardId[] 
	store the class name of opened card in clickedCards[]
	increment move counter
*/

if (event.target.className.includes("card")) {
	openedCardId.push(event.target.id);
	clickedCards.push(document.getElementById(openedCardId[openedCardId.length-1]).firstChild.className);
	incrementCounter();
}
if (event.target.className.includes("fa")) {
	openedCardId.push(event.target.parentNode.id);
	clickedCards.push(document.getElementById(openedCardId[openedCardId.length-1]).firstChild.className);
	incrementCounter();
}
console.log("openedCardId = " + openedCardId); //for test purposes

// if openedCardId is bigger than 2 elements, clear the array and exit function
if (openedCardId.length > 2) {
	openedCardId = [];
	console.log("openedCardId = " + openedCardId); //for test purposes
	console.log("openedCardId more than 2, cleaning openedCardId")
	console.log("openedCardId = " + openedCardId); //for test purposes
	return;
	}

/* increment move counter */

console.log("openedCardId is " + openedCardId);
console.log("openedCardId.length is " + openedCardId.length);

/* changes DOM of card with clicked ID to show it in the browser*/
if ((openedCardId.length > 0) && (openedCardId.length <= 2)) {
document.getElementById(openedCardId[openedCardId.length-1]).className = "card open show";
console.log("clickedCards is " + clickedCards);
}
/* checks if two cards are open and match to launch cardsMatch*/
if (openedCardId.length == 2) {
	if ((clickedCards[0] != undefined) && (clickedCards[0] == clickedCards[1])) {
				cardsMatch(); 
}

/* checks if two cards are open,but dont match and launches cardsMatch() and incrementCounter()*/
	if ((clickedCards[1] != undefined) && (clickedCards[0] !== clickedCards[1])) {
				setTimeout(cardsNotMatch, 1000);
}
/* if the number of cards in the deck and the number of guessed cards run allCardsMathc()*/
	if (guessedCards.length == deckList.length) {
				allCardsMatch();
}
}
}

function cardsMatch() {
	console.log("match!");
//store the ID's of matched cards in guessedCards[]
	guessedCards.push(openedCardId[0]);
	guessedCards.push(openedCardId[1]);
	document.getElementById(openedCardId[0]).className = "card match";
	document.getElementById(openedCardId[1]).className = "card match";
//document.getElementsByClassName(guessedCards[guessedCards.length]).parentNode.className =
	console.log("clickedCards status " + clickedCards);
	console.log("guessedCards status " + guessedCards);
	console.log("moves status " + moves);
	console.log("number of guessedCard " + guessedCards.length);
// clean variables id and class of open cards
	openedCardId = [];
	clickedCards = [];
		}
	//var matchedCards = document.getElementsByClassName(clickedCards[0]);
	
	//matchedCards.parentNode.className = "card match";

function cardsNotMatch() {
console.log("no match!");
console.log("clickedCards status " + clickedCards);
console.log("guessedCards status " + guessedCards);
console.log("moves status " + moves);
// close card by changing card class name back to "card"
document.getElementsByClassName(clickedCards[0])[0].parentNode.className = "card";
document.getElementsByClassName(clickedCards[1])[0].parentNode.className = "card";
// clean variables id and class of open cards
openedCardId = [];
clickedCards = [];
};

function allCardsMatch() {
	console.log("all cards match!")
};
/* increases move variable by one for each move and changes the counter in the DOM, looks for number of moves not to exceed maximumMoves*/
/* contains bugs, moves sometime increments by two*/
function incrementCounter() {
	moves++;
	document.getElementById("moves").innerHTML = moves;
	console.log("Current move " + moves);

if (moves == maximumMoves) 
{
	console.log("too many moves, you lost!");
	restartGame();
}
};
	

function restartGame() {
	moves = 1;
	document.getElementById("moves").innerHTML = moves;
	createDeck();
};
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
