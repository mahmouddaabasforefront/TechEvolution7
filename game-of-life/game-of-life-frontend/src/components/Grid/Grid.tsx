import React, { useEffect, useState } from 'react';
import './Grid.css';

interface GridProps {
    grid: number[][];
    running: boolean;
    toggleCell: (rowIndex: number, colIndex: number) => Promise<void>;
}

const Grid: React.FC<GridProps> = ({ grid, toggleCell }) => {
    const [currentGrid, setCurrentGrid] = useState(grid);

    useEffect(() => {
        setCurrentGrid(grid);
    }, [grid]);

    return (
        <div className="grid">
            {currentGrid.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {row.map((col, colIndex) => (
                        <div
                            key={colIndex}
                            role="cell"
                            className={`cell ${currentGrid[rowIndex][colIndex] ? 'alive' : ''}`}
                            onClick={() => toggleCell(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;
