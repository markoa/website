---
title: "Lessons Learned From Fixed and Usage-Based SaaS Pricing Models"
description: "Navigating the second-order effects minefield"
pubDate: "2023-04-19T12:00:00Z"
type: "article"
published: true
canonicalUrl: "https://blog.operately.com/p/lessons-learned-from-fixed-and-usage"
---

Startups are often in search of that perfect pricing model for their products. The one that would be predictable, simple, and provide steady growth. But the road to finding it can be a bumpy one due to unforeseen second-order effects. In this post, I'll share some of the lessons we've learned from implementing two different pricing models at Semaphore.

### When Simple Pricing Meets Complex Reality

We initially went for a fixed-cost tiered pricing model: $29/mo, $99/mo, etc. The rationale was straightforward: our customers could predict their costs, and we could predict our revenue. We bet on simple. "When you need more, you just upgrade," we said. Unfortunately, the complex reality of B2B threw a wrench in our plans.

The second-order effect we encountered was **limited growth from existing customers**. The disconnect between those who needed more resources and those who made purchasing decisions created a situation where upgrading became a major (and rare) event. The people who used the product would often invest significant engineering effort to bypass plan limits, leading to frustration and a not-so-happy relationship with our product.

Additionally, both our customers and ourselves recognized that teams typically require minimal to moderate capacity for the majority of the time, with a substantial increase during periods of peak activity.

### Consumption-Based Pricing: A Cloudy Solution

Having learned from our first experience and driven to address the need for variable capacity, we moved to a consumption-based, pay-as-you-go model. It seemed like a great solution – customers who used more would pay more without any extra effort from us.

Since then, Semaphore revenue grew multifold. We're still happy with this strategy. But again, there were unforeseen second-order effects to deal with, such as:

* **Complexity spillovers:** Everything related to usage and billing became more complex and slow. For example, it became difficult to get clear insights into how customers are trialing and utilizing the product over time, resulting in a painfully long feedback loop for improving the onboarding experience.
* **Difficulty in upselling 2.0:** Customers grew accustomed to having the entire product available all the time. But continuing to ship new, advanced features requires funding. There's little choice but to figure out how to segment and sell additional plans and services. This requires a strong value proposition to avoid alienating the loyal customer base.

### How to minimize risks

First-time founders often lack the experience to anticipate all relevant second-order effects when making major strategic decisions. Some lessons have to be learned through own experience, but there are ways to minimize the risks:

1. **Resist the urge to move fast:** Making decisions that will have long-lasting effects requires careful consideration, not just quick action.
2. **Be vigilant:** If a solution sounds perfect, you're missing a catch.
3. **Do thorough due diligence:** Seek examples of different outcomes and discuss the pros and cons in painful detail. This can help you identify potential pitfalls and hidden effects in your own decisions. Start by interviewing ChatGPT and asking who in your network might have gone through a similar journey.

Decisions about pricing models may seem deceptively simple, but they can have far-reaching effects on your business. By understanding the second-order effects, doing your homework, and being open to change, you can find the solution that best fits your company and leads to sustainable growth.
