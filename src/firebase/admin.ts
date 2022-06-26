import * as firebaseAdmin from 'firebase-admin'
import 'firebase-admin/firestore'

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL
    }),
    databaseURL: 'https://deck-builder-v3.firebaseio.com'
  })
}

export const auth = firebaseAdmin.auth()
export const db = firebaseAdmin.firestore()