---
title: "Rendering Textpattern"
description: "Deploying a Textpattern CMS site as an Apache virtual host"
pubDate: 2010-03-15 12:00Z
type: "article"
published: true
canonicalUrl: "https://renderedtext.com/blog/2010/03/15/rendering-textpattern/"
---

Recently we needed to deploy a site made with [Textpattern CMS](http://textpattern.com) by our friends from [Sprawsm](http://sprawsm.com), along with a forum app that we built with Rails. The scenario is that a designer develops a web site locally in his Coda or similar environment, and hands it to you archived with a filled config.php a database that is ready to be imported on the server. We wanted to set the site up as a [virtual host](http://httpd.apache.org/docs/2.2/vhosts/).

It wasn't that quick and easy, as deploying a Textpattern site is basically [a nonexistent term](http://www.google.com/search?q=deploy+text+pattern). Instead, it is usually just uploaded via FTP to a shared host. Searching for a sample VirtualHost configuration led me to the [Textpattern Multi-Site Howto](http://textpattern.googlecode.com/svn/development/4.x/sites/README.txt), which is quite noisy and suggests that you point your DocumentRoot to a subdirectory in `sites/`. It includes pieces such as _[Textpattern will tell you to place your config.php file in /textpattern/. This is INCORRECT.[_ and _[it will present a link to the [main interface.[ This link will be INCORRECT, so do not click it[_. Ignore that guide. In fact, remove the `sites` directory, unless you do have multiple Textpattern sites and you're absolutely sure that you want to save a couple of kilobytes of PHP source code at the cost of getting lost in configuration.

This is what works for us:

```bash
/var/tpapp$ rm -rf sites
```

```apache
<VirtualHost *:80>
	ServerName tpapp.com
	ServerAlias www.tpapp.com
	DocumentRoot /var/tpapp
	<Directory /var/tpapp>
		Options +FollowSymLinks
	</Directory>
</VirtualHost>
```

Then in `/var/tpapp/textpattern/config.php`:

```php
<?php
$txpcfg['db'] = 'tpapp_db_name';
$txpcfg['user'] = 'root';
$txpcfg['pass'] = 'rootpassword';
$txpcfg['host'] = 'localhost';
$txpcfg['table_prefix'] = '';
$txpcfg['txpath'] = '/var/tpapp/textpattern';
$txpcfg['dbcharset'] = 'utf8';
define('txpath', $txpcfg['txpath']);
?>
```

By the way, on Ubuntu the easiest way to get all the dependencies quickly is to install the Textpattern package, and then manually create the target database:

```bash
apt-get install textpattern
```

Textpattern has a screen to diagnose possible issues which you can access at `/textpattern/index.php?event=diag`. For example, you might've forgotten to enable mod_rewrite (via `sudo a2enmod`) on a fresh server image, or fix some simple permission errors.
