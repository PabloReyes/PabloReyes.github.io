# Modernización de PabloReyes.es

> Plan de ejecución: retirar la sección editorial de finanzas sin alterar el portfolio de proyectos, modernizar el toolchain y corregir la publicación.

## Contratos

- Los 11 proyectos de `_data/projects.yml` permanecen publicados, con sus identificadores y contenido; esto incluye `xrai-vision`.
- La sección editorial `/finanzas/`, sus artículos y borradores dejan de publicarse.
- OpenCode y las credenciales de la prueba puntual siguen ausentes.
- El sitio canónico es `https://blog.pabloreyes.es`.

## Tarea 1: Red de seguridad

**Archivos**

- Crear: `test/site_contract_test.rb`
- Modificar: `_config.yml`

**Pasos**

1. Crear pruebas de contrato para los proyectos, la ausencia de Finanzas/OpenCode, las versiones de Ruby y la configuración canónica.
2. Ejecutar `ruby test/site_contract_test.rb` y comprobar que falla por el estado legacy.
3. Añadir al test validaciones del HTML generado: idioma, viewport único, canonical HTTPS, IDs no vacíos, referencias internas y ausencia de `/finanzas/`.

## Tarea 2: Retirar Finanzas y residuos no usados

**Archivos**

- Eliminar: `finanzas/`
- Eliminar: `_posts/2017-06-27-herramienta-control-gastos.markdown`
- Eliminar: borradores editoriales de finanzas identificados por front matter/contenido
- Eliminar: `js/portfolio.js` y recursos usados únicamente por esas páginas
- Modificar: `_config.yml`, `_includes/sidebar.html`, `README.md`, `AGENTS.md`

**Pasos**

1. Inventariar referencias antes de borrar recursos.
2. Eliminar solo contenido y recursos exclusivos de la antigua sección.
3. Mantener `_data/projects.yml`, `about/` y todos sus assets.
4. Ejecutar las pruebas de contrato.

## Tarea 3: Ruby 4 y CI reproducible

**Archivos**

- Modificar: `.ruby-version`, `.tool-versions`, `Gemfile`, `.gitignore`, `install.sh`
- Crear: `Gemfile.lock`
- Modificar: `.github/workflows/pages.yml`

**Pasos**

1. Fijar Ruby `4.0.6`.
2. Retirar `jekyll-compress-images`, causa reproducida del build bloqueado.
3. Mantener solo plugins utilizados y añadir sitemap.
4. Versionar el lockfile.
5. Actualizar el workflow para validar pull requests y desplegar solo `master`, con versiones actuales de las Actions.
6. Instalar dependencias y ejecutar pruebas/build con Ruby 4.

## Tarea 4: HTML, SEO, accesibilidad y móvil

**Archivos**

- Modificar: `_layouts/default.html`, `_includes/head.html`, `_includes/footer.html`
- Modificar: `_includes/post-list-cards.html`, `_includes/project-list.html`
- Modificar: `js/main.js`, `js/projects-lang.js`
- Modificar: `css/main.scss`, `_sass/uno.scss`, `_sass/mobile.scss`
- Crear: `robots.txt`

**Pasos**

1. Emitir un único viewport, metadatos/canonical absolutos y un `lang` real.
2. Eliminar Universal Analytics y jQuery; conservar Umami.
3. Convertir el visor de proyectos en un diálogo accesible con foco, Escape y restauración.
4. Convertir el selector de idioma en botones y sincronizar `html.lang`.
5. Corregir el bloqueo de scroll raíz en móvil y mejorar carga diferida de imágenes.
6. Ejecutar pruebas y build.

## Tarea 5: Verificación e integración local

**Pasos**

1. Ejecutar `bundle exec ruby test/site_contract_test.rb`.
2. Ejecutar `JEKYLL_ENV=production bundle exec jekyll build --trace`.
3. Ejecutar `bundle exec jekyll doctor`.
4. Comprobar `git diff --check` y escanear secretos con gitleaks.
5. Servir `_site` y revisar escritorio y móvil con navegador automatizado.
6. Integrar localmente en `master` solo cuando todo lo anterior sea verde; no hacer push ni deploy sin petición explícita.
