// Set up global variables that all modules/factories need
const spaces = document.querySelectorAll('.space');
const statusText = document.querySelector('.statusText');



// Store the gameboard as an array inside of a gameboard object (module)
const gameboard = (() => {
    let array = ['', '', '', '', '', '', '', '', ''];
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
            spaces.forEach(item => { item.removeEventListener('click', game.currentPlayer.turn); });
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
            spaces.forEach(item => { item.removeEventListener('click', game.currentPlayer.turn); });
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
            spaces.forEach(item => { item.removeEventListener('click', game.currentPlayer.turn); });
            statusText.innerText = "It's a tie!";
            return true;
        } else {
            return false;
        }
    };

    // Erase all markers, reset array to all blank, reset status text to player 1's turn, change current player to player 1, and re-add all turn event listeners 
    const playAgain = () => {
        spaces.forEach(item => { item.innerText = ''; });
        array = ['', '', '', '', '', '', '', '', ''];
        statusText.innerText = `${game.player1.getName()}'s turn...`;
        game.currentPlayer = game.player1;
        spaces.forEach(item => { item.addEventListener('click', game.currentPlayer.turn); });
    };
    return {update, winCheck, playAgain};
})();



// Store players as objects (factory)
const player = (marker, name) => {
    // Allow a players name and marker to be referenced
    const getName = () => name;
    const getMarker = () => marker;
    // Allow players to take turns
    const turn = space => {
        space = space.currentTarget;
        // Check to make sure the space hasn't already been played, then update the gameboard and check for a win, if no win change the current player
        if (space.innerText == '') {
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



// Create an object to control the flow of the game itself (module)
const game = (() => {
    let player1;
    let player2;
    let currentPlayer;

    const startGame = () => {
        // Set up players, assign player 1 to current player, then update display to status text and play again button
        let player1Name = document.querySelector('#player1').value;
        let player2Name = document.querySelector('#player2').value;
        if (player1Name.length < 1 || player2Name.length < 1) {
            return;
        }
        game.player1 = player('x', player1Name);
        game.player2 = player('o', player2Name);
        game.currentPlayer = game.player1;
        // Set up event listeners on spaces to let players take turns
        spaces.forEach(item => { item.addEventListener('click', game.currentPlayer.turn); });
        // Remove player name forms and replace with status text
        statusText.innerText = `${game.currentPlayer.getName()}'s turn...`;
        // Remove start button and add play again button
        const button = document.querySelector('button');
        button.innerText = 'Play Again';
        button.removeEventListener('click', startGame);
        button.addEventListener('click', gameboard.playAgain);
    }

    // Add event listener to start button
    document.querySelector('#start').addEventListener('click', startGame);

    // Update event listeners to reflect new currentPlayer, update currentPlayer, and update statusText
    const changePlayer = () => {
        if (game.currentPlayer.getMarker() == 'x') {
            spaces.forEach(item => { item.removeEventListener('click', game.currentPlayer.turn); });
            game.currentPlayer = game.player2;
            statusText.innerText = `${game.player2.getName()}'s turn...`;
            spaces.forEach(item => { item.addEventListener('click', game.currentPlayer.turn); });
        } else {
            spaces.forEach(item => { item.removeEventListener('click', game.currentPlayer.turn); });
            game.currentPlayer = game.player1;
            statusText.innerText = `${game.player1.getName()}'s turn...`;
            spaces.forEach(item => { item.addEventListener('click', game.currentPlayer.turn); });
        }
    }
    return {player1, player2, currentPlayer, changePlayer, statusText}
})();