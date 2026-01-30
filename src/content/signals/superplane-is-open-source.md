---
title: "SuperPlane Is Open Source"
pubDate: 2026-01-30 10:29Z
type: "article"
published: true
hackerNewsPostId: "46793814"
xPostId: "2016517902397018264"
linkedinPostId: "markoa_today-were-open-sourcingsuperplane-a-devops-activity-7422283159351836672-6bNu"
blueskyPostId: "3mdn55qr3dc2s"
---

This week we open-sourced [SuperPlane](https://superplane.com), a DevOps control plane for running event-driven workflows across the tools you already use. You can think of it as 'n8n/Zapier for DevOps' that sits on top of Git, CI/CD, observability, infrastructure, and the rest of your production system.

Why does this matter? To evolve, DevOps needs to move on from one-off scripts, tribal knowledge, and untraceable workflows.

For years, the best automation tool at hand was the humble CI job. Pipelines are great at building and testing code, but they are not great at running workflows that span multiple tools and repositories, pause for human intervention, and run for hours or days.

What we need is a vendor-neutral interoperability layer for DevOps automation; a way for tools, humans, and agents to talk to each other, with domain-specific channels and components. This launch is the alpha release of that layer, starting with 40+ core components and integrations.

A few links if you want to kick the tires:

- Read the release announcement [on SuperPlane blog](https://superplane.com/blog/introducing-superplane/)
- Star the repo / browse the code: [superplanehq/superplane](https://github.com/superplanehq/superplane)
- See concrete [example use cases](https://docs.superplane.com/get-started/example-use-cases/)
- [Try the app locally in two minutes](https://docs.superplane.com/get-started/)

Ultimately, the goal is to make it safe to describe what you want in natural language and have the system execute it in a safe, auditable way. It’s a journey, and we’re committed to keeping it open and transparent.
