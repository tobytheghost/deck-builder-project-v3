import { useEffect, useState } from 'react'
import { db } from '../firebase'

export const useDeckRating = (deckId: string) => {
  const [rating, setRating] = useState(0)
  const [numberOfRatings, setNumberOfRatings] = useState(0)

  useEffect(() => {
    if (!deckId) return
    const ratingQuery = db.collection('ratings').where('deck_id', '==', deckId)
    const unsubscribeRating = ratingQuery.onSnapshot(
      querySnapshot => {
        const docs = querySnapshot.docs
        const ratings = docs.map(doc => doc.data())
        const meanRating = ratings.reduce((prev, curr) => prev + curr['rating'], 0) / ratings.length
        setRating(meanRating)
        setNumberOfRatings(ratings.length)
      },
      err => console.error(err)
    )
    return () => unsubscribeRating()
  }, [deckId])

  return { rating, numberOfRatings }
}
