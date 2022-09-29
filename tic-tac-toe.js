// Store the gameboard as an array inside of a gameboard object (use module)
const gameboard = (() => {
    let array = ["", "", "", "", "", "", "", "", ""];
    return {array};
})();

// Store players as objects (use factory)
const player = (marker) => {
    const getMarker = () => marker;
    return {getMarker};
};

// Create an object to control the flow of the game itself (use module)
const game = (() => {
    // Let currentPlayer = 'x'
    // Set up event listeners to run function for a turn (fires when a player clicks a space)
    // turn(currentPlayer)
        // populateSpace(space, currentPlayer)
        // winCheck(array)
            // Read array for win patterns
            // If no win
                // change current turn variable to other player
    // Else if win end game
    // Display winner
    // Display reset button
})();





// ----------------------- Logic to make game work outside of modules -----------------------

// Let x's go first
let currentPlayer = 'x';

// Allow for players to click spaces and take turns
document.querySelectorAll(".space").forEach(item => { item.addEventListener("click", turn); });

// Make reset button work
document.querySelector("#reset").addEventListener("click", reset);

// Run through a player's turn
function turn(space) {
    // Place marker on selected space
    if (space.currentTarget.innerText == '') {
        space.currentTarget.innerText = currentPlayer;
    } else {
        return;
    }
    // Update the gameboard array to match the current display
    updateGameboard();
    // If no win, change current player
    if (!(winCheck(gameboard.array))) {
        changePlayer();
    }
}

// check for a win, if someone wins stop the game and congratulate winner
function winCheck(array) {
    // if x's win
    if (
    array[0] == 'x' && array[1] == 'x' && array[2] == 'x' ||
    array[3] == 'x' && array[4] == 'x' && array[5] == 'x' ||
    array[6] == 'x' && array[7] == 'x' && array[8] == 'x' ||
    array[0] == 'x' && array[3] == 'x' && array[6] == 'x' ||
    array[1] == 'x' && array[4] == 'x' && array[7] == 'x' ||
    array[2] == 'x' && array[5] == 'x' && array[8] == 'x' ||
    array[0] == 'x' && array[4] == 'x' && array[8] == 'x' ||
    array[2] == 'x' && array[4] == 'x' && array[6] == 'x'
    ) {
        // remove event listeners that allow for turns and display x as winner
        document.querySelectorAll(".space").forEach(item => { item.removeEventListener("click", turn); });
        document.querySelector('h3').innerText = "x wins!";
        return true;
    } 
    // else if o's win
    else if (
    array[0] == 'o' && array[1] == 'o' && array[2] == 'o' ||
    array[3] == 'o' && array[4] == 'o' && array[5] == 'o' ||
    array[6] == 'o' && array[7] == 'o' && array[8] == 'o' ||
    array[0] == 'o' && array[3] == 'o' && array[6] == 'o' ||
    array[1] == 'o' && array[4] == 'o' && array[7] == 'o' ||
    array[2] == 'o' && array[5] == 'o' && array[8] == 'o' ||
    array[0] == 'o' && array[4] == 'o' && array[8] == 'o' ||
    array[2] == 'o' && array[4] == 'o' && array[6] == 'o'
    ) { 
        // remove event listeners that allow for turns and display o as winner
        document.querySelectorAll(".space").forEach(item => { item.removeEventListener("click", turn); });
        document.querySelector('h3').innerText = "o wins!";
        return true;
    } 
    // else if tie
    else if (
        array[0] != '' && 
        array[1] != '' && 
        array[2] != '' && 
        array[3] != '' && 
        array[4] != '' && 
        array[5] != '' && 
        array[6] != '' && 
        array[7] != '' && 
        array[8] != ''
    ) {
        // remove event listeners that allow for turns and display tie
        document.querySelectorAll(".space").forEach(item => { item.removeEventListener("click", turn); });
        document.querySelector('h3').innerText = "It's a tie!";
        return true;
    }
}

// Clear display, reset gameboard.array, change to x's turn, and add event listeners for turns back to spaces
function reset() {
    document.querySelectorAll(".space").forEach(item => { item.innerText = ""; })
    updateGameboard();
    document.querySelector('h3').innerText = "x's turn...";
    currentPlayer = 'x';
    document.querySelectorAll(".space").forEach(item => { item.addEventListener("click", turn); });
}

// Change current player after player takes a turn
function changePlayer() {
    if (currentPlayer == 'x') {
        currentPlayer = 'o';
        document.querySelector("h3").innerText = "o's turn...";
    } else {
        currentPlayer = 'x';
        document.querySelector("h3").innerText = "x's turn...";
    }
}

// Update the gameboard array based on the display
function updateGameboard() {
    const spaces = document.querySelectorAll(".space");
    for (let i = 0; i < gameboard.array.length; i++) {
        gameboard.array[i] = spaces[i].innerText;
    }
}