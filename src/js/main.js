import { createGrid, removeObstacles } from './grid.js';
import { inputController } from './input.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const enemies = [];

let stepCounter = 0;
let rows = 15;
let cols = 15;
let tileSize = 65;
var amountOfObstacles = 50;
var score = 0;
var playerLifes = 5;
var amountOfEnemies = 5;
var isPaused = false;
let x;
let y;
let masterS2 = false;
let playerBombLocationX;
let playerBombLocationY;



let playerImg = new Image(); playerImg.src = "src/media/sprites/player.png";
let enemyImg = new Image(); enemyImg.src = "src/media/sprites/enemy.png";
let bombImg = new Image(); bombImg.src = "src/media/sprites/bomb.png";
let bombaImg = new Image(); bombaImg.src = "src/media/sprites/bombArea.png";
let wallImg = new Image(); wallImg.src = "src/media/sprites/wall.png";
let breakableWallImg = new Image(); breakableWallImg.src = "src/media/sprites/breakable_wall.png";
let floorImg = new Image(); floorImg.src = "src/media/sprites/floor.png";
const bgm = new Audio("src/media/sound/bgm.mp3"); bgm.volume = 0.2;
const playerDeath = new Audio("src/media/sound/death.mp3"); playerDeath.volume = 0.9;
const playerWin = new Audio("src/media/sound/win.mp3"); playerWin.volume = 0.9;
const playerMove = new Audio("src/media/sound/step.mp3"); playerMove.volume = 0.9;
const bombBoom = new Audio("src/media/sound/explosion.mp3"); bombBoom.volume = 0.9;

let seconds = 0;
let minutes = 0;
let hours = 0;

function startTimer() {
  setInterval(() => {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
    updateTimerDisplay();
  }, 1000);
}

startTimer();

function updateVariables() {
  const ratio = canvas.width / canvas.height;
  rows = Math.round(rows * ratio);
  cols = Math.round(cols * ratio);
  tileSize = Math.round(tileSize * ratio);
}

updateVariables();

// Queria que Object fuera modulo pero ya no se que estoy haciendo, dios ayuda

class object {
  constructor(x, y, color = null, size, image = null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.image = image;
    this.lastX = x;
    this.lastY = y;
  }

  paint(ctx) {
    if (this.image) {
      ctx.drawImage(this.image, this.x * this.size, this.y * this.size, this.size, this.size);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
  }

  itCollides(grid, x, y) {
    const index = y * cols + x;
    if (grid[index] === 0) {
      return true;
    }
    if (grid[index] === 2) {
      return true;
    }
    if (grid[index] === 3) {
      playerLifes--;
      return true;
    }
    return false;
  }

  checkCollisions(enemy) {
    if (this.x === enemy.x && this.y === enemy.y) {
      playerLifes--;
    }
  }

  move(grid, target) {
    const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    const validDirections = [];

    for (let i = 0; i < directions.length; i++) {
      const [dx, dy] = directions[i];
      const x = this.x + dx;
      const y = this.y + dy;
      const index = y * cols + x;

      if (x >= 0 && x < cols && y >= 0 && y < rows && grid[index] === 1) {
        validDirections.push(directions[i]);
      }
    }

    if (validDirections.length > 0 && Math.random() < 0.01) {
      const [dx, dy] = validDirections[Math.floor(Math.random() * validDirections.length)];
      const newX = this.x + dx;
      const newY = this.y + dy;

      if (newX === target.x && newY === target.y) {
        playerLifes--;
      } else {
        this.lastX = this.x;
        this.lastY = this.y;
        this.x = newX;
        this.y = newY;
      }
    }
  }
}

function restartApp() {
  location.reload();
}

function hasPlayerMoved(player) {
  /* playSound(playerMove); */
  return player.x !== player.lastX || player.y !== player.lastY;
}

function generateEnemies(amountOfEnemies, grid) {
  for (let i = 0; i < amountOfEnemies; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * cols);
      y = Math.floor(Math.random() * rows);
    } while (grid[y * cols + x] !== 1);

    enemies.push(new object(x, y, null, tileSize, enemyImg));
  }
}

const grid = createGrid(rows, cols, amountOfObstacles);


for (let i = 0; i < grid.length; i++) {
  if (grid[i] === 1) {
    x = i % cols;
    y = Math.floor(i / cols);
    break;
  }
}
generateEnemies(amountOfEnemies, grid)
const player = new object(x, y, null, tileSize, playerImg);
inputController(player, playerMove);

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyQ') {
    if (!masterS2) {
      playerBombLocationX = player.x;
      playerBombLocationY = player.y;
    }
    masterS2 = true;
  }
  if (event.code === 'KeyR') {
    restartApp();
  }
  if (event.code === 'KeyP') {
    isPaused = !isPaused;
  }
});

function update() {
  if (isPaused) { repaint(); window.requestAnimationFrame(update); return; }
  bgm.play();

  if (hasPlayerMoved(player) && stepCounter < 7 && masterS2) {
    stepCounter++;

    if (stepCounter == 5) {
      removeObstacles(grid, playerBombLocationX, playerBombLocationY, cols, 3);
      bombBoom.play();
      score += 50;
    } else if (stepCounter == 6) {
      removeObstacles(grid, playerBombLocationX, playerBombLocationY, cols, 1);
      stepCounter = 0;
      masterS2 = false;
    }
  }

  if (player.itCollides(grid, player.x, player.y)) {
    player.x = player.lastX;
    player.y = player.lastY;
  }
  player.lastX = player.x;
  player.lastY = player.y;

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move(grid, player);
  }

  repaint();
  window.requestAnimationFrame(update);
}

function drawText() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("SCORE: " + score, 20, 20);
  ctx.fillText("LIVES: " + playerLifes, 20, 40);
  ctx.fillText(`TIME: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`, 20, 60);
}

function repaint() {
  let walls = [];
  let breakableWalls = [];
  let floor = [];
  let bombExp = [];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      const cell = grid[i * cols + j];

      if (cell === 1) {
        floor.push(new object(j, i, null, tileSize, floorImg));
      } else if (cell === 2) {
        breakableWalls.push(new object(j, i, null, tileSize, breakableWallImg));
      } else if (cell === 3) {
        bombExp.push(new object(j, i, null, tileSize, bombaImg));
      } else {
        walls.push(new object(j, i, null, tileSize, wallImg));
      }
    }
  }

  let breakableWallsCount = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      const cell = grid[i * cols + j];

      if (cell === 2) {
        breakableWallsCount++;
      }
    }
  }

  function updateScore() {
    score = Math.abs(Math.floor(((breakableWallsCount / amountOfObstacles) * 100) - 100));
  }

  if (breakableWallsCount <= 0) {
    bgm.pause();
    playerWin.play();
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("YOU WON", canvas.width / 2, canvas.height / 2);
    ctx.fillText("PRESS 'R' TO RESTART", canvas.width / 2, (canvas.height / 2) - 50);
    return;
  } else {
    updateScore();
  }

  if (playerLifes <= 0) {
    
    playerDeath.play();
    bgm.pause();
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("YOU LOST", canvas.width / 2, canvas.height / 2);
    ctx.fillText("PRESS 'R' TO RESTART", canvas.width / 2, (canvas.height / 2) - 50);
    return;
  }

  // Esto es una cochinada terrible hermano, que perro asco
  for (let i = 0; i < walls.length; i++) {
    walls[i].paint(ctx);
  }

  for (let i = 0; i < floor.length; i++) {
    floor[i].paint(ctx);
  }

  for (let i = 0; i < breakableWalls.length; i++) {
    breakableWalls[i].paint(ctx);
  }

  for (let i = 0; i < bombExp.length; i++) {
    bombExp[i].paint(ctx);
  }

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].paint(ctx);
  }

  if (masterS2) {
    ctx.drawImage(bombImg, playerBombLocationX * tileSize, playerBombLocationY * tileSize, tileSize, tileSize);
  }

  player.paint(ctx);

  drawText();

  if (isPaused) {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Game Paused", canvas.width / 2, canvas.height / 2);
    return;
  }
}

function playSound(sound) {
  sound.pause();
  sound.currentTime = 0;
  sound.play();
}

window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 17);
    };
}());
window.requestAnimationFrame(update);