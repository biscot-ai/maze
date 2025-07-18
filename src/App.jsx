import React, { useState, useEffect } from 'react';
import './App.css';
import Maze from './components/Maze';
import './components/Maze.css';
import { saveState, loadState } from './logic/storage';
import soundManager from './logic/SoundManager';
import ambientSound from './assets/sounds/ambient.mp3';
import moveSound from './assets/sounds/move.mp3';
import errorSound from './assets/sounds/error.mp3';
import successSound from './assets/sounds/success.mp3';


function App() {
  const [gameState, setGameState] = useState(loadState() || {
    level: 1,
    seed: 'initial-seed',
    player: { x: 1, y: 1 },
    maze: null,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    soundManager.loadSound('ambient', ambientSound);
    soundManager.loadSound('move', moveSound);
    soundManager.loadSound('error', errorSound);
    soundManager.loadSound('success', successSound);
  }, []);

  useEffect(() => {
    saveState(gameState);
  }, [gameState]);

  const handleResume = () => {
    setIsPlaying(true);
    soundManager.playSound('ambient', true);
  };

  const handleShare = () => {
    const url = `${window.location.origin}?seed=${gameState.seed}`;
    navigator.clipboard.writeText(url);
    alert('Lien du labyrinthe copié dans le presse-papiers !');
  };

  const handlePlayerMove = (player, maze) => {
    setGameState({ ...gameState, player, maze });
    soundManager.playSound('move');
  };

  const handleInvalidMove = () => {
    soundManager.playSound('error');
  };

  const handleWin = () => {
    soundManager.playSound('success');
  };

  if (isPlaying) {
    return <Maze
            width={21}
            height={21}
            onPlayerMove={handlePlayerMove}
            initialState={gameState}
            onInvalidMove={handleInvalidMove}
            onWin={handleWin}
          />;
  }

  return (
    <div className="container">
      <div className="level-display">
        <p>Niveau</p>
        <span>{gameState.level}</span>
      </div>
      <button className="resume-button" onClick={handleResume}>
        Reprendre
      </button>
      <button className="share-button" onClick={handleShare}>
        Partager ce labyrinthe
      </button>
      <button className="mute-button" onClick={() => soundManager.toggleMute()}>
        Mute
      </button>
    </div>
  );
}

export default App;
