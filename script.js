function Gameboard() {
  const board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const getBoard = () => board;

  const updateGameBoard = (selectedCell, letter) => {
    let outerArr = board.findIndex((row) => row.includes(selectedCell));
    let innerArr = board[outerArr].findIndex((item) => item == selectedCell);
    board[outerArr][innerArr] = letter;
    return board;
  };

  return { updateGameBoard, getBoard, board };
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
