import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const dashboardCardItems = [
  {
    title: "Workouts",
    description: "Create your workout plan in a few easy steps.",
    features: [
      "Generate your workout plan in seconds.",
      "ChatGPT analyses your needs and recommends the best workout for you.",
    ],
    link: "/dashboard/workouts",
  },
  {
    title: "Meals",
    description: "Get a diet plan in a few easy steps.",
    features: [
      "Generate your diet chart in 3..2...1...",
      "Get meal plans based on your preferred diet type and goals.",
      "Get meal plans based on ingredients available near you.",
      "Vegan? Lactose intolerant? Don't worry, we got you.",
    ],
    link: "/dashboard/meals",
  },
];

export default function Dashboard() {
  return (
    <div className="px-4 py-8 flex flex-col gap-8">
      <Heading title="Home" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {dashboardCardItems.map((item, i) => (
          <Card className="flex flex-col" key={i}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="text-sm text-muted-foreground list-disc list-outside flex flex-col gap-2 ml-3">
                {item.features.map((feat, j) => (
                  <li key={j}>{feat}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link href={item.link}>
                <Button>Create</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
