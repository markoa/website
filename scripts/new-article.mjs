#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import { existsSync } from "node:fs";
import { join } from "node:path";

const [, , ...args] = process.argv;

if (args.length === 0) {
  console.error('Usage: npm run new:article "Post Title"');
  process.exit(1);
}

const title = args.join(" ").trim();

if (!title) {
  console.error("Please provide a non-empty title.");
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

if (!slug) {
  console.error("Could not derive a slug from the provided title.");
  process.exit(1);
}

const now = new Date();
const pad = (value) => String(value).padStart(2, "0");
const pubDate = `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(
  now.getUTCDate(),
)} ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}Z`;

const targetDir = join(process.cwd(), "src", "content", "signals");
mkdirSync(targetDir, { recursive: true });
const filePath = join(targetDir, `${slug}.md`);

if (existsSync(filePath)) {
  console.error(`File already exists: ${filePath}`);
  process.exit(1);
}

const escapedTitle = title.replace(/"/g, '\\"');
const content = `---
title: "${escapedTitle}"
pubDate: ${pubDate}
type: "article"
published: false
---

`;

writeFileSync(filePath, content, { flag: "wx" });
console.log(`Created new article at ${filePath}`);
