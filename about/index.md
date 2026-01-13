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
    <div class="lang-links" role="navigation" aria-label="Idiomas">
      <a class="lang-link" href="#" data-lang="es">ES</a>
      <span class="separator">|</span>
      <a class="lang-link" href="#" data-lang="en">EN</a>
    </div>
  </div>
</div>

<h1>Proyectos</h1>
<div class="main-post-list">
  {% include project-list.html %}
</div>
