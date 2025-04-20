"use client";

import { Dumbbell, Utensils, LineChart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      title: "Custom Workouts",
      description:
        "AI-generated plans tailored to your goals and fitness level. Get personalized exercises and progressions.",
      icon: Dumbbell,
      benefits: [
        "Workout plans tailored according to your goals",
        "Love Zumba or are you a boxer? We've got you covered",
        "No more boring workouts, we'll keep you engaged",
      ],
    },
    {
      title: "Meal Planning",
      description:
        "Smart nutrition guidance with meal ideas that match your dietary preferences and fitness goals.",
      icon: Utensils,
      benefits: [
        "Customized meal suggestions",
        "Nutritional breakdown",
        "Meals tailored to your preferences",
        "Dietary restriction support",
      ],
    },
    {
      title: "Progress Tracking",
      description:
        "Comprehensive analytics and visualizations to track your journey and celebrate milestones.",
      icon: LineChart,
      benefits: ["Performance metrics", "Progress visualization"],
    },
  ];

  return (
    <section
      className="py-24 bg-gradient-to-b from-background to-primary/5"
      id="features"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Your Gym Bro Has Got You Covered
          </h2>
          <p className="text-xl text-muted-foreground">
            From workouts to nutrition, get exactly what you need
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <div className="group relative h-full p-8 bg-background/50 backdrop-blur-sm rounded-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
