// Store the gameboard as an array inside of a gameboard object (use module)
const gameboard = (() => {
    let array = ["", "", "", "", "", "", "", "", ""];
    return {array};
})();

// Store players as objects (use factory)
const player = (number, character) => {
    const getNumber = () => number;
    const getCharacter = () => character;
    return {getNumber, getCharacter};
};

// Create an object to control the flow of the game itself (use module)
const game = (() => {
    // Display start game button
    // Let player 1 pick their character
    // Let player 2 pick their character
    // Let player 1 have a turn
    // Check for win, if no win let the next player go and so on
    // Else if win end game
    // Display winner
    // Display reset button
})();



// Function to populate the gameboard based on player and what space was clicked
function populateGameboard(space) {
    // Need to fix this to detect current player rather than just x
    space.currentTarget.innerText = "x";
    const spaces = document.querySelectorAll(".space");
    for (let i = 0; i < gameboard.array.length; i++) {
        gameboard.array[i] = spaces[i].innerText;
    }
}


// Add event listeners to let spaces be clicked
document.querySelectorAll(".space").forEach(item => {
    item.addEventListener("click", populateGameboard);
})