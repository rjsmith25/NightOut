const firebase = require('firebase');

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDR9lCXGdg5BdJyxz8MwrewG2WfZLgzOSs",
  authDomain: "night-out-8480f.firebaseapp.com",
  databaseURL: "https://night-out-8480f.firebaseio.com",
  projectId: "night-out-8480f",
  storageBucket: "night-out-8480f.appspot.com",
  messagingSenderId: "375414924496"
}

firebase.initializeApp(config);

const auth = firebase.auth();

module.exports = { auth }
