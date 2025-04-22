import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature || !webhookSecret) {
      return new NextResponse("Missing signature or webhook secret", {
        status: 400,
      });
    }

    const stripe = getStripe();

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const { userId, credits } = session.metadata;

      if (!userId || !credits) {
        return new NextResponse("Missing userId or credits", { status: 400 });
      }

      await prisma.user.update({
        where: { clerkId: userId },
        data: {
          credits: {
            increment: parseInt(credits),
          },
        },
      });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("[STRIPE_WEBHOOK]", error);
    return new NextResponse("Webhook error", { status: 400 });
  }
}
