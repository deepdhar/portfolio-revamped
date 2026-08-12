import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        surface: "var(--surface)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(2.75rem, 6.4vw, 6.5rem)", { lineHeight: "0.94", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2.25rem, 4.6vw, 4.25rem)", { lineHeight: "0.98", letterSpacing: "-0.015em" }],
        "display-3": ["clamp(1.5rem, 2.8vw, 2.5rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        power3: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
