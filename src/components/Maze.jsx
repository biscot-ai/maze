import React, { useState, useEffect } from 'react';
import './Maze.css';

function Maze({ maze, player, onMove, onWin }) {
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    if (player.x === maze[0].length - 1 && player.y === maze.length - 2) {
      onWin();
    }
  }, [player, maze, onWin]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        onMove(0, -1);
        break;
      case 'ArrowDown':
        onMove(0, 1);
        break;
      case 'ArrowLeft':
        onMove(-1, 0);
        break;
      case 'ArrowRight':
        onMove(1, 0);
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
        onMove(1, 0);
      } else {
        onMove(-1, 0);
      }
    } else {
      if (dy > 0) {
        onMove(0, 1);
      } else {
        onMove(0, -1);
      }
    }

    setTouchStart(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onMove]);

  if (!maze) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="maze"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      tabIndex="0"
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
}

export default Maze;
