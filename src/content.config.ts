import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/[^_]*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string(),
    inMenu: z.boolean(),
    menuTitle: z.string(),
    menuHighlight: z.string().optional(),
    canonicalUrl: z.url().optional(),
    language: z.enum(['de', 'en']).optional(),
    imagePath: z.string().optional(),
    imageAlt: z.string().optional(),
    noindex: z.boolean().optional(),
  }),
})

export const collections = {
  posts,
}
