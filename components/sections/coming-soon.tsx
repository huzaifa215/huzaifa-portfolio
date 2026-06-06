import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion";

export function ComingSoon({
  eyebrow,
  title,
  description,
  bullets,
}: {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
}) {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-dots opacity-[0.3] [mask-image:radial-gradient(ellipse_at_top,#000_10%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <section className="container-page relative flex min-h-[70vh] flex-col justify-center py-24 md:py-32">
        <Reveal>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl">
            {title}
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {description}
          </p>
        </Reveal>

        {bullets && bullets.length > 0 && (
          <Reveal delay={0.18}>
            <ul className="mt-8 flex flex-col gap-2.5">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-fg shadow-soft transition-all hover:brightness-110"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back home
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
