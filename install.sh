#!/usr/bin/env bash
set -euo pipefail

# Install dependencies for this Jekyll site.
#
# Ruby is pinned in .ruby-version / .tool-versions / Gemfile and is not packaged
# for Ubuntu (apt ships 3.2) or macOS, so the supported workflow runs everything
# inside Docker using the official ruby image (arm64 included). The same commands
# work on Linux and macOS. If Docker is unavailable but a matching Ruby is already
# installed, the script falls back to a native `bundle install`.

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

RUBY_VERSION="$(tr -d '[:space:]' < .ruby-version)"
BUNDLER_VERSION="$(awk '/^BUNDLED WITH$/ { getline; gsub(/[[:space:]]/, ""); print; exit }' Gemfile.lock)"
IMAGE="pabloreyes-jekyll:${RUBY_VERSION}"
VOLUME="jekyll-bundle"

install_with_docker() {
  echo "Building local image ${IMAGE} (base ruby:${RUBY_VERSION} + webp encoders)..."
  docker build -t "${IMAGE}" - <<EOF
FROM ruby:${RUBY_VERSION}
RUN apt-get update \
    && apt-get install -y --no-install-recommends webp \
    && rm -rf /var/lib/apt/lists/*
EOF

  echo "Installing gems into the ${VOLUME} Docker volume..."
  docker run --rm \
    -v "${PWD}:/app" \
    -v "${VOLUME}:/usr/local/bundle" \
    -w /app \
    "${IMAGE}" \
    bash -lc "gem install bundler -v ${BUNDLER_VERSION} && bundle install"
}

install_native() {
  echo "Docker not available; using native Ruby ${RUBY_VERSION}."
  gem install bundler -v "${BUNDLER_VERSION}"
  bundle install
}

if command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; then
  install_with_docker
  printf '\nDependencies installed. Serve the site with:\n'
  printf '  docker run --rm -it -p 4000:4000 -v "$PWD:/app" -v %s:/usr/local/bundle -w /app %s bundle exec jekyll serve --host 0.0.0.0 --livereload\n' "${VOLUME}" "${IMAGE}"
elif command -v ruby >/dev/null 2>&1 && [ "$(ruby -e 'print RUBY_VERSION')" = "${RUBY_VERSION}" ]; then
  install_native
  printf '\nDependencies installed. Serve the site with:\n'
  printf '  bundle exec jekyll serve --livereload\n'
else
  {
    echo "Cannot install dependencies: Docker is unavailable and Ruby ${RUBY_VERSION} was not found."
    case "$(uname -s)" in
      Darwin) echo "Install Docker Desktop: https://docs.docker.com/desktop/install/mac-install/" ;;
      Linux)  echo "Install Docker Engine: https://docs.docker.com/engine/install/" ;;
    esac
  } >&2
  exit 1
fi
