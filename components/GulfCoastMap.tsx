"use client";

import { useEffect, useRef, useState } from "react";

const hubs = [
  { id: "houston", label: "Houston", cx: 280, cy: 200, main: true },
  { id: "pasadena", label: "Pasadena", cx: 300, cy: 185 },
  { id: "baytown", label: "Baytown", cx: 340, cy: 175 },
  { id: "beaumont", label: "Beaumont", cx: 420, cy: 160 },
  { id: "port-arthur", label: "Port Arthur", cx: 480, cy: 155 },
  { id: "corpus", label: "Corpus Christi", cx: 220, cy: 280 },
];

export function GulfCoastMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const main = hubs[0];

  return (
    <div ref={ref} className="rounded-lg border border-steel/30 bg-bg-deep p-4 md:p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-accent-amber">
        Mobilization corridor
      </p>
      <svg
        viewBox="0 0 520 320"
        className="mt-4 w-full text-steel"
        aria-label="Gulf Coast service corridor schematic"
      >
        <rect width="520" height="320" fill="#0B0F12" rx="4" />
        <path
          d="M 80 260 Q 200 240 280 200 Q 360 170 480 150"
          fill="none"
          stroke="#1B2228"
          strokeWidth="24"
          strokeLinecap="round"
        />
        {hubs.slice(1).map((hub, i) => (
          <line
            key={hub.id}
            x1={main.cx}
            y1={main.cy}
            x2={hub.cx}
            y2={hub.cy}
            stroke="#FF6A1A"
            strokeWidth="1.5"
            strokeOpacity="0.7"
            className={`map-line-draw ${visible ? "is-visible" : ""}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          />
        ))}
        {hubs.map((hub) => (
          <g key={hub.id}>
            {hub.main ? (
              <circle
                cx={hub.cx}
                cy={hub.cy}
                r={6}
                fill="#FF6A1A"
                className="map-hub-pulse"
              />
            ) : (
              <circle cx={hub.cx} cy={hub.cy} r={4} fill="#F5A623" opacity={0.9} />
            )}
            <text
              x={hub.cx}
              y={hub.cy + (hub.main ? 22 : 18)}
              textAnchor="middle"
              fill="#C9D1D8"
              fontSize="10"
              fontFamily="monospace"
            >
              {hub.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
