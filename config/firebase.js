var service = require('./firebase.json');
var admin = require('firebase-admin');
module.exports.config = {
  apiKey: "AIzaSyBP4u7T-4VQCAXs5aT9jOghnb4VjeO4Aoo",
  authDomain: "cimerangfarm-421db.firebaseapp.com",
  databaseURL: "https://cimerangfarm-421db.firebaseio.com",
  storageBucket: "gs://cimerangfarm-421db.appspot.com",
};
module.exports.admin = {
  credential: admin.credential.cert(service),
  databaseURL: "https://cimerangfarm-421db.firebaseio.com"
};
