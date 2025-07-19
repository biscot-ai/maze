import React from 'react';
import Maze from './Maze';

function Game({ gameState, onMove, onWin }) {
  return (
    <div>
      <Maze
        maze={gameState.maze}
        player={gameState.player}
        onMove={onMove}
        onWin={onWin}
      />
    </div>
  );
}

export default Game;
