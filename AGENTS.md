# Repository Guidelines

## Project Structure & Module Organization
- Jekyll site with content in `_posts/` (published articles), `_drafts/` (unpublished), and page folders like `about/` and `finanzas/`.
- Layouts live in `_layouts/`; reusable snippets in `_includes/`; shared styles in `_sass/` and compiled/custom CSS in `css/`.
- Static assets sit in `images/`, `fonts/`, and `js/`. The generated site outputs to `_site/`—never edit or commit build artifacts there.
- `_config.yml` holds site metadata and plugin toggles; `params.json` stores profile values referenced by templates.

## Build, Test, and Development Commands
- Use Ruby 3.2.3 (see `.tool-versions`/`.ruby-version`). If you use `asdf`, prefer `asdf exec ...` to avoid system/Homebrew Ruby conflicts.
- Install deps: `asdf exec bundle install` (or run `./install.sh`).
- Local preview: `asdf exec bundle exec jekyll serve --livereload` starts the dev server on http://localhost:4000 with file watching.
- Production check: `asdf exec bundle exec jekyll build` creates `_site/` to verify templates/front matter compile without errors.

## Coding Style & Naming Conventions
- Prefer two-space indentation for HTML, Liquid, and Sass, matching existing files.
- Blog posts: name files `YYYY-MM-DD-title.md` inside `_posts/` with YAML front matter (`layout`, `title`, `date`, `categories`, `tags`, `lang`, etc.).
- Favor lowercase kebab-case for asset filenames (`images/finanzas-overview.png`) and CSS classes; keep variable names descriptive in Liquid and Sass.
- Run `bundle exec jekyll build` before pushing to catch Liquid/front matter issues; keep inline script/style changes minimal and organized per directory (JS in `js/`, styles in `_sass/`/`css/`).

## Testing Guidelines
- No automated test suite; validate by running `bundle exec jekyll build` for errors and then `bundle exec jekyll serve --livereload` to spot template regressions.
- Check links and images manually on the served site; for new posts, verify dates, permalinks, and language front matter render correctly.

## Commit & Pull Request Guidelines
- Commit messages are short and imperative (e.g., `update hero image`, `fix navbar links`); group related changes per commit.
- PRs should explain the change, note build/serve commands run, and include before/after screenshots or screen recordings for visual updates.
- Link any related issues, call out content vs. layout changes, and mention if assets were added/removed to simplify review.
