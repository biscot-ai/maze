import { useState, useEffect } from 'react';
import generateMaze from './mazeGenerator';
import { saveState, loadState } from './storage';

const useGameState = () => {
  const [gameState, setGameState] = useState(() => {
    const savedState = loadState();
    if (savedState) {
      return savedState;
    }
    return {
      screen: 'home',
      level: 1,
      seed: 'initial-seed',
      maze: null,
      player: { x: 1, y: 1 },
    };
  });

  useEffect(() => {
    saveState(gameState);
  }, [gameState]);

  const startGame = () => {
    const newMaze = generateMaze(21, 21);
    setGameState(prev => ({
      ...prev,
      screen: 'game',
      maze: newMaze,
      player: { x: 1, y: 1 },
    }));
  };

  const resumeGame = () => {
    // Si le labyrinthe n'existe pas, en générer un nouveau
    if (!gameState.maze) {
      const newMaze = generateMaze(21, 21);
      setGameState(prev => ({
        ...prev,
        screen: 'game',
        maze: newMaze,
        player: { x: 1, y: 1 },
      }));
    } else {
      setGameState(prev => ({ ...prev, screen: 'game' }));
    }
  };

  const shareMaze = () => {
    const url = `${window.location.origin}?seed=${gameState.seed}`;
    navigator.clipboard.writeText(url);
    alert('Lien du labyrinthe copié dans le presse-papiers !');
  };

  const movePlayer = (dx, dy) => {
    const { maze, player } = gameState;
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (maze[newY] && maze[newY][newX] === 0) {
      setGameState(prev => ({ ...prev, player: { x: newX, y: newY } }));
      return true;
    }
    return false;
  };

  const nextLevel = () => {
    setGameState(prev => {
      const newLevel = prev.level + 1;
      const newMaze = generateMaze(21 + (newLevel - 1) * 2, 21 + (newLevel - 1) * 2);
      return {
        ...prev,
        level: newLevel,
        maze: newMaze,
        player: { x: 1, y: 1 },
      };
    });
  };

  return { gameState, startGame, resumeGame, shareMaze, movePlayer, nextLevel };
};

export default useGameState;
