/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "dark-base": "#454B5A",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
