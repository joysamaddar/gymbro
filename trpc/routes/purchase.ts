import { procedure } from "../trpc";
import { auth } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { SUBSCRIPTION_PLAN_IDS, SUBSCRIPTION_PLANS } from "@/lib/constants";

export const purchaseRouter = {
  createCheckoutSession: procedure
    .input(
      z.object({
        email: z.string().email(),
        planId: z.enum(SUBSCRIPTION_PLAN_IDS as [string, ...string[]]),
      })
    )
    .mutation(async ({ input }) => {
      const { email, planId } = input;

      if (!email) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please login to purchase a plan",
        });
      }

      const { userId } = auth();
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const plan = SUBSCRIPTION_PLANS.find((plan) => plan.id === planId);

      if (!plan) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invalid plan",
        });
      }

      const session = await stripe.checkout.sessions.create({
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${plan.name} Plan`,
                description: `${plan.credits} Credits`,
              },
              unit_amount: plan.price,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
        metadata: {
          email,
          userId,
          planId: plan.id,
          credits: plan.credits,
        },
      });

      return session.url;
    }),
};
