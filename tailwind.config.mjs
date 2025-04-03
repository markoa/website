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
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: "Lato, ui-sans-serif, system-ui",
            },
            p: {
              fontFamily: "PT Serif, ui-serif, Georgia",
            },
            li: {
              fontFamily: "PT Serif, ui-serif, Georgia",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
