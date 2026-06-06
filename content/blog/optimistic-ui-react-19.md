---
title: "Optimistic UI Patterns in React 19"
date: "2026-03-21"
excerpt: "How useOptimistic and the new form actions change optimistic updates in React 19, with patterns for rollback and reconciliation that hold up."
category: "React"
tags: ["react-19", "useOptimistic", "optimistic-ui", "server-actions"]
slug: "optimistic-ui-react-19"
draft: false
---

Optimistic UI is the technique of showing the result of an action before the server confirms it. Click like and the heart fills instantly, even though the request is still in flight. Done well it makes an app feel weightless. Done badly it lies to the user and then snaps back when the server disagrees. React 19 ships a primitive, `useOptimistic`, that makes the good version much easier to build correctly.

## Why optimistic updates are hard

The difficulty was never showing the optimistic state. It was reconciling it. You apply a temporary change, fire the request, and then you have to handle three outcomes: success, failure, and the arrival of fresh server data that may differ from your guess. Hand rolling this with `useState` means manually tracking pending items, remembering the previous value for rollback, and merging server truth back in. It is fiddly and easy to get subtly wrong.

> Optimistic UI is not about showing a fake state. It is about showing a likely state and having a disciplined plan for when reality arrives.

## What useOptimistic gives you

`useOptimistic` lets you derive an optimistic view of state from a base value plus pending changes. The key insight in its design is that the optimistic state is temporary by construction. When the surrounding transition completes, React discards the optimistic value and falls back to the real state. You never manually roll back, because the optimistic layer was never the source of truth.

```tsx
"use client";

import { useOptimistic } from "react";

function MessageList({ messages, sendMessage }) {
  const [optimistic, addOptimistic] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      { id: "temp", text: newMessage, pending: true },
    ]
  );

  async function action(formData: FormData) {
    const text = formData.get("text") as string;
    addOptimistic(text);
    await sendMessage(text);
  }

  return (
    <form action={action}>
      <ul>
        {optimistic.map((m) => (
          <li key={m.id} style={{ opacity: m.pending ? 0.5 : 1 }}>
            {m.text}
          </li>
        ))}
      </ul>
      <input name="text" />
    </form>
  );
}
```

The `optimistic` array shows the new message immediately, dimmed to signal it is pending. When `sendMessage` resolves and the real `messages` prop updates, React drops the optimistic entry and the real one takes its place. If the action throws, the optimistic state is discarded and you are back to the confirmed list. No manual rollback code exists, because none is needed.

## The reconciliation model

The mental model is a base state plus a reducer that layers pending changes on top. The base state is your real data, usually coming from the server. The reducer describes how an in flight change should look. React keeps the optimistic projection alive only for the duration of the transition that triggered it. This is why it composes so well with Server Actions: the action defines the boundary of the transition, and the optimistic state lives exactly as long as the action is pending.

## Handling failure honestly

Optimistic UI raises a real product question: what happens when the action fails. The pessimistic answer of doing nothing optimistic is safe but feels slow. The naive optimistic answer of silently reverting can confuse a user who saw their message appear and then vanish. The honest pattern is to revert and inform. Because `useOptimistic` reverts automatically, your job is the informing part.

```tsx
async function action(formData: FormData) {
  const text = formData.get("text") as string;
  addOptimistic(text);
  try {
    await sendMessage(text);
  } catch {
    setError("Message failed to send. Try again.");
  }
}
```

The optimistic entry disappears when the transition ends, and the error tells the user why. That combination respects both speed and truth.

## Where optimistic UI fits and where it does not

Optimistic updates are ideal for actions that almost always succeed and whose result the client can predict: likes, toggles, adding an item to a list, reordering. They are a poor fit for actions whose outcome the client cannot guess, such as a payment that returns a server generated confirmation, or an operation whose result depends on server side logic you cannot replicate. For those, an honest pending state is better than an optimistic guess you will probably have to correct.

A useful test is to ask whether you can render the success state from information you already have on the client. If yes, optimistic UI is a natural fit. If the success state requires data only the server can produce, showing a pending state and waiting is the more truthful choice.

## Pairing with transitions

`useOptimistic` is designed to live inside a transition, which is also what keeps the interaction responsive. The form `action` prop in React 19 wraps your handler in a transition automatically, which is why the examples above need no explicit `startTransition`. If you trigger an optimistic update outside a form action, wrap it in a transition yourself so React can manage the pending state and the optimistic lifetime together.

## The payoff

React 19 turns optimistic UI from a careful manual dance into a declarative pattern. You describe the base state and how a pending change should look, and React handles the lifetime and the rollback. That shift matters because the manual version was exactly the kind of code that worked in the demo and broke in the edge cases. With the optimistic layer guaranteed to be temporary, you get the weightless feel of instant feedback without the class of bugs that used to come with it.
