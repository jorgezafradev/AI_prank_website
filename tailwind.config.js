/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind scans these files and only generates the classes you actually use.
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      // Colors point to CSS variables defined in src/index.css,
      // so light and dark themes switch automatically.
      colors: {
        paper: "var(--paper)",
        card: "var(--card)",
        ink: "var(--ink)",
        soft: "var(--ink-soft)",
        line: "var(--line)",
        magenta: "var(--magenta)",
        teal: "var(--teal)",
        sun: "var(--sun)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Trebuchet MS"', '"Segoe UI"', "system-ui", "sans-serif"],
        serif: ["Newsreader", "Georgia", '"Times New Roman"', "serif"],
      },
      boxShadow: {
        card: "var(--shadow)",
        hard: "8px 8px 0 var(--ink)",
      },
      keyframes: {
        stageIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        pop: {
          from: { transform: "scale(.4) rotate(var(--rot, 0deg))", opacity: "0" },
          to: { transform: "scale(1) rotate(var(--rot, 0deg))", opacity: "1" },
        },
        leave: {
          to: { transform: "scale(.6) rotate(var(--rot, 0deg))", opacity: "0" },
        },
      },
      animation: {
        "stage-in": "stageIn .7s ease both",
        pop: "pop .35s cubic-bezier(.2,1.5,.4,1) both",
        leave: "leave .18s ease forwards",
      },
    },
  },
  plugins: [],
};
