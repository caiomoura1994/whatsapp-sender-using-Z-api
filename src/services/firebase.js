import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

const firebaseConfigCredentials = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

firebase.initializeApp(firebaseConfigCredentials);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
export const firebaseInstance = firebase;
