/*
 * Create a list that holds all of your cards
 */
var deckList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
var deckList = deckList.concat(deckList);

//var click = event.target.className;
//console.log(click);
var openedCardClass = [];
var guessedCards = [];
var createNewDeck = false;
var moves = 1;
var maximumMoves = 2;
var openedCardId = [];
var currentCardId;
var gamesWon = 0;
var currentGameWon = 0;
var endGameMsg;
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

			//var testText = document.createTextNode(deckList[i]); //for test purposes to identity card, delete when finished
			//newCardInternal.appendChild(testText); //for test purposes to identity card, delete when finished

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
console.log("At openCard() launch openedCardId is " + openedCardId); //for debugging
console.log("At openCard() launch guessedCards is " + guessedCards); //for debugging
console.log("At openCard() launch openedCardClass is " + openedCardClass); //for debugging
console.log("At openCard() launch currentCardId is " + currentCardId); //for debugging

//assign currentCardId the value of card currently being opened only in case an element containing class or fa were clicked
if (event.target.className.includes("card")) {
	currentCardId = event.target.id;
} else if (event.target.className.includes("fa")) {
	currentCardId = event.target.parentNode.id;
} else {return;}

//checks that this card isn't already open or already guessed, 
//if true appends it to list of open cards, if false clears the current card and exits function
if (openedCardId.includes(currentCardId) || guessedCards.includes(currentCardId)) {
	currentCardId = null;
	return;}
else {
openedCardId.push(currentCardId);
}

console.log("After openCard() initial check openedCardId is " + openedCardId); //for debugging
console.log("After openCard() initial check guessedCards is " + guessedCards); //for debugging
console.log("After openCard() initial check openedCardClass is " + openedCardClass); //for debugging
console.log("After openCard() initial check currentCardId is " + currentCardId); //for debugging

//if 1 cards open, open the card, incrementCounter(), clear the currentCardId and exit
if (openedCardId.length == 1) {

	document.getElementById(currentCardId).className = "card open show";
	incrementCounter();
	currentCardId = null;
	return;

} else if (openedCardId.length == 2) {
	document.getElementById(currentCardId).className = "card open show";

//if 2 cards open, store the classes of the subelementsmof both cards, incrementCounter() and compare them to run cardsMatch() or cardsNotMatch() 
	openedCardClass.push(document.getElementById(openedCardId[0]).firstChild.className);
	openedCardClass.push(document.getElementById(openedCardId[1]).firstChild.className);
	incrementCounter();
console.log("openCard() updating classes openedCardClass is " + openedCardClass); //for debugging

		if (openedCardClass[1] == openedCardClass[0]) {
			console.log("match!")
			setTimeout(cardsMatch, 1000);
				} else if (openedCardClass[1] != openedCardClass[0]) {
				console.log("not match!");
				setTimeout(cardsNotMatch, 1000);

} else {
	console.log("Error! Less than 1 card of more than 2 cards open");} //for debugging
}
}

function cardsMatch() {
console.log("At cardsMatch() start openedCardId is " + openedCardId); //for debugging
console.log("At cardsMatch() start guessedCards is " + guessedCards); //for debugging
console.log("At cardsMatch() start openedCardClass is " + openedCardClass); //for debugging
console.log("At cardsMatch() start currentCardId is " + currentCardId); //for debugging
	//append the ID's of matched cards in guessedCards[]
	guessedCards.push(openedCardId[0]);
	guessedCards.push(openedCardId[1]);
	document.getElementById(openedCardId[0]).className = "card match";
	document.getElementById(openedCardId[1]).className = "card match";
// clean the list of opened cards and current opened card
	openedCardId = [];
	openedCardClass = [];
	currentCardId = null;
	if (guessedCards.length == deckList.length) {
			allCardsMatch();
}

console.log("At cardsMatch() end openedCardId is " + openedCardId); //for debugging
console.log("At cardsMatch() end guessedCards is " + guessedCards); //for debugging
console.log("At cardsMatch() end openedCardClass is " + openedCardClass); //for debugging
console.log("At cardsMatch() end currentCardId is " + currentCardId); //for debugging

}
	
function cardsNotMatch() {
		console.log("At cardsNotMatch() start openedCardId is " + openedCardId); //for debugging
console.log("At cardsNotMatch() start guessedCards is " + guessedCards); //for debugging
console.log("At cardsNotMatch() start openedCardClass is " + openedCardClass); //for debugging //for debugging
console.log("At cardsNotMatch() start currentCardId is " + currentCardId); //for debugging
// close card by changing card class name back to "card"
document.getElementById(openedCardId[0]).className = "card";
document.getElementById(openedCardId[1]).className = "card";
// clean the list of opened cards and current opened card
openedCardId = [];
openedCardClass = [];
currentCardId = null;
console.log("At cardsNotMatch() end openedCardId is " + openedCardId); //for debugging
console.log("At cardsNotMatch() end guessedCards is " + guessedCards); //for debugging
console.log("At cardsNotMatch() end openedCardClass is " + openedCardClass); //for debugging
console.log("At cardsNotMatch() end currentCardId is " + currentCardId); //for debugging
};

function allCardsMatch() {
	console.log("all cards match!") //for debugging
// clean variables id and class of open cards and list of guessed cards
endGameModal("youWon");
guessedCards = [];
openedCardId = [];
openedCardClass = [];
currentCardId = null;
};
/* increases move variable by one for each move and changes the counter in the DOM, looks for number of moves not to exceed maximumMoves*/
/* contains bugs, moves sometime increments by two*/
function incrementCounter() {
	moves++;
	document.getElementById("moves").innerHTML = moves;
	console.log("Current move " + moves);

if (moves == maximumMoves) 
{
	console.log("too many moves, you lost!"); //for debugging
	endGameModal("youLost");
	restartGame();
}
};
	

function restartGame() {
	moves = 1;
	document.getElementById("moves").innerHTML = moves;
	guessedCards = [];
	openedCardId = [];
	openedCardClass = [];
	currentCardId = null;
	endGameModal("wantToRestart");
	createDeck();	
};

//Modal ending game
function endGameModal() { 
	if (arguments[0] == "youWon") {
		document.getElementById("youWon").showModal();}
	else if (arguments[0] == "youLost") {
		document.getElementById("youLost").showModal();}
	else if (arguments[0] == "wantToRestart") {
		document.getElementById("wantToRestart").showModal();}
} 


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
