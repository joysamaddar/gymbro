import { parseDate } from "@/lib/utils";
import { trpc } from "@/trpc/rsc-client";
import Link from "next/link";
import { Badge } from "../ui/badge";

export async function WorkoutPlanHistory() {
  try {
    const workoutPlans = await trpc.getWorkoutPlanHistory();

    if (!workoutPlans || workoutPlans.length === 0) {
      return <div>No workout plans found.</div>;
    }

    return (
      <div className="-mx-4">
        {workoutPlans.map((plan, i) => (
          <Link
            key={plan.id}
            href={`./${plan.id}`}
            className="p-4 border-y border-border hover:underline inline-block w-full"
          >
            <div className="flex justify-between items-center">
              <p>Workout Plan - {parseDate(plan.createdAt)}</p>
              {i == 0 && <Badge>Current</Badge>}
            </div>
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p className="font-bold">Error loading workout plan history:</p>
        <p>{(error as Error).message ?? "An unexpected error occurred."}</p>
      </div>
    );
  }
}
