"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Monitor, Plane, Rocket, Shield, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

import { EASE as ease } from "@/lib/motion";

type NodeColor = "cyan" | "white" | "green";

type JourneyEntry = {
  year: string;
  location: string;
  title: string;
  description: string;
  color: NodeColor;
  icon: LucideIcon;
};

const JOURNEY: JourneyEntry[] = [
  {
    year: "2021 – 2023",
    location: "Full Stack",
    title: "Started Full Stack Development",
    description:
      "Began with HTML, CSS, and JavaScript, then progressed to the MERN stack. Built and shipped multiple production client projects at OnyxTec.",
    color: "cyan",
    icon: Monitor,
  },
  {
    year: "2023 – 2024",
    location: "Engineering",
    title: "Professional Software Engineering",
    description:
      "Built full stack web apps in production at Devsinc. Gained deep experience across React, React Native, Node.js, databases, and deployment, scaling platforms to 50k+ concurrent users.",
    color: "cyan",
    icon: Rocket,
  },
  {
    year: "2024",
    location: "Canada",
    title: "Moved to Canada",
    description:
      "Relocated to Canada and began building a career here, bringing five years of full stack engineering experience into a new market.",
    color: "white",
    icon: Plane,
  },
  {
    year: "2024 – 2026",
    location: "Enterprise",
    title: "Enterprise Engineering at TenX",
    description:
      "Delivered Angular and Node modules for enterprise clients, led a frontend team, and triaged production incidents through log analysis. This support work became the bridge into security.",
    color: "cyan",
    icon: Shield,
  },
  {
    year: "2025 – 2026",
    location: "Cybersecurity",
    title: "Pivoted into Cybersecurity",
    description:
      "Completed a Master of Cybersecurity with a 4.0 GPA and built hands-on SOC, incident response, and threat detection projects, bridging full stack engineering with security.",
    color: "cyan",
    icon: Shield,
  },
  {
    year: "Now",
    location: "Available",
    title: "Open to Opportunities",
    description:
      "Actively looking for roles in full stack, cybersecurity, or both. Available onsite (GTA/Ontario), remote Canada, or remote USA.",
    color: "green",
    icon: Target,
  },
];

const NODE_RING: Record<NodeColor, string> = {
  cyan: "border-[#10B981] bg-[rgba(16, 185, 129,0.12)] text-[#10B981]",
  white: "border-[#E2E8F0] bg-[rgba(226,232,240,0.12)] text-slate-200",
  green: "border-[#10B981] bg-[rgba(16,185,129,0.12)] text-[#10B981]",
};

function TimelineItem({ entry, index }: { entry: JourneyEntry; index: number }) {
  const reduce = useReducedMotion();
  const fromLeft = index % 2 === 0;
  const isNow = entry.color === "green";
  const Icon = entry.icon;

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: fromLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className="relative pl-16 md:pl-20"
    >
      {/* Node */}
      <span
        className={
          "absolute left-[6px] top-1 flex h-11 w-11 items-center justify-center rounded-full border-2 md:left-[10px] " +
          NODE_RING[entry.color] +
          (isNow ? " cyan-glow" : "")
        }
      >
        {isNow && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#10B981] opacity-30" />
        )}
        <Icon className="relative h-5 w-5 shrink-0" strokeWidth={1.5} />
      </span>

      {/* Card */}
      <div className="card-premium p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="pill-cyan">{entry.year}</span>
          <span className="pill-neutral">{entry.location}</span>
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
          {entry.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {entry.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Journey() {
  return (
    <section id="journey" className="border-t border-border py-24 md:py-28">
      <div className="container-page">
        <SectionHeading
         label="The Journey"
          first="From Building"
          second="to Defending"
          subtext="Full stack roots, now a cybersecurity focus."
          className="!mb-0"
        />

        <div className="relative mt-14">
          {/* Vertical gradient line */}
          <div
            aria-hidden
            className="absolute left-[27px] top-2 h-full w-[2px] md:left-[31px]"
            style={{
              background:
                "linear-gradient(to bottom, #10B981, #059669 50%, #10B981)",
            }}
          />
          <div className="flex flex-col gap-8">
            {JOURNEY.map((entry, i) => (
              <TimelineItem key={entry.title} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Homepage teaser — first 3 entries + link to the full story. */
export function JourneyTeaser() {
  const items = JOURNEY.slice(0, 3);
  return (
    <section className="border-t border-border py-16 md:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              The <span className="text-[#10B981]">Journey</span>
            </h2>
            <p className="mt-3 text-slate-400">
              Full stack roots growing into security — building systems, then defending them.
            </p>
          </div>
          <Link
            href="/about#journey"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#34D399] transition-colors hover:text-[#6EE7B7]"
          >
            See full story <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((entry) => {
            const Icon = entry.icon;
            return (
              <div key={entry.title} className="card-premium p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(16, 185, 129,0.2)] bg-[rgba(16, 185, 129,0.08)] text-[#10B981]">
                    <Icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
                  </span>
                  <span className="text-xs font-medium text-[rgba(16, 185, 129,0.85)]">
                    {entry.year}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {entry.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
