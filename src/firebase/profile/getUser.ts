import { db } from '@/firebase/admin'
import { UserStateType } from '@/contexts/ProfileContext'
import safeJsonStringify from 'safe-json-stringify'

const getUser = async (uid: string | null) => {
  if (!uid) return null
  return await getUserByUid(uid)
}

const getUserByUid = async (uid: string) => {
  try {
    const docRef = db.collection('users').doc(uid)
    const doc = await docRef.get()
    if (!doc.exists) return null
    return JSON.parse(
      safeJsonStringify({ ...(doc.data() as object), user_id: doc.id })
    ) as UserStateType
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getUserByUsername = async (uid: string) => {
  try {
    const docRef = db
      .collection('users')
      .where('display_name', '==', uid)
      .limit(1)
    const snapshot = await docRef.get()
    const [user] = snapshot.docs.map(doc => {
      return JSON.parse(
        safeJsonStringify({ ...(doc.data() as object), user_id: doc.id })
      ) as UserStateType
    })
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export default getUser
