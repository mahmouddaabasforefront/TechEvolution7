const { createGrid, generateRandomGrid } = require('../game/grid-utils');

describe('Grid Utils', () => {
    describe('createGrid', () => {
        it('should create a grid with the given number of rows and columns', () => {
            const rows = 3;
            const cols = 4;
            const grid = createGrid(rows, cols);
            expect(grid.length).toBe(rows);
            grid.forEach(row => {
                expect(row.length).toBe(cols);
                row.forEach(cell => {
                    expect(cell).toBe(0);
                });
            });
        });
    });

    describe('generateRandomGrid', () => {
        it('should create a grid with the given number of rows and columns', () => {
            const rows = 3;
            const cols = 4;
            const grid = generateRandomGrid(rows, cols);
            expect(grid.length).toBe(rows);
            grid.forEach(row => {
                expect(row.length).toBe(cols);
            });
        });

        it('should create a grid with cells containing either 0 or 1', () => {
            const rows = 3;
            const cols = 4;
            const grid = generateRandomGrid(rows, cols);
            grid.forEach(row => {
                row.forEach(cell => {
                    expect([0, 1]).toContain(cell);
                });
            });
        });
    });
});