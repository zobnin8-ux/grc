import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { projects } from "@/lib/site";

export const metadata = {
  title: "Projects | GRC Field Operations",
  description: "Industrial field machining and on-site repair case studies — Gulf Coast.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        label="Projects"
        title="Field work documentation"
        description="Representative project slots — full case studies pending client documentation release."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-lg border border-steel/30 bg-bg-card"
            >
              <div className="flex h-44 items-center justify-center bg-bg-deep text-center text-sm text-steel px-4">
                {p.status}
              </div>
              <div className="p-5">
                <p className="font-mono text-xs uppercase text-accent-amber">{p.industry}</p>
                <h2 className="mt-2 font-display text-lg font-bold leading-snug">{p.title}</h2>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm text-steel">
          <Link href="/contact" className="text-accent-amber hover:underline">
            Request support →
          </Link>
        </p>
      </div>
    </>
  );
}
