---
title: "Server Actions vs Route Handlers: When to Use Which"
date: "2026-03-03"
excerpt: "Both run server code in Next.js, but they solve different problems. A clear decision framework for mutations, APIs, and everything in between."
category: "Architecture"
tags: ["server-actions", "route-handlers", "nextjs", "api-design"]
slug: "server-actions-vs-route-handlers"
draft: false
---

Next.js gives you two ways to run server code in response to something the client does: Server Actions and Route Handlers. Because both execute on the server and both can perform mutations, teams often pick by habit rather than by fit. They solve genuinely different problems, and choosing well makes a codebase cleaner while choosing poorly creates friction you feel for the life of the project.

## What each one is

A Route Handler is an HTTP endpoint. It lives at a URL, responds to methods like GET and POST, receives a `Request`, and returns a `Response`. It is the familiar API primitive, just colocated in your app directory.

A Server Action is a function that runs on the server but is called like a function from your components. You do not construct a URL or a fetch call. You define an async function with the `"use server"` directive, pass it to a form or call it from a client component, and Next.js handles the transport. It is designed specifically for mutations driven by your own UI.

> A Route Handler is a public door anyone can knock on with the right request. A Server Action is a private hallway inside your own building. The question is usually whether the caller is your UI or the outside world.

## The case for Server Actions

Server Actions shine for mutations that originate in your own application: submitting a form, toggling a setting, deleting a record, anything where your component needs to change server state and then reflect the result. They integrate with forms natively, they compose with optimistic UI, and crucially they tie into the framework's revalidation so the page updates after the mutation without a manual refetch.

```tsx
async function createPost(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  await db.post.create({ data: { title } });
  revalidatePath("/blog");
}

export function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Publish</button>
    </form>
  );
}
```

There is no endpoint, no fetch, no client side error plumbing for the happy path. The form calls the action, the database mutates, `revalidatePath` refreshes the affected route, and the UI reflects the change. This is dramatically less code than the equivalent endpoint plus client fetch plus cache invalidation.

The piece that is easy to undervalue until you have lived with both approaches is the revalidation integration. In the Route Handler world, after a successful mutation you are responsible for telling the client something changed: refetching the affected query, invalidating a cache key, or reloading the route. That coordination between the write and the subsequent read is where a lot of subtle staleness bugs live, because it is easy to mutate the server and forget to refresh one of the three places the old value is cached. A Server Action collapses the write and the cache invalidation into one server side step. The `revalidatePath` call runs in the same function as the database write, so they cannot drift apart, and the page that depended on the data re-renders with fresh content automatically. You are not just writing less code, you are removing the seam where write and read consistency used to break.

## The case for Route Handlers

Route Handlers are the right tool when the caller is not your own React UI, or when you need the full shape of an HTTP response. Reach for them when you are building a public API that third parties or mobile apps consume, when you receive webhooks from external services, when you need precise control over headers, status codes, streaming responses, or content types, and when something other than a React component needs to call you.

```ts
export async function POST(request: Request) {
  const signature = request.headers.get("x-webhook-signature");
  if (!verify(signature, await request.text())) {
    return new Response("Invalid signature", { status: 401 });
  }
  await processEvent(/* ... */);
  return Response.json({ received: true });
}
```

A webhook needs to read raw headers, verify a signature, and return specific status codes. That is exactly what a Route Handler is for and exactly what a Server Action is not designed to do.

The deeper reason a webhook cannot be a Server Action is that the caller is not your UI and does not speak your framework's private transport. Stripe, GitHub, and every other external service that calls you knows how to make an HTTP POST to a URL with a specific body and headers. It does not know, and should not need to know, about the internal mechanism Next.js uses to invoke a Server Action. The same is true of a mobile app, a partner integration, or a cron job hitting an endpoint. The moment the caller lives outside your React tree, you need a real, addressable, versioned HTTP surface, and that surface has to expose the full vocabulary of the protocol: status codes that mean something, headers you can read and set, and a body shape you control precisely. Those are exactly the levers a Route Handler gives you and a Server Action deliberately hides.

## The decision framework

The question that resolves most cases is who calls this and what do they need back. If the caller is your own UI and it is performing a mutation that should update the page, use a Server Action. If the caller is external, or you need an addressable URL, or you need fine control over the HTTP response, use a Route Handler.

A few concrete examples make the line clear. A settings toggle in your dashboard is a Server Action. A public REST API for partners is Route Handlers. A contact form on your site is a Server Action. A Stripe webhook is a Route Handler. An internal form that creates a record and refreshes a list is a Server Action. An endpoint that returns JSON to a separate mobile client is a Route Handler.

## Where people get it wrong

The common mistake in both directions is using the wrong tool out of habit. Teams coming from a traditional backend build Route Handlers for every internal mutation, then hand write fetch calls and cache invalidation in their components, reinventing what Server Actions give for free. Teams overcorrecting reach for Server Actions to build what is really a public API, then fight the abstraction because Server Actions are not meant to be a stable external contract.

Server Actions are not a public API surface. They are an internal mechanism for your UI to mutate state. If you need a versioned, documented, externally consumed contract, that is a Route Handler, full stop.

## A note on security

Both run on the server, so both must validate their inputs and check authorization. A Server Action is not safe just because it is called from your component, because the action endpoint still exists and can be invoked. Validate the input and check the user's permissions inside the action exactly as you would inside a handler. The convenience of calling it like a function does not exempt it from being a server boundary.

This point is worth dwelling on because the syntax actively encourages the wrong intuition. A Server Action reads like a local async function call, so it feels like trusted internal code the way a private method on a class feels trusted. It is not. Under the hood the framework exposes an endpoint that accepts the action's arguments, and anyone who can read your client bundle can craft a request to it directly with whatever payload they like. They do not have to go through your form, your validation, or your disabled submit button. The mental correction is to treat every Server Action as if its first line received `unknown` data from a hostile caller, because in the worst case it did. Parse the input with a schema, confirm the current user is allowed to perform this mutation on this resource, and only then touch the database. The ergonomics are a convenience for your UI, not a security boundary, and conflating the two is how an internal looking toggle becomes an unauthenticated mutation endpoint.

## Practical takeaways

- Choose by asking who calls this and what they need back. Your own UI performing a mutation that should refresh the page points to a Server Action; an external caller or a need for full HTTP control points to a Route Handler.
- Use Server Actions for form submissions, toggles, deletes, and similar UI driven mutations, where native form integration, optimistic UI, and `revalidatePath` remove a pile of boilerplate.
- Use Route Handlers for public APIs, webhooks, mobile clients, and anything needing precise control over headers, status codes, streaming, or content type.
- Do not build a public, versioned, externally consumed contract out of Server Actions. That is a Route Handler, because Server Actions are an internal mechanism, not a stable API surface.
- Validate input and check authorization inside every Server Action exactly as you would in a handler, because the action endpoint is reachable by hostile callers regardless of how your UI calls it.
- Avoid choosing by habit. Reinventing fetch and cache invalidation around Route Handlers, or stretching Server Actions into an external API, are the two failure modes that create lasting friction.

## The takeaway

Use Server Actions for mutations driven by your own UI, where their integration with forms, optimistic updates, and revalidation removes a pile of boilerplate. Use Route Handlers when the caller is external or you need the full expressiveness of an HTTP response. Decided by who calls and what they need, the choice is usually obvious, and making it deliberately keeps your data layer clean instead of a mix of two patterns fighting each other.
