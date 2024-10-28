import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import axios from 'axios';

vi.mock('axios');

describe('App Component', () => {
    const gridData = [
        [0, 1, 0],
        [0, 0, 1],
        [1, 0, 0],
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('fetches grid data on mount', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: gridData });
        
        render(<App />);
        
        await waitFor(() => {
            const cells = screen.getAllByRole('cell');
            expect(cells).toHaveLength(9);
        });
    });

    it('displays error message when fetching grid fails', async () => {
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
        
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/failed to fetch grid/i)).toBeInTheDocument();
        });
    });

    it('toggles cell state when clicked', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: gridData });
        (axios.post as jest.Mock).mockResolvedValueOnce({ data: gridData });

        render(<App />);

        await waitFor(() => {
            const cellToClick = screen.getAllByRole('cell')[1];
            fireEvent.click(cellToClick);
            expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/toggle', { row: 0, col: 1 });
        });
    });

    it('randomizes the grid', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: gridData });
        (axios.post as jest.Mock).mockResolvedValueOnce({ data: gridData });
        
        render(<App />);

        const randomizeButton = screen.getByRole('button', { name: /randomize/i });
        fireEvent.click(randomizeButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/randomize');
            expect(screen.getByText(/grid has been randomized/i)).toBeInTheDocument();
        });
    });

    it('clears the grid', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: gridData });
        (axios.post as jest.Mock).mockResolvedValueOnce({ data: gridData });

        render(<App />);

        const clearButton = screen.getByRole('button', { name: /clear/i });
        fireEvent.click(clearButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/clear');
            expect(screen.getByText(/grid has been cleared/i)).toBeInTheDocument();
        });
    });

    it('starts and stops the game', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: gridData });
        
        render(<App />);

        const startButton = screen.getByRole('button', { name: /start/i });
        fireEvent.click(startButton);
        console.log(startButton); // Check what this returns

        await waitFor(() => {
            expect(screen.getByText(/stop/i)).toBeInTheDocument();
        })
    });

    it('displays message when all cells are dead', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: gridData });
        (axios.post as jest.Mock).mockResolvedValueOnce({ data: [[0, 0, 0], [0, 0, 0], [0, 0, 0]] });

        render(<App />);

        const startButton = screen.getByRole('button', { name: /start/i });
        fireEvent.click(startButton);

        await waitFor(() => {
            expect(screen.getByText(/all cells are dead/i)).toBeInTheDocument();
        });
    });
});
