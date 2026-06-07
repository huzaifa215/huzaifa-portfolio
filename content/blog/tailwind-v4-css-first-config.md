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

The reason `oklch` is more than a fashionable swap for hex is that it is perceptually uniform, which means equal numeric changes in lightness produce roughly equal changes in how light the color looks to the eye. In the older `hsl` model this was not true: two colors at the same stated lightness but different hues could look dramatically different in brightness, which is why hand built palettes in `hsl` often had a yellow that glared and a blue that sank even though the numbers claimed they matched. With `oklch` you can build a set of accent colors at one lightness and trust they will read as equally prominent, which matters enormously for things like status colors and chart series that need to feel balanced. The practical upshot is that a designer can reason about a palette arithmetically, stepping lightness in even increments to build a ramp, instead of nudging hex values by eye until they look right.

## What the migration actually involves

The upgrade path is more mechanical than scary. The official upgrade tool handles most of the rote work, but it helps to know the shape of the changes so you can review them with confidence.

First, your `@tailwind` directives collapse into a single `@import "tailwindcss"`. Second, your theme values move from the JavaScript object into an `@theme` block as custom properties, with the naming convention mapping to utility namespaces. Third, a handful of utilities were renamed or had their defaults adjusted, and some opacity and shadow behaviors changed. Review those rename changes carefully, because they are the most likely source of subtle visual drift.

The piece that catches teams off guard is custom utilities and plugins. If you wrote JavaScript plugins, you will reimplement most of them as plain CSS with the new `@utility` and `@variant` primitives. For the majority of plugins this is less code, not more, because you are no longer programming against a plugin API to emit CSS that you could just write directly.

The other migration sharp edge worth flagging in advance is the change to how some default values behave, particularly around borders and rings. Defaults that v3 quietly supplied were adjusted in v4, so a border that relied on an implicit default color, or a focus ring that assumed a particular width, can render differently after the upgrade even though your markup did not change. These are not bugs, they are deliberate default changes, but they produce exactly the kind of small visual drift that is hard to spot in a large app and easy to ship by accident. The defensive move is to do the upgrade on a branch and walk the application visually, paying special attention to anything with a border, a ring, or a shadow, rather than trusting that an automated tool plus a passing build means the UI is unchanged. The build does not know what the page is supposed to look like.

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

The two layer split also pays off the day someone asks for a second brand or a high contrast mode, which in a flat single layer system is a miserable retrofit. If your components reference semantic tokens like `--color-background` and `--color-foreground` rather than raw palette values, a new theme is just a new mapping of those semantic names to a different set of raw primitives, applied under a selector. Nothing in the component layer changes, because the components never knew the raw values in the first place. The discipline that makes this work is keeping the boundary strict: components and utilities consume semantic tokens only, and the raw palette stays an implementation detail of the semantic layer. The moment a component reaches past the semantic layer and hardcodes a raw gray, you have created a place the new theme cannot reach, and those leaks are exactly what turn a theming task into a hunt through the whole codebase.

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

## Practical takeaways

- Treat the move to `@theme` as a relocation of the source of truth into CSS, not just a syntax change. Your tokens become real custom properties usable by utilities, hand written CSS, and inline styles with no duplication.
- Adopt `oklch` for its perceptual uniformity, which lets you build ramps and balanced accent sets by stepping lightness arithmetically instead of nudging hex by eye.
- Run the official upgrade tool, but review the utility rename and default changes by hand, walking the app visually with attention to borders, rings, and shadows where drift hides.
- Reimplement JavaScript plugins as plain CSS with `@utility` and `@custom-variant`. For most plugins this is less code, because you stop programming against an API to emit CSS you can write directly.
- Split tokens into raw palette primitives and semantic tokens that reference them, so theming is a remapping of the semantic layer rather than a sweep of overrides.
- Start new projects on v4 immediately, and schedule large v3 migrations as a focused, reviewed effort rather than a casual afternoon.
