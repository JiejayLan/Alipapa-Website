var firebase = require("firebase");

const config = {
  apiKey: "AIzaSyAptktEUMMsGMBe2Xkn8N-5C15Q5byy67o",
  authDomain: "mini - ebymazon - test.firebaseapp.com",
  databaseURL: "https://mini-ebymazon-test.firebaseio.com",
  projectId: "mini - ebymazon - test",
  storageBucket: "mini - ebymazon - test.appspot.com",
  messagingSenderId: "53649890005"
};

firebase.initializeApp(config);

module.exports.database = firebase.database();
// module.exports.storage = firebase.storage();
module.exports.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
