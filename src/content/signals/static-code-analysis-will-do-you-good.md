---
title: "Static code analysis will do you good"
description: "Following reek's warnings to zero led to better design and hidden bugs"
pubDate: 2012-04-23 12:00Z
type: "article"
published: true
canonicalUrl: "https://renderedtext.com/blog/2012/04/23/static-code-analysis-will-do-you-good/"
---

My interest in static code analysis has been renewed after I came across John Carmack's [blog post](http://www.altdevblogaday.com/2011/12/24/static-code-analysis/):

> The most important thing I have done as a programmer in recent years is to aggressively pursue static code analysis.

For Ruby, I found [reek](https://github.com/kevinrutherford/reek). I ran it against the source code of the project I've been working on. Complains about long methods, referring to a variable more than self. Does it really matter if a method has six statements, I thought?

I decided to blindly follow the warnings and reduce them to zero. During the process, I found that thinking harder about refactoring makes me discover nasty bugs that I was not aware of. Working out seemingly "small" and "annoying" warnings leads to improved code design: even more lightweight objects, with easy to follow communication and very short methods.

If you're following the BDD practice, chances are big that your code is pretty good. But it can be made even better, and to have a program issue cold warnings when you get carried away in your little algorithms is critical in that next step.

How do you maintain that good practice? It needs to part of your workflow, so [make your specs fail whenever there's a smell](https://github.com/kevinrutherford/reek/wiki/Reek-Driven-Development). That's now one new step after you satisfy your acceptance and unit tests.

I did this while the project was relatively new (about 2 months in) and of course it's a different story if the project has been going on for years. In that case I suppose you could do it on a file-by-file basis, as your work brings you to them.
