---
layout: post
title: Un PFM in-house sobre Google Sheets
published: True
date: 2017-06-27
css_id: herramienta-control-gastos
category: Finanzas
image: /images/uploads/posts/control-gastos/control-gastos-anual-full.png
cta: Aprende a controlar tus gastos
excerpt: Una aplicación de control de gastos en Google Sheets, customizable y con las funcionalidades básicas de cualquier PFM. 
---
El objetivo principal de una aplicación PFM (*Personal Financial Management*) es analizar en qué gastamos el dinero y ayudarnos a planificar mejor. Y este tipo de software es precisamente al que me dedico a nivel profesional en [Strands](http://strands.com) junto con otros 150 compañeros. 

Con la intención de compartir una pincelada de lo que hacemos en Strands con el público, me he dispuesto a crear una *nanoversión* de nuestro PFM en un formato que todos podemos usar y cambiar a nuestro antojo: Google Sheets. Esta nanoversion incorpora las siguientes funcionalidades: 

1. Importación transacciones de extractos bancarios (CSV/XLS)
2. Importación transacciones manualmente
3. Categorización de transacciones
4. Computabilidad de transacciones
5. Análisis de gastos mensuales y anuales

Si no tienes la suerte de que tu banco disponga de una suite de FM completa y temes darle la información a *una de esas* apps móviles, esto te puede ser de ayuda. 

## Funcionalidades

### Carga de transacciones por ficheros XLS/CSV
El principal canal de inyección de datos a la aplicación son los exports en XLS/CSV de nuestra banca online. Existen en la herramienta, por defecto, tres hojas para carga de datos:
* Operaciones: C. Corriente
* Operaciones: T. Credito
* Operaciones: Otros

No existe distinción en el tratamiento de cada una de estas hojas, por lo que cualquier transacción puede ir a cualquiera de las tres. La estructura de las hojas es la misma: 3 columnas conteniendo *Fecha*, *Descripción* e *Importe*. Aun así, aconsejo separemos nuestras transacciones con un patrón como este, donde cargaremos distintas cuentas/tarjetas en distintas hojas y la última la dejaremos para operaciones en efectivo o de otra cuenta que no podamos exportar.

Para un ejemplo de cómo cargar transacciones de ING Direct, echa un vistazo al siguiente tutorial:

<div id="tutorial-ing" class="" markdown="1">
## Carga de datos desde export ING Direct
Nos identificaremos en nuestra banca online, haremos click en "Mis productos" ![ING Direct export](/images/uploads/posts/control-gastos/ing-mis-productos.png){:class="img-mini inline"}. Seleccionaremos nuestra cuenta y luego pincharemos en "Buscador de movimientos" ![ING Buscador movimientos](/images/uploads/posts/control-gastos/ing-buscador-movimientos.png){:class="img-mini inline"}.
En la pantalla de búsqueda, marcaremos como fecha de inicio el 1 de Enero y como fecha final el día de hoy.

![ING Direct export](/images/uploads/posts/control-gastos/ing-export-transacciones.png){:class="img-center"}

Por último, clickaremos en el botón de XLS que aparece arriba a la derecha de la tabla: ![ING icono exportar](/images/uploads/posts/control-gastos/ing-export-icon.png){:class="img-mini inline"}.

Abriremos el fichero que hemos descargado con nuestro editor de hojas de cálculo favorito y borraremos las columnas que no nos interesan. En este caso, la columna C y D.
![ING Direct export](/images/uploads/posts/control-gastos/ing-export-xls-seleccion-borrado.png){:class="img-center"}

A continuación copiaremos todas las filas de transacciones sin la cabecera. Sólo necesitamos las primeras tres columnas: Fecha, descripción e importe.

![ING Direct export](/images/uploads/posts/control-gastos/ing-export-xls-seleccion.png){:class="img-center"}

A continuación, abriremos nuestra herramienta de control de gastos y pegaremos todas las transacciones en la pestaña de ***Operaciones: C. Corriente***:
 ![ING import herramienta](/images/uploads/posts/control-gastos/ing-import-control-gastos.png){:class="img-center"}

 Para las tarjetas de crédito seguiremos el mismo proceso y las copiaremos en la pestaña de ***Operaciones: T. Credito***.

Ya deberíamos ver nuestras transacciones agrupadas por mes, categorizadas y con estadísticas.

</div>

### Carga manual de transacciones
Para operaciones que hayamos hecho en efectivo o provenientes de otra cuenta que no queramos añadir, usaremos la pestaña de *Operaciones Otros*. Esta pestaña consta de 3 columnas donde introduciremos fecha, descripción e importe de las transacción.

### Categorización de transacciones
Las transacciones contienen información que nos permiten categorizarlas: facturas, restaurantes, nómina, ropa, etc. Aunque existe un juego predefinido de categorías y reglas, éstas pueden ser adaptadas por nosotros mismos en la pestaña ***_categorizador***.

![Reglas y categorías](/images/uploads/posts/control-gastos/control-gastos-categorizador.png){:class="img-right"}
En dicha pestaña encontramos dos bloques: Lista de categorías y lista de reglas.

Lo primero que deberíamos hacer es definir una taxonomía (conjunto de categorías) que se adapte a nuestro perfil de consumidor. Yo, por ejemplo, no tengo una categoría de *Ropa* porque no suelo comprar mucha, por lo que todos mis gastos de ropa los incluyo dentro de *Personal*. Por otro lado, en muchas ocasiones almuerzo en el restaurante de la oficina, por lo que tengo una categoría de *Comida Trabajo*.

![Gestion reglas](/images/uploads/posts/control-gastos/control-gastos-gestion-reglas.png){:class="img-left size-30"}

Las transacciones se categorizarán siguiendo nuestras propias reglas, que definimos en el bloque de la izquierda. El funcionamiento es sencillo:
 1. En la columna ***Contiene*** (A) introduciremos un trozo de la descripción de la transaccion a identificar.
 2. En la columna ***Categría*** (B) introduciremos la categoría a la que corresponde. Verás que existe un dropdown que muestra las categorías del bloque de la derecha.

Algunas reglas están creadas de ejemplo, pero tú deberás crear las tuyas propias. Mi recomendación es ir a la vista mensual e ir viendo qué categoría le pondríamos a cada transacción. Si vemos que puede englobar más de una transacción (porque compramos normalmente ahí o porque confiamos que todo lo que contenga "restaurante" va a ser Ocio), iremos la pestaña ***_categorizador*** y crearemos una regla.

A medida que crees reglas, las próximas transacciones que vayan entrando irán autocategorizándose con las reglas ya creadas.

### Visualización de gastos mensuales
 ![Selección de hojas](/images/uploads/posts/control-gastos/control-gastos-selector-hojas.png){:class="img-right size-20"}
La herramienta consta de múltiples hojas, pero las más importantes y donde pasaremos la mayoría del tiempo serán las hojas de gastos mensuales. Es ahí donde comprobaremos que la categorización es correcta, veremos nuestros gastos agrupados por categoría y mes, agregaremos información extra a nuestras transacciones, etc.

Todas las hojas son accessibles desde el selector de hojas, que se encuentra abajo a la izquierda.

En cada mes, encontraremos listadas todas las transacciones con una serie de campos:
![Transacciones](/images/uploads/posts/control-gastos/control-gastos-transacciones-mes.png){:class="img-center"}

* **Incluir**: Seleccionaremos "NO" cuando no queremos que esta transacción tenga un impacto en nuestras estadísticas. Ejemplo: Una transferencia de tu cuenta corriente a tu cuenta de ahorros se considerará un *gasto* en una cuenta y un *ingreso* en otra. Esto lleva a que las estadísticas cuenten más gastos e ingresos de los reales, ya que no saben que ambas cuentas son nuestras y el dinero no se ha gastado ni ganado, sólo movido. Es lo que llamamos "computabilidad".
* **Fecha**: Fecha en la que tuvo lugar la transacción. Se ordenan ascendentemente, con las últimas transacciones al final de la lista.
* **Descripción**: Descripción que tu banco le dio a la transacción. A veces contiene muchísima información inutil, pero tambien tiene palabras claves que nos ayudan en la categorización.
* **Importe**: Importe de la transacción. Contiene signo, por lo que las transacciones negativas son gastos y las positivas ingresos.
* **Comentario**: Para aclarar el origen de un gasto, podemos introducir nuestro propio comentario. Este campo intenta evitar que dentro de dos meses no sepas de qué viene una transacción.
* **Categoría (manual)**: En caso de que nuestro categorizador no haya sido capaz de categorizar la transacción (o la haya categorizado mal), podemos poner la categoría nosotros mismos usando el selector de categoría. Si introducimos la categoría manual, siempre tendrá preferencia sobre la categoría automática. Si ves que debes poner demasiadas categorías manuales, es que no estás creando suficientes reglas.
* **Categoría**: Si no existe categoría manual, se rellena con la categoría aplicada por la regla definida en el categorizador.

![Gastos agrupados](/images/uploads/posts/control-gastos/control-gastos-agrupados.png){:class="img-right"}
En un segundo bloque encontraremos una lista agrupada de categorías con sus gastos durante el mes. Esta lista agrupa todas las transacciones en las que hemos marcado **SI** en la columna *Incluir*. Además, muestra qué porcentaje de nuestros ingresos hemos dedicado a dicha categoría. Ojo con este último dato, puesto que a veces estará vacío en caso de que no haya habido ingresos.

En el tercer bloque hay unos gráficos que nos ayudan a visualizar mejor la tabla anterior. El primer gráfico, de tipo circular, nos muestra los porcentajes que hemos gastado en cada categoría con respecto al total. El siguiente gráfico, de barras horizontales, nos muestras las mismas cantidades que la tabla.

 ![Control gastos piechart](/images/uploads/posts/control-gastos/control-gastos-grafico-piechart.png){:class="img-left no-margin"}
 ![Control gastos barchart](/images/uploads/posts/control-gastos/control-gastos-grafico-barchart.png){:class="img-right no-margin"}

### Resumen anual
La vista de resumen anual nos ofrece una versión global a través del año. Se compone de tres bloques principales.
 
 En el primero, podemos ver una lista que resume nuestros ingresos y gastos en cada mes. Al final, se muestra un sumatorio de cada columna. Encontramos los siguientes campos:
 ![Resumen anual por mes](/images/uploads/posts/control-gastos/control-gastos-resumen-anual-meses.png){:class="img-center"}

 * **Mes**: Periodo al que corresponden los datos.
 * **Gastos**: Suma de todos los gastos durante dicho mes.
 * **Gastos computables**: Suma de todos los gastos marcados con *Incluir* **SI**. 
 * **Ingresos**: Suma de todos los ingresos recibidos durante el mes.
 * **Cashflow**: Diferencia entre los ingresos y los gastos. Si el valor es positivo, hemos ganado más de lo que hemos gastado. En caso contrario, hemos gastado más de lo que hemos ganado. 
 * **Inversión**: Cantidad que hemos dedicado a la categoría *Ahorros*. Con esta columna pretendemos llevar el control de cuanto dinero estamos invirtiendo o guardando a propósito y no sólo porque nos sobra. Idealmente, a principio de mes. 

A continuación tenemos una tabla similar a la que existe en la vista anual, donde vemos nuestro gasto por categoría en todo el año. 

El último bloque nos ofrece ciertas estadísticas sobre nuestro dinero.
 ![Estadisticas anuales](/images/uploads/posts/control-gastos/control-gastos-resumen-anual-estadisticas.png){:class="img-center"}

## Descarga
La herramienta es 100% online, funciona sobre tu navegador, no requiere registro y los datos nunca salen de tu espacio de Google Drive. Para acceder a ella, [haz click aquí](https://docs.google.com/spreadsheets/d/1zB9HuMT8xOntAQGMZcQsWfYAC1YgRNG-ZAMGQF1f_As/edit?usp=sharing). He añadido un set de datos de un par de años con unas transacciones aleatorias para que resulte más fácil entender cómo funciona.

Una vez dentro, no modifiques nada ni pidas que comparta la hoja contigo. Haz click en "Archivo" y luego en "Crear una copia". ¡Trabaja siempre sobre tu propia copia!