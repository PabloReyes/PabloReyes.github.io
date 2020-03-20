---
layout: post
title: "Canción de Código y Furia: Programadores y Negatividad"
published: true
date: 2019-04-22
css_id: programadores-negatividad
markdown: markdown
category: Personal
featured: true
image: /images/uploads/posts/programadores-negatividad/angry-face.jpg
excerpt: Crítica al programador negativo, con aires de superioridad y que no conoce el verdadero propósito de su trabajo.
cta: Yo no hago esas cosas
---

Estoy mirando un trozo de código. Es, sin duda, uno de los peores códigos que he visto en mi vida. Para actualizar un único registro en una base de datos, recupera todos los registros de la tabla y envía un UPDATE para cada uno de ellos, no sólo para el registro que necesita ser actualizado. 

Hay una función map que no hace nada más que devolver el mismo valor que recibe. Hay comprobaciones sobre valores aparentemente iguales pero con distinta convención de nombres (firstName y first_name). 

Por cada actualización (en cada registro, incluso en los que no han cambiado) se envía un mensaje a una cola que llama a otra función que hace todo el trabajo de nuevo para otra tabla en la misma base de datos.

---
_**Nota**: Este artículo es una traducción personal al castellano del original "Rage Against the Codebase: Programmers and Negativity", publicado por [Way Spurr-Chen](https://medium.com/@way/rage-against-the-codebase-programmers-and-negativity-d7d6b968e5f3) y bajo su aprobación._

---

¿Quién osaría hacer algo así? Me tapo los ojos y me río a carcajadas para que me escuchen todos. Mis compañeros de trabajo me preguntan qué pasa y les cuento las Mayores Cagadas de BulkDataImporter.js 2018, cortesía de Francisco Gutiérrez*. Todo el mundo asiente con la cabeza y estamos de acuerdo: ¿Por qué nos hacen esto?

![via ProgrammerHumor](/images/uploads/posts/programadores-negatividad/friend-app.jpg){:class="img-center"}


## Negatividad: la herramienta emocional de la cultura de programación
La negatividad es tan importante para los programadores porque es una forma muy efectiva de comunicar valor. Cuando daba clases en un bootcamp de programación, era una práctica estándar inculcar a los estudiantes en la cultura de la industria con una saludable dosis de memes, historias y videos, de los cuales muchos giran en torno a la [frustración de los programadores con personas que simplemente no entienden](https://www.youtube.com/watch?v=BKorP55Aqvg). Es bueno poder usar herramientas emotivas para señalar las prácticas y hábitos que son Buenos, los que son Malos y los que son Oh Dios, Ni Se Te Ocurra. También es bueno preparar a los nuevos programadores para el hecho de que probablemente serán malinterpretados de una manera u otra por colegas no técnicos, que deberían prepararse para que todos sus amigos les cuenten sus ideas de aplicaciones del que serán super exitosas, que deberían prepararse para los interminables laberintos de código legacy llenos de sorpresas.

Cuando estamos aprendiendo a programar, nuestro visión de lo que es “entender la programación” se basa en la observación de las reacciones emocionales de otras personas cuando ocurre algo. Esto se ve muy claro en [ProgrammerHumor](https://www.reddit.com/r/programmerhumor), un subreddit lleno de programadores junior donde muchos expresan humor con varios matices de negatividad: frustración, pesimismo, indignación, desilusión, condescendencia, y más.

![via ProgrammerHumor](/images/uploads/posts/programadores-negatividad/ide-colour-makeup.jpg){:class="img-center"}

Noto que los programadores a menudo siguen una curva ascendente de negatividad a medida que adquieren experiencia. Frescos y nuevos, sin saber las dificultades que les esperan, empiezan con entusiasmo y con la voluntad de creer que la razón por la que las cosas son difíciles es porque no tienen experiencia y no saben nada, y finalmente lo entenderán todo.

A medida que pasa el tiempo y aprenden más, adquieren la habilidad de diferenciar entre el código que es Bueno y el código que es Malo. Una vez que esto sucede, experimentan directamente la frustración de trabajar con código malo que saben que es malo, y si trabajan en una comunidad (ya sea en línea o en equipo), frecuentemente adoptan los hábitos emocionales de los programadores más antiguos. Con frecuencia, esto resulta en un aumento de la negatividad, ya que ahora son capaces de hablar inteligentemente sobre el código y separar lo bueno de lo malo de una manera que demuestra que "lo entienden". Para la mayoría, ser más negativo funciona: es fácil vincularse con los compañeros de trabajo por encima de las frustraciones y formar parte del grupo, aumenta tu estatus a costa de machacar el código Malo, y puede ayudarte a ser percibido como un mejor programador: [las personas que expresan opiniones negativamente a menudo son vistas como más inteligentes y más competentes](https://www.wired.com/2014/11/be-mean-online/).

Este aumento en la negatividad no es necesariamente algo malo. El discurso sobre la programación está, sobre todo, extremadamente centrado en la calidad del código. El código realmente representa todo sobre la función para la que se ha escrito (a parte del hardware, redes, etc.), por lo que es importante poder expresar una opinión sobre este. Casi toda discusión sobre código se reduce a opinar sobre si es suficientemente bueno o no, y el juicio de un código malo se manifiesta en una declaración cuya carga emotiva implica la calidad (o falta de ella) del código:

* "Ese módulo tiene muchas inconsistencias lógicas y es un buen candidato para que trabajemos en mejorar su performance".
* "Ese módulo es bastante malo, deberíamos refactorizarlo"
* "Ese módulo no tiene sentido, tenemos que reescribirlo de 0"
* "Ese módulo es una basura, hay que arreglarlo"
* "Ese módulo es una mierda y nunca debería haber sido escrito, ¿qué coño estaba pensando Fran?"

(Por cierto, esta "carga emotiva" es lo que lleva a los desarrolladores a llamar al código "sexy", aunque no trabajen en PornHub.)

El problema, por supuesto, es que los seres humanos son sacos de emociones, pequeños y ondulados, llenos de agua, y tanto el recibir como el expresar cualquier emoción nos cambia como persona: microscópicamente al principio, y a largo plazo, fundamentalmente.

## La pendiente resbaladiza y ondulante de la negatividad
Hace unos años yo era, de manera informal, el tech-lead de mi equipo, y me encontraba entrevistando a un candidato para un puesto de desarrollador. Nos gustaba mucho; era espabilado, hacía buenas preguntas, tenía las habilidades técnicas, y encajaba en nuestra cultura empresarial. Me gustó particularmente porque era positivo y parecía de esas personas que “le meten mano a todo”. Así que lo contratamos.

En ese momento llevaba en mi compañía durante un par de años y había percibido una falta de compromiso con la cultura de la compañía. Antes de que yo llegara, habían intentado lanzar un producto dos, tres y un par de veces más sin éxito, lo que llevó a costosos refactorings sin nada que mostrar, pero con noches muy largas, plazos cambiantes y productos que “casi funcionaban”. Aunque yo seguía trabajando duro cada día, opinaba abiertamente con escepticismo sobre la última fecha límite transmitida por el equipo de management. En ocasiones, se me iba la boca hablando de las cosas que encontraba en el código.

No debería haberme sorprendido que unas semanas después, el nuevo desarrollador que habíamos contratado hablaba igual de negativamente y de la misma forma que yo lo hacía (incluyendo los insultos). Tenía la sensación esta persona no actuaría así por su cuenta, o si estuviera en una empresa con una cultura distinta. Más bien, estaba adoptando la cultura que yo había establecido para encajar. Sentí una punzada de culpa. Debido a mi propia experiencia subjetiva, me las apañé para establecer un tono pesimista con un nuevo compañero que era extremadamente positivo. Él, sin ser así, se expresaba de esa manera en un intento de demostrar que podía encajar con sus compañeros: yo le había impuesto mi actitud de mierda. Y cuando las cosas se repiten mucho, aunque sean mentira, tienen el mal hábito de convencer.
![We all hate this](/images/uploads/posts/programadores-negatividad/i-hate-this-too.png)

## Los caminos de la negatividad
Una historia feliz para nuestro desarrollador (ahora no tan junior) de antes, que ha adquirido un poco de sabiduría y un poco de experiencia, dice así: al final, acaban entendiendo que el código Malo está en todos sitios, hasta en las mejores familias, y que es ineludible. El código Malo existe incluso en las empresas más vanguardistas y centradas en la calidad. Y si piensas que las tecnologías más modernas te ayudarán a escribir mejor código… quizás te equivocas. 

Con la experiencia, los desarrolladores empiezan a aceptar que el código Malo es simplemente una realidad del software, y es su trabajo hacerlo mejor. **Puesto que no se puede huir del código Malo, no tiene mucho sentido volverse loco por ello. Siguen el camino del Zen, se centran en cómo resolver el problema o la tarea que se les presenta, aprenden a medir con precisión y transmitir la calidad del software a las partes interesadas de la empresa, crean buenas estimaciones descritas a partir de sus muchos años de experiencia y acaban siendo recompensados generosamente por su increíble y constante valor para la empresa.** Hacen un trabajo tan bueno que se les concede un bono de 10 millones de dólares y se retiran para hacer lo que quieran por el resto de su vida. (Más o menos)

![Caminos de la negatividad](/images/uploads/posts/programadores-negatividad/caminos-negatividad.png){:class="img-center"}

El otro lado es el camino de la oscuridad. En vez de aceptar que el código Malo es inevitable, se toman la libertad de proclamar todo lo que está mal en el mundo del código  y se creen héroes. Se niegan a aceptar que el código Malo es una realidad por muchas razones: la gente debería ser mejor y menos estúpida; es ofensivo; es malo para el negocio; esto es una prueba de lo inteligente que soy; si no digo bien alto la mierda que es este código, toda esta compañía se va a pique; etc.

Probablemente en una posición en la que no pueden hacer los cambios que desean porque el negocio desafortunadamente debe continuar y no tiene tiempo para preocuparse por la calidad del código, se les conoce como quejicas. Debido a que son altamente competentes siguen entre nosotros, pero relegados a un rincón de la empresa donde no molestan a demasiada gente, sino que mantienen los sistemas críticos en funcionamiento. Aislados del acceso a nuevas oportunidades de desarrollo, sus habilidades se atrofian y pierden relevancia en la industria. Su negatividad sigue creciendo y se convierte en una amargura hasta que eventualmente se encuentran a sí mismos discutiendo con estudiantes de programación de 20 años sobre la forma en que se hacían las cosas antes de que ellos nacieran era mejor que la de ahora. Al final, se jubilan y pasan su vejez gritándole a los pájaros.

La realidad probablemente se encuentra en algún lugar entre estos dos extremos.

Hay compañías que consiguen ser exitosas incluso con culturas extremadamente negativas, territoriales y contundentes, como Microsoft antes de su [década perdida](https://www.vanityfair.com/news/business/2012/08/microsoft-lost-mojo-steve-ballmer) —  normalmente son aquellas que ya cuentan con un producto existente y con gran penetración en el mercado y que necesitan escalar lo más rápido posible, o aquellas con estructuras de mando y control (Apple durante el apogeo de Steve Jobs) en las que todo el mundo hace lo que una persona dice, por lo que no importa mucho cómo lo diga. Sin embargo, los últimos  estudios sobre negocio (y el sentido común también) muestran una y otra vez que la creatividad máxima que lleva a la innovación a gran escala y el alto rendimiento a pequeña escala requieren niveles bajos de estrés que permitan el pensamiento creativo y el pensamiento metódico. Es extremadamente difícil realizar un trabajo creativo cuando te preocupa lo que tu colega pueda decir sobre cada línea de código que escribas.

## Negatividad en la cultura "pop" del software
Hoy en día, las actitudes de los desarrolladores de software están recibiendo más atención que nunca. La idea de una "[No Asshole Rule](https://www.amazon.com/Asshole-Rule-Civilized-Workplace-Surviving/dp/1600245854)" es cada vez más común en las compañías de software. Más y más anécdotas aparecen en Twitter con relatos de personas que abandonan el software por completo porque simplemente no pueden (no quieren) soportar la hostilidad y las actitudes territoriales. Incluso Linus Torvalds recientemente se disculpó por sus años de hostilidad e insultos a otros desarrolladores de Linux.

> _Our world of code will become increasingly exposed to the interpersonal styles of people who did not grow up in the isolated nerd culture of the early tech boom, and eventually they will become the new world of code._

Algunos todavía defienden el derecho de Linus a ser excesivamente crítico. Es cierto que la corrección es increíblemente importante (fundamental, incluso), pero cuando indagas en las razones de muchas personas para permitir que la expresión de una opinión negativa caiga en la toxicidad, empiezan a sonar paternalistas: se lo merecen por ser estúpidos; necesita asegurarse de que no lo vuelvan a hacer; si no lo hicieran, no tendría que gritarles, etc. (Para otro ejemplo de cuánto impacto puede tener la parte emocional de un lider en una comunidad de programadores, podemos ver el MINASWAN de la comunidad Ruby - "Matz [the creator of Ruby] is nice so we are nice”).

He descubierto que los promotores más ardientes de una mentalidad de "matar al tonto" son a menudo aquellos que se preocupan profundamente por la calidad y la corrección del código. Desafortunadamente, a menudo confunden firmeza con dureza. El lado más oscuro de esta actitud proviene del deseo completamente humano pero improductivo de sentirse superior a los demás. Las personas que se decantan por este deseo son las que tienden a permanecer atrapadas en el camino de la oscuridad.

![All amateurs](/images/uploads/posts/programadores-negatividad/all-amateurs.png){:class="img-center"}

El mundo del software se está expandiendo rápidamente para encontrarse con los bordes de su contenedor, el mundo del no-software.

A medida que nuestra industria crece a un ritmo cada vez más rápido y la programación se hace cada vez más accesible, la distancia entre "techie" y "normie" se reduce rápidamente. Nuestro mundo del software estará cada vez más expuesto a los estilos interpersonales de las personas que no crecieron en la aislada cultura de los nerds de los primeros tiempos del boom tecnológico, y eventualmente se convertirán en el nuevo mundo del software. Y al margen de cualquier argumento social o generacional, la eficiencia en nombre del capitalismo se manifestará en la cultura de la empresa y en las prácticas de contratación: los mejores negocios simplemente no contratarán a aquellos que no pueden jugar neutralmente con otros, y mucho menos jugar limpio.

## Lo que he aprendido sobre la negatividad
Dejar que la negatividad excesiva domine la forma de pensar y comunicación y que se extienda a la toxicidad es peligroso para los equipos productivos y costoso para las empresas. He vivido muchos proyectos de software (y oído hablar) que han sido tirados a la basura y completamente reconstruidos a un gran costo porque un desarrollador de software de confianza estaba empeñado en trabajar con una nueva tecnología, o un solo archivo que se ha usado como representativo de la calidad de toda la base de código. Es algo que desmoraliza y tensa las relaciones. Nunca olvidaré un incidente en el que un compañero de trabajo me regañó por poner CSS en el archivo equivocado, lo que me molestó y distrajo mis pensamientos durante días. Además, es poco probable que deje que esa persona se acerque a uno de mis equipos en el futuro. 

Hasta es [malo para la salud](https://medium.com/the-mission/how-complaining-rewires-your-brain-for-negativity-96c67406a2a).

![Workshop sonrisas](/images/uploads/posts/programadores-negatividad/workshop-sonrisas.jpg){:class="img-center"}

Con esto no pretendo decir que debamos vivir en un mundo de arco iris, con pull-requests llenas de emojis, o workshops para sonreir. La negatividad juega un papel extremadamente importante en la programación (y en la vida humana) como una forma de señalar la calidad, de expresar nuestros sentimientos y de compadecerse de nuestros semejantes. Es una señal de discernimiento y sensatez o de la gravedad de un problema. Normalmente puedo decir que un desarrollador ha alcanzado un nuevo nivel cuando comienza a expresar incredulidad donde antes habían sido tímidos e inseguros. Están demostrando su confianza en sus propias opiniones. No podemos prohibir la opiniones negativas - eso sería Orwelliano.

Sin embargo, estos comentarios muchas veces tóxicos deben ser dosificado con otras cualidades humanas esenciales: compasión, paciencia y humor. Y cuando sea necesario, siempre puedes decirle a alguien cuando la ha cagado sin los gritos y maldiciones.

En esa compañía de hace unos años, un día el CEO me agarró para charlar. Charlamos un rato y discutimos el estado actual del proyecto, luego me preguntó cómo pensaba que me iba. Le dije que creía que lo estaba haciendo bastante bien, que estábamos progresando en el proyecto, que nos estábamos conectando, que probablemente había algunas cosas que me faltaban y que necesitaba renovar mi enfoque. Me dijo que me había oído compartir algunos de mis pensamientos más pesimistas en la oficina, y que otras personas también lo habían notado. Explicó que si tengo preocupaciones, puedo llevarlas a la gerencia tanto como quiera, pero que tenga cuidado de no transmitirlas hacia abajo. Como ingeniero líder y responsable de la compañía, tenía que ser consciente del impacto que mis palabras tienen en los demás, porque ejerzo mucha influencia, me dé cuenta o no. Dijo todo esto muy amablemente, y terminó diciendo que si me siento así, probablemente debería pensar en lo que quiero para mí y mi carrera. Fue una forma extremadamente educada de decirme "o encajas, o puedes buscar otra cosa ". Le agradecí que me lo hiciera saber y reconocí que mi actitud había decaído en los últimos seis meses sin que me diera cuenta de cómo podría estar afectando a otros.

> _En última instancia, estoy aquí para realizar una tarea, y no tengo que quejarme del código para entenderlo, estimarlo o arreglarlo._

Fue un ejemplo de gestión excelente y eficaz y del poder de un toque con delicadeza. Me di cuenta de que si bien había pensado que creía plenamente en la empresa y en su capacidad para lograr sus objetivos, en realidad estaba diciendo y comunicando a los demás algo muy diferente. También me di cuenta de que sólo porque me sentía escéptico sobre el proyecto en el que estaba trabajando, no significaba que tenía que expresar ese sentimiento a mis compañeros de trabajo y propagar mi pesimismo como un virus, lo que hacía que fuera aún menos probable que tuviéramos éxito. En cambio, podía comunicar agresivamente la realidad a mis gerentes. Y si al final sentía que no estaban escuchando, podía expresar mi desacuerdo cogiendo la puerta

Al final, me encontré con una nueva oportunidad, en la que me trabajaba con Recursos Humanos para evaluar la performance de los ingenieros. Como responsable formal del departamento, soy cada vez más cuidadoso en controlar cómo expreso mis opiniones sobre nuestro código heredado y que siempre estamos mejorando. Para promulgar el cambio, hay que reconocer la realidad de la situación actual, pero no se llega a ninguna parte si nos quedamos atascados en el lamento, el desdén o cualquier otra situación. En última instancia, estoy aquí para realizar una tarea, y no tengo que quejarme del código para entenderlo, estimarlo o arreglarlo.

De hecho, cuanto más evitaba mi reacción emocional al código, más clara era mi visión de lo que podía llegar a ser, y menos confusión interior experimentaba. Cuando practicaba la subestimación ("quizás hay algo que podemos mejorar aquí"), me divertía a mí mismo y a los demás y tomaba la situación de manera menos personal. También me di cuenta de que podía eliminar la negatividad de los demás siendo perfectamente sensible en las opiniones ("tienes razón, ese código es bastante malo, pero lo mejoraremos"). Es chulísimo ver lo lejos que puedo llegar en el camino del zen.

En definitiva, estoy continuamente aprendiendo y volviendo a aprender una lección más profunda: **la vida es demasiado corta para pasarla cabreado**.

--- 
\* Francisco Gutiérrez no es una persona real. Si resulta que eres tú, estoy seguro de que eres un magnífico programador, o al menos lo intentas. Y sino, no pasa nada. Vive tu vida. 