import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Marca — azul
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
        },
        // Acento — celeste
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        iris: {
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
        },
        aqua: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "'Helvetica Neue'", "sans-serif"],
        mono: ["'SF Mono'", "Menlo", "Consolas", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.6rem",
        md: "0.7rem",
        lg: "0.9rem",
        xl: "1.15rem",
        "2xl": "1.4rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 6px 20px -6px rgba(37,99,235,0.45)",
        card: "0 1px 2px 0 rgba(15,23,42,0.04), 0 6px 20px -8px rgba(15,23,42,0.10)",
        soft: "0 2px 8px -2px rgba(15,23,42,0.08)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.25s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
