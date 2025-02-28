import alpinejs from '@astrojs/alpinejs'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import remarkToc from 'remark-toc'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    mdx(),
    alpinejs(),
    sitemap({
      filter: (page) => !page.endsWith('README/'),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc],
  },
  experimental: {
    // https://docs.astro.build/en/reference/experimental-flags/svg/
    svg: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://parkraum.osm-verkehrswende.org/',
  redirects: {
    '/project-vector-tiles/dashboard': '/regions/berlin',
    '/project-vector-tiles/data': '/regions/berlin',
  },
})
