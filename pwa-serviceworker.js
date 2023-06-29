var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
  '/pwa/',
  '/pwa/app.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin')
    return;
  console.log(event.request);

  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
  );
});