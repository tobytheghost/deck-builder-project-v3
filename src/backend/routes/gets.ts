import { z } from "zod"
import { createRouter } from "../context"

const gets = createRouter().query('hello', {
  input: z
    .object({
      text: z.string().nullish()
    })
    .nullish(),
  resolve ({ input }) {
    return {
      greeting: `Hello, ${input?.text ?? 'world!'}`
    }
  }
})

export default gets