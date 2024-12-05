import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    type: z.enum(['article', 'link', 'photo']),
    url: z.string().optional(), // for link type posts
    image: z.string().optional(), // for photo type posts
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'blog': blog,
};
