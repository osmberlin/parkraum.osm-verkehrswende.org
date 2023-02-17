# Double check

- Sitemap
  - Double Check noindex-Topic https://discord.com/channels/830184174198718474/1074580000407302154
    - Add PR to inform in Docs that this is not possible; "noindex will be included, but ignored by google"
      - https://docs.astro.build/en/guides/integrations-guide/sitemap/
- Social Sharing => Test on production
- RSS
  => Aktuell ist der Body defekt. Astro unterstützt heute noch kein MDX als Body für den RSS Feed.
  => NEXT: Abwarten auf neue Astro JS
- mobile checken
- Fix http://localhost:3000/project-vector-tiles/dashboard CORS

# Astro Svelte Map

https://dev.to/askrodney/astro-js-location-map-using-leaflet-svelte-4g7g

# Image Plugin

This thing still does not work. Alle bilder, die ich mit "/…" referenziere erkennt Astro als remote images (props), was laut Docs quatsch ist.

https://docs.astro.build/de/guides/integrations-guide/image/

# Autolink Headlines

==> WIP branch local. Does not work, yet.

Aktuell wieder über das likify-headlines JS gelößt.

- [] Headlines haben ihren Link verloren.
  Am besten wäre natürlich, die alten Links würde weiterhin funktionieren.
  In jedem Fall müssen wir alle Hash-URLs innerhalb des Repos einmal prüfen.

# TOC

==> WIP branch local. Does not work, yet.

- [] TOC funktioniert noch nicht.
  https://docs.astro.build/en/guides/markdown-content/#markdown-plugins hat tips, aber zeigt keine TOC an.

# FYI Plugins

https://astro.build/integrations/performance+seo/

# TODO: Sitemap

Maybe
https://docs.astro.build/en/guides/integrations-guide/sitemap/

# TODO: SeO

- https://github.com/jonasmerlin/astro-seo#readme
- https://github.com/onwidget/astrolib/tree/main/packages/seo
- https://github.com/codiume/orbit/tree/main/packages/astro-seo-meta

# FYI: OG Images

- https://github.com/delucis/astro-og-canvas#readme
- https://github.com/tomaskebrle/astro-og-image
