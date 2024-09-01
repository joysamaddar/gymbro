import { z } from "zod";

export const dietType = z.enum([
  "Low Carb",
  "Low Fat",
  "Balanced",
  "High Protein",
  "Keto",
  "Intermittent Fasting",
]);