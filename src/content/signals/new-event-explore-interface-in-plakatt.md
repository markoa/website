---
title: "New event explore interface in Plakatt"
description: "Video and notes on the new event explore page with filters, Ajax, and jquery-history"
pubDate: 2010-02-03 12:00Z
type: "article"
published: true
canonicalUrl: "https://renderedtext.com/blog/2010/02/03/new-event-explore-interface-in-plakatt/"
---

This video shows the new [event explore page on Plakatt](http://plakatt.com/events/) that we've been working on recently.

<iframe src="//player.vimeo.com/video/8992682" width="900" height="653" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

It's probably hard to understand before we make it available in English and you do not speak Serbian, however to sum up, in that big input box you can type in a city, event category or a time defining term such as 'today' or 'tomorrow'. We call these _filters_. Filters can be combined to form queries that match your interest (except for the those that define a time, which are exclusive). Registered users can save them for later as shortcuts in the dashboard sidebar, handy when you want to quickly check which gigs will be happenning today and which art exhibitions are planned in current month, for example.

As you see the page is making Ajax calls only. However each change to the current filter set updates the URL which can also be accessed directly, and your browser's Back button still works as it should. We make heavy use of `jquery-history` to achieve that.

We store each explore query, so that when when you return back to the explore page your last state is restored (guests are tracked by session). This is where we use [Tokyo Cabinet](http://1978th.net/tokyocabinet/) (over Tokyo Tyrant in fact), since it is hundreds of times faster than MySQL in write operations. In some of our future posts we'll highlight how exactly we set up and use our Tyrant instances.
