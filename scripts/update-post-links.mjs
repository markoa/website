#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const contentDirectory = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "content", "signals");
const socialFields = [
  "xPostId",
  "blueskyPostId",
  "hackerNewsPostId",
  "linkedinPostId",
];

function usage() {
  return "Usage: npm run blog:links -- [post-slug] <social-url> [social-url ...]";
}

function findPost(slug) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    throw new Error(`Invalid post slug: ${slug}`);
  }

  const candidates = [
    join(contentDirectory, `${slug}.md`),
    join(contentDirectory, `${slug}.mdx`),
    join(contentDirectory, slug, "index.md"),
    join(contentDirectory, slug, "index.mdx"),
  ];
  const existing = candidates.filter(existsSync);

  if (existing.length === 0) throw new Error(`Post not found: ${slug}`);
  if (existing.length > 1) throw new Error(`More than one post matches: ${slug}`);
  return existing[0];
}

function postPaths() {
  return readdirSync(contentDirectory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
      return [join(contentDirectory, entry.name)];
    }
    if (!entry.isDirectory()) return [];
    return ["index.md", "index.mdx"]
      .map((name) => join(contentDirectory, entry.name, name))
      .filter(existsSync);
  });
}

function frontmatterLines(content) {
  const newline = content.includes("\r\n") ? "\r\n" : "\n";
  const lines = content.split(newline);
  const end = lines.indexOf("---", 1);
  if (lines[0] !== "---" || end < 0) {
    throw new Error("Post has no valid YAML frontmatter");
  }
  return { lines, end, newline };
}

function findMostRecentPost() {
  let latest;
  for (const path of postPaths()) {
    const { lines, end } = frontmatterLines(readFileSync(path, "utf8"));
    const metadata = lines.slice(1, end);
    if (!metadata.some((line) => /^published:\s*true\s*$/.test(line))) continue;

    const dateLine = metadata.find((line) => /^pubDate:/.test(line));
    const date = Date.parse(dateLine?.replace(/^pubDate:\s*/, "").replace(/^['"]|['"]$/g, "") ?? "");
    if (Number.isNaN(date)) throw new Error(`Invalid pubDate in ${path}`);
    if (!latest || date > latest.date) latest = { path, date, tied: false };
    else if (date === latest.date) latest.tied = true;
  }

  if (!latest) throw new Error("No published posts found");
  if (latest.tied) throw new Error("Multiple published posts share the latest pubDate; pass a slug");
  return latest.path;
}

function socialLink(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error(`Invalid URL: ${rawUrl}`);
  }

  if (!(["http:", "https:"].includes(url.protocol))) {
    throw new Error(`Expected an HTTP URL: ${rawUrl}`);
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  const parts = url.pathname.split("/").filter(Boolean);

  if (["x.com", "twitter.com", "mobile.twitter.com"].includes(host)) {
    const id = parts[1] === "status" ? parts[2] : undefined;
    if (id && /^\d+$/.test(id)) return ["xPostId", id];
  } else if (host === "linkedin.com") {
    const id = parts[0] === "posts" && parts.length === 2 ? parts[1] : undefined;
    if (id && /^[a-zA-Z0-9_-]+$/.test(id)) return ["linkedinPostId", id];
  } else if (host === "news.ycombinator.com") {
    const id = url.pathname === "/item" ? url.searchParams.get("id") : undefined;
    if (id && /^\d+$/.test(id)) return ["hackerNewsPostId", id];
  } else if (host === "bsky.app") {
    const id = parts[0] === "profile" && parts[2] === "post" && parts.length === 4
      ? parts[3]
      : undefined;
    if (parts[1] === "markoanastasov.bsky.social" && id && /^[a-zA-Z0-9]+$/.test(id)) {
      return ["blueskyPostId", id];
    }
  }

  throw new Error(`Unsupported social post URL: ${rawUrl}`);
}

function updateFrontmatter(content, links) {
  const { lines, end, newline } = frontmatterLines(content);

  const pending = new Map(links);
  let insertAfter = -1;
  const seen = new Set();

  for (let index = 1; index < end; index++) {
    const match = /^([A-Za-z][A-Za-z0-9]*):/.exec(lines[index]);
    if (!match) continue;
    const field = match[1] === "linkedInPostId" ? "linkedinPostId" : match[1];
    if (socialFields.includes(field)) insertAfter = index;
    else if (field === "published" && insertAfter < 0) insertAfter = index;

    if (!pending.has(field) && !seen.has(field)) continue;
    if (seen.has(field)) throw new Error(`Duplicate ${field} in post frontmatter`);
    lines[index] = `${field}: ${JSON.stringify(pending.get(field))}`;
    seen.add(field);
    pending.delete(field);
  }

  const additions = socialFields
    .filter((field) => pending.has(field))
    .map((field) => `${field}: ${JSON.stringify(pending.get(field))}`);
  lines.splice(insertAfter >= 0 ? insertAfter + 1 : end, 0, ...additions);
  return lines.join(newline);
}

function main(args) {
  const slug = /^https?:\/\//i.test(args[0] ?? "") ? undefined : args[0];
  const urls = slug ? args.slice(1) : args;
  if (urls.length === 0) throw new Error(usage());

  const links = new Map();
  for (const rawUrl of urls) {
    const [field, id] = socialLink(rawUrl);
    if (links.has(field)) throw new Error(`More than one ${field} URL was provided`);
    links.set(field, id);
  }

  const path = slug ? findPost(slug) : findMostRecentPost();
  const original = readFileSync(path, "utf8");
  const updated = updateFrontmatter(original, links);
  if (updated !== original) writeFileSync(path, updated);
  console.log(`${updated === original ? "No changes to" : "Updated"} ${path}`);
}

try {
  main(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
