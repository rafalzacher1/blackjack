// Clears the cards of the screen.
function clear_cards() {
    for (let i = 1; i <= 5; i++) {
        let card = document.getElementById("card_" + i);

        card.src = "";
    }
}