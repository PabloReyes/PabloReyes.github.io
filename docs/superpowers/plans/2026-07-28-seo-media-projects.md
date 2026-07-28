# SEO Media and Projects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add responsive article media, accurate JSON-LD, crawlable project language pages, and retire the category archive without changing existing titles, descriptions, projects, or editorial content.

**Architecture:** A repository-owned Jekyll plugin generates ignored WebP derivatives during the build and rewrites only local post images after render. Liquid templates provide page-specific structured data and static ES/EN project pages, while the legacy About URL becomes a noindex redirect.

**Tech Stack:** Jekyll 4.4, Ruby 4.0, Liquid, Minitest, `cwebp`, `gif2webp`, HTML/SCSS.

---

## File responsibilities

- `_plugins/responsive_article_images.rb`: image discovery, dimension parsing,
  WebP generation, static-file registration, and post-render `<picture>` markup.
- `_includes/structured-data.html`: page-specific JSON-LD graph.
- `_includes/head.html`: canonical override, robots, hreflang, redirect metadata,
  and structured-data inclusion.
- `_includes/project-list.html`: render one language selected by the page.
- `projects/index.md`: canonical Spanish project page.
- `en/projects/index.md`: canonical English project page.
- `about/index.md`: noindex legacy redirect.
- `_includes/sidebar.html`: canonical project navigation and localized labels.
- `css/main.scss`: link-based language selector and article byline styling.
- `_layouts/post.html`: author metadata and responsive featured-image marker.
- `.github/workflows/pages.yml`: install the deterministic WebP encoders.
- `test/site_contract_test.rb`: source and generated-site regression contracts.

### Task 1: Protect titles, routes, categories, and language behavior

**Files:**
- Modify: `test/site_contract_test.rb`

- [ ] **Step 1: Write failing source contracts**

Add tests that require the approved source shape:

```ruby
def test_seo_scope_preserves_existing_titles_and_description
  config = YAML.safe_load(ROOT.join("_config.yml").read)
  assert_equal "Pablo Reyes", config.fetch("title")
  assert_equal "Desarrollo de software, tecnología, producto y análisis de datos",
               config.fetch("description")
  assert_equal "Proyectos", front_matter(ROOT.join("projects/index.md")).fetch("title")
end

def test_categories_are_retired
  refute ROOT.join("categories.md").exist?
  refute ROOT.join("_layouts/categories.html").exist?
end

def test_projects_have_static_language_routes
  spanish = front_matter(ROOT.join("projects/index.md"))
  english = front_matter(ROOT.join("en/projects/index.md"))
  assert_equal "/projects/", spanish.fetch("permalink")
  assert_equal "es", spanish.fetch("lang")
  assert_equal "/en/projects/", english.fetch("permalink")
  assert_equal "en", english.fetch("lang")
  refute ROOT.join("js/projects-lang.js").exist?
end
```

Add a `front_matter(path)` helper using `YAML.safe_load` on the text between the
opening YAML delimiters.

- [ ] **Step 2: Run the tests and verify RED**

Run:

```bash
asdf exec bundle exec ruby -Itest test/site_contract_test.rb
```

Expected: failures for missing project routes, retained categories, and retained
language JavaScript.

- [ ] **Step 3: Commit the red contract**

```bash
git add test/site_contract_test.rb
git commit -m "test: define SEO route contracts"
```

### Task 2: Publish crawlable project language pages

**Files:**
- Create: `projects/index.md`
- Create: `en/projects/index.md`
- Modify: `about/index.md`
- Modify: `_includes/project-list.html`
- Modify: `_includes/sidebar.html`
- Modify: `_includes/head.html`
- Modify: `css/main.scss`
- Delete: `js/projects-lang.js`
- Delete: `categories.md`
- Delete: `_layouts/categories.html`

- [ ] **Step 1: Add the Spanish page**

Use this front matter and pass an explicit language to the project include:

```yaml
---
layout: default
title: "Proyectos"
permalink: /projects/
lang: es
translation_key: projects
body_class: projects-page
---
```

The language selector uses anchors:

```html
<a class="lang-link active" href="/projects/" lang="es" aria-current="page">ES</a>
<span class="separator" aria-hidden="true">|</span>
<a class="lang-link" href="/en/projects/" lang="en">EN</a>
```

Render `{% include project-list.html lang="es" %}`.

- [ ] **Step 2: Add the English page**

Use:

```yaml
---
layout: default
title: "Projects"
description: "Software development, technology, product, and data analysis"
permalink: /en/projects/
lang: en
translation_key: projects
body_class: projects-page
---
```

Use reciprocal ES/EN anchors, set `aria-current="page"` on EN, and render
`{% include project-list.html lang="en" %}`.

- [ ] **Step 3: Render a single project language**

At the top of `_includes/project-list.html`, select:

```liquid
{% assign project_lang = include.lang | default: page.lang | default: site.lang %}
```

For English pages render `summary_en` and `purpose_en`; otherwise render
`summary` and `purpose`. Localize modal and technology `aria-label` text through
the same branch. Do not change project titles, URLs, images, or technology
lists.

- [ ] **Step 4: Convert About to a legacy redirect**

Replace `about/index.md` with:

```yaml
---
layout: default
title: "Proyectos"
permalink: /about/
canonical_url: /projects/
redirect_to: /projects/
robots: noindex
sitemap: false
---
```

The body contains a short linked fallback to `/projects/`.

- [ ] **Step 5: Add head routing metadata**

In `_includes/head.html`:

```liquid
{% assign canonical_path = page.canonical_url | default: page.url %}
{% assign canonical_url = canonical_path | replace: 'index.html', '' | absolute_url %}
{% if page.robots %}<meta name="robots" content="{{ page.robots | escape }}">{% endif %}
{% if page.redirect_to %}
  <meta http-equiv="refresh" content="0; url={{ page.redirect_to | relative_url }}">
{% endif %}
{% if page.translation_key == "projects" %}
  <link rel="alternate" hreflang="es" href="{{ '/projects/' | absolute_url }}">
  <link rel="alternate" hreflang="en" href="{{ '/en/projects/' | absolute_url }}">
  <link rel="alternate" hreflang="x-default" href="{{ '/projects/' | absolute_url }}">
{% endif %}
```

- [ ] **Step 6: Update navigation and styles**

Point the project navigation to `/projects/`. Use `translation_key` to mark it
active and localize the two navigation labels on the English page. Keep the
existing `lang-link` presentation, replace button-only declarations where
needed, and delete the `.lang-es`/`.lang-en` visibility rules.

- [ ] **Step 7: Remove categories and old JavaScript**

Delete the two category files and `js/projects-lang.js`.

- [ ] **Step 8: Run source contracts and verify GREEN**

Run:

```bash
asdf exec bundle exec ruby -Itest test/site_contract_test.rb
```

Expected: all source checks pass; generated checks may still reflect the
previous build until Task 5.

- [ ] **Step 9: Commit**

```bash
git add projects en about _includes css test .github
git add -u categories.md _layouts/categories.html js/projects-lang.js
git commit -m "feat: publish localized project pages"
```

### Task 3: Add accurate structured data

**Files:**
- Create: `_includes/structured-data.html`
- Modify: `_includes/head.html`
- Modify: `_layouts/post.html`
- Modify: `css/main.scss`
- Modify: `test/site_contract_test.rb`

- [ ] **Step 1: Write failing JSON-LD contracts**

Require `json`, then parse every JSON-LD script from generated fixtures after a
build. Add focused assertions:

```ruby
home_graph = json_ld_graph(SITE.join("index.html"))
assert_includes home_graph.map { |item| item.fetch("@type") }, "WebSite"
assert_includes home_graph.map { |item| item.fetch("@type") }, "Person"

article = json_ld_graph(SITE.join("observatorio-atalaya/index.html")).first
assert_equal "BlogPosting", article.fetch("@type")
assert_equal "Pablo Reyes", article.dig("author", "name")

projects = json_ld_graph(SITE.join("projects/index.html")).first
assert_equal "CollectionPage", projects.fetch("@type")
assert_equal EXPECTED_PROJECT_IDS.size, projects.dig("mainEntity", "itemListElement").size
```

- [ ] **Step 2: Build and verify RED**

```bash
JEKYLL_ENV=production asdf exec bundle exec jekyll build
asdf exec bundle exec ruby -Itest test/site_contract_test.rb
```

Expected: JSON-LD assertions fail because no scripts exist yet.

- [ ] **Step 3: Add the structured-data include**

Render one `<script type="application/ld+json">` using `jsonify` for all dynamic
strings. Use these page mappings:

```liquid
{% if page.url == "/" %}
  { "@context": "https://schema.org", "@graph": [WebSite, Person] }
{% elsif page.layout == "post" %}
  { "@context": "https://schema.org", "@type": "BlogPosting", ... }
{% elsif page.translation_key == "projects" %}
  { "@context": "https://schema.org", "@type": "CollectionPage",
    "mainEntity": { "@type": "ItemList", "itemListElement": [...] } }
{% endif %}
```

Use the existing canonical URL, meta description, author name, page language,
publication date, image, and project data. Do not emit a script on the legacy
redirect.

- [ ] **Step 4: Include JSON-LD from the head**

Add:

```liquid
{% include structured-data.html
   canonical_url=canonical_url
   meta_description=meta_description %}
```

after the canonical and language metadata.

- [ ] **Step 5: Add the compact article author**

Render:

```html
<span class="post-meta__author">Pablo Reyes</span>
```

beside the current date and separate the values with a CSS pseudo-element or
an `aria-hidden` separator. Keep tags and article titles unchanged.

- [ ] **Step 6: Rebuild and verify GREEN**

Run:

```bash
JEKYLL_ENV=production asdf exec bundle exec jekyll build
asdf exec bundle exec ruby -Itest test/site_contract_test.rb
```

Expected: JSON parsing and page-type assertions pass.

- [ ] **Step 7: Commit**

```bash
git add _includes/structured-data.html _includes/head.html _layouts/post.html css/main.scss test/site_contract_test.rb
git commit -m "feat: add structured SEO metadata"
```

### Task 4: Generate responsive article images

**Files:**
- Create: `_plugins/responsive_article_images.rb`
- Modify: `_layouts/post.html`
- Modify: `.gitignore`
- Modify: `.github/workflows/pages.yml`
- Modify: `test/site_contract_test.rb`

- [ ] **Step 1: Write failing image contracts**

Add generated-site assertions that every local image in a post is wrapped by a
picture with WebP candidates and intrinsic dimensions:

```ruby
article = SITE.join("observatorio-atalaya/index.html").read
pictures = article.scan(/<picture class="responsive-article-image">.*?<\/picture>/m)
assert_equal 23, pictures.size
pictures.each do |picture|
  assert_match(/type="image\/webp"/, picture)
  assert_match(/\bsrcset="[^"]+\.webp \d+w/, picture)
  assert_match(/<img[^>]+\bwidth="\d+"[^>]+\bheight="\d+"/, picture)
end
```

Assert that generated paths referenced from `srcset` exist in `_site`, the
featured image retains `fetchpriority="high"`, and body pictures remain lazy.

- [ ] **Step 2: Build and verify RED**

```bash
JEKYLL_ENV=production asdf exec bundle exec jekyll build
asdf exec bundle exec ruby -Itest test/site_contract_test.rb
```

Expected: no responsive article-picture markup and no generated derivatives.

- [ ] **Step 3: Implement intrinsic-dimension parsing**

In `_plugins/responsive_article_images.rb`, add pure-Ruby readers for PNG, GIF,
and JPEG headers:

```ruby
module PabloReyes
  module ResponsiveArticleImages
    WIDTHS = [480, 960, 1440].freeze

    def self.dimensions(path)
      case path.extname.downcase
      when ".png" then png_dimensions(path)
      when ".gif" then gif_dimensions(path)
      when ".jpg", ".jpeg" then jpeg_dimensions(path)
      else raise "Unsupported image format: #{path.extname}"
      end
    end
  end
end
```

Raise `Jekyll::Errors::FatalException` for invalid referenced local images.

- [ ] **Step 4: Generate deterministic variants**

Register a `:site, :post_read` hook. Discover `page.image` plus Markdown image
URLs from `site.posts.docs`, normalize `/images/...` and `../images/...`, and
generate into `.jekyll-cache/responsive-article-images`.

For PNG/JPEG:

```ruby
Open3.capture3(
  "cwebp", "-quiet", "-mt", "-metadata", "none", "-q", "78",
  "-resize", width.to_s, "0", source.to_s, "-o", destination.to_s
)
```

For GIF:

```ruby
Open3.capture3(
  "gif2webp", "-quiet", "-mt", "-metadata", "none", "-q", "75",
  source.to_s, "-o", destination.to_s
)
```

Generate only non-upscaled widths, always including `min(original_width, 1440)`.
Register each cached result as a `Jekyll::StaticFile` destined for
`images/generated/articles/...`.

- [ ] **Step 5: Rewrite rendered post images**

Register a `:documents, :post_render` hook restricted to posts. Replace each
local `<img>` with:

```html
<picture class="responsive-article-image">
  <source
    type="image/webp"
    srcset="/images/generated/articles/example-480.webp 480w, ..."
    sizes="(max-width: 48rem) calc(100vw - 2rem), 44rem">
  <img src="/images/uploads/example.png"
       alt="..."
       width="..."
       height="..."
       loading="lazy"
       decoding="async">
</picture>
```

Preserve all existing attributes and classes. Use the wider 64rem `sizes`
contract and the existing `fetchpriority="high"` for `.post-image-featured`.

- [ ] **Step 6: Configure cache and CI**

Ignore:

```gitignore
.jekyll-cache/responsive-article-images/
```

Before the workflow source test, add:

```yaml
- name: Install image encoders
  run: sudo apt-get update && sudo apt-get install --yes webp
```

- [ ] **Step 7: Build and verify GREEN**

Run:

```bash
JEKYLL_ENV=production asdf exec bundle exec jekyll build
asdf exec bundle exec ruby -Itest test/site_contract_test.rb
```

Expected: responsive article-picture, fallback, dimension, and internal-file
contracts pass.

- [ ] **Step 8: Measure the generated media**

Compare the original and responsive candidates for the observatory article.
Confirm the 960px WebP set is materially smaller than the 20.48 MiB original
set and record the byte totals for handoff.

- [ ] **Step 9: Commit**

```bash
git add _plugins/responsive_article_images.rb _layouts/post.html .gitignore .github/workflows/pages.yml test/site_contract_test.rb
git commit -m "feat: optimize article images at build time"
```

### Task 5: Complete generated-site contracts

**Files:**
- Modify: `test/site_contract_test.rb`

- [ ] **Step 1: Assert final routing output**

Require:

```ruby
refute SITE.join("categories").exist?
refute_includes SITE.join("sitemap.xml").read, "/categories/"
assert SITE.join("projects/index.html").file?
assert SITE.join("en/projects/index.html").file?
assert_match(/noindex/, SITE.join("about/index.html").read)
```

Assert reciprocal `hreflang` values, correct `<html lang>`, correct canonicals,
and all eleven project IDs on both pages.

- [ ] **Step 2: Verify RED against any missing contract**

Run the full production build and tests. If the new test passes immediately,
temporarily revert the relevant implementation line, confirm the test fails for
the intended reason, then restore it.

- [ ] **Step 3: Implement the minimal correction**

Adjust only the template or plugin output named by the failing assertion.

- [ ] **Step 4: Run the complete verification**

```bash
asdf exec bundle exec ruby -Itest test/site_contract_test.rb
JEKYLL_ENV=production asdf exec bundle exec jekyll build
asdf exec bundle exec ruby -Itest test/site_contract_test.rb
git diff --check
```

Expected: zero failures, zero errors, clean diff check.

- [ ] **Step 5: Commit**

```bash
git add test/site_contract_test.rb
git commit -m "test: harden generated SEO contracts"
```

### Task 6: Browser and deployment-readiness verification

**Files:**
- No tracked files expected.

- [ ] **Step 1: Serve the generated site**

Serve `_site` on an available loopback port.

- [ ] **Step 2: Inspect desktop and mobile**

At 1440×1000 and 390×844 inspect:

- `/`;
- `/observatorio-atalaya/`;
- `/projects/`;
- `/en/projects/`;
- `/about/`;
- `/categories/`.

Confirm titles are unchanged, project layouts do not shift, article images use
WebP current sources, no page overflows horizontally, languages and canonicals
match, About redirects, and Categories returns 404.

- [ ] **Step 3: Validate structured data**

Parse each JSON-LD block in the browser and confirm the same page-type contracts
as the Minitest suite.

- [ ] **Step 4: Run fresh final verification**

```bash
asdf exec bundle exec ruby -Itest test/site_contract_test.rb
JEKYLL_ENV=production asdf exec bundle exec jekyll build
asdf exec bundle exec ruby -Itest test/site_contract_test.rb
git status --short --branch
git log --oneline --decorate -8
```

- [ ] **Step 5: Prepare integration handoff**

Summarize exact tests, original/optimized article bytes, route behavior, and
whether the branch is only local or has been published. Do not push or open a
pull request unless explicitly authorized.
