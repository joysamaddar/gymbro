import { procedure } from "../trpc";
import { auth } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { bodyGoal } from "@/@types/bodyGoal";
import { workoutType } from "@/@types/workoutType";
import { getOpenAIInstance } from "@/lib/openai";

export const workoutsRouter = {
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

      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: {
          gender: true,
          age: true,
          height: true,
          disabilities: true,
          credits: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No profile found",
        });
      }

      if (user.credits < 1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Insufficient credits. Please purchase more credits to generate a workout plan.",
        });
      }

      if (!user.gender || !user.age || !user.height) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please update your profile to generate a workout plan",
        });
      }

      const latestWeight = await prisma.weightStats.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      if (!latestWeight) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please log your current weight first",
        });
      }

      const prompt = `Generate a personalized workout plan based on the following parameters:
    Gender: ${user.gender}
    Age: ${user.age}
    Height: ${user.height} cm
    Weight: ${latestWeight.weight} kg
    Body Goal: I want to ${input.bodyGoal}
    Workout days per Week: ${input.daysPerWeek}
    Workout Type: ${input.workoutType}
    Workout Hours per Day: ${input.hoursPerDay}
    Goal (Aesthetics, Strength, Both): ${input.goal}
    Disabilities: ${user.disabilities ?? "None"}

    Provide a detailed weekly workout plan with specific exercises, sets, reps, and rest periods.`;

      const openai = getOpenAIInstance();

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

      // Start a transaction to create the workout plan and deduct credits
      const workoutPlan = await prisma.$transaction(async (tx) => {
        // Deduct credits
        await tx.user.update({
          where: { clerkId: userId },
          data: {
            credits: {
              decrement: 1,
            },
          },
        });

        // Create workout plan
        return await tx.workoutPlan.create({
          data: {
            userId,
            ...input,
            plan,
          },
        });
      });

      return workoutPlan;
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

  getLatestWorkoutPlan: procedure.query(async () => {
    const { userId } = auth();
    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const workoutPlan = await prisma.workoutPlan.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true, user: true },
    });

    if (!workoutPlan) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No workout plan created yet",
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
};
