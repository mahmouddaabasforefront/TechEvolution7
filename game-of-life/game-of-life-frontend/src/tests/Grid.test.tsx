import { render, screen, fireEvent } from '@testing-library/react';
import Grid from '../components/Grid/Grid';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Grid Component', () => {
    const initialGrid = [
        [0, 1, 0],
        [0, 0, 1],
        [1, 0, 0],
    ];

    const toggleCellMock = vi.fn();

    it('renders the grid with the correct number of cells', () => {
        render(
            <Grid 
                grid={initialGrid} 
                running={false} 
                toggleCell={toggleCellMock} 
            />
        );

        const cells = screen.getAllByRole('cell');
        expect(cells).toHaveLength(9);
    });

    it('renders alive cells correctly', () => {
        render(
            <Grid 
                grid={initialGrid} 
                running={false} 
                toggleCell={toggleCellMock} 
            />
        );

        const aliveCells = screen.getAllByRole('cell').filter(cell => cell.classList.contains('alive'));
        expect(aliveCells).toHaveLength(3);
    });

    it('calls toggleCell with correct arguments on cell click', () => {
        render(
            <Grid 
                grid={initialGrid} 
                running={false} 
                toggleCell={toggleCellMock} 
            />
        );

        const cellToClick = screen.getAllByRole('cell')[1];
        fireEvent.click(cellToClick);

        expect(toggleCellMock).toHaveBeenCalledWith(0, 1);
        expect(toggleCellMock).toHaveBeenCalledTimes(1);
    });

    it('updates the grid when the grid prop changes', () => {
        const { rerender } = render(
            <Grid 
                grid={initialGrid} 
                running={false} 
                toggleCell={toggleCellMock} 
            />
        );

        const newGrid = [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ];

        rerender(
            <Grid 
                grid={newGrid} 
                running={false} 
                toggleCell={toggleCellMock} 
            />
        );

        const aliveCells = screen.getAllByRole('cell').filter(cell => cell.classList.contains('alive'));
        expect(aliveCells).toHaveLength(3);
    });
});
