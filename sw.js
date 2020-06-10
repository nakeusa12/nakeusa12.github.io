importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  new RegExp("/pages/detailteam.html"),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2"),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);

workbox.routing.registerRoute(
  new RegExp("/img/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "image",
  })
);
workbox.precaching.precacheAndRoute(
  [
    { url: "index.html", revision: "1" },
    { url: "nav.html", revision: "1" },
    { url: "css/materialize.min.css", revision: "1" },
    { url: "css/main.css", revision: "1" },
    { url: "js/materialize.min.js", revision: "1" },
    { url: "js/api.js", revision: "1" },
    { url: "js/nav.js", revision: "1" },
    { url: "js/database.js", revision: "1" },
    { url: "js/notification.js", revision: "1" },
    { url: "js/register-sw.js", revision: "1" },
    { url: "manifest.json", revision: "3" },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

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
