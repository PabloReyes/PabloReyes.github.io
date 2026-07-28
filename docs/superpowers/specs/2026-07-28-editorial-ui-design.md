# Editorial UI Refresh Design

## Intent

Turn the current site into a restrained editorial developer notebook: comfortable
for long-form reading, easy to scan when posts are infrequent, and modern without
adding product-style UI, promotional blocks, or maintenance-heavy features.

The existing articles and all eleven projects remain available. This refresh changes
presentation, not the scope of the portfolio.

## Visual system

- Use the browser's system sans-serif stack for navigation, headings, dates, tags,
  buttons, and footer text.
- Keep a native serif stack for article prose so long posts remain warm and readable.
- Use a flat warm-neutral page background, white media surfaces, dark ink text,
  stronger muted text, subtle neutral rules, and one terracotta accent.
- Remove gradients, large backdrop blurs, decorative shadows, and slow colour
  transitions.
- Use a consistent 4/8px spacing scale and fluid type/space values only where they
  improve the transition between phone and desktop.

## Site header

The header remains a simple identity block with the site name, short description,
and two navigation links. It becomes substantially shorter, uses sans-serif UI
typography, and replaces filled pills with a quiet underline-based active state.
The header description becomes: "Software, tecnología, producto y las cosas que
construyo."

## Article index

The index becomes a compact editorial list. Thumbnails are secondary rather than
dominant: a fixed compact preview sits beside title, date, and a two-line excerpt
from 700px upward; on narrow phones it remains a small right-hand preview instead
of expanding into a full-width banner. The title and excerpt carry the hierarchy.

Generated WebP thumbnails at 320px and 640px provide resolution switching. Original
images remain the fallback and article source.

## Article reading experience

Article chrome and prose use separate measures:

- prose is capped at 44rem;
- featured media may use a wider 64rem media measure;
- desktop body copy is 19–20px with a 1.7 line height;
- mobile body copy is 18px;
- headings use balanced wrapping and prose uses pretty wrapping;
- dates meet normal-text contrast requirements;
- inline links remain underlined;
- floated legacy images become centered figures on narrow screens;
- code blocks scroll horizontally and use a quiet neutral treatment.

## Projects

Projects remain a one-column chronological list. Each item keeps its screenshot,
title, year, description, purpose, and technology context, but presentation is
reduced:

- summary and purpose appear as one description block;
- the linked title is the sole project CTA;
- at most five primary technology labels are shown;
- labels use at least 13px text;
- the ES/EN control sits beside the page heading and is not sticky;
- projects without a public URL remain fully represented without a disabled CTA.

Project WebP thumbnails at 480px and 960px reduce mobile transfer size while the
original files remain available to the image dialog.

## Responsive behaviour

The layout is mobile-first. Compact list previews remain side-by-side at phone and
tablet widths, changing proportions at a content-driven 700px breakpoint. Project
cards stack on phones and use a restrained two-column media/text layout from 700px.
All controls keep at least a 44px touch target, and no layout may introduce
horizontal scrolling at 390px, 768px, or 1440px.

## Accessibility and interaction

- Preserve the native dialog used for project image enlargement.
- Keep visible focus rings using the single terracotta accent.
- Use underlines in article links and clear active navigation semantics.
- Use tabular numerals for dates and project years.
- Do not add animation; existing decorative transitions and backdrop blur are
  removed.

## Deliberate exclusions

No sidebar, search, newsletter, tag cloud, comments redesign, dark mode, animated
hero, card grid, or additional navigation section is introduced.

## Validation

The change is complete when:

- source contract tests cover the visual-system and responsive-image contracts;
- the production Jekyll build succeeds;
- generated pages have no missing internal assets;
- desktop, tablet, and phone browser checks show no horizontal overflow;
- the home page, a representative article, and Projects are visually captured at
  desktop and phone sizes for remote review.
