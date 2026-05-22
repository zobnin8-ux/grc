import { PageIntro } from "@/components/PageIntro";
import { site } from "@/lib/site";

export const metadata = {
  title: "About | GRC Field Operations",
  description: "Houston-based industrial field operations — built for uptime and field discipline.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="About"
        title="Built for industrial field operations"
        description="US-based teams, field-first mindset, and Gulf Coast mobilization — operational, not promotional."
      />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-mist md:px-6">
        <p>
          {site.name} supports heavy industrial facilities with on-site machining, mechanical
          scope, and rapid crew mobilization — aligned to shutdown windows and emergency response.
        </p>
        <p>
          We operate as a full-scale field operations organization — not a single-service mobile
          repair truck. Equipment readiness, field discipline, and clear intake are part of how we
          deploy.
        </p>
        <p>
          <strong className="text-snow">Houston-based. Now operating from Houston.</strong> Serving
          the Gulf Coast industrial corridor with mobilization for critical programs when scope
          requires.
        </p>
      </div>
    </>
  );
}
