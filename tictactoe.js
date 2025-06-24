const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const cells = document.querySelectorAll('.cell');

const X = 'X';
const O = 'O';
let turn = X;

const WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function startGame() {
  turn = X;
  statusText.textContent = `${turn}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  cell.textContent = turn;
  cell.classList.add(turn);

  if (checkWin(turn)) {
    statusText.textContent = `The Winner is ${turn} !`;
    endGame();
  } else if (isDraw()) {
    statusText.textContent = `It's a draw!`;
  } else {
    turn = turn === X ? O : X;
    statusText.textContent = `${turn}'s turn`;
  }
}

function checkWin(current) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === current;
    });
  });
}

function isDraw() {
  return [...cells].every(cell =>
    cell.textContent === X || cell.textContent === O
  );
}

function endGame() {
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

restartBtn.addEventListener('click', startGame);
startGame();