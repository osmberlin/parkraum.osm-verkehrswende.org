import alpinejs from '@astrojs/alpinejs'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import remarkToc from 'remark-toc'
import image from '@astrojs/image'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: {
        // https://github.com/withastro/astro/tree/main/packages/integrations/tailwind#configapplybasestyles
        applyBaseStyles: false,
      },
    }),
    react(),
    mdx(),
    alpinejs(),
    image(),
  ],
  markdown: {
    remarkPlugins: [remarkToc],
  },
  site: 'https://parkraum.osm-verkehrswende.org/',
})
