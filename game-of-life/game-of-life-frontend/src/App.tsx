// src/App.tsx
import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Grid from './components/Grid/Grid';
import axios from 'axios';

function App() {
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState('');
  const [grid, setGrid] = useState<number[][]>([]);

  useEffect(() => {
    fetchGrid();
  }, []);

  useEffect(() => {
    let intervalId: number;

    if (running) {
      intervalId = window.setInterval(async () => {
        await runGame();
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [running]);

  const fetchGrid = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/grid');
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

  const randomizeGrid = async () => {
    try {
      await axios.post('http://localhost:5000/api/randomize');
      fetchGrid();
      setMessage('Grid has been randomized!');
    } catch (error) {
      console.error('Error randomizing grid:', error);
      setMessage('Failed to randomize grid.');
    }
  };

  const runGame = async () => {
    try {
        const currentAliveCells = grid.flat().some((cell) => cell === 1);
        
        if (currentAliveCells) {
            const response = await axios.post('http://localhost:5000/api/run', { grid });
            const newGrid = response.data;
            setGrid(newGrid);

            // Check if the new grid has any alive cells
            if (newGrid.flat().every((cell: number) => cell === 0)) {
                console.log("No alive cells found after running the game.");
                handleAllDead(); // Call here when there are no alive cells
            }
        } else {
            console.log("No alive cells before running the game.");
            handleAllDead();
        }
    } catch (error) {
        console.error('Error running game:', error);
        setMessage('Failed to run game.');
    }
};


  const clearGrid = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/clear');
      setGrid(response.data);
      setMessage('Grid has been cleared!');
    } catch (error) {
      console.error('Error clearing grid:', error);
      setMessage('Failed to clear grid.');
    }
  };

  const toggleCell = async (rowIndex: number, colIndex: number) => {
    try {
      await axios.post('http://localhost:5000/api/toggle', { row: rowIndex, col: colIndex });
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
            onRandomize={randomizeGrid}
            onClear={clearGrid}
          />
        </div>
      </div>
    </>
  );
}

export default App;
