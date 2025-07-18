const CACHE_NAME = 'maze-game-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/App.css',
  '/src/index.css',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/components/Maze.jsx',
  '/src/components/Maze.css',
  '/src/logic/mazeGenerator.js',
  '/src/logic/storage.js',
  '/src/logic/SoundManager.js',
  '/src/assets/sounds/ambient.mp3',
  '/src/assets/sounds/move.mp3',
  '/src/assets/sounds/error.mp3',
  '/src/assets/sounds/success.mp3',
  '/vite.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
