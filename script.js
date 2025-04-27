const gameStartScreen = document.querySelector("#startScreen");
const container = document.querySelector("#container");
container.classList.add("hidden"); // Hide gameboard & results label until user clicks start
const gameBoardContainer = document.querySelector("#gameboard");
const resultsLabel = document.querySelector("#resultsLabel");
const restartBtn = document.querySelector("#restart-btn");
restartBtn.addEventListener("click", () => gameController.resetGame());

// Game board module
const gameBoard = (function () {
    let gameBoard = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    function getGameBoard() {
        return gameBoard;
    }

    const setGameBoard = (marker, selectedRow, selectedCell) => {
        gameBoard[selectedRow].splice(selectedCell, 1, marker);
    };

    const resetGameBoard = () => {
        gameBoard = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
    };
    //   const printGameBoard = () => {
    //     console.log(gameBoard[0]);
    //     console.log(gameBoard[1]);
    //     console.log(gameBoard[2]);
    //   };

    const displayGameBoard = (currentPlayer, playerOne, playerTwo) => {
        let rowId = -1;
        if (
            playerOne.getWinnerStatus() === true &&
            playerTwo.getWinnerStatus() === true
        ) {
            resultsLabel.textContent = "It's a Draw!";
        } else if (
            playerOne.getWinnerStatus() === true ||
            playerTwo.getWinnerStatus() === true
        ) {
            resultsLabel.textContent = currentPlayer.getName() + " Has Won!";
        } else {
            resultsLabel.textContent = currentPlayer.getName() + "'s Turn.";
        }
        // clear previous board state to avoid duplicating boards
        gameBoardContainer.innerHTML = "";

        // Loop through gameBoard to get each row
        gameBoard.forEach((row) => {
            let id = 0; // id for buttons

            // loop through each individual row
            rowId++;
            // display value in each cell for each index in row
            row.forEach((cell) => {
                const gameCell = document.createElement("button");
                gameCell.classList.add("cell");
                gameCell.setAttribute("cell", id++);
                gameCell.setAttribute("row", rowId);

                // Display X, O or "" instead of num values
                if (cell === 1) {
                    gameCell.innerHTML = "X";
                } else if (cell === 4) {
                    gameCell.innerHTML = "O";
                } else {
                    gameCell.innerHTML = "";
                }

                gameBoardContainer.appendChild(gameCell);
            });
        });
    };
    return { getGameBoard, setGameBoard, displayGameBoard, resetGameBoard };
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

    const setName = (newName) => {
        name = newName;
    };
    const getName = () => name;

    return {
        getName,
        setName,
        getMarker,
        setTurn,
        getTurn,
        setWinnerStatus,
        getWinnerStatus,
    };
};

// Game controller module
const gameController = (function () {
    // Create players
    const playerOne = createPlayer("Player 1", 1);
    playerOne.setTurn(); // Player One starts
    const playerTwo = createPlayer("Player 2", 4);

    const setPlayerNames = () => {
        const playerOneInput = document.querySelector("#p1name").value;
        const playerTwoInput = document.querySelector("#p2name").value;
        if (playerOneInput) {
            playerOne.setName(playerOneInput);
        } else {
            playerOne.setName("Player 1");
        }

        if (playerTwoInput) {
            playerTwo.setName(playerTwoInput);
        } else {
            playerTwo.setName("Player 2");
        }
    };

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

    const getSelectedSquare = (currentPlayer, nextPlayer) => {
        const gameBoardCell = document.querySelectorAll(".cell");
        gameBoardCell.forEach((button) => {
            button.addEventListener("click", () => {
                const clickedCell = button.getAttribute("cell");
                const clickedRow = button.getAttribute("row");

                const marker = currentPlayer.getMarker();
                // store what cell/row user clicked
                let selectedCell = clickedCell;
                let selectedRow = clickedRow;

                // Prevent clicking a cell thats taken or when game is over
                if (
                    button.innerHTML === "" &&
                    playerOne.getWinnerStatus() === false &&
                    playerTwo.getWinnerStatus() === false
                ) {
                    gameBoard.setGameBoard(marker, selectedRow, selectedCell);
                    checkForWinner();
                    // re-run display to show change in board
                    gameBoard.displayGameBoard(
                        currentPlayer,
                        playerOne,
                        playerTwo
                    );
                    if (
                        playerOne.getWinnerStatus() != false ||
                        playerTwo.getWinnerStatus() != false
                    ) {
                        // Skip switching turns. Exit as soon as there is a winner
                        return;
                    }

                    // Switch turn & play again if isWinner is false
                    currentPlayer.setTurn();
                    nextPlayer.setTurn();
                    playGame();
                } else {
                    console.log("Cell taken!");
                }
            });
        });
    };

    const startGame = () => {
        document.querySelector("#startBtn").addEventListener("click", () => {
            container.classList.remove("hidden");
            gameStartScreen.classList.add("hidden");
            setPlayerNames();
            // Play first round
            playGame();
        });
    };

    const resetGame = () => {
        gameBoard.resetGameBoard();
        container.classList.add("hidden");
        gameStartScreen.classList.remove("hidden");
        if (playerOne.getTurn() != true) {
            playerOne.setTurn();
        }
    };
    const playRound = () => {
        const { currentPlayer, nextPlayer } = getCurrentPlayer();
        gameBoard.displayGameBoard(currentPlayer, playerOne, playerTwo);
        getSelectedSquare(currentPlayer, nextPlayer);
    };

    const checkForWinner = () => {
        const currentBoard = gameBoard.getGameBoard();
        let rowOne = currentBoard[0];
        let rowTwo = currentBoard[1];
        let rowThree = currentBoard[2];

        let step = 0;

        // check row for winner
        for (let i = 0; i < currentBoard.length; i++) {
            //   console.log("Row Step: " + step);
            step++;

            // Check sum of each row
            const sumRow = currentBoard[i].reduce(
                (total, current) => total + current
            );
            //   console.log("Sum Row " + sumRow);

            if (sumRow === 3) {
                return playerOne.setWinnerStatus(true);
            } else if (sumRow === 12) {
                return playerTwo.setWinnerStatus(true);
            }
        }
        // reset step for next check
        step = 0;
        // Check columns
        for (let i = 0; i < currentBoard.length; i++) {
            //   console.log("Col Step: " + step);
            step++;

            let colArr = [rowOne[i], rowTwo[i], rowThree[i]];

            // check sum of each col
            const sumCol = colArr.reduce((total, current) => total + current);
            //   console.log("Sum Col " + sumCol);

            if (sumCol === 3) {
                return playerOne.setWinnerStatus(true);
            } else if (sumCol === 12) {
                return playerTwo.setWinnerStatus(true);
            }
        }

        // Check diagonals outside of loop as there are only 2 possible
        // 0,0 1,1 2,2
        // 0,2, 1,1 2,
        let diagonalOne = [rowOne[(0, 0)], rowTwo[(0, 1)], rowThree[(0, 2)]];
        let diagonalTwo = [rowOne[(0, 2)], rowTwo[(0, 1)], rowThree[(0, 0)]];
        // console.log(diagonalOne);
        // console.log(diagonalTwo);

        // Check Sum of each diagonal
        const sumDiagonalOne = diagonalOne.reduce(
            (total, current) => total + current
        );
        const sumDiagonalTwo = diagonalTwo.reduce(
            (total, current) => total + current
        );

        if (sumDiagonalOne === 3 || sumDiagonalTwo === 3) {
            return playerOne.setWinnerStatus(true);
        } else if (sumDiagonalOne === 12 || sumDiagonalTwo === 12) {
            return playerTwo.setWinnerStatus(true);
        }

        // Check for a Draw
        for (let cell = 0; cell < currentBoard.length; cell++) {
            for (let j = 0; j < currentBoard[cell].length; j++) {
                // If there are any zeros left on the board game is not over
                if (currentBoard[cell][j] === 0) {
                    return;
                }
            }
        }
        // If all checks failed, Board is full set both winStatus to true
        playerOne.setWinnerStatus(true);
        playerTwo.setWinnerStatus(true);
    };

    const playGame = () => {
        getCurrentPlayer();
        playRound();
    };

    // Start game
    startGame();

    return { resetGame };
})();
