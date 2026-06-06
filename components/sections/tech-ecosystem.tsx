import { Section, SectionHeader } from "@/components/ui/section";
import { Marquee } from "@/components/motion";
import { techEcosystem } from "@/lib/resume";

const lanes = Object.entries(techEcosystem);

export function TechEcosystem() {
  return (
    <Section id="stack" className="border-t border-border overflow-hidden">
      <div className="container-page">
        <SectionHeader
          eyebrow="Technology"
          title="A modern, battle-tested ecosystem"
          description="The tools I reach for, grouped by where they live in the stack."
        />
      </div>

      <div className="mt-12 flex flex-col gap-4">
        {lanes.map(([group, items], i) => (
          <div key={group} className="flex items-center gap-4">
            <div className="hidden w-28 shrink-0 pl-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))] text-right md:block">
              <span className="text-xs font-medium uppercase tracking-wide text-subtle">
                {group}
              </span>
            </div>
            <Marquee reverse={i % 2 === 1} className="flex-1 py-1">
              {items.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground transition-colors hover:border-border-strong"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                  {t}
                </span>
              ))}
            </Marquee>
          </div>
        ))}
      </div>
    </Section>
  );
}
