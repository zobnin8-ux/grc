import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/site";

export const metadata = {
  title: "Industrial Services | GRC Field Operations",
  description: "Field machining, emergency response, shutdown support, and mobile crews — Houston & Gulf Coast.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        label="Services"
        title="Industrial services built for field conditions"
        description="Full capability map — core field operations plus extended support confirmed per engagement."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid gap-6">
          {services.map((s) => (
            <div
              key={s.slug}
              className="flex flex-col justify-between gap-4 rounded-lg border border-steel/30 bg-bg-card p-6 md:flex-row md:items-center"
            >
              <div>
                {s.core ? (
                  <span className="font-mono text-xs uppercase text-accent-orange">Core capability</span>
                ) : (
                  <span className="font-mono text-xs uppercase text-steel">Extended support</span>
                )}
                <h2 className="mt-2 font-display text-2xl font-bold uppercase">{s.title}</h2>
                <p className="mt-2 max-w-2xl text-mist">{s.short}</p>
              </div>
              <Link
                href={`/services/${s.slug}`}
                className="shrink-0 text-sm font-semibold text-accent-amber hover:text-accent-orange"
              >
                View capability →
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Button href="/contact">Request support</Button>
        </div>
      </div>
    </>
  );
}
