import { createGrid, removeObstacles } from './grid.js';
import { inputController } from './input.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let rows = 15;
let cols = 15;
let tileSize = 65;
var amountOfObstacles = 50;

function updateVariables() {
  const ratio = canvas.width / canvas.height;
  rows = Math.round(rows * ratio);
  cols = Math.round(cols * ratio);
  tileSize = Math.round(tileSize * ratio);
}

updateVariables();

const grid = createGrid(rows, cols, amountOfObstacles);

let x = 9;
let y = 5;

removeObstacles(grid, x, y, cols);
/* removeObstacles(grid, x - 1, y, cols);
removeObstacles(grid, x + 1, y, cols);
removeObstacles(grid, x, y - 1, cols);
removeObstacles(grid, x, y + 1, cols); */

const character = {
  x: Math.floor(cols / 2),
  y: Math.floor(rows / 2),
  color: 'red',
  draw: function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
  }
};

inputController(character);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = grid[i * cols + j];
      if (cell === 1) {
        ctx.fillStyle = 'white';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
      } else if (cell === 2) {
        ctx.fillStyle = 'orange';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
      } else if (cell === 3) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
      }
      else {
        ctx.fillStyle = 'black';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
      }
    }
  }

  character.draw();
}

setInterval(draw, 1000 / 60);