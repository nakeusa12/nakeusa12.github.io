const webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BINLIMX_4dfKqHOdAajnt2-qeECpMSRrpXATSz503Qov8io9GBOZU45TJmHs76b4kjjf3Zgt3ZQqxuhdK_KMNNo",
  privateKey: "kio8t2-2jZMirvs6ocTY43kQHkPsCyZarq1GRfTcLIE",
};

webPush.setVapidDetails(
  "mailto: snakeusa8@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/fG1mba1O2fw:APA91bETkbAbU4uq3Rvxp0t6oVfVbZLAnXYLVy5QUKDJDDgHVIhahV3DdbjfTvtBMqf61vWdXqlQ1vH_M0v2hOukwmJfTFWLxI0YI2d0k58zwnN_-BsLVyHNa--1kuyvsQ1B4Q-XTgtE",
  keys: {
    p256dh:
      "BNGwjhraiJSUS+NXNQHWWgbhERuKFDUAe2jYFvrsr9/wZIq5UL3F3dQPHDW7B1S8on/B+7VF+vgy69SseDRHesA=",
    auth: "bN9ptoG7E4FrhrKg28u2eg==",
  },
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "1030904292777",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
