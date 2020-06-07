var CACHE_NAME = "winplay-v1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/ranks.html",
  "/pages/topscore.html",
  "/pages/favorite.html",
  "/pages/detailteam.html",
  "/css/materialize.min.css",
  "/css/main.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/database.js",
  "/js/notification.js",
  "/js/register-sw.js",
  "/manifest.json",
  "/img/arrow.svg",
  "/img/favicon16x16.png",
  "/img/icon512px.png",
  "/img/icon192px.png",
  "/img/logo.png",
  "/img/jumbtron-home.jpg",
  "/img/image-rank.jpg",
  "/img/image-team.jpg",
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

// const base_url = "https://api.football-data.org/";
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          return response;
        }
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(function (response) {
          if (!response || response.status !== 200) {
            return response;
          }
          var responseToCache = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
  );
});

self.addEventListener("push", (event) => {
  const options = {
    body: "This notification was generated from a push!",
    icon: "",
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "1",
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
