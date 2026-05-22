import Link from "next/link";
import { site, services } from "@/lib/site";
import { Button } from "./ui/Button";

export function Footer() {
  return (
    <footer className="border-t border-steel/20 bg-bg-deep">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-xl font-bold">{site.name}</p>
            <p className="mt-2 text-sm text-mist">{site.tagline}</p>
            <div className="mt-6">
              <Button href="/services/emergency-field-response" variant="emergency">
                Emergency Response
              </Button>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-steel">Services</p>
            <ul className="mt-4 space-y-2 text-sm text-mist">
              {services.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-snow">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-steel">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-mist">
              <li>
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>{site.email}</li>
              <li>
                <Link href="/contact" className="hover:text-snow">
                  Request support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-steel/20 pt-6 text-xs text-steel">
          © {new Date().getFullYear()} {site.legalName} · Demo site · Placeholder content
        </p>
      </div>
    </footer>
  );
}
