import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

admin.firestore().settings({
  ignoreUndefinedProperties: true
})

export const createUserDocument = functions.auth.user().onCreate(user => {
  const userId = user.uid

  const account = {
    display_name: undefined,
    user_since: admin.firestore.Timestamp.fromDate(new Date()),
  }

  return admin.firestore().collection('users').doc(userId).set(account)
})
