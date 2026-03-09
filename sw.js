const CACHE = 'megabonk-v1';
const ASSETS = [
  '/megabonk-guide/',
  '/megabonk-guide/index.html',
  '/megabonk-guide/manifest.json',
  '/megabonk-guide/icon-192.png',
  '/megabonk-guide/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
