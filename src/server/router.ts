import { createRouter } from './context'
import account from './routes/account'
import decks from './routes/decks'

export const appRouter = createRouter()
  .merge('account.', account)
  .merge('decks.', decks)

// export type definition of API
export type AppRouter = typeof appRouter
