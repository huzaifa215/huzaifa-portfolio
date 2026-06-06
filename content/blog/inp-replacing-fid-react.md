---
title: "INP Replaced FID: What It Means for React Apps"
date: "2026-04-26"
excerpt: "Interaction to Next Paint is a far stricter responsiveness metric than FID. Why React apps are exposed, and the patterns that fix it."
category: "Performance"
tags: ["INP", "core-web-vitals", "react", "responsiveness"]
slug: "inp-replacing-fid-react"
draft: false
---

Interaction to Next Paint replaced First Input Delay as a Core Web Vital, and the change matters far more than a metric swap usually does. FID was a low bar that most sites cleared by accident. INP is a strict, full lifecycle responsiveness metric, and React applications are unusually exposed to it.

## What changed and why it is harder

FID measured only the delay before the browser began processing your first interaction. It ignored everything after that: the work your handler did, the rendering it triggered, and the time until the user saw a result. A site could have a great FID and still feel sluggish on every click.

INP measures the full path from interaction to the next paint, and it does this for interactions throughout the page's life, reporting roughly the worst one. It captures input delay, processing time, and presentation delay. In plain terms, INP measures whether the page actually responds when the user does something, not just whether it started to.

> FID asked whether the page picked up the phone. INP asks how long until you actually got an answer.

## Why React apps struggle

React's model is to respond to an interaction by updating state, which triggers a render, which reconciles and commits to the DOM. If that render is large, it runs on the main thread and blocks the paint. A click that sets state high in the tree can cause a re-render of a big subtree, and the user waits for all of it before seeing anything change.

The classic offender is a single piece of state that drives a large list or a complex view. Type into a filter input that re-renders a thousand rows on every keystroke and your INP will be poor, because each keystroke is an interaction that blocks paint while React reconciles the list.

## Fix one: separate urgent from non urgent updates

React's concurrent features exist largely for this problem. `useTransition` lets you mark a state update as non urgent, so React can keep the interaction responsive and render the heavy update without blocking the paint.

```tsx
const [query, setQuery] = useState("");
const [isPending, startTransition] = useTransition();

function onChange(e: React.ChangeEvent<HTMLInputElement>) {
  setQuery(e.target.value); // urgent: the input updates immediately
  startTransition(() => {
    setFilter(e.target.value); // non urgent: the heavy list update
  });
}
```

The input stays snappy because its update is urgent and paints right away. The expensive filtered list update happens in a transition that React can interrupt and schedule around, which keeps the interaction's next paint fast.

## Fix two: stop doing expensive work in handlers

INP includes processing time, so heavy synchronous work in an event handler counts directly against you. Parsing a large payload, doing layout math, or sorting a big array inside a click handler all delay the paint. Move that work off the critical path. Defer it, break it into chunks, or push it to a web worker if it is genuinely heavy.

```tsx
function onClick() {
  setSelected(id); // cheap, paints fast
  // expensive analytics work, deferred so it does not block the paint
  requestIdleCallback(() => trackInteraction(id));
}
```

The interaction's visible result happens immediately, and the bookkeeping runs when the main thread is idle.

## Fix three: shrink what re-renders

The cheapest INP win is often to render less. Memoize expensive subtrees so an unrelated state change does not re-reconcile them. Virtualize long lists so the DOM you touch on each interaction stays small regardless of data size. Push state down so it lives close to the components that need it, rather than at the top of the tree where every change re-renders the world.

These are old performance ideas, but INP gives them teeth, because now the cost of a bloated render shows up in a metric that affects how your site is ranked and perceived.

## Measuring INP honestly

Lab tools can estimate INP, but it is fundamentally a field metric because it depends on real interactions over a real session. Instrument it with the web vitals library and watch your field data, segmented by device class. The worst INP almost always comes from mid tier mobile devices under load, which is where your real users are and where your development laptop lies to you.

```ts
import { onINP } from "web-vitals";

onINP((metric) => {
  sendToAnalytics({ name: metric.name, value: metric.value });
});
```

A practical target is an INP under 200 milliseconds at the 75th percentile. Crossing 500 milliseconds is the zone where users start to feel that the app is fighting them.

## The mindset shift

The deeper lesson is that responsiveness is now a measured, ranked property of your app, not a vibe. For React developers that means treating every interaction as a small performance budget: keep the urgent update tiny, defer everything else, and render as little as the feature allows. INP rewards apps that respect the main thread, and it quietly penalizes the ones that treat every click as a license to re-render everything.
