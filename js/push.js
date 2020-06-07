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
    "https://fcm.googleapis.com/fcm/send/f7Ctihm1hco:APA91bEgN9jzsjepkltHOt37mLM7OGIdkZ7LMnWgu46P3gVELmnEfe276Ixqspj2NVN2vXdsJd1nUeC6QcBZuyQ812zMBwdJYMkl7uxfoWZ3x1Xn-nsqTlWoh68y6HnPEuVfzocghKhg",
  keys: {
    p256dh:
      "BJMI+3uvDGJaoQeCYHiKYDFGEC7xAkju3VcCQPHlJ78YhFnVH4VS+mlj0y6VxXmlhYe0m9TqawNduQ1KtB1x+BE=",
    auth: "d22laD5tVkriRntD/SuQRQ==",
  },
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "1030904292777",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
