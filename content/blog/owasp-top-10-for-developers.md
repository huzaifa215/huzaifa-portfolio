---
title: "OWASP Top 10 Explained for Developers Who Build APIs"
date: "2025-03-05"
excerpt: "As a developer, you're already halfway to understanding web security. Let me explain OWASP in terms you'll immediately get."
category: "Cybersecurity"
tags: ["owasp", "security", "api", "webdev"]
slug: "owasp-top-10-for-developers"
draft: false
---

The OWASP Top 10 is the industry's consensus list of the most critical web application security risks. It can read like a compliance checklist, but for developers it's something more useful: a catalogue of the exact mistakes we make under deadline pressure. Here are the five most relevant to anyone building APIs, explained as developer mistakes — and how to avoid them.

## 1. Broken Access Control

This is the number-one risk for a reason. It's not exotic; it's forgetting a check.

The mistake: an endpoint like `GET /api/orders/:id` returns the order without verifying it belongs to the requesting user. An attacker just increments the ID and reads everyone's orders.

```js
// Vulnerable
app.get("/api/orders/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

// Fixed — scope to the authenticated user
app.get("/api/orders/:id", async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
  if (!order) return res.status(404).end();
  res.json(order);
});
```

The fix is always authorization checks on the server, on every object, every time. Never trust an ID from the client.

## 2. Cryptographic Failures

In APIs this usually means sensitive data sent or stored without proper protection: tokens in URLs, passwords hashed with something weak (or not at all), TLS not enforced. The fix is boring and effective — enforce HTTPS everywhere, hash passwords with bcrypt/argon2, and never log secrets.

## 3. Injection (SQLi and XSS)

Injection happens when untrusted input is interpreted as code. SQL injection comes from string-concatenated queries; XSS comes from rendering user input as HTML.

```js
// SQL injection waiting to happen
db.query("SELECT * FROM users WHERE email = '" + email + "'");

// Parameterized — input can never become code
db.query("SELECT * FROM users WHERE email = ?", [email]);
```

Use parameterized queries / ORMs, and escape or sanitize anything that reaches the DOM. Frameworks help, but only if you don't `dangerouslySetInnerHTML` your way around them.

## 4. Insecure Design

This one isn't a single bug — it's a missing threat model. It's shipping a password-reset flow with no rate limit, or a "design" that assumes the client will behave. The fix is to ask, at design time, *how would someone abuse this?* and build the guardrails before the feature exists.

## 5. Security Misconfiguration

The classic developer footgun: a `.env` committed to the repo, debug mode on in production, default admin credentials, an S3 bucket set to public, verbose error messages leaking stack traces. None of these are clever attacks — they're doors left open. The fix is disciplined defaults: deny by default, strip error detail in production, and keep secrets out of source control.

## Security is everyone's job

You don't need to become a penetration tester to take these seriously. As a developer you're the first and best line of defense, because you're the one writing the code that gets attacked. Internalize these five and you've closed the doors most attackers walk through.
