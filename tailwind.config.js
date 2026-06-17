/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#07090f",
        "surface-alt": "#0d1117",
        card: "#111827",
        ink: "#E2E8F8",
        muted: "#4A6280",
        rule: "#1F2D47",
        copper: "#E8920C",
        signal: "#5080FF",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "serif"],
        mono: ['"JetBrains Mono"', "monospace"],
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
