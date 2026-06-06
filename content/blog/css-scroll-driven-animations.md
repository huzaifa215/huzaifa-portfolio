---
title: "CSS Scroll Driven Animations Without JavaScript"
date: "2026-02-13"
excerpt: "Scroll timelines and view timelines let the browser run scroll animations off the main thread. How they work and where they replace JavaScript."
category: "CSS"
tags: ["scroll-driven-animations", "css", "performance", "scroll-timeline"]
slug: "css-scroll-driven-animations"
draft: false
---

For years, any animation tied to scroll position meant JavaScript. You listened to the scroll event, read the scroll position, did some math, and updated styles, all on the main thread, all fighting for the same budget as everything else the page needed to do. Scroll driven animations move that entire pattern into CSS, where the browser can run it off the main thread. The result is smoother animations and a lot less code.

## The problem with scroll listeners

The traditional approach has a structural flaw. Scroll events fire rapidly, your handler runs on the main thread, and the work it does, reading layout and writing styles, is exactly the kind of work that causes jank when the main thread is busy. Even with throttling and `requestAnimationFrame`, you are coupling a visual effect to the responsiveness of your JavaScript. On a loaded page, the animation stutters precisely when the page is under stress.

> A scroll listener ties your animation's smoothness to your main thread's free time. Scroll driven animations cut that cord and let the compositor run the effect regardless of what your JavaScript is doing.

## Two timelines, two use cases

CSS scroll driven animations introduce two new kinds of timeline. A scroll timeline maps an animation's progress to how far a scroll container has been scrolled. A view timeline maps progress to an element's position as it moves through the viewport. They cover the two things people actually build: effects driven by overall scroll position, like a reading progress bar, and effects driven by an element entering the viewport, like a reveal as a card scrolls into view.

A reading progress bar is the canonical scroll timeline example.

```css
@keyframes grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.progress-bar {
  transform-origin: left;
  animation: grow linear;
  animation-timeline: scroll(root block);
}
```

There is no JavaScript here at all. The `scroll(root block)` timeline ties the animation's progress to the document's vertical scroll, so the bar fills as the user reads. The browser runs it on the compositor, so it stays smooth no matter what else is happening.

## View timelines for reveal effects

The more common UI need is revealing elements as they enter the viewport. A view timeline drives an animation based on a subject's progress through the scroll port, and the `animation-range` lets you say which part of that traversal the animation should span.

```css
@keyframes reveal {
  from { opacity: 0; transform: translateY(2rem); }
  to { opacity: 1; transform: translateY(0); }
}

.card {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

The `view()` timeline tracks each card as it crosses the viewport, and the range says animate across the entry phase, from when the card first appears to when it has fully entered. This replaces the typical intersection observer plus class toggling pattern entirely, with no JavaScript and no observer to manage.

## The progressive enhancement story

The right way to ship these today is as enhancement. Scroll driven animations are well supported in current browsers and are designed to fail gracefully. A browser that does not understand `animation-timeline` simply ignores it, so you want your base state to be the resolved, visible state, with the animation as a layer on top. Done this way, users on older browsers see the content in its final form rather than stuck in the animation's starting state.

```css
.card {
  opacity: 1; /* visible by default, so non supporting browsers are fine */
}

@supports (animation-timeline: view()) {
  .card {
    animation: reveal linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
}
```

Wrapping the animation in an `@supports` query and keeping the element visible by default means you never trap content behind an effect a browser cannot run.

## Respecting reduced motion

Because these are real animations, they fall under the same accessibility obligation as any other motion. Users who request reduced motion should not be subjected to scroll triggered movement. The clean approach is to gate the animation behind a media query so it only applies for users who have not asked motion to be reduced.

```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .card { animation: reveal linear both; animation-timeline: view(); }
  }
}
```

## Where they replace JavaScript and where they do not

Scroll driven animations replace the large category of scroll position effects: progress indicators, parallax, reveal on scroll, scroll linked color shifts, sticky header transitions. Anything whose progress is a pure function of scroll position is a candidate, and moving it to CSS is almost always a win in both performance and code size.

They do not replace effects that need logic beyond scroll position, such as animations that depend on application state, that trigger side effects, or that require complex sequencing tied to events other than scroll. For those, JavaScript is still the tool. The point is not to eliminate JavaScript but to stop using it for the large, common class of effects that are really just a mapping from scroll position to style.

## The takeaway

Scroll driven animations let the browser do what it is good at, running visual effects on the compositor, and free your main thread for the work only JavaScript can do. For the many UI effects that are simply tied to scroll position, they are less code, smoother motion, and better behavior under load. Adopt them as progressive enhancement, gate them behind reduced motion, and you get a meaningful upgrade for free on the browsers that support them with no penalty on the ones that do not.
