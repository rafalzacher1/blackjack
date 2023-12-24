// Checks if its end of game
function check_for_end_of_game() {
    // Updates the score to the most current one
    update_scores();

    if (gameOver) {
        // Checks if the dealer and player has less than or equal score to 21
        while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            // Let dealer take cards
            dealerCards.push(get_next_card());
            // Functionality for dealer to win if he/she has 5 cards
            if (dealerCards.length == 5) {
                playerWon = false;
                gameOver = true;
            };
            // The score is updated
            update_scores();
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