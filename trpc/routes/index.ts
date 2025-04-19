import { router } from "../trpc";
import { profileRouter } from "./profile";
import { workoutsRouter } from "./workouts";
import { mealsRouter } from "./meals";
import { purchaseRouter } from "./purchase";

export const appRouter = router({
  ...profileRouter,
  ...workoutsRouter,
  ...mealsRouter,
  ...purchaseRouter,
});

export type AppRouter = typeof appRouter;
