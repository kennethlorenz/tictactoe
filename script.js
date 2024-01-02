function GameBoard() {
  const rows = 3;
  const columns = 3;
  let board = [];

  const createBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
  };

  createBoard();
  const getBoard = () => board;

  const isCellValid = (row, column) => {
    if (row > 2 || column > 2) {
      return false;
    }

    return true;
  };

  const isCellEmpty = (row, column) => {
    if (board[row][column].getValue() == 0) {
      return true;
    }

    return false;
  };

  const updateGameBoard = (row, column, player) => {
    board[row][column].addToken(player);
    return board;
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  const resetBoard = () => {
    board = [];
    createBoard();
  };

  return {
    getBoard,
    updateGameBoard,
    printBoard,
    isCellValid,
    isCellEmpty,
    board,
    resetBoard,
  };
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

function GameController(
  playerOneName = "Player X",
  playerTwoName = "Player O"
) {
  const board = GameBoard();
  const winningCombinations = [
    //by rows
    [board.board[0][0], board.board[0][1], board.board[0][2]],
    [board.board[1][0], board.board[1][1], board.board[1][2]],
    [board.board[2][0], board.board[2][1], board.board[2][2]],
    //by columns
    [board.board[0][0], board.board[1][0], board.board[2][0]],
    [board.board[0][1], board.board[1][1], board.board[2][1]],
    [board.board[0][2], board.board[1][2], board.board[2][2]],
    //diagonal
    [board.board[0][0], board.board[1][1], board.board[2][2]],
    [board.board[0][2], board.board[1][1], board.board[2][0]],
  ];
  let counter = 0;

  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const checkWinningCombination = (value) => {
    const winningRow = winningCombinations.map((row) =>
      row.map((cell) => cell.getValue() === value)
    );

    let checker = winningRow.filter((row) =>
      row.every((item) => item === true)
    );
    return checker;
  };

  const winnerFound = () => {
    if (
      checkWinningCombination("X").length == 1 ||
      checkWinningCombination("O").length == 1
    ) {
      return true;
    }
    return false;
  };

  const playRound = (row, column) => {
    counter += 1;

    //check if the console input cell is valid
    if (board.isCellValid(row, column) == false) {
      console.log("Invalid input, please try again");
      printNewRound();
      return;
    }

    //check if the selected cell is empty
    if (board.isCellEmpty(row, column) == false) {
      console.log("Cell already filled, please select another cell");
      printNewRound();
      return;
    }
    board.updateGameBoard(row, column, getActivePlayer().token);
    if (winnerFound() == true) {
      board.printBoard();
      board.resetBoard();
      console.log(`${getActivePlayer().name} WON!!!`);
      return;
    }

    // Drop a token for the current player
    console.log(
      `Dropping ${
        getActivePlayer().name
      }'s token into row: ${row} & column: ${column}...`
    );

    if (counter == 9) {
      board.printBoard();
      console.log("TIE MATCH");
      return;
    }

    // Switch player turn
    switchPlayerTurn();
    printNewRound();
  };

  // Initial play game message
  printNewRound();

  // For the console version, we will only use playRound, but we will need
  // getActivePlayer for the UI version, so I'm revealing it now
  return {
    playRound,
    getActivePlayer,
    winnerFound,
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const cells = document.querySelectorAll(".cell.empty");
  let activePlayer = game.getActivePlayer();
  playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
  let counter = 0;

  const haveAWinner = () => {
    if (game.winnerFound() == true) {
      return true;
    } else {
      return false;
    }
  };

  const checkTie = () => {
    if (counter == 9 && haveAWinner() == false) {
      playerTurnDiv.textContent = "Tie Match!";
      return;
    }
  };

  cells.forEach((cell) => {
    const updateCell = () => {
      counter += 1;
      if (haveAWinner() == true) {
        return;
      }
      let row = cell.dataset.row;
      let column = cell.dataset.column;
      cell.classList.remove("empty");
      cell.textContent = `${activePlayer.token}`;
      game.playRound(row, column);
      activePlayer = game.getActivePlayer();
      playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
      cell.removeEventListener("click", updateCell);
      checkTie();
      if (haveAWinner() == true) {
        playerTurnDiv.textContent = `${activePlayer.name} won!`;
        return;
      }
    };
    cell.addEventListener("click", updateCell);
  });
}

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.add("empty");
  });
  ScreenController();
});

ScreenController();
