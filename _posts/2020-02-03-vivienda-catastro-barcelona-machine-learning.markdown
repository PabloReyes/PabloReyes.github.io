---
layout: post
title: "Vivienda en Barcelona: un análisis desde el Catastro"
published: true
date: 2020-02-03
css_id: catastro-barcelona
markdown: markdown
category: Personal
featured: true
image: /images/uploads/post_catastro_barcelona.png
excerpt: Un paseo por Barcelona desde 1900 hasta hoy de la mano del Catastro, donde podemos observar la evolución de la vivienda, su composición, sus distritos y sus calles.
---

Cuando llegué a vivir a Barcelona hace ya 5 años me enamoré de sus barrios, sus calles y su arquitectura. Todavía hoy, camino al trabajo cada día, sigo mirando edificios de Muntaner o Diagonal y me imagino viviendo en uno de ellos. Me imagino que son enormes y de techos altos, construidos en una época donde el metro cuadrado no se exprimía tanto.

Un día, buscando año de consutrucción y detalles del [número 4 de Plaça Bonanova](https://www1.sedecatastro.gob.es/CYCBienInmueble/OVCListaBienes.aspx?del=8&muni=900&rc1=7844319&rc2=DF2874D&from=OVCBusqueda&final=&pest=coordenadas&latitud=41.406695&longitud=2.134154&gradoslat=41&minlat=23&seglat=51&gradoslon=2&minlon=11&seglon=24&x=&y=&huso=0&tipoCoordenadas=2&TipUR=Coor) (1936, 20 viviendas de unos 300m², 1.3M€/venta y 4.200€/alquiler. Si os lanzais invitadme un día) pensé que quizás podía encontrar información masiva sobre la vivienda en Barcelona en el propio catastro y descubrir alguna curiosidad. Y así fue.

## Los datos

La información del Catastro que he usado se ofrece un [formato propio .CAT](http://www.catastro.minhap.es/documentos/formatos_intercambio/catastro_fin_cat_2006.pdf), que no es más que una formato tabular de ancho fijo que divide su información en distintos tipos o secciones: fincas, construcciones, inmuebles, etc. Por suerte para mi, alguien ya se me adelantó y creó un [script para transformar ficheros .CAT a csv](https://github.com/GuillemHerrera/cat2csv).

El primer paso es identificar qué hay en cada fichero del catastro. Tras lidiar un rato con las distintas columnas y la especificación del propio fichero entiendo que de los distintos tipos de ficheros que hay me interesan 4:

> registro de finca (11) –> registro de unidad constructiva (13) –> registro de construcción (14) –> registro de inmueble (15)


Juntando información de distintas secciones y ficheros, limpiando datos y haciendo algunas transformaciones tenemos un set digno para trabajar.

## Tipos de inmuebles

El registro de inmuebles nos da información sobre el destino de cada uno en la columna "clave_uso". Observando este dato podemos obtener algunas conclusiones:

![Tipos de inmuebles](/images/uploads/posts/catastro_barcelona/tipos_inmuebles.png){:class="img-left"}

Viviendas y almacenes/estacionamientos cubren el 90% de los inmuebles. Los edificios religiosos son claramente los mas grandes de la ciudad con casi 900m² de media frente a los 83m²  de la vivienda media barcelonesa. Entre 1960 y 1975 se construyó mucho... de todo en Barcelona.

Para este caso, me centraré sólo en las viviendas.

## Fechas de construcción

El Catastro contiene información de fincas de Barcelona desde hace más de mil años (literalmente), pero revisando un poco la calidad de los datos más antiguos encontramos cosas un tanto sospechosas.
![](/images/uploads/posts/catastro_barcelona/vivienda_rosello_1000.png){:class="img-left"}

Existen más de 6.000 viviendas activas con registros previos al año 100 (de hecho, son todos del año 0), mientras que entre el 100 y el 1800 no hay más de 600. Raro raro ese año 0.

Además, revisando algunas viviendas aleatorias anteriores a 1800 he encontrado algunas incoherencias que me hacen sospechar de los funcionarios del catastro de la época, como esta casa [Carrer Rosello](https://www1.sedecatastro.gob.es/CYCBienInmueble/OVCListaBienes.aspx?RC1=0337114&RC2=DF3803E&RC3=&RC4=&esBice=&RCBice1=&RCBice2=&DenoBice=&pest=rc&final=&RCCompleta=0337114DF3803E&from=OVCBusqueda&tipoCarto=nuevo&ZV=NO&ZR=NO) que data del año 1000. No se Rick... parece falso.

Me quedaré sólo con las viviendas construidas a partir de 1900.

## Evolución de la vivienda en Barcelona

¿Eran las casas de antes mas grandes que las de ahora? ¿De qué época son la mayoría de las viviendas de la ciudad condal? ¿Cómo afectó el boom inmboliario reciente a la oferta de vivienda en Barcelona? Los datos del catastro pueden ayudarnos a responder algunas de estas preguntas.
![](/images/uploads/posts/catastro_barcelona/cantidad_tamaño.png)

De estas gráfica podemos sacar algunas conclusiones interesantes. En los años 20s y 30s se da la primera época de crecimiento importante del siglo XX. Es en estos años, aprovechando la [Exposición Internacional de Barcelona](https://es.wikipedia.org/wiki/Exposici%C3%B3n_Internacional_de_Barcelona_(1929)) en 1929 se urbaniza parte de la montaña de Montjuïc dejándo perlas como el Palacio Nacional, la Fuente Mágica o el Pueblo Español.

En los años 60 vemos el resultado del desarrollismo impulsado por el alcalde [José María de Porcioles](https://es.wikipedia.org/wiki/Jos%C3%A9_Mar%C3%ADa_de_Porcioles). Se construyen grandes avenidas, bloques de pisos, se renuevan alumbrados, alcantarillados, se hace nuevas líneas de metro, etc. La ciudad se consolida como un referente en ferias y congresos.

> A partir de la década de 1960, el crecimiento económico y el boom turístico incrementará el número de urbanizaciones más o menos próximas a la ciudad jardín en áreas litorales o de montaña ocupando el territorio, a menudo de forma indiscri-minada, cuando no ilegal. – [La vivienda en cataluña desde una perspectiva histórica, Mercè Tatjer](http://www.ceut.udl.cat/wp-content/uploads/02c-tatjer.pdf)

Si alguno esperaba encontrar una barra que llegara hasta el espacio entre el año 2000 y 2008, siento decepcionar. El boom inmobiliario tuvo un efecto limitado en Barcelona en lo que a número de nuevas viviendas se refiere.

En cuanto al tamaño medio de las viviendas en el tiempo (línea azul) me llevé una sorpresa. Siempre había pensado eso de que las viviendas antiguas eran más grandes, pero los datos dicen lo contrario. No soy capaz de explicar el subidón de los años 40: ¿se construyeron pocas casas, pero muy grandes? No lo se, pero la tendencia parece ser que cada vez las casas son más grandes, [¿quién lo iba a decir?](https://www.elmundo.es/economia/2017/02/10/589cc14bca4741f1318b4671.html).
![](/images/uploads/posts/catastro_barcelona/viviendas_por_tamano.png)

Aún así, el tamaño medio se situa en 83², siendo 75m² el tamaño mas frecuente de las viviendas en Barcelona.

## Distritos

Pero bueno, no todos los barrios de Barcelona son iguales. Uno de los atributos que tenemos por cada finca es el distrito al que pertenecen. Desgraciadamente, este distrito viene representado por un número del 1 al 10. Poco útil por sí sólo, pero acompañado de las coordenadas de los inmuebles de cada distrito podemos inventar algo.

### Sistemas de Coordenadas

Cada finca incluye unas coordenadas que a simple vista ya resultan raras, al no ser las típicas coordenadas de longitud/latitud a las que estamos acostumbrados. Estas coordenadas tienen esta forma (42766481, 458170071) y están en el sistema geoespacial UTM de la zona 31N ([EPSG:25831](https://epsg.io/25831)), por lo que tenemos que transformarlas a WGS 84 ([EPSG:4326](https://epsg.io/4326)) que es el que usamos normalmente.
![](/images/uploads/posts/catastro_barcelona/coordenadas.png)


### Identificando distritos

Si seleccionamos un conjunto de 1000 viviendas al azar y les aplicamos un color a cada distrito, podemos plasmarlas en un mapa para conseguir una primera idea del área que cubren estos distritos.
![](/images/uploads/posts/catastro_barcelona/viviendas_scatter.png){:class="img-right"}

Aunque a simple vista ya se identifican más o menos qué zona incluye cada uno, sería mucho mejor si pudiéramos cercarlos con una muralla virtual que nos mostraran mucho más fielmente los límites de cada uno. Esto lo conseguiremos identificando los puntos más limítrofes de cada color, es decir, los que están más a las afueras de cada grupo y uniendo dichos puntos hasta formar un polígono. Para ello, hacemos uso de un [Convex Hull](https://en.wikipedia.org/wiki/Convex_hull).
![](/images/uploads/posts/catastro_barcelona/convex_hull.png){:class="img-center"}

¡Ahora mucho mejor! Cada distrito está perfectamente limitado y separado de los demás. Ahí ya vemos Ciutat Vella, Eixample, Montjuïc, etc.

### Evolución por distrito

¿De qué forma ha evolucionado la construcción de nueva vivienda en cada distrito? Los datos anteriores nos dan una idea general, pero analizando uno por uno encontramos cosas interesantes.
![](/images/uploads/posts/catastro_barcelona/distritos_evolucion.png)


En los años 20-40 se aprecia un crecimiento importante sobre los distritos de Ciutat Vella, Sants-Montjuic, Gràcia y Eixample que parece acabar a final de los años 30s debido, imagino, a la guerra civil. La zona de Sarrià-Sant Gervasi es la única que en plena posguerra mantiene un crecimiento estable y sin baches.

Aunque en los años 60-80 que hablábamos antes hubo crecimiento la ciudad en general, el distrito de Ciutat Vella no se vió prácticamente afectado, lo cual tiene sentido siendo el casco antiguo de la ciuad, donde poco se ha edificado en los últimos 100 años.

## Las calles
![](/images/uploads/posts/catastro_barcelona/calles.png){:class="img-left"}

Cualquiera que conozca Barcelona puede intuir cuales son las calles/avenidas más pobladas básicamente por la longitud de algunas de ellas. Lo que no esperaba es que Gran Via de las Corts Catalanas tuviera casi el doble de viviendas que la segunda de la lista, Meridiana.


De las grandes, *Muntaner* se lleva la palma en cuanto a tamaño medio con 127m² seguida de Diagonal con 118m². Pero por muy largas y pobladas que sean estas calles, no son las que tienen los mayores pisos. Para eso tenemos que un poco más arriba
![](/images/uploads/posts/catastro_barcelona/calles_m2.png){:class="img-right"}

Ferran Agullo, Pau Casals, Bori i Fontestà, Calatrava... las calles con las casas más grandes de Barcelona llevan nombre de los mejores artistas y profesionales de nuestra tierra, aunque la primera posición la obstenta la Reina Victoria de Reino Unido, con un tamaño medio de 247m² y, según idealista, un precio de compra-venta de sobre 1.6M€.

## Bonus: Mapa de calor por tamaño medio de vivienda

¿Entonces, donde están las casas más grande? Pues agrupando las viviendas por fincas y con un el tamaño medio normalizado podemos montar el siguiente mapa de calor donde los tonos más rojizos representan el tamaño medio más grande (azul<cyan<lima<naranja<rojo).
![](/images/uploads/posts/catastro_barcelona/heatmap.png){:class="img-center"}

Como era de esperar la Ciutat Vella tiene los pisos más pequeños de Barcelona (y más antiguos) y se observan viviendas por lo general más grandes una vez se pasa [barrera invisible de la Diagonal](https://www.youtube.com/watch?v=Q8CJXvKc4aA) (marcada en rojo), con excepción del barrio de Gràcia por arriba y La Nova Esquerra de l'Eixample por debajo. El distrito de Sant Gervasi se lleva la palma.

Hasta aquí llego hoy. Con los datos del catastro pueden sacarse muchos más detalles intersantes como la evolución de las zonas comerciales, la cantidad de construcciones subterráneas o la altura de los bloques en el tiempo. Eso se queda pendiente para otro día.

¡Gracias!

---

Como de costumbre, la información aquí descrita está sujeta a errores y no debería usarse para otra cosa que no sea disfrutar de un rato de lectura y aprender algunas cosas de Barcelona.

Para este post usé python+pandas+[pandaral·lel](https://github.com/nalepae/pandarallel) para el análisis y manejo de los datos, matplotlib para la generación de gráficos, pyproj para las transformaciones entre sistema de coordenadas y ipyleaflet para los mapas. El código puede encontrarse en [mi github](https://github.com/PabloReyes/catastro-barcelona-stats/blob/master/analisis_catastro.ipynb).

