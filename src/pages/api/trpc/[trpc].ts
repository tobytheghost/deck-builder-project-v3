import { appRouter } from '@/backend/router'
import { createContext } from '@/backend/context'
import * as trpcNext from '@trpc/server/adapters/next'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext
})