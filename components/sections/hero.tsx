"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Download, Hand } from "lucide-react";
import { profile } from "@/lib/resume";

import { EASE as ease } from "@/lib/motion";

const TITLES = [
  "Full Stack Developer",
  "Cybersecurity Specialist",
  "Building & Securing the Web",
];

const TECH_STACK = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Python",
  "Linux",
  "Kali Linux",
  "Wireshark",
  "MongoDB",
  "PostgreSQL",
];

/* ── Typewriter for the cycling role line ───────────────────── */
function Typewriter() {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (reduce) {
      setText(TITLES[index]);
      return;
    }
    const full = TITLES[index];
    let delay = deleting ? 40 : 80;
    if (!deleting && text === full) delay = 2000;
    else if (deleting && text === "") delay = 200;

    const timer = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % TITLES.length);
      } else {
        setText(full.slice(0, deleting ? text.length - 1 : text.length + 1));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, reduce]);

  return (
    <span className="text-muted">
      {text}
      <span
        className="ml-0.5 inline-block w-[2px] animate-cursor-blink bg-[#10B981] align-middle"
        style={{ height: "1em" }}
      />
    </span>
  );
}

/* ── Security terminal card ─────────────────────────────────── */
const TERMINAL_LINES: React.ReactNode[] = [
  <>
    <span className="text-slate-500">$</span>
    <span className="text-[#34D399]"> whoami</span>
  </>,
  <>
    <span className="text-slate-300">Huzaifa Khalid</span>
    <span className="text-slate-500"> // Full Stack + Security</span>
  </>,
  <>
    <span className="text-slate-500">$</span>
    <span className="text-[#34D399]"> cat skills.txt</span>
  </>,
  <span className="pl-2">
    <span className="text-[#4ADE80]">&gt;</span>{" "}
    <span className="text-slate-300">React · Next.js · Node.js</span>
  </span>,
  <span className="pl-2">
    <span className="text-[#4ADE80]">&gt;</span>{" "}
    <span className="text-slate-300">Network Security · Linux</span>
  </span>,
  <span className="pl-2">
    <span className="text-[#4ADE80]">&gt;</span>{" "}
    <span className="text-slate-300">Kali Linux · Wireshark</span>
  </span>,
  <span className="pl-2">
    <span className="text-[#4ADE80]">&gt;</span>{" "}
    <span className="text-slate-300">OWASP · Pentesting</span>
  </span>,
  <>
    <span className="text-slate-500">$</span>
    <span className="text-[#34D399]"> status --current</span>
  </>,
  <span className="flex items-center gap-2">
    <span className="inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
    <span className="text-slate-300">Open to work · Ontario, Canada</span>
  </span>,
  <>
    <span className="text-slate-500">$</span>
    <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-[#10B981]/80 align-middle" />
  </>,
];

function TerminalCard({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      className="mx-auto w-full max-w-md overflow-hidden rounded-2xl"
      style={{
        background: "rgba(10, 10, 14, 0.85)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Top chrome */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-mono text-xs text-slate-500">
          huzaifa@canada:~
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1.5 p-5 font-mono text-sm leading-relaxed">
        {TERMINAL_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease, delay: 0.3 + i * 0.2 }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="flex items-center gap-1.5 font-mono text-xs text-slate-500">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
          </span>
          connected
        </span>
        <span className="font-mono text-xs text-slate-600">
          CA · 2024–present
        </span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };

  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow — top center, very restrained */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(16, 185, 129, 0.07) 0%, transparent 65%)",
        }}
      />
      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[140px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-background))",
        }}
      />

      <div className="container-page relative grid items-center gap-12 pb-24 pt-20 md:pb-32 md:pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* ── LEFT ─────────────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.div variants={item} className="mb-6">
            <span className="pill-cyan inline-flex items-center gap-1.5 font-mono">
              <Hand className="h-3 w-3 shrink-0" strokeWidth={1.5} /> Available in
              Canada
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mb-4 text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            Huzaifa <span className="text-accent">Khalid</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mb-4 h-8 text-xl font-medium md:h-9 md:text-2xl"
          >
            <Typewriter />
          </motion.div>

          <motion.p
            variants={item}
            className="mb-8 max-w-md text-base leading-relaxed text-muted"
          >
            From building production apps in Pakistan to securing systems in
            Canada.
          </motion.p>

          <motion.div
            variants={item}
            className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="/#work"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#10B981] px-7 text-[0.95rem] font-semibold text-[#0A1628] transition-all duration-200 hover:-translate-y-px hover:bg-[#34D399] hover:shadow-[0_4px_15px_rgba(16, 185, 129,0.25)]"
            >
              View Work <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[rgba(16, 185, 129,0.3)] px-7 text-[0.95rem] font-semibold text-[rgba(16, 185, 129,0.8)] transition-all duration-200 hover:border-[rgba(16, 185, 129,0.5)] hover:bg-[rgba(16, 185, 129,0.08)]"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500">Stack:</span>
            {TECH_STACK.map((t) => (
              <span key={t} className="pill-cyan">
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT — terminal card ────────────────────────── */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
        >
          <TerminalCard reduce={!!reduce} />
        </motion.div>
      </div>
    </section>
  );
}
