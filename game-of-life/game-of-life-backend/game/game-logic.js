const countLiveNeighbors = (grid, row, col) => {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    let count = 0;

    for (let [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
            count += grid[newRow][newCol];
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
                // Rule 1 and 3: Any live cell with fewer than two or more than three live neighbors dies.
                newGrid[row][col] = (liveNeighbors === 2 || liveNeighbors === 3) ? 1 : 0;
            } else {
                // Rule 4: Any dead cell with exactly three live neighbors becomes a live cell.
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

module.exports = { countLiveNeighbors, runGame };