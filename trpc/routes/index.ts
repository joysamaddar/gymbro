import { z } from "zod";
import { procedure, router } from "../trpc";
import OpenAI from "openai";
import { TRPCError } from "@trpc/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/db";
import { dietType } from "@/@types/dietType";
import { dietPreference } from "@/@types/dietPreference";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const appRouter = router({
  generateWorkoutPlan: procedure
    .input(
      z.object({
        gender: z.enum(["male", "female", "other"]),
        age: z.number().int().positive(),
        height: z.number().positive(),
        weight: z.number().positive(),
        currentBodyFat: z.number().min(0).max(100),
        targetBodyFat: z.number().min(0).max(100),
        daysPerWeek: z.number().int().min(1).max(7),
        workoutType: z.enum(["calisthenics", "weightlifting", "mixed"]),
        hoursPerDay: z.number().positive(),
        goal: z.enum(["strength", "aesthetics", "both"]),
        disabilities: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId } = auth();
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const prompt = `Generate a personalized workout plan based on the following parameters:
      Gender: ${input.gender}
      Age: ${input.age}
      Height: ${input.height} cm
      Weight: ${input.weight} kg
      Current Body Fat: ${input.currentBodyFat}%
      Target Body Fat: ${input.targetBodyFat}%
      Days per Week: ${input.daysPerWeek}
      Workout Type: ${input.workoutType}
      Hours per Day: ${input.hoursPerDay}
      Goal: ${input.goal}
      Disabilities: ${input.disabilities || "None"}

      Provide a detailed weekly workout plan with specific exercises, sets, reps, and rest periods.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      const plan = completion.choices[0].message.content;

      if (!plan) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate workout plan",
        });
      }

      const workoutPlan = await prisma.workoutPlan.create({
        data: {
          userId,
          ...input,
          plan,
        },
      });

      return workoutPlan;
    }),

  generateMealPlan: procedure
    .input(
      z.object({
        gender: z.enum(["male", "female", "other"]),
        age: z.number().int().positive(),
        height: z.number().positive(),
        weight: z.number().positive(),
        currentBodyFat: z.number().min(0).max(100),
        targetBodyFat: z.number().min(0).max(100),
        allergies: z.string().optional(),
        dietPreference,
        dietType,
        region: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = auth();
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const prompt = `Generate a personalized meal plan based on the following parameters:
      Gender: ${input.gender}
      Age: ${input.age}
      Height: ${input.height} cm
      Weight: ${input.weight} kg
      Current Body Fat: ${input.currentBodyFat}%
      Target Body Fat: ${input.targetBodyFat}%
      Allergies: ${input.allergies || "None"}
      Diet Preference: ${input.dietPreference}
      Diet Type: ${input.dietType}
      Region: ${input.region}

      Provide a detailed weekly meal plan with specific meals, recipes, and nutritional information.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      const plan = completion.choices[0].message.content;

      if (!plan) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate meal plan",
        });
      }

      const mealPlan = await prisma.mealPlan.create({
        data: {
          userId,
          ...input,
          plan,
        },
      });

      return mealPlan;
    }),

  getWorkoutPlan: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = auth();
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const workoutPlan = await prisma.workoutPlan.findUnique({
        where: { id: input.id },
      });

      if (!workoutPlan || workoutPlan.userId !== userId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workout plan not found",
        });
      }

      return workoutPlan;
    }),

  getWorkoutPlanHistory: procedure.query(async () => {
    const { userId } = auth();
    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const workoutPlans = await prisma.workoutPlan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true },
    });

    return workoutPlans;
  }),

  getMealPlan: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = auth();
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const mealPlan = await prisma.mealPlan.findUnique({
        where: { id: input.id },
      });

      if (!mealPlan || mealPlan.userId !== userId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meal plan not found",
        });
      }

      return mealPlan;
    }),

  getMealPlanHistory: procedure.query(async ({ ctx }) => {
    const { userId } = auth();
    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const mealPlans = await prisma.mealPlan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true },
    });

    return mealPlans;
  }),
});

export type AppRouter = typeof appRouter;
