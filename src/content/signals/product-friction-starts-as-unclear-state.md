---
title: "Product Friction Starts As Unclear State"
pubDate: 2026-03-27 12:37Z
type: "article"
published: true
linkedinPostId: "markoa_product-friction-starts-as-unclear-state-activity-7443277477554081792-YXiC"
xPostId: "2037512870284464195"
---

Looking through this week’s issues at
[SuperPlane](https://github.com/superplanehq/superplane), one pattern stood out.

A lot of UX friction comes from the product leaving people unsure what state they are in.

A simple CLI issue was a good example. A canvas update command exited with code 0 and printed nothing. Exit code 0 indicates success, but as a user, I am still not sure what happened. I have to run another check just to verify whether anything changed.

Another example came from sample event payloads. One issue pointed out that the sample data behind a component was contrived, and because it also fed configuration autocomplete, it taught users the wrong mental model before real data even arrived.

We identified similar cases across CLI, API, and UI. Different surfaces, same problem. The system was not making its state clear enough.

The _Don't Make Me Think_ book was published in 2000 and that is the lesson I am relearning this week. Users should be able to tell what happened, what state they are in now, and what to do next, without doubt.

A good product does not just do the right thing. It makes the right thing obvious.
