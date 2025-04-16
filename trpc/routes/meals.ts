import { procedure } from "../trpc";
import { auth } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import prisma from "@/db";
import { z } from "zod";
import OpenAI from "openai";
import { dietPreference } from "@/@types/dietPreference";
import { dietType } from "@/@types/dietType";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const mealsRouter = {
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

  getLatestMealPlan: procedure.query(async () => {
    const { userId } = auth();
    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const mealPlan = await prisma.mealPlan.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true, user: true },
    });

    if (!mealPlan) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No meal plan created yet",
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
};
