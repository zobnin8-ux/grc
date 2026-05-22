"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  steps: readonly string[];
};

export function ProcessSteps({ steps }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <ol ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li
          key={step}
          className={`process-step ${visible ? "is-visible" : ""}`}
          style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-amber/20 font-mono text-sm text-accent-amber">
            {i + 1}
          </span>
          <span className="text-sm text-mist">{step}</span>
        </li>
      ))}
    </ol>
  );
}
