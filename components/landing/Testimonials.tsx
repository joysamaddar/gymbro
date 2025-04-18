"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "John D.",
      role: "Fitness Enthusiast",
      rating: 5,
      quote:
        "Gymbro transformed my fitness journey. The AI-powered workouts are challenging yet achievable, and I've never felt stronger!",
      stats: {
        weight: "-15kg",
        strength: "+10%",
        consistency: "6 months",
      },
    },
    {
      name: "Sarah M.",
      role: "Nutrition Focused",
      rating: 5,
      quote:
        "The meal plans are fantastic and are stuff I can easily make. I'm eating better, feeling great, and finally seeing the results I've been working towards for years!",
      stats: {
        weight: "-5kg",
        energy: "+60%",
        consistency: "4 months",
      },
    },
    {
      name: "Mike R.",
      role: "Fitness Newbie",
      rating: 4,
      quote:
        "As a complete beginner, Gymbro gave me the confidence to start my fitness journey. The detailed exercise instructions and progressive workouts made it easy to get started and stay consistent.",
      stats: {
        strength: "+25%",
        confidence: "100%",
        consistency: "3 months",
      },
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
            <span className="text-sm font-medium">Success Stories</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Real People, Real Results</h2>
          <p className="text-xl text-muted-foreground">
            Hear from our amazing community members
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-12"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="relative pl-8 border-l-2 border-primary/10 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-2 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-xl italic mb-8 leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <div className="mb-8">
                <p className="font-semibold text-xl">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {testimonial.role}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-primary/10">
                {Object.entries(testimonial.stats).map(([key, value], i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-bold text-primary mb-1">
                      {value}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {key}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
