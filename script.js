const gameBoard = (function () {
    let gameBoard = [
        rowOne = [0, 1, 2],
        rowTwo = [3, 4, 5],
        rowThree = [6, 7, 8]
    ];

    const getGameBoard = () => gameBoard;
    const printGameBoard = () => {
        console.log(gameBoard[0, 0])
        console.log(gameBoard[0, 1])
        console.log(gameBoard[0, 2])
    };

    return { getGameBoard, printGameBoard }
})(); // IIFE since I only need one instance of it!

const gameController = (function (playerOne, playerTwo) {
    gameBoard.getGameBoard();
    gameBoard.printGameBoard();
}());

// Player obj
const createPlayer = function (name, marker, isTurn) {
    let isWinner = false;

    const getWinnerStatus = () => isWinner;
    const setWinnerStatus = () => {
        return isWinner = true;
    };
    
    const getTurn = () => isTurn;

    const setTurn = () => {
        if (isTurn === true) {
            return isTurn = false;
        }
        else {
            return isTurn = true;
        };
    };

    return { name, marker, isTurn, setTurn, getTurn, setWinnerStatus, getWinnerStatus };
};

// Create 2 players
const playerOne = createPlayer("Player 1", "X", true);
console.log(playerOne.name);
console.log(playerOne.marker);
console.log(playerOne.isTurn);
console.log("Has Won: " + playerOne.getWinnerStatus());

const playerTwo = createPlayer("Player 2", "O", false);
console.log(playerTwo.name);
console.log(playerTwo.marker);
console.log(playerTwo.isTurn);
console.log("Has Won: " + playerTwo.getWinnerStatus());

