---
title: "Building an Accessible Command Palette from Scratch"
date: "2026-04-14"
excerpt: "A command palette is a focus and keyboard problem before it is a search problem. How to build one that screen readers and keyboards handle correctly."
category: "Accessibility"
tags: ["accessibility", "command-palette", "keyboard-navigation", "aria"]
slug: "building-accessible-command-palette"
draft: false
---

The command palette has become a signature interaction of well crafted web apps. Press a shortcut, a dialog appears, you type, and you navigate the whole product with the keyboard. It looks simple, which is exactly why so many implementations are quietly broken for keyboard and screen reader users. A command palette is a focus management and keyboard problem first, and a search problem second.

## The accessibility contract

Before writing a line of filtering logic, get the semantics right. A command palette is a modal dialog containing a combobox that controls a list of options. That sentence maps directly onto ARIA roles, and getting the roles right is most of the battle.

The container is a dialog. The input is a combobox that owns the list via `aria-controls` and announces the active option via `aria-activedescendant`. The results are a listbox of options. Screen readers understand this pattern, so honoring it means assistive technology describes the palette correctly without custom announcements.

> The hardest part of a command palette is not search. It is making sure that focus, the active option, and the announced state never disagree with each other.

## Focus management is the foundation

When the palette opens, focus must move into the input. When it closes, focus must return to wherever it was before, or the user is dumped at the top of the page with no idea where they are. While it is open, focus must be trapped inside the dialog so Tab does not wander into the page behind it.

```tsx
useEffect(() => {
  if (!open) return;
  const previouslyFocused = document.activeElement as HTMLElement | null;
  inputRef.current?.focus();
  return () => previouslyFocused?.focus();
}, [open]);
```

This captures the previously focused element on open and restores it on close. It is a small effect that fixes one of the most common and most disorienting bugs in custom dialogs.

## The roving active option pattern

Here is the subtle part. In a command palette, keyboard focus stays in the input the entire time, because the user is typing. The arrow keys do not move DOM focus. Instead they move a virtual highlight through the list, and you tell assistive technology which option is active using `aria-activedescendant` on the input.

```tsx
<input
  role="combobox"
  aria-expanded={results.length > 0}
  aria-controls="cmd-listbox"
  aria-activedescendant={activeId}
  onKeyDown={onKeyDown}
/>
<ul role="listbox" id="cmd-listbox">
  {results.map((item, i) => (
    <li
      key={item.id}
      id={`cmd-option-${item.id}`}
      role="option"
      aria-selected={i === activeIndex}
    >
      {item.label}
    </li>
  ))}
</ul>
```

The input keeps focus, `aria-activedescendant` points at the highlighted option's id, and `aria-selected` marks it visually and semantically. A screen reader announces the active option as the user arrows through, even though DOM focus never left the input.

## Keyboard handling that feels right

The keyboard contract users expect is specific. Arrow down and up move the active option and should wrap or clamp predictably. Enter activates the current option. Escape closes the palette. Home and End jump to the first and last options. Typing filters. Handle these explicitly, and remember to call `preventDefault` on the arrow keys so the input cursor does not also move.

```tsx
function onKeyDown(e: React.KeyboardEvent) {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    setActiveIndex((i) => Math.min(i + 1, results.length - 1));
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    setActiveIndex((i) => Math.max(i - 1, 0));
  } else if (e.key === "Enter") {
    e.preventDefault();
    results[activeIndex]?.action();
  } else if (e.key === "Escape") {
    setOpen(false);
  }
}
```

## Do not forget the open shortcut

The palette is usually opened with a chord. Register it globally, but be a considerate citizen. Do not hijack the shortcut when the user is typing in another input, and make sure there is also a visible, clickable way to open the palette for users who do not know the chord or cannot perform it.

## Announcing results to screen readers

When results change as the user types, a screen reader user benefits from knowing how many results there are. A polite live region that announces the result count keeps them oriented without being noisy.

```tsx
<div role="status" aria-live="polite" className="sr-only">
  {results.length} results
</div>
```

The `aria-live="polite"` setting means the announcement waits for a pause rather than interrupting, which is the right level of urgency for a result count.

## The reduced motion and visual layer

Finally, honor reduced motion preferences for the open and close animation, ensure the active option has a visible highlight with sufficient contrast, and make sure the highlight scrolls into view as the user arrows past the visible area. A keyboard user navigating to an option that is highlighted but off screen is lost in the same way a mouse user would be if the selection were invisible.

## The lesson

A command palette is a showcase of whether a team treats accessibility as structural or cosmetic. Get the dialog semantics, focus trapping, focus restoration, and the active descendant pattern right, and the palette works for everyone with no special cases. Skip them, and you ship a feature that looks impressive in a demo and excludes a meaningful slice of your users the moment they reach for the keyboard.
