import Heading from "@/components/Heading";
import { MealPlanHistory } from "@/components/MealPlanHistory";

export default function Meals() {
  return (
    <div className="px-4 py-8 flex flex-col gap-8">
      <Heading title="Meal Plan History" />
      <MealPlanHistory />
    </div>
  );
}
