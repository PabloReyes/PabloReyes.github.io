# frozen_string_literal: true

require "fileutils"
require "open3"
require "pathname"
require "set"

module PabloReyes
  module ResponsiveArticleImages
    WIDTHS = [480, 960, 1440].freeze
    CACHE_ROOT = ".jekyll-cache/responsive-article-images"
    OUTPUT_ROOT = "/images/generated/articles"
    LOCAL_IMAGE_PATTERN = %r{\A/images/uploads/}i
    MARKDOWN_IMAGE_PATTERN = /!\[[^\]]*\]\(\s*([^\s)]+)(?:\s+[^)]*)?\)/m
    SUPPORTED_EXTENSIONS = %w[.gif .jpeg .jpg .png].freeze
    JPEG_START_OF_FRAME_MARKERS = [
      0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7,
      0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF
    ].freeze

    Asset = Data.define(:source_path, :public_path, :width, :height, :variants)
    Variant = Data.define(:public_path, :cache_path, :width)

    class << self
      def prepare(site)
        assets = discover_sources(site).to_h do |public_path|
          [public_path, prepare_asset(site, public_path)]
        end

        registries[site.object_id] = assets
        assets.each_value do |asset|
          asset.variants.each { |variant| register_static_file(site, variant) }
        end
      end

      def rewrite(document)
        return unless document.collection&.label == "posts"

        assets = registries.fetch(document.site.object_id, {})
        document.output.gsub!(/<img\b[^>]*>/i) do |tag|
          attributes = parse_attributes(tag)
          public_path = normalize_source(attributes["src"])
          asset = assets[public_path]

          asset ? responsive_markup(attributes, asset) : tag
        end
      end

      def dimensions(path)
        case path.extname.downcase
        when ".png"
          png_dimensions(path)
        when ".gif"
          gif_dimensions(path)
        when ".jpg", ".jpeg"
          jpeg_dimensions(path)
        else
          fatal("Unsupported article image format: #{path}")
        end
      end

      private

      def registries
        @registries ||= {}
      end

      def discover_sources(site)
        site.posts.docs.each_with_object(Set.new) do |post, sources|
          sources << normalize_source(post.data["image"]) if post.data["image"]
          post.content.scan(MARKDOWN_IMAGE_PATTERN) do |match|
            sources << normalize_source(match.first)
          end
        end.compact.select { |source| source.match?(LOCAL_IMAGE_PATTERN) }
      end

      def normalize_source(source)
        return if source.nil?

        clean = source.to_s.strip
        return if clean.empty? || clean.match?(%r{\A(?:[a-z]+:)?//}i) || clean.start_with?("data:")

        clean = clean.split(/[?#]/, 2).first
        clean = clean.delete_prefix("../") while clean.start_with?("../")
        clean = "/#{clean}" unless clean.start_with?("/")
        Pathname(clean).cleanpath.to_s
      end

      def prepare_asset(site, public_path)
        source_path = Pathname(site.in_source_dir(public_path.delete_prefix("/")))
        fatal("Referenced article image does not exist: #{public_path}") unless source_path.file?

        extension = source_path.extname.downcase
        fatal("Unsupported article image format: #{public_path}") unless SUPPORTED_EXTENSIONS.include?(extension)

        width, height = dimensions(source_path)
        variant_widths = extension == ".gif" ? [width] : responsive_widths(width)
        variants = variant_widths.map do |variant_width|
          build_variant(site, source_path, public_path, width, variant_width)
        end

        Asset.new(
          source_path: source_path,
          public_path: public_path,
          width: width,
          height: height,
          variants: variants
        )
      end

      def responsive_widths(original_width)
        widths = WIDTHS.select { |width| width < original_width }
        widths << [original_width, WIDTHS.max].min
        widths.uniq.sort
      end

      def build_variant(site, source_path, public_path, original_width, variant_width)
        relative = Pathname(public_path.delete_prefix("/images/uploads/"))
        extension_label = source_path.extname.delete_prefix(".").downcase
        filename = "#{relative.basename(relative.extname)}-#{extension_label}-#{variant_width}.webp"
        output_dir = Pathname(OUTPUT_ROOT).join(relative.dirname)
        generated_path = output_dir.join(filename)
        cache_root = Pathname(site.in_source_dir(CACHE_ROOT))
        cache_path = cache_root.join(generated_path.to_s.delete_prefix("/"))

        generate_variant(source_path, cache_path, original_width, variant_width)

        Variant.new(
          public_path: generated_path.to_s,
          cache_path: cache_path,
          width: variant_width
        )
      end

      def generate_variant(source_path, cache_path, original_width, variant_width)
        return if cache_path.file? && cache_path.mtime >= source_path.mtime

        FileUtils.mkdir_p(cache_path.dirname)
        command = if source_path.extname.casecmp(".gif").zero?
                    [
                      "gif2webp", "-quiet", "-mt", "-metadata", "none", "-q", "75",
                      source_path.to_s, "-o", cache_path.to_s
                    ]
                  else
                    [
                      "cwebp", "-quiet", "-mt", "-metadata", "none", "-q", "78",
                      "-resize", [variant_width, original_width].min.to_s, "0",
                      source_path.to_s, "-o", cache_path.to_s
                    ]
                  end

        _stdout, stderr, status = Open3.capture3(*command)
        return if status.success? && cache_path.file?

        fatal("Image conversion failed for #{source_path}: #{stderr.strip}")
      rescue Errno::ENOENT
        fatal("Missing image encoder '#{command.first}'. Install the webp package before building.")
      end

      def register_static_file(site, variant)
        cache_root = site.in_source_dir(CACHE_ROOT)
        directory = File.dirname(variant.public_path)
        filename = File.basename(variant.public_path)
        static_file = Jekyll::StaticFile.new(site, cache_root, directory, filename)
        site.static_files << static_file
      end

      def parse_attributes(tag)
        tag.scan(/([:\w-]+)\s*=\s*(["'])(.*?)\2/m).to_h do |name, _quote, value|
          [name.downcase, value]
        end
      end

      def responsive_markup(attributes, asset)
        featured = attributes.fetch("class", "").split.include?("post-image-featured")
        attributes["src"] = asset.public_path
        attributes["width"] ||= asset.width.to_s
        attributes["height"] ||= asset.height.to_s
        attributes["decoding"] ||= "async"
        attributes["loading"] ||= "lazy" unless featured

        srcset = asset.variants.map do |variant|
          "#{variant.public_path} #{variant.width}w"
        end.join(", ")
        sizes = if featured
                  "(max-width: 68rem) calc(100vw - 2rem), 64rem"
                else
                  "(max-width: 48rem) calc(100vw - 2rem), 44rem"
                end
        image = attributes.map { |name, value| %(#{name}="#{value}") }.join(" ")

        <<~HTML.chomp
          <picture class="responsive-article-image">
            <source type="image/webp" srcset="#{srcset}" sizes="#{sizes}">
            <img #{image}>
          </picture>
        HTML
      end

      def png_dimensions(path)
        header = path.binread(24)
        fatal("Invalid PNG image: #{path}") unless header.start_with?("\x89PNG\r\n\x1A\n".b)

        header.byteslice(16, 8).unpack("NN")
      end

      def gif_dimensions(path)
        header = path.binread(10)
        fatal("Invalid GIF image: #{path}") unless header.start_with?("GIF87a", "GIF89a")

        header.byteslice(6, 4).unpack("vv")
      end

      def jpeg_dimensions(path)
        File.open(path, "rb") do |file|
          fatal("Invalid JPEG image: #{path}") unless file.read(2) == "\xFF\xD8".b

          loop do
            prefix = file.read(1)
            fatal("JPEG dimensions not found: #{path}") unless prefix
            next unless prefix.ord == 0xFF

            marker_byte = file.read(1)
            fatal("JPEG dimensions not found: #{path}") unless marker_byte
            marker = marker_byte.ord
            marker = file.read(1).ord while marker == 0xFF
            next if marker == 0xD8 || marker == 0x01 || (0xD0..0xD7).cover?(marker)
            fatal("JPEG dimensions not found: #{path}") if marker == 0xD9 || marker == 0xDA

            length_bytes = file.read(2)
            fatal("Invalid JPEG segment: #{path}") unless length_bytes&.bytesize == 2
            length = length_bytes.unpack1("n")

            if JPEG_START_OF_FRAME_MARKERS.include?(marker)
              frame = file.read(5)
              fatal("Invalid JPEG frame: #{path}") unless frame&.bytesize == 5
              height, width = frame.byteslice(1, 4).unpack("nn")
              return [width, height]
            end

            file.seek(length - 2, IO::SEEK_CUR)
          end
        end
      end

      def fatal(message)
        raise Jekyll::Errors::FatalException, message
      end
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  PabloReyes::ResponsiveArticleImages.prepare(site)
end

Jekyll::Hooks.register :documents, :post_render do |document|
  PabloReyes::ResponsiveArticleImages.rewrite(document)
end
