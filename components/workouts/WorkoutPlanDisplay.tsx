import { parseGender } from "@/lib/utils";
import React from "react";

interface WorkoutPlanDisplayProps {
  plan?:
    | {
        user: {
          gender: string | null;
          age: number | null;
          height: number | null;
          disabilities: string | null;
        };
        bodyGoal: string;
        daysPerWeek: number;
        workoutType: string;
        hoursPerDay: number;
        goal: string;
        plan: string;
        createdAt: Date;
        updatedAt: Date;
      }
    | undefined;
  error?: Error | null;
}

export function WorkoutPlanDisplay({ plan, error }: WorkoutPlanDisplayProps) {
  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p className="font-bold">Error loading workout plan:</p>
        <p>{error.message || "An unexpected error occurred."}</p>
      </div>
    );
  }

  if (!plan) {
    return <div>No workout plan found.</div>;
  }

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        Your Personalized Workout Plan
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p>
            <strong>Gender:</strong> {parseGender(plan.user.gender)}
          </p>
          <p>
            <strong>Age:</strong> {plan.user.age}
          </p>
          <p>
            <strong>Height:</strong> {plan.user.height} cm
          </p>
          {/* <p>
            <strong>Weight:</strong> {plan.user.weight} kg
          </p> */}
          <p>
            <strong>Body Goal:</strong> {plan.bodyGoal}
          </p>
        </div>
        <div>
          <p>
            <strong>Days per Week:</strong> {plan.daysPerWeek}
          </p>
          <p>
            <strong>Workout Type:</strong> {plan.workoutType}
          </p>
          <p>
            <strong>Hours per Day:</strong> {plan.hoursPerDay}
          </p>
          <p>
            <strong>Goal:</strong> {plan.goal}
          </p>
          <p>
            <strong>Disabilities:</strong> {plan.user.disabilities || "None"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(plan.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2">Workout Plan</h3>
      <div className="whitespace-pre-wrap p-4 rounded-md">{plan.plan}</div>
    </div>
  );
}
