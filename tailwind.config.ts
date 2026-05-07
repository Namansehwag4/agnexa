import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        carbon: "#0F172A",
        graphite: "#334155",
        ember: "#DC2626",
        flame: "#EF4444",
        bluefire: "#2563EB",
        success: "#10B981",
        steel: "#64748B",
        smoke: "#F8FAFC",
        line: "#E2E8F0"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        industrial: "0 24px 80px rgba(15,23,42,0.10)",
        glow: "0 16px 44px rgba(220,38,38,0.16)",
        soft: "0 18px 50px rgba(15,23,42,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
