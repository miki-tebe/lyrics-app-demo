import { router } from "../trpc";
import { artistRouter } from "./artist";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  artist: artistRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
