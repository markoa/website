---
title: "Why we moved away from Heroku"
description: "Downtime, SSL, and control – why Semaphore moved from Heroku to a dedicated server"
pubDate: 2012-08-03 12:00Z
type: "article"
published: true
canonicalUrl: "https://renderedtext.com/blog/2012/08/03/why-we-moved-away-from-heroku/"
---

Heroku recently [tweeted](https://twitter.com/heroku/status/231072830236803072) that they've had 99.99% uptime during July. It looks like a fact, a number measured vigorously by a publicly traded company. I wish it was true.

Partly it is subjective - it was just one day earlier, the last day of June when they had a [massive outage](https://status.heroku.com/incidents/386), concluding many, sometimes consecutive days of infrastructure issues. Statements would be made as if it was a nuclear reactor ("the supervisor process was itself crashing when this cooldown was reached"). But sometimes the understandable words in those statements would not match what we saw in reality. For example, last downtime caused by [SSL Hostname issues](https://status.heroku.com/incidents/403) lasted, by our internal reports and Pingdom, for almost ten hours, not two.

All this is terrifying when your [bootstrapped product](https://semaphoreci.com), serving developers all over the world 24/7, goes offline. With each new user, each happy customer it was getting more painful to be so powerless about your application's multi-hour downtime. We made a distributed system for continuous integration where each build server is a stateless, replaceable unit, yet we had a single point of failure in the front-end, which receives post-commit hooks and schedules jobs.

An idea about migrating away would come to our minds, we'd discuss it for a while, but in the end come to a conclusion pretty much in tune with what Michael Bleigh [recently posted](http://www.intridea.com/blog/2012/6/25/the-problem-with-paas). We had a very young product, we thought, and they're going to work it out.

Until it was too much.

## Other issues

Besides possible downtime which will make you feel miserable, there are a few other things to deal with which you might not expect. It turns out that you have to do maintainance and upgrades involving downtime even when your app is running on the most managed cloud infrastructure.

For example, some of those Heroku post-mortems hinted that if our app wasn't still on the Bamboo stack, it wouldn't suffer as much. It was also using a deprecated SSL add-on, and so we basically needed to kill our app, create a new one on Cedar, and setup everything from scratch. The problem is that, because Heroku has such a complex infrastructure, a thing like having an app under SSL on a root domain is more difficult to configure than on a VPS or dedicated server. What you don't fully understand you fear a little, and postpone, especially if it means that you must also schedule some downtime.

Other things we were disappointed with are:

- Not having influence over how the asset pipeline is done. The [docs](https://devcenter.heroku.com/articles/http-caching) say that caching and proper last-modified timestamps will be in place, yet in practice they weren't and we are still not sure why.
- Slow deployment. The performance of "git push heroku" has deteriorated comparing to the early days, usually taking a couple of minutes.

## New setup

Since over time we've learned quite a bit about automatic provisioning, a migration to a dedicated server was mostly straightforward. Once you grow tired of repeating the same setup steps on new servers, I highly recommend that you learn to use [Chef](http://wiki.opscode.com/display/chef/Home). Even really understanding Capistrano, combined with a few Bash scripts, will take you a long way. Also, each new version of Ubuntu has more user-friendly sysadmin tools, one recent example being introductuon of [ufw](https://help.ubuntu.com/12.04/serverguide/firewall.html) to hide the complexity of iptables.

Now, with a failover IP address and some straightforward backup, we're able to recover in case of true emergency very quickly. It is a responsibility, but it is a level of responsibility and flexibility that we want.

Note that when you boot your app on a dedicated server, you might be impressed with its new speed, but your users in Brazil, India or Australia might have the opposite experience. That problem of accumulating latency is solved by putting your assets on a CDN. In the end what we got is 5x faster page load for 2.5x less money.

## Is Heroku really that bad?

No. We've been happy users of Heroku for about three years and sent a lot of our and our clients' money to them. Almost all apps that we're working on are on it. We're sure that they're working on avoiding all these issues in the future (perhaps letting out a [chaos monkey](https://github.com/Netflix/SimianArmy) more would help?), and they remain our default choice for new apps. Heroku has advanced the state of the art in web development tremendously with such ease of deployment and add-on system.

If you lack the sysadmin experience, or don't expect to be able to able to fully devote your team to infrastructure development and maintenance, in the long term you're much better off in the cloud. However, with Semaphore, our own product that is already critical to many people, we feel better now when we're fully in control.
