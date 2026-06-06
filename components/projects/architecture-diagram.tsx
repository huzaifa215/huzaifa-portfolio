"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ArchitectureLayer } from "@/lib/resume";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/** Vertical layered architecture flow: Frontend ↓ API ↓ Database ↓ Integrations. */
export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col items-stretch">
      {layers.map((layer, i) => (
        <div key={layer.label}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong md:p-6"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-accent/60"
            />
            <div className="flex flex-col gap-3 pl-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[11px] text-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-base font-semibold tracking-tight text-foreground">
                    {layer.label}
                  </h4>
                </div>
                <p className="mt-1 text-sm text-muted">{layer.role}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:justify-end">
                {layer.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border bg-background/50 px-2 py-0.5 font-mono text-[11px] text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {i < layers.length - 1 && (
            <div
              aria-hidden
              className="flex justify-center py-2 text-border-strong"
            >
              <ChevronDown className="h-5 w-5" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
