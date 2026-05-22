import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/PageIntro";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact | GRC Field Operations",
  description: "Request industrial field support — Houston & Gulf Coast.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        label="Contact"
        title="Request industrial field support"
        description="Operations intake — emergency, planned work, and shutdown support."
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6">
        <div>
          <ContactForm />
        </div>
        <div className="space-y-6 text-mist">
          <div>
            <p className="font-mono text-xs uppercase text-steel">Phone</p>
            <a href={site.phoneHref} className="mt-1 block text-xl text-accent-amber">
              {site.phone}
            </a>
          </div>
          <div>
            <p className="font-mono text-xs uppercase text-steel">Email</p>
            <p className="mt-1">{site.email}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase text-steel">Location</p>
            <p className="mt-1">{site.location}</p>
            <p className="mt-4 rounded border border-dashed border-steel/40 p-6 text-sm text-steel">
              [Street address — placeholder]
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
