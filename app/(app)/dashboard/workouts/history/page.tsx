import Heading from "@/components/Heading";
import { WorkoutPlanHistory } from "@/components/WorkoutPlanHistory";

export default function Workouts() {
  return (
    <div className="px-4 py-8 flex flex-col gap-8">
      <Heading title="Workout Plan History" />
      <WorkoutPlanHistory />
    </div>
  );
}
