var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BHLEm8OJZjvyTsrsxKSvJQ1D1Te4Xbq-3zyK54aFvzq7MFj0Rg7pqQl1hXijpTEpNQqo4yaEWIjZk_nNsja1ynY",
  privateKey: "eDo0XDkAJh7GPuLm2fM3mkkCVSNlN7zHZv5_pDo5etA",
};

webPush.setVapidDetails(
  "mailto: snakeusa8@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/eUh9wkeUzWs:APA91bHAgjksaO60w4MlP9pvScTQQsXyNsm8PY2AqEWO2KURjFeO-0YgCRxojGCACKQcbv9aZ7XgaMjrEdbIkgWwVw-fpaxKMfFy5kv3wfaCXXm_ITL1xXW39FBfmD5F8EUmrKt4vjxi",
  keys: {
    p256dh:
      "BOhylRzktBLIpnP6etOtn0HzfWsp/92/tP0jPJWStZG95S/ADAU8Iy/OVDbcVjtlA25y45de5XEgFP55WcUotTw=",
    auth: "9oSdAXaO49V72nU4yll2Hw==",
  },
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "1030904292777",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
