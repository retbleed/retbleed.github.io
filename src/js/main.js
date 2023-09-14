import { createGrid } from './grid.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let rows = 15;
let cols = 15;
let tileSize = 65;
var amountOfObstacles = 50;

function updateVariables(newScreenWH) {
  const ratio = canvas.width / canvas.height;
  rows = Math.round(rows * ratio);
  cols = Math.round(cols * ratio);
  tileSize = Math.round(tileSize * ratio);
}

updateVariables(canvas.width);

const grid = createGrid(rows, cols, amountOfObstacles);

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const cell = grid[i * cols + j];
    if (cell === 1) {
      ctx.fillStyle = 'white';
      ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
    } else if (cell === 2) {
      ctx.fillStyle = 'orange';
      ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
    } else {
      ctx.fillStyle = 'black';
      ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
    }
  }
}