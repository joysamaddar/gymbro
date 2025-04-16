import { procedure } from "../trpc";
import { auth } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import prisma from "@/db";
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
};
