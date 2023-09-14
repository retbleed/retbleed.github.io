import { createGrid, removeObstacles } from './grid.js';
import { inputController } from './input.js';
import { object } from './object.js';

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

// removeObstacles(grid, x, y, cols, 3); // STATUS: BOMBA
// removeObstacles(grid, x, y, cols, 1); // STATUS: CLEAN

// ya no se ocupa esta cochinada, pero por si acaso
/* removeObstacles(grid, x - 1, y, cols);
removeObstacles(grid, x + 1, y, cols);
removeObstacles(grid, x, y - 1, cols);
removeObstacles(grid, x, y + 1, cols); */

let walls = [];

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = grid[i * cols + j];
      if (cell === 1) {

        walls.push(new object(j, i, 'white', tileSize));
        /* ctx.fillStyle = 'white';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize); */

      } else if (cell === 2) {

        walls.push(new object(j, i, 'orange', tileSize));
        /* ctx.fillStyle = 'orange';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize); */

      } else if (cell === 3) {

        walls.push(new object(j, i, 'blue', tileSize));
        /* ctx.fillStyle = 'blue';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize); */

      } else {

        walls.push(new object(j, i, 'black', tileSize));
        /* ctx.fillStyle = 'black';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize); */

      }
    }
  }
}

draw();

for (var i = walls.length - 1; i >= 0; i--) {
  walls[i].paint(ctx);
}

/* setInterval(draw, 1000 / 60); */