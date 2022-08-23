import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

// penser a modifer les regles db, mettre en true pour pouvoir ecrire dans la db
import {getFirestore } from '@firebase/firestore';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-firebase-redux-96006.firebaseapp.com",
  projectId: "react-firebase-redux-96006",
  storageBucket: "react-firebase-redux-96006.appspot.com",
  messagingSenderId: "26503869675",
  appId: "1:26503869675:web:7427b336578f5cd5b67aae"
});


export const auth = app.auth();
export const db = getFirestore();
export default app;