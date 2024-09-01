import { z } from "zod";

export const dietPreference = z.enum([
  "Vegan",
  "Vegetarian",
  "Non-Vegetarian",
  "Paleo",
]);
