---
title: "Framer Motion Layout Animations: A Deep Dive"
date: "2026-05-04"
excerpt: "How the layout prop and shared layout animations work under the hood, why they are smooth, and the pitfalls that cause janky transitions."
category: "React"
tags: ["framer-motion", "layout-animation", "shared-layout", "react"]
slug: "framer-motion-layout-animations"
draft: false
---

Layout animations are the feature that makes Framer Motion feel like magic. You change where an element lives in the DOM, and it glides to its new position instead of snapping. Understanding how that works turns the magic into a tool you can wield deliberately, including knowing when it will betray you.

## The core idea: animate the difference

When you add the `layout` prop to a motion element, Framer Motion does not animate your CSS properties directly. Instead it measures the element's position before the change, lets React commit the new layout, measures again, and then applies a transform that makes the element appear to still be in the old position. It then animates that transform to zero. The element snaps to its final layout instantly, but the transform makes the transition look continuous.

```tsx
<motion.div layout className="card">
  {expanded ? <FullContent /> : <Summary />}
</motion.div>
```

When `expanded` flips, the card's size changes. Framer Motion captures the old and new bounding boxes and animates the visual gap. Crucially it animates with `transform`, which is cheap and runs on the compositor, rather than animating width and height, which would force layout on every frame.

> The reason layout animations are smooth is that they never animate layout properties. They animate a transform that fakes the in between, and that is why they stay at sixty frames per second.

## Shared layout with layoutId

The second pillar is `layoutId`. Two elements that share a `layoutId` are treated as the same element across mounts. When one unmounts and another with the same id mounts, Framer Motion animates from the old element's box to the new one. This is how you build a tab indicator that slides, or a thumbnail that expands into a detail view.

```tsx
{tabs.map((tab) => (
  <button key={tab.id} onClick={() => setActive(tab.id)}>
    {tab.label}
    {active === tab.id && (
      <motion.span layoutId="indicator" className="underline" />
    )}
  </button>
))}
```

Only one indicator exists at a time, but because they share `layoutId="indicator"`, the underline appears to slide from the old tab to the new one. You did not animate position, you just moved which button renders the element, and the shared layout system connected the two.

## The distortion problem and how to correct it

The honest difficulty with layout animations is that animating a transform to fake a size change can distort children. If a card grows and you scale it, the text inside scales too, which looks wrong. Framer Motion handles the common cases by also applying a counter scale to children, but it needs your help in two ways.

First, give animating children their own `layout` prop so they participate in the correction. Second, prefer animating elements whose border radius and content can tolerate the transform. A border radius will visibly warp during a scale unless the element also has `layout`, which tells Framer Motion to keep the radius correct frame by frame.

```tsx
<motion.div layout style={{ borderRadius: 16 }}>
  <motion.h3 layout="position">{title}</motion.h3>
</motion.div>
```

Using `layout="position"` on the heading animates only its position, not its size, which is usually what you want for text that should move but not stretch.

## AnimatePresence is the other half

Shared layout transitions between mounted and unmounted elements need `AnimatePresence` so the exiting element stays in the tree long enough to animate out. Without it, the old element vanishes before the transition can run and you get a pop instead of a glide.

```tsx
<AnimatePresence>
  {selected && (
    <motion.div layoutId={`card-${selected.id}`}>
      <Detail item={selected} />
    </motion.div>
  )}
</AnimatePresence>
```

## The pitfalls that cause jank

A few patterns reliably break layout animations. Animating a layout that changes on every render, such as a list that reorders constantly, fights the measurement cycle and produces stutter. Wrapping a layout animated element in a parent that also transforms can compound transforms in ways that look wrong. And applying `layout` to very large subtrees forces a lot of measurement, which can drop frames on lower end devices.

The defensive habit is to keep layout animated elements as small and self contained as the design allows, and to respect reduced motion preferences so users who opt out get an instant change instead of an animation they did not ask for.

```tsx
const reduce = useReducedMotion();

<motion.div layout transition={reduce ? { duration: 0 } : undefined}>
```

## When it earns its place

Layout animations are not free, and not every state change deserves one. They earn their place when continuity communicates meaning: a list item moving to a new position, a panel expanding, a selected item growing into a detailed view. In those moments the animation is not decoration, it is an explanation of what just changed. Used there, and kept off the high churn parts of your UI, layout animations are one of the highest leverage tools for making an interface feel considered.
