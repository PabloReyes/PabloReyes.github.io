---
layout: post
title: Seguridad en blogs, o cómo conseguí entrar en paneles de administración
published: true
date: 2006-05-12
markdown: markdown
category: Personal
cta: Venga, cuéntame
image: /images/uploads/cover-john-ripper.png
excerpt: "Una exploración sobre la seguridad en blogs y cómo conseguí acceso a varios paneles de administración."
---

La gente no se da cuenta de que la seguridad es un punto importante a la hora de navegar en Internet.

Voy a contar cómo conseguí las bases de datos de blogs como el de Cinefilo, Dustyhawk, htmllife, Cogiendo Caracoles y
Laptoblog. Menos mal que paré, podía haber conseguido muuuuchas más.

Como la mayoría de los bloggers, yo uso un plugin para hacer copias de seguridad de mi base de datos. En mi caso,
wp-db-backup. Como suponía que no era el único que lo usaba, me fijé en cómo y donde guarda las bases de datos si
seleccionas guardarlas en el ftp.

Para empezar, /wp-content/ debe tener permisos de lectura y escritura, y dentro de él se ubica backup/, donde irán
nuestras bases de datos guardadas. Si el usuario no se da cuenta, y no cambia los permisos una vez hecha la copia (
crasso error), deja su base de datos a la ‘vista’ de todo el mundo.

Bien, pues no me hizo falta más que mirar en mi blogroll y en algunos más para tener una buena lista de blogs que usan
Wordpress. A partir de aquí, solo es probar con cada blog: direcciondelblog/wp-content/backup/, y sino encontramos
nada (puede que no tenga el plugin, o que esté en otro directorio, o que lo tenga protegido) pues probamos con
direcciondelblog/backup/ por si a alguien le se ocurre tenerlo ‘más cerca’ a la hora de buscarlo. De esta forma he
conseguido en dos días unas… 6 bases de datos, y repito: no he rebuscado mucho. Estas bases de datos lo guardan todo,
desde posts hasta usuarios. Estos últimos se guardan en la tabla wp_users con la estructura:

```sql
INSERT INTO `wp_users` VALUES (ID, 'USER', 'PASS_MD5', 'etc...')
```

Como vemos, si hemos conseguido la base de datos ya tenemos el usuario y la contraseña para entrar en el blog.

¿El problema? -La contraseña está encriptada en MD5.

¿La solución? -La fuerza bruta.

Esto es bastante jodido, ya que dependiendo de la longitud de la contraseña, podemos tardar horas, días, semanas… años.
En forma práctica:

> (28 mayusculas)+(28 minisculas)+(10 numeros)+(20 signos) = 86 caracteres.

Sino recuerdo mal, la longitud máxima para una contraseña de administración de wordpress son 16 caracteres. Si habeis
leído el artículo de la wikipedia sobre MD5 sabréis que hay, por tanto, 86^15 combinaciones posibles. Unas pocas.

Sin embargo, la gente no suele poner contraseñas difíciles, prefieren las fáciles que se recuerdan mejor. Así que
durante un par de días con el John The Ripper podremos sacar unas cuantas. (Si lo vas a usar alguna vez, recomiendo
poner los ventiladores a tope :D)

Yo empecé con el primero del que obtuve la base de datos, Cinefilo. Realmente, ahora que me acuerdo, este fue el que me
llevó a ponerme a buscar en los demás blogs el ‘despiste’, ya que vi un mensaje en el pie de página de su blog que
decía:

`Fatal error: Allowed memory size of 8388608 bytes exhausted (tried to allocate 939257 bytes) in
/home/cinefilo/public_html/blog/wp-content/plugins/wp-db-backup.php on line 639
`

Y dije: Anda mira, este usa el mismo plugin que yo… vamos a ver si…Y catapúm, allí estaba la base de datos.

Lo que más me costó fue el MD5. Afortunadamente (para mí) conseguí dar con una herramienta en internet (no, no la voy a
poner aquí) que tenía una base de datos con unos cuantos MD5 ya resueltos, y voilá: la contraseña del usuario
administrador es… Y a partir de aquí, os lo podeis imaginar. (No, no le borré nada, sólo miré).

Bien, pues como este, he encontrado a otros que, afortunadamente para ellos, no tienen usuarios muy importantes en sus
bases de datos (entiéndase tarjetas de crédito, cuentas, etc) y que solo muestran posts y algunas direcciones de e-mail.
Como véis, no es muy dificil.

Consejo: Guardad vuestras bases de datos en el servidor, pero nunca en la carpeta wp-content ni en ninguna visible desde
el navegador (si ya has dado con mi blog buscando bases de datos, deja de buscarla porque no está ahí).

No me hago responsable del uso de esta información para fines ilegales.
