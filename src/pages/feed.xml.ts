import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

// Items carry title, date and description only: `post.body` is raw Markdown/MDX, not HTML.
export async function GET(context: APIContext) {
  const posts = await getCollection('posts')

  return rss({
    title: 'Parkraum Projekt — OpenStreetMap Verkehrswende',
    description:
      'Offene OSM-Daten werden prozessiert um präzise, freie Daten über das Parken im öffentlichen Raum zu liefern.',
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/posts/${post.id}/`,
      })),
    customData: '<language>de-de</language>',
  })
}
