import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  } else {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      redirect("/dashboard");
    } else {
      await prisma.user.create({
        data: { clerkId: userId },
      });
      redirect("/dashboard");
    }
  }
}
