// This is a function to create a deck of cards
function create_deck() {
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