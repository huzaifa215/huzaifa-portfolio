"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import type { Project } from "@/lib/resume";
import { profile } from "@/lib/resume";

import { EASE as ease } from "@/lib/motion";

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function isSecurity(project: Project) {
  return project.category.includes("Security");
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const reduce = useReducedMotion();
  const security = isSecurity(project);
  const extra = Math.max(0, project.stack.length - 4);

  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
      transition={{ duration: 0.4, ease, delay: Math.min(index * 0.06, 0.3) }}
      className="card-premium group flex h-full flex-col overflow-hidden"
      style={{ borderRadius: 14 }}
    >
      {/* Top image / placeholder */}
      <div
        className="relative h-[200px] overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F2040, #112240)" }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <span className="select-none text-6xl font-bold tracking-tight text-slate-600">
            {initials(project.name)}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[10px] text-slate-300 backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category badge */}
        <div>
          {security ? (
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                background: "rgba(139, 92, 246, 0.08)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                color: "rgba(167, 139, 250, 0.85)",
              }}
            >
              Cybersecurity
            </span>
          ) : (
            <span className="pill-cyan">Full Stack</span>
          )}
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors hover:text-[#34D399]"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
          {project.tagline}
        </p>

        {/* Tech stack */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {project.stack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[11px] text-slate-400"
            >
              {t}
            </span>
          ))}
          {extra > 0 && (
            <span className="text-[11px] text-slate-500">+{extra} more</span>
          )}
        </div>

        {/* Action row */}
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-slate-200"
          >
            <GithubIcon className="h-4 w-4" /> GitHub
          </a>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#34D399] transition-colors hover:text-[#6EE7B7]"
          >
            Case Study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
