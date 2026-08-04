const CACHE_NAME = 'pack-designer-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install Event - Caches App Files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Fetch Event - Serve Files from Cache Offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
