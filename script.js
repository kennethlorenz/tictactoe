function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }
  let rep = 0;
  const getBoard = () => board;
  const getRep = () => rep;

  const updateGameBoard = (mainArrayPosition, innerArrayPosition, letter) => {
    board[mainArrayPosition][innerArrayPosition] = letter;
  };

  return { updateGameBoard, getBoard };
}

function Cell() {
  let value = 0;

  // Accept a player's token to change the value of the cell
  const addToken = (player) => {
    value = player;
  };

  // How we will retrieve the current value of this cell through closure
  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

function DisplayController(playerOne = "x", playerTwo = "o") {
  const board = drawBoard();

  const players = [
    {
      name: playerOne,
      token: "x",
    },
    {
      name: playerTwo,
      token: "o",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;
}
