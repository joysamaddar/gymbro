import Heading from "@/components/common/Heading";
import { WorkoutPlanHistory } from "@/components/workouts/WorkoutPlanHistory";

export default function WorkoutsHistory() {
  return (
    <div className="px-4 py-8 flex flex-col">
      <Heading title="Workout Plan History" />
      <WorkoutPlanHistory />
    </div>
  );
}
