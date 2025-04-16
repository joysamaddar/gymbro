import { router } from "../trpc";
import { profileRouter } from "./profile";
import { workoutsRouter } from "./workouts";
import { mealsRouter } from "./meals";

export const appRouter = router({
  ...profileRouter,
  ...workoutsRouter,
  ...mealsRouter,
});

export type AppRouter = typeof appRouter;
