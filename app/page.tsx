import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  capabilities,
  gulfCities,
  industries,
  processSteps,
  projects,
  services,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="border-y border-steel/20 bg-bg-panel">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 px-4 py-4 md:gap-3 md:px-6">
          {capabilities.map((cap) => (
            <span
              key={cap}
              className="rounded border border-steel/30 bg-bg-card px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-mist"
            >
              {cap}
            </span>
          ))}
        </div>
      </div>

      <Section
        label="Positioning"
        title="Full capability. Rapid deployment."
        description="Mobile field crews are part of a broader industrial support system — built to reduce downtime and keep critical operations moving."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <p className="text-mist">
            We mobilize machining and mechanical support to active facilities across the Gulf
            Coast — with field discipline, equipment readiness, and scope aligned to your outage
            or emergency window.
          </p>
          <div className="rounded-lg border border-steel/30 bg-bg-card p-6">
            <p className="font-mono text-xs uppercase text-accent-amber">Mobilization hub</p>
            <p className="mt-2 font-display text-2xl font-bold">Houston, TX</p>
            <ul className="mt-4 space-y-1 text-sm text-mist">
              {gulfCities.slice(0, 5).map((c) => (
                <li key={c}>→ {c}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        label="Services"
        title="Built for field conditions"
        description="Core capabilities for refineries, petrochemical plants, and heavy industrial operations."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-lg border border-steel/30 bg-bg-card p-6 transition hover:border-accent-orange/50"
            >
              {s.core && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent-orange">
                  Core
                </span>
              )}
              <h3 className="mt-2 font-display text-lg font-bold uppercase text-snow group-hover:text-accent-orange">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-mist">{s.short}</p>
              <span className="mt-4 inline-block text-sm text-accent-amber">View capability →</span>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/services" variant="secondary">
            All services
          </Button>
        </div>
      </Section>

      <Section
        className="bg-bg-panel"
        label="Deployment"
        title="When downtime cannot wait"
        description="Houston-based teams and equipment — coordinated for Gulf Coast industrial corridors."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Mobilization", value: "Field-ready" },
            { label: "Field crews", value: "Deployable" },
            { label: "Coverage", value: "Gulf Coast" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-steel/30 bg-bg-deep p-6 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-steel">{stat.label}</p>
              <p className="mt-2 font-display text-2xl font-bold text-snow">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/contact">Request deployment</Button>
        </div>
      </Section>

      <Section id="industries" label="Industries" title="Critical Gulf Coast facilities">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <div key={ind.title} className="rounded-lg border border-steel/30 bg-bg-card p-5">
              <h3 className="font-display text-lg font-bold uppercase">{ind.title}</h3>
              <p className="mt-2 text-sm text-mist">{ind.line}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        className="bg-bg-panel"
        label="Process"
        title="How field support moves"
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <li key={step} className="flex gap-4 rounded-lg border border-steel/30 bg-bg-card p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-amber/20 font-mono text-sm text-accent-amber">
                {i + 1}
              </span>
              <span className="text-sm text-mist">{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        label="Trust"
        title="Safety, discipline & reliability"
        description="Insurance certificates and site-specific compliance documents provided upon request once scope is confirmed."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "Safety-first field operations",
            "Field documentation & reporting",
            "Equipment readiness before mobilization",
            "Compliance-oriented workflow",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-mist">
              <span className="text-accent-orange">▸</span> {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          {["Certifications", "Insurance COI", "Site orientation"].map((slot) => (
            <span
              key={slot}
              className="rounded border border-dashed border-steel/50 px-4 py-2 font-mono text-xs text-steel"
            >
              {slot} — on request
            </span>
          ))}
        </div>
      </Section>

      <Section label="Coverage" title="Gulf Coast service area">
        <p className="text-mist">
          Houston-based. Serving the Texas Gulf Coast industrial corridor. Mobilized for critical
          field programs beyond the region when scope requires.
        </p>
        <p className="mt-4 font-mono text-sm text-accent-amber">
          {gulfCities.join(" · ")}
        </p>
        <Button href="/service-area" variant="secondary" className="mt-6">
          View service area
        </Button>
      </Section>

      <Section
        className="bg-bg-panel"
        label="Projects"
        title="Field work documentation"
        description="Case studies and metrics will be published as US operations documentation is released."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {projects.slice(0, 2).map((p) => (
            <div
              key={p.id}
              className="overflow-hidden rounded-lg border border-steel/30 bg-bg-card"
            >
              <div className="flex h-40 items-center justify-center bg-bg-deep text-sm text-steel">
                {p.status}
              </div>
              <div className="p-5">
                <p className="font-mono text-xs uppercase text-accent-amber">{p.industry}</p>
                <h3 className="mt-1 font-display text-lg font-bold">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <Button href="/projects" variant="secondary" className="mt-6">
          View all projects
        </Button>
      </Section>

      <Section label="Contact" title="Need field support for critical equipment?">
        <ContactForm />
      </Section>
    </>
  );
}
