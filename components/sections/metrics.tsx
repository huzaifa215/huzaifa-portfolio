"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Gauge, Globe2, Layers, Timer, TrendingUp } from "lucide-react";
import { Counter } from "@/components/motion";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const supporting = [
  { icon: TrendingUp, value: 40, suffix: "%+", label: "Faster component delivery" },
  { icon: Activity, value: 99, suffix: "%+", label: "Uptime on booking flows" },
  { icon: Globe2, value: 5, suffix: "+", label: "Language markets (with RTL)" },
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
              Performance dashboard · production results
            </span>
            <h2 className="mt-4 max-w-md text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Measured impact, not just shipped features.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted">
            Every number is from a production platform serving real users in
            international markets.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Dominant: Lighthouse SEO */}
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
              <Gauge className="h-4 w-4 text-accent" /> Lighthouse SEO
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div className="text-7xl font-semibold leading-none tracking-tight text-foreground">
                <Counter to={100} />
              </div>
              <DashRing reduce={!!reduce} />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Perfect 100/100 score on a production hospitality platform — driving
              measurable gains in organic search traffic.
            </p>
          </motion.div>

          {/* Dominant: LCP */}
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
              <Timer className="h-4 w-4 text-accent" /> Largest Contentful Paint
            </div>
            <div className="mt-6 flex items-end gap-1">
              <span className="text-4xl font-medium text-subtle">&lt;</span>
              <span className="text-7xl font-semibold leading-none tracking-tight text-foreground">
                <Counter to={3} />
              </span>
              <span className="mb-2 text-3xl font-medium text-muted">s</span>
            </div>
            <WaveBars reduce={!!reduce} />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Sub-3-second loads on a high-traffic booking platform via SSR, image
              optimization, lazy loading, and strategic caching.
            </p>
          </motion.div>

          {/* Supporting cluster */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-4">
            {supporting.map((m, i) => (
              <motion.div
                key={m.label}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease, delay: 0.12 + i * 0.05 }}
                className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-5"
              >
                <m.icon className="h-4 w-4 text-accent" />
                <div className="mt-4">
                  <div className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
                    <Counter to={m.value} suffix={m.suffix} />
                  </div>
                  <div className="mt-1 text-xs leading-snug text-muted">{m.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DashRing({ reduce }: { reduce: boolean }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 72 72" className="h-16 w-16 -rotate-90">
      <circle cx="36" cy="36" r={r} fill="none" stroke="var(--color-border)" strokeWidth="6" />
      <motion.circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={reduce ? { strokeDashoffset: 0 } : { strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease }}
      />
    </svg>
  );
}

function WaveBars({ reduce }: { reduce: boolean }) {
  const heights = [40, 65, 50, 80, 55, 90, 70];
  return (
    <div className="mt-4 flex h-10 items-end gap-1.5">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm bg-accent/30"
          style={{ originY: 1 }}
          initial={reduce ? { height: `${h}%` } : { height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.05 }}
        />
      ))}
    </div>
  );
}
