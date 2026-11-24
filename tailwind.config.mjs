/** @type {import('tailwindcss').Config} */
const sans = '"Schibsted Grotesk", ui-sans-serif, system-ui, sans-serif';
const mono = '"DM Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        chassis: "var(--chassis)",
        panel: "var(--panel)",
        ink: "var(--ink)",
        label: "var(--label)",
        key: "var(--key)",
        edge: "var(--edge)",
        orange: "#FF4F00",
        glass: "#0E0E0E",
        readout: "#5BB1F2",
      },
      fontFamily: {
        sans: ["Schibsted Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["DM Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: sans,
            },
            h1: {
              fontSize: "1.75rem",
              lineHeight: "1.3",
              fontWeight: "600",
            },
            h2: {
              fontSize: "1.375rem",
              lineHeight: "1.35",
              fontWeight: "600",
            },
            h3: {
              fontSize: "1.25rem",
              lineHeight: "1.4",
              fontWeight: "600",
              letterSpacing: "-0.01em",
            },
            h4: {
              fontSize: "1.125rem",
              lineHeight: "1.45",
              fontWeight: "600",
            },
            "h5, h6": {
              fontSize: "1rem",
              lineHeight: "1.5",
              fontWeight: "600",
            },
            strong: {
              fontWeight: "600",
            },
            a: {
              fontWeight: "400",
            },
            blockquote: {
              fontStyle: "normal",
              fontWeight: "400",
            },
            code: {
              fontFamily: mono,
              fontWeight: "400",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: {
              overflowX: "auto",
              fontFamily: mono,
            },
            "pre code": {
              fontFamily: "inherit",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
