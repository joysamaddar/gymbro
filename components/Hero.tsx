import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-20 overflow-hidden bg-gradient-to-t from-primary/10 to-transparent">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-center lg:text-right">
            Your Ultimate <span className="text-primary">Gym Companion</span>
          </h1>
          <p className="text-xl mb-8 text-muted-foreground text-center lg:text-right">
            Personalized workout plans and meal guides tailored just for you.
            Achieve your fitness goals with AI-powered precision.
          </p>
          <div className="flex justify-center items-center lg:justify-end gap-4">
            <Link href={"/dashboard"}>
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href={"#features"}>
              <Button size="lg" variant={"outline"}>
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <Image
            src="/img/hero-3.png"
            alt="Person working out"
            width={500}
            height={500}
            className="mix-blend-lighten w-auto h-[400px] lg:h-[500px]"
          />
          <div className="hidden lg:block absolute top-[50%] left-[40%] w-[400px] h-[400px] bg-primary/20 blur-2xl rounded-full z-[-1]" />
          <div className="hidden lg:block absolute top-[50%] left-[-100%] w-[400px] h-[800px] bg-primary/20 blur-2xl rounded-full z-[-1] opacity-50" />
        </div>
      </div>
    </section>
  );
}
