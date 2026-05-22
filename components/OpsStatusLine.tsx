"use client";

import { useEffect, useState } from "react";

const zones = [
  "HOUSTON",
  "BEAUMONT",
  "BAYTOWN",
  "DEER PARK",
  "PORT ARTHUR",
  "CORPUS CHRISTI",
];

export function OpsStatusLine() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % zones.length);
        setFade(true);
      }, 200);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-b border-steel/20 bg-bg-deep/80">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider md:px-6">
        <span className="text-steel">
          Status: <span className="text-accent-amber">Field-ready</span>
        </span>
        <span className="hidden text-steel/50 sm:inline">|</span>
        <span className="text-steel">
          Coverage:{" "}
          <span
            className={`text-snow transition-opacity duration-200 ${fade ? "opacity-100" : "opacity-0"}`}
          >
            {zones[index]}
          </span>
        </span>
        <span className="hidden text-steel/50 md:inline">|</span>
        <span className="text-steel">
          Intake: <span className="text-snow">Open</span>
        </span>
      </div>
    </div>
  );
}
