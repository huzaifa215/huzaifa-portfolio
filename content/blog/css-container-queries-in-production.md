---
title: "CSS Container Queries in Production"
date: "2026-04-20"
excerpt: "Container queries let components respond to their own size, not the viewport. How to adopt them safely and where they replace media queries."
category: "CSS"
tags: ["container-queries", "css", "responsive-design", "components"]
slug: "css-container-queries-in-production"
draft: false
---

Media queries answer the question how wide is the viewport. For a long time that was the only question CSS could ask about size, which is why responsive design has always been slightly wrong. A card does not care how wide the window is. It cares how much room it has been given. Container queries finally let a component ask that question, and the result is genuinely reusable responsive components.

## The problem with viewport based responsiveness

Consider a product card. In a three column grid it is narrow, so you want a stacked layout. In a sidebar it is also narrow. In a full width hero it is wide, so you want a horizontal layout. With media queries you cannot express this, because the breakpoint depends on the viewport, not on the card's actual width. The same card at the same viewport width needs different layouts depending on where it sits.

The usual workaround was to pass layout variants as props or modifier classes, so the parent had to know how to lay out the child. That couples the component to its context and defeats the point of a reusable component.

> A media query asks about the window. A container query asks about the space the component was actually given. Only the second question produces a component that is responsive anywhere you drop it.

## The mechanics

You designate an element as a container, then write queries against that container's size. Children inside the container respond to the container's width rather than the viewport's.

```css
.card-grid {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: grid;
  gap: 1rem;
}

@container card (min-width: 28rem) {
  .card {
    grid-template-columns: 8rem 1fr;
  }
}
```

The `container-type: inline-size` establishes a containment context measured along the inline axis. The `@container` rule then applies when that container is at least `28rem` wide, regardless of the viewport. Place this card in a narrow column and it stacks. Place it in a wide region and it goes horizontal. The card's own CSS decides, with no help from the parent.

## Container query units

Container queries also bring length units relative to the container, such as `cqi` for one percent of the container's inline size. These let you scale typography and spacing to the component rather than the viewport, which is the missing piece for truly self contained components.

```css
.card h3 {
  font-size: clamp(1rem, 4cqi, 1.5rem);
}
```

The heading now scales with the card. A small card gets a small heading, a large card gets a large one, and the viewport never enters the calculation.

## Adopting them without breaking things

Container queries are well supported in current browsers, but production adoption still benefits from a deliberate posture. Treat them as a progressive enhancement layer where you can. A component that has a sensible default layout and then refines it inside `@container` rules degrades gracefully if a query does not apply, because the base styles still hold.

The one gotcha worth internalizing is that an element cannot query itself. The container must be an ancestor of the elements that respond to it. In practice this means wrapping the component in a container element, which is a small structural cost. Establish the container on a wrapper, write the component's responsive rules against it, and the component becomes portable.

## Where they replace media queries, and where they do not

Container queries replace media queries for component level responsiveness: cards, panels, widgets, anything that should adapt to its slot. They do not replace media queries for page level concerns. The overall page layout, the decision to show or hide a sidebar, and the global navigation pattern are genuinely about the viewport, and media queries remain the right tool there.

A clean architecture uses both in their proper roles. Media queries shape the page skeleton. Container queries make the components inside that skeleton adapt to wherever they land. The two compose well, and the result is a system where you can move a component from the main column to the sidebar and it simply looks right without anyone touching its code.

## A practical migration path

If you have an existing component library built on viewport breakpoints, you do not need to rewrite it all at once. Start with the components that are reused across contexts of different widths, because those are where the viewport assumption hurts most. Wrap them in a container, replace their internal media queries with container queries, and delete the layout props the parent used to pass. Each one you convert becomes a component you can place anywhere without thinking, which is the whole promise of a component library finally delivered.

Container queries are one of those rare CSS features that fix a problem you had learned to live with. Once you build a component that adapts to its own space, the old way of threading layout variants from the parent feels like the workaround it always was.
