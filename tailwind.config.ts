import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0B0F12",
          deep: "#07090B",
          panel: "#151B20",
          card: "#1B2228",
        },
        steel: "#6E7A83",
        mist: "#C9D1D8",
        snow: "#F5F7FA",
        accent: {
          orange: "#FF6A1A",
          amber: "#F5A623",
          cyan: "#00A3B5",
          emergency: "#B3261E",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(90deg, rgba(7,9,11,0.95) 0%, rgba(7,9,11,0.7) 45%, rgba(7,9,11,0.2) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
