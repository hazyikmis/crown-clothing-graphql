import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { FIREBASE_APIKEY } from "../.env.js";

const config = {
  apiKey: FIREBASE_APIKEY,
  authDomain: "king-clothing-db-421f1.firebaseapp.com",
  databaseURL: "https://king-clothing-db-421f1.firebaseio.com",
  projectId: "king-clothing-db-421f1",
  storageBucket: "king-clothing-db-421f1.appspot.com",
  messagingSenderId: "128440006845",
  appId: "1:128440006845:web:485560bdd5f9678e16dfd4",
  measurementId: "G-F9N3PG8F4B",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
