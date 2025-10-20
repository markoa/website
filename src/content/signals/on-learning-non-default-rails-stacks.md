---
title: "On learning non-default Rails stacks"
pubDate: 2013-01-15 12:47Z
type: "article"
published: true
canonicalUrl: "https://renderedtext.com/blog/2013/01/15/on-learning-non-default-rails-stacks/"
---

Steve Klabnik has recently posted an argument that [Rails now has de facto two default stacks](https://steveklabnik.com/writing/rails-has-two-default-stacks/): the “37signals” stack and “Prime” stack, and that this as a result:

> puts a pretty heavy burden on a new developer: they have to learn the 37signals Stack and the delta. At the moment when someone is new, and barely knows anything, we throw them into making more choices.

When you declare that there is another “default” stack, not by officially shipping it but in a blog post, there’s going to be some disagreement. For example, our practice at Rendered Text is actually 75% aligned with “Prime”, except for Haml. Any non-default stack is just a one man’s or a company’s current opinion.

I think DHH partly [addressed the concern for newcomers last year](https://www.youtube.com/watch?v=VOFTop3AMZ8) (_won’t somebody please think of the noobs!_). But I’ll try to explain from another angle why I think that newcomers are fine, as long as they learn wisely.

As a beginner, simply don’t pay attention to those who “tell [you] to do a bunch of configuration”. You should have one teacher and not question him or her too much.

If you’re learning on your own, the plan is simple:

find out who created a language or framework you’re interested in
find out if (s)he has (co)written a book about it; if yes:
read it and practice
Darko and I created Plakatt using the default Rails stack that the Rails book has taught us. The core of the application was unchanged for a long time and was serving thousands of users for almost four years, until we took some time last year to upgrade it to all the latest bits.

It can be tempting to first investigate all tools people are talking about on Twitter or blogs, but that just steers you off course with a false sense of progress. Once you’ve mastered the basics and defaults, preparing your own omakase will come naturally.

If you’re entering a company with a plan to work with Rails, you have even less reason to listen to the chatter on the internets in the beginning. Your new colleagues have probably been working with Rails daily for some time, and will introduce you to a solid set of introductory material, tools and practices.
