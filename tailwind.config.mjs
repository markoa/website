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
