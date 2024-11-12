const cells = document.querySelectorAll('.cell');
const gameOverModal = document.getElementById('gameOverModal');
const gameOverMessage = document.getElementById('gameOverMessage');
const newGameButton = document.getElementById('newGameBtn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      gameOverMessage.textContent = `Player ${currentPlayer} Wins!`;
      gameOverModal.style.display = 'flex';
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameActive = false;
    gameOverMessage.textContent = 'It\'s a Draw!';
    gameOverModal.style.display = 'flex';
  }
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.cell;

  if (gameBoard[index] || !gameActive) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  gameOverModal.style.display = 'none';
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

newGameButton.addEventListener('click', resetGame);
