import { defineCollection, z } from 'astro:content'

const postCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.string().transform((str) => new Date(str)),
    updated: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
    author: z.string(),
    inMenu: z.boolean(),
    menuTitle: z.string(),
    menuHighlight: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    language: z.enum(['de', 'en']).optional(),
    imagePath: z.string().optional(),
    imageAlt: z.string().optional(),
    noindex: z.boolean().optional(),
  }),
})

export const collections = {
  posts: postCollection,
}
