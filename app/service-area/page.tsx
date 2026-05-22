import { PageIntro } from "@/components/PageIntro";
import { gulfCities } from "@/lib/site";

export const metadata = {
  title: "Service Area | GRC Field Operations",
  description: "Houston and Texas Gulf Coast industrial service area.",
};

export default function ServiceAreaPage() {
  return (
    <>
      <PageIntro
        label="Coverage"
        title="Houston & Gulf Coast industrial corridor"
        description="Local mobilization across Texas Gulf Coast refining and petrochemical centers."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="rounded-lg border border-steel/30 bg-bg-card p-8 md:p-12">
          <p className="font-display text-3xl font-bold text-accent-orange">Houston, TX</p>
          <p className="mt-4 text-mist">
            Primary service corridor — rapid deployment to surrounding industrial centers.
          </p>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {gulfCities.map((city) => (
              <li key={city} className="font-mono text-sm text-snow">
                ● {city}
              </li>
            ))}
          </ul>
          <p className="mt-10 border-t border-steel/30 pt-6 text-sm text-steel">
            Nationwide mobilization for critical field programs — scope and logistics confirmed per
            engagement.
          </p>
        </div>
      </div>
    </>
  );
}
