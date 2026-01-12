PabloReyes.github.io
====================

Personal Website on GithubPages

# ⚠️ Ruby Compatibility Note
Jekyll and GitHub Pages require Ruby 3.2.x or lower. Ruby 3.3.x is not supported due to eventmachine native extension build errors. Use Ruby 3.2.3 for local development.

# Jekyll 4.4.1 note (GitHub Pages)
This repo uses `jekyll 4.4.1` (see `Gemfile`). GitHub Pages’ built-in Jekyll build does not track the latest Jekyll versions, so deploy via GitHub Actions if you want GitHub-hosted output to match local builds.

Deployment is configured in `.github/workflows/pages.yml`. In GitHub repo settings, set **Pages → Source** to **GitHub Actions**.

# Running it locally
1. Install asdf:
   ```bash
   brew install asdf
   ```

2. Add asdf to your shell:
   ```bash
   echo -e '\n. $(brew --prefix asdf)/libexec/asdf.sh' >> ~/.zshrc
   source ~/.zshrc
   ```

3. Install Ruby plugin for asdf:
   ```bash
   asdf plugin add ruby
   ```

4. Install the required Ruby version (use 3.2.3):
   ```bash
   asdf install ruby 3.2.3
   asdf local ruby 3.2.3
   ```

5. Install dependencies for native gems (macOS):
   ```bash
   brew install openssl libffi pkg-config
   export PKG_CONFIG_PATH="$(brew --prefix openssl)/lib/pkgconfig:$(brew --prefix libffi)/lib/pkgconfig"
   ```

6. Install bundler via gem:
   ```bash
   asdf exec gem install bundler -v 2.7.1
   ```

7. Install dependencies:
   ```bash
   asdf exec bundle install
   ```

8. Run the server:
   ```bash
   asdf exec bundle exec jekyll serve --livereload
   ```
