---
layout: post
title: ¿Qué diablos es Blockchain?
published: true
date: 2017-09-11
markdown: markdown
category: Personal
cta: Venga, cuéntame
image: /images/uploads/posts/blockchain/blockchain_background.png
excerpt: "Explicación para todos los públicos de tecnologías Blockchain y Bitcoin. Requisitos previos: saber respirar."
---
A no ser que estés escondiéndote en una cueva, estoy seguro de que has escuchado hablar de Bitcoins y Blockchains. Al fin y al cabo, son los temas de moda para los medios últimamente - las palabrejas estrellas del año -. Incluso la gente que nunca ha minado una criptomoneda ni sabe cómo funcionan habla de ellas.

Tengo más amigos no técnicos que técnicos. Muchos llevan semanas pidiéndome que les explique estas nuevas palabrejas. Imagino que hay miles de personas pensando lo mismo. Y cuando eso ocurre, es el momento de escribir algo que cualquiera pueda enseñar a esas almas perdidas, explicado de forma sencilla que cualquiera pueda entender -este es el motivo de este artículo-.

---
***Nota**: Este artículo es una traducción personal al castellano del original “WTF is The Blockchain?”, publicado por [Mohit Mamoria](https://hackernoon.com/@mohitmamoria) en [Hackernoon](https://hackernoon.com/wtf-is-the-blockchain-1da89ba19348). El autor ha sido contactado previamente a la publicación de esta traduccion y ha accedido a ella.*
---

### Blockchain: ¿hacía falta algo tan complicado?
>“Por cada problema complejo hay una respuesta clara, sencilla, y errónea”
>
> <cite>H. L. Mencken</cite>

**A diferencia de cualquier otro artículo en internet**, en vez de empezar explicando qué es Blockchain, vamos a ver qué problema resuelve.

Imagina que Juan es tu mejor amigo. Juan está de viaje por el extranjero, y al cabo de unos días te llama y te dice: *“Hey tio, necesito algo de dinero. Estoy pelado”*.

Tú le respondes: *“Claro tío, ahí te mando algo”*. Y cuelgas.

![Joe and me](/images/uploads/posts/blockchain/blockchain_1.png){:class="img-center"}

Entonces vas al banco y le dices al señor que te atiende: *“Por favor, transfiera 1000€ de mi cuenta a la cuenta de Juan"*.

El señor responde: *“Por supuesto caballero”*.

Abre su librito, mira el saldo de tu cuenta para asegurarse de que tienes suficiente dinero para mandarle 1000€ a Juan. Como eres rico, tienes un montón; por lo tanto, el hombre hace una anotación en su librito: 

![Joe and me](/images/uploads/posts/blockchain/blockchain_2.png){:class="img-center"}

<p class="note" markdown="1">
***Nota:** Evito hablar de ordenadores para mantener el artículo lo más sencillo posible.*
</p>

Llamas a Juan y le dices: *“Hey Juan, ahí te he mandado el dinero. La próxima vez que vayas al banco podrás sacar los 1000€ que te he pasado”*.

![Joe and me](/images/uploads/posts/blockchain/blockchain_3.png){:class="img-center"}


¿Qué acaba de ocurrir? Que Juan y tú habéis confiado en el banco para que gestione vuestro dinero. No ha habido ningun movimiendo de dinero real. Todo lo que hizo falta fue una anotación en un librito. Es más, una anotación en un libro que no es ni de Juan ni tuyo.

Y ese es el problema de los sistemas actuales: **Para establecer confianza entre nosotros mismos, necesitamos de una tercera persona.**

Durante años, hemos dependido de intermediarios para confiar los unos en los otros. Te preguntarás: *“¿y qué problema hay?”*.

El problema es que es un único intermediario. Sólo hace falta que una persona u organización sea corrupto -intencionada o no- para llevar a una sociedad al caos. 
* ¿Qué pasa si el librito donde se apuntó la transacción se quema?
* Y si por error el señor del banco ha escrito 1500€ en vez de 1000€?
* ¿Y si lo hizo a propósito?

>Durante años, hemos puesto todos los huevos en la misma cesta, y ésta misma en la de otro.

¿Podría existir un sistema donde pudiéramos enviar dinero a otras personas sin necesidad de un banco?

Para responder a esta pregunta debemos profundizar un pelín más y hacernos una pregunta mejor (al fin y al cabo, sólo las mejores preguntas llevan a las mejores respuestas).

Piénsalo un segundo, ¿qué significa transferir dinero? Es sólo una entrada en un librito. Una mejor pregunta sería:

**¿Hay forma de gestionar este librito entre todos en vez de que lo haga un banco?**

Esa sí es una buena pregunta. Y la respuesta es la que ya te estás imaginando: Blockchain.

Blockchain es un método para mantener un registro de transacciones entre todos en vez de depender de un tercero.

¿Me sigues? Bien. Porque ahora que te han surgido tantas preguntas, vamos a ver cómo funciona un librito de cuentas compartido.

### Sí sí, pero cuéntame, ¿cómo funciona?
El requerimiento de este método es que debe haber suficiente gente que no quiera depender de un tercero para gestionar su libro de cuentas. Sólo entonces, este grupo será capaz de gestionarlo por ellos mismos.

>Puede tener sentido hacerse con unos Bitcoins ahora, por si coge fuerza. Si suficiente gente piensa lo mismo, se convierte en una profecía autocumplida.
>
> <cite>Satoshi Nakamoto, 2009</cite>

¿Pero cuantos? Al menos tres. En nuestro ejemplo, imaginemos que diez personas quieren dejar de usar bancos u otros intermediarios para transferirse dinero. Por mutuo acuerdo, todos tienen información de las cuentas de los demás, pero sin saber a quién pertenecen.

![Joe and me](/images/uploads/posts/blockchain/blockchain_4.png){:class="img-center"}

#### 1. Una carpeta vacía
Cada uno empieza con una carpeta vacía. A medida que progresemos, todos irán llenando de papeles sus carpetas. Y esta colección de papeles crearán el libro de cuentas.  

#### 2. Cuando ocurre una transacción
Cada uno de los diez coge con un papel en blanco, y lo van rellenando a medida que ocurre alguna transacción. 

Si **#2** quiere hacer una transferencia a **#9**, **#2** grita a todos los demas: *"Hey, quiero mandarle 10€ a **#9**!, así que hacedme el favor de apuntadlo en vuestros papeles."*

![Joe and me](/images/uploads/posts/blockchain/blockchain_5.png){:class="img-center"}

Todos los demás comprueban que **#2** tiene fondos suficientes para mandar 10€ a **#9**. Si hay suficiente, todos escribirán una nueva anotación en su hoja de transacciones.

![Joe and me](/images/uploads/posts/blockchain/blockchain_6.png){:class="img-center"}

La transferencia ha terminado. 

#### 3. Sigue habiendo transacciones
A medida que pasa el tiempo, más gente necesita transferir dinero a otros. Cada vez que quieren mandar dinero a alguien, se lo dicen a todo el mundo. En el momento en que alguien lo escucha, lo escribe en su hoja de transacciones.
 
Este proceso continúa hasta que cada uno ha llenado su hoja. Suponiendo que en cada hoja caben diez transacciones, cuando se hace la décima transferencia nadie más tendrá espacio en su hoja.

![Joe and me](/images/uploads/posts/blockchain/blockchain_7.png){:class="img-center"}

Es hora de guardar la hoja en la carpeta y sacar una nueva hoja en blanco y empezar el segundo paso de nuevo.

#### 4. Guardando la hoja

Antes de guardar la hoja en nuestra carpeta, necesitamos sellarla con una clave única que todos en la red hemos decidido. Al sellarla, nos aseguramos de que nadie puede hacer cambios en estas hojas que todos hemos guardados en nuestras carpetas -ni hoy, ni mañana ni nunca jamás-. Si todos confían en el sello, todos confían en el contenido de la hoja. Y este sello en la hoja es donde está la gracia de este método.

<p class="note" markdown="1">
***Jerga:** Se llama “minado” al hecho de sellar la hoja, pero seguiremos llamándolo “sellado” por simplicidad.*
</p>

Antes confiábamos en el banco/intermediario, que nos prometía que lo que quedaba escrito en su librito jamás se alteraría. Ahora esa confianza la depositamos en el sello.

### ¡Interesante! ¿Y cómo sellamos la hoja?

Antes de aprender cómo sellar la hoja, vamos a ver cómo funcionan los sellos en general. Y como prerequisito para aprenderlo vamos a ver cómo funciona la…

#### Máquina mágica

Imagina una máquina cubierta por bloques de hormigón. Tú metes una cajita con algo dentro en la máquina por la izquierda, y por la derecha sale algo que contiene otra cosa.

<p class="note" markdown="1">
***Jerga:** Esta máquina se llama “función hash”, pero no vamos a ser demasiado técnicos. Así que hoy se llamará “La Máquina Mágica”.*
</p>

![Joe and me](/images/uploads/posts/blockchain/blockchain_8.png){:class="img-center"}


Imagina que metes un número 4 por la izquierda. Por la derecha saldría algo así como “dcbea”.

¿Cómo convirtió un 4 en esta “palabra”? Nadie lo sabe. Es más, es un proceso irreversible. Con la palabra “dcbea”, es imposible saber qué se le introdujo a la máquina. Pero cada vez que metas un 4 en ella, siempre te devolverá un “dcbea”.

![Joe and me](/images/uploads/posts/blockchain/blockchain_9.png){:class="img-center"}

Vamos a probar pasando otro número. Por ejemplo 26.

![Joe and me](/images/uploads/posts/blockchain/blockchain_10.png){:class="img-center"}

Ahora nos ha dado un “94c8e”. ¡Interesante! Se ve que el resultado también puede contener números. 
¿Y si te hago la siguiente pregunta?

**¿Puedes decirme que debo meter en la máquina por la izquierda para que la salida sea una palabra que empiece por 3 ceros? Por ejemplo: 000ab, 00098 o 000fa o algo así?**

![Joe and me](/images/uploads/posts/blockchain/blockchain_11.png){:class="img-center"}

Piensa la pregunta un momento.

Te he dicho que la máquina tiene una propiedad por la cual no podemos calcular qué se introdujo por la izquierda sabiendo lo que salió por la derecha. Siendo la máquina así… ¿cómo podemos responder a la pregunta anterior?

Se me ocurre un método. ¿Por qué no vamos probando todos lo números del universo hasta que encontremos uno que empiece por 3 ceros?

![Joe and me](/images/uploads/posts/blockchain/blockchain_12.png){:class="img-center"}

Siendo optimistas, tras algunos miles de intentos, encontraremos alguno cuyo resultado de la máquina empiece por 3 ceros.

![Joe and me](/images/uploads/posts/blockchain/blockchain_13.png){:class="img-center"}


Ha sido extremádamente dificil encontrar la entrada sabiendo la salida. Pero al mismo tiempo, es muy sencillo comprobar que esa entrada produce esa salida. Recuerda que la máquina siempre devuelve lo mismo si le metemos la misma entrada.

¿Cómo de dificil crees que es responder a la siguiente pregunta?

***¿Si meto el número 72533 en la máquina, producirá una salida que empiece por 3 ceros?***

Lo único que necesitas hacer es meter ese número en la máquina y mirar el resultado. Ya está. 
Esta es la propiedad más importante de esta máquina: Dado un resultado, es extremadamente difícil calcular la entrada, pero dada la entrada es extremadamente sencillo comprobar si produce el resultado deseado.

Recordemos esta propiedad de la Máquina Mágica (o función hash) durante el resto del artículo:

>Dado un resultado, es extremadamente difícil calcular la entrada, pero dada la entrada es extremadamente sencillo comprobar si produce el resultado deseado.

### ¿Cómo se usa la máquina para sellar una hoja?
Usaremos la máquina para crear un sello para nuestra hoja. Como siempre, empezaremos con una situación de ejemplo:

Imagina que te doy dos cajas. Una caja contiene el número 20893. Y te pregunto: ¿Puedes adivinar qué numero tengo que sumar a éste de la primera caja para que, tras sumarlos, de como resultado algo que empiece por 3 ceros?

![Joe and me](/images/uploads/posts/blockchain/blockchain_14.png){:class="img-center"}

Es una situación similar a la de antes, y ya hemos visto que la única forma de calcular dicho número es probando cada número en el universo.

Tras varios miles de intentos, nos encontramos con un número, digamos el 21191, que cuando lo sumamos a 20893 (21191 + 20893 = 42084) y lo metemos en la máquina, nos da como resultado algo que entra en nuestro requerimiento: empezar con 3 ceros.

![Joe and me](/images/uploads/posts/blockchain/blockchain_15.png){:class="img-center"}

En este caso, el número 21191 se convierte en el sello para el número 20893. Imagina que hay una hoja de transacciones con el título “20893” escrito en la cabecera. Para sellar esta hoja (para que nadie pueda cambiar su contenido sin que nos demos cuenta), pondremos un sello en la hoja con el número “21191”. 

![Joe and me](/images/uploads/posts/blockchain/blockchain_16.png){:class="img-center"}

<p class="note" markdown="1">
***Jerga** Este número en el sello se llama “Proof of work”, que hace ver que ha habido un trabajo y esfuerzo detrás para calcularlo. Lo seguiremos llamando “sello” por simplicidad.*
</p>

Si alguien quiere saber si se ha modificado el contenido de esta hoja, todo lo que tiene que hacer es sumar el contenido de la hoja al número del sello y meterlo en la máquina mágica. Si la máquina devuelve algo que empieza por 3 ceros, el contenido de la hoja está intacto. Si el resultado no cumple nuestro requisito, podemos tirar la hoja porque significa que alguien los ha modificado, por lo que no nos vale de nada.

Usaremos un método de sellado similar para sellar todas nuestras hojas y en cierto momento para ordenarlas en nuestras carpetas.

### Finalmente, sellando nuestra hoja
Para sellar una hoja de transacciones en la red, debemos calcular un número que al sumarlo al contendo de la hoja nos de como resultado algo que empiece por tres ceros. 

![Joe and me](/images/uploads/posts/blockchain/blockchain_17.png){:class="img-center"}

<p class="note" markdown="1">
***Nota:** Estamos diciendo “algo que empiece con 3 ceros” como ejemplo para mostrar cómo funcina la función hash. En la realidad, la comprobación es bastante más compleja.*
</p>
Una vez hemos calculado el número gastando nuestro tiempo y electricidad en la máquina, sellamos la hoja con ese número. Si alguna vez alguien trata de cambiar el contenido de la hoja, el número del sello nos servirá para comprobar si ha sido alterada o no.


Ahora que sabemos cómo se sella la hoja, volvamos al momento cuando hablabábamos de escribir la décima transacción y quedarnos sin más espacio en la hoja. En cuanto esto ocurre, todos los componentes del grupo se ponen a calcular el número del sello para dicha hoja, de forma que pueda archivarse en la carpeta. Todos hacen cálculos para encontrar el número de sello. En cuanto alguien lo encuentra, se lo comunica a todos los demás.

![Joe and me](/images/uploads/posts/blockchain/blockchain_18.png){:class="img-center"}

En cuanto el resto escucha este número, todos lo meten en la máquina mágica para comprobar que da el resultado esperado. En caso afirmativo, todos ponen el sello en su hoja y lo guardan en sus carpetas.

¿Y si para alguno de los integrantes, por ejemplo el **#7**, resulta que el sello anunciado, al añadirlo a su hoja, no produce el resultado esperado? Estas cosas pasan. Algunos motivos para esta discrepancia pueden ser:

* Ha podido oír mal alguna transacción de las que se anunció
* Ha podido escribir mal alguna transacción de las que se anunció
* Ha podido querer introducir una transacción falsa o modificar alguna, para beneficio propio o de otro

No importa el motivo, pero para **#7** sólo hay una opción: tirar la hoja a la basura y copiar una nueva de alguien de la red, de forma que pueda meterla en su carpeta con su sello. Hasta que no guarde su hoja en la carpeta, no se le deja una hoja nueva para escribir transacciones, de forma que queda fuera de la red.

Sea cual sea el número de sello que la mayoría ha decidido, éste se considera el sello verdadero.

Entonces... ¿porqué iban todos a gastar tiempo y energía en estos complejos cálculos si saben que alguien más lo va a calcular y se lo va a decir? ¿Porqué no quedarse quietecito esperando a que alguien anuncie el número?

Buena pregunta. Aquí es donde entran los incentivos. Cada persona parte de Blockchain es apto para conseguir "premios". El que antes calcule el número del sello para una hoja, recibe dinero por su esfuerzo (en uso de CPU y electricidad).

Imagina que **#5** ha calculado el número de sello de una hoja y se le entrega algo de dinero, digamos que 1€, que sale de la nada. Dicho de otra forma, el saldo en la cuenta de **#5** aumenta 1€ sin que el de ninguna otra persona baje.

 Así nace Bitcoin. Bitcoin fue la primera monenda en ser usada en un Blockchain. Para mantener la red en crecimiento, se usaron estas monedas como premios.

Cuando suficiente gente tiene Bitcoins, éstos aumentan su valor, haciendo que otra gente tambien los quiera; esto hace que el valor de Bitcoin suba aún más; lo que hace que más gente quiera bitcoins. Y así sucesivamente.

**Son los premios los que hace a la gente seguir en la red**

Y cuando cada uno ha guardado su hoja en su carpeta, sacan una nueva hoja y repiten todo el proceso otra vez. Indefinidamente.

<p class="note" markdown="1">
***Jerga** Imagina cada hoja como un bloque de transacciones, y la carpeta que contiene las hojas como una cadena (*chain*) de hojas (bloques, blocks). Esta carpeta es, por tanto, un Blockchain.*
</p>

Y así, amigos mios, es como funciona un Blockchain.

Excepto por un pequeño detalle que aún no he contado, todavía.

Imagina que ya tenemos cinco hojas nuestra carpeta: todas selladas con su número correspondiente. ¿Qué pasa si vamos a la segunda hoja y modificamos una transacción para beneficio propio? El sello permitirá a todo el mundo saber que la hoja ha sido alterada, ¿cierto? ¿Y si además de eso calculo un nuevo número de sello para mi hoja modificada y la sello con el nuevo número?

Para prevenir este problema, existe un truco en cómo se calcula el número de sello.

### Protegiendo los números de sello
¿Recuerdas cómo hablábamos de tener dos cajas: una con el número 20893 y otra vacía para rellenar con nuestro número de sello? En realidad, para calcular este número de sello en Blockchain no hacen falta dos cajas, sino tres: dos llenas y una vacía.

Y es cuando el contenido de esas tres cajas se suma y se mete en la máquina, que el resultado debe satisfacer nuestra condición (antes decíamos empezar con 3 ceros).

Ya sabemos que una caja contiene todas las transacciones y que otra caja deberá contener el número de sello. La tercera caja, lo que contiene, es el resultado de la máquina mágica para la hoja anterior de la cadena.

![Joe and me](/images/uploads/posts/blockchain/blockchain_19.png){:class="img-center"}

Con este pequeño truco nos aseguramos de que cada hoja depende de la hoja anterior. Por tanto, si alguien modifica una página histórica, también tendría que modificar el contenido y sello de todas las hojas que van despues de ella para mantener la cadena consistente.

Si alguno de los diez integrantes de nuestro ejemplo intenta modificar la cadena (la carpeta con las hojas de transacciones), tendría que alterar varias hojas y además calcular un nuevo sello para cada una. Ya sabemos lo dificil que es calcular un número de sello válido, por lo que este miembro desonhesto no puede (ni le merece la pena) intentar estafar a los otros nueve.

Lo que ocurriría es que, desde la hoja que este corrupto modificó, se crearía una nueva cadena en la red, pero esta cadena jamás podría alcanzar la cadena real - la honesta-, básicamente porque el esfuerzo y velocidad de esta persona no puede competir con el de las otras nueve. De esta forma, se garantiza que la cadena más larga de la red es la cadena real.

> La cadena más larga de la red es la cadena real.

![Joe and me](/images/uploads/posts/blockchain/blockchain_20.png){:class="img-center"}


¿Eso de que una sóla persona no pueda batir a los otros nueve... no canta por algún lado?

### ¿Y si en vez de ser sólo uno, son seis los corruptos?

En ese caso, el protocolo habría fracasado. A este caso se le conoce como el *"Ataque del 51%"*. Si la mayoría de la gente en la red decide hacerse corrupta y estafar al resto de la red, el protocolo dejaría de tener sentido y consideraríamos que no vale nada.

Y esa es la única vulnerabilidad porque las Blockchains pueden colapsar, si alguna vez lo hacen. Incluso si es muy improbable que esto ocurra, es bueno conocer cuales son los puntos débiles del sistema. Este sistema está construido bajo la suposición de que la mayoría de la gente es honesta.

Y esto, amigos, es todo lo que hay que saber sobre Blockchains. Si alguna vez te encuentras a alguien perdido preguntándose *"¿Qué diablos es Blockchain?"*, ya sabes dónde lo puedes mandar. Guárdate el enlace.