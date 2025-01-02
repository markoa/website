import { defineCollection, z } from "astro:content";
import { image } from "astro:assets";

const signals = defineCollection({
  type: "content",
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
          z.string().url(), // for external URLs
        ])
        .optional(), // for photo type posts
      published: z.boolean().default(false),
      xPostId: z.string().optional(), // ID of the post on X/Twitter
      blueskyPostId: z.string().optional(), // ID of the post on Bluesky
      linkedinPostId: z.string().optional(), // ID of the post on LinkedIn
    }),
});

export const collections = {
  signals,
};
