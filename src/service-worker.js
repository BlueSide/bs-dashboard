var CACHE_NAME = 'bs-dashboard-cache-v1';
var urlsToCache = [
    '/',
    '/inline.bundle.js',
    '/polyfills.bundle.js',
    '/scripts.bundle.js',
    '/styles.bundle.js',
    '/vendor.bundle.js',
    '/main.bundle.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
