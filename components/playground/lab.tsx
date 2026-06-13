"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Shield,
  XCircle,
} from "lucide-react";
import { experience, profile, projects } from "@/lib/resume";

/* ── Shared card wrapper ────────────────────────────────────── */
export function ExperimentCard({
  index,
  name,
  children,
  className,
}: {
  index: string;
  name: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "card-premium overflow-hidden p-6 md:p-8 " + (className ?? "")
      }
    >
      <p className="mb-4 font-mono text-xs text-slate-500">
        {index} — {name}
      </p>
      {children}
    </div>
  );
}

/* ════ 01 — PASSWORD STRENGTH ANALYZER ═════════════════════════ */
const STRENGTH = [
  { label: "Very Weak", color: "#ef4444" },
  { label: "Weak", color: "#f97316" },
  { label: "Fair", color: "#eab308" },
  { label: "Strong", color: "#10b981" },
  { label: "Very Strong", color: "#34D399" },
];

function crackTime(bits: number) {
  if (bits < 28) return { label: "Instantly", color: "#ef4444" };
  if (bits < 36) return { label: "A few minutes", color: "#f97316" };
  if (bits < 60) return { label: "A few hours", color: "#eab308" };
  if (bits < 80) return { label: "Years", color: "#10b981" };
  return { label: "Centuries", color: "#34D399" };
}

export function PasswordAnalyzer() {
  const [pw, setPw] = React.useState("");
  const [show, setShow] = React.useState(false);

  const checks = React.useMemo(() => {
    const common = /(123|abc|password|qwerty|admin|letmein)/i.test(pw);
    return [
      { label: "Minimum 8 characters", pass: pw.length >= 8 },
      { label: "Contains uppercase letters", pass: /[A-Z]/.test(pw) },
      { label: "Contains lowercase letters", pass: /[a-z]/.test(pw) },
      { label: "Contains numbers", pass: /[0-9]/.test(pw) },
      { label: "Contains special characters", pass: /[^A-Za-z0-9]/.test(pw) },
      { label: "No common patterns", pass: pw.length > 0 && !common },
      { label: "Length 12+ (bonus)", pass: pw.length >= 12 },
    ];
  }, [pw]);

  const { bits, score, level } = React.useMemo(() => {
    let charset = 0;
    if (/[a-z]/.test(pw)) charset += 26;
    if (/[A-Z]/.test(pw)) charset += 26;
    if (/[0-9]/.test(pw)) charset += 10;
    if (/[^A-Za-z0-9]/.test(pw)) charset += 32;
    const entropy = pw.length > 0 && charset > 0 ? pw.length * Math.log2(charset) : 0;
    const passed = checks.filter((c) => c.pass).length;
    const s = Math.min(100, Math.round((entropy / 90) * 70 + (passed / 7) * 30));
    let lvl = 0;
    if (s >= 85) lvl = 4;
    else if (s >= 65) lvl = 3;
    else if (s >= 45) lvl = 2;
    else if (s >= 25) lvl = 1;
    else lvl = 0;
    return { bits: Math.round(entropy), score: s, level: lvl };
  }, [pw, checks]);

  const ct = crackTime(bits);
  const active = pw.length > 0;

  return (
    <ExperimentCard index="01" name="Password Strength Analyzer">
      <h3 className="text-xl font-semibold text-foreground">
        Password Strength Analyzer
      </h3>
      <p className="mt-1 text-sm text-slate-400">
        See how secure your password really is.
      </p>

      <div className="relative mt-5">
        <input
          type={show ? "text" : "password"}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Enter a password to analyze..."
          className="w-full rounded-lg border border-white/[0.08] bg-[rgba(10,22,40,0.8)] px-4 py-3 pr-12 font-mono text-sm text-slate-200 placeholder:text-slate-600 focus:border-[rgba(16, 185, 129,0.4)] focus:shadow-[0_0_0_3px_rgba(16, 185, 129,0.08)] focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
        >
          {show ? (
            <EyeOff className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          ) : (
            <Eye className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Meter */}
      <div className="mt-4 flex gap-1.5">
        {STRENGTH.map((s, i) => (
          <div
            key={s.label}
            className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]"
          >
            <motion.div
              className="h-full rounded-full"
              initial={false}
              animate={{
                width: active && i <= level ? "100%" : "0%",
                backgroundColor: STRENGTH[level].color,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span
          className="text-lg font-semibold"
          style={{ color: active ? STRENGTH[level].color : "#64748b" }}
        >
          {active ? STRENGTH[level].label : "—"}
        </span>
        <span className="text-sm text-slate-400">{score}/100</span>
      </div>

      {/* Breakdown */}
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-2 text-sm">
            {c.pass ? (
              <CheckCircle2
                className="h-4 w-4 shrink-0 text-[#34D399]"
                strokeWidth={1.5}
              />
            ) : (
              <XCircle
                className="h-4 w-4 shrink-0 text-slate-600"
                strokeWidth={1.5}
              />
            )}
            <span className={c.pass ? "text-emerald-400" : "text-slate-600"}>
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {/* Crack time */}
      {active && (
        <div className="mt-6 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-[rgba(10,22,40,0.6)] px-4 py-3">
          <Shield className="h-4 w-4 shrink-0" strokeWidth={1.5} style={{ color: ct.color }} />
          <span className="text-sm text-slate-400">
            Estimated crack time:{" "}
            <span className="font-semibold" style={{ color: ct.color }}>
              {ct.label}
            </span>
            <span className="ml-2 text-slate-600">({bits} bits)</span>
          </span>
        </div>
      )}
    </ExperimentCard>
  );
}

/* ════ 02 — STACK BUILDER ══════════════════════════════════════ */
const STACK: Record<string, string[]> = {
  Frontend: ["React", "Next.js", "Vue", "Angular", "Svelte", "TypeScript", "Tailwind", "Framer Motion"],
  Backend: ["Node.js", "Express", "NestJS", "Python", "FastAPI", "Django", "Go", "Rust"],
  Database: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Supabase", "Firebase", "SQLite", "PlanetScale"],
  Security: ["Kali Linux", "Wireshark", "Nmap", "Burp Suite", "Metasploit", "OWASP ZAP", "Snort", "OpenVAS"],
};
const STACK_TABS = Object.keys(STACK);

export function StackBuilder() {
  const [tab, setTab] = React.useState(STACK_TABS[0]);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const toggle = (t: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });

  const list = Array.from(selected);
  const score = Math.min(10, list.length + (list.length >= 3 ? 2 : 0));

  return (
    <ExperimentCard index="02" name="Stack Builder">
      <h3 className="text-xl font-semibold text-foreground">Stack Builder</h3>
      <p className="mt-1 text-sm text-slate-400">
        Click to build your ideal tech stack.
      </p>

      <div className="mt-5 flex flex-wrap gap-1 border-b border-white/[0.06]">
        {STACK_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors " +
              (t === tab
                ? "border-[rgba(16, 185, 129,0.6)] text-[#34D399]"
                : "border-transparent text-slate-400 hover:text-slate-200")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {STACK[tab].map((t) => {
          const on = selected.has(t);
          return (
            <button
              key={t}
              onClick={() => toggle(t)}
              className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
              style={
                on
                  ? {
                      background: "rgba(16, 185, 129,0.1)",
                      borderColor: "rgba(16, 185, 129,0.3)",
                      color: "#34D399",
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(255,255,255,0.08)",
                      color: "#94a3b8",
                    }
              }
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-4">
        <p className="text-sm text-slate-300">
          <span className="text-slate-500">Your Stack: </span>
          {list.length ? list.join(" · ") : "Nothing selected yet"}
        </p>
        <p className="mt-2 text-sm font-semibold text-[#34D399]">
          Stack Score: {score}/10
        </p>
      </div>
    </ExperimentCard>
  );
}

/* ════ 03 — LIVE CSS LAB ═══════════════════════════════════════ */
const CSS_PRESETS: Record<string, string> = {
  Glow: `.box {
  width: 120px;
  height: 120px;
  background: #10B981;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(16, 185, 129,0.4);
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
  Pulse: `.box {
  width: 120px;
  height: 120px;
  background: #34D399;
  border-radius: 50%;
  animation: pulse 1.4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.6; }
  50% { transform: scale(1.1); opacity: 1; }
}`,
  Morphing: `.box {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #10B981, #818cf8);
  animation: morph 4s ease-in-out infinite;
}

@keyframes morph {
  0%, 100% { border-radius: 12px; transform: rotate(0deg); }
  50% { border-radius: 50%; transform: rotate(180deg); }
}`,
};

export function LiveCssLab() {
  const [css, setCss] = React.useState(CSS_PRESETS.Glow);
  const lines = css.split("\n").length;

  return (
    <ExperimentCard index="03" name="Live CSS Lab">
      <h3 className="text-xl font-semibold text-foreground">Live CSS Lab</h3>
      <p className="mt-1 text-sm text-slate-400">
        Edit the CSS. See it change instantly.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {/* Editor */}
        <div className="overflow-hidden rounded-lg border border-white/[0.06] bg-[#060E1E]">
          <div className="flex">
            <div className="select-none border-r border-white/[0.06] py-3 pl-3 pr-2 text-right font-mono text-xs leading-[1.5] text-slate-600">
              {Array.from({ length: lines }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              spellCheck={false}
              className="h-64 flex-1 resize-none bg-transparent p-3 font-mono text-xs leading-[1.5] text-slate-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="flex h-64 items-center justify-center rounded-lg border border-white/[0.04] bg-[rgba(6,10,20,0.8)]">
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <div className="box" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {Object.keys(CSS_PRESETS).map((p) => (
          <button
            key={p}
            onClick={() => setCss(CSS_PRESETS[p])}
            className="rounded-lg border border-[rgba(16, 185, 129,0.25)] px-4 py-1.5 text-xs font-medium text-[rgba(16, 185, 129,0.8)] transition-colors hover:bg-[rgba(16, 185, 129,0.06)]"
          >
            {p}
          </button>
        ))}
      </div>
    </ExperimentCard>
  );
}

/* ════ 04 — NETWORK PACKET VISUALIZER ══════════════════════════ */
type Packet = { id: number; type: "HTTP" | "HTTPS" | "DNS" | "ANOMALY"; top: number; dur: number };
const PACKET_COLOR: Record<Packet["type"], string> = {
  HTTP: "#34D399",
  HTTPS: "#10b981",
  DNS: "#a78bfa",
  ANOMALY: "#ef4444",
};
const SPEEDS = ["Slow", "Normal", "Fast", "Flood"] as const;
const SPEED_MS = { Slow: 900, Normal: 600, Fast: 350, Flood: 120 };

export function PacketVisualizer() {
  const reduce = useReducedMotion();
  const [packets, setPackets] = React.useState<Packet[]>([]);
  const [speed, setSpeed] = React.useState<(typeof SPEEDS)[number]>("Normal");
  const [counts, setCounts] = React.useState({ HTTP: 0, HTTPS: 0, DNS: 0, ANOMALY: 0 });
  const [alert, setAlert] = React.useState(false);
  const idRef = React.useRef(0);

  const spawn = React.useCallback((type?: Packet["type"]) => {
    const types: Packet["type"][] = ["HTTP", "HTTPS", "HTTPS", "DNS"];
    const t = type ?? types[Math.floor(Math.random() * types.length)];
    const p: Packet = {
      id: idRef.current++,
      type: t,
      top: 8 + Math.random() * 84,
      dur: 1.6 + Math.random() * 1.6,
    };
    setPackets((prev) => [...prev.slice(-19), p]);
    setCounts((c) => ({ ...c, [t]: c[t] + 1 }));
  }, []);

  React.useEffect(() => {
    if (reduce) return;
    const iv = setInterval(spawn, SPEED_MS[speed]);
    return () => clearInterval(iv);
  }, [speed, spawn, reduce]);

  const injectAttack = () => {
    for (let i = 0; i < 5; i++) setTimeout(() => spawn("ANOMALY"), i * 120);
    setAlert(true);
    setTimeout(() => setAlert(false), 2500);
  };

  return (
    <ExperimentCard index="04" name="Network Traffic Visualizer">
      <h3 className="text-xl font-semibold text-foreground">
        Network Traffic Visualizer
      </h3>
      <p className="mt-1 text-sm text-slate-400">
        Simulated packet flow. Click to inject anomalies.
      </p>

      <div
        className="relative mt-5 h-[300px] overflow-hidden rounded-xl border"
        style={{ background: "rgba(6,10,20,0.9)", borderColor: "rgba(16, 185, 129,0.1)" }}
      >
        <AnimatePresence>
          {packets.map((p) => (
            <motion.div
              key={p.id}
              initial={{ left: "-5%" }}
              animate={{ left: "105%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: p.dur, ease: "linear" }}
              onAnimationComplete={() =>
                setPackets((prev) => prev.filter((x) => x.id !== p.id))
              }
              className="absolute h-3 w-8 rounded-sm"
              style={{
                top: `${p.top}%`,
                background: PACKET_COLOR[p.type],
                boxShadow:
                  p.type === "ANOMALY" ? "0 0 10px rgba(239,68,68,0.8)" : "none",
              }}
            />
          ))}
        </AnimatePresence>

        {alert && (
          <div className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
            <AlertTriangle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            Suspicious traffic detected
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-3 text-sm text-slate-400">
          Speed
          <input
            type="range"
            min={0}
            max={3}
            value={SPEEDS.indexOf(speed)}
            onChange={(e) => setSpeed(SPEEDS[Number(e.target.value)])}
            className="accent-[#10B981]"
          />
          <span className="font-mono text-[#34D399]">{speed}</span>
        </label>
        <button
          onClick={injectAttack}
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
        >
          <AlertTriangle className="h-4 w-4 shrink-0" strokeWidth={1.5} /> Inject Attack
        </button>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(["HTTP", "HTTPS", "DNS", "ANOMALY"] as const).map((k) => (
          <div
            key={k}
            className="rounded-lg border border-white/[0.06] bg-[rgba(10,22,40,0.6)] px-3 py-2 text-center"
          >
            <div className="text-lg font-bold" style={{ color: PACKET_COLOR[k] }}>
              {counts[k]}
            </div>
            <div className="text-xs text-slate-500">{k}</div>
          </div>
        ))}
      </div>
    </ExperimentCard>
  );
}

/* ════ 05 — CONTRIBUTION HEATMAP ═══════════════════════════════ */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const HEAT_COLORS = [
  "rgba(255,255,255,0.04)",
  "rgba(16, 185, 129,0.2)",
  "rgba(16, 185, 129,0.4)",
  "rgba(16, 185, 129,0.65)",
  "rgba(16, 185, 129,0.9)",
];

export function ContributionHeatmap() {
  const { weeks, total } = React.useMemo(() => {
    const rand = mulberry32(20240611);
    const w: number[][] = [];
    let t = 0;
    for (let col = 0; col < 52; col++) {
      const recency = col / 52; // later weeks heavier
      const days: number[] = [];
      for (let d = 0; d < 7; d++) {
        const r = rand();
        const threshold = 0.45 - recency * 0.25;
        let level = 0;
        if (r > threshold) {
          level = Math.min(4, 1 + Math.floor(rand() * (1 + recency * 4)));
        }
        days.push(level);
        t += level * 2;
      }
      w.push(days);
    }
    return { weeks: w, total: t };
  }, []);

  return (
    <ExperimentCard index="05" name="Contribution Activity">
      <h3 className="text-xl font-semibold text-foreground">Contribution Activity</h3>
      <p className="mt-1 text-sm text-slate-400">52 weeks of building things.</p>

      <div className="mt-5 overflow-x-auto">
        <div className="flex gap-0.5" style={{ minWidth: "max-content" }}>
          {weeks.map((days, col) => (
            <div key={col} className="flex flex-col gap-0.5">
              {days.map((lvl, d) => (
                <div
                  key={d}
                  title={`${lvl * 2} contributions`}
                  className="h-3 w-3 rounded-sm"
                  style={{ background: HEAT_COLORS[lvl] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-400">
        {total} contributions in the last year
      </p>

      <div className="mt-2 flex items-center justify-end gap-1.5 text-xs text-slate-600">
        Less
        {HEAT_COLORS.map((c, i) => (
          <span key={i} className="h-3 w-3 rounded-sm" style={{ background: c }} />
        ))}
        More
      </div>
    </ExperimentCard>
  );
}

/* ════ 06 — TERMINAL EMULATOR ══════════════════════════════════ */
type Line = { kind: "cmd" | "out" | "err" | "ok" | "muted"; text: string };

export function TerminalEmulator() {
  const [lines, setLines] = React.useState<Line[]>([
    { kind: "muted", text: "─────────────────────────────" },
    { kind: "out", text: "Welcome to Huzaifa's Terminal v1.0" },
    { kind: "muted", text: "Type 'help' to see available commands." },
    { kind: "muted", text: "─────────────────────────────" },
  ]);
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState<string[]>([]);
  const [histIdx, setHistIdx] = React.useState(-1);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const print = (newLines: Line[]) => setLines((prev) => [...prev, ...newLines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    print([{ kind: "cmd", text: `huzaifa@portfolio:~$ ${cmd}` }]);
    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);
    const [base, ...rest] = cmd.toLowerCase().split(/\s+/);

    switch (base) {
      case "help":
        print([
          { kind: "out", text: "Available commands:" },
          { kind: "muted", text: "  whoami      who I am" },
          { kind: "muted", text: "  skills      my tech + security skills" },
          { kind: "muted", text: "  experience  work history" },
          { kind: "muted", text: "  projects    selected work" },
          { kind: "muted", text: "  contact     how to reach me" },
          { kind: "muted", text: "  clear       clear the screen" },
        ]);
        break;
      case "whoami":
        print([
          { kind: "out", text: profile.name },
          { kind: "out", text: profile.titles[0] },
          { kind: "muted", text: "Based in Ontario, Canada" },
        ]);
        break;
      case "skills":
        print([
          { kind: "muted", text: "[Full Stack]            [Cybersecurity]" },
          { kind: "out", text: "React, Next.js          Kali Linux" },
          { kind: "out", text: "Node.js                 Wireshark" },
          { kind: "out", text: "TypeScript              Nmap" },
          { kind: "out", text: "MongoDB                 OWASP" },
        ]);
        break;
      case "experience":
        print(
          experience.flatMap((e) => [
            { kind: "out" as const, text: e.role },
            { kind: "muted" as const, text: `  ${e.company} · ${e.period}` },
          ]),
        );
        break;
      case "projects":
        print(
          projects.flatMap((p) => [
            { kind: "out" as const, text: p.name },
            { kind: "muted" as const, text: `  ${p.tagline}` },
          ]),
        );
        break;
      case "contact":
        print([
          { kind: "out", text: `Email:    ${profile.email}` },
          { kind: "out", text: `LinkedIn: ${profile.links.linkedin}` },
          { kind: "out", text: `GitHub:   ${profile.links.github}` },
        ]);
        break;
      case "clear":
        setLines([]);
        break;
      case "hello":
      case "hi":
        print([
          {
            kind: "ok",
            text: "Hey there! Looking for a dev? I'm available. Try 'contact' to reach me.",
          },
        ]);
        break;
      case "hack":
        print([
          { kind: "err", text: "0xA3F9 1101 ████ accessing mainframe ████ 0xFF2A" },
          {
            kind: "ok",
            text: "Access granted. Just kidding. But I do know how this works. Try 'skills'.",
          },
        ]);
        break;
      case "sudo":
        print([{ kind: "err", text: "Nice try. You don't have sudo access here." }]);
        break;
      default:
        print([
          { kind: "err", text: `Command not found: ${cmd}. Type 'help' for commands.` },
        ]);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  const COLOR: Record<Line["kind"], string> = {
    cmd: "text-[#34D399]",
    out: "text-slate-300",
    err: "text-red-400",
    ok: "text-emerald-400",
    muted: "text-slate-500",
  };

  return (
    <ExperimentCard index="06" name="Terminal">
      <div
        className="overflow-hidden rounded-xl border"
        style={{ background: "#060E1E", borderColor: "rgba(16, 185, 129,0.12)" }}
      >
        {/* top bar */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="font-mono text-xs text-slate-500">
            huzaifa@portfolio:~
          </span>
        </div>

        {/* output */}
        <div
          ref={scrollRef}
          className="h-[300px] space-y-1 overflow-y-auto p-4 font-mono text-sm"
        >
          {lines.map((l, i) => (
            <div key={i} className={"whitespace-pre-wrap break-words " + COLOR[l.kind]}>
              {l.text}
            </div>
          ))}
        </div>

        {/* input */}
        <div
          className="flex items-center px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <span className="mr-2 shrink-0 font-mono text-sm text-[#34D399]">
            huzaifa@portfolio:~$
          </span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            aria-label="Terminal input"
            className="flex-1 bg-transparent font-mono text-sm text-slate-200 outline-none"
          />
        </div>
      </div>
    </ExperimentCard>
  );
}
