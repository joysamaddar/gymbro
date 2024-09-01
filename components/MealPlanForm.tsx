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
  FormDescription,
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
import { dietType } from "@/@types/dietType";
import { dietPreference } from "@/@types/dietPreference";

const mealPlanFormSchema = z.object({
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender.",
  }),
  age: z.number().int().positive().min(18).max(100),
  height: z.number().positive().min(100).max(250),
  weight: z.number().positive().min(30).max(300),
  currentBodyFat: z.number().min(0).max(100),
  targetBodyFat: z.number().min(0).max(100),
  allergies: z.string().optional(),
  dietPreference,
  dietType: dietType,
  region: z.string(),
});

type MealPlanFormValues = z.infer<typeof mealPlanFormSchema>;

const defaultValues: Partial<MealPlanFormValues> = {
  gender: "male",
  age: 30,
  height: 170,
  weight: 70,
  currentBodyFat: 20,
  targetBodyFat: 15,
  dietPreference: "Vegan",
  dietType: "Balanced",
  region: "North America",
};

export function MealPlanForm() {
  const router = useRouter();
  const form = useForm<MealPlanFormValues>({
    resolver: zodResolver(mealPlanFormSchema),
    defaultValues,
  });

  const generateMealPlan = trpc.generateMealPlan.useMutation({
    onSuccess: (data) => {
      toast({
        title: "Meal Plan Generated",
        description:
          "Your personalized meal plan has been created successfully.",
      });
      router.push(`/dashboard/meals/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while generating the meal plan.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: MealPlanFormValues) {
    generateMealPlan.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Gender field (same as WorkoutForm) */}
        {/* Age field (same as WorkoutForm) */}
        {/* Height field (same as WorkoutForm) */}
        {/* Weight field (same as WorkoutForm) */}
        {/* Current Body Fat field (same as WorkoutForm) */}
        {/* Target Body Fat field (same as WorkoutForm) */}
        <FormField
          control={form.control}
          name="dietPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diet Preference</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your diet preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vegan">Vegan</SelectItem>
                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="Non-Vegetarian">Non-vegetarian</SelectItem>
                  <SelectItem value="Paleo">Paleo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dietType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diet Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your diet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low Carb">Low Carb</SelectItem>
                  <SelectItem value="Low Fat">Low Fat</SelectItem>
                  <SelectItem value="Balanced">Balanced</SelectItem>
                  <SelectItem value="High Protein">High-Protein</SelectItem>
                  <SelectItem value="Keto">Keto</SelectItem>
                  <SelectItem value="Intermittent Fasting">
                    Intermittent Fasting
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g., North America, Europe, Asia"
                />
              </FormControl>
              <FormDescription>
                Enter your region to tailor the meal plan to your local cuisine.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergies (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Please list any food allergies or intolerances.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={generateMealPlan.isLoading}>
          {generateMealPlan.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Meal Plan"
          )}
        </Button>
      </form>
    </Form>
  );
}