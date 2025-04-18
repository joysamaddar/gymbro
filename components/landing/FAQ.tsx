"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      question: "How does Gymbro create personalized plans?",
      answer:
        "Our AI system analyzes your fitness goals, current level, dietary restrictions to create a customized workout and nutrition plan.",
    },
    {
      question: "Can I use Gymbro if I'm a beginner?",
      answer:
        "Absolutely! Gymbro is designed for all fitness levels. Our AI will start with foundational exercises and gradually increase intensity based on your progress.",
    },
    {
      question: "How do credits work?",
      answer:
        "Credits are used to generate new workout or meal plans. Each plan generation costs 1 credit. You can purchase credit packages that best suit your needs, and we offer a free trial with 2 credits to get you started. Unused credits never expire.",
    },
    {
      question: "What makes Gymbro different from other fitness apps?",
      answer:
        "Gymbro stands out with its AI-powered personalization, comprehensive progress tracking, and adaptive learning system. Unlike static workout plans, our system evolves with you, ensuring continuous progress and preventing plateaus.",
    },
    {
      question: "Can I customize my meal plans?",
      answer:
        "Yes! You can specify dietary preferences, allergies, and food restrictions. Our AI will create meal plans that align with your nutritional needs while considering your taste preferences and available ingredients.",
    },
  ];

  return (
    <section
      className="py-24 bg-gradient-to-b from-background to-primary/5"
      id="faq"
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
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-medium">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-xl text-muted-foreground">
            Get answers to common questions about Gymbro
          </p>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors duration-300 text-left py-4">
                    <span className="flex items-center gap-3">
                      <span className="text-primary/50 text-sm font-normal">
                        0{index + 1}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-8">
                    <div className="space-y-2">
                      {faq.answer.split(". ").map((sentence, i) => (
                        <p key={i} className="text-base">
                          {sentence.trim()}
                          {i < faq.answer.split(". ").length - 1 ? "." : ""}
                        </p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
