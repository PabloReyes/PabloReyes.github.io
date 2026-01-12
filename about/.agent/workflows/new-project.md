---
description: Fetches repo data and inserts a new project entry using the specific 'project-card' HTML structure.
---

# 1. & 2. Ask for inputs
inputs:
  repository_url:
    type: string
    description: "The full URL of the GitHub repository."
  project_year:
    type: integer
    description: "The year the project was developed (e.g., 2024)."

steps:
  # 3. Read Readme and Image via GitHub MCP
  - id: fetch_repo_content
    name: Fetch Repository Data
    tool: github_mcp
    action: get_repository_content
    params:
      url: ${{ inputs.repository_url }}
      files:
        - README.md
        - main_image (strategy: find first .png/.jpg in root or linked in README)

  # 4. Process Content (Simplification & Image Saving)
  - id: process_content
    name: Analyze and Summarize
    tool: llm_processor
    description: "Extracts marketing copy and creates unique i18n keys."
    prompt: |
      Read the README content.
      1. Extract the Project Name.
      2. Create a 'normalized_name' (lowercase, no spaces, e.g., 'openinsider').
      3. Summarize a 'One-Liner' description (Spanish).
      4. List the Tech Stack (languages/tools).
      5. Write a 'Why I built it' section (Spanish, ~1 sentence).
      6. Write 'Key Features' (Spanish, 3 bullet points).
      
      Output JSON format:
      {
        "name": "...",
        "normalized_name": "...",
        "oneliner": "...",
        "stack": ["Tool1", "Tool2"],
        "why_text": "...",
        "features": ["Feature 1", "Feature 2", "Feature 3"]
      }

  - id: save_assets
    name: Save Files
    tool: file_system
    action: batch_write
    params:
      files:
        - path: "./projects_information/${{ steps.process_content.normalized_name }}_readme.md"
          content: ${{ steps.fetch_repo_content.readme_text }}
        - path: "./assets/${{ steps.process_content.normalized_name }}.png"
          content: ${{ steps.fetch_repo_content.image_data }}

  # 6. Ask for Live Link
  - id: ask_live_link
    name: Get Live URL
    type: user_interaction
    prompt: "Enter the public URL for the project (or type 'none'):"

  # 5. Update index.html with specific HTML structure
  - id: update_dom
    name: Insert Project Card
    tool: file_system
    action: edit_file
    params:
      path: "./index.html"
      edit_type: insert_sorted_dom
      selector: "article.project-card"
      sort_attribute: "data-year-sort" 
      # Note: We will inject a hidden data attribute to help the sorter, or parse the span text
      sort_order: "desc"
      
      # The HTML Template matches your provided structure exactly
      content_template: |
        <article class="project-card" data-year-sort="${{ inputs.project_year }}">
            <div class="project-image-container">
                <span class="project-year">${{ inputs.project_year }}</span>
                <img src="assets/${{ steps.process_content.normalized_name }}.png" 
                     alt="${{ steps.process_content.name }} Dashboard" 
                     class="project-image"
                     onerror="this.src='https://placehold.co/600x400?text=${{ steps.process_content.name }}'">
            </div>
            <div class="project-content">
                <h3 class="project-title">${{ steps.process_content.name }}</h3>
                <p class="project-oneliner" data-i18n="${{ steps.process_content.normalized_name }}-oneliner">
                    ${{ steps.process_content.oneliner }}
                </p>

                <div class="tech-stack">
                    ${{ steps.process_content.stack.map(tech => `<span class="badge">${tech}</span>`).join('') }}
                </div>

                <div class="project-details">
                    <h4 data-i18n="${{ steps.process_content.normalized_name }}-why-title">Por qué lo construí</h4>
                    <p data-i18n="${{ steps.process_content.normalized_name }}-why-desc">
                        ${{ steps.process_content.why_text }}
                    </p>

                    <h4 data-i18n="${{ steps.process_content.normalized_name }}-features-title">Características Clave</h4>
                    <ul class="feature-list">
                        ${{ steps.process_content.features.map((feat, i) => `<li data-i18n="${{ steps.process_content.normalized_name }}-f${i+1}">${feat}</li>`).join('') }}
                    </ul>
                    <br>
                    
                    <div style="display: flex; gap: 15px;">
                        <a href="${{ inputs.repository_url }}" target="_blank"
                           style="color: var(--accent-start); font-weight: 600; font-size: 0.9rem;">
                           GitHub &rarr;
                        </a>
                        
                        ${{ steps.ask_live_link.input != 'none' ? `
                        <a href="${{ steps.ask_live_link.input }}" target="_blank"
                           style="color: var(--accent-start); font-weight: 600; font-size: 0.9rem;"
                           data-i18n="${{ steps.process_content.normalized_name }}-cta">
                           Visitar ${{ steps.process_content.name }} &rarr;
                        </a>` : '' }}
                    </div>
                </div>
            </div>
        </article>