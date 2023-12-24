// A function is created to calculate the score
function get_score(cardArray) {
    let score = 0;
    let hasAce = false;
    // Iterated through the array of cards
    for (let i = 0; i < cardArray.length; i++) {
        // Each card is stored in a variable
        let card = cardArray[i];
        // The score of the card is stored in a variable
        score += get_card_numeric_value(card);
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