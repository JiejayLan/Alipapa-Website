import * as firebase from 'firebase';

// require('dotenv').config();
// console.log('config',process.env.FIREBASE_API_KEY);

const config = {
  apiKey: "AIzaSyAptktEUMMsGMBe2Xkn8N-5C15Q5byy67o",
  authDomain: "mini-ebymazon-test.firebaseapp.com",
  databaseURL: "https://mini-ebymazon-test.firebaseio.com",
  projectId: "mini-ebymazon-test",
  storageBucket: "mini-ebymazon-test.appspot.com",
  messagingSenderId: "53649890005"
};

firebase.initializeApp(config);

const database = firebase.database();
const storage = firebase.storage();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase,storage, googleAuthProvider, database };



