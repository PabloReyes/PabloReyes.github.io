#!/usr/bin/env bash
set -e

# 1. Install asdf (if not installed)
if ! command -v asdf >/dev/null 2>&1; then
  echo "Please install asdf manually (brew install asdf) and add it to your shell config."
  exit 1
fi

# 2. Ensure asdf is loaded
if ! command -v asdf >/dev/null 2>&1; then
  if [ -f "$HOME/.asdf/asdf.sh" ]; then
    . "$HOME/.asdf/asdf.sh"
  elif command -v brew >/dev/null 2>&1 && [ -f "$(brew --prefix asdf)/libexec/asdf.sh" ]; then
    . "$(brew --prefix asdf)/libexec/asdf.sh"
  fi
fi

# 3. Install Ruby plugin
if ! asdf plugin list | grep -q '^ruby$'; then
  asdf plugin add ruby
fi

# 4. Install Ruby 3.2.3
asdf install ruby 3.2.3 || true
asdf set ruby 3.2.3

# 5. Install native dependencies (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
  brew install openssl libffi pkg-config
  export PKG_CONFIG_PATH="$(brew --prefix openssl)/lib/pkgconfig:$(brew --prefix libffi)/lib/pkgconfig"
fi

# 6. Install bundler
if ! gem list bundler -i >/dev/null 2>&1; then
  gem install bundler
fi

# 7. Install project dependencies
bundle install

echo "\nAll dependencies installed. You can now run: bundle exec jekyll serve --watch"

