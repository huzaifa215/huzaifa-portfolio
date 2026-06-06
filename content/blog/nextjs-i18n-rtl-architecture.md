---
title: "i18n Architecture in Next.js for RTL and Multi Locale Apps"
date: "2026-04-02"
excerpt: "Designing internationalization in the App Router: locale routing, message loading, and getting right to left layout correct from the start."
category: "Architecture"
tags: ["i18n", "rtl", "app-router", "localization"]
slug: "nextjs-i18n-rtl-architecture"
draft: false
---

Internationalization is one of those features that is cheap to add early and brutally expensive to retrofit. The difference is architectural. If locale is a first class concept in your routing and layout from the start, supporting a new language is a content task. If it is bolted on later, every hardcoded string and every left aligned assumption becomes a bug. This is especially true for right to left languages, which expose layout assumptions you did not know you had.

## Locale as a routing concern

In the App Router, the clean approach is to make locale a segment of the URL. A dynamic `[locale]` segment at the root means every page knows its locale from the route, and the URL itself is shareable and crawlable per language.

```
app/
  [locale]/
    layout.tsx
    page.tsx
    blog/
      page.tsx
```

The locale segment gives each language a distinct, indexable URL space, which matters for SEO because search engines can serve the right language version and understand the relationship between them through `hreflang` annotations.

```tsx
export async function generateStaticParams() {
  return ["en", "ar", "fr"].map((locale) => ({ locale }));
}
```

Pre generating the locales you support keeps the localized pages static and fast, rather than computing them per request.

## Loading messages without bloating the bundle

The naive approach ships every translation to every user. That wastes bandwidth and grows with each new language. The better pattern loads only the active locale's messages, and on the server where possible, so translation data does not bloat the client bundle.

```tsx
async function getMessages(locale: string) {
  return (await import(`@/messages/${locale}.json`)).default;
}

export default async function LocaleLayout({ params, children }) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  return (
    <html lang={locale} dir={dirForLocale(locale)}>
      <body>
        <IntlProvider messages={messages} locale={locale}>
          {children}
        </IntlProvider>
      </body>
    </html>
  );
}
```

Notice two things on the `html` element: `lang` is set so assistive technology and search engines know the language, and `dir` is set so the entire document flips for right to left locales. Those two attributes are the foundation everything else builds on.

## Right to left is a layout discipline, not a CSS hack

The mistake teams make with right to left support is treating it as a per component override. The durable approach is to write direction agnostic CSS from the start using logical properties. Instead of `margin-left`, use `margin-inline-start`. Instead of `left`, use `inset-inline-start`. These properties resolve to the correct physical side based on the document direction automatically.

```css
.card {
  padding-inline-start: 1rem;
  border-inline-start: 2px solid var(--accent);
  text-align: start;
}
```

When `dir` flips to right to left, this card's padding, border, and text alignment all move to the correct side with no media query and no direction specific class. Logical properties are the single highest leverage habit for making a codebase bidirectional, because they make the right thing the default.

> The goal is a codebase where supporting a right to left language requires changing the `dir` attribute and nothing else. Every place you wrote a physical direction is a place that goal leaks.

## Formatting is part of localization

Translation is only half the job. Numbers, dates, currencies, and plurals differ by locale in ways that are easy to get subtly wrong. Lean on the platform's `Intl` APIs rather than hand rolling formatters, because they encode an enormous amount of locale specific knowledge you do not want to reimplement.

```ts
const formatted = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "USD",
}).format(amount);

const date = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(d);
```

Plurals deserve special care, because the simple English distinction between one and many does not hold in many languages. A proper message format with plural rules handles this correctly per locale instead of producing grammatically broken strings.

## Detecting and respecting the user's locale

When a user arrives without a locale in the URL, you choose one for them. The respectful default is to read the `Accept-Language` header, match it against your supported locales, and redirect to the best fit, while always letting the user override and remembering that choice. Middleware is the right place for this, because it runs before the page and can redirect cleanly.

## Testing the bidirectional layout

The discipline of logical properties only holds if someone checks it, because a single physical property slips in easily and goes unnoticed in the default direction. The cheapest safeguard is to run the app in a right to left locale regularly, not as a final pass but as part of normal development. A layout bug in right to left is almost always a place where a physical property was used, so the visual review doubles as a lint for the habit.

It helps to keep a representative right to left locale wired up from the first week of the project even before you have real translations for it, using pseudo localized strings if needed. A locale that exercises right to left layout and longer translated strings surfaces two of the most common internationalization bugs early: direction sensitive layout and text that overflows because the design was sized around short English copy. Both are far cheaper to fix while the components are young than after they have been copied into a dozen screens.

## The payoff

When locale lives in the route, messages load per language, layout uses logical properties, and formatting goes through `Intl`, adding a language becomes a content task: provide a translation file and add the locale to your list. That is the whole point of treating i18n as architecture. The expensive work happens once, in the structure, and every new market after that is cheap. The teams that get burned are the ones who treated the first language as the only language, and discovered every assumption baked into that choice the day they tried to add the second.
