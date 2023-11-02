import { z } from "zod"

import { procedure, router } from "./trpc"

export const appRouter = router({
  getData: procedure.query(async () => {
    return {
      status: 200,
      data: "joy"
    }
  }),
  setData: procedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return input
    }),
})

export type AppRouter = typeof appRouter