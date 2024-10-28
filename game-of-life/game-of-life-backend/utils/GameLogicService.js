const countLiveNeighbors = (grid, row, col) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
                count += grid[newRow][newCol];
            }
        }
    }
    return count;
};

const runGame = (prevGrid, onAllDead) => {
    const newGrid = prevGrid.map(arr => [...arr]);
    let allDead = true;

    for (let row = 0; row < prevGrid.length; row++) {
        for (let col = 0; col < prevGrid[row].length; col++) {
            const liveNeighbors = countLiveNeighbors(prevGrid, row, col);

            if (prevGrid[row][col] === 1) {
                newGrid[row][col] = (liveNeighbors === 2 || liveNeighbors === 3) ? 1 : 0;
            } else {
                newGrid[row][col] = (liveNeighbors === 3) ? 1 : 0;
            }

           
            if (newGrid[row][col] === 1) {
                allDead = false;
            }
        }
    }

    if (allDead) {
        onAllDead();
    }

    return newGrid;
};


const generateRandomGrid = (rows, cols) => {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
    );
};

module.exports = { countLiveNeighbors, runGame, generateRandomGrid };
