import { parseDate } from "@/lib/utils";
import { trpc } from "@/trpc/rsc-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

export default async function LatestPlans() {
  let latestWorkoutPlan: {
    id: string;
    createdAt: Date;
    user: {
      id: string;
      clerkId: string;
      gender: string | null;
      age: number | null;
      height: number | null;
      disabilities: string | null;
    };
  } | null = null;
  let latestMealPlan: {
    id: string;
    createdAt: Date;
    user: {
      id: string;
      clerkId: string;
      gender: string | null;
      age: number | null;
      height: number | null;
      disabilities: string | null;
    };
  } | null = null;

  try {
    latestWorkoutPlan = await trpc.getLatestWorkoutPlan();
  } catch (error) {
    console.error(error);
  }

  try {
    latestMealPlan = await trpc.getLatestMealPlan();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {latestWorkoutPlan && (
        <Card className="rounded-none flex flex-row border-primary/20 bg-gradient-to-tr from-background to-primary/5">
          <CardHeader className="flex-1">
            <CardTitle>Latest Workout Plan</CardTitle>
            <CardDescription>
              Following since {parseDate(latestWorkoutPlan.createdAt)}
            </CardDescription>
          </CardHeader>
          <Link href={`/dashboard/workouts/${latestWorkoutPlan.id}`}>
            <CardContent className="h-full aspect-square bg-primary/20 hover:bg-primary/30 transition-all ease-in duration-300 flex items-center justify-center shrink-0 p-0 cursor-pointer">
              <MoveUpRight className="text-primary" />
            </CardContent>
          </Link>
        </Card>
      )}
      {latestMealPlan && (
        <Card className="rounded-none flex flex-row border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardHeader className="flex-1">
            <CardTitle>Latest Meal Plan</CardTitle>
            <CardDescription>
              Following since {parseDate(latestMealPlan.createdAt)}
            </CardDescription>
          </CardHeader>
          <Link href={`/dashboard/meals/${latestMealPlan.id}`}>
            <CardContent className="h-full aspect-square bg-primary/20 hover:bg-primary/30 transition-all ease-in duration-300 flex items-center justify-center shrink-0 p-0 cursor-pointer">
              <MoveUpRight className="text-primary" />
            </CardContent>
          </Link>
        </Card>
      )}
    </div>
  );
}
