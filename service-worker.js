const CACHE_NAME = "winplay-v1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/ranks.html",
  "/pages/teams.html",
  "/pages/favorite.html",
  "/css/materialize.min.css",
  "/css/main.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/register-sw.js",
  "/img/logo.png",
  "/img/icon512px.png",
  "/img/favicon16x16.png",
  "/img/arrow.svg",
  "/img/jumbtron-home.jpg",
  "/manifest.json",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
