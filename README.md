# Pablo Reyes — Personal Blog

This repository contains the source code for my personal blog/website (Jekyll), published at [pabloreyes.es](https://pabloreyes.es).

I mainly write about software development, technology, product, and data analysis, plus notes and resources I want to keep around.

## Local development (personal use)

### Requirements

- Ruby `4.0.6` (see `.ruby-version` / `.tool-versions`)
- Bundler

### Install dependencies

On Arch/Omarchy, use the native installer:

```bash
./install_arch.sh
```

On macOS with `asdf`:

```bash
./install.sh
```

### Run

On Arch/Omarchy:

```bash
mise exec -- bundle exec jekyll serve --livereload
```

On macOS with `asdf`:

```bash
asdf exec bundle exec jekyll serve --livereload
```

### Production build (compile check)

On Arch/Omarchy:

```bash
mise exec -- bundle exec ruby test/site_contract_test.rb
mise exec -- bundle exec jekyll build
mise exec -- bundle exec ruby test/site_contract_test.rb
```

On macOS with `asdf`:

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
