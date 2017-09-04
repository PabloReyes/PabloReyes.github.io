---
layout: page
title: "Control de gastos: carga de datos con ING Direct"
published: true
date: 2017-06-27
css_id: control-gastos-carga-datos-ing
category: Tutoriales
excerpt: Exporta tus transacciones de ING Direct y cárgalas en la herramientas de control de gastos
tags: [seguridad, finanzas]
---
Cargar datos de ING Direct en la [herramienta de control de gastos](/finanzas/herramientas/control-gastos) es muy sencillo. Para ello nos identificaremos en nuestra banca online, haremos click en "Mis productos" ![ING Direct export](/images/uploads/ing-mis-productos.png){:class="img-mini inline"}. Seleccionaremos nuestra cuenta y luego pincharemos en "Buscador de movimientos" ![ING Buscador movimientos](/images/uploads/ing-buscador-movimientos.png){:class="img-mini inline"}.
En la pantalla que búsqueda, marcaremos como fecha de inicio el 1 de Enero y como fecha final el día de hoy.

![ING Direct export](/images/uploads/ing-export-transacciones.png){:class="img-center"}

Por último, clickaremos en el botón de XLS que aparece arriba a la derecha de la tabla: ![ING icono exportar](/images/uploads/ing-export-icon.png){:class="img-mini inline"}.

Abriremos el fichero que hemos descargado con nuestro editor de hojas de cálculo favorito y borraremos las columnas que no nos interesan. En este caso, la columna C y D.
![ING Direct export](/images/uploads/ing-export-xls-seleccion-borrado.png){:class="img-center"}

A continuación copiaremos todas las filas de transacciones sin la cabecera. Sólo necesitamos las primeras tres columnas: Fecha, descripción e importe.

![ING Direct export](/images/uploads/ing-export-xls-seleccion.png){:class="img-center"}

A continuación, abriremos nuestra herramienta de control de gastos y pegaremos todas las transacciones en la pestaña de **Operaciones: C. Corriente**:
 ![ING import herramienta](/images/uploads/ing-import-control-gastos.png){:class="img-center"}

 Para las tarjetas de crédito seguiremos el mismo proceso y las copiaremos en la pestaña de **Operaciones: T. Credito**.

Ya deberíamos ver nuestras transacciones agrupadas por mes, categorizadas y con estadísticas!