export const createGrid = (rows, cols, amountOfObstacles) => {
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

  return grid;
};

export function removeObstacles(grid, x, y, cols) {
  if (!Array.isArray(grid)) {
    throw new Error('Grid must be an array');
  }
  for (let i = 0; i < grid.length; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;

    // Debe de haber una forma menos cochina para hacer esto, pero ahorita mi cerebro no funciona.
    if ((row === y && col === x) && grid[i] !== 0) {
      grid[i] = 3;
    }
    if ((row === y - 1 && col === x) && grid[i] !== 0) {
      grid[i] = 3;
    }
    if ((row === y + 1 && col === x) && grid[i] !== 0) {
      grid[i] = 3;
    }
    if ((row === y && col === x - 1) && grid[i] !== 0) {
      grid[i] = 3;
    }
    if ((row === y && col === x + 1) && grid[i] !== 0) {
      grid[i] = 3;
    }
  }
}

/* removeObstacles(grid, x, y, cols);
removeObstacles(grid, x - 1, y, cols);
removeObstacles(grid, x + 1, y, cols);
removeObstacles(grid, x, y - 1, cols);
removeObstacles(grid, x, y + 1, cols); */