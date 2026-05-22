import { PageIntro } from "@/components/PageIntro";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Field Equipment | GRC Field Operations",
  description: "Mobilized field machining equipment — Gulf Coast industrial operations.",
};

const specs = [
  { label: "On-site machining", value: "Field-deployable" },
  { label: "Large OD capability", value: "[TBD from client]" },
  { label: "Mobilization base", value: "Houston, TX" },
  { label: "Shop support", value: "[TBD]" },
];

export default function EquipmentPage() {
  return (
    <>
      <PageIntro
        label="Equipment"
        title="Field equipment & mobilization"
        description="Equipment-ready mobilization for Gulf Coast field programs — specifications to be confirmed."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="overflow-hidden rounded-lg border border-steel/30">
          {specs.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-2 gap-4 px-6 py-4 ${i % 2 === 0 ? "bg-bg-card" : "bg-bg-panel"}`}
            >
              <span className="font-mono text-sm uppercase text-steel">{row.label}</span>
              <span className="font-mono text-snow">{row.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-mist">
          Mobile machining assets and shop capability will be listed with verified numbers and
          photography once the US equipment inventory is finalized.
        </p>
        <div className="mt-12 max-w-xl">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
