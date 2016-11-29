---
layout: post
title: Being a good guy, but also stealing personal info
published: true
date: 2012-10-05
markdown: markdown
---

As I told you the other day, some years ago [I did some bad things related to personal info]({% post_url 2012-09-17-hands-dirty %}), passwords and mails. Well, I didn’t do anything wrong with that info, just obtaining it. The feeling after getting all that private, secure, illegal data gave me so much adrenaline I couldn’t stop laughing. I never told anyone about what I did, since I was really scared of what I had done and all the sensible information I had.

One or two years later, in 2006, I was restyling my personal blog when I found something curious. There was a public directory /wp-content/backups that had two backups of my blog database! How could that be possible? I was using the famous [wp-db-backup](http://wordpress.org/extend/plugins/wp-db-backup/), like many people back then. The plugin required you to give read-write permission to the wp-content/backup directory, only while making the backup. Then, you should restore its defaults permissions. I totally forgot the restore the permission after doing the backups, and I suppoused I wasn’t the only one.

I started a search for other famous blogs using wordpress, trying to get into their wp-content/backups directory. In 5 minutes I had found a couple of well known blogs with the same problem. I could have just mailed him telling them the problem, but I wanted to know if I was able to enter in their control panel. Yeah, bad thing again, I know…

I downloaded their databases backups and looked for the wp_users table, obviously. Most of the times, there was only one or two users, and one of them was admin. The passwords were encrypted in MD5, so I used the same technic as the last time. When it didn’t work, I gave [John The Ripper](http://www.openwall.com/john/) a try. I got into a couple of admin panels and made screenshots of it, nothing else.

Then, instead of notifying the admins of each blog, I thought I could get some more vulnerable sites… I found a list of wordpress blogs and made the following script:

{% highlight python %}
import httplib, re, urlparse
 
def get_page(url):
  url = urlparse.urlparse(url)
  conn = httplib.HTTPConnection(url[1])
  conn.request("GET", url[2])
  response = conn.getresponse()
  assert response.status == 200
  return response.read()
 
def main():
  vulnerable =[]
  url_list = [
      "http://vulnerableblog1.com/",
      "http://vulnerableblog2.com/",
      "http://vulnerableblog3.com/",
      "http://vulnerableblog4.com/",
      ...]
 
  for url in url_list:
    print "Checking %s" % url
    try:
      get_page(url+"wp-content/backup/")
      vulnerable.append(url+"wp-content/backup")
 
    except: continue
 
  print "\nVulnerable sites:\n"
  for i in vulnerable:
    print i
 
if __name__ == "__main__":
  main()
{% endhighlight %}


Again, a shitty script that made the job. I got a list of hundreds of vulnerable sites, from which I could get their databases and enter in their admin panel.

I thought that was more than enough, and I started mailing all the admins of vulnerable sites explaining what I have done, how, why, and how to solve it. I also sent screenshots of their admin panels (not everyone). I also asked each one if it was ok for them to me mentioned in a blog post I was going to write.

After receiving many thanks from all the site admins I wrote the [most viewed post of my old blog](http://web.archive.org/web/20070508212447/http://tronfi.com/2006/05/12/seguridad-en-blogs-o-como-consegui-entrar-en-paneles-de-administracion/). This post was shared in some of the most important sites of the spanish web ([Microsiervos](http://www.microsiervos.com/archivo/seguridad/seguridad-wordpress-wpdbbackup.html), [CPI](http://curiosoperoinutil.com/2006/05/13/agujero-de-seguridad-en-blogs-de-wordpress/), [Meneame](http://www.meneame.net/story/seguridad-en-blogs-o-como-consegui-entrar-en-paneles-de-administracion/best-comments), [htmllife](http://www.htmllife.com/archivos/un-despiste/), [La maté por un yogur](http://web.archive.org/web/20070514233249/http://www.lamateporunyogur.net/archivos/2006/05/12/cuidado-con-los-backups-de-wordpress/), anieto2k, Clarin newspaper, etc). I received many acknowledgements via mails, comments, blog posts, etc. I felt important again, but this time, people knew what I had done, and they thanked me for that. I felt that thing again, [just like the year before](http://blog.pabloreyes.es/blog/hands-dirty/). And now I could tell the people about that.

Programming is great in many senses. It opens your mind, it requires you to think in ways you never thought, it makes your boring time entertaining, but the most important thing is it gives you satisfaction. The satisfaction of a thing well done (or al least done). It doesn’t matter if it’s going to be relevant to someone else, but it may be for you.
