var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BMEM95fb8vOIyeqLRBl_xtRM53G5heHxLyZb7ZGPdRbOWazcdGV6Vcp79_RqjJbe9BqhnrxgcAAoj_7TK3h7OpQ",
  privateKey: "Cs_Zc8cUTnICHbZ-_VA530axSbFyCN3YwK443F-lT6E",
};

webPush.setVapidDetails(
  "mailto: snakeusa8@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/f1ouUn5PlTU:APA91bHiDzGrMQ39ARO0vdJRW_LqXiiF_ffuXxMunsRa0muZLKFo5DRqKe9ymtpmRSbyDd1FWvCJc9K8kgnQjx9SUT11BW7jfTLNmfMM2FBeeTFJk9vlHxbzItPGolWXbzxZztuGbv4X",
  keys: {
    p256dh:
      "BIvdqYqF3pAnIQ+WJZbXzBRMKm9MnGFjb5/Vom0gpaEixfPXYt+RbHDTcQbuVkC9E40PVnyR0+uyNxuKRiZwDQQ=",
    auth: "a8+waqIhTzFF5xMNSZpH9g==",
  },
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "1030904292777",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
