import { Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    { name: "John D.", quote: "Gymbro transformed my fitness journey. I've never felt stronger!" },
    { name: "Sarah M.", quote: "The meal plans are fantastic. I'm eating better and feeling great!" },
    { name: "Mike R.", quote: "As a beginner, Gymbro gave me the confidence to start my fitness journey." },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">What Our Users Say</h2>
        <p className="text-xl text-center text-muted-foreground mb-12">Real stories from real Gymbro users</p>
        <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center max-w-sm">
              <Quote className="w-8 h-8 text-primary mb-4" />
              <p className="text-lg text-center italic mb-6">{testimonial.quote}</p>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">Gymbro User</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}