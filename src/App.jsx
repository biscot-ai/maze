import React, { useEffect } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import useGameState from './logic/useGameState';
import soundManager from './logic/SoundManager';
import ambientSound from './assets/sounds/ambient.mp3';
import moveSound from './assets/sounds/move.mp3';
import errorSound from './assets/sounds/error.mp3';
import successSound from './assets/sounds/success.mp3';

function App() {
  const { gameState, startGame, resumeGame, shareMaze, movePlayer, nextLevel } = useGameState();

  useEffect(() => {
    soundManager.loadSound('ambient', ambientSound);
    soundManager.loadSound('move', moveSound);
    soundManager.loadSound('error', errorSound);
    soundManager.loadSound('success', successSound);
  }, []);

  const handleStart = () => {
    startGame();
    soundManager.playSound('ambient', true);
  };

  const handleResume = () => {
    resumeGame();
    soundManager.playSound('ambient', true);
  };

  const handleMove = (dx, dy) => {
    const moved = movePlayer(dx, dy);
    if (moved) {
      soundManager.playSound('move');
    } else {
      soundManager.playSound('error');
    }
  };

  const handleWin = () => {
    soundManager.stopSound('ambient');
    soundManager.playSound('success');
    setTimeout(() => {
      nextLevel();
      soundManager.playSound('ambient', true);
    }, 2000); // Attendre 2 secondes avant de passer au niveau suivant
  };

  return (
    <>
      {gameState.screen === 'home' && (
        <Home
          level={gameState.level}
          onStart={handleStart}
          onResume={handleResume}
          onShare={shareMaze}
        />
      )}
      {gameState.screen === 'game' && (
        <Game
          gameState={gameState}
          onMove={handleMove}
          onWin={handleWin}
        />
      )}
      <button className="mute-button" onClick={() => soundManager.toggleMute()}>
        Mute
      </button>
    </>
  );
}

export default App;
