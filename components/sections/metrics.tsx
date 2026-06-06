"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Globe2, Layers, TrendingUp } from "lucide-react";
import { Counter } from "@/components/motion";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const supporting = [
  { icon: Activity, value: 99, suffix: "%+", label: "Uptime on booking flows" },
  { icon: Layers, value: 3, suffix: "", label: "Production platforms shipped" },
];

export function Metrics() {
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-border bg-surface-muted/40">
      <div className="container-page py-16 md:py-20">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              By the numbers · production results
            </span>
            <h2 className="mt-4 max-w-md text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Measured impact, not just shipped features.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted">
            Beyond the perfect Lighthouse score and sub-3s loads, the work moved
            real numbers for teams in international markets.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Dominant: delivery velocity */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface p-7 md:p-8 lg:col-span-4"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-2xl"
            />
            <div className="flex items-center gap-2 text-sm font-medium text-muted">
              <TrendingUp className="h-4 w-4 text-accent" /> Delivery velocity
            </div>
            <div className="mt-6 flex items-end gap-1">
              <span className="text-7xl font-semibold leading-none tracking-tight text-foreground">
                <Counter to={40} />
              </span>
              <span className="mb-2 text-4xl font-medium text-muted">%+</span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Faster feature delivery by decomposing a monolithic frontend into a
              modular, reusable component architecture.
            </p>
          </motion.div>

          {/* Dominant: global reach */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease, delay: 0.08 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface p-7 md:p-8 lg:col-span-4"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-2xl"
            />
            <div className="flex items-center gap-2 text-sm font-medium text-muted">
              <Globe2 className="h-4 w-4 text-accent" /> Global reach
            </div>
            <div className="mt-6 flex items-end gap-1">
              <span className="text-7xl font-semibold leading-none tracking-tight text-foreground">
                <Counter to={5} />
              </span>
              <span className="mb-2 text-4xl font-medium text-muted">+</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["EN", "AR", "RTL", "i18n / L10n"].map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-background/60 px-2 py-1 font-mono text-[11px] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Language markets served with internationalized routing and full
              right-to-left layout support.
            </p>
          </motion.div>

          {/* Supporting cluster */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-4">
            {supporting.map((m, i) => (
              <motion.div
                key={m.label}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease, delay: 0.12 + i * 0.06 }}
                className="flex items-center justify-between rounded-2xl border border-border bg-surface p-6"
              >
                <div>
                  <div className="text-4xl font-semibold tracking-tight text-foreground tabular-nums">
                    <Counter to={m.value} suffix={m.suffix} />
                  </div>
                  <div className="mt-1 text-sm leading-snug text-muted">{m.label}</div>
                </div>
                <m.icon className="h-5 w-5 text-accent" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
