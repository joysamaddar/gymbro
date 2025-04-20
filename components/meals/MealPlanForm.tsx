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
  dietPreference,
  dietType: dietType,
  region: z.string(),
  allergies: z.string().optional(),
});

type MealPlanFormValues = z.infer<typeof mealPlanFormSchema>;

const defaultValues: Partial<MealPlanFormValues> = {
  dietPreference: dietPreference.Enum.Vegan,
  dietType: dietType.Enum.Balanced,
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
      router.refresh();
      // Add a small delay before navigation to ensure data is updated
      setTimeout(() => {
        router.push(`/dashboard/meals/${data.id}`);
      }, 100);
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
                  {dietPreference.options.map((preference) => {
                    return (
                      <SelectItem key={preference} value={preference}>
                        <span className="capitalize">{preference}</span>
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
          name="dietType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diet Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your diet type" />
                </SelectTrigger>
                <SelectContent>
                  {dietType.options.map((type) => {
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
