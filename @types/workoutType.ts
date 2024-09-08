import { z } from "zod";

export const workoutType = z.enum(["calisthenics", "weightlifting", "mixed", "yoga", "cardio", "zumba", "boxing"])