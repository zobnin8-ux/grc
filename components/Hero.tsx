import Image from "next/image";
import { site } from "@/lib/site";
import { Button } from "./ui/Button";

export function Hero() {
  return (
    <section className="hero-grain relative min-h-[88vh] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80"
          alt="Industrial field operations"
          fill
          priority
          className="hero-zoom-image object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-24 md:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-amber">
          Houston · Gulf Coast
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-snow md:text-6xl">
          Industrial field operations & rapid response
        </h1>
        <p className="mt-6 max-w-xl text-lg text-mist">
          Full-scale industrial support for refineries, petrochemical plants, and critical
          equipment — field machining, shutdown assistance, and mobilized crews.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">Request Field Support</Button>
          <Button href="/services/emergency-field-response" variant="emergency">
            Emergency Response →
          </Button>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-steel">
          <li>● Field crews mobilized</li>
          <li>● Equipment-ready</li>
          <li>● {site.location}</li>
        </ul>
      </div>
    </section>
  );
}
