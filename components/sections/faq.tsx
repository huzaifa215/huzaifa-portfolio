"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { faqs } from "@/lib/resume";
import { EASE } from "@/lib/motion";

export function Faq() {
  const [open, setOpen] = React.useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="faq" className="border-t border-border">
      <div className="container-page grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions, answered"
            description="Working out whether we're a fit? Start here, then reach out."
          />
        </div>

        <div className="flex flex-col divide-y divide-border border-y border-border">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-medium text-foreground md:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-300",
                      isOpen ? "rotate-45 border-accent text-accent" : "",
                    ].join(" ")}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted md:text-[0.95rem]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
