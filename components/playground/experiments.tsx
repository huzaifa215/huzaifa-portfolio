"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Command,
  CornerDownLeft,
  FileText,
  Gauge,
  Home,
  Mail,
  RotateCcw,
  Search,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { EASE as ease } from "@/lib/motion";

/** Detect coarse (touch) pointers so hover-driven effects degrade gracefully. */
function useCoarsePointer() {
  const [coarse, setCoarse] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return coarse;
}

/* ──────────────────────────────────────────────────────────
   1. Spotlight Grid — pointer-tracked glow + parallax tilt
   ────────────────────────────────────────────────────────── */
function SpotlightCard({ label, hint }: { label: string; hint: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const coarse = useCoarsePointer();
  const [pos, setPos] = React.useState({ x: 50, y: 50, active: false });

  const onMove = (e: React.MouseEvent) => {
    if (coarse) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      active: true,
    });
  };

  const tiltX = (pos.y - 50) / -16;
  const tiltY = (pos.x - 50) / 16;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos((p) => ({ ...p, active: false }))}
      style={
        {
          "--x": `${pos.x}%`,
          "--y": `${pos.y}%`,
          transform:
            pos.active && !coarse
              ? `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
              : "perspective(800px)",
        } as React.CSSProperties
      }
      className="relative h-28 overflow-hidden rounded-xl border border-border bg-background/60 p-4 transition-transform duration-200 ease-out"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: pos.active ? 1 : 0,
          background:
            "radial-gradient(220px circle at var(--x) var(--y), color-mix(in oklch, var(--color-accent) 28%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="mt-1 text-xs text-subtle">{hint}</div>
      </div>
    </div>
  );
}

export function SpotlightGrid() {
  const cards = [
    ["Latency", "p95 · 142ms"],
    ["Throughput", "12.4k req/min"],
    ["Cache", "94% hit rate"],
    ["Errors", "0.02% · 5xx"],
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map(([l, h]) => (
        <SpotlightCard key={l} label={l} hint={h} />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   2. Command Palette — keyboard-first, fuzzy, layoutId highlight
   ────────────────────────────────────────────────────────── */
const paletteItems = [
  { icon: Home, label: "Go to Home", kbd: "H" },
  { icon: User, label: "Open About", kbd: "A" },
  { icon: FileText, label: "Browse Projects", kbd: "P" },
  { icon: Gauge, label: "View Metrics", kbd: "M" },
  { icon: Mail, label: "Contact Arqam", kbd: "C" },
];

export function CommandPalette() {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const reduce = useReducedMotion();

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return paletteItems;
    return paletteItems.filter((i) =>
      i.label.toLowerCase().includes(q)
    );
  }, [query]);

  React.useEffect(() => {
    setActive(0);
  }, [query]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background/80">
      <div className="flex items-center gap-2 border-b border-border px-3.5 py-3">
        <Search className="h-4 w-4 text-subtle" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKey}
          placeholder="Type a command or search…"
          aria-label="Command palette input"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-subtle focus:outline-none"
        />
        <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:inline">
          ⌘K
        </kbd>
      </div>
      <ul className="max-h-56 overflow-auto p-1.5">
        {results.length === 0 && (
          <li className="px-3 py-6 text-center text-sm text-subtle">
            No commands match “{query}”.
          </li>
        )}
        {results.map((item, i) => (
          <li key={item.label}>
            <button
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm focus:outline-none"
            >
              {active === i && (
                <motion.span
                  layoutId="cmd-active"
                  className="absolute inset-0 rounded-lg bg-surface-muted"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 500, damping: 38 }
                  }
                />
              )}
              <item.icon
                className={cn(
                  "relative h-4 w-4",
                  active === i ? "text-accent" : "text-subtle"
                )}
              />
              <span
                className={cn(
                  "relative flex-1",
                  active === i ? "text-foreground" : "text-muted"
                )}
              >
                {item.label}
              </span>
              {active === i ? (
                <CornerDownLeft className="relative h-3.5 w-3.5 text-subtle" />
              ) : (
                <kbd className="relative hidden font-mono text-[10px] text-subtle sm:inline">
                  {item.kbd}
                </kbd>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   3. Metric Explorer — interactive latency model
   ────────────────────────────────────────────────────────── */
function Slider({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted">{label}</span>
        <span className="font-mono tabular-nums text-foreground">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-muted accent-accent"
      />
    </label>
  );
}

export function MetricExplorer() {
  const [load, setLoad] = React.useState(60);
  const [cache, setCache] = React.useState(85);
  const [replicas, setReplicas] = React.useState(3);
  const reduce = useReducedMotion();

  // A small, legible model (illustrative — not a benchmark).
  const base = 40;
  const pressure = (load / 100) * (180 / replicas);
  const cacheRelief = (cache / 100) * 70;
  const p50 = Math.max(8, Math.round(base + pressure * 0.4 - cacheRelief * 0.5));
  const p95 = Math.max(p50 + 6, Math.round(base + pressure - cacheRelief * 0.4));
  const p99 = Math.max(p95 + 10, Math.round(base + pressure * 1.6 - cacheRelief * 0.3));

  const bars = [
    { label: "p50", value: p50 },
    { label: "p95", value: p95 },
    { label: "p99", value: p99 },
  ];
  const maxBar = Math.max(p99, 120);

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Slider label="Traffic load" value={load} min={5} max={100} suffix="%" onChange={setLoad} />
        <Slider label="Cache hit rate" value={cache} min={0} max={99} suffix="%" onChange={setCache} />
        <Slider label="Replicas" value={replicas} min={1} max={8} suffix="×" onChange={setReplicas} />
      </div>
      <div className="flex flex-col justify-end gap-3 rounded-xl border border-border bg-background/60 p-4">
        {bars.map((b) => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="w-8 font-mono text-xs text-subtle">{b.label}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-muted">
              <motion.div
                className="h-full rounded-full bg-accent"
                animate={{ width: `${Math.min(100, (b.value / maxBar) * 100)}%` }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 30 }}
              />
            </div>
            <span className="w-12 text-right font-mono text-xs tabular-nums text-foreground">
              {b.value}ms
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   4. Stagger Lab — replayable choreography
   ────────────────────────────────────────────────────────── */
const staggerPresets = {
  Tight: 0.03,
  Balanced: 0.07,
  Loose: 0.14,
} as const;

export function StaggerLab() {
  const reduce = useReducedMotion();
  const [preset, setPreset] = React.useState<keyof typeof staggerPresets>("Balanced");
  const [runId, setRunId] = React.useState(0);
  const tiles = Array.from({ length: 12 });

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex rounded-full border border-border p-0.5">
          {(Object.keys(staggerPresets) as (keyof typeof staggerPresets)[]).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPreset(p);
                setRunId((r) => r + 1);
              }}
              className={cn(
                "relative rounded-full px-3 py-1 text-xs font-medium transition-colors",
                preset === p ? "text-accent-fg" : "text-muted hover:text-foreground"
              )}
            >
              {preset === p && (
                <motion.span
                  layoutId="stagger-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative">{p}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setRunId((r) => r + 1)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
        >
          <RotateCcw className="h-3 w-3" /> Replay
        </button>
      </div>

      <motion.div
        key={runId}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reduce ? 0 : staggerPresets[preset] } },
        }}
        className="grid grid-cols-6 gap-2"
      >
        {tiles.map((_, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.9 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease } },
            }}
            className="aspect-square rounded-lg border border-border bg-accent-soft/40"
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   5. Bento Morph — shared-layout re-flow
   ────────────────────────────────────────────────────────── */
const bentoModes = {
  Overview: [
    { id: "a", span: "col-span-2 row-span-2" },
    { id: "b", span: "col-span-2" },
    { id: "c", span: "" },
    { id: "d", span: "" },
  ],
  Focus: [
    { id: "a", span: "col-span-4 row-span-2" },
    { id: "b", span: "col-span-2" },
    { id: "c", span: "col-span-1" },
    { id: "d", span: "col-span-1" },
  ],
} as const;

export function BentoMorph() {
  const reduce = useReducedMotion();
  const [mode, setMode] = React.useState<keyof typeof bentoModes>("Overview");

  return (
    <div>
      <div className="mb-4 flex rounded-full border border-border p-0.5">
        {(Object.keys(bentoModes) as (keyof typeof bentoModes)[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "relative flex-1 rounded-full px-3 py-1 text-xs font-medium transition-colors",
              mode === m ? "text-accent-fg" : "text-muted hover:text-foreground"
            )}
          >
            {mode === m && (
              <motion.span
                layoutId="bento-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative">{m}</span>
          </button>
        ))}
      </div>
      <div className="grid auto-rows-[44px] grid-cols-4 gap-2">
        {bentoModes[mode].map((cell) => (
          <motion.div
            key={cell.id}
            layout={!reduce}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 34 }}
            className={cn(
              "flex items-center justify-center rounded-lg border border-border bg-background/60 font-mono text-xs text-subtle",
              cell.span
            )}
          >
            {cell.id.toUpperCase()}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   6. Magnetic Controls — spring cursor magnetism
   ────────────────────────────────────────────────────────── */
function MagneticButton({
  children,
  primary,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const coarse = useCoarsePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (coarse || reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.4);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium transition-colors active:scale-[0.98]",
        primary
          ? "bg-accent text-accent-fg shadow-soft hover:brightness-110"
          : "border border-border text-foreground hover:border-border-strong"
      )}
    >
      {children}
    </motion.button>
  );
}

export function MagneticControls() {
  const coarse = useCoarsePointer();
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <MagneticButton primary>
          Get started <ArrowRight className="h-4 w-4" />
        </MagneticButton>
        <MagneticButton>
          <Command className="h-4 w-4" /> Commands
        </MagneticButton>
      </div>
      <p className="text-center text-xs text-subtle">
        {coarse
          ? "Touch detected — magnetism is disabled; controls stay tappable."
          : "Move your cursor near a control to feel the spring."}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Registry — id → live component
   ────────────────────────────────────────────────────────── */
export const experimentComponents: Record<string, React.ComponentType> = {
  "spotlight-grid": SpotlightGrid,
  "command-palette": CommandPalette,
  "metric-explorer": MetricExplorer,
  "stagger-lab": StaggerLab,
  "bento-morph": BentoMorph,
  "magnetic-controls": MagneticControls,
};
