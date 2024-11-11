const { countLiveNeighbors, runGame } = require('../game/game-logic');

describe('countLiveNeighbors', () => {
    it('should count the correct number of live neighbors', () => {
        const grid = [
            [0, 1, 0],
            [1, 1, 0],
            [0, 0, 1]
        ];
        expect(countLiveNeighbors(grid, 1, 1)).toBe(3);
        expect(countLiveNeighbors(grid, 0, 0)).toBe(3);
        expect(countLiveNeighbors(grid, 2, 2)).toBe(1);
    });

    it('should handle grid boundaries correctly', () => {
        const grid = [
            [1, 0],
            [0, 1]
        ];
        expect(countLiveNeighbors(grid, 0, 0)).toBe(1);
        expect(countLiveNeighbors(grid, 1, 1)).toBe(1);
    });
});

describe('runGame', () => {
    it('should call onAllDead callback if all cells are dead', () => {
        const grid = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        const onAllDead = jest.fn();
        runGame(grid, onAllDead);
        expect(onAllDead).toHaveBeenCalled();
    });

    it('should not call onAllDead callback if there are live cells', () => {
        const grid = [
            [0, 1, 0],
            [1, 1, 0],
            [0, 0, 1]
        ];
        const onAllDead = jest.fn();
        runGame(grid, onAllDead);
        expect(onAllDead).not.toHaveBeenCalled();
    });
});