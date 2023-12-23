/**
 * Blackjack
 * 11/08/2019
 **/

// Card variables
// Creates an array of suits of cards in a global variable
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
    // Creates an array of different card values in a global variable
    values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

// DOM variables
let textArea = document.getElementById('text-area'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button');

// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

// Changes the display of hit and stay button to none to make it invisible
hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

// Event listener is created to make the buttons visible and change the text
newGameButton.addEventListener('click', function() {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    // Deck of cards are created for the dealer and the player
    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    // The styles are changed when the game starts
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    showStatus();
});

// Event listener is created to add cards
hitButton.addEventListener('click', function() {
    // A new card will be pushed into the player's deck
    playerCards.push(getNextCard());
    checkForEndOfGame();
    // Text area is updated
    showStatus();
});

// Event listener is created to stay with the current cards
stayButton.addEventListener('click', function() {
    gameOver = true;
    checkForEndOfGame();
    // Text area is updated
    showStatus();
});

// This is a function to create a deck of cards
function createDeck() {
    // Empty array is created
    let deck = [];
    // A loop is created to iterate through both arrays to match the suits with values
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            // An object is created to store the suit and value of a card
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            };
            // The created card is placed into the empty array
            deck.push(card)
        };
    };
    // The array is returned to be used elsewhere
    return deck;
};

// A function is created to shuffle the deck of cards
function shuffleDeck(deck) {
    // Iterates through the deck of cards
    for (let i = 0; i < deck.length; i++) {
        // Random number is generated to get a random card
        let swapIdx = Math.trunc(Math.random() * deck.length);
        // Random card is stored in a variable
        let temporary = deck[swapIdx];
        // Ordered card is stored in a variable from the array
        deck[swapIdx] = deck[i];
        // The ordered card is swapped with the random card
        deck[i] = temporary;
    };
};

// A function is created to concatenate the card value with its suit
function getCardString(card) {
    return card.value + ' of ' + card.suit;
};

// A function is created to provide a card to the player
function getNextCard() {
    return deck.shift();
};

// A function is created to match cards with their numeric values
function getCardNumericValue(card) {
    switch(card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    };
};

// A function is created to calculate the score
function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    // Iterated through the array of cards
    for (let i = 0; i < cardArray.length; i++) {
        // Each card is stored in a variable
        let card = cardArray[i];
        // The score of the card is stored in a variable
        score += getCardNumericValue(card);
        if (card.value === 'Ace') {
            hasAce = true;
        };
    };
    // The score is incremented if the card in deck is an ace
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    } else if (hasAce && score + 10 > 21) {
        return score + 0;
    };
    // Score is returned so it can be used elsewhere
    return score;
};

// A function is created to generate the scores
function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
};

// Checks if its end of game
function checkForEndOfGame() {
    // Updates the score to the most current one
    updateScores();

    if (gameOver) {
        // Checks if the dealer and player has less than or equal score to 21
        while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            // Let dealer take cards
            dealerCards.push(getNextCard());
            // Functionality for dealer to win if he/she has 5 cards
            if (dealerCards.length == 5) {
                playerWon = false;
                gameOver = true;
            };
            // The score is updated
            updateScores();
        };
    };

    // Functunality for when player gets 21 points
    if (dealerScore === 21 || playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } else if (playerScore === 21 || dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    } else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        } else {
            playerWon = false;
        };
    };
};

// A function is created to display the status of the game
function showStatus() {
    // Text is displayed when the game is not started
    if (!gameStarted) {
        return textArea.innerText = 'Welcome to Blackjack!';
    };

    // Dealer's cards prepared to displayed
    let dealerCardString = '';
    // Iterates through the deck of cards
    for (let i = 0; i <dealerCards.length; i++) {
        // Uses a function to join the value with the suit and display it on new line
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    };

    // Player's cards are prepared to displayed
    let playerCardString = '';
    // Iterates through the deck of cards
    for (let i = 0; i < playerCards.length; i++) {
        // Uses a function to join the value with the suit and display it on new line
        playerCardString += getCardString(playerCards[i]) + '\n';
    };

    updateScores();

    // Player's and dealer's cards and scores are displayed to the interface
    textArea.innerText = 'dealer has: \n' + dealerCardString + '(score: ' + dealerScore + ')\n\n' +
                         'Player has: \n' + playerCardString + '(score: ' + playerScore + ')\n\n';

    // Checks if the game is over
    if (gameOver) {
        if (playerWon) {
            textArea.innerText += 'YOU WIN!';
        } else {
            textArea.innerText += 'DEALER WINS!';
        };
        // Styles are being changed if the game has finished
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    };
};