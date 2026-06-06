---
title: "Streaming in the Next.js App Router: A Practical LCP Strategy"
date: "2026-06-02"
excerpt: "How streaming, Suspense boundaries, and the App Router change the way you protect Largest Contentful Paint on real production pages."
category: "Performance"
tags: ["app-router", "streaming", "LCP", "suspense"]
slug: "nextjs-app-router-streaming-lcp"
draft: false
---

Largest Contentful Paint is the metric users actually feel. It marks the moment the main content of a page becomes visible, and on most marketing and content pages it is the difference between a site that feels instant and one that feels sluggish. The App Router gives you a genuinely different toolset for protecting it, and the centerpiece of that toolset is streaming.

## What streaming actually changes

In the older model, a server rendered page was an all or nothing affair. The server gathered every piece of data, rendered the full HTML, and only then flushed a response. The slowest data dependency on the page set the floor for time to first byte. If your hero needed a fast query but your footer needed a slow one, the footer punished the hero.

Streaming breaks that coupling. With the App Router you wrap slow segments in a `Suspense` boundary, and the server flushes the shell immediately while the slow segment resolves out of band. The browser starts painting the parts that are ready.

> The single most useful mental shift is this: a Suspense boundary is a promise to the browser that everything outside it can paint now.

That promise is what protects LCP. Your largest contentful element, usually the hero heading or hero image, should live outside any Suspense boundary that depends on slow data.

## Placing boundaries with intent

The common mistake is to wrap the entire page body in one boundary. That gives you a loading spinner for the whole route and defeats the purpose. Instead, identify the LCP element and keep it in the static or fast path, then isolate the slow regions.

```tsx
export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <ProductHero id={params.id} />
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews id={params.id} />
      </Suspense>
      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations id={params.id} />
      </Suspense>
    </main>
  );
}
```

Here `ProductHero` is rendered eagerly because it carries the LCP element. Reviews and recommendations are slower and personalized, so they stream in. The user sees the hero almost immediately, and the slower regions fill in without blocking.

## Skeletons are part of the contract

A streamed boundary needs a fallback that reserves layout. If your skeleton has a different height than the resolved content, the late arrival shifts the page and damages Cumulative Layout Shift even though LCP looks great. Match the skeleton dimensions to the real content. This is not polish, it is correctness.

## The data layer has to cooperate

Streaming only helps if your fast path is genuinely fast. If `ProductHero` itself awaits a slow database call, you have moved the problem, not solved it. Two patterns help here.

First, colocate data fetching with the component that needs it so each Suspense boundary owns its own waterfall rather than inheriting the page wide one. Second, lean on the framework cache and request memoization so repeated reads of the same resource during a single render do not multiply your latency.

```ts
const getProduct = cache(async (id: string) => {
  const res = await db.product.findUnique({ where: { id } });
  if (!res) notFound();
  return res;
});
```

Wrapping the read in `cache` means the hero and any sibling that needs the same product share one query within the render pass.

## Measuring the thing you changed

Lab numbers from a fast laptop will lie to you. Streaming benefits are most visible on mid tier mobile hardware over a constrained network, which is exactly where real users live. Test with throttling on, and watch field data once the change ships. The lab tells you whether the mechanism works. The field tells you whether it mattered.

A reasonable target on content pages is an LCP under 2.5 seconds at the 75th percentile of real users. Streaming does not guarantee that number, but it removes the structural reason you would miss it, which is one slow dependency holding the whole page hostage.

## When not to stream

Streaming adds complexity, and not every page needs it. A fully static page that renders from cached data has nothing to stream because everything is already fast. Reaching for Suspense there just adds skeletons that flash for no reason. Use streaming where you have a real split between fast primary content and slow secondary content. That is the shape of page where it pays for itself.

## A workable default

For most teams the right starting posture is simple. Keep the hero and primary copy in the fast path. Wrap anything personalized, anything that hits a slow third party, and anything below the fold in its own boundary with a layout matched skeleton. Verify on throttled mobile, then confirm in field data.

Streaming is not a magic switch that makes pages fast. It is a tool for making sure that the fast parts of a page are not held back by the slow parts. Used with intent, it is one of the most direct levers you have on the metric your users actually feel.
