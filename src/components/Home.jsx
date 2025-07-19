import React from 'react';

function Home({ level, onResume, onShare }) {
  return (
    <div className="container">
      <div className="level-display">
        <p>Niveau</p>
        <span>{level}</span>
      </div>
      <button className="resume-button" onClick={onResume}>
        Reprendre
      </button>
      <button className="share-button" onClick={onShare}>
        Partager ce labyrinthe
      </button>
    </div>
  );
}

export default Home;
