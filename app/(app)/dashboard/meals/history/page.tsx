import Heading from "@/components/common/Heading";
import { MealPlanHistory } from "@/components/meals/MealPlanHistory";

export default function MealsHistory() {
  return (
    <div className="px-4 py-8 flex flex-col">
      <Heading title="Meal Plan History" />
      <MealPlanHistory />
    </div>
  );
}
