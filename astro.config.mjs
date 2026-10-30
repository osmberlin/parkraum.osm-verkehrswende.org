import alpinejs from '@astrojs/alpinejs'
import { unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import remarkToc from 'remark-toc'

const appRoot = fileURLToPath(new URL('.', import.meta.url))

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
    server: {
      // Bun globalStore (bunfig.toml) symlinks realpath outside the project (~/.bun/install/cache/links/).
      // Extend (not replace) Vite's default fs.allow — setting allow alone drops the project root.
      // @see https://bun.com/docs/pm/global-store
      // @see https://vite.dev/config/server-options.html#server-fs-allow
      fs: {
        allow: [appRoot, join(homedir(), '.bun/install/cache/links')],
      },
    },
  },
  redirects: {
    '/project-vector-tiles/dashboard': '/regions/berlin',
    '/project-vector-tiles/data': '/regions/berlin',
  },
})
