/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "dark-base": "#454B5A",
        "light-base": colors.stone[50],
      },
      fontFamily: {
        sans: ["Lato", "ui-sans-serif", "system-ui"],
        serif: ["PT Serif", "ui-serif", "Georgia"],
      },
      typography: {
        DEFAULT: {
          css: {
            // Font family customizations
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: "Lato, ui-sans-serif, system-ui",
            },
            // Normalized heading scale (article title is text-3xl = 1.875rem; keep hierarchy clear)
            h1: {
              fontSize: "1.75rem",
              lineHeight: "1.3",
              fontWeight: "700",
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
            p: {
              fontFamily: "PT Serif, ui-serif, Georgia",
            },
            li: {
              fontFamily: "PT Serif, ui-serif, Georgia",
            },
            code: {
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
              fontWeight: "400",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: {
              overflowX: "auto",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
            },
            "pre code": {
              fontFamily: "inherit",
            },
          },
        },
        // Custom stone theme customizations following light-base color
        stone: {
          css: {
            "--tw-prose-body": colors.stone[950],
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
