import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { WorkoutForm } from "@/components/WorkoutForm";
import Link from "next/link";

export default function Workouts() {
  return (
    <div className="px-4 py-8 flex flex-col gap-8">
      <Heading title="Generate Workout Plan">
        <Link href={"./workouts/history"}>
          <Button variant={"outline"}>Workout Plan History</Button>
        </Link>
      </Heading>
      <WorkoutForm />
    </div>
  );
}
