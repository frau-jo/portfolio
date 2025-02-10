// service-worker.js
const cacheName = 'site-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',  // Example of custom CSS (if you have any)
  '/script.js'   // Example of custom JS (if you have any)
];

// Install the service worker and cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

// Activate the service worker and remove old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (!cacheWhitelist.includes(cache)) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch assets from cache, but update them in the background
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheResponse => {
      return (
        cacheResponse ||
        fetch(event.request).then(response => {
          // Cache the new file in the background
          return caches.open(cacheName).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
