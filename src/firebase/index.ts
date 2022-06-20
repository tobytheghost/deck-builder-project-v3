import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBf09ynoZEuxO_-WKF-63q5OFO83o9VcvQ',
  authDomain: 'deck-builder-dev.firebaseapp.com',
  projectId: 'deck-builder-dev',
  storageBucket: 'deck-builder-dev.appspot.com',
  messagingSenderId: '1019549027130',
  appId: '1:1019549027130:web:62d95188ac3850a7f5de03',
  measurementId: 'G-6QVM05E798'
})

export type FirebaseUser = firebase.User
export type Timestamp = firebase.firestore.Timestamp
export const auth = app.auth()
export const db = app.firestore();
export default app
