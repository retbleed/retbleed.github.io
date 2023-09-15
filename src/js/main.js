import { createGrid, removeObstacles } from './grid.js';
import { inputController } from './input.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let rows = 15;
let cols = 15;
let tileSize = 65;
var amountOfObstacles = 50;
var score = 0;
var playerLifes = 5;
var isPaused = false;

// let playerImg = new Image(); playerImg.src = "../media/sprites/wall.png";
let wallImg = new Image(); wallImg.src = "src/media/sprites/wall.png";
let breakableWallImg = new Image(); breakableWallImg.src = "src/media/sprites/breakable_wall.png";
let floorImg = new Image(); floorImg.src = "src/media/sprites/floor.png";
// const sound1 = new Audio("source/sound/luffyEatSound.mp3");

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
    return false;
  }
}

const grid = createGrid(rows, cols, amountOfObstacles);
let x;
let y;
for (let i = 0; i < grid.length; i++) {
  if (grid[i] === 1) {
    x = i % cols;
    y = Math.floor(i / cols);
    break;
  }
}
const player = new object(x, y, 'red', tileSize, null);
inputController(player, isPaused);

// removeObstacles(grid, x, y, cols, 3); // STATUS: BOMBA
// removeObstacles(grid, x, y, cols, 1); // STATUS: CLEAN

let walls = [];
let breakableWalls = [];
let floor = [];
let bombExp = [];

function update() {
  if (isPaused) { repaint(); window.requestAnimationFrame(update); return; }

  if (player.itCollides(grid, player.x, player.y)) {
    player.x = player.lastX;
    player.y = player.lastY;
  }

  player.lastX = player.x;
  player.lastY = player.y;

  repaint();
  window.requestAnimationFrame(update);
}

function repaint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      
      const cell = grid[i * cols + j];

      if (cell === 1) {
        floor.push(new object(j, i, null, tileSize, floorImg));
      } else if (cell === 2) {
        breakableWalls.push(new object(j, i, null, tileSize, breakableWallImg));
      } else if (cell === 3) {
        bombExp.push(new object(j, i, 'blue', tileSize));
      } else {
        walls.push(new object(j, i, null, tileSize, wallImg));
      }
    }
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

  player.paint(ctx);

  if (isPaused) {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Game Paused", 487, 487);
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