import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { profile } from "@/lib/resume";

export function Cta() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground px-6 py-16 text-center md:px-12 md:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 grid-dots opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3 py-1 text-xs font-medium text-background/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {profile.remote}
              </span>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-background md:text-5xl">
                Let&apos;s build something exceptional.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-background/70 md:text-lg">
                Have a product to ship, a platform to rescue, or a role to fill? I&apos;d
                love to hear about it.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button href="/contact" size="lg">
                  Start a Conversation <ArrowRight className="h-4 w-4" />
                </Button>
                <a
                  href="/projects"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-background/25 px-7 text-[0.95rem] font-medium text-background transition-colors hover:bg-background/10"
                >
                  View My Work
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
