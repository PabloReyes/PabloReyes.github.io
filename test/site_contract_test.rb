# frozen_string_literal: true

require "minitest/autorun"
require "date"
require "pathname"
require "uri"
require "yaml"

class SiteContractTest < Minitest::Test
  ROOT = Pathname(__dir__).join("..").expand_path
  SITE = ROOT.join("_site")
  EXPECTED_PROJECT_IDS = %w[
    xrai-vision
    openinsider
    barcelona-housing
    carbitrage
    backio
    sentiment-trading
    afterfacts
    laliga-analysis
    entretodos
    lyric-cloud
    ocpjp6
  ].freeze

  def test_project_portfolio_is_preserved
    projects = YAML.safe_load(ROOT.join("_data/projects.yml").read, permitted_classes: [Date])
    assert_equal EXPECTED_PROJECT_IDS, projects.map { |project| project.fetch("id") }

    projects.each do |project|
      image = ROOT.join("about/assets", project.fetch("image"))
      assert image.file?, "Missing project image: #{image.relative_path_from(ROOT)}"
    end
  end

  def test_legacy_finance_section_is_not_source_content
    finance_paths = [
      *ROOT.glob("finanzas/**/*"),
      *ROOT.glob("_posts/*control-gastos*"),
      *ROOT.glob("_drafts/*financier*"),
      *ROOT.glob("_drafts/*dividendos*"),
      ROOT.join("js/portfolio.js")
    ].select(&:exist?)

    assert_empty finance_paths.map { |path| path.relative_path_from(ROOT).to_s }

    editorial_files = [*ROOT.glob("_posts/*"), *ROOT.glob("_drafts/*")]
    finance_categories = editorial_files.select do |path|
      path.file? && path.read.match?(/^categor(?:y|ies):.*finanzas/im)
    end
    assert_empty finance_categories.map { |path| path.relative_path_from(ROOT).to_s }
  end

  def test_toolchain_is_reproducible_on_ruby_4
    assert_equal "4.0.6", ROOT.join(".ruby-version").read.strip
    assert_equal "ruby 4.0.6", ROOT.join(".tool-versions").read.strip
    refute_includes ROOT.join(".gitignore").read.lines.map(&:strip), "Gemfile.lock"

    gemfile = ROOT.join("Gemfile").read
    assert_includes gemfile, "ruby '4.0.6'"
    refute_includes gemfile, "jekyll-compress-images"

    workflow = ROOT.join(".github/workflows/pages.yml").read
    assert_includes workflow, 'ruby-version: "4.0.6"'
    assert_includes workflow, "pull_request:"
  end

  def test_publishing_configuration_uses_the_canonical_site
    config = YAML.safe_load(ROOT.join("_config.yml").read)

    assert_equal "https://blog.pabloreyes.es", config.fetch("url")
    assert_equal "es", config.fetch("lang")
    refute config.key?("google_analytics")
    refute_includes config.fetch("plugins"), "jekyll-compress-images"
    assert_includes config.fetch("plugins"), "jekyll-sitemap"
  end

  def test_seo_scope_preserves_existing_titles_and_description
    config = YAML.safe_load(ROOT.join("_config.yml").read)
    projects_page = ROOT.join("projects/index.md")

    assert_equal "Pablo Reyes", config.fetch("title")
    assert_equal "Desarrollo de software, tecnología, producto y análisis de datos",
                 config.fetch("description")
    assert projects_page.file?, "Missing canonical Spanish projects page"
    assert_equal "Proyectos", front_matter(projects_page).fetch("title")
  end

  def test_categories_are_retired
    refute ROOT.join("categories.md").exist?, "Legacy categories page still exists"
    refute ROOT.join("_layouts/categories.html").exist?, "Legacy categories layout still exists"
  end

  def test_projects_have_static_language_routes
    spanish_path = ROOT.join("projects/index.md")
    english_path = ROOT.join("en/projects/index.md")

    assert spanish_path.file?, "Missing Spanish projects page"
    assert english_path.file?, "Missing English projects page"

    spanish = front_matter(spanish_path)
    english = front_matter(english_path)

    assert_equal "/projects/", spanish.fetch("permalink")
    assert_equal "es", spanish.fetch("lang")
    assert_equal "/en/projects/", english.fetch("permalink")
    assert_equal "en", english.fetch("lang")
    refute ROOT.join("js/projects-lang.js").exist?, "Legacy language-toggle JavaScript still exists"
  end

  def test_opencode_automation_remains_absent
    workflow_paths = ROOT.glob(".github/workflows/**/*").select(&:file?)
    matches = workflow_paths.select { |path| path.read.match?(/opencode|gemini_api_key/i) }
    assert_empty matches.map { |path| path.relative_path_from(ROOT).to_s }
  end

  def test_templates_use_accessible_modern_primitives
    default_layout = ROOT.join("_layouts/default.html").read
    head = ROOT.join("_includes/head.html").read
    footer = ROOT.join("_includes/footer.html").read
    project_list = ROOT.join("_includes/project-list.html").read
    projects_page_path = ROOT.join("projects/index.md")
    projects_page = projects_page_path.file? ? projects_page_path.read : ""
    main_js = ROOT.join("js/main.js").read

    assert_match(/<html lang=/, default_layout)
    assert_equal 1, head.scan(/name="viewport"/).size
    refute_match(/jquery/i, footer)
    assert_match(/role="dialog"/, footer)
    assert_match(/<button[^>]+project-image-button/, project_list)
    assert_match(/<a[^>]+lang-link/, projects_page)
    refute_match(/\$\s*\(/, main_js)
    refute ROOT.join("js/projects-lang.js").exist?
  end

  def test_dead_legacy_copies_are_absent
    legacy_paths = %w[
      _includes/post-list-orig.html
      _includes/sidebar_orig.html
      _layouts/muebles.html
      about/styles.css
      css/main_orig.css
      images/background-cover-orig.jpg
      images/muebles
      images/profile_orig.jpg
      params.json
    ]

    existing = legacy_paths.select { |path| ROOT.join(path).exist? }
    assert_empty existing
  end

  def test_sass_uses_the_supported_module_system
    stylesheets = [*ROOT.glob("_sass/*.scss"), *ROOT.glob("css/*.scss")]
    imports = stylesheets.select { |path| path.read.match?(/^@import\b/) }

    assert_empty imports.map { |path| path.relative_path_from(ROOT).to_s }
    assert_match(/^@use\b/, ROOT.join("css/main.scss").read)
  end

  def test_editorial_images_have_alt_text
    content_files = [*ROOT.glob("_posts/*"), *ROOT.glob("_drafts/*")]
    missing_alt = content_files.select { |path| path.file? && path.read.include?("![](") }

    assert_empty missing_alt.map { |path| path.relative_path_from(ROOT).to_s }
  end

  def test_generated_site_contract
    skip "Run a production build before generated-site checks" unless SITE.join("index.html").file?

    html_files = SITE.glob("**/*.html")
    refute_empty html_files
    refute SITE.join("finanzas").exist?

    html_files.each do |path|
      html = path.read
      relative = path.relative_path_from(SITE)

      assert_match(/<html[^>]+\blang="(?:es|en)"/i, html, "#{relative} has no valid lang")
      assert_equal 1, html.scan(/<meta[^>]+name=["']viewport["']/i).size,
                   "#{relative} must have exactly one viewport"
      assert_match(%r{<link[^>]+rel=["']canonical["'][^>]+href=["']https://blog\.pabloreyes\.es/}i,
                   html, "#{relative} has an invalid canonical")
      refute_match(/\bid=(["'])\1/i, html, "#{relative} contains an empty id")
      refute_match(%r{(?:href|src)=["']/finanzas(?:/|["'])}i, html,
                   "#{relative} links to retired finance content")
      refute_match(/jquery(?:\.min)?\.js/i, html, "#{relative} still loads jQuery")
    end

    assert_internal_references_exist(html_files)
  end

  def test_generated_images_define_a_loading_strategy
    skip "Run a production build before generated-site checks" unless SITE.join("index.html").file?

    missing_strategy = SITE.glob("**/*.html").flat_map do |path|
      path.read.scan(/<img\b[^>]*>/i).filter_map do |tag|
        next unless tag.match?(/\bsrc=/i)
        next if tag.match?(/\bloading=["']lazy["']/i)
        next if tag.match?(/\bfetchpriority=["']high["']/i)

        "#{path.relative_path_from(SITE)}: #{tag}"
      end
    end

    assert_empty missing_strategy, "Images without loading strategy:\n#{missing_strategy.join("\n")}"
  end

  def test_editorial_visual_system_contract
    styles = ROOT.join("css/main.scss").read
    sidebar = ROOT.join("_includes/sidebar.html").read
    post_list = ROOT.join("_includes/post-list-cards.html").read
    project_list = ROOT.join("_includes/project-list.html").read
    projects_page_path = ROOT.join("projects/index.md")
    projects_page = projects_page_path.file? ? projects_page_path.read : ""

    {
      "--color-bg" => "#fafaf8",
      "--color-surface" => "#ffffff",
      "--color-ink" => "#202124",
      "--color-muted" => "#667085",
      "--color-border" => "#e5e7eb",
      "--color-accent" => "#b44937",
      "--measure-reading" => "44rem",
      "--measure-media" => "64rem"
    }.each do |token, value|
      assert_match(/#{Regexp.escape(token)}:\s*#{Regexp.escape(value)}/, styles)
    end

    assert_match(/font-family:\s*var\(--font-ui\)/, styles)
    assert_match(/\.post-content\s*\{[^}]*font-family:\s*var\(--font-reading\)/m, styles)
    assert_match(/\.post-container--single\s*\{[^}]*max-width:\s*var\(--measure-reading\)/m, styles)
    assert_includes styles, "text-wrap: balance"
    assert_includes styles, "text-wrap: pretty"
    refute_match(/linear-gradient|backdrop-filter/, styles)
    refute_match(/\.lang-selector\s*\{[^}]*position:\s*sticky/m, styles)

    assert_includes sidebar, "Software, tecnología, producto y las cosas que construyo."
    assert_includes post_list, '<picture class="post-entry__media">'
    assert_includes post_list, 'type="image/webp"'
    assert_includes post_list, "srcset="
    assert_includes project_list, '<picture class="project-card__media">'
    assert_includes project_list, 'type="image/webp"'
    assert_match(/\{%\s*for tech in project\.technologies limit:\s*5\s*%\}/, project_list)
    refute_includes project_list, "project-view-link"
    refute_includes project_list, "project-purpose"
    assert_includes projects_page, 'class="projects-heading"'
    refute_match(/\.lang-(?:es|en)\b/, styles)
  end

  def test_responsive_thumbnail_assets_exist
    post_images = ROOT.glob("_posts/*").filter_map do |post|
      image = post.read[/^image:\s*(\S+)\s*$/, 1]
      next unless image&.start_with?("/images/uploads/")

      Pathname(image.delete_prefix("/images/uploads/"))
    end

    missing_post_thumbnails = post_images.flat_map do |image|
      thumbnail_variants(ROOT.join("images/thumbnails"), image).reject(&:file?)
    end
    assert_empty missing_post_thumbnails.map { |path| path.relative_path_from(ROOT).to_s }

    projects = YAML.safe_load(ROOT.join("_data/projects.yml").read, permitted_classes: [Date])
    missing_project_thumbnails = projects.flat_map do |project|
      thumbnail_variants(ROOT.join("about/thumbnails"), Pathname(project.fetch("image"))).reject(&:file?)
    end
    assert_empty missing_project_thumbnails.map { |path| path.relative_path_from(ROOT).to_s }
  end

  private

  def front_matter(path)
    source = path.read
    yaml = source[/\A---\s*\n(.*?)\n---\s*\n/m, 1]
    refute_nil yaml, "Missing YAML front matter in #{path.relative_path_from(ROOT)}"
    YAML.safe_load(yaml)
  end

  def thumbnail_variants(root, source)
    webp = source.sub_ext(".webp")
    [
      root.join(webp),
      root.join(webp.dirname, "#{webp.basename(".webp")}@2x.webp")
    ]
  end

  def assert_internal_references_exist(html_files)
    missing = []

    html_files.each do |path|
      html = path.read
      html.scan(/(?:href|src)=["']([^"'#]+)["']/i).flatten.each do |reference|
        next if reference.empty? || reference.start_with?("mailto:", "tel:", "data:", "javascript:", "//")

        uri = URI.parse(reference)
        next if uri.host

        target = local_target(path, uri.path)
        missing << "#{path.relative_path_from(SITE)} -> #{reference}" unless target_exists?(target)
      rescue URI::InvalidURIError
        missing << "#{path.relative_path_from(SITE)} -> invalid URI #{reference}"
      end
    end

    assert_empty missing.uniq.sort, "Missing internal references:\n#{missing.uniq.sort.join("\n")}"
  end

  def local_target(page, reference)
    return page if reference.nil? || reference.empty?

    reference.start_with?("/") ? SITE.join(reference.delete_prefix("/")) : page.dirname.join(reference).cleanpath
  end

  def target_exists?(target)
    return true if target.file?
    return true if target.directory? && target.join("index.html").file?

    target.extname.empty? && target.sub_ext(".html").file?
  end
end
