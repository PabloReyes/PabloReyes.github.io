---
layout: post
title: Herramienta de control de gastos
published: false
date: 2017-06-27
css_id: herramienta-control-gastos
category: Finanzas
image: /images/uploads/control-gastos-2.jpg
cta: Aprende a controlar tus gastos
tags: [seguridad, finanzas]
---
La principal funcionalidad de un PFM (*Personal Financial Management*) es controlar en qué gastamos el dinero y ayudarnos a entender nuestra verdadera situación financiera. Y este tipo de software es precisamente al que me dedico profesionalmente en [Strands](http://strands.com).

La herramienta de control de gastos viene en formato de proyecto de Google Spreadsheets, y permite subir tus extractos directamente de tu banco y dejar que la herramienta categorize tus transacciones.

Las estadísticas generadas te ayudarán a conocer tu estado actual y a ver qué está alejándote de tus objetivos financieros.
<!--more-->


![Control de gastos](/images/uploads/control-gastos-anual-full.png)

## Descarga
La herramienta de control de gastos viene en formato de proyecto de Google Spreadsheets. Para acceder a ella, haz click aquí. Una vez dentro, no modifiques nada ni pidas que comparta la hoja contigo. Haz click en "Archivo" y luego en "Crear una copia". ¡Trabaja siempre sobre tu propia copia!

## Funcionalidades

#### Carga de transacciones por ficheros XLS/CSV
El principal canal de inyección de datos a la aplicación son los exports en XLS/CSV de nuestrs bancos online. Existen en la herramienta, por defecto, tres hojas para carga de datos:
* Operaciones: C. Corriente
* Operaciones: T. Credito
* Operaciones: Otros

No existe distinción en el tratamiento de cada una de estas hojas, por lo cualquier transacción puede ir a cualquiera de las tres. La estructura de las hojas es la misma: 3 columnas conteniendo *Fecha*, *Descripción* e *Importe*. Aun así, aconsejo separemos nuestras transacciones con un patrón como este, donde cargaremos distintas cuentas/tarjetas en distintas hojas y la última la dejaremos para operaciones en efectivo o de otra cuenta que no podamos exportar.

Para un ejemplo de cómo cargar transacciones de ING Direct, echa un vistazo al siguiente tutorial:
[Control de gastos: carga de datos con ING Direct](/finanzas/tutoriales/control-gastos-carga-ing)

#### Carga manual de transacciones
Para operaciones que hayamos hecho en efectivo o provenientes de otra cuenta que no queramos añadir, usaremos la pestaña de *Operaciones Otros*. Esta pestaña consta de 3 columnas donde introduciremos fecha, descripción e importe de las transacción.

#### Categorización de transacciones
Las transacciones contienen información que nos permiten categorizarlas: facturas, restaurantes, nómina, ropa, etc. Aunque existe un juego predefinido de categorías y reglas, estas pueden ser adaptadas por nosotros mismos en la pestaña "_categorizador".

![Reglas y categorías](/images/uploads/control-gastos-categorizador.png){:class="img-right"}
En dicha pestaña encontramos dos bloques: Lista de categorías y lista de reglas.

Lo primero que deberíamos hacer es definir una taxonomía (conjunto de categorías) que se adapte a nuestro perfil de consumidor. Yo, por ejemplo, no tengo una categoría de *Ropa* porque no suelo comprar mucha, por lo que todos mis gastos de ropa los incluyo dentro de *Personal*. Por otro lado, en muchas ocasiones almuerzo en el restaurante de la oficina, por lo que tengo una categoría de *Comida Trabajo*.

![Gestion reglas](/images/uploads/control-gastos-gestion-reglas.png){:class="img-left size-30"}

Las transacciones se categorizarán siguiendo nuestras propias reglas, que definimos en el bloque de la izquierda. El funcionamiento es sencillo:
 1. En la columna ***Contiene*** (A) introduciremos un trozo de la descripción de la transaccion a identificar.
 2. En la columna ***Categría*** (B) introduciremos la categoría a la que corresponde. Verás que existe un dropdown que muestra las categorías del bloque de la derecha.

Algunas reglas están creadas de ejemplo, pero tú deberás crear tus propias reglas. Mi recomendación es ir a la vista mensual e ir viendo qué categoría le pondríamos a cada transacción. Si vemos que puede englobar más de una transacción (porque compramos normalmente ahí o porque confiamos que todo lo que contenga "restaurante" va a ser Ocio), iremos la pestaña de *_categorizador* y crearemos una regla.

A medida que crees reglas, las próximas transacciones que vayan entrando irán autocategorizándose con las reglas ya creadas.

#### Visualización de gastos mensuales
 ![Selección de hojas](/images/uploads/control-gastos-selector-hojas.png){:class="img-right size-20"}
La herramienta consta de múltiples hojas, pero las más importantes y donde pasaremos la mayoría del tiempo serán las hojas de gastos mensuales. Es ahí donde comprobaremos que la categorización es correcta, veremos nuestros gastos agrupados por categoría y mes, agregaremos información extra a nuestras transacciones, etc.

Todas las hojas son accessibles desde el selector de hojas, que se encuentra abajo a la izquierda.

En cada mes, encontraremos listadas todas las transacciones con una serie de campos:
![Transacciones](/images/uploads/control-gastos-transacciones-mes.png){:class="img-center"}

* **Incluir**: Seleccionaremos "NO" cuando no queremos que esta transacción tenga un impacto en nuestras estadísticas. Ejemplo: Una transferencia de tu cuenta corriente a tu cuenta de ahorros se considerará un *gasto* en una cuenta y un *ingreso* en otra. Esto lleva a que las estadísticas cuenten más gastos e ingresos de los reales, ya que no saben que ambas cuentas son nuestras y el dinero no se ha gastado ni ganado, sólo movido.
* **Fecha**: Fecha en la que tuvo lugar la transacción. Se ordenan ascendentemente, con las últimas transacciones al final de la lista.
* **Descripción**: Descripción que tu banco le dio a la transacción. A veces contiene muchísima información inutil, pero tambien tiene palabras claves que nos ayudan en la categorización.
* **Importe**: Importe de la transacción. Contiene signo, por lo que las transacciones negativas son gastos y las positivas ingresos.
* **Comentario**: Para aclarar el origen de un gasto, podemos introducir nuestro propio comentario. Este campo intenta evitar que dentro de dos meses no sepas de qué viene una transacción.
* **Categoría (manual)**: En caso de que nuestro categorizador no haya sido capaz de categorizar la transacción (o la haya categorizado mal), podemos poner la categoría nosotros mismos usando el selector de categoría. Si introducimos la categoría manual, siempre tendrá preferencia sobre la categoría automática. Si ves que debes poner demasiadas categorías manuales, es que no estás creando suficientes reglas.
* **Categoría**: Si no existe categoría manual, se rellena con la categoría aplicada por la regla definida en el categorizador.

![Gastos agrupados](/images/uploads/control-gastos-agrupados.png){:class="img-right"}
En un segundo bloque encontraremos una lista agrupada de categorías con sus gastos durante el mes. Esta lista agrupa todas las transacciones en las que hemos marcado **SI** en la columna *Incluir*. Además, muestra qué porcentaje de nuestros ingresos hemos dedicado a dicha categoría. Ojo con este último dato, puesto que a veces estará vacío en caso de que no haya habido ingresos.

En el tercer bloque hay unos gráficos que nos ayudan a visualizar mejor la tabla anterior. El primer gráfico, de tipo circular, nos muestra los porcentajes que hemos gastado en cada categoría con respecto al total. El siguiente gráfico, de barras horizontales, nos muestras las mismas cantidades que la tabla.

 ![Control gastos piechart](/images/uploads/control-gastos-grafico-piechart.png){:class="img-left no-margin"}
 ![Control gastos barchart](/images/uploads/control-gastos-grafico-barchart.png){:class="img-right no-margin"}


<br/><br/><br/>

#### Resumen anual
La vista de resumel anual nos ofrece una versión global a través del año. Se compone de tres bloques principales.
 
 En el primero, podemos ver una lista que resume nuestringresos y datos durante cada mes. Al final, se muestra un sumatorio de cada columna. Encontramos los siguientes campos:
 ![Resumen anual por mes](/images/uploads/control-gastos-resumen-anual-meses.png){:class="img-center"}

 * **Mes**: Periodo al que corresponden los datos
 * **Gastos**: Suma de todos los gastos durante dicho mes
 * **Gastos computables**: Suma de todos los gastos marcados con *Incluir* **SI**. 
 * **Ingresos**: Suma de todos los ingresos recibidos durante el mes
 * **Cashflow**: Diferencia entre los ingresos y los gastos. Si el valor es positivo, hemos ganado más de lo que hemos gastado. En caso contrario, hemos gastado más de lo que hemos ganado. 
 * **Inversión**: Cantidad que hemos dedicado a la categoría *Ahorros*. Con esta columna pretendemos llevar el control de cuanto dinero estamos invirtiendo o guardando a propósito y no sólo porque nos sobra. Idealmente, a principio de mes. 

A continuación tenemos una tabla similar a la que existe en la vista anual, donde vemos nuestro gasto por categoría en todo el año. 

El último bloque nos ofrece ciertas estadísticas sobre nuestro dinero.
 ![Estadisticas anuales](/images/uploads/control-gastos-resumen-anual-estadisticas.png){:class="img-center"}

## FAQ
#### ¿Como agrego más transacciones a medida que pasa el tiempo?
En la tabla de Operaciones podrás seguir añadiendo operaciones al principio (o al final) de la lista. Recuerda no introdudir nuevas transaccines en medio de las que ya existían, puesto que pueden afectar a tu vista global y llevar a datos erróneos (transacciones mal categorizadas manualmente, etc)

#### He hecho una transferencia entre mis cuentas y ahora me cuenta como gasto y como ingreso
Debes marcar la transferencia con *Incluir*=**NO**. Es la primera columna de la [vista mensual](#visualización-de-gastos-mensuales).


#### ¿Puede alguien ver mis transacciones?
Las transacciones sólo están en tu hoja de cálculo, dentro de tu cuenta de Google. Nadie más tiene acceso a menos que lo compartas explícitamente.