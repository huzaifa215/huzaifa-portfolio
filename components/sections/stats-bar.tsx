"use client";

import * as React from "react";
import { Counter } from "@/components/motion";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  text?: string; // non-numeric display (overrides counter)
  label: string;
  sublabel: string;
};

const STATS: Stat[] = [
  { value: 4, suffix: "+", label: "Years XP", sublabel: "Full Stack" },
  { value: 12, suffix: "+", label: "Projects", sublabel: "Developed" },
  // Scale — big and concrete
  { value: 50, suffix: "K+", label: "Users Scaled", sublabel: "Real-time Platform" }, 
  { value: 1, text: "Dev+Sec", label: "Focus", sublabel: "Dual Discipline" },
];

export function StatsBar() {
  return (
    <section className="border-y border-border bg-surface-muted">
      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={
                "flex flex-col items-center px-4 py-4 text-center md:py-2 " +
                (i > 0 ? "md:border-l md:border-border" : "") +
                (i % 2 === 1 ? " border-l border-border md:border-l" : "")
              }
            >
              <div className="text-3xl font-bold tracking-tight text-accent md:text-4xl">
                {s.text ? (
                  s.text
                ) : (
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                )}
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">
                {s.label}
              </div>
              <div className="mt-0.5 text-xs text-muted">{s.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
