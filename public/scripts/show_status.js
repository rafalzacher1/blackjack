// A function is created to display the status of the game
function show_status() {
    // Text is displayed when the game is not started
    if (!gameStarted) {
        return textArea.innerText = 'Welcome to Blackjack!';
    };

    // Dealer's cards prepared to displayed
    let dealerCardString = '';
    // Iterates through the deck of cards
    for (let i = 0; i < dealerCards.length; i++) {
        // Uses a function to join the value with the suit and display it on new line
        dealerCardString += get_card_string(dealerCards[i]) + '\n';
    };

    // Player's cards are prepared to displayed
    let playerCardString = '';
    // Iterates through the deck of cards
    for (let i = 0; i < playerCards.length; i++) {
        // Uses a function to join the value with the suit and display it on new line
        playerCardString += get_card_string(playerCards[i]) + '\n';

        // console.log(get_card_string(playerCards[i]));
        let card = document.getElementById("card_" + (i+1));

        let cardSrc = cardsDir + get_card_string(playerCards[i]) + cardExtension;
        card.src = cardSrc;
    };

    update_scores();

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