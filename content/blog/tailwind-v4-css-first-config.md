---
title: "Migrating to Tailwind CSS v4 and the CSS First Config"
date: "2026-05-10"
excerpt: "Tailwind v4 moves configuration into CSS with the theme directive. What changes, what the migration looks like, and how tokens get simpler."
category: "CSS"
tags: ["tailwind-v4", "css-first-config", "design-tokens", "oklch"]
slug: "tailwind-v4-css-first-config"
draft: false
---

Tailwind CSS v4 is the largest rethink the project has shipped, and the headline is that configuration moves out of a JavaScript file and into your CSS. If you have spent years editing `tailwind.config.js`, the new approach feels strange for about an hour and then feels obviously correct.

## The shift to CSS first

In v3, your design tokens lived in a JavaScript object that a build step compiled into utility classes. In v4, you declare them directly in CSS using the `@theme` directive. Your tokens become CSS custom properties that the engine reads to generate utilities, and they are also available as plain variables at runtime.

```css
@import "tailwindcss";

@theme {
  --color-background: oklch(0.16 0.006 265);
  --color-foreground: oklch(0.97 0.004 265);
  --color-accent: oklch(0.66 0.18 264);
  --radius-xl: 1rem;
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
}
```

Those declarations generate `bg-background`, `text-foreground`, `bg-accent`, `rounded-xl`, and `font-sans` automatically. There is no JavaScript config file in the picture. The source of truth for your design system is now CSS, which is where it arguably always belonged.

> The win is not that you write less config. It is that your tokens are real CSS variables, usable by Tailwind utilities and by hand written CSS and inline styles alike, with no duplication.

## oklch as a default worth adopting

v4 leans into modern color, and `oklch` is the format I now reach for. It describes color as lightness, chroma, and hue, which makes it far easier to build a coherent palette. Want a slightly darker accent for a hover state? Lower the lightness and leave chroma and hue alone. The relationship between related colors becomes arithmetic instead of guesswork.

```css
@theme {
  --accent: oklch(0.66 0.18 264);
}

.button:hover {
  background: oklch(from var(--accent) calc(l - 0.06) c h);
}
```

The `from` syntax lets you derive a color from another by adjusting individual channels, which keeps a palette internally consistent as it grows.

## What the migration actually involves

The upgrade path is more mechanical than scary. The official upgrade tool handles most of the rote work, but it helps to know the shape of the changes so you can review them with confidence.

First, your `@tailwind` directives collapse into a single `@import "tailwindcss"`. Second, your theme values move from the JavaScript object into an `@theme` block as custom properties, with the naming convention mapping to utility namespaces. Third, a handful of utilities were renamed or had their defaults adjusted, and some opacity and shadow behaviors changed. Review those rename changes carefully, because they are the most likely source of subtle visual drift.

The piece that catches teams off guard is custom utilities and plugins. If you wrote JavaScript plugins, you will reimplement most of them as plain CSS with the new `@utility` and `@variant` primitives. For the majority of plugins this is less code, not more, because you are no longer programming against a plugin API to emit CSS that you could just write directly.

## Performance and the new engine

v4 ships a rewritten engine that is dramatically faster on incremental builds, which matters most in large projects where the old build step was a noticeable part of the feedback loop. The engine also does full content detection automatically in most setups, so the explicit content globbing you used to maintain becomes unnecessary. One less array to keep in sync with your file structure.

## A token strategy that scales

The pattern I now use is to define raw tokens and semantic tokens in two layers. Raw tokens are the palette primitives. Semantic tokens describe intent and reference the raw ones. This keeps theming clean, because a dark mode is a different mapping of semantic tokens to raw values rather than a sweep of overrides.

```css
:root {
  --gray-950: oklch(0.16 0.006 265);
  --gray-50: oklch(0.97 0.004 265);
}

@theme {
  --color-background: var(--gray-950);
  --color-foreground: var(--gray-50);
}
```

Because everything is a CSS variable, switching themes is a matter of reassigning the semantic layer under a selector or media query, with no rebuild and no class soup.

## Variants and the new composability

One change that rewards a second look is how custom variants work. In v4 you can define a variant in CSS and apply it across utilities without writing a plugin, which makes project specific states like a data attribute driven theme or a parent state straightforward to express. The mental model is that a variant is a transformation of a selector, and you now declare that transformation in the same place you declare everything else, your CSS, rather than in a separate JavaScript configuration that compiled into it.

```css
@custom-variant pointer-coarse (@media (pointer: coarse));

.button {
  padding: 0.5rem 1rem;
}

.button:pointer-coarse {
  padding: 0.75rem 1.25rem;
}
```

This keeps related concerns together. The utility, the variant, and the token it references all live in CSS, and a developer reading the stylesheet sees the whole picture without jumping into a build configuration file to understand why a class behaves the way it does. For teams, that colocation ends up reducing the number of places a newcomer has to learn before they can be productive in the styling layer.

## Should you migrate now

If you are starting a new project, begin on v4 without hesitation. If you maintain a large v3 codebase, plan the migration as a focused effort rather than a casual afternoon, run the upgrade tool, and budget real time for reviewing the utility rename changes and reimplementing plugins. The end state is a simpler mental model: your design system is CSS, your tokens are variables, and the build is faster. That is a trade worth making.
