# Repository Guidelines

## Project Structure & Module Organization
- Jekyll site with content in `_posts/` (published articles), `_drafts/` (unpublished), and the project portfolio in `about/`.
- Layouts live in `_layouts/`; reusable snippets in `_includes/`; shared styles in `_sass/` and compiled/custom CSS in `css/`.
- Static assets sit in `images/`, `fonts/`, and `js/`. The generated site outputs to `_site/`—never edit or commit build artifacts there.
- `_config.yml` holds site metadata and plugin toggles; `_data/projects.yml` is the source of truth for the project portfolio.

## Build, Test, and Development Commands
- Use Ruby 4.0.6 (see `.tool-versions`/`.ruby-version`). If you use `asdf`, prefer `asdf exec ...` to avoid system/Homebrew Ruby conflicts.
- Install deps: `asdf exec bundle install` (or run `./install.sh`).
- Local preview: `asdf exec bundle exec jekyll serve --livereload` starts the dev server on http://localhost:4000 with file watching.
- Contract tests: `asdf exec bundle exec ruby test/site_contract_test.rb`.
- Production check: `JEKYLL_ENV=production asdf exec bundle exec jekyll build` creates `_site/` to verify templates/front matter compile without errors. Run the contract tests again after building to validate generated HTML and links.

## Coding Style & Naming Conventions
- Prefer two-space indentation for HTML, Liquid, and Sass, matching existing files.
- Blog posts: name files `YYYY-MM-DD-title.md` inside `_posts/` with YAML front matter (`layout`, `title`, `date`, `categories`, `tags`, `lang`, etc.).
- Favor lowercase kebab-case for asset filenames (`images/project-preview.png`) and CSS classes; keep variable names descriptive in Liquid and Sass.
- Run `bundle exec jekyll build` before pushing to catch Liquid/front matter issues; keep inline script/style changes minimal and organized per directory (JS in `js/`, styles in `_sass/`/`css/`).

## Testing Guidelines
- Run `bundle exec ruby test/site_contract_test.rb` before and after `bundle exec jekyll build`.
- Check the served site at desktop and mobile widths; for new posts, verify dates, permalinks, links, images, and language front matter render correctly.
- Do not remove or rename entries in `_data/projects.yml` without an explicit product decision; the test suite freezes the published project set.

## Commit & Pull Request Guidelines
- Commit messages are short and imperative (e.g., `update hero image`, `fix navbar links`); group related changes per commit.
- PRs should explain the change, note build/serve commands run, and include before/after screenshots or screen recordings for visual updates.
- Link any related issues, call out content vs. layout changes, and mention if assets were added/removed to simplify review.
