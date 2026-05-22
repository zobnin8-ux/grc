"use client";

import { useState } from "react";
import { Button } from "./ui/Button";

type Props = {
  short?: boolean;
};

export function ContactForm({ short = false }: Props) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-lg border border-accent-orange/30 bg-bg-card p-8 text-center">
        <p className="font-display text-xl font-bold text-snow">Request received</p>
        <p className="mt-2 text-mist">
          Demo mode — your operations team will connect when forms are wired to email.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4 rounded-lg border border-steel/30 bg-bg-card p-6 md:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className={short ? "space-y-4" : "grid gap-4 md:grid-cols-2"}>
        <input required placeholder="Full name *" className="w-full rounded px-3 py-2.5" />
        {!short && (
          <input placeholder="Company" className="w-full rounded px-3 py-2.5" />
        )}
        <input required type="tel" placeholder="Phone *" className="w-full rounded px-3 py-2.5" />
        <input type="email" placeholder="Email" className="w-full rounded px-3 py-2.5" />
        {!short && (
          <>
            <input placeholder="Facility location" className="w-full rounded px-3 py-2.5 md:col-span-2" />
            <select className="w-full rounded px-3 py-2.5 md:col-span-2" defaultValue="">
              <option value="" disabled>
                Urgency
              </option>
              <option>Emergency</option>
              <option>Same week</option>
              <option>Planned work</option>
              <option>Shutdown / turnaround</option>
            </select>
          </>
        )}
      </div>
      <textarea
        rows={short ? 3 : 4}
        placeholder="Describe equipment, scope, or attach notes"
        className="w-full rounded px-3 py-2.5"
      />
      {!short && (
        <label className="flex cursor-pointer items-center gap-2 text-sm text-mist">
          <input type="file" className="text-xs" accept="image/*,.pdf" />
          Upload photos or drawings (demo)
        </label>
      )}
      <Button type="submit" variant="primary">
        {short ? "Submit emergency request" : "Submit request"}
      </Button>
    </form>
  );
}
