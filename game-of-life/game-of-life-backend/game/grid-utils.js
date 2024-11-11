const createGrid = (rows, cols) => Array.from({ length: rows },
     () => Array(cols).fill(0));

const generateRandomGrid = (rows, cols) => {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
    );
};

module.exports = { createGrid, generateRandomGrid };