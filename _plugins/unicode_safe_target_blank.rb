# frozen_string_literal: true

require "jekyll-target-blank"

# jekyll-target-blank 2.0.2 calls URI.parse on every external link. Ruby's
# URI parser only accepts ASCII, so a single link with an accented character
# (e.g. https://es.wikipedia.org/wiki/Función_...) raises URI::InvalidURIError
# and aborts the whole build. Percent-encode a copy before parsing and treat
# the link as external if it is still unusable, instead of taking the site down.
module PabloReyes
  module UnicodeSafeTargetBlank
    def external?(link)
      return unless link&.match?(URI.regexp(%w(http https)))

      URI.parse(URI::DEFAULT_PARSER.escape(link)).host != URI.parse(@site_url).host
    rescue URI::InvalidURIError
      true
    end
  end
end

Jekyll::TargetBlank.singleton_class.prepend(PabloReyes::UnicodeSafeTargetBlank)
