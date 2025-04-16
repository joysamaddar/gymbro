import Link from "next/link";
import { trpc } from "@/trpc/rsc-client";

export async function MealPlanHistory() {
  try {
    const mealPlans = await trpc.getMealPlanHistory();
    
    if (!mealPlans || mealPlans.length === 0) {
      return <div>No meal plans found.</div>;
    }

    return (
      <ul className="space-y-2">
        {mealPlans.map((plan) => (
          <li key={plan.id}>
            <Link
              href={`/dashboard/meals/${plan.id}`}
              className="text-blue-600 hover:underline"
            >
              Meal Plan - {new Date(plan.createdAt).toLocaleDateString()}
            </Link>
          </li>
        ))}
      </ul>
    );
  } catch (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p className="font-bold">Error loading meal plan history:</p>
        <p>{(error as Error).message ?? "An unexpected error occurred."}</p>
      </div>
    );
  }
}
