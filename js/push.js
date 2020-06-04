var webPush = require("web-push");

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
    "https://fcm.googleapis.com/fcm/send/eeUq4aO_n_g:APA91bGURs0ELqT_iJXg1Reim8HTY5h3_EHiQSPx2BrKx209iSzoDk56Gs3EZrPTaglJd3wZcVc4A4__meAYvhHzAttoo4NrUlY6Bdohzpht8P09TsLNOnT9dKhpaY6IjARaRj6R2gXd",
  keys: {
    p256dh:
      "BARvMJlJW4IY19+XTYm6LEXGDe1FfvmQfSqX7Io4JQF+qhyxX0Pfp/MoOn7o2l3gpwYm+d2QofWPjK8SyhhQffI=",
    auth: "LNTFs9iPGtguMUj/VEh0rQ==",
  },
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "1030904292777",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
