import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAxyC76nMvgNn0RT__QzNUpBuXRmkDdfWM",
  authDomain: "todo-app-613d8.firebaseapp.com",
  databaseURL: "https://todo-app-613d8.firebaseio.com",
  projectId: "todo-app-613d8",
  storageBucket: "todo-app-613d8.appspot.com",
  messagingSenderId: "841751414852",
  appId: "1:841751414852:web:f7a20ff7030b7534285411",
  measurementId: "G-JYV7RRWZCV",
});

const db = firebaseApp.firestore();
export default db;
