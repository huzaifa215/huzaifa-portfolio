"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import type { Project } from "@/lib/resume";
import { profile } from "@/lib/resume";
import { ProjectCard } from "./project-card";

import { EASE as ease } from "@/lib/motion";

type Filter = "All" | "Full Stack" | "Cybersecurity";
const FILTERS: Filter[] = ["All", "Full Stack", "Cybersecurity"];

const isSecurity = (p: Project) => p.category.includes("Security");

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState<Filter>("All");
  const [query, setQuery] = React.useState("");

  const featured = projects.find((p) => p.featured) ?? projects[0];

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCat =
        active === "All" ||
        (active === "Cybersecurity" ? isSecurity(p) : !isSecurity(p));
      const matchesQuery =
        !q ||
        [p.name, p.tagline, p.challenge, p.solution, ...p.stack, ...p.results]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesCat && matchesQuery;
    });
  }, [projects, active, query]);

  return (
    <>
      {/* Featured spotlight */}
      {featured && active === "All" && !query && (
        <section className="container-page mt-4">
          <FeaturedSpotlight project={featured} reduce={!!reduce} />
        </section>
      )}

      {/* Controls */}
      <section className="container-page mt-16">
        <div className="flex flex-col gap-4 border-b border-[rgba(255,255,255,0.06)] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-1">
            {FILTERS.map((f) => {
              const isActive = f === active;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={
                    "relative -mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors " +
                    (isActive
                      ? "border-[rgba(16, 185, 129,0.6)] text-[#34D399]"
                      : "border-transparent text-slate-400 hover:text-slate-200")
                  }
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="relative w-full pb-4 md:w-64 md:pb-0">
            <Search className="pointer-events-none absolute left-3 top-[1.1rem] h-4 w-4 -translate-y-1/2 text-slate-500 md:top-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tech, results…"
              aria-label="Search projects"
              className="h-10 w-full rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(15,32,64,0.6)] pl-9 pr-9 text-sm text-slate-200 placeholder:text-slate-500 focus:border-[rgba(16, 185, 129,0.4)] focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-[1.1rem] -translate-y-1/2 text-slate-500 hover:text-slate-300 md:top-1/2"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-[rgba(255,255,255,0.1)] bg-[rgba(15,32,64,0.4)] p-10 text-center">
            <p className="text-sm text-slate-400">
              No projects match{" "}
              <span className="font-medium text-slate-200">
                {query ? `“${query}”` : active}
              </span>
              .
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActive("All");
              }}
              className="mt-3 text-sm font-medium text-[#34D399] hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}

function FeaturedSpotlight({ project, reduce }: { project: Project; reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      className="grid overflow-hidden rounded-2xl lg:grid-cols-[1.5fr_1fr]"
      style={{
        background: "linear-gradient(135deg, #0F2040 0%, #112240 100%)",
        border: "1px solid rgba(16, 185, 129,0.15)",
      }}
    >
      {/* Left — narrative */}
      <div className="flex flex-col justify-center gap-5 p-8 md:p-10">
        <span className="font-mono text-xs uppercase tracking-widest text-[rgba(16, 185, 129,0.7)]">
          Featured Project
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          {project.name}
        </h2>
        <p className="max-w-sm text-base leading-relaxed text-slate-400">
          {project.tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((t) => (
            <span key={t} className="pill-cyan">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#10B981] px-5 text-sm font-semibold text-[#0A1628] transition-all hover:-translate-y-px hover:bg-[#34D399]"
          >
            View Case Study <ArrowRight className="h-4 w-4" />
          </Link>
          {/* <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            <GithubIcon className="h-4 w-4" /> GitHub
          </a> */}
        </div>
      </div>

      {/* Right — visual */}
      <div className="relative hidden min-h-[280px] items-center justify-center lg:flex">
        <span className="select-none text-7xl font-bold tracking-tight text-slate-700">
          {initials(project.name)}
        </span>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24"
          style={{ background: "linear-gradient(to right, #0F2040, transparent)" }}
        />
      </div>
    </motion.div>
  );
}
