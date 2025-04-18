"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Sparkles, Check } from "lucide-react";
import { motion } from "framer-motion";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      credits: 20,
      price: "$5",
      description: "Perfect for beginners",
    },
    {
      name: "Trainer",
      credits: 100,
      price: "$20",
      description: "Most popular choice",
    },
    {
      name: "Elite",
      credits: 250,
      price: "$40",
      description: "Best value for serious users",
    },
  ];

  return (
    <section
      className="py-24 bg-gradient-to-b from-primary/5 to-background"
      id="pricing"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose the credit package that fits your fitness journey
          </p>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <Card
                className={`h-full border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 group ${
                  plan.name === "Pro" ? "relative scale-105 shadow-lg" : ""
                }`}
              >
                {plan.name === "Pro" && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-3">{plan.name}</CardTitle>
                  <div className="space-y-1">
                    <p className="text-4xl font-bold text-primary">
                      {plan.price}
                    </p>
                    <p className="text-2xl font-semibold text-muted-foreground">
                      {plan.credits} Credits
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-center">
                    {plan.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.name === "Pro" ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8 text-sm text-primary/80"
        >
          * Sign up now and get 2 credits to try out our services
        </motion.p>
      </div>
    </section>
  );
}
