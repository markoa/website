---
title: "Making a Full-Content RSS Feed in Astro"
description: "A note on creating an RSS feed for your Astro site that includes valid image URLs"
pubDate: 2025-02-17 18:07Z
type: "article"
published: true
---

I spent more time than I'd like to admit implementing the RSS feed for this blog. [Creating a pure text RSS feed](https://docs.astro.build/en/recipes/rss/) with [Astro](https://astro.build/), my favorite website framework, for a Markdown content collection is straightforward. However, creating a feed that includes arbitrary MDX and renders URLs of build-time optimized images proved challenging. Having a full-content feed is free internet 101, so I couldn't let it go. After opening an issue on GitHub and talking to some kind people on Astro Discord, [I figured it out](https://github.com/withastro/docs/issues/10946#issuecomment-2663716595).

This was also a textbook example of a junior-level challenge that you can't just brute force your way through with AI prompting. The solution is non-linear: it starts from the out-of-the-box idea that instead of messing around with pre-processing, you need to headlessly render posts before further adjustments, which is exactly what the experimental Astro Container API is for.
