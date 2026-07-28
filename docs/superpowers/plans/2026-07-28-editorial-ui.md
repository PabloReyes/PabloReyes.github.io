# Editorial UI Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved editorial developer-notebook design, including
responsive thumbnails and shareable desktop/mobile validation screenshots.

**Architecture:** Keep the existing Jekyll templates and native dialog, adding a
small source-level design system in `css/main.scss`. Templates derive deterministic
thumbnail URLs from existing post and project image names; generated WebP assets are
committed so GitHub Pages needs no image-processing plugin.

**Tech Stack:** Jekyll, Liquid, SCSS, Ruby/Minitest, `cwebp`, in-app browser.

---

### Task 1: Protect the approved design with failing contracts

**Files:**
- Modify: `test/site_contract_test.rb`

- [ ] **Step 1: Add a source design contract**

Add assertions for the flat palette tokens, separate UI/reading font stacks,
44rem reading measure, balanced/pretty wrapping, non-sticky language selector,
five-tag project limit, and responsive `<picture>` markup.

- [ ] **Step 2: Add a thumbnail asset contract**

For every post image, require deterministic 320px and 640px WebP files below
`images/thumbnails`. For every project image, require deterministic 480px and
960px WebP files below `about/thumbnails`.

- [ ] **Step 3: Run the contract and verify RED**

Run:

```bash
/Users/reyes/.asdf/shims/bundle exec ruby -Itest test/site_contract_test.rb
```

Expected: failures identify missing design tokens, template markup, and thumbnail
assets.

### Task 2: Generate responsive image derivatives

**Files:**
- Create: `images/thumbnails/**/*.webp`
- Create: `about/thumbnails/*.webp`

- [ ] **Step 1: Derive post image paths from front matter**

For each tracked post image below `/images/uploads`, create two WebP derivatives
that preserve the relative directory and replace the extension:

```text
images/thumbnails/<relative-name>.webp
images/thumbnails/<relative-name>@2x.webp
```

Use widths 320 and 640, never upscale, and encode with `cwebp -q 78`.

- [ ] **Step 2: Derive project image paths from project data**

Create `<stem>.webp` and `<stem>@2x.webp` below `about/thumbnails`, using widths
480 and 960 and `cwebp -q 80`.

- [ ] **Step 3: Re-run the thumbnail contract**

Run the focused Minitest file and confirm that only CSS/template expectations
remain red.

### Task 3: Implement the editorial visual system

**Files:**
- Modify: `_sass/_typography.scss`
- Modify: `_sass/mobile.scss`
- Modify: `css/main.scss`
- Modify: `_includes/sidebar.html`

- [ ] **Step 1: Define the exact design tokens**

Add:

```scss
:root {
  --color-bg: #fafaf8;
  --color-surface: #ffffff;
  --color-ink: #202124;
  --color-muted: #667085;
  --color-border: #e5e7eb;
  --color-accent: #b44937;
  --font-ui: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-reading: Georgia, Cambria, "Times New Roman", serif;
  --measure-reading: 44rem;
  --measure-media: 64rem;
}
```

- [ ] **Step 2: Restyle global type and spacing**

Use system UI type for site chrome/headings, serif for `.post-content`, balanced
heading wrapping, pretty prose wrapping, readable 18–20px body type, a 1.7 article
line height, accessible muted text, and a flat background.

- [ ] **Step 3: Compress and simplify the header**

Remove the gradient, blur and filled-pill navigation. Apply the approved short
description and underline active state, keeping 44px targets and visible focus.

- [ ] **Step 4: Constrain prose and media**

Cap `.post-container--single` and `.post-content` at 44rem, allow featured media
to use the media measure, remove narrow-screen floats, and make code blocks
horizontally scrollable.

- [ ] **Step 5: Verify GREEN for the visual-system contract**

Run the Minitest contract and confirm token/type/layout assertions pass.

### Task 4: Implement compact home and project lists

**Files:**
- Modify: `_includes/post-list-cards.html`
- Modify: `_includes/project-list.html`
- Modify: `about/index.md`
- Modify: `css/main.scss`

- [ ] **Step 1: Add responsive post pictures**

Derive the post thumbnail stem in Liquid and render:

```html
<picture class="post-entry__media">
  <source srcset="...webp 1x, ...@2x.webp 2x" type="image/webp">
  <img src="original" alt="" loading="lazy" decoding="async">
</picture>
```

The first image keeps `fetchpriority="high"` instead of lazy loading.

- [ ] **Step 2: Add responsive project pictures**

Use 480/960 WebP sources for card previews, retain the original in
`data-modal-src`, and keep the native image button semantics.

- [ ] **Step 3: Simplify project information**

Render summary and purpose within `.project-description`, remove the duplicate
bottom CTA, limit technology labels with `{% limit: 5 %}`, and move the language
control into `.projects-heading`.

- [ ] **Step 4: Implement mobile-first list layouts**

Use compact side-by-side article previews at all widths, enlarge only their column
from 700px, stack projects below 700px, and use a two-column project layout above
700px.

- [ ] **Step 5: Run contracts and production build**

Run:

```bash
/Users/reyes/.asdf/shims/bundle exec ruby -Itest test/site_contract_test.rb
/Users/reyes/.asdf/shims/bundle exec jekyll build
/Users/reyes/.asdf/shims/bundle exec ruby -Itest test/site_contract_test.rb
```

Expected: 0 failures and a successful build.

### Task 5: Browser verification and remote screenshots

**Files:**
- Create: `artifacts/editorial-ui/*.png` (untracked review artifacts)

- [ ] **Step 1: Serve the production build**

Run a local static server on an available loopback port.

- [ ] **Step 2: Verify responsive behaviour**

Inspect `/`, `/observatorio-atalaya/`, and `/about/` at 1440×1000, 768×900,
and 390×844. Confirm no horizontal overflow and inspect computed reading width,
header height, metadata contrast, project tag size, and language-control position.

- [ ] **Step 3: Exercise project interactions**

Switch Projects to English, open a project image with the image button, and close
the native dialog with Escape.

- [ ] **Step 4: Capture screenshots**

Save and share at least:

- desktop home;
- desktop article;
- desktop projects;
- mobile home;
- mobile article;
- mobile projects.

- [ ] **Step 5: Run final verification**

Run the full Minitest contract and Jekyll build again, then inspect `git diff`,
`git status`, and confirm the branch remains local and unpushed.
