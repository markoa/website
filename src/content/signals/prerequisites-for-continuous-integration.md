---
title: "Prerequisites for continuous integration"
description: "Version control, automated build, and team agreement – from Continuous Delivery and Semaphore experience"
pubDate: 2012-11-12 12:00Z
type: "article"
published: true
canonicalUrl: "https://renderedtext.com/blog/2012/11/12/prerequisites-for-continuous-integration/"
---

The core points come from the [Continuous Delivery](http://continuousdelivery.com/) book. My comments come from a background of working with a dynamic language and based on issues that we've seen some [Semaphore](https://semaphoreci.com) users share.

## Version control

You have to keep everything related to your project in version control. We recommend [git](http://git-scm.com/). Not just code and tests, but database scripts and any scripts required for building and deployment.

If you're writing a Rails app, you have a suite of default database scripts (`rake db:*`) that should serve you in almost all cases. Regardless of the framework, a common mistake is to inject additional behaviour to these scripts that introduce dependency on a certain order of code loading, assume that a database already exists or certain records are present. You _can_ do that, but double check if your framework offers a predefined place for your extensions, and make sure that your scripts work on a machine that has just checked out the source code and does not have a database yet created.

Some things should _not_ be in version control. Usually that means results of your scripts. For example, if you're using [Bundler](http://gembundler.com/) to manage dependencies, put the bundle directory in `.gitignore` or equivalent. Your project may depend on some native extension which will not run if another environment, for example, has a different version of the native library.

## Automated Build

The Ruby community understands this - most of us run our `rake spec` or similar test suites from the command line. However, some non-obvious pitfalls still exist and end up as a case of "it works on my machine but fails in CI". Just like you need to manage and automate configuration of your application, you need to do so for your tests too. That means not having a suite that depends on undocumented or non-scripted OS settings, external services or unstable tools (most problems arise with browser automation).

A robust test suite does not contain tests with a random outcome or side-effects that affect other tests (eg a change of timezone). A test suite that finishes quickly encourages frequent commits and granular changes that keep the development team in control of what they do.

Of course, it is assumed that your test suite covers the functionality of the application to a degree that, when the build is green, gives everyone sufficient confidence that everything is working and that code can be deployed to production.

## Agreement of the team

> Continuous integration is a practice, not a tool.

Therefore it takes discipline. Everybody on the team must be on the same page about the development and deployment process. When the build is broken, the responsible developer must do everything to fix it, or revert the changes as soon as possible.

A typically broken process involves one developer working in small, iterative changes, pushing a dozen times a day and keeping the build green, while another works in silence for days, then drops a bomb in form of a single commit containing multiple changes and - if the build goes red - ignores the results.

Working continuous integration gives all stakeholders immediate feedback on the state of the application. When this practice is taking place, every project we've seen benefits from huge a productivity boost for developers and higher quality to the end users.
