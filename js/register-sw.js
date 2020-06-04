function registerServiceWorker() {
  return navigator.serviceWorker
    .register("sw.js")
    .then(function (registration) {
      console.log("Registrasi service worker berhasil.");
      return registration;
    })
    .catch(function (err) {
      console.error("Registrasi service worker gagal.", err);
    });
}

if (!("serviceWorker" in navigator)) {
  console.log("Service worker tidak didukung browser ini.");
} else {
  registerServiceWorker();
  askForNPerm();
}
// Register service worker
