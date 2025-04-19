// Game board module
const gameBoard = (function () {
    let gameBoard = [
        [1, 1, 1],
        [4, 5, 20],
        [33, 10, 14],
    ];

    function getGameBoard() {
        return gameBoard;
    }

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

        gameBoard.printGameBoard();

        // Switch turn
        currentPlayer.setTurn();
        nextPlayer.setTurn();
        console.log("Switching turns...");
    };

    const checkForWinner = () => {
        const currentBoard = gameBoard.getGameBoard();
        let rowOne = currentBoard[0];
        let rowTwo = currentBoard[1];
        let rowThree = currentBoard[2];

        let step = 0;
        console.log("Checking for winner...");

        // check row for winner
        for (let i = 0; i < currentBoard.length; i++) {
            console.log("Row Step: " + step);
            step++;

            // Check sum of each row
            const sumRow = currentBoard[i].reduce(
                (total, current) => total + current
            );
            console.log("Sum Row " + sumRow);

            if (sumRow === 3) {
                console.log("Player One has won with a row!");
                return (gameOver = true);
            } else if (sumRow === 12) {
                console.log("Player Two has won with a row!");
                return (gameOver = true);
            }
        }
        // reset step for next check
        step = 0;
        // Check columns
        for (let i = 0; i < currentBoard.length; i++) {
            console.log("Col Step: " + step);
            step++;

            let colArr = [rowOne[i], rowTwo[i], rowThree[i]];

            // check sum of each col
            const sumCol = colArr.reduce((total, current) => total + current);
            console.log("Sum Col " + sumCol);

            if (sumCol === 3) {
                console.log("Player One has won with a column!");
                return (gameOver = true);
            } else if (sumCol === 12) {
                console.log("Player Two has won with a column!");
                return (gameOver = true);
            }
        }

        // Check diagonals outside of loop as there are only 2 possible
        // 0,0 1,1 2,2
        // 0,2, 1,1 2,
        let diagonalOne = [rowOne[(0, 0)], rowTwo[(0, 1)], rowThree[(0, 2)]];
        let diagonalTwo = [rowOne[(0, 2)], rowTwo[(0, 1)], rowThree[(0, 0)]];
        console.log(diagonalOne);
        console.log(diagonalTwo);

        // Check Sum of each diagonal
        const sumDiagonalOne = diagonalOne.reduce(
            (total, current) => total + current
        );
        const sumDiagonalTwo = diagonalTwo.reduce(
            (total, current) => total + current
        );

        if (sumDiagonalOne === 3 || sumDiagonalTwo === 3) {
            console.log("Player One has won with a diagonal!");
            return (gameOver = true);
        } else if (sumDiagonalOne === 12 || sumDiagonalTwo === 12) {
            console.log("Player Two has won with a diagonal!");
            return (gameOver = true);
        }

        // Check for tie
        for (let i = 0; i < currentBoard.length; i++) {
            // If all rows have a value >0 then all possibles turns have been made
            currentBoard[i].forEach((i) => {
                // if a 0 is found than there is still one or more cells left
                if (i === 0) {
                    return (gameOver = false);
                } else {
                    return (gameOver = "Draw");
                }
            });
        }
        console.log(gameOver);
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
