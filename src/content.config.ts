import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const signals = defineCollection({
  loader: glob({ base: "./src/content/signals", pattern: "**/[^_]*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.string().transform((str) => new Date(str)),
      type: z.enum(["article", "link", "photo"]),
      url: z.string().optional(), // for link type posts
      image: z
        .union([
          image(), // for local images
          z.url(), // for external URLs
        ])
        .optional(), // for photo type posts
      published: z.boolean().default(false),
      xPostId: z.string().optional(), // ID of the post on X/Twitter
      blueskyPostId: z.string().optional(), // ID of the post on Bluesky
      linkedinPostId: z.string().optional(), // ID of the post on LinkedIn
      zoraPostId: z.string().optional(), // ID of the post on Zora.co
      hackerNewsPostId: z.string().optional(), // Item ID of the thread on Hacker News
      canonicalUrl: z.url().optional(), // Original canonical URL if syndicated
    }),
});

export const collections = {
  signals,
};
