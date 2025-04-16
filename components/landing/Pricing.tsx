import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function Pricing() {
  const plans = [
    { name: "Starter", credits: 20, price: "$5", description: "Perfect for beginners" },
    { name: "Pro", credits: 100, price: "$20", description: "Most popular choice" },
    { name: "Elite", credits: 250, price: "$40", description: "Best value for serious users" },
  ];

  return (
    <section className="py-20" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Flexible Pricing</h2>
        <p className="text-xl text-center text-muted-foreground mb-12">Choose the credit package that fits your fitness journey</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className="border-2 border-primary/20 hover:border-primary transition-colors duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <p className="text-3xl font-bold text-primary">{plan.price}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-2xl font-semibold mb-2">{plan.credits} Credits</p>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Buy Credits</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="text-center mt-4 text-sm text-primary/80">
          * Sign up now and get 2 credits to try out our services
        </p>
      </div>
    </section>
  );
}