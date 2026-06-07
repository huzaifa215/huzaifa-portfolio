---
title: "A React Server Components Mental Model for Senior Engineers"
date: "2026-05-28"
excerpt: "Server Components are not server side rendering. A precise mental model of the boundary, serialization, and where your code actually runs."
category: "React"
tags: ["RSC", "server-components", "react-19", "app-router"]
slug: "react-server-components-mental-model"
draft: false
---

The hardest part of React Server Components is unlearning the instinct that everything is server side rendering with a new name. It is not. RSC is a different execution model, and once the model is precise in your head, the rules that felt arbitrary become obvious consequences.

## Two runtimes, one tree

A Server Component runs once, on the server, during the request. It never ships its code to the browser, never hydrates, and never re-renders on the client. A Client Component runs in both places: once on the server to produce initial HTML, and then on the client where it hydrates and lives out the rest of its life with state and effects.

The component tree is a single tree, but it spans two runtimes. The `"use client"` directive is the seam. It does not mean the component runs only on the client. It means this component and everything it imports becomes part of the client bundle and gains client capabilities.

> Think of `"use client"` as a doorway, not a label. Once you walk through it, you are in client land, and everything you import from there comes with you.

The doorway framing fixes the most common beginner mistake, which is reading `"use client"` as "this runs on the client only." It does not. A Client Component still renders on the server for the initial HTML. What the directive actually marks is the point where the module and its import graph join the client bundle and gain the right to use hooks, effects, and browser APIs. Everything above the directive in the tree stayed on the server and shipped no code. Everything from the directive down is dual runtime. Once you see it as a boundary in the import graph rather than a runtime location, questions like "why did my whole component library end up in the bundle" answer themselves: something near the top imported a client module, and the doorway swallowed everything below it.

## What crosses the boundary

When a Server Component renders a Client Component, it passes props across the runtime boundary. Those props have to be serializable, because they travel as part of the RSC payload. You can pass strings, numbers, plain objects, arrays, and even other Server Components as children. You cannot pass a function, a class instance, or a Date that you expect to survive as a Date with methods intact.

```tsx
// Server Component
import { Chart } from "./chart";

export default async function Dashboard() {
  const points = await getMetrics();
  return <Chart data={points} title="Latency" />;
}
```

```tsx
"use client";

export function Chart({ data, title }: ChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  return /* interactive rendering */;
}
```

`Dashboard` does the data work on the server. `Chart` receives plain data and owns the interactivity. The data never round trips through a client fetch, and the charting library code is the only thing that lands in the bundle.

## The serialization rule, made concrete

The reason you cannot pass a function as a prop into a Client Component is that there is no way to send a closure over the wire. The exception is a Server Action, which looks like a function but is actually a reference the framework can serialize and call back into. That single exception is why Server Actions feel almost magical: they are the sanctioned way to hand a callable across the boundary.

It is worth internalizing why the serialization rule exists rather than treating it as an arbitrary restriction, because the reasoning predicts the edge cases. The RSC payload is data that travels from server to client over the wire. Anything in it has to survive being turned into a stream of bytes and reconstructed on the other side. A string survives. A plain object survives. A function does not, because a function is a closure over its surrounding scope, and there is no way to package up that scope and reconstitute it in a different runtime. The same logic explains why a `Date` arrives as a serialized value and not a live `Date` with methods, and why a class instance loses its prototype. The practical rule is to pass data, not behavior, across the boundary, and when you genuinely need to send behavior, a Server Action is the one sanctioned form because the framework sends a reference rather than the closure itself. Knowing the why means you can predict what will and will not cross without memorizing a list.

## Composition beats configuration

The pattern that unlocks RSC is passing Server Components as `children` into Client Components. A Client Component can render server rendered content it received as a child without that content becoming client code.

```tsx
"use client";

export function Collapsible({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <button onClick={() => setOpen((o) => !o)}>Toggle</button>
      {open && children}
    </section>
  );
}
```

The `children` here can be a heavy Server Component that fetches data and renders markdown. `Collapsible` adds interactivity around it without pulling that heavy work into the bundle. This is the composition pattern that lets you keep most of your tree on the server while sprinkling interactivity exactly where it is needed.

## Where data fetching belongs

In the RSC model, data fetching is a server concern by default. You await directly in a Server Component, with no `useEffect`, no loading state machine, and no client side cache to manage. The component is async, the data is there when it renders, and the result is HTML plus a payload, not a spinner that resolves later.

This collapses an enormous amount of accidental complexity. The fetch, the loading state, the error boundary, and the render all live in one place, and most of it ships zero JavaScript.

## The cost you are trading

Nothing is free. Server Components mean your interactivity lives behind a boundary you have to think about. Drop a `"use client"` too high in the tree and you pull a large subtree into the bundle. Drop it too low and you fight to thread state through. The skill is keeping client boundaries small and pushed toward the leaves, so the interactive islands are as narrow as the feature allows.

A useful audit is to look at each `"use client"` file and ask what it actually needs the client for. If the answer is one button, the boundary should wrap one button, not the page that contains it.

The audit has a real world payoff that shows up in bundle size. Imagine a page where the only interactive element is a like button at the bottom of an article. If the `"use client"` directive sits on the page component, the entire article rendering, the markdown parser, the syntax highlighter, and every helper they import all land in the client bundle for the sake of one button. Push the boundary down so it wraps only the button, and the article stays on the server as data while the bundle shrinks to the handful of bytes the button actually needs. This is the single most leveraged habit in RSC work: treat `"use client"` as expensive and place it as low as the interactivity allows, using the children composition pattern to keep heavy server rendered content out of the islands. The teams that get large bundles in the App Router are almost always the ones who put one client directive too high and never went back to audit it.

## Practical takeaways

- Read `"use client"` as a boundary in the import graph, not a runtime location. Client Components still render on the server for initial HTML; the directive marks where code joins the bundle.
- Pass data across the boundary, not behavior. Strings, numbers, plain objects, arrays, and Server Components as children serialize cleanly; functions, class instances, and live `Date` objects do not.
- Treat Server Actions as the one sanctioned way to hand a callable across the boundary, because the framework sends a reference rather than an unserializable closure.
- Use the children composition pattern to wrap server rendered content in client interactivity without pulling that content into the bundle.
- Fetch data directly in async Server Components by default, which collapses the fetch, loading state, and error handling into one place that ships zero JavaScript.
- Audit every `"use client"` file for what it truly needs the client for, and push the boundary toward the leaves so interactive islands stay as narrow as the feature allows.

## The model in one sentence

Server Components run once on the server and ship as data, Client Components ship as code and live in the browser, and the boundary between them is a serialization seam you cross deliberately. Hold that sentence steady and the rest of RSC stops feeling like a set of rules to memorize and starts feeling like a system you can reason about.
