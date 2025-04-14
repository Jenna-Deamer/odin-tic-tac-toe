const gameBoard = (function () {
  let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
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
})(); // IIFE since I only need one instance of it!

const gameController = (function () {
  gameBoard.getGameBoard();
  //   gameBoard.printGameBoard();

  const getCurrentPlayer = () => {
    if (playerOne.getTurn() === true) {
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

  // Play a round
  const playRound = () => {
    let currentPlayer = getCurrentPlayer().currentPlayer;
    let nextPlayer = getCurrentPlayer().nextPlayer;

    console.log(
      "It's " + currentPlayer.name + " Turn " + currentPlayer.getTurn()
    );
    let marker = currentPlayer.getMarker();
    gameBoard.setGameBoard(marker, selectedCell, selectedRow);
    // Print updated board
    // gameBoard.printGameBoard();

    // Switch turn
    currentPlayer.setTurn();
    console.log("Switching turns...");
    nextPlayer.setTurn();
  };

  const playGame = () => {
    for (let i = 0; i < 3; i++) {
      console.log("Round " + i);

      getCurrentPlayer();
      playRound();
    }
  };
  return { playGame, getCurrentPlayer };
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
    if (!isTurn) {
      isTurn = true;
    } else {
      isTurn = false;
    }
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

// Create 2 players
const playerOne = createPlayer("Player 1", "X");
// Player one starts first
playerOne.setTurn();
const playerTwo = createPlayer("Player 2", "O");

// Start game
selectedCell = 0;
selectedRow = 1;
console.log("Before game start:");
console.log("P1 isTurn: " + playerOne.getTurn());
console.log("P2 isTurn: " + playerTwo.getTurn());
console.log("---------");

gameController.playGame();
console.log("---------");
console.log("After playGame:");
console.log("P1 isTurn: " + playerOne.getTurn());
console.log("P2 isTurn: " + playerTwo.getTurn());
