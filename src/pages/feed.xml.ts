import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export const get = async () => {
  const posts = await getCollection('posts')

  return rss({
    title: 'Parkraum Projekt — OpenStreetMap Verkehrswende',
    description:
      'Offene OSM-Daten werden prozessiert um präzise, freie Daten über das Parken im öffentlichen Raum zu liefern.',
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: '/posts/' + post.slug,
      content: post.body,
    })),
  })
}

// import rss, { pagesGlobToRssItems } from '@astrojs/rss'
// import { getCollection } from 'astro:content'

// // // import sanitizeHtml from 'sanitize-html'
// // import MarkdownIt from 'markdown-it'
// // const parser = new MarkdownIt()

// export async function get(_context) {
//   const rawPosts = await import.meta.glob('./posts/*.{md,mdx}')
//   // const posts = await pagesGlobToRssItems(rawPosts)
//   const posts = await getCollection('posts')
//   Object.entries(rawPosts).forEach(([key, value]) => console.log(JSON.stringify(value)))
//   console.log('a', { rawPosts, posts })
//   return rss({
// title: 'Parkraum Projekt — OpenStreetMap Verkehrswende',
// description:
//   'Offene OSM-Daten werden prozessiert um präzise, freie Daten über das Parken im öffentlichen Raum zu liefern.',
//     site: import.meta.env.SITE,
//     items: posts.map((post: any) => ({
//       link: post.slug,
//       title: post.frontmatter.title,
//       pubDate: post.frontmatter.pubDate,
//       description: post.frontmatter.description,
//     })),
//   })

//   // return rss({
//   //   // `<title>` field in output xml
//   //   title: 'Parkraum Projekt — OpenStreetMap Verkehrswende',
//   //   // `<description>` field in output xml
//   //   description:
//   //     'Offene OSM-Daten werden prozessiert um präzise, freie Daten über das Parken im öffentlichen Raum zu liefern.',
//   //   // Pull in your project "site" from the endpoint context
//   //   // https://docs.astro.build/en/reference/api-reference/#contextsite
//   //   site: context.site,
//   //   // Array of `<item>`s in output xml
//   //   // See "Generating items" section for examples using content collections and glob imports
//   //   items: posts.map((post) => ({
//   //     link: post.url,
//   //     title: post.title,
//   //     pubDate: post.date,
//   //     // Note: this will not process components or JSX expressions in MDX files.
//   //     // content: sanitizeHtml(parser.render(post.body)),
//   //     ...post,
//   //   })),
//   //   // (optional) inject custom xml
//   //   customData: `<language>de-de</language>`,
//   // })
// }
