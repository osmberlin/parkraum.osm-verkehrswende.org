// Shared by `rehype-autolink-headings` (astro.config.mjs) and `HeadingAnchor.astro` for hand-written headings.
// Icon: https://icons.getbootstrap.com/icons/link/
export const headingAnchorClass =
  'print:hidden relative left-1.5 opacity-50 hover:opacity-100 transition-all inline-flex justify-center'

const iconPaths = [
  'M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z',
  'M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z',
]

export const headingAnchorSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="inline-flex h-5 w-5" fill="currentColor" viewBox="0 0 15 15">${iconPaths.map((d) => `<path d="${d}"/>`).join('')}</svg>`

export const headingAnchorIcon = {
  type: 'element',
  tagName: 'svg',
  properties: {
    xmlns: 'http://www.w3.org/2000/svg',
    className: 'inline-flex h-5 w-5',
    fill: 'currentColor',
    viewBox: '0 0 15 15',
  },
  children: iconPaths.map((d) => ({ type: 'element', tagName: 'path', properties: { d }, children: [] })),
}
