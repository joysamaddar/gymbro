"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface WeightStat {
  id: string;
  userId: string;
  weight: number;
  createdAt: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <CardContent className="p-2">
          <p className="text-sm font-medium">{payload[0].payload.date}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].payload.weight} kg
          </p>
        </CardContent>
      </Card>
    );
  }
  return null;
};

const weightFormSchema = z.object({
  weight: z.number().positive().min(0).max(500),
});

type WeightFormValues = z.infer<typeof weightFormSchema>;

export function WeightTracker() {
  const { data: weightStats, isLoading } = trpc.getWeightStats.useQuery();
  const utils = trpc.useUtils();

  const updateWeight = trpc.updateWeightStats.useMutation({
    onSuccess: () => {
      toast({
        title: "Weight updated successfully",
        description: "Your weight has been recorded.",
      });
      utils.getWeightStats.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Error updating weight",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<WeightFormValues>({
    resolver: zodResolver(weightFormSchema),
    defaultValues: {
      weight: 0,
    },
  });

  const onSubmit = (data: WeightFormValues) => {
    updateWeight.mutate({ weight: data.weight });
    form.reset();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="h-[300px] col-span-2 [&_.recharts-tooltip-cursor]:hidden">
        <ResponsiveContainer width="100%" height="100%" className="lg:border-b">
          <AreaChart
            data={
              !isLoading
                ? weightStats?.map((stat: WeightStat) => ({
                    date: new Date(stat.createdAt).toLocaleDateString(),
                    weight: stat.weight,
                  }))
                : []
            }
            margin={{ top: 32, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="hsl(var(--primary))"
              fill="url(#colorWeight)"
              activeDot={{
                fill: "hsl(var(--primary))",
                stroke: "hsl(var(--background))",
              }}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-4 flex flex-col justify-center lg:border-l lg:border-b border-border"
        >
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Today&apos;s weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={updateWeight.isLoading}
            className="w-full"
          >
            {updateWeight.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Log Weight"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
