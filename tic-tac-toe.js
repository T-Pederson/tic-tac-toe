// Set up global variables that all modules/factories need
const spaces = document.querySelectorAll(".space");
const statusText = document.querySelector('h2');

// Store the gameboard as an array inside of a gameboard object (use module)
const gameboard = (() => {
    let array = ["", "", "", "", "", "", "", "", ""];
    const update = space => {
        // Generate an updated array of all current display spaces
        let spacesArray = [].slice.call(spaces, 0);
        // Find the index number of the space that the player just clicked
        let chosenSpace = spacesArray.indexOf(space);
        // Update the gameboard array to reflect the marker of the player that just took a turn
        array[chosenSpace] = game.currentPlayer.getMarker();
        // Update the display according to the newly updated gameboard array
        for (let i = 0; i < array.length; i++) {
            spaces[i].innerText = array[i];
        }
    };
    // check for a win, if someone wins stop the game and congratulate winner
    const winCheck = () => {
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
            spaces.forEach(item => { item.removeEventListener("click", game.currentPlayer.turn); });
            statusText.innerText = `${game.player1.getName()} wins!`;
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
            spaces.forEach(item => { item.removeEventListener("click", game.currentPlayer.turn); });
            statusText.innerText = `${game.player2.getName()} wins!`;
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
            spaces.forEach(item => { item.removeEventListener("click", game.currentPlayer.turn); });
            statusText.innerText = "It's a tie!";
            return true;
        } else {
            return false;
        }
    };
    // Erase all markers, reset array to all blank, reset status text to player 1's turn, change current player to player 1, and re-add all turn event listeners 
    const reset = () => {
        spaces.forEach(item => { item.innerText = ""; });
        array = ["", "", "", "", "", "", "", "", ""];
        statusText.innerText = `${game.player1.getName()}'s turn...`;
        game.currentPlayer = game.player1;
        spaces.forEach(item => { item.addEventListener("click", game.currentPlayer.turn); });
    };
    return {update, winCheck, reset};
})();

// Store players as objects (use factory)
const player = (marker, name) => {
    // Allow a players name and marker to be referenced
    const getName = () => name;
    const getMarker = () => marker;
    // Allow players to take turns
    const turn = space => {
        space = space.currentTarget;
        // Check to make sure the space hasn't already been played, then update the gameboard and check for a win, if no win change the current player
        if (space.innerText == "") {
            gameboard.update(space);
            if (!(gameboard.winCheck())) {
                game.changePlayer();
            }
        } else {
            return;
        }
    }
    return {getName, getMarker, turn};
};

// Create an object to control the flow of the game itself (use module)
const game = (() => {
    // Set up players
    let player1 = player("x", 'x');
    let player2 = player("o", 'o');
    let currentPlayer = player1;
    statusText.innerText = `${currentPlayer.getName()}'s turn...`;
    // Set up event listeners on spaces to let players take turns
    spaces.forEach(item => { item.addEventListener("click", currentPlayer.turn); });
    // Set up event listener on reset button
    document.querySelector("#reset").addEventListener("click", gameboard.reset);
    // Update event listeners to reflect new current players, change current player, and change status text
    const changePlayer = () => {
        if (game.currentPlayer.getMarker() == 'x') {
            spaces.forEach(item => { item.removeEventListener("click", game.currentPlayer.turn); });
            game.currentPlayer = player2;
            statusText.innerText = `${player2.getName()}'s turn...`;
            spaces.forEach(item => { item.addEventListener("click", game.currentPlayer.turn); });
        } else {
            spaces.forEach(item => { item.removeEventListener("click", game.currentPlayer.turn); });
            game.currentPlayer = player1;
            statusText.innerText = `${player1.getName()}'s turn...`;
            spaces.forEach(item => { item.addEventListener("click", game.currentPlayer.turn); });
        }
    }
    return {player1, player2, currentPlayer, changePlayer}
})();