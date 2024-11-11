const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { runGame } = require('./game/game-logic');
const { createGrid, generateRandomGrid } = require('./game/grid-utils');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let grid = createGrid(30, 50);

app.get('/api/grid', (req, res) => {
    res.json(grid);
});

app.post('/api/toggle', (req, res) => {
    const { row, col } = req.body;
    grid[row][col] = grid[row][col] === 1 ? 0 : 1;
    res.json(grid);
});

app.post('/api/randomize', (req, res) => {
    grid = generateRandomGrid(30, 50);
    res.json(grid);
});

app.post('/api/run', (req, res) => {
    grid = runGame(grid, () => {
        grid = createGrid(30, 50);
    });
    res.json(grid);
});

app.post('/api/clear', (req, res) => {
    grid = createGrid(30, 50);
    res.json(grid);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
