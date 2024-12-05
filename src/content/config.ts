import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.string().transform((str) => new Date(str)),
    type: z.enum(["article", "link", "photo"]),
    url: z.string().optional(), // for link type posts
    image: z.string().optional(), // for photo2 type posts
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blog,
};
