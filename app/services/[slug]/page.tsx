import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/PageIntro";
import { services } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | GRC Field Operations`,
    description: service.short,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const isEmergency = slug === "emergency-field-response";

  return (
    <>
      {isEmergency && <div className="h-1 bg-accent-emergency" />}
      <PageIntro
        label="Capability"
        title={service.title}
        description={service.short}
      />
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="prose-invert max-w-3xl space-y-4 text-mist">
          <p>
            Houston-based field operations with mobilized crews and on-site machining capability.
            Scope, timeline, and equipment selection are confirmed during intake — aligned to
            refinery, petrochemical, and heavy industrial requirements.
          </p>
          <p>
            This page is a demo shell. Detailed capability bullets, equipment limits, and case
            references will be added from confirmed US service scope.
          </p>
        </div>
        <ul className="mt-8 grid gap-2 sm:grid-cols-2">
          {[
            "On-site assessment",
            "Field machining & mechanical scope",
            "Shutdown / outage alignment",
            "Documentation & reporting",
          ].map((item) => (
            <li key={item} className="rounded border border-steel/30 bg-bg-card px-4 py-3 text-sm text-mist">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-12 max-w-xl">
          <ContactForm short={isEmergency} />
        </div>
      </div>
    </>
  );
}
