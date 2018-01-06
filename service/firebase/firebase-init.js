import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDR9lCXGdg5BdJyxz8MwrewG2WfZLgzOSs",
    authDomain: "night-out-8480f.firebaseapp.com",
    databaseURL: "https://night-out-8480f.firebaseio.com",
    projectId: "night-out-8480f",
    storageBucket: "night-out-8480f.appspot.com",
    messagingSenderId: "375414924496"
};

var Firebase = firebase.initializeApp(config)

export  { Firebase };
