import { db } from '@/firebase/admin'
import getUser, { getUserByUsername } from '@/firebase/profile/getUser'
import { z } from 'zod'
import { createRouter } from '../context'

const account = createRouter()
  .query('get', {
    input: z.object({
      uid: z.string().nullish()
    }),
    async resolve ({ ctx, input }) {
      if (!ctx) return { success: false, message: 'Unauthorized - ctx' }
      const { token } = ctx
      if (!token) return { success: false, message: 'Unauthorized - token' }
      const { uid } = token
      const user = await getUser(uid === input.uid ? input.uid : uid)
      return { success: true, message: 'Success', user }
    }
  })
  .mutation('update', {
    input: z.object({
      display_name: z.string()
    }),
    async resolve ({ ctx, input }) {
      if (!ctx) return { success: false, message: 'Unauthorized - ctx' }
      const { token } = ctx
      if (!token) return { success: false, message: 'Unauthorized - token' }
      const { uid } = token
      const { display_name } = input
      const user = await getUserByUsername(display_name)
      if (user && user.user_id !== uid) {
        return { success: false, message: 'User already exists' }
      }
      db.collection('users')
        .doc(uid)
        .update({ display_name })
      return { success: true, message: 'Updated display name' }
    }
  })

export default account
