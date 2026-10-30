import alpinejs from '@astrojs/alpinejs'
import { unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import remarkToc from 'remark-toc'

// CONFIG: https://astro.build/config (aligned with www.osm-verkehrswende.org; no Keystatic / Netlify adapter here)
export default defineConfig({
  site: 'https://parkraum.osm-verkehrswende.org/',
  integrations: [
    react({ compiler: true }),
    mdx(),
    alpinejs(),
    sitemap({
      filter: (page) => !page.endsWith('README/'),
    }),
  ],
  markdown: { processor: unified({ remarkPlugins: [remarkToc] }) },
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/project-vector-tiles/dashboard': '/regions/berlin',
    '/project-vector-tiles/data': '/regions/berlin',
  },
})
