---
title: "Don't guessbuild"
description: "How we avoid guessbuilding at Operately by stopping feature development where certainty ends and speculation begins."
pubDate: 2025-03-21 15:22Z
type: "article"
published: true
---

One of the principles in product design that we've established at Operately is to avoid guessbuilding.

It's the discipline of stopping the design of a new feature at the edge where certainty ends and speculation begins.

The pattern we've noticed is, we start by solving specific, well-defined problems that either we or our users are definitely experiencing. As we analyze the problems, we start seeing patterns that shape the general solution.

This is where things get dangerous. The general solution opens up possibilities for handling hypothetical use cases that we haven't actually encountered yet.

I'm not saying this principle is new.

In software development, people who practiced Extreme Programming in the mid 90s coined an acronym YAGNI – _you ain't gonna need it_.

Don't be a fool and spend time programming flexibility, infrastructure, and capabilities that you presume your software will need in the future — because it most likely won't.

Likewise, we aim to draw a clear line between:

- What we **know** our users need (backed by direct feedback or usage data)
- What we **think** our users might need (speculative features)

When these phrases start appearing in our discussions, it's usually a sign that we're guessbuilding:

- "This could be useful if..."
- "Users might want to..."
- "What if someone needs to..."
- "We should make this flexible enough to handle..."

So we stop there to build confidently for the known needs, ship that solution, and move on to another area of our product. We return to expand our solution when it has simmered long enough to have new evidence emerge that clearly indicates what we should build next.

### An example

Recently we were discussing how to approach removing goals. Currently, you can close a goal and mark it as accomplished or not. But this action didn't feel appropriate for situations when you want to stop working on a wrong goal. Or when as a new user you're just exploring with imaginary data.

So we started with an idea that we need to support both archiving and deleting. Archiving would hide dropped initiatives. Deleting would completely get rid of stuff. But who actually asked for archiving? Just because archiving is a common concept doesn't mean we have to apply it. A goal isn't stateless like a document or a workspace. It has a natural lifecycle—it can be closed. It doesn't need archiving. So we decided to just do deleting.

Looking more closely, deleting can be implemented in several ways. We can just wipe all the data. But in a collaborative business app, the content you create belongs to the team as much as it does to you. Is wiping the data too destructive? We could nullify the data and leave traces that something existed. Also, what about the associated sub-activities, like projects and sub-goals? What should they point to? Or should they be wiped out too?

As we addressed these questions, we realized we went too far and said—let's not guessbuild. Let's simply do the thing that we're sure is needed: users who make a mistake or fool around and want to start fresh should be able to delete a goal and not see it again. So we're going to allow just that—with a clear warning of implications. And if a goal has any sub-activities, we're going to politely ask the user to delete those first. We'll be happy to make it more nuanced and complicated if and when we see strong feedback pointing in another direction.
