---
title: "How I Set Up My Cybersecurity Home Lab for Free"
date: "2025-01-20"
excerpt: "You don't need expensive hardware to start practicing ethical hacking. Here's my exact setup."
category: "Cybersecurity"
tags: ["homelab", "cybersecurity", "kali-linux", "learning"]
slug: "setting-up-home-lab-cybersecurity"
draft: false
---

The single biggest accelerator in my security learning wasn't a course — it was building a home lab. Reading about an attack teaches you the words; running it (and defending against it) teaches you the thing. The good news: you can build a capable lab for free on hardware you already own.

## Why a home lab matters

Security is a practical discipline. You can memorize the OWASP Top 10, but until you've actually exploited a vulnerable app and watched the payload land, it stays abstract. A lab gives you a safe, legal place to break things, take notes, and build intuition without touching systems you don't own.

## The hardware (nothing special)

I started on a modest laptop — 16GB of RAM, a regular SSD, no GPU worth mentioning. That's enough to run a couple of virtual machines side by side, which is all you need at the beginning. If you only have 8GB, you can still run one VM at a time. Don't let hardware be the excuse.

## Virtualization with VirtualBox

VirtualBox is free and cross-platform. Install it, then create an internal/host-only network so your lab VMs can talk to each other but stay isolated from your home network. This isolation matters — you're going to be running malicious tools on purpose.

## Installing Kali Linux

Kali is the standard offensive distro and ships with most of the tools you'll want. Download the official VirtualBox image, import it, give it 2-4GB of RAM, and you have an attacker box ready to go. Pair it with a deliberately vulnerable target like Metasploitable or a vulnerable web app (DVWA, Juice Shop) and you have a complete attack-and-defend sandbox.

## Practice platforms

You don't even have to build every target yourself. TryHackMe is the friendliest on-ramp — guided rooms that walk you from "what is a port" to real exploitation. HackTheBox is less hand-holding and more rewarding once you have the basics. Both have generous free tiers, and both are where I spent most of my early hours.

## My first machines

The first boxes I rooted were the beginner-friendly ones — the kind with a known service, an obvious foothold, and a clear privilege-escalation path. They feel easy in hindsight, but each one taught a concrete loop: enumerate, find the weakness, exploit, escalate, document. That loop is the whole job in miniature.

## Tools I reach for daily

- **Nmap** — the first thing I run against any target, to map open ports and services.
- **Wireshark** — when I need to actually see what's crossing the wire.
- **Burp Suite** (Community Edition) — for intercepting and tampering with web traffic.

## Tips for beginners

Take notes obsessively — your future self will thank you. Don't skip the fundamentals to chase flashy exploits. And stay strictly legal: only ever attack systems you own or are explicitly authorized to test. A home lab exists precisely so you never have to cross that line to learn.

Start small, stay consistent, and let curiosity drive. The lab turns reading into reflexes.
