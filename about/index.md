---
layout: default
title: "Proyectos"
permalink: /about/
body_class: projects-page
internal_js:
  - projects-lang.js
---

<div class="lang-selector" aria-label="Seleccionar idioma">
  <div class="selector-container">
    <div class="lang-links" role="group" aria-label="Idioma de los proyectos">
      <button type="button" class="lang-link" data-lang="es" aria-pressed="false">ES</button>
      <span class="separator" aria-hidden="true">|</span>
      <button type="button" class="lang-link" data-lang="en" aria-pressed="false">EN</button>
    </div>
  </div>
</div>

<h1>Proyectos</h1>
<div class="main-post-list">
  {% include project-list.html %}
</div>
