// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import { codeTheme } from "./src/styles/code-theme.js";

export default defineConfig({
  site: "https://markoanastasov.com",
  compressHTML: true,
  markdown: {
    processor: unified(),
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: codeTheme,
    },
  },
  integrations: [mdx()],
});
