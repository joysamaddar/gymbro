import { procedure } from "../trpc";
import { auth } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

export const profileRouter = {
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
  getUserCredit: procedure.query(async ({}) => {
    const { userId } = auth();
    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: {
        credits: true,
      },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    return user.credits;
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
  getWeightStats: procedure.query(async () => {
    const { userId } = auth();

    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const weightStats = await prisma.weightStats.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    return weightStats;
  }),
  updateWeightStats: procedure
    .input(z.object({ weight: z.number().positive() }))
    .mutation(async ({ input }) => {
      if (input.weight < 0 || input.weight > 500) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Weight must be between 0 and 500 kg.",
        });
      }

      const { userId } = auth();
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const latestWeight = await prisma.weightStats.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      if (
        latestWeight &&
        latestWeight.createdAt.toDateString() === new Date().toDateString()
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You can only update your weight once per day.",
        });
      }

      const weightStats = await prisma.weightStats.create({
        data: {
          userId,
          weight: input.weight,
        },
      });

      return weightStats;
    }),
};
