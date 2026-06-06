"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/resume";

import { EASE as ease } from "@/lib/motion";

/**
 * A mini case-study card: Problem → Approach → Impact.
 * Deliberately NOT image / title / button.
 */
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const reduce = useReducedMotion();
  const impact = project.results[0];

  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: Math.min(index * 0.06, 0.3) }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-7 transition-all duration-300 hover:border-border-strong hover:shadow-elevated md:p-8"
      >
        {/* meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-subtle">{project.year}</span>
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <span className="text-muted">{project.role}</span>
          </div>
          <ArrowUpRight className="h-4 w-4 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
          {project.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.tagline}</p>

        {/* Problem -> Approach -> Impact */}
        <div className="mt-6 flex flex-col gap-0 rounded-2xl border border-border bg-background/40 p-5">
          <CaseRow label="Problem" body={project.challenge} />
          <Connector />
          <CaseRow label="Approach" body={project.solution} />
          <Connector />
          <CaseRow label="Impact" body={impact} accent />
        </div>

        {/* tech */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-subtle"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-foreground">
          Read case study
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}

function CaseRow({
  label,
  body,
  accent,
}: {
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className={[
          "text-[11px] font-medium uppercase tracking-wide",
          accent ? "text-accent" : "text-subtle",
        ].join(" ")}
      >
        {label}
      </span>
      <p
        className={[
          "text-sm leading-relaxed",
          accent ? "font-medium text-foreground" : "text-muted line-clamp-2",
        ].join(" ")}
      >
        {body}
      </p>
    </div>
  );
}

function Connector() {
  return (
    <div className="my-2 flex items-center gap-2 pl-0.5 text-subtle">
      <ArrowDown className="h-3.5 w-3.5" />
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
