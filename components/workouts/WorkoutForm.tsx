"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/trpc/client";
import { bodyGoal } from "@/@types/bodyGoal";
import { workoutType } from "@/@types/workoutType";

const workoutFormSchema = z.object({
  bodyGoal: bodyGoal,
  daysPerWeek: z.number().int().min(1).max(7),
  workoutType,
  hoursPerDay: z.number().positive().min(0.5).max(4),
  goal: z.enum(["strength", "aesthetics", "both"]),
});

type WorkoutFormValues = z.infer<typeof workoutFormSchema>;

const defaultValues: Partial<WorkoutFormValues> = {
  bodyGoal: bodyGoal.Enum["gain muscle"],
  daysPerWeek: 3,
  workoutType: "mixed",
  hoursPerDay: 1,
  goal: "both",
};

export function WorkoutForm() {
  const utils = trpc.useUtils();
  const router = useRouter();
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues,
  });

  const generateWorkoutPlan = trpc.generateWorkoutPlan.useMutation({
    onSuccess: (data) => {
      toast({
        title: "Workout Plan Generated",
        description:
          "Your personalized workout plan has been created successfully.",
      });
      utils.getLatestWorkoutPlan.invalidate();
      router.push(`/dashboard/workouts/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.message ||
          "An error occurred while generating the workout plan.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: WorkoutFormValues) {
    generateWorkoutPlan.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bodyGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body Goal</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select body goal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bodyGoal.options.map((goal) => {
                    return (
                      <SelectItem key={goal} value={goal}>
                        <span className="capitalize">{goal}</span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="daysPerWeek"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Days per Week</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select days per week" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workoutType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {workoutType.options.map((type) => {
                    return (
                      <SelectItem key={type} value={type}>
                        <span className="capitalize">{type}</span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hoursPerDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hours per Day</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.5"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="aesthetics">Aesthetics</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={generateWorkoutPlan.isLoading}>
          {generateWorkoutPlan.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Workout Plan"
          )}
        </Button>
      </form>
    </Form>
  );
}
