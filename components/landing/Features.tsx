import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Dumbbell, Utensils, LineChart } from "lucide-react";

export function Features() {
  const features = [
    { 
      title: "Custom Workouts", 
      description: "AI-generated plans tailored to your goals",
      icon: Dumbbell
    },
    { 
      title: "Meal Planning", 
      description: "Nutritious meal ideas to fuel your progress",
      icon: Utensils
    },
    { 
      title: "Progress Tracking", 
      description: "Monitor your gains and stay motivated",
      icon: LineChart
    },
  ];

  return (
    <section className="py-20" id="features">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Features</h2>
        <p className="text-xl text-center text-muted-foreground mb-12">Discover what makes Gymbro your ultimate fitness companion</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 border-primary/20 hover:border-primary transition-colors duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}