# SEO Media and Projects Design

## Goal

Improve the site's technical SEO and article-media delivery without changing
the existing home or project titles, descriptions, editorial content, project
set, or article-to-project linking.

## Scope

The implementation will:

- generate responsive WebP variants for local article images during the Jekyll
  build;
- preserve each original image as the browser fallback;
- add accurate image dimensions and responsive selection metadata;
- add JSON-LD for the site, author, articles, and project collection;
- show a compact author name alongside each article date;
- remove the legacy categories page and layout;
- publish projects as static Spanish and English pages at `/projects/` and
  `/en/projects/`;
- replace the JavaScript language toggle with crawlable language links;
- retain `/about/` as a noindex legacy redirect to `/projects/`.

The implementation will not:

- change the home title `Pablo Reyes`;
- change the visible project titles or existing site description;
- add new editorial content or project detail pages;
- add related-article or project links;
- remove or rename any entry in `_data/projects.yml`.

## Responsive image architecture

A repository-owned Jekyll plugin will process local images referenced by
published posts. It is preferred over an external image plugin because the
current stable `jekyll_picture_tag` gem excludes Ruby 4, while
`jekyll-picture-tag-ng` does not transform PNG files, which make up most of the
article media.

During a normal Jekyll build, the plugin will:

1. discover featured and Markdown images in published posts;
2. read their intrinsic dimensions;
3. generate non-upscaled 480, 960, and 1440 pixel WebP variants for PNG and
   JPEG sources using `cwebp`;
4. generate an animated WebP alternative for GIF sources using `gif2webp`;
5. write generated files below an ignored source cache and register them as
   Jekyll static files;
6. render Markdown and featured images as `<picture>` elements with the
   original source as `<img>` fallback;
7. emit `srcset`, `sizes`, `width`, `height`, `alt`, `loading`, and `decoding`
   attributes while preserving existing Kramdown classes.

The featured image remains eagerly loaded with `fetchpriority="high"`.
Inline article images remain lazy-loaded. External images and unsupported
formats retain their existing markup.

The GitHub Pages workflow will install the Debian `webp` package before the
build. A missing encoder or a failed conversion will fail the build rather
than silently shipping broken markup.

## Structured data

The head will include one JSON-LD graph appropriate to the current page:

- the home page exposes `WebSite` and `Person`;
- article pages expose `BlogPosting` with canonical URL, headline,
  description, language, publication date, author, and image when available;
- project language pages expose `CollectionPage` and an `ItemList` containing
  the visible projects.

All JSON strings will be produced through Liquid's JSON escaping. Structured
data will describe only visible or canonical content and will reuse the
existing site and author configuration.

Article metadata will display `Pablo Reyes` beside the existing date. No new
author biography or profile page is introduced.

## Project language architecture

The current project data remains the single source of truth.

- `/projects/` renders only the Spanish fields and uses `lang="es"`.
- `/en/projects/` renders only the English fields and uses `lang="en"`.
- Both pages retain the visible titles `Proyectos` and `Projects`
  respectively.
- The language selector becomes two ordinary links with `aria-current` on the
  active language.
- Both pages publish reciprocal `hreflang="es"`, `hreflang="en"`, and
  `hreflang="x-default"` links.
- The site navigation points to `/projects/`.
- `/about/` contains a noindex canonical redirect page pointing to
  `/projects/`, preserving old bookmarks without creating an indexable
  duplicate.

The old language JavaScript is removed because language selection no longer
mutates a single document.

## Category retirement

`categories.md` and `_layouts/categories.html` will be deleted. The generated
site and sitemap must not contain `/categories/`; the deployed route will
therefore return the hosting platform's normal 404 response.

## Testing and verification

Source and generated-site contracts will verify:

- the titles and site description remain unchanged;
- every published project remains present in both language pages;
- `/about/` is noindex and points to `/projects/`;
- category source, generated output, sitemap entry, and internal links are
  absent;
- JSON-LD exists and parses as JSON on each relevant page type;
- project pages expose reciprocal language alternatives;
- local article pictures contain responsive WebP sources, intrinsic
  dimensions, correct loading behavior, and valid fallback files;
- all generated internal references exist.

Verification will include the full Minitest contract before and after a
production build, direct inspection of generated media sizes, and browser
checks of home, article, Spanish projects, English projects, and legacy redirect
at desktop and mobile widths.
