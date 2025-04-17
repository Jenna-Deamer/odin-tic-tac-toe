// Game board module
const gameBoard = (function () {
    let gameBoard = [
        [1, 4, 1],
        [0, 0, 4],
        [1, 4, 0],
    ];

    const getGameBoard = () => gameBoard;

    const setGameBoard = (marker) => {
        gameBoard[selectedRow].splice(selectedCell, 1, marker);
    };

    const printGameBoard = () => {
        console.log(gameBoard[0]);
        console.log(gameBoard[1]);
        console.log(gameBoard[2]);
    };

    return { getGameBoard, setGameBoard, printGameBoard };
})();

// Player factory function
const createPlayer = function (name, marker) {
    let isWinner = false;
    let isTurn = false;

    const getWinnerStatus = () => isWinner;
    const setWinnerStatus = () => (isWinner = true);

    const getTurn = () => isTurn;
    const setTurn = () => {
        isTurn = !isTurn;
    };

    const getMarker = () => marker;

    return {
        name,
        getMarker,
        setTurn,
        getTurn,
        setWinnerStatus,
        getWinnerStatus,
    };
};

// Game controller module
const gameController = (function () {
    let gameOver = false;

    const getCurrentPlayer = () => {
        if (playerOne.getTurn()) {
            return {
                currentPlayer: playerOne,
                nextPlayer: playerTwo,
            };
        } else {
            return {
                currentPlayer: playerTwo,
                nextPlayer: playerOne,
            };
        }
    };

    const playRound = () => {
        const { currentPlayer, nextPlayer } = getCurrentPlayer();
        console.log("It's " + currentPlayer.name + "'s Turn");

        const marker = currentPlayer.getMarker();

        // gameBoard.setGameBoard(marker);

        // gameBoard.printGameBoard();

        // Switch turn
        currentPlayer.setTurn();
        nextPlayer.setTurn();
        console.log("Switching turns...");
    };

    const checkForWinner = () => {
        const currentBoard = gameBoard.getGameBoard();
        let step = 0;
        console.log("Checking for winner...");

        let rowOne = currentBoard[0];
        let rowTwo = currentBoard[1];
        let rowThree = currentBoard[2];

        for (let i = 0; i < currentBoard.length; i++) {
            console.log("Step: " + step);
            step++;

            // Check rows
            const sumRow = currentBoard[i].reduce((total, current) => total + current);
            console.log("Sum Row " + sumRow);

            if (sumRow === 3) {
                console.log("Player One has won with a row!");
                return (gameOver = true);
            }
            else if (sumRow === 12) {
                console.log("Player Two has won with a row!");
                return (gameOver = true);
            };

            // Check columns
            // 0,0 1,0, 2,0
            // 0,1, 1,1, 2,1
            // 0,2, 1,2, 2,2

            let colArr = [rowOne[i], rowTwo[i], rowThree[i]];
            const sumCol = colArr.reduce((total, current) => total + current);
            console.log("Sum Col " + sumCol);

            if (sumCol === 3) {
                console.log("Player One has won with a column!");
                return (gameOver = true);
            } else if (sumCol === 12) {
                console.log("Player Two has won with a column!");
                return (gameOver = true);
            };
        };

        // Check diagonals outside of loop as there are only 2 possible 
        // 0,0 1,1 2,2 
        // 0,2, 1,1 2,0

        // 0,0 0,1 0,2
        // 1,0 1,1 1,1
        // 2,0 2,1 2,2

        // create an array call reduce on it -> check for win
        // Reverese array and call reduce on it -> check for win

    };

    const playGame = () => {
        getCurrentPlayer();
        playRound();
        checkForWinner();
    };

    return { playGame, getCurrentPlayer };
})();

// Create players
const playerOne = createPlayer("Player 1", 1);
playerOne.setTurn(); // Player One starts

const playerTwo = createPlayer("Player 2", 4);

let selectedCell = 0;
let selectedRow = 1;

// Start game
gameController.playGame();
