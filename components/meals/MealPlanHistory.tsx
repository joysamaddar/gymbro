import Link from "next/link";
import { trpc } from "@/trpc/rsc-client";
import { parseDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

export async function MealPlanHistory() {
  try {
    const mealPlans = await trpc.getMealPlanHistory();

    if (!mealPlans || mealPlans.length === 0) {
      return <div className="p-4">No meal plans found.</div>;
    }

    return (
      <div className="-mx-4">
        {mealPlans.map((plan, i) => (
          <Link
            key={plan.id}
            href={`./${plan.id}`}
            className="p-4 border-y border-border hover:underline inline-block w-full"
          >
            <div className="flex justify-between items-center">
              <p>
                Meal Plan - {parseDate(plan.createdAt, { includeTime: true })}
              </p>
              {i == 0 && <Badge>Current</Badge>}
            </div>
          </Link>
        ))}
      </div>
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
