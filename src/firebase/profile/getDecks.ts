import { db } from '@/firebase/admin'
import safeJsonStringify from 'safe-json-stringify'
import { DeckStateTypes } from '@/contexts/DeckContext'
// import { getUserByUsername } from './getUser'

const getDecks = async (uid: string | null) => {
  if (!uid) return []
  const decksByUid = await getDecksByUid(uid)
  // if (!decksByUid.length) return await getDecksByUsername(uid)
  return decksByUid
}

const getDecksByUid = async (uid: string) => {
  try {
    const docRef = db
      .collection('decks')
      .where('user_id', '==', uid)
    const snapshot = await docRef.get()
    return snapshot.docs.map(doc => {
      return JSON.parse(
        safeJsonStringify(doc.data() as object)
      ) as DeckStateTypes
    }).filter(Boolean)
  } catch (error) {
    console.log(error)
    return []
  }
}

// export const getDecksByUsername = async (uid: string) => {
//   try {
//     const user = await getUserByUsername(uid)
//     if(!user) return []
//     const { user_id: userId } = user
//     const docRef = db
//       .collection('decks')
//       .where('user_id', '==', userId)
//     const snapshot = await docRef.get()
//     return snapshot.docs.map(doc => {
//       return JSON.parse(
//         safeJsonStringify(doc.data() as object)
//       ) as DeckStateTypes
//     }).filter(Boolean)
//   } catch (error) {
//     console.log(error)
//     return []
//   }
// }

export default getDecks
