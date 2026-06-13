"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, CheckCircle2, Clock } from "lucide-react";
import { certifications } from "@/lib/resume";
import { SectionHeading } from "@/components/ui/section-heading";

import { EASE as ease } from "@/lib/motion";

function StatusBadge({ status }: { status: string }) {
  const inProgress = status.toLowerCase().includes("progress");
  if (inProgress) {
    return (
      <span className="pill-cyan inline-flex items-center gap-1.5">
        <Clock className="h-3 w-3 shrink-0" strokeWidth={1.5} /> In Progress
      </span>
    );
  }
  return (
    <span className="pill-green inline-flex items-center gap-1.5">
      <CheckCircle2 className="h-3 w-3 shrink-0" strokeWidth={1.5} /> Earned
    </span>
  );
}

function CertCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease, delay: index * 0.06 }}
      className="card-premium relative flex min-w-[260px] flex-col overflow-hidden p-5"
    >
      {/* Top accent bar — subtle */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] bg-[rgba(16, 185, 129,0.5)]"
      />
      <div className="flex items-start justify-between gap-3">
        <Award className="h-6 w-6 shrink-0 text-[#10B981]" strokeWidth={1.5} />
        <StatusBadge status={cert.status} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">{cert.name}</h3>
      <p className="mt-1 text-sm text-slate-400">{cert.issuer}</p>
    </motion.div>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="border-t border-border py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          label="Credentials"
          first="Certifications &"
          second="Learning"
          subtext="Continuously upskilling in cybersecurity."
        />

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {certifications.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Homepage highlight — same cards, with a link to the About page. */
export function CertificationsHighlight() {
  return (
    <section className="border-t border-border py-16 md:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-[#E2E8F0] md:text-3xl">
              Certifications &amp; <span className="text-[#10B981]">Learning</span>
            </h2>
            <p className="mt-3 text-[#94A3B8]">
              Continuously upskilling in cybersecurity.
            </p>
          </div>
          <Link
            href="/about#certifications"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#10B981] transition-colors hover:text-[#34D399]"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {certifications.slice(0, 3).map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
