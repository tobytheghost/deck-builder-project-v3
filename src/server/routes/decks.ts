import getDecks from '@/firebase/profile/getDecks'
import { z } from 'zod'
import { createRouter } from '../context'

const decks = createRouter()
  .query('get', {
    input: z.object({
      uid: z.string().nullish()
    }),
    async resolve ({ ctx, input }) {
      if (!ctx) return { success: false, message: 'Unauthorized - ctx' }
      const { token } = ctx
      if (!token) return { success: false, message: 'Unauthorized - token' }
      const decks = await getDecks(input.uid || token.uid)
      return { success: true, message: 'Success', decks }
    }
  })

export default decks
