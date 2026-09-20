---
name: post-thumbnails
description: >-
  Generate the cover/featured image and the responsive 320/640 WebP card
  thumbnails for a post in the PabloReyes Jekyll blog, and wire them into the
  post's front matter. Use when the user asks to create, generate, or
  regenerate a portada, cover, featured image, or miniatura/thumbnail for a
  blog post, when a post or draft has no `image:` front matter, or when a new
  post needs its WebP card thumbnails before publishing.
license: MIT
metadata:
  version: "1.1.1"
---

# Post thumbnails for the PabloReyes blog

Produces, for one post, a square editorial cover PNG plus the two WebP card
thumbnails the site and its contract tests expect, then updates the front
matter.

## Visual style (mandatory)

Every cover follows this fixed editorial style. It is not optional and does not
change per post — only the subject/visual metaphor changes. Compose the prompt
for the post's topic and append this style block.

```text
Create a square editorial illustration for a personal technology and ideas blog.

Visual identity:
- distinctive contemporary editorial illustration
- digital watercolor and gouache appearance
- subtle textured off-white / warm ivory paper background
- thin imperfect ink outlines
- slightly handmade, printed-editorial feel
- restrained detail, never photorealistic
- sophisticated but approachable
- strong visual hierarchy and generous negative space

Composition:
- 1:1 square format
- one clear main subject or visual metaphor
- main subject occupies roughly 60–75% of the composition
- simplified environment rather than a detailed scene
- one large abstract organic shape behind the subject, usually muted terracotta or coral
- 2–4 minimal geometric accents such as thin curves, parallel bars, circles or small organic shapes
- thin terracotta border around the entire image
- balanced asymmetrical composition
- readable even as a small blog thumbnail

Fixed color palette:
- warm ivory / paper cream
- terracotta / muted coral
- deep navy blue
- muted olive green
- charcoal / near-black accents

Rendering:
- digital watercolor with subtle pigment variation
- areas of relatively flat color mixed with visible watercolor texture
- restrained shadows
- no glossy effects
- no 3D rendering
- no cinematic lighting
- no photographic depth of field
- no hyperrealism

Editorial rules:
- no text
- no logos
- no flags
- no national or cultural symbols unless explicitly relevant to the article
- no decorative elements that imply a country, ethnicity or culture merely because of the appearance of a person
- avoid generic AI-art clutter
- avoid excessive background detail

The result should feel like part of a coherent, recognizable editorial illustration system used consistently across an entire publication.
```

Map the style to the tool: `size` must be square (`1024x1024`), and the style
text above goes into `prompt` together with the post-specific subject. The
palette here is the illustration palette — it replaces any site-palette advice;
do not mix in other colors.

## How images are used in this repo

- The post's `image:` front matter points at `images/uploads/posts/<slug>/<file>`.
  That original is the featured image on the article page and the JSON-LD/OG
  image.
- `_includes/post-list-cards.html` derives the archive card thumbnail by
  rewriting `/images/uploads/` to `/images/thumbnails/` and the extension to
  `.webp`, then adding `@2x.webp`. Both files must exist or the card is broken.
- Cards render the cover in a 1:1 square frame with `object-fit: cover`, so the
  square illustration shows uncropped. Older non-square covers get center-cropped
  to the square; use `thumbnail_position: top` when that would cut the subject.
- `test/site_contract_test.rb#test_responsive_thumbnail_assets_exist` fails the
  build contract for any published post missing either WebP. It only scans
  `_posts/*`, so drafts are not checked until published.
- `_plugins/responsive_article_images.rb` generates the article's
  `<picture>`/`srcset` variants at build time under `images/generated/`. Never
  create or edit anything there or in `.jekyll-cache/` by hand.

## Paths and naming

For a post file `_posts/YYYY-MM-DD-<slug>.markdown` (or the matching draft):

- `<slug>` is the filename without the date and extension. If the post already
  has an `image:` value, reuse its directory and base name instead of inventing
  new ones (some older posts use a shorter directory such as `sabiduria/`).
- Cover (source of truth, PNG):
  `images/uploads/posts/<slug>/<name>.png`
- Card thumbnails (320w and 640w, `cwebp -q 78`, never upscale):
  `images/thumbnails/posts/<slug>/<name>.webp`
  `images/thumbnails/posts/<slug>/<name>@2x.webp`

Front matter to set on the post:

```yaml
image: /images/uploads/posts/<slug>/<name>.png
thumbnail_position: top   # only when a center crop would cut the subject
```

Use `image_credit:` only if a real credit is required.

## Step 1 — Generate the cover with the plugin

The project config enables `opencode-gpt-imagegen`, which exposes the
`gpt_imagegen` tool and reuses the existing ChatGPT (OpenAI OAuth) credential.

1. Read the post/draft and pick one clear subject or visual metaphor for its
   theme (for example, an abstract kitchen/recipe idea for a cooking-and-craft
   essay). Keep it a single idea, not a scene.
2. Build the `prompt` as: the post-specific subject + the full style block from
   "Visual style (mandatory)".
3. Call `gpt_imagegen` with:
   - `prompt`: as above.
   - `out`: the cover path above, relative to the repo root.
   - `size`: `1024x1024` (1:1 is mandatory). Do not use landscape or portrait.
   - `images` (optional): pass an existing cover/thumbnail as a style reference
     to keep the series visually consistent.

The plugin **never overwrites**: if `out` already exists it writes `-v2`,
`-v3`, … To regenerate, delete the old file first (or delete the `-vN` and rename)
and keep the front matter in sync.

Read the tool's returned path and use that exact file as the cover.

## Step 2 — Encode the card thumbnails

`cwebp`/`gif2webp` are not installed on the host; they live in the
`pabloreyes-jekyll:4.0.6` image. Run from the repo root:

```bash
slug="<slug>"; name="<name>"
mkdir -p "images/thumbnails/posts/$slug"
docker run --rm --user "$(id -u):$(id -g)" -v "$PWD:/app" -w /app \
  pabloreyes-jekyll:4.0.6 sh -lc "
    cwebp -quiet -q 78 -resize 320 0 'images/uploads/posts/$slug/$name.png' \
      -o 'images/thumbnails/posts/$slug/$name.webp' &&
    cwebp -quiet -q 78 -resize 640 0 'images/uploads/posts/$slug/$name.png' \
      -o 'images/thumbnails/posts/$slug/$name@2x.webp'
  "
```

`--user "$(id -u):$(id -g)"` avoids root-owned files. Adjust the source path if
the cover is a `.jpg`/`.jpeg` instead of `.png`.

## Step 3 — Wire the front matter

Add or update `image:` (and `thumbnail_position:` if needed) in the post's YAML.
Keep the leading slash and the `/images/uploads/...` prefix exactly.

## Step 4 — Verify

For a published post, run the contract from the repo root:

```bash
docker run --rm -v "$PWD:/app" -v jekyll-bundle:/usr/local/bundle -w /app \
  pabloreyes-jekyll:4.0.6 bundle exec ruby test/site_contract_test.rb
```

The thumbnail test must pass. For a draft, confirm both WebP files exist and
note that the contract will start requiring them once the draft moves to
`_posts/`.

## Checklist

- [ ] Cover uses the fixed editorial style above, 1:1 square, and feels part of a
      consistent illustration system across the whole publication.
- [ ] Cover PNG exists under `images/uploads/posts/<slug>/`.
- [ ] `images/thumbnails/posts/<slug>/<name>.webp` (320w) exists.
- [ ] `images/thumbnails/posts/<slug>/<name>@2x.webp` (640w) exists.
- [ ] Post front matter `image:` points at the cover.
- [ ] Contract test passes (published posts only).
- [ ] Cover and thumbnails are staged for commit with the post.

## Do not

- Do not deviate from the fixed style: square format, fixed palette, watercolor
  editorial look, no photorealism.
- Do not put text, logos, flags, or cultural/national symbols in the image, and
  do not use a person's appearance to imply a nationality, ethnicity or culture.
- Do not allow generic AI-art clutter or excessive background detail; keep one
  subject and generous negative space.
- Do not generate images into `images/generated/` or `.jekyll-cache/`.
- Do not rename or move existing images unless the user asks.
- Do not overstuff the prompt: one subject/metaphor plus the style block.
