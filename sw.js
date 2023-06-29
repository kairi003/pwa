var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    '/pwa/',
    '/pwa/app.js',
];

self.addEventListener('install', event => {
    event.waitUntil(caches
        .open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(caches
        .match(event.request)
        .then(function(response) {
            return response ? response : fetch(event.request);
        })
    );
});