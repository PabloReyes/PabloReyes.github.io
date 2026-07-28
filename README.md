# Pablo Reyes — Personal Blog

This repository contains the source code for my personal blog/website (Jekyll), published at [blog.pabloreyes.es](https://blog.pabloreyes.es).

I mainly write about software development, technology, product, and data analysis, plus notes and resources I want to keep around.

## Local development (personal use)

### Requirements

- Ruby `4.0.6` (see `.ruby-version` / `.tool-versions`)
- Bundler

### Install dependencies

If you use `asdf`:

```bash
./install.sh
```

### Run

```bash
asdf exec bundle exec jekyll serve --livereload
```

### Production build (compile check)

```bash
asdf exec bundle exec ruby test/site_contract_test.rb
asdf exec bundle exec jekyll build
asdf exec bundle exec ruby test/site_contract_test.rb
```

### GitHub Pages deployment

This repo uses `jekyll 4.4.1` (see `Gemfile`). Since GitHub Pages doesn’t always track the latest Jekyll versions, deployment is done via GitHub Actions.

- Workflow: `.github/workflows/pages.yml`
- Recommended setting: **Settings → Pages → Source → GitHub Actions**

## License

See `LICENSE` (Apache-2.0).
