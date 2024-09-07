import { z } from "zod";

export const bodyGoal = z.enum([
  "lose fat",
  "gain muscle",
  "maintain weight",
  "gain weight",
]);
