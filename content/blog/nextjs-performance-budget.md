---
title: "Engineering a Performance Budget for Next.js at Scale"
date: "2026-06-01"
excerpt: "How I think about Core Web Vitals as hard constraints — not dashboards to admire after launch — and the budget I hold every Next.js build to."
category: "Performance"
tags: ["Next.js", "Core Web Vitals", "LCP", "Performance"]
slug: "nextjs-performance-budget"
draft: false
---

> **TODO — Draft scaffold.** This post is a publish-ready stub. The structure
> and headings below map out the intended article; replace the placeholder
> prose with the real write-up before publishing. No content here should be
> treated as final.

A performance budget turns "the site feels fast" into a number a team can
defend. This article walks through the budget I hold production Next.js apps to,
and how each constraint maps to a real user outcome.

## Why a budget beats a dashboard

TODO: Explain the difference between *observing* Core Web Vitals after the fact
and *committing* to thresholds that fail the build when crossed. Cover the
psychology of treating performance as a feature with an owner.

## The numbers I hold the line on

TODO: Document the concrete budget — LCP, CLS, TBT, total JS transferred, and
why each threshold was chosen. Tie each one to the user-facing symptom it
prevents.

```ts
// TODO: replace with the real budget config used in CI.
export const budget = {
  lcpMs: 2500,
  cls: 0.1,
  tbtMs: 200,
};
```

## Where Next.js helps — and where it doesn't

TODO: Server Components, streaming, and route-level code splitting do a lot of
the work. Note the places where the framework won't save you: third-party
scripts, unoptimised images, and client islands that quietly grow.

## Holding the budget in CI

TODO: Describe wiring Lighthouse CI (or equivalent) into the pipeline so a
regression blocks the merge instead of reaching production.

## What I'd tell a team starting today

TODO: Close with the one habit that matters most — measuring on real hardware,
not the developer's laptop.
