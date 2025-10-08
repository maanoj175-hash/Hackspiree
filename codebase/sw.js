// Simple service worker for offline caching (cache-first)
const CACHE_NAME = "gramvidya-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/student.html",
  "/schemes.html",
  "/events.html",
  "/teacher.html",
  "/style.css",
  "/script.js",
  "/student.js",
  "/teacher.js",
  "/sw.js",
  "/resources/numbers-basics.txt",
  "/resources/alphabet-letters.txt",
  "/resources/plants-guide.txt",
  "/assets/hero.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Serve from cache first, fallback to network
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((res) => {
          // Optionally cache new requests for same-origin
          if (
            event.request.method === "GET" &&
            event.request.url.startsWith(self.location.origin)
          ) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, res.clone()).catch(() => {});
            });
          }
          return res;
        })
        .catch(() => {
          // Fallback for navigation requests
          if (event.request.mode === "navigate")
            return caches.match("/index.html");
        });
    })
  );
});
