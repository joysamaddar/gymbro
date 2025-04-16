import { trpc } from "@/trpc/rsc-client";

export async function WorkoutPlanHistory() {
  try {
    const workoutPlans = await trpc.getWorkoutPlanHistory();
    
    if (!workoutPlans || workoutPlans.length === 0) {
      return <div>No workout plans found.</div>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Height</th>
            </tr>
          </thead>
          <tbody>
            {workoutPlans.map((plan) => (
              <tr key={plan.id}>
                <td className="px-4 py-2">
                  <a
                    href={`/dashboard/workouts/${plan.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </a>
                </td>
                <td className="px-4 py-2">{plan.user.height} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p className="font-bold">Error loading workout plan history:</p>
        <p>{(error as Error).message ?? "An unexpected error occurred."}</p>
      </div>
    );
  }
}
