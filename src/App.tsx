import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  // create grid for the whole page
  const screenW = window.screen.width;
  const screenH = window.screen.height;
  const gridSize = 20;
  const grid = new Array(Math.floor(screenW / gridSize))
    .fill(0)
    .map(() => new Array(Math.floor(screenH / gridSize)).fill(0));

  const [gridState, setGridState] = useState(grid);

  const gameOfLife = () => {
    let newGrid = [...gridState.map((arr) => [...arr])];
    /**
     * Rules:
     * 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
     * 2. Any live cell with two or three live neighbours lives on to the next generation.
     * 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
     * 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
     *
     */
    for (let i = 0; i < gridState.length; i++) {
      for (let j = 0; j < gridState[i].length; j++) {
        let aliveNeighbours = 0;
        if (gridState[i - 1] && gridState[i - 1][j - 1]) {
          aliveNeighbours++;
        }
        if (gridState[i - 1] && gridState[i - 1][j]) {
          aliveNeighbours++;
        }
        if (gridState[i - 1] && gridState[i - 1][j + 1]) {
          aliveNeighbours++;
        }
        if (gridState[i][j - 1]) {
          aliveNeighbours++;
        }
        if (gridState[i][j + 1]) {
          aliveNeighbours++;
        }
        if (gridState[i + 1] && gridState[i + 1][j - 1]) {
          aliveNeighbours++;
        }
        if (gridState[i + 1] && gridState[i + 1][j]) {
          aliveNeighbours++;
        }
        if (gridState[i + 1] && gridState[i + 1][j + 1]) {
          aliveNeighbours++;
        }
        if (gridState[i][j] && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
          newGrid[i][j] = 0;
        }
        if (!gridState[i][j] && aliveNeighbours === 3) {
          newGrid[i][j] = 1;
        }
      }
    }

    setGridState(newGrid);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      gameOfLife();
    }, 700);
    return () => clearInterval(interval);
  }, [gridState]);

  useEffect(() => {
    // randomly fill the grid upto 20 cells
    const randomGrid = gridState.map((row, i) => {
      return row.map((col, j) => {
        return Math.random() > 0.80 ? 1 : 0;
      });
    });

    setGridState(randomGrid);
  }, []);

  return (
    <div className="App">
      {/* Print all the grid  all div */}
      {gridState.map((rows, i) =>
        rows.map((col, k) => (
          <div
            key={`${i}-${k}`}
            className="grid"
            style={{
              width: gridSize,
              height: gridSize,
              background: gridState[i][k]
                ? "linear-gradient(to right, #aaffa9, #11ffbd); "
                : undefined
            }}
          >
            {gridState[i][k] === 1 && gridState[i][k]}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
