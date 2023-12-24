/**
 * Blackjack
 **/

// Card variables
// Creates an array of suits of cards in a global variable
let suits = ['hearts', 'clubs', 'diamonds', 'spades'],
    // Creates an array of different card values in a global variable
    values = ['a', 'k', 'q', 'j', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

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
// show_status();

// // Clears the cards of the screen.
// function clearCards() {
//     for (let i = 1; i <= 5; i++) {
//         let card = document.getElementById("card_" + i);

//         card.src = "";
//     }
// }

// Event listener is created to make the buttons visible and change the text
newGameButton.addEventListener('click', function () {
    clear_cards();

    gameStarted = true;
    gameOver = false;
    playerWon = false;

    // Deck of cards are created for the dealer and the player
    deck = create_deck();
    shuffle_deck(deck);
    dealerCards = [get_next_card(), get_next_card()];
    playerCards = [get_next_card(), get_next_card()];

    // The styles are changed when the game starts
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    show_status();
});

// Event listener is created to add cards
hitButton.addEventListener('click', function () {
    // A new card will be pushed into the player's deck
    playerCards.push(get_next_card());
    check_for_end_of_game();
    // Text area is updated
    show_status();

    // nextCard();
});

// Event listener is created to stay with the current cards
stayButton.addEventListener('click', function () {
    gameOver = true;
    check_for_end_of_game();
    // Text area is updated
    show_status();
});

// // This is a function to create a deck of cards
// function createDeck() {
//     // Empty array is created
//     let deck = [];
//     // A loop is created to iterate through both arrays to match the suits with values
//     for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
//         for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
//             // An object is created to store the suit and value of a card
//             let card = {
//                 suit: suits[suitIdx],
//                 value: values[valueIdx]
//             };
//             // The created card is placed into the empty array
//             deck.push(card)
//         };
//     };
//     // The array is returned to be used elsewhere
//     return deck;
// };

// // A function is created to shuffle the deck of cards
// function shuffleDeck(deck) {
//     // Iterates through the deck of cards
//     for (let i = 0; i < deck.length; i++) {
//         // Random number is generated to get a random card
//         let swapIdx = Math.trunc(Math.random() * deck.length);
//         // Random card is stored in a variable
//         let temporary = deck[swapIdx];
//         // Ordered card is stored in a variable from the array
//         deck[swapIdx] = deck[i];
//         // The ordered card is swapped with the random card
//         deck[i] = temporary;
//     };
// };

// // A function is created to concatenate the card value with its suit
// function getCardString(card) {
//     return card.value + "-" + card.suit;
// };

// // A function is created to provide a card to the player
// function getNextCard() {
//     return deck.shift();
// };

// // A function is created to match cards with their numeric values
// function getCardNumericValue(card) {
//     switch (card.value) {
//         case 'a':
//             return 1;
//         case '2':
//             return 2;
//         case '3':
//             return 3;
//         case '4':
//             return 4;
//         case '5':
//             return 5;
//         case '6':
//             return 6;
//         case '7':
//             return 7;
//         case '8':
//             return 8;
//         case '9':
//             return 9;
//         default:
//             return 10;
//     };
// };

// // A function is created to calculate the score
// function getScore(cardArray) {
//     let score = 0;
//     let hasAce = false;
//     // Iterated through the array of cards
//     for (let i = 0; i < cardArray.length; i++) {
//         // Each card is stored in a variable
//         let card = cardArray[i];
//         // The score of the card is stored in a variable
//         score += get_card_numeric_value(card);
//         if (card.value === 'Ace') {
//             hasAce = true;
//         };
//     };
//     // The score is incremented if the card in deck is an ace
//     if (hasAce && score + 10 <= 21) {
//         return score + 10;
//     } else if (hasAce && score + 10 > 21) {
//         return score + 0;
//     };
//     // Score is returned so it can be used elsewhere
//     return score;
// };

// // A function is created to generate the scores
// function updateScores() {
//     dealerScore = get_score(dealerCards);
//     playerScore = get_score(playerCards);
// };

// // Checks if its end of game
// function checkForEndOfGame() {
//     // Updates the score to the most current one
//     update_scores();

//     if (gameOver) {
//         // Checks if the dealer and player has less than or equal score to 21
//         while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
//             // Let dealer take cards
//             dealerCards.push(get_next_card());
//             // Functionality for dealer to win if he/she has 5 cards
//             if (dealerCards.length == 5) {
//                 playerWon = false;
//                 gameOver = true;
//             };
//             // The score is updated
//             update_scores();
//         };
//     };

//     // Functunality for when player gets 21 points
//     if (dealerScore === 21 || playerScore > 21) {
//         playerWon = false;
//         gameOver = true;
//     } else if (playerScore === 21 || dealerScore > 21) {
//         playerWon = true;
//         gameOver = true;
//     } else if (gameOver) {
//         if (playerScore > dealerScore) {
//             playerWon = true;
//         } else {
//             playerWon = false;
//         };
//     };
// };

let cardsDir = "./cards/";
let cardExtension = ".png";

// // A function is created to display the status of the game
// function showStatus() {
//     // Text is displayed when the game is not started
//     if (!gameStarted) {
//         return textArea.innerText = 'Welcome to Blackjack!';
//     };

//     // Dealer's cards prepared to displayed
//     let dealerCardString = '';
//     // Iterates through the deck of cards
//     for (let i = 0; i < dealerCards.length; i++) {
//         // Uses a function to join the value with the suit and display it on new line
//         dealerCardString += get_card_string(dealerCards[i]) + '\n';
//     };

//     // Player's cards are prepared to displayed
//     let playerCardString = '';
//     // Iterates through the deck of cards
//     for (let i = 0; i < playerCards.length; i++) {
//         // Uses a function to join the value with the suit and display it on new line
//         playerCardString += get_card_string(playerCards[i]) + '\n';

//         // console.log(get_card_string(playerCards[i]));
//         let card = document.getElementById("card_" + (i+1));

//         let cardSrc = cardsDir + get_card_string(playerCards[i]) + cardExtension;
//         card.src = cardSrc;
//     };

//     update_scores();

//     // Player's and dealer's cards and scores are displayed to the interface
//     textArea.innerText = 'dealer has: \n' + dealerCardString + '(score: ' + dealerScore + ')\n\n' +
//         'Player has: \n' + playerCardString + '(score: ' + playerScore + ')\n\n';

//     // Checks if the game is over
//     if (gameOver) {
//         if (playerWon) {
//             textArea.innerText += 'YOU WIN!';
//         } else {
//             textArea.innerText += 'DEALER WINS!';
//         };
//         // Styles are being changed if the game has finished
//         newGameButton.style.display = 'inline';
//         hitButton.style.display = 'none';
//         stayButton.style.display = 'none';
//     };
// };