// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDjBxIRbOz8F4DsSVlHH8o_3P3jYoYbBZM",
  authDomain: "snapchat-eb7c6.firebaseapp.com",
  projectId: "snapchat-eb7c6",
  storageBucket: "snapchat-eb7c6.appspot.com",
  messagingSenderId: "509505212733",
  appId: "1:509505212733:web:a2929ec5d38c173a7d7554",
  measurementId: "G-2Y8844QC77",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
