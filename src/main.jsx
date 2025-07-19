import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('game-canvas')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
