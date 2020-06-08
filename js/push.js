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
    "https://fcm.googleapis.com/fcm/send/e6hVdIHOS_g:APA91bFEI6jccQOWlowzBqTnsIX8cp21snxTQFfS5hiPzS9m6Ck1L9mOFEADo41j0cAA1f54S03OQvxMgZcrmIyNvRD6pNaoKNWLgalym-FKvt7CbWZsmOoCLvBkV2nszA6vJPtbpdzI",
  keys: {
    p256dh:
      "BAca9urs64PSxUJnOucAf4v+nG2HWsNS5loyRKQ236e3TZf3d3q3imqw0bAeZOx4qGhSbMt4u74gudISRUNGXu4=",
    auth: "Jdaje+Y9imsyTfI8B7efEw==",
  },
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "1030904292777",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
