---
title: "Deploying Next.js: Vercel vs Self Hosted in Production"
date: "2026-02-07"
excerpt: "An honest production comparison of Vercel and self hosting Next.js: what you get, what you give up, and how to decide based on your real constraints."
category: "DevOps"
tags: ["nextjs", "vercel", "self-hosting", "deployment"]
slug: "nextjs-vercel-vs-self-hosted"
draft: false
---

Deploying Next.js comes down to a fork in the road: run it on Vercel, the platform built by the team that builds the framework, or self host it on your own infrastructure. Both are fully viable in production. The choice is not about which is better in the abstract but about which set of tradeoffs matches your constraints. Having shipped both ways, here is the honest comparison without the marketing on either side.

## What Vercel actually gives you

Vercel's value is that the platform understands Next.js natively, so the framework's features work with zero configuration. Server Components, streaming, image optimization, the routing model, edge middleware, and incremental static regeneration all just work, because the platform was co designed with the framework. You push your code, and the infrastructure decisions, what runs at the edge, what runs in a serverless function, how caching works, are made for you correctly.

The second thing you get is the operational surface disappearing. There are no servers to patch, no autoscaling to configure, no CDN to wire up, no build pipeline to maintain. For a small team or a solo developer, the time this saves is not a rounding error. It is the difference between shipping product and running infrastructure.

> Vercel is not selling hosting. It is selling the disappearance of infrastructure work, and for teams whose scarce resource is engineering time, that is often the entire decision.

## What you give up

The tradeoffs are real. Cost is the one people feel first: usage based pricing that is generous at small scale can become significant at high traffic, and certain workloads, particularly heavy image optimization or large bandwidth, drive it up. You are also accepting a degree of platform coupling. Most of Next.js is portable, but the path of least resistance leans on platform conveniences, and migrating away later takes effort proportional to how much you leaned in.

You also give up some control. You do not choose the underlying compute, you work within the platform's execution model, and when something behaves unexpectedly you are debugging through the platform's abstractions rather than your own servers. For most teams this is a fair trade. For teams with strict requirements about where compute runs or deep custom infrastructure needs, it can be a wall.

## What self hosting gives you

Self hosting Next.js, whether on a container platform, a virtual machine, or a managed Node host, gives you control and cost predictability. You own the compute, so you can place it where you need it, size it how you want, and reason about its cost as a fixed line rather than a usage meter. At sustained high traffic, self hosting is frequently cheaper, because you are paying for capacity rather than per request.

You also get to keep everything in one operational world. If your organization already runs infrastructure, has a platform team, and has compliance requirements about where and how things run, self hosting lets Next.js live alongside the rest of your systems under the same controls and the same observability you already operate.

Next.js supports this directly with a standalone output mode that produces a minimal, self contained server bundle suited to containers.

```js
// next.config.js
module.exports = {
  output: "standalone",
};
```

This emits a server you can run with `node server.js` inside a slim container image, copying only the files the app needs at runtime.

## What self hosting costs you

The cost is that the features Vercel gives for free become your responsibility. Image optimization needs a configured optimizer or an external image service. Incremental static regeneration and the framework's caching need a shared cache when you run multiple instances, or revalidation behaves inconsistently across them. Edge middleware that ran globally on Vercel now runs wherever your servers run, which changes its latency characteristics. None of this is insurmountable, but it is work, and it is ongoing work, not a one time setup.

You are also now responsible for the things platforms quietly handle: scaling under load, zero downtime deploys, patching, certificate management, and the on call burden when something breaks at an inconvenient hour. If you have a team that does this already, the marginal cost is low. If you do not, you are taking on a second job alongside building the product.

## How to actually decide

The decision sequence that cuts through the noise starts with your team. If your scarce resource is engineering time and you do not already run infrastructure, Vercel almost always wins, because it converts an infrastructure project into a deploy command. If you already operate infrastructure, have a platform team, or have requirements about compute location and compliance, self hosting fits into a world you already run.

Then consider scale and cost. At modest and bursty traffic, the platform's pricing is usually a non issue and its convenience is a clear win. At sustained high traffic with heavy bandwidth or image workloads, model the cost honestly, because self hosting can become materially cheaper and that saving can justify the operational work.

Finally, consider how much of the framework's advanced behavior you depend on. The more you rely on streaming, edge middleware, and the caching model, the more you benefit from running where those features are zero configuration, and the more you pay in setup to reproduce them yourself.

## The honest conclusion

There is no universally correct answer, and anyone who gives you one is selling something. Vercel is the right default for teams who want to spend their time on product and let infrastructure disappear. Self hosting is the right call for teams who already run infrastructure, operate at a scale where owning the compute pays off, or have requirements that demand control. Decide on your real constraints, team capacity, scale, cost, and control, rather than on which option sounds more sophisticated, and you will land in the right place.
