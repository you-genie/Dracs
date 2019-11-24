import * as firebase from 'firebase';
import 'firebase/firestore'

export const config = {
  databaseURL: "https://cs473-dragcs.firebaseio.com",
  projectId: "cs473-dragcs",
}

firebase.initializeApp(config)

export const db = firebase.firestore()
