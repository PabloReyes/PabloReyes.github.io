---
layout: default
title: "Proyectos"
permalink: /about/
body_class: projects-page
internal_js:
  - projects-lang.js
---

<div class="projects-heading">
  <h1>
    <span class="lang-text lang-es">Proyectos</span>
    <span class="lang-text lang-en">Projects</span>
  </h1>
  <div class="lang-selector" aria-label="Seleccionar idioma">
    <div class="lang-links" role="group" aria-label="Idioma de los proyectos">
      <button type="button" class="lang-link" data-lang="es" aria-pressed="false">ES</button>
      <span class="separator" aria-hidden="true">|</span>
      <button type="button" class="lang-link" data-lang="en" aria-pressed="false">EN</button>
    </div>
  </div>
</div>

<div class="main-post-list">
  {% include project-list.html %}
</div>
