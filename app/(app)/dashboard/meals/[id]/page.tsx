import Heading from "@/components/common/Heading";
import { MealPlanDisplay } from "@/components/meals/MealPlanDisplay";
import { trpc } from "@/trpc/rsc-client";

export default async function MealPlanPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const mealPlan = await trpc.getMealPlan({ id: params.id });
    return (
      <div className="px-4 py-8 flex flex-col gap-8">
        <Heading title="Meal Plan" />
        <MealPlanDisplay plan={mealPlan} />
      </div>
    );
  } catch (error) {
    return (
      <div className="px-4 py-8 flex flex-col gap-8">
        <Heading title="Meal Plan" />
        <MealPlanDisplay error={error as Error} />
      </div>
    );
  }
}
