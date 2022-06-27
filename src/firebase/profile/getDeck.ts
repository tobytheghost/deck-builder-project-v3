import { db } from '@/firebase/admin'
import safeJsonStringify from 'safe-json-stringify'
import { DeckStateTypes } from '@/contexts/DeckContext'

const getDeck = async (did: string | null) => {
  if (!did) return null
  return await getDeckByDid(did)
}

const getDeckByDid = async (did: string) => {
  try {
    const docRef = db.collection('decks').doc(did)
    const doc = await docRef.get()
    if (!doc.exists) return null
    return JSON.parse(
      safeJsonStringify({ ...(doc.data() as object), id: doc.id })
    ) as DeckStateTypes
  } catch (error) {
    console.log(error)
    return null
  }
}

export default getDeck
