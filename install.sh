#!/usr/bin/env bash
set -euo pipefail

if ! command -v asdf >/dev/null 2>&1; then
  echo "asdf is required. Install it with Homebrew and restart your shell:"
  echo "  brew install asdf"
  exit 1
fi

if ! asdf plugin list | grep -q '^ruby$'; then
  asdf plugin add ruby
fi
asdf plugin update ruby

if [[ "$OSTYPE" == "darwin"* ]]; then
  if ! command -v brew >/dev/null 2>&1; then
    echo "Homebrew is required to install Ruby native dependencies on macOS."
    exit 1
  fi

  for formula in openssl@3 libffi pkg-config; do
    brew list --versions "$formula" >/dev/null 2>&1 || brew install "$formula"
  done

  export PKG_CONFIG_PATH="$(brew --prefix openssl@3)/lib/pkgconfig:$(brew --prefix libffi)/lib/pkgconfig"
fi

asdf install
asdf reshim ruby

asdf exec gem install bundler -v 4.0.16
asdf reshim ruby
asdf exec bundle install

printf '\nDependencies installed. Run: asdf exec bundle exec jekyll serve --livereload\n'
