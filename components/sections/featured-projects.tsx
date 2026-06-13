"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { projects } from "@/lib/resume";
import { ProjectCard } from "@/components/projects/project-card";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <Section id="work" className="border-t border-border py-24 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Selected <span className="text-[#10B981]">Work</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">
              Full Stack projects and security experiments.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#34D399] transition-colors hover:text-[#6EE7B7]"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
