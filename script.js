const playerX = 'X';
const playerO = 'O';
const tiles = document.querySelectorAll('.tile');
let turn = playerX;

const boardTile = Array(tiles.length);
boardTile.fill(null);

const strike = document.getElementById('strike');
const playAgain = document.getElementById('play-again');
const gameOver = document.getElementById('game-over-box');
const gameOverText = document.getElementById('game-over-text');
const startBtn = document.getElementById('startGame');
const startScreen = document.getElementById('startScreen');
const exitBtn = document.getElementById('exit');

startBtn.addEventListener('click', function () {
  strike.style.display = 'block';
  startScreen.style.display = 'none';
  strike.className = 'strike';
  gameOver.className = 'hidden';
  boardTile.fill(null);
  tiles.forEach((tile) => (tile.innerText = ''));
  turn = playerX;
});

exitBtn.addEventListener('click', function () {
  strike.style.display = 'none';
  startScreen.style.display = 'block';
});

playAgain.addEventListener('click', newGame);
tiles.forEach((tile) => tile.addEventListener('click', tileClick));

function tileClick(result) {
  if (gameOver.classList.contains('visible')) {
    return;
  }
  const tile = result.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText != '') {
    return;
  }

  if (turn === playerX) {
    tile.innerText = playerX;
    boardTile[tileNumber - 1] = playerX;
    turn = playerO;
  } else {
    tile.innerText = playerO;
    boardTile[tileNumber - 1] = playerO;
    turn = playerX;
  }
  checkWinner();
}

const winningTiles = [
  { winnerTile: [1, 2, 3], strikeClass: 'strike-row-1' },
  { winnerTile: [4, 5, 6], strikeClass: 'strike-row-2' },
  { winnerTile: [7, 8, 9], strikeClass: 'strike-row-3' },
  { winnerTile: [1, 4, 7], strikeClass: 'strike-column-1' },
  { winnerTile: [2, 5, 8], strikeClass: 'strike-column-2' },
  { winnerTile: [3, 6, 9], strikeClass: 'strike-column-3' },
  { winnerTile: [1, 5, 9], strikeClass: 'strike-diagonal-1' },
  { winnerTile: [3, 5, 7], strikeClass: 'strike-diagonal-2' },
];

function checkWinner() {
  for (const whoWins of winningTiles) {
    const winnerTile = whoWins.winnerTile;
    const strikeClass = whoWins.strikeClass;

    const tileValue1 = boardTile[winnerTile[0] - 1];
    const tileValue2 = boardTile[winnerTile[1] - 1];
    const tileValue3 = boardTile[winnerTile[2] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeClass);
      gameOverScreen(tileValue1);
      return;
    }
  }
  const allTilesFilled = boardTile.every((tile) => tile !== null);
  if (allTilesFilled) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = 'draw!';
  if (winnerText != null) {
    text = 'winner is ' + winnerText + '!';
  }
  gameOver.className = 'visible';
  gameOverText.innerText = text;
}

function newGame() {
  strike.className = 'strike';
  gameOver.className = 'hidden';
  boardTile.fill(null);
  tiles.forEach((tile) => (tile.innerText = ''));
  turn = playerX;
}
