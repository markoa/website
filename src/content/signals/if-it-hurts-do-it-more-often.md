---
title: "If It Hurts, Do It More Often"
description: "When something hurts, lean into it. The discomfort is the teacher that forces you to adapt until it disappears."
pubDate: 2025-10-13 08:42Z
type: "article"
published: true
xPostId: "1977671328497914241"
hackerNewsPostId: "45566481"
---

A common saying from the culture of Continuous Delivery is _"If it hurts, do it more often"_.

When something hurts, lean into it. Discomfort is the teacher that forces you to adapt until it disappears.

Let's say deploying is painful because:

- The process is manual
- Only one person can do it
- If it goes wrong, nobody else could fix it

You can solve it by:

- Automating the deployment
- Defining a task on Semaphore to make deploying and rolling back a matter of pushing a button
- Giving other engineers access to Semaphore workflows and production logs

This is of course a simplified example. "Automating the deployment" may alone be a gargantuan task. Good. You decompose big problems into small problems. Go step by step.

The same logic applies when the pain comes from the world having changed.
Today development teams are going through a radical transformation with the use of AI tools.
The discomfort is real. As Tom Blomfield recently [tweeted](https://x.com/t_blom/status/1977436913599762498) (emphasis mine):

> Hearing from a lot of good founders that AI tools are writing most of their code now. Software engineers orchestrate the AI.
>
> They are also finding it extremely hard to hire <ins>because most experienced engineers have their heads in the sand and refuse to learn the latest tools</ins>.

I get it. You need to shift from writing code by hand—a big part of your identity—to curating and reviewing what the AI agent produces. And you need new tooling and habits so agents can run without breaking anything.

So lean into it:

- Start with bug fixes and chores that bore you to death
- Write prompts, specs, and checks the agent must pass before it lands in review
- Pair with teammates so you spot patterns together
- Update your `AGENTS.md` so your prompts stay DRY and everyone shares the same playbook
- Share lessons with the team in an open chat room and weekly meetings
- Celebrate small wins, then ramp up the tasks you hand to agents

Whatever hurts is a signal that you have a mission to complete to level up.
