import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f6f5f2",
        surface: {
          dark: "#080808",
          card: "#101010",
          border: "#1f1f1f",
          highlight: "#2a2a2a",
        },
        muted: {
          light: "#A1A1AA",
          DEFAULT: "#8A8A8A",
          dark: "#52525B",
        },
        accent: {
          DEFAULT: "#0284c7",
          volt: "#65a30d",
          crimson: "#e11d48",
          amber: "#d97706",
        },
      },
      fontFamily: {
        display: ["var(--font-nike-futura)", "Impact", "Arial Black", "Helvetica Neue", "sans-serif"],
        sans: ["var(--font-nike-body)", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        mono: ["var(--font-nike-mono)", "Space Grotesk", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        wide: "0.05em",
        wider: "0.1em",
        widest: "0.25em",
        mega: "0.4em",
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};

export default config;
