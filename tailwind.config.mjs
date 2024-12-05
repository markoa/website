/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "blog-dark": "#394255",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
