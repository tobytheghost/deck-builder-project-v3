import { createRouter } from './context'
import posts from './routes/posts'
import gets from './routes/gets'

export const appRouter = createRouter()
  .merge('get.', gets)
  .merge('post.', posts)

// export type definition of API
export type AppRouter = typeof appRouter
