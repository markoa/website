import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const script = join(dirname(fileURLToPath(import.meta.url)), "update-post-links.mjs");
const frontmatter = `---
title: "Example"
pubDate: 2024-01-01 12:00Z
published: true
xPostId: "111"
blueskyPostId: "existing"
---

The body stays exactly as it was.
`;

function fixture(filename = "example.md", content = frontmatter) {
  const root = mkdtempSync(join(tmpdir(), "post-links-"));
  const scripts = join(root, "scripts");
  const posts = join(root, "src", "content", "signals");
  mkdirSync(scripts);
  mkdirSync(posts, { recursive: true });
  copyFileSync(script, join(scripts, "update-post-links.mjs"));
  const post = join(posts, filename);
  mkdirSync(dirname(post), { recursive: true });
  writeFileSync(post, content);
  return { root, post, command: join(scripts, "update-post-links.mjs") };
}

function run(command, ...args) {
  return execFileSync(process.execPath, [command, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

test("adds multiple links, extracts platform IDs, and preserves unrelated content", () => {
  const { root, post, command } = fixture();
  try {
    run(
      command,
      "example",
      "https://x.com/markoa/status/222?ref=share",
      "https://www.linkedin.com/posts/markoa_example-activity-123-AbC/?utm_source=share",
      "https://news.ycombinator.com/item?id=456",
    );
    const result = readFileSync(post, "utf8");
    assert.match(result, /^xPostId: "222"$/m);
    assert.match(result, /^linkedinPostId: "markoa_example-activity-123-AbC"$/m);
    assert.match(result, /^hackerNewsPostId: "456"$/m);
    assert.match(result, /^blueskyPostId: "existing"$/m);
    assert.ok(result.endsWith("\nThe body stays exactly as it was.\n"));
    assert.equal((result.match(/^xPostId:/gm) ?? []).length, 1);
    run(command, "example", "https://x.com/markoa/status/222");
    assert.equal(readFileSync(post, "utf8"), result);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("finds directory MDX posts and corrects the legacy LinkedIn key", () => {
  const { root, post, command } = fixture(
    "example/index.mdx",
    frontmatter.replace('xPostId: "111"', 'linkedInPostId: "old"'),
  );
  try {
    run(command, "example", "https://linkedin.com/posts/markoa_new-activity-123-AbC");
    const result = readFileSync(post, "utf8");
    assert.match(result, /^linkedinPostId: "markoa_new-activity-123-AbC"$/m);
    assert.doesNotMatch(result, /^linkedInPostId:/m);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("adds a Bluesky link to a post without social fields", () => {
  const { root, post, command } = fixture(
    "example.md",
    frontmatter.replace('xPostId: "111"\nblueskyPostId: "existing"\n', ""),
  );
  try {
    run(
      command,
      "example",
      "https://bsky.app/profile/markoanastasov.bsky.social/post/3lndijg32j22g",
    );
    const result = readFileSync(post, "utf8");
    assert.match(result, /^blueskyPostId: "3lndijg32j22g"$/m);
    assert.ok(result.endsWith("\nThe body stays exactly as it was.\n"));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("uses the latest published pubDate when no slug is provided", () => {
  const { root, post, command } = fixture();
  const posts = dirname(post);
  const newer = join(posts, "newer.md");
  const draft = join(posts, "draft.md");
  writeFileSync(newer, frontmatter.replace("2024-01-01", "2025-01-01"));
  writeFileSync(draft, frontmatter.replace("2024-01-01", "2026-01-01").replace("published: true", "published: false"));
  try {
    run(command, "https://x.com/markoa/status/999");
    assert.match(readFileSync(newer, "utf8"), /^xPostId: "999"$/m);
    assert.equal(readFileSync(post, "utf8"), frontmatter);
    assert.match(readFileSync(draft, "utf8"), /^xPostId: "111"$/m);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("requires a slug when two published posts share the latest date", () => {
  const { root, post, command } = fixture();
  writeFileSync(join(dirname(post), "another.md"), frontmatter);
  try {
    assert.throws(() => run(command, "https://x.com/markoa/status/999"));
    assert.equal(readFileSync(post, "utf8"), frontmatter);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("rejects invalid or duplicate platform links before changing the post", () => {
  const { root, post, command } = fixture();
  try {
    assert.throws(() => run(command, "example", "https://x.com/markoa/status/222", "https://example.com/post"));
    assert.throws(() => run(command, "example", "https://zora.co/coin/base:0x123"));
    assert.throws(() => run(command, "example", "https://x.com/markoa/status/222", "https://twitter.com/markoa/status/333"));
    assert.equal(readFileSync(post, "utf8"), frontmatter);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("rejects duplicate frontmatter fields without changing the post", () => {
  const duplicate = frontmatter.replace('xPostId: "111"', 'xPostId: "111"\nxPostId: "222"');
  const { root, post, command } = fixture("example.md", duplicate);
  try {
    assert.throws(() => run(command, "example", "https://x.com/markoa/status/333"));
    assert.equal(readFileSync(post, "utf8"), duplicate);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
