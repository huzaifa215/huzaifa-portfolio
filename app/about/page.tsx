import type { Metadata } from "next";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion";
import { profile } from "@/lib/resume";
import {
  principles,
  strengths,
  workingStyle,
  curiosities,
} from "@/lib/about";
import { pageMetadata } from "@/lib/metadata";
import { AboutAvatar } from "@/components/sections/about-avatar";
import { Skills } from "@/components/sections/skills";
import { Journey } from "@/components/sections/journey";
import { Certifications } from "@/components/sections/certifications";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "From building full-stack apps to defending the systems they run on. Learn about Huzaifa's journey, skills, and what he's working on.", keywords: [
      "full stack developer",
      "cybersecurity specialist",
      "incident response",
      "secure SDLC",
      "Canada",
    ],
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden pb-28 pt-28 md:pt-36">
      {/* ── Hero (editorial) ───────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-32">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-2">
              <div className="h-px w-8 bg-[rgba(16, 185, 129,0.5)]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                About Me
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              <span className="text-foreground">Full Stack Developer.</span>
              <br />
              <span className="text-[#34D399]">Now Securing Systems.</span>
            </h1>

            {/* Location + status */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400">
                <MapPin className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                Ontario, Canada
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/[0.05] px-3 py-1.5 text-xs text-emerald-400">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to Work
              </span>
            </div>

            {/* Bio — concise intro (full story lives in the Journey section) */}
            <p className="mt-8 max-w-[480px] text-[15px] leading-[1.8] text-slate-400">
              I&apos;m a full-stack developer and cybersecurity analyst: 4+ years
              building secure, scalable SaaS, and now defending the systems I
              used to build. The throughline is simple ship it well, then
              make sure it holds.
            </p>

            {/* Quick facts */}
            <div className="mt-10 flex items-center gap-5">
              {[
                { value: "4+", label: "Years Full Stack" },
                { value: "12+", label: "Projects Shipped" },
                { value: "1", label: "Goal: Build + Security" },
              ].map((f, i) => (
                <React.Fragment key={f.label}>
                  {i > 0 && <div className="h-8 w-px self-center bg-white/[0.08]" />}
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-foreground">{f.value}</span>
                    <span className="text-xs text-slate-500">{f.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-[#10B981] px-5 py-2.5 text-sm font-semibold text-[#0A1628] transition-all hover:-translate-y-px hover:bg-[#34D399] hover:shadow-[0_4px_12px_rgba(16, 185, 129,0.2)]"
              >
                <Download className="h-4 w-4 shrink-0" strokeWidth={1.5} /> Download CV
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-[rgba(16, 185, 129,0.25)] px-5 py-2.5 text-sm text-[rgba(16, 185, 129,0.8)] transition-all hover:border-[rgba(16, 185, 129,0.45)] hover:bg-[rgba(16, 185, 129,0.06)]"
              >
                View Projects{" "}
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          <AboutAvatar />
        </div>
      </section>

      {/* ── Skills (dual category) ─────────────────────────── */}
      <Skills />

      {/* ── Journey timeline ───────────────────────────────── */}
      <Journey />

      {/* ── Certifications ─────────────────────────────────── */}
      <Certifications />

      {/* ── Narrative ──────────────────────────────────────── */}
      <Section eyebrow="The short version">
        <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
              How the work took shape.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-5 text-lg leading-relaxed text-muted">
            <p>
              I started at OnyxTec, building SocialSquad, a MERN event platform
              that scaled to 50k+ concurrent users, and tuning high-volume
              backends to 90% data integrity. That foundation taught me to own
              a product end to end, not just close tickets.
            </p>
            <p>
              From there I worked across React/TypeScript, Angular and NestJS/Node.js for
              US-based companies, engineering real-time features, analytics
              modules, and secure frontend systems, and earning an Excellence
              Award along the way. The more I shipped, the more I cared about the
              part most teams skip: securing it.
            </p>
            <p className="text-foreground">
              I then earned a Master of Cybersecurity (4.0 GPA) and turned my
              engineering background toward defense: SOC design, incident
              response, and ML-based threat detection. Today I do both. I build
              production software and secure the systems it runs on.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ── Portrait + pull quote ──────────────────────────── */}
      <section className="container-page relative my-20 md:my-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
            />
            <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
              <figure className="px-7 pt-12 md:py-16 md:pl-14 md:pr-0">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">
                  The person behind the work
                </p>
                <blockquote className="mt-6 max-w-xl text-balance text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl">
                  “The best software is built to be defended. You don&apos;t bolt
                  security on at the end - you design for it, so the product just{" "}
                  <span className="text-accent">holds</span>.”
                </blockquote>
                <figcaption className="mt-6 text-sm font-medium text-muted">
                  {profile.name} · {profile.titles[0]}
                </figcaption>
              </figure>

              {/* Cutout portrait - grayscale, fades into the panel on the left edge */}
              <div className="relative h-80 w-full self-end md:h-[30rem]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-10 bottom-8 top-12 rounded-full bg-accent/10 blur-3xl"
                />
                <div className="relative h-full w-full md:[mask-image:linear-gradient(to_right,transparent,rgba(0,0,0,0.6)_18%,#000_42%)] md:[-webkit-mask-image:linear-gradient(to_right,transparent,rgba(0,0,0,0.6)_18%,#000_42%)]">
                  <Image
                    src="/images/huzaifa-khalid-cutout.png"
                    alt="Huzaifa Khalid - Full Stack Developer & Cybersecurity Specialist"
                    fill
                    sizes="(max-width: 768px) 90vw, 45vw"
                    className="object-cover object-top grayscale"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Engineering philosophy ─────────────────────────── */}
      <Section eyebrow="Engineering philosophy" title="Six principles the work runs on.">
        <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.06} className="flex gap-5">
              <span className="select-none font-mono text-sm text-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── What I solve best ──────────────────────────────── */}
      <Section eyebrow="What I solve best" title="The problems I'm built for.">
        <div className="mt-12 flex flex-col">
          {strengths.map((s, i) => (
            <Reveal key={s.outcome + i} delay={0.02 * i}>
              <Link
                href={`/projects/${s.slug}`}
                className="group flex flex-col gap-3 border-t border-border py-7 transition-colors hover:border-border-strong md:flex-row md:items-baseline md:gap-10"
              >
                <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground md:w-72 md:shrink-0">
                  {s.outcome}
                  <ArrowUpRight className="h-4 w-4 text-subtle transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </h3>
                <p className="max-w-xl text-[0.975rem] leading-relaxed text-muted">
                  {s.body}
                </p>
                <span className="font-mono text-xs text-subtle md:ml-auto md:self-center">
                  {s.proof}
                </span>
              </Link>
            </Reveal>
          ))}
          <div className="border-t border-border" />
        </div>
      </Section>

      {/* ── Working style ──────────────────────────────────── */}
      <Section eyebrow="Working style" title="What it's like to build with me.">
        <div className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
          {workingStyle.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.06}>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {w.title}
              </h3>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-muted">
                {w.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Beyond the resume ──────────────────────────────── */}
      <Section eyebrow="Beyond the resume" title="What keeps me curious.">
        <div className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-3">
          {curiosities.map((c, i) => (
            <Reveal key={c.title} delay={0.05 * i}>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {c.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                {c.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Final CTA ──────────────────────────────────────── */}
      <section className="container-page relative mt-28">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-surface px-7 py-14 md:px-14 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
              Thoughtful products need strong engineering and clear communication.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              If you&apos;re building something where performance, reach, and craft
              matter - for product work, consulting, or a deeper engineering
              conversation - I&apos;d like to hear about it.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-[0.95rem] font-medium text-accent-fg shadow-soft transition-all hover:brightness-110"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-7 text-[0.95rem] font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
              >
                See the work
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="container-page relative mt-24 md:mt-32">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">
          {eyebrow}
        </p>
      </Reveal>
      {title && (
        <Reveal delay={0.06}>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
        </Reveal>
      )}
      {children}
    </section>
  );
}
