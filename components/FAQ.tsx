import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    { question: "How does Gymbro create personalized plans?", answer: "Gymbro uses AI to analyze your goals, fitness level, and preferences to create tailored workout and meal plans." },
    { question: "Can I use Gymbro if I'm a beginner?", answer: "Absolutely! Gymbro caters to all fitness levels, from beginners to advanced gym-goers." },
    { question: "How do credits work?", answer: "Credits are used to generate new workout or meal plans. Each time you request a new plan, it costs 1 credit. You can purchase credit packages that best suit your needs." },
  ];

  return (
    <section className="py-20" id="faq">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-xl text-center text-muted-foreground mb-12">Get answers to common questions about Gymbro</p>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-primary/20">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors duration-300">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}