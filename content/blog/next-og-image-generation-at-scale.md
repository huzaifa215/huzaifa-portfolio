---
title: "OpenGraph Image Generation with next/og at Scale"
date: "2026-03-09"
excerpt: "Generating dynamic social cards with next/og: how the rendering works, caching strategies, font handling, and keeping it fast across many routes."
category: "Performance"
tags: ["next-og", "opengraph", "edge-runtime", "social-cards"]
slug: "next-og-image-generation-at-scale"
draft: false
---

A good OpenGraph image is the difference between a link that gets clicked when shared and one that gets scrolled past. Generating those images dynamically, one tailored to each page, used to mean running a headless browser or maintaining a separate image service. The `next/og` library collapses that into a function that renders an image from JSX. Using it at scale, across hundreds of pages, takes a little understanding of how it works.

## How next/og actually renders

It is tempting to assume `next/og` runs a browser, but it does not. It uses a library that takes a constrained subset of HTML and CSS expressed as JSX, computes a layout, and rasterizes the result to a PNG. There is no DOM, no JavaScript execution, no full CSS engine. You get flexbox layout, text, images, and a focused set of style properties. That constraint is the source of its speed, because it skips the enormous machinery of a real browser.

The practical consequence is that you write your card with flexbox and inline styles, and you avoid CSS features the renderer does not support. Once you internalize that you are targeting a layout engine and not a browser, the occasional surprise stops being surprising.

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const post = await getPost(params.slug);
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "#0f1115",
          color: "white",
        }}
      >
        <div style={{ fontSize: 28, color: "#818cf8" }}>{post.category}</div>
        <div style={{ fontSize: 64, fontWeight: 600 }}>{post.title}</div>
      </div>
    ),
    { ...size }
  );
}
```

Every style is inline, the layout is flexbox, and the result rasterizes in milliseconds.

> The mental shift that makes next/og click is realizing you are not styling a web page. You are describing a layout to a rasterizer, and the rules of that rasterizer are narrower and stricter than CSS.

## Fonts are the most common stumbling block

The default font is fine for prototypes and wrong for a brand. To use your own typeface you load the font data and pass it to `ImageResponse`. The catch is that the renderer needs the actual font bytes, and it only includes glyphs for the weights and subsets you provide. If your title contains characters outside the loaded subset, they render as blanks.

```tsx
const font = await fetch(new URL("./Geist-SemiBold.ttf", import.meta.url)).then(
  (r) => r.arrayBuffer()
);

return new ImageResponse(<Card title={title} />, {
  ...size,
  fonts: [{ name: "Geist", data: font, weight: 600, style: "normal" }],
});
```

For applications with international content, this is where care pays off. Load a font that covers the scripts your content uses, or you will ship cards with missing glyphs to exactly the users whose language you failed to account for.

## Caching is what makes it scale

Generating an image is cheap per request but not free, and you do not want to regenerate the same card on every share. The right posture is to treat these images as cacheable assets. For pages whose content is stable, the image can be generated once and served from cache thereafter. The route convention integrates with the framework's caching, so a statically known route produces a static image at build time, and a dynamic route can be cached at the edge after first generation.

The lever to reason about is how often the underlying content changes. A blog post card changes only when the post changes, so it should be cached aggressively. A card that embeds live data, such as a current follower count, needs a shorter cache life or it will show stale numbers. Match the cache lifetime to the volatility of the content, and the generation cost amortizes to nearly nothing across all the times the link is shared.

## Designing a card system, not one card

At scale you do not want to hand design a card per route. You want a small set of templates parameterized by content. Build a render function that takes a title, an eyebrow, an optional subtitle, and a few tags, and produces a consistent card. Every route then calls that function with its own content, and the visual system stays coherent without per page effort.

```tsx
export function renderCard({ eyebrow, title, subtitle }) {
  return new ImageResponse(
    <CardLayout eyebrow={eyebrow} title={title} subtitle={subtitle} />,
    { width: 1200, height: 630 }
  );
}
```

This is the same instinct you apply to the rest of your UI: build the system once, feed it data many times. A shared card renderer means a brand refresh is one change, not a hundred.

## Verifying the output

Social platforms cache the images they scrape, so a broken card can persist in a platform's cache even after you fix it. Verify cards before they ship by rendering the route directly and inspecting the PNG, and use the platforms' own debugging tools to force a fresh scrape when you update a template. Catching a layout overflow or a missing glyph before launch is far cheaper than discovering it after the link has been shared and cached widely.

## The summary

`next/og` turns dynamic social cards from an infrastructure project into a render function. The keys to using it well at scale are understanding that it is a constrained layout engine and not a browser, handling fonts deliberately so your brand and your international content render correctly, caching the output in proportion to how often the content changes, and building a small templated card system rather than bespoke cards. Get those right and every page on your site can have a tailored, on brand social image that costs almost nothing to serve.
