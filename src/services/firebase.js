import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfigCredentials = {
  apiKey: 'AIzaSyB3PQKerykXWe7kRIyJhZ3sMVqqmHYU1sc',
  authDomain: 'zapei-chat.firebaseapp.com',
  projectId: 'zapei-chat',
  storageBucket: 'zapei-chat.appspot.com',
  messagingSenderId: '281169463444',
  appId: '1:281169463444:web:69c79667974b6e8c154c81',
  measurementId: 'G-QWNDKEKQFW'
};

firebase.initializeApp(firebaseConfigCredentials);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const firebaseInstance = firebase;
