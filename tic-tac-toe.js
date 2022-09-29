// Store the gameboard as an array inside of a gameboard object (use module)
const gameboard = (() => {
    let array = ["x", "", "o", "x", "x", "x", "o", "", "o"];
    return {array};
})();

// Store players as objects (use factory)
const player = (number, character) => {
    const getNumber = () => number;
    const getCharacter = () => character;
    return {getNumber, getCharacter};
};

const player1 = player(1, 'x');
const player2 = player(2, 'o');

// Create an object to control the flow of the game itself (use module)



// Function to populate the gameboard from gameboard.array
function populate () {
    const markers = document.querySelectorAll(".marker");
    for (let i = 0; i < gameboard.array.length; i++) {
        markers[i].innerText = gameboard.array[i];
    }
}

populate();