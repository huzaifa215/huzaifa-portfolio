"use client";

import * as React from "react";
import {
  Boxes,
  Cloud,
  Cpu,
  Gauge,
  Globe2,
  LayoutGrid,
  Search,
  Server,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { expertise } from "@/lib/resume";
import { cn } from "@/lib/utils";

const meta: Record<string, { icon: React.ReactNode; span: string; featured?: boolean }> = {
  "Frontend Engineering": { icon: <LayoutGrid />, span: "md:col-span-2 md:row-span-2", featured: true },
  "Backend Engineering": { icon: <Server />, span: "md:col-span-2" },
  "Cloud & DevOps": { icon: <Cloud />, span: "md:col-span-1" },
  "AI Integrations": { icon: <Cpu />, span: "md:col-span-1" },
  "Performance Optimization": { icon: <Gauge />, span: "md:col-span-2" },
  "SEO Engineering": { icon: <Search />, span: "md:col-span-1" },
  Architecture: { icon: <Boxes />, span: "md:col-span-1" },
  Internationalization: { icon: <Globe2 />, span: "md:col-span-2" },
};

export function Expertise() {
  return (
    <Section id="expertise">
      <div className="container-page">
        <SectionHeader
          eyebrow="Expertise"
          title="A full-stack toolkit for building products end to end"
          description="From pixel-perfect interfaces to resilient backends, cloud infrastructure, and the performance work that makes it all feel instant."
        />

        <StaggerGroup className="mt-12 grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {expertise.map((e) => {
            const m = meta[e.title];
            return (
              <StaggerItem key={e.title} className={cn(m?.span)}>
                <SpotlightCard featured={m?.featured}>
                  <div className="flex h-full flex-col">
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60 text-accent transition-colors group-hover:border-accent/40 [&_svg]:h-5 [&_svg]:w-5",
                        m?.featured && "h-12 w-12"
                      )}
                    >
                      {m?.icon}
                    </div>
                    <h3
                      className={cn(
                        "mt-auto pt-6 font-semibold tracking-tight text-foreground",
                        m?.featured ? "text-2xl" : "text-lg"
                      )}
                    >
                      {e.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-sm leading-relaxed text-muted",
                        m?.featured && "max-w-sm text-[0.95rem]"
                      )}
                    >
                      {e.description}
                    </p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </Section>
  );
}

function SpotlightCard({
  children,
  featured,
}: {
  children: React.ReactNode;
  featured?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-border-strong hover:shadow-elevated",
        featured && "bg-gradient-to-br from-surface to-surface-muted"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--mx) var(--my), color-mix(in oklch, var(--color-accent), transparent 86%), transparent 70%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
