const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let screenWH = canvas.width;
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


function calcObstacles(x) {
  return x + 1;
}

const grid = [];
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    if (i == 0 || j == 0 || j == cols - 1 || i == rows - 1) {
      grid.push(0);
    } else if ((i % 2 === 0 && j % 2 === 0) && (i !== 0 && j !== 0 && i !== rows - 1 && j !== cols - 1)) {
      grid.push(0);
    } else {
      grid.push(1);
    }
  }
}

do {
  let randomIndex = Math.floor(Math.random() * grid.length);
  while (grid[randomIndex] !== 1) {
    randomIndex = Math.floor(Math.random() * grid.length);
  }
  grid[randomIndex] = 2;
  amountOfObstacles--;
} while (amountOfObstacles > 0);

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