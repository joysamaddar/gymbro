import Heading from "@/components/common/Heading";
import { MealPlanForm } from "@/components/meals/MealPlanForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Meals() {
  return (
    <div className="px-4 py-8 flex flex-col gap-8">
      <Heading title="Generate Meal Plan">
        <Link href={"./meals/history"}>
          <Button variant={"outline"}>Meal Plan History</Button>
        </Link>
      </Heading>
      <MealPlanForm />
    </div>
  );
}
