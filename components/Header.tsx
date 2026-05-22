"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { Button } from "./ui/Button";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/#industries", label: "Industries" },
  { href: "/services/emergency-field-response", label: "Emergency" },
  { href: "/service-area", label: "Service Area" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-steel/20 bg-bg-deep/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="font-display text-lg font-bold tracking-wide text-snow">
          {site.name}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-mist transition hover:text-snow"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={site.phoneHref}
            className="font-mono text-sm text-mist hover:text-accent-amber"
          >
            {site.phone}
          </a>
          <Button href="/contact">Request Support</Button>
        </div>

        <button
          type="button"
          className="rounded border border-steel/40 px-3 py-2 text-sm text-mist lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-steel/20 bg-bg-panel px-4 py-4 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-mist"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <a href={site.phoneHref} className="font-mono text-sm text-accent-amber">
              {site.phone}
            </a>
            <Button href="/contact">Request Support</Button>
          </div>
        </div>
      )}
    </header>
  );
}
