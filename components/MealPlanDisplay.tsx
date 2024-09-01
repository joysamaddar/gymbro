import React from "react";
import { Loader2 } from "lucide-react";

interface MealPlanDisplayProps {
  plan?:
    | {
        gender: string;
        age: number;
        height: number;
        weight: number;
        currentBodyFat: number;
        targetBodyFat: number;
        allergies: string | null;
        dietType: string;
        region: string;
        id: string;
        userId: string;
        plan: string;
        createdAt: Date;
        updatedAt: Date;
      }
    | undefined;
  error?: Error | null;
}

export function MealPlanDisplay({ plan, error }: MealPlanDisplayProps) {
  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p className="font-bold">Error loading meal plan:</p>
        <p>{error.message || "An unexpected error occurred."}</p>
      </div>
    );
  }

  if (!plan) {
    return <div>No meal plan found.</div>;
  }

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Personalized Meal Plan</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p>
            <strong>Gender:</strong> {plan.gender}
          </p>
          <p>
            <strong>Age:</strong> {plan.age}
          </p>
          <p>
            <strong>Height:</strong> {plan.height} cm
          </p>
          <p>
            <strong>Weight:</strong> {plan.weight} kg
          </p>
          <p>
            <strong>Current Body Fat:</strong> {plan.currentBodyFat}%
          </p>
          <p>
            <strong>Target Body Fat:</strong> {plan.targetBodyFat}%
          </p>
        </div>
        <div>
          <p>
            <strong>Allergies:</strong> {plan.allergies || "None"}
          </p>
          <p>
            <strong>Diet Type:</strong> {plan.dietType}
          </p>
          <p>
            <strong>Region:</strong> {plan.region}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(plan.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Meal Plan</h3>
      <div className="whitespace-pre-wrap p-4 rounded-md">{plan.plan}</div>
    </div>
  );
}
