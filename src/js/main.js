import { createGrid, removeObstacles } from './grid.js';
import { inputController } from './input.js';
/* import { object } from './object.js'; */

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

// Queria que Object fuera modulo pero ya no se que estoy haciendo, dios ayuda

class object {
  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
  }

  paint(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
  }
}

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

let totalFloor = [];
let walls = [];
let breakableWalls = [];
let floor = [];
let bombExp = [];

function draw() {

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

        walls.push(new object(j, i, 'black', tileSize));
        totalFloor.push('Estoy loco');
        /* ctx.fillStyle = 'black';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize); */

      }
    }
  }
}

draw();


// Esto es una cochinada terrible hermano, que perro asco
for (let i = 0; i < walls.length; i++) {
  walls[i].paint(ctx);
  // floor[i].paint(ctx);
  // breakableWalls[i].paint(ctx);
}

for (let i = 0; i < floor.length; i++) {
  // walls[i].paint(ctx);
  floor[i].paint(ctx);
  // breakableWalls[i].paint(ctx);
}

for (let i = 0; i < breakableWalls.length; i++) {
  // walls[i].paint(ctx);
  // floor[i].paint(ctx);
  breakableWalls[i].paint(ctx);
}

/* setInterval(draw, 1000 / 60); */