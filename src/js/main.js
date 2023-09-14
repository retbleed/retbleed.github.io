import { createGrid, removeObstacles } from './grid.js';
/* import { object } from './object.js'; */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let rows = 15;
let cols = 15;
let tileSize = 65;
var amountOfObstacles = 50;
var isPaused = false;

// let playerImg = new Image(); playerImg.src = "../media/sprites/wall.png";
let wallImg = new Image(); wallImg.src = "src/media/sprites/wall.png";
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
  }

  paint(ctx) {
    if (this.image) {
      ctx.drawImage(this.image, this.x * this.size, this.y * this.size, this.size, this.size);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
  }

  itCollides(target) {

    if (this.x < target.x + target.w &&
      this.x + this.w > target.x &&
      this.y < target.y + target.h &&
      this.y + this.h > target.y) {
      return true;
    }
    return false;
  }
}
const player = new object(0, 0, null, tileSize, null);
const grid = createGrid(rows, cols, amountOfObstacles);

// removeObstacles(grid, x, y, cols, 3); // STATUS: BOMBA
// removeObstacles(grid, x, y, cols, 1); // STATUS: CLEAN

// ya no se ocupa esta cochinada, pero por si acaso
/* removeObstacles(grid, x - 1, y, cols);
removeObstacles(grid, x + 1, y, cols);
removeObstacles(grid, x, y - 1, cols);
removeObstacles(grid, x, y + 1, cols); */

let totalFloor = [];
let walls = [];
let breakableWalls = [];
let floor = [];
let bombExp = [];


function update() {
  if (isPaused) { repaint(); window.requestAnimationFrame(update); return; }



  repaint();
  window.requestAnimationFrame(update);
}




function repaint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = grid[i * cols + j];
      if (cell === 1) {

        floor.push(new object(j, i, 'white', tileSize));
        totalFloor.push('Estoy loco');
        /* ctx.fillStyle = 'white';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize); */

      } else if (cell === 2) {

        breakableWalls.push(new object(j, i, 'orange', tileSize));
        totalFloor.push('Estoy loco');
        /* ctx.fillStyle = 'orange';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize); */

      } else if (cell === 3) {

        bombExp.push(new object(j, i, 'blue', tileSize));
        totalFloor.push('Estoy loco');
        /* ctx.fillStyle = 'blue';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize); */

      } else {

        walls.push(new object(j, i, null, tileSize, wallImg));
        totalFloor.push('Estoy loco');
        /* ctx.fillStyle = 'black';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize); */

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