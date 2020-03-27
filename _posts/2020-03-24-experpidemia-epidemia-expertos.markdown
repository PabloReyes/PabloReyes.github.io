---
layout: post
title: "Experpidemia: La epidemia de los expertos"
published: true
date: 2020-03-26
css_id: experpidemia
markdown: markdown
category: Datos
featured: true
image: /images/uploads/posts/expertos/laptop-feature-coronavirus.png
image_credit: Foto de <a href="https://unsplash.com/@thenewmalcolm?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Obi Onyeador</a>
excerpt: "Por cada experto que dice A, hay otro que dice B. Y es normal: para muchas cosas no tenemos ni idea"
---

Con esto del COVID-19 no paro de ver expertos sanitarios (y peor, no sanitarios) que hacen todo tipo de predicciones sobre la evolución del virus. En Kaggle ya hay más de [1.000](https://www.kaggle.com/search?q=covid+in%3Anotebooks) notebooks analizando datos de todo tipo de fuentes, que no son pocas: hay más de 44.000 artículos y papers científicos los cuales [obviamente han sido analizados en Kaggle](https://www.kaggle.com/maksimeren/covid-19-literature-clustering). 

En este gráfico, cada puntito es un artículo/paper científico sobre coronavirus:
![](/images/uploads/posts/expertos/scatter_articulos.png){:class="img-center"}

Justo ayer terminaba en Kaggle [una competición](https://www.kaggle.com/c/covid19-global-forecasting-week-1/notebooks) para desarrollar un modelo predictivo de la evolución del bicho que ha contado con 544 equipos. Todo un evento express que ha contado con centenares de mentes creando modelos de Machine Learning, Inteligencia Artificial, Blockchain, Condensadores de flujo y Computanción Cuántica. No, [en serio](https://www.kaggle.com/general/137559#781443).

## Modelos complejos
Quizás con menos condensadores y qubits, pero Neil Ferguson, una referencia en la transmisión de enfermedades entre humanos y animales y que está aconsejando a Boris Johnson en este asunto, publicaba esta semana que había desarrollado, hace 13 años, un modelo predictivo sobre la expansión de pandemias *de miles de lineas de código sin documentar* y que Microsoft, Github, y otras tantas instituciones estaban intentando darle forma para que fuera usable. 

Nassim Taleb, otro experto en temas de incertitumbre y *fragilidad* le comentaba lo siguiente:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Lesson from a long experience with model blowups:<a href="https://twitter.com/neil_ferguson?ref_src=twsrc%5Etfw">@neil_ferguson</a>, if you need a model w/&quot;thousands of lines&quot;, this is not a model useable for real world risk &amp; decisions--rather something with the FRAGILITY of a house built with matches to impress some tenure committee. <a href="https://t.co/7HZNbPycTV">https://t.co/7HZNbPycTV</a></p>&mdash; Nassim Nicholas Taleb (@nntaleb) <a href="https://twitter.com/nntaleb/status/1242235586578190338?ref_src=twsrc%5Etfw">March 23, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

No tengo ni idea de pandemias –ni siquiera se qué tomarme para un resfriado–, pero sí se algo de sofware y puedo asegurar que un modelo de miles de líneas aparentemente escrito por una sola persona hace más de 13 años y sin documentar es algo para coger con pinzas y que probablemente no debería usarse para tomar ninguna decisión de envergadura. 

Y como este, hay miles. 

## Yo también soy experto en epidemias

Decía antes que acaba de terminar esta competición mundial para encontrar el mejor modelo predictivo para la evolución del COVID-19. Hasta ahora, el modelo más valorado ha sido el [COVID Global Forecast: SIR model + ML regressions](https://www.kaggle.com/saga21/covid-global-forecast-sir-model-ml-regressions), de [Patrick Sánchez](https://www.kaggle.com/saga21), que por cierto es de Barcelona. Patrick ha hecho un excelente trabajo analizando los datos disponibles y aplicando tanto el [modelo teórico SIR](https://www.kaggle.com/saga21/covid-global-forecast-sir-model-ml-regressions) como un modelo de Regresión Lineal. Recomiendo leer todo el notebook porque merece la pena. 

Con su modelo predictivo final, el resultado de la predicción para España durante el mes de Marzo ha sido el siguiente:
![](/images/uploads/posts/expertos/regresion-2-spain.png)

Desde luego, ¡un resultado bastante aceptable! El modelo ha sabido predecir con bastante acierto la evolución del virus durante el mes de Marzo. 

Pero... ¿No sabíamos ya, mas o menos, la velocidad de propagación del virus? ¿No nos dicen todos los días a todas horas en televisión cada cuantos días se está duplicando el número de contagiados? ¿Es necesario un trabajo como el de Patrick para, con los datos que disponemos, "predecir" los contagios en Marzo?

He abierto un Excel, he volcado los datos de contagios reales y he hecho mi propio "modelo" usando matemáticas de primaria (sumar y multiplicar). Quizás hasta he hecho más trabajo de la cuenta, puesto que podía haber usado una servilleta y un boli. Mi resultado es este:

![](/images/uploads/posts/expertos/regresion-personal-diy.png)

Exacto. El virus crece de forma exponencial, más o menos. Sorpresa.

## La teoría y la práctica

No digo este "*más o menos*" dando a entender que con un poco de trabajo podría hacerlo más exacto, no. Digo *más o menos* consciente de que nadie puede preveer la evolución de este virus de forma acertada por muy científico que sea porque no conocemos las medidas que se tomarán mañana: y esas medidas cambiarán drásticamente la evolución del virus. Estamos en medio del meollo, y los datos disponibles son de un par de meses donde distintos gobiernos han tomado distintas medidas en distintos momentos, y cuyos efectos están empezando **ahora** a ser visibles. 

Si alguien piensa que "*bueno, pero estos modelos son para reprensentar qué pasaría si no se tomaran medidas*", simplementa está reconociendo que no valen de nada. Obviamente que el virus se propagaría rápidamente sino se hiciera nada. Y muy probablemente una curva exponencial refleje más o menos bien su evolución: ¿y de qué vale eso?

![](/images/uploads/posts/expertos/robot-basura.jpg){:class="img-right"}
Todas las horas de trabajo en el desarrollo de este modelo van a la basura en cuanto que la gente se queda en casa. O cuando cierren unas aerolineas. O cuando se cierre una frontera. O cuando el virus mute. O cuando venga un temporal que cambie el clima durante días. Por supuesto a alguno se le ocurirrá contemplar el impacto de cada una de esas alteraciones para así hacer el modelo *mejor*, y muy seguramente acabe con un modelo de miles de líneas sin documentar y que fallaría igualmente por un bug en la librería que usó y que no se actualiza desde hace 13 años. 

[Un estudio de esta misma semana (con científicos del MIT, ojo)](https://cadenaser.com/ser/2020/03/25/ciencia/1585160937_053388.html) dice que muy probablemente vaya a venir una segunda oleada de infecciones por COVID-19, potencialmente cambiando el curso de la famosa curva y hundiendo en la basura los modelos anteriores. Pero ahora otro estudio de la Universidad de Oxford dice que el [50% de los británicos (casi 40 millones) ya está infectado](https://nymag.com/intelligencer/2020/03/oxford-study-coronavirus-may-have-infected-half-of-u-k.html), haciendo inválidos los datos de todos los modelos desarrollados hasta ahora. 

Todos estos estudios, predicciones y modelos son buenos. Deben seguir estudiándose y mejorando, pero estar cubiertos por el paraguas de la ciencia no los hacen ser correctos. 

Y ellos, que son gente inteligente, por lo general lo saben.

> Los expertos Isabel Sola, científica del CSIC que investiga la vacuna del coronavirus, y Adolfo García Sastre, virólogo del Hospital Monte Sinaí de nueva York, aseguran que se pueden dar tres escenarios: que el virus se **erradique**, que se convierta en **pandemia** o que acabe siendo una **enfermedad estacional**.
>
> <cite><a href="https://www.publico.es/videos/844627/asi-sera-el-futuro-del-coronavirus-covid-19-segun-los-expertos-cientificos">Público</a></cite>

Ahora me quedo más tranquilo. 

El propio director de emergencias sanitarias de la Organización Mundial de la Salud también lo reconoce así: 

> All predictions are important. **Most predictions are wrong**. And I think we must be careful with that. 
>
> <cite>Dr. Michael Ryan, Executive Director, WHO Health Emergencies Programme</cite>

## Es más simple
Más que opinar sobre cada noticia que sale en los medios o intentar predecir qué va a pasar los próximos meses (*no, es que yo creo que el estado de alerta va a durar 23 días*), lo mejor que podemos hacer es aceptar que estamos ante un evento que no conocemos y estamos probando cosas. 

Lo mejor realmente que podemos hacer, y para lo que no necesitamos decenas de miles de papers científicos ni competiciones mundiales para hacer predicciones exactas, es recomendarle a la gente que sigan unas normas básicas hasta que encontremos una solución mejor.  

**Lávate mucho las manos con jabón, no te toques la cara, y no te acerques a mucha gente.**

![](/images/uploads/posts/expertos/Covid-19-Transmission-graphic-01.gif)

El efecto que este gráfico puede tener en la erradicación o control de virus siendo tan visual y fácil de entender es posiblemente mayor que el efecto que tenga el trabajo de Patrick y de los otros cientos de data scientists de Kaggle, por mucho que hacer modelos predictivos sea un trabajo tremendamente más complejo. 

## ¿Y para el próximo virus?
En unos años, o décadas, volverá a aparecer otro virus que se expandirá por el mundo y acabaremos sufriendo lo mismo que ahora, muy seguramente, o quizás más. Tras el Covid-19, los estados se prepararán para disponer de más material sanitario, se reforzará la sanidad pública y se adaptará alguna ley que permita actuar de formas más rápida u organizada. Pero la siguiente pandemia quizás será de otro tipo y no valdrán las millones de mascarillas que tengamos en reserva, o tendrá un R0 nunca visto antes y para el cual no había forma de estar preparado, o sus sintomas se manifestarán tras 30 días de incubación y cuando nos demos cuenta estaremos todos infectados, o una semana antes se habrán puesto unos nuevos aranceles a China y nos dirán: *tus mascarillas te las haces tú, guapo*. 

No hay forma de estar 100% preparados para eventos así. Desde que empezó a salir en televisión Fernando Simón explicando cómo estaba evolucionando el virus sabía que le iba a caer una gorda. Dijera lo que dijera, se tomaran las medidas que se tomaran, íbamos a criticarlo. Porque este hombre, aunque fuera la mejor persona de todo el país para gestionar esta situación, no tiene forma de hacerlo. Ni él, ni el gobierno, ni su equipo de expertos. Desde que le nombraron portavoz ya estaba vendido. 


Cuando salgamos de esta será gracias a la capacidad de adaptarnos a sucesos imprevisibles como este, no gracias a las predicciones exactas de algún experto ni a un algoritmo extremadamente complejo. Las teorías son frágiles, y siempre se van adaptando para cubrir mejor el último caso en el que fallaron: así hay un nuevo paper mejor que el anterior, a la espera del próximo fracaso para perder el trono. 

> La fe inquebrantable en la predicción científica con independencia del ámbito, la meta a reducir el futuro a expresiones numúericas sean fiables o no. Y es que nos las hemos arreglado para transformar la creencia religiosa en credulidad para todo lo que se disfrace de ciencia. 
> 
> <cite> Nassim Taleb</cite>



