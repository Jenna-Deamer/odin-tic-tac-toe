const gameBoard = (function () {
  let gameBoard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const getGameBoard = () => gameBoard;
  const setGameBoard = () => {
    gameBoard[selectedRow].splice(selectedCell,1,'X');
  };
  const printGameBoard = () => {
    console.log(gameBoard[0]);
    console.log(gameBoard[1]);
    console.log(gameBoard[2]);
  };

  return { getGameBoard, setGameBoard, printGameBoard };
})(); // IIFE since I only need one instance of it!

const gameController = (function () {
  gameBoard.getGameBoard();
  gameBoard.printGameBoard();

  // Play a round
  const playRound = (playerOne, playerTwo) => {
    // Determine whose turn it is
    if (playerOne.getTurn() === true) {
      console.log("It's " + playerOne.name + " turn.");
      // Push X to selected cell
      gameBoard.setGameBoard(playerOne, selectedCell, selectedRow);
      // Print updated game board
      gameBoard.printGameBoard();
      // switch turn
      playerOne.setTurn();
    } else {
      console.log("It's " + playerTwo.name + " turn.");
    }
  };
  return { playRound };
})();

// Player obj
const createPlayer = function (name, marker) {
  let isWinner = false;
  let isTurn = false;

  const getWinnerStatus = () => isWinner;
  const setWinnerStatus = () => {
    return (isWinner = true);
  };
  const getTurn = () => isTurn;

  const setTurn = () => {
    if (isTurn === true) {
      return (isTurn = false);
    } else {
      return (isTurn = true);
    }
  };

  return { name, marker, setTurn, getTurn, setWinnerStatus, getWinnerStatus };
};

// Create 2 players
const playerOne = createPlayer("Player 1", "X");
console.log(playerOne.name);
console.log(playerOne.marker);
console.log("It's player one's turn: " + playerOne.setTurn());
console.log("Has Won: " + playerOne.getWinnerStatus());

const playerTwo = createPlayer("Player 2", "O");
console.log(playerTwo.name);
console.log(playerTwo.marker);
console.log("It's player two's turn: " + playerTwo.getTurn());
console.log("Has Won: " + playerTwo.getWinnerStatus());

gameController.playRound(playerOne, playerTwo);
