import { trpc } from "@/trpc/rsc-client";
import Link from "next/link";

export async function WorkoutPlanHistory() {
  try {
    const workoutPlans = await trpc.getWorkoutPlanHistory();

    if (!workoutPlans || workoutPlans.length === 0) {
      return <div>No workout plans found.</div>;
    }
    return (
      <ul className="space-y-2">
        {workoutPlans.map((plan) => (
          <li key={plan.id}>
            <Link
              href={`/dashboard/workouts/${plan.id}`}
              className="text-blue-600 hover:underline"
            >
              Workout Plan - {new Date(plan.createdAt).toLocaleDateString()}
            </Link>
          </li>
        ))}
      </ul>
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
