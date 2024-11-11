import { useState, useEffect, useCallback } from 'react';
import { fetchGridApi, randomizeGrid, runGameApi, clearGridApi, toggleCellApi } from './services/ApiService';
import Grid from './components/Grid/Grid';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [message, setMessage] = useState<string>('');
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    fetchGrid(); // Fetch the grid when the component mounts
  }, []);

  const fetchGrid = async () => {
    try {
      const response = await fetchGridApi();
      setGrid(response.data);
      setMessage(''); // Clear any previous messages when fetching grid
    } catch (error) {
      console.error('Error fetching grid:', error);
      setMessage('Failed to fetch grid.'); // Set error message
    }
  };

  const handleAllDead = () => {
    setRunning(false);
    setMessage('All cells are dead!');
  };

  const randomize = async () => {
    try {
      await randomizeGrid();
      fetchGrid();
      setMessage('Grid has been randomized!');
    } catch (error) {
      console.error('Error randomizing grid:', error);
      setMessage('Failed to randomize grid.');
    }
  };

  const runGame = useCallback(async () => {
    try {
      const currentAliveCells = grid.flat().some((cell) => cell === 1);
  
      if (currentAliveCells) {
        const response = await runGameApi(grid);
        const newGrid = response.data;
        setGrid(newGrid);
  
        if (newGrid.flat().every((cell: number) => cell === 0)) {
          handleAllDead();
        }
      } else {
        handleAllDead();
      }
    } catch (error) {
      console.error('Error running game:', error);
      setMessage('Failed to run game.');
    }
  }, [grid]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (running) {
      intervalId = setInterval(runGame, 1000);
    }
    return () => clearInterval(intervalId);
  }, [runGame, running]);

  const clearGrid = async () => {
    try {
      const response = await clearGridApi();
      setGrid(response.data);
      setMessage('Grid has been cleared!');
    } catch (error) {
      console.error('Error clearing grid:', error);
      setMessage('Failed to clear grid.');
    }
  };

  const toggleCell = async (rowIndex: number, colIndex: number) => {
    try {
      await toggleCellApi(rowIndex, colIndex);
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map(arr => [...arr]);
        newGrid[rowIndex][colIndex] = newGrid[rowIndex][colIndex] === 1 ? 0 : 1;
        return newGrid;
      });
    } catch (error) {
      console.error('Error toggling cell:', error);
    }
  };

  const handleStart = async () => {
    if (!running) {
      await fetchGrid();
    }
    setRunning((prev) => !prev);
  };

  return (
    <>
      <div className="root">
        <div className="grid-div">
          <Grid grid={grid} running={running} toggleCell={toggleCell} />
          {message && <div className="message">{message}</div>}
        </div>
        <div className="footer-div">
          <Footer
            onStart={handleStart}
            running={running}
            onRandomize={randomize}
            onClear={clearGrid}
          />
        </div>
      </div>
    </>
  );
};

export default App;