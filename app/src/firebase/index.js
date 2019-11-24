import * as firebase from 'firebase';

export const config = {
  apiKey: "AIzaSyBKds9tp3vQQv6pku4uH_3GF_wT0SbnceA",
  authDomain: "cs473-dragcs.firebaseapp.com",
  databaseURL: "https://cs473-dragcs.firebaseio.com",
  projectId: "cs473-dragcs",
  storageBucket: "cs473-dragcs.appspot.com",
  messagingSenderId: "196046389565",
  appId: "1:196046389565:web:1beb481711024caa4dc554",
  measurementId: "G-MSPMJ6PFN0"
}

firebase.initializeApp(config)

export const db = firebase.database()
