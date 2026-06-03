"use client";

import { useState } from "react";
import { Button } from "./ui/Button";

type Props = {
  short?: boolean;
};

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ short = false }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      company: fd.get("company"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      location: fd.get("location"),
      urgency: fd.get("urgency"),
      message: fd.get("message"),
      company_website: fd.get("company_website"), // honeypot
      form: short ? "emergency" : "contact",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error || "Could not submit your request. Please try again later.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Service temporarily unavailable. Please try again later.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-accent-orange/30 bg-bg-card p-8 text-center">
        <p className="font-display text-xl font-bold text-snow">Request received</p>
        <p className="mt-2 text-mist">
          Thank you — our operations team will reach out shortly to confirm scope and next steps.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4 rounded-lg border border-steel/30 bg-bg-card p-6 md:p-8"
      onSubmit={handleSubmit}
    >
      {/* Honeypot — hidden from users, only bots fill it in. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className={short ? "space-y-4" : "grid gap-4 md:grid-cols-2"}>
        <input required name="name" placeholder="Full name *" className="w-full rounded px-3 py-2.5" />
        {!short && (
          <input name="company" placeholder="Company" className="w-full rounded px-3 py-2.5" />
        )}
        <input required name="phone" type="tel" placeholder="Phone *" className="w-full rounded px-3 py-2.5" />
        <input name="email" type="email" placeholder="Email" className="w-full rounded px-3 py-2.5" />
        {!short && (
          <>
            <input name="location" placeholder="Facility location" className="w-full rounded px-3 py-2.5 md:col-span-2" />
            <select name="urgency" className="w-full rounded px-3 py-2.5 md:col-span-2" defaultValue="">
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
        name="message"
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
      {status === "error" && (
        <p className="text-sm text-accent-emergency">{error}</p>
      )}
      <Button type="submit" variant="primary" disabled={status === "sending"}>
        {status === "sending"
          ? "Sending…"
          : short
            ? "Submit emergency request"
            : "Submit request"}
      </Button>
    </form>
  );
}
