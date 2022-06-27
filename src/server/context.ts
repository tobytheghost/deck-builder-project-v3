import * as trpc from '@trpc/server'
import nookies from 'nookies'
import { auth } from '@/firebase/admin'
import * as trpcNext from '@trpc/server/adapters/next'

// The app's context - is generated for each incoming request
export async function createContext (req: trpcNext.CreateNextContextOptions) {
  async function getUserFromHeader () {
    if (!req) return null
    const cookies = nookies.get(req)
    const token = await auth.verifyIdToken(cookies.token)
    return token
  }
  const token = await getUserFromHeader()

  return {
    token
  }
}
export type Context = trpc.inferAsyncReturnType<typeof createContext> | null

// Helper function to create a router with your app's context
export function createRouter () {
  return trpc.router<Context>()
}
