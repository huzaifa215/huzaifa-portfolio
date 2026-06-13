"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Code2, ShieldCheck } from "lucide-react";
import { skillGroups } from "@/lib/resume";
import { SectionHeading } from "@/components/ui/section-heading";

import { EASE as ease } from "@/lib/motion";

const TABS = [
  { key: "Full Stack Skills" as const, label: "Full Stack", icon: Code2 },
  { key: "Cybersecurity Skills" as const, label: "Cybersecurity", icon: ShieldCheck },
];

function SkillCard({ name, delay }: { name: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease, delay }}
      className="card-premium group flex items-center gap-2.5 px-4 py-3"
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#10B981] transition-transform group-hover:scale-150" />
      <span className="text-sm text-slate-300">{name}</span>
    </motion.div>
  );
}

export function Skills() {
  const [active, setActive] = React.useState(TABS[0].key);
  const skills = skillGroups[active];

  return (
    <section id="skills" className="border-t border-border py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          label="Capabilities"
          first="Skills &"
          second="Tech Stack"
          subtext="Full Stack foundations. Cybersecurity in progress."
        />

        {/* Tabs */}
        <div className="mt-8 flex gap-1 border-b border-[rgba(16, 185, 129,0.15)]">
          {TABS.map((tab) => {
            const isActive = tab.key === active;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                className={
                  "relative -mb-px inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors " +
                  (isActive
                    ? "border-b-2 border-[#10B981] text-[#34D399]"
                    : "border-b-2 border-transparent text-[#94A3B8] hover:text-[#34D399]")
                }
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Skill cards — keyed so the new tab mounts immediately on switch */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease }}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        >
          {skills.map((name, i) => (
            <SkillCard key={name} name={name} delay={i * 0.02} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/** Compact homepage teaser — top skills + link to full About page. */
export function SkillsPreview() {
  const top = [
    ...skillGroups["Full Stack Skills"].slice(0, 4),
    ...skillGroups["Cybersecurity Skills"].slice(0, 4),
  ];

  return (
    <section className="border-t border-border py-16 md:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-[#E2E8F0] md:text-3xl">
              Skills &amp; <span className="text-[#10B981]">Tech Stack</span>
            </h2>
            <p className="mt-3 text-[#94A3B8]">
              Full Stack foundations, with a growing cybersecurity toolkit.
            </p>
          </div>
          <Link
            href="/about#skills"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#10B981] transition-colors hover:text-[#34D399]"
          >
            View all skills <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {top.map((name) => (
            <span key={name} className="pill-cyan">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
