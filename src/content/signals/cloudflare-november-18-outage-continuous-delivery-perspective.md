---
title: "Cloudflare's November 18 Outage – A Continuous Delivery Perspective"
description: "Cloudflare's worst outage since 2019 is a change management story and exactly what Continuous Delivery is supposed to make safe."
pubDate: 2025-11-27 12:26Z
type: "article"
published: true
hackerNewsPostId: "46068733"
xPostId: "1994032219846004781"
linkedinPostId: "markoa_cloudflares-november-18-outage-a-continuous-activity-7399809993081884672-svmE"
---

On November 18th, 2025, Cloudflare had what they describe as their worst outage since 2019.

It didn't start with a cyber attack or massive hardware failure. It started with a database permissions change.

This is _exactly_ the sort of thing Continuous Delivery is supposed to make safe. So since [the post-mortem](https://blog.cloudflare.com/18-november-2025-outage/) came out I wanted to analyze it through a CI/CD lens.

### Summary of what happened

Around 11:20 UTC, Cloudflare’s network started returning a huge spike of HTTP 5xx errors for traffic flowing through their core network. [Users all over the Internet](https://www.bbc.com/news/articles/c629pny4gl7o) started seeing Cloudflare error pages instead of the sites they were trying to visit.

The root cause was a change to how one of their ClickHouse database clusters handled permissions and metadata.

Here’s the rough chain of events:

1. Cloudflare deployed a change to ClickHouse permissions and metadata visibility. That change meant queries against system metadata suddenly started returning _more rows_ than before — including underlying tables in another schema (`r0`) where previously they only saw the `default` database.
2. One of the systems that depended on that metadata was Cloudflare’s Bot Management feature file generator. It queried `system.columns` to assemble the list of features used by a machine learning model to score bots. That query didn’t filter by database name, so after the change it suddenly saw roughly double the number of columns, and produced a much larger feature file.
3. That feature file is shipped out to Cloudflare’s edge network every few minutes. The bots module in their core proxy expects the number of features to be below a hard limit (200) and preallocates memory accordingly. The new, larger file exceeded that limit. The Rust code hit the limit and panicked, leading to 5xx responses from the core proxy.
4. Because this file is generated every five minutes from a distributed ClickHouse cluster that was being gradually updated, the system actually went up and down for a bit: sometimes a good config, sometimes a bad one, depending on which node produced it. Eventually all nodes produced the bad file, and the failure became stable.
5. Downstream systems that depend on the core proxy – things like Workers KV and Access – were also impacted until they were temporarily rerouted or bypassed.

Main impact started around 11:28, substantial mitigation began around 14:30, and everything was fully resolved by 17:06 UTC.

So: a change to database permissions → bigger config file → hard limit exceeded → proxy panics → global outage.

That’s a change management story.

### This is why Continuous Delivery exists

The primary cause of production failures is change. Continuous delivery is about making change boring.

If your system is updated frequently then you must assume that **any change is guilty until proven innocent**.

From a CD perspective, a few big themes jump out:

#### 1. Config is code

The feature file that broke things isn’t some harmless data; it _is executable behaviour_. It changes what the bot-scoring model does and it clearly has operational consequences. That should be treated with the same discipline as application code:

- Stored and versioned in source control
- Validated in pipelines
- Subject to contract tests with the consumers (the proxy module)

#### 2. Contracts between systems

There is an implicit contract here:

- Producer: “I will generate a feature file.”
- Consumer: “I can safely handle up to 200 features.”

That contract wasn’t explicitly enforced at integration boundaries. The producer didn’t know that exceeding 200 features would crash the consumer, and the consumer effectively said: _“If this assumption is broken, I will simply panic.”_

In a good CD setup, we encode these contracts as tests:

- “If the feature file has > 200 features, the pipeline fails.
- Or, at runtime: “If it’s too big, log, drop extra features, and _degrade gracefully_ instead of crashing.”

#### 3. Fast feedback tied to change events

When production starts returning loads of 5xxs right after a change, your first hypothesis should almost always be: _“We broke it.”_

Cloudflare initially suspected a large DDoS attack, partly because their off-platform status page also went down by coincidence, which complicated the diagnosis.

A strong CD/operational posture ties monitoring directly to deployments:

- “We deployed change X to ClickHouse at 11:05.”
- “At 11:20, 5xxs spike globally.”
- The system should scream: _“Roll back that change first, then keep investigating.”_

To their credit, they did eventually correct course, stop propagation of the bad file, push out a good one, and restart the proxies.

### Where CI/CD could have helped more

Let’s talk about specific points where mature CI/CD practices can help avoid or limit this sort of outage.

#### 1. Test the config generator like production code

The change that triggered this was essentially a behaviour change in the query used to build the feature file.

In a CD world, we’d treat that as an ordinary code change and ask:

- Do we have automated tests for the query behaviour?
- Do we have tests that assert the range of output sizes we consider safe?
- Do we have a test environment where a realistic ClickHouse cluster – including these permission changes – is exercised before we touch production?

A property test like:

> Given realistic metadata, the resulting feature file must have ≤ 200 features, or the build fails

...would have caught this before it ever reached live traffic.

#### 2. Practice progressive delivery for everything

Cloudflare already had a gradual rollout of permissions across the ClickHouse cluster, but the effect of that was system going up and down: sometimes a good config, sometimes a bad one.

From a CD perspective, you want _controlled blast radius_:

- Ship new behaviour to a tiny slice of traffic or a subset of regions first.
- Observe: “Did the new feature file cause any spike in 5xxs, latency, or resource usage?”
- Only then ramp up.

Instead of having the feature file immediately pushed to the entire network every five minutes, imagine:

- A canary group of edge nodes is updated first.
- If they see the bot module panic or error rates spike, an automated system:
  - Rolls back to the last known good config file.
  - Blocks further rollout.
  - Raises an incident with a clear “config rollout blocked” signal.

That’s progressive delivery applied not just to code, but to ML feature sets and configuration.

#### 3. Design for graceful degradation, not panic

The Rust code in the affected FL2 proxy is essentially designed to "panic" (as per post-mortem) if it gets more than 200 features.

From a resilience standpoint, that’s exactly what we _don’t_ want. In a world of continuous delivery and constant change, you assume your assumptions will be broken.

Better options might include:

- Drop any features over the limit and log loudly.
- Disable the Bot Management module temporarily and continue forwarding traffic, maybe treating everything as “unknown bot score” rather than bringing down the proxy.
- Trip a feature kill-switch that turns off Bot Management globally while keeping the core CDN and proxy path alive.

Cloudflare’s own remediation list mentions:

- Hardening ingestion of internal configuration files like user input.
- More global kill switches for features.
- Reviewing error handling across core modules.

That’s _exactly_ the direction you’d expect from a team embracing CD and resilience engineering.

#### 4. CI as safety net for "platform-ish" changes

One subtle thing here: this wasn’t a direct change to Bot Management. It was a change to how the _database platform_ handled permissions and metadata.

In many organisations, platform changes are treated as “infra stuff”, not subject to the same product-level tests. But in a CD culture:

- Platform changes go through pipelines that _also_ run representative workloads and integration tests for the services that depend on them.
- That ClickHouse permission change should have run:
  - A compatibility test suite for all consumers that query `system.columns`.
  - Specific tests for the Bot Management feature generator pipeline.

If you can’t do that comprehensively, you at least start with the critical systems: anything that can bring down your main proxy path should have extremely strong automated protection.

### Good engineering is about turning failure into fast, safe learning

Cloudflare did the right thing by publishing a detailed post-mortem, while expressing engineering humility and laying out concrete follow-up steps.

Everyone running large-scale systems has failures. What distinguishes good engineering organizations is:

- They treat incidents as opportunities to improve the _system_, not to blame individuals.
- They share what they learned.
- They make structural changes – to code, to pipelines, to architecture, to daily practices.

From a continuous delivery perspective, the lessons I’d highlight are:

1. **Every change is potentially dangerous**. CD is about making lots of small changes safe, not moving fast and ignoring risk.
2. **Config, queries, and ML features are code**. They need the same CI/CD discipline: tests, contracts, and progressive rollout.
3. **Design for graceful failure**. When – not if! – your assumptions are broken, the system should bend, not snap.
4. **Tie observability tightly to deployments**. If you’ve just changed something and the world is on fire, suspect your change first.

Cloudflare's outage is painful for them and for a lot of the internet. But it’s also a rich example of why we do continuous delivery in the first place.
