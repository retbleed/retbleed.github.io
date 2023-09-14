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