---
title: "Small Batches Still Matter When Agents Write The Code"
pubDate: 2026-10-09 09:22Z
type: "article"
published: true
xPostId: "2108536707159073087"
hackerNewsPostId: "50018223"
linkedinPostId: "markoa_spoke-with-a-team-this-week-who-told-me-they-share-7514258002309169152-C0OC"
---

Spoke with a team this week who told me they try to cap pull requests at 500 lines and keep failing.

The cap is there to stop people throwing slop grenades with 10k lines of code at each other. Agents never get tired. They keep going until the feature looks complete. Before AI, some people worked the same way, spending days or weeks in a branch and only asking for review when they felt done.

Continuous Delivery taught us to ship in small batches for two reasons: so a human can understand each change, and so we can roll it back quickly when something breaks. Agents writing the code doesn't change the fact that people need to understand the systems they're responsible for.

So I still recommend splitting large changes into chunks that can be reviewed and deployed on their own. The simplest way today is to have the agent write a plan in a Markdown file and keep it updated as it goes. Then each change gets a fresh agent session that reads the plan at the start and updates it at the end.

The best unit of work is still what fits inside our head.

