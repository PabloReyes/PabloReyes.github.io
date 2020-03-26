---
layout: post
title: "Estrategias de trading y análisis sentimental"
published: true
date: 2020-01-15
css_id: trading-sentimental
markdown: markdown
category: Personal
featured: true
image: /images/uploads/posts/trading-sentimental/featured_laptop.jpg
image_credit: Photo by <a href="https://unsplash.com/@austindistel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Austin Distel</a>
excerpt: Desarrollo de una estrategia de trading basada en el análisis sentimental de los mercados del petróleo.
---

Quien me conoce sabe que hay dos temas que me entusiasman especialmente: la tecnología y los mercados financieros. Cuando puedo juntar ambas y hacer algo útil es tremendamente emocionante. Hace unos meses tuve la suerte de poder trabajar con una gestora de patrimonios y una empresa del sector petrolero en un proyecto de consultoría donde desarrollamos un modelo predictivo sobre precios del crudo basado en unos indicadores técnicos y un análisis sentimental de redes sociales y noticias. Explicaré por encima de qué iba el asunto, pero vamos a aclarar un par de conceptos.

## Procesamiento del lenguage y análisis sentimental

El procesamiento del lenguaje natural (**NLP**) es una rama derivada de distintas ciencias que trata la interacción y el entendimiento entre el lenguaje humano y las máquinas. Éste área es tremendamente extensa y permite desde que Alexa nos entienda cuando le hablamos hasta que Google sea capaz de traducir de un idioma a otro. Una de las diversas aplicaciones que derivan de NLP es en **análisis sentimental**, que, a grandes rasgos, busca detectar si un mensaje es positivo o negativo. Vamos a ver un ejemplo con dos frases que podríamos encontrar un día cualquiera en twitter: 
![](/images/uploads/posts/trading-sentimental/vader_example.gif)

En el primer mensaje digo que que Microsoft ha ido muy bien últimamente y que creo que sus acciones subirán un 10% antes de final del trimestre. Claramente soy optimista, y el algoritmo así lo detecta con un sentimiento de 0.86 en la escala [-1, +1] (positivo). 

En el segundo, donde me muestro preocupado por una posible guerra y hablo de aviones que se estrellan, el algoritmo arroja un sentimiento de -0.89 en la escala [-1, +1] (negativo). 

Las posibilidades de estos algoritmos son infinitas. Desde detectar si un usuario está mosqueado mientras habla con un chatbot hasta saber qué piensan las redes sociales de una película.

## Estrategia de trading y backtesting

Una **estrategia de trading** se compone de una serie de reglas que fijan cuándo y cuanto se debe comprar o vender un activo financiero. En estas estrategias suelen usarse indicadores técnicos como podría ser el precio, el volumen de compra/venta del día, la media de precio de las últimas semanas, etc. Para saber si nuestra estrategia es buena debemos ponerla a prueba, y no siempre (por no decir nunca) tenemos el tiempo ni el capital para probarla en un entorno real. El mecanismo para probar la estrategia de una manera lo más real posible consiste en viajar al pasado y hacer como si cada vez que nuestra estrategia recomendaba comprar o vender le hubiéramos hecho caso. A esto se le llama [backtesting](https://www.investopedia.com/articles/trading/05/030205.asp).
![](/images/uploads/posts/trading-sentimental/buying_selling.gif){:class="img-right"}

Esto tiene la siguiente pinta: *Viajamos* al pasado y ponemos a correr nuestra estrategia. Ésta se va ejecutando a toda velocidad pasando los días en milisegundos pasado y comprobando si las condiciones de compra/venta que hemos definido se cumplen. Cuando lo hacen, simula una orden en un broker y va actualizando nuestro balance a medida que éstas se ejecutan. Al final del test, sabremos si la estrategia fue rentable o no. Que durante un periodo anterior la estrategia hubiera acertado con un buen margen no garantiza que lo vaya a hacer el año siguiente, pero es lo mejor que tenemos hasta ahora.

Veamos el test anterior de forma gráfica. Los triángulos verdes señalan órdenes de compra y los rojos de venta. En la parte superior, los puntos azules son trades completos de compra/venta donde hemos salido ganando y los rojos donde hemos salido perdiendo. 
![](/images/uploads/posts/trading-sentimental/grafica_backtrader.png)

Al final de la prueba de 5 meses, habríamos convertido $10.000 en $11.355: una rentabilidad del 13.55%. Aparentemente somos unos genios, pero la realidad es que hubieramos hecho mejor comprando 1 sola vez en Enero y vendiendo en Mayo (o no vendiendo nunca), pues en el mismo periodo la acción se movió al alza un 40%. Incluo es posible que eligiendo días al azar para realizar compras y ventas hubieramos obtenido una rentabilidad positiva también. Que una estrategia obtenga rentabilidad positiva en un periodo no significa que sea buena, pero eso ya lo discutiremos otro día. 

## El proyecto: un dashboard para ayudar al departamento de compras

La idea del proyecto consistía en ofrecer un dashboard con información útil para el departamento de compras de una empresa del sector petrolero. Esta compañía compraba y vendía ~2M € diariamente de crudo, por lo que dependía enormemente del precio de WTI en un momento concreto. Relizar la compra/venta a las 10AM o a las 3PM podía tener un resultado tremendamente distinto según se moviera el petróleo ese día. 
![](/images/uploads/posts/trading-sentimental/volatilidad_petroleo.png){:class="img-left"}

Vemos aquí la volatilidad del petróleo en estos inicios de 2020, donde una noticia de madrugada hizo subir su precio un 13% en minutos y un tweet de Donal Trump puede volvió a hacerlo caer en instantes.

Hay ciertos activos que son especialmente sutiles a cambios de sentimiento. Uno muy habitual en el que usar análisis sentimental son las criptomonedas: recomiendo echarle un vistazo a [Twitter Watcher](https://www.linkedin.com/pulse/twitterwatcher-why-twitter-trx-lukasz-wedel/), un proyecto de [Lukasz Wedel](https://www.linkedin.com/in/lukaszwedel/).

Por un lado, la gestora diseñó una estrategía técnica inicial que se fue perfilando y adaptando a medida que incluíamos nuevas fuentes de datos y probábamos más escenarios y configuraciones. Su desarrollo partió de una estrategia conocida basada en indicadores de la [Nube de Ichimoku](https://www.investopedia.com/terms/i/ichimoku-cloud.asp). 

![](/images/uploads/posts/trading-sentimental/ichimoku.png)

Por otro lado, la compañía nos ayudó con una lista de fuentes de información que nos serían útiles: desde cuentas de Twitter a periódicos y fuentes de información privadas. Analizando todas esas fuentes de forma periódica, deberíamos ser capaces de identificar un sentimiento medio y fuertes cambios de éste que nos permitiera complementar la estrategia de la gestora con un nuevo indicador sentimental: es decir, a todos los indicadores técnicos como el precio medio, el volumen o RSI, añadimos un indicador que nos decía en un instante en concreto qué sentimiento había sobre el petróleo: podeis observarlo en la parte inferior del gráfico anterior.

Con estos datos, cualquiera podría desarrollar una estrategia del tipo:

> Cuando el precio medio de la última semana sea mayor que el precio medio del último mes, y además se haya producido un cambio positivo en el sentimiento de más de un 40% en la última hora, recomienda comprar. Cuando haya una caída fuerte en el sentimiento, recomienda vender.

(es sólo un ejemplo basado en [cruces de EMAs](https://www.theforexchronicles.com/the-ema-5-and-ema-20-crossover-trading-strategy/), que nadie piense en usar esta estrategia tal cual en el mundo real)

Finalmente, en un dashboard se mostraban los eventos más importantes actualizados cada minuto (indicadores técnicos, tweets, noticias, cambios repentinos en el volumen de compra/venta, etc) y un indicador propio resultado de la combinación de todo el resto que ayudaba a tomar decisiones al responsable de compras. 

La próxima vez es posible que intente usar otras fuentes de información alternativa como [RavenPack](https://www.linkedin.com/company/ravenpack/) o [Quandl](https://www.linkedin.com/company/quandl/), pero los resultados fueron positivos y sirvieron para acercar a un par de empresas tradicionales a este mundo del fintech y a mi para darme cuenta de cuán lejos están aún muchas compañías de aprovechar todo lo que la tecnología podría ofrecerles.

----

Para este trabajo usé python + backtrader como plataforma de backtesting, NLKT con el léxico VADER para el análisis sentimental, Google Cloud Platform para el deployment de las aplicaciones y Firebase como base de datos no relacional.

Lo explicado aquí tiene únicamente interés divulgativo para quien no conoce mucho este sector y se han dejado muchos detalles fuera: el análisis sentimental es más complejo de lo explicado ("es muy chulo" es un mensaje positivo si hablamos de un reloj, pero negativo si hablamos de una persona), un algoritmo que compra y venta con alta frecuencia tendrá un alto gasto en comisiones, etc. Los ejemplos no son los realmente usados en el proyecto.