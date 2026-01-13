# Pablo Reyes — Personal Blog

This repository contains the source code for my personal blog/website (Jekyll), published at [pabloreyes.es](http://pabloreyes.es).

I mainly write about technology, business culture, and personal finance, plus notes and resources I want to keep around.

## Local development (personal use)

### Requirements

- Ruby `3.2.3` (see `.ruby-version` / `.tool-versions`)
- Bundler

Note: GitHub Pages/Jekyll and some native gems tend to break on Ruby `3.3.x` (for example `eventmachine`), which is why this repo sticks to `3.2.x`.

### Install dependencies

If you use `asdf`:

```bash
asdf install
asdf exec bundle install
```

### Run

```bash
asdf exec bundle exec jekyll serve --livereload
```

### Production build (compile check)

```bash
asdf exec bundle exec jekyll build
```

### GitHub Pages deployment

This repo uses `jekyll 4.4.1` (see `Gemfile`). Since GitHub Pages doesn’t always track the latest Jekyll versions, deployment is done via GitHub Actions.

- Workflow: `.github/workflows/pages.yml`
- Recommended setting: **Settings → Pages → Source → GitHub Actions**

## License

See `LICENSE` (Apache-2.0).
