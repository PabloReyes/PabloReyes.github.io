# Rediseño editorial

## Sistema visual

- Evolución de las plantillas Jekyll existentes: cabecera compacta, archivo por años, proyectos en filas y lectura editorial.
- Listados de hasta 960 px; cuerpo de artículos de hasta 704 px. Imágenes principales con su proporción original y altura limitada.
- Inter para navegación, títulos y metadata; Source Serif 4 para artículos y extractos. Fuentes variables WOFF2, subconjunto latino, servidas localmente con `font-display: swap` (unos 97 KiB en total).
- Fuentes obtenidas de Fontsource: `inter/latin-wght-normal` y `source-serif-4/latin-wght-normal`. Licencias OFL incluidas en `fonts/`.
- Tokens de color, tipografía y espaciado en `css/main.scss`. Se conserva el acento terracota y la paleta light/dark existente.
- El tema usa la clave existente `localStorage.theme`, sigue el sistema cuando no hay elección explícita y funciona cuando el almacenamiento está bloqueado. El botón anuncia su estado mediante `aria-pressed`.
- Índice generado con JavaScript a partir de al menos cuatro headings h2/h3. Conserva los IDs existentes, usa enlaces nativos y aparece abierto inicialmente a partir de 900 px; es plegable en todos los tamaños.
- Tiempo de lectura aproximado: 220 palabras/minuto. Fechas localizadas en ES/EN mediante includes compartidos.

## Validación realizada

- `mise exec -- bundle exec ruby test/site_contract_test.rb`, antes y después de la compilación de producción: **20 pruebas, 787 aserciones, sin fallos**.
- `JEKYLL_ENV=production mise exec -- bundle exec jekyll build`: correcto.
- `git diff --check`: correcto.
- Revisión en Chromium de home, proyectos ES/EN y Observatorio Atalaya, con tamaños de 320, 390, 768 y 1440 px según la vista. Lectura e imágenes comprobadas en light y dark.
- A 320 px, las cuatro rutas comprobadas mantienen el ancho del documento dentro del viewport.
- Cambio de tema con ratón y teclado; persistencia entre rutas; preferencia del sistema y cambios en vivo con almacenamiento bloqueado.
- Enlace de salto al contenido probado con Enter; foco transferido al `main`.
- Modal de proyecto: apertura, cierre con Escape y devolución del foco al botón original.
- Índice: apertura en móvil y navegación a un heading mediante su fragmento original; abierto inicialmente en escritorio.
- Sin errores de consola en las rutas e interacciones comprobadas.
- Contraste sobre el fondo principal (light / dark): texto **15,40 / 13,96**, texto secundario **4,76 / 6,91**, acento **5,09 / 5,56**. Superan 4,5:1.
- Transiciones desactivadas con `prefers-reduced-motion`; tablas y bloques de código desplazables mediante teclado.

## Capturas locales

En `.openchamber/screenshots/`:

- `home-before-2026-09-13T20-13-51-245.jpg`
- `home-after-mobile-dark.png`
- `home-after-desktop-light.png`
- `projects-after-desktop-light.png`
- `article-after-desktop-light.png`

Las capturas son artefactos de revisión local y no forman parte del sitio generado.
