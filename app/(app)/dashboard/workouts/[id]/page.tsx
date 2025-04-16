import { WorkoutPlanDisplay } from "@/components/workouts/WorkoutPlanDisplay";
import Heading from "@/components/common/Heading";
import { trpc } from "@/trpc/rsc-client";

export default async function WorkoutPlanPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const workoutPlan = await trpc.getWorkoutPlan({ id: params.id });
    return (
      <div className="px-4 py-8 flex flex-col gap-8">
        <Heading title="Workout Plan" />
        <WorkoutPlanDisplay plan={workoutPlan} />
      </div>
    );
  } catch (error) {
    return (
      <div className="px-4 py-8 flex flex-col gap-8">
        <Heading title="Workout Plan" />
        <WorkoutPlanDisplay error={error as Error} />
      </div>
    );
  }
}
