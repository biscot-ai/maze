import React, { useState, useEffect } from 'react';
import generateMaze from '../logic/mazeGenerator';

const Maze = ({ width, height, onPlayerMove, initialState, onInvalidMove, onWin }) => {
  const [maze, setMaze] = useState(initialState.maze || []);
  const [player, setPlayer] = useState(initialState.player);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    if (!initialState.maze) {
      const newMaze = generateMaze(width, height);
      setMaze(newMaze);
      onPlayerMove(player, newMaze);
    }
  }, [width, height, initialState.maze]);

  const movePlayer = (dx, dy) => {
    const newX = player.x + dx;
    const newY = player.y + dy;
    if (maze[newY] && maze[newY][newX] === 0) {
      const newPlayer = { x: newX, y: newY };
      setPlayer(newPlayer);
      onPlayerMove(newPlayer, maze);
      if (newX === width - 1 && newY === height - 2) {
        onWin();
      }
    } else {
      onInvalidMove();
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        movePlayer(0, -1);
        break;
      case 'ArrowDown':
        movePlayer(0, 1);
        break;
      case 'ArrowLeft':
        movePlayer(-1, 0);
        break;
      case 'ArrowRight':
        movePlayer(1, 0);
        break;
      default:
        break;
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0]);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) {
      return;
    }

    const touchEnd = e.touches[0];
    const dx = touchEnd.clientX - touchStart.clientX;
    const dy = touchEnd.clientY - touchStart.clientY;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        movePlayer(1, 0);
      } else {
        movePlayer(-1, 0);
      }
    } else {
      if (dy > 0) {
        movePlayer(0, 1);
      } else {
        movePlayer(0, -1);
      }
    }

    setTouchStart(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [player, maze]);

  return (
    <div
      className="maze"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {maze.map((row, y) => (
        <div key={y} className="maze-row">
          {row.map((cell, x) => (
            <div
              key={x}
              className={`maze-cell ${cell === 1 ? 'wall' : 'path'}`}
            >
              {player.x === x && player.y === y && <div className="player" />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
