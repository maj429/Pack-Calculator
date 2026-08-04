const CACHE_NAME = 'pack-designer-v2'; // <--- Bump this number (v2, v3, v4...) every time you update code!
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install Event - Cache New Files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event - DELETE OLD CACHES AUTOMATICALLY
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Clears out old cached HTML/JS
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch Event - Serve Files from Cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
