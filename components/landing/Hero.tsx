"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Dumbbell, ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative py-32 flex items-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
            >
              <Dumbbell className="w-5 h-5" />
              <span className="text-sm font-medium">
                AI-Powered Fitness Companion
              </span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              Transform Your{" "}
              <span className="text-primary">Fitness Journey</span> with AI
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Experience personalized workout plans and nutrition guidance
              powered by artificial intelligence. Your perfect fitness companion
              is just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href={"/dashboard"}>
                <Button className="group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href={"#features"}>
                <Button variant={"outline"}>Explore Features</Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-primary/20 overflow-clip"
                  >
                    <Image
                      src={`/img/user-${i}.png`}
                      alt={`User ${i}`}
                      width={32}
                      height={32}
                    />
                  </div>
                ))}
              </div>
              <span>Join 10,000+ active users</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {["Workout Plans", "Meal Guides", "Progress Tracking"].map(
              (feature, index) => (
                <div
                  key={index}
                  className="bg-background/50 backdrop-blur-sm rounded-lg p-4 text-center"
                >
                  <p className="text-sm font-medium">{feature}</p>
                </div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
