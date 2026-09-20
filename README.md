# Pablo Reyes — Personal Blog

This repository contains the source code for my personal blog/website (Jekyll), published at [pabloreyes.es](https://pabloreyes.es).

I mainly write about software development, technology, product, and data analysis, plus notes and resources I want to keep around.

## Local development (personal use)

### Requirements

- Docker (recommended). Ruby `4.0.6` is pinned in `.ruby-version` / `.tool-versions` / `Gemfile` and is not packaged for Ubuntu or macOS, so the site is built inside a local Docker image.
- Alternatively, a native Ruby `4.0.6` with Bundler if you already have one. A native build also needs the `webp` encoders (`apt install webp` or `brew install webp`).

### Install dependencies

```bash
./install.sh
```

This builds the local `pabloreyes-jekyll:4.0.6` image (base `ruby:4.0.6` plus the `webp` encoders used by `_plugins/responsive_article_images.rb`) and installs gems into the `jekyll-bundle` Docker volume. If Docker is not available, it falls back to a native Ruby `4.0.6` when present.

### Run

```bash
docker run --rm -it -p 4000:4000 \
  -v "$PWD:/app" -v jekyll-bundle:/usr/local/bundle -w /app \
  pabloreyes-jekyll:4.0.6 bundle exec jekyll serve --host 0.0.0.0 --livereload
```

Open <http://localhost:4000>. With a native Ruby, just run:

```bash
bundle exec jekyll serve --livereload
```

### Production build (compile check)

```bash
docker run --rm -v "$PWD:/app" -v jekyll-bundle:/usr/local/bundle -w /app \
  pabloreyes-jekyll:4.0.6 bundle exec ruby test/site_contract_test.rb

docker run --rm -e JEKYLL_ENV=production -v "$PWD:/app" -v jekyll-bundle:/usr/local/bundle -w /app \
  pabloreyes-jekyll:4.0.6 bundle exec jekyll build

docker run --rm -v "$PWD:/app" -v jekyll-bundle:/usr/local/bundle -w /app \
  pabloreyes-jekyll:4.0.6 bundle exec ruby test/site_contract_test.rb
```

### GitHub Pages deployment

This repo uses `jekyll 4.4.1` (see `Gemfile`). Since GitHub Pages doesn’t always track the latest Jekyll versions, deployment is done via GitHub Actions.

- Workflow: `.github/workflows/pages.yml`
- Recommended setting: **Settings → Pages → Source → GitHub Actions**

## License

See `LICENSE` (Apache-2.0).
