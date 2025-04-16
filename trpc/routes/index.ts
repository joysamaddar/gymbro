import { z } from "zod";
import { procedure, router } from "../trpc";
import OpenAI from "openai";
import { TRPCError } from "@trpc/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/db";
import { dietType } from "@/@types/dietType";
import { dietPreference } from "@/@types/dietPreference";
import { bodyGoal } from "@/@types/bodyGoal";
import { workoutType } from "@/@types/workoutType";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const appRouter = router({
  getProfile: procedure.query(async ({}) => {
    const { userId } = auth();
    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const profile = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    return profile;
  }),

  updateProfile: procedure
    .input(
      z.object({
        gender: z.enum(["male", "female", "other"]).optional(),
        age: z.number().positive().optional(),
        height: z.number().positive().optional(),
        disabilities: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId } = auth();
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const updatedProfile = await prisma.user.update({
        where: { clerkId: userId },
        data: {
          ...input,
        },
      });

      return updatedProfile;
    }),

  updateWeightStats: procedure
    .input(z.object({ weight: z.number().positive() }))
    .mutation(async ({ input }) => {
      const { userId } = auth();
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const weightStats = await prisma.weightStats.create({
        data: {
          userId,
          weight: input.weight,
        },
      });

      return weightStats;
    }),

  generateWorkoutPlan: procedure
    .input(
      z.object({
        bodyGoal: bodyGoal,
        daysPerWeek: z.number().int().min(1).max(7),
        workoutType,
        hoursPerDay: z.number().positive(),
        goal: z.enum(["strength", "aesthetics", "both"]),
      })
    )
    .mutation(async ({ input }) => {
      const { userId } = auth();
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const profile = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: {
          gender: true,
          age: true,
          height: true,
          disabilities: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No profile found",
        });
      }

      if (!profile.gender || !profile.age || !profile.height) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please update your profile to generate a workout plan",
        });
      }

      const prompt = `Generate a personalized workout plan based on the following parameters:
      Gender: ${profile.gender}
      Age: ${profile.age}
      Height: ${profile.height} cm
      Body Goal: I want to ${input.bodyGoal}
      Workout days per Week: ${input.daysPerWeek}
      Workout Type: ${input.workoutType}
      Workout Hours per Day: ${input.hoursPerDay}
      Goal (Aesthetics, Strength, Both): ${input.goal}
      Disabilities: ${profile.disabilities ?? "None"}

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
        dietPreference,
        dietType,
        region: z.string(),
        allergies: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = auth();
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const profile = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: {
          gender: true,
          age: true,
          height: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No profile found",
        });
      }

      if (!profile.gender || !profile.age || !profile.height) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please update your profile to generate a workout plan",
        });
      }

      const prompt = `Generate a personalized meal plan based on the following parameters:
      Gender: ${profile.gender}
      Age: ${profile.age}
      Height: ${profile.height} cm
      Diet Preference: ${input.dietPreference}
      Diet Type: ${input.dietType}
      Region: ${input.region}
      Allergies: ${input.allergies || "None"}

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
        include: {
          user: true,
        },
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
      select: { id: true, createdAt: true, user: true },
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
        include: {
          user: true,
        },
      });

      if (!mealPlan || mealPlan.userId !== userId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meal plan not found",
        });
      }

      return mealPlan;
    }),

  getMealPlanHistory: procedure.query(async () => {
    const { userId } = auth();
    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const mealPlans = await prisma.mealPlan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        user: true,
      },
    });

    return mealPlans;
  }),
});

export type AppRouter = typeof appRouter;
