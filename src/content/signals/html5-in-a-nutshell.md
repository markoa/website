---
title: "HTML5 in a nutshell"
description: "High-level overview of HTML5: structure, forms, fonts, video, canvas, offline, and geolocation"
pubDate: 2011-01-14 12:00Z
type: "article"
published: true
canonicalUrl: "https://renderedtext.com/blog/2011/01/14/html5-in-a-nutshell/"
---

_This post is for our clients and anyone who needs a high-level overview of HTML5, focusing on use cases and examples. As always, we welcome your comments in the discussion section below._

<dfn><abbr title="Hyper Text Markup Language version 5">HTML5</abbr></dfn> is the newest edition of the HTML standard, the markup language that is used to write web pages. While HTML5 does bring some new HTML tags to the table, that's not the whole story as it also includes browser <dfn><abbr title="Application Programming Interface">APIs</abbr></dfn> that allow us to create animated graphics or offline apps. Together with a new version of HTML comes a new version of CSS &mdash; <dfn><abbr title="Cascading Style Sheets version 3">CSS3</abbr></dfn>, which has its own novelties, all the while both are in fact a work in progress and not fully supported in all browsers.

So when usually when you hear about HTML5, it an umbrella term for a collection of features that allow us to create better web apps.

## The structure

Most web pages share a common structure of headers, navigation, main section, sidebar and footer. Articles usually have a timestamp somewhere. All these now have corresponding HTML tags. They will not just make the implementation more meaningful, but provide more meaning to assistive technology and search engines as well.

Search engines support another set of extensions called microdata. Google has a [Rich snippets](http://www.google.com/support/webmasters/bin/answer.py?hl=en&answer=99170) program where they read special markup elements for people, organizations, reviews, products, recipes and events and show them as a nicely formatted search results.

## Smarter forms

Forms are everywhere on the web. Over time, they've come to share a lot of enhancing behaviour. It's nice to have placeholder text that goes away once you start typing in an input field. It's convenient to automatically focus on an input field once a signup form shows up so that users can get started quickly. This form usually needs to validate that the email address entered is in a valid form. We love our mobile devices more when they show specialized keyboard layouts, such as a ".com" button when we're entering a web address, or an "@" button when we're in an email field.

HTML5 defines easy ways to accomplish all that, and more, without any programming.

The great thing about all these features is that we can use them today without breaking anything. If we use a special search input type for example, users with Apple devices will see a special keyboard, Chrome and Safari users will see a little "x" button to clear text, while the browsers that don't support it, they'll just show it as a regular input field.

## The looks

The age-old limitation of having to use a handful of fonts for displaying text on a web page goes away with a new CSS rule that allows you to download a particular font from your server to render a webpage if the user hasn't got that font installed ([source](http://www.font-face.com)).

Embedding video on a web page used to mean that we must use Flash, resulting in cooler fans going wild on laptops across the globe. Same if you wanted a simple music player. That is no longer the case with new HTML elements for video and audio, including the APIs to play and pause a video or audio track and more.

Apple has been the forerunner in this area. Its devices do not include Flash, and the company has decided to strategically support HTML5. They have a nice [showcase](http://www.apple.com/html5/) of its features, including animations that can be accomplished with CSS3, and a list of [big sites that support HTML5 video](http://www.apple.com/ipad/ready-for-ipad/).

This has driven video sharing sites such as YouTube to [implement a HTML5 version of their players](http://www.youtube.com/html5) for browsers that support it. If your site has a tour video done in Flash, it will not be visible to people with an iPad. The easiest way to reach everyone is to upload it on a video sharing site, who will take care of showing the most efficient player to everyone.

A new thing called canvas, with a corresponding new JavaScript API, allows to draw pretty much anything on a web page, each piece of the drawing being fully interactive. A common use case are charts (we like [Highcharts](http://www.highcharts.com/)), which now anyone can quickly develop without paying a 3rd party vendor for expensive authoring tools. There are even full blown [games](http://html5games.com/) made of this stuff.

## Offline and location-aware

A few years ago Google developed a thing called Google Gears which allowed their applications to work offline. Now that HTML5 includes ways to store application cache and offline data, we can all make use of it in a standardized way. This is especially important for mobile apps where we cannot assume the Internet being always available, while users' desire to see their data we can.

Another nice thing is called geolocation API, which lets you share your location with trusted web sites that can then do fancy location-aware things like finding local businesses or showing your location on a map ([source](http://diveintohtml5.org/geolocation.html)).

## Browser support

In an attempt to [sum up](http://html5readiness.com), we can say that most capable browsers nowadays are on new mobile devices (they can be seen as drivers of innovation in fact), IE as always is a disappointment, while computer literate people who use Firefox, Chrome or Safari can benefit from most of these features today.
