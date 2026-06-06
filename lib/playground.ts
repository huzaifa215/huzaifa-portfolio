/**
 * Playground experiment registry — metadata only (no React).
 * The live components are mapped by `id` in components/playground/experiments.tsx.
 * This file is safe to import from Server Components.
 */

export type ExperimentCategory =
  | "Motion Systems"
  | "UI Interaction"
  | "Data Viz"
  | "Layout Systems"
  | "Microinteractions";

export const categories: ExperimentCategory[] = [
  "Motion Systems",
  "UI Interaction",
  "Data Viz",
  "Layout Systems",
  "Microinteractions",
];

export type ExperimentMeta = {
  id: string;
  title: string;
  category: ExperimentCategory;
  tags: string[];
  /** One line — what the experiment is. */
  purpose: string;
  /** Why it exists / what production problem it rehearses. */
  why: string;
  featured?: boolean;
};

export const experiments: ExperimentMeta[] = [
  {
    id: "spotlight-grid",
    title: "Spotlight Grid",
    category: "UI Interaction",
    tags: ["pointer-tracking", "CSS variables", "depth"],
    purpose:
      "A grid of cards that respond to the cursor with a radial spotlight and subtle parallax tilt.",
    why: "Pointer-aware surfaces add depth without weight. The same technique highlights focus in dashboards and pricing tables — and degrades to a calm static state on touch.",
    featured: true,
  },
  {
    id: "command-palette",
    title: "Command Palette",
    category: "UI Interaction",
    tags: ["keyboard-first", "fuzzy search", "a11y"],
    purpose:
      "A fully keyboard-navigable command surface with fuzzy filtering and an animated active state.",
    why: "Command palettes are how power users move through real products. This rehearses focus management, keyboard navigation, and shared-layout highlighting.",
    featured: true,
  },
  {
    id: "metric-explorer",
    title: "Metric Explorer",
    category: "Data Viz",
    tags: ["interactive model", "animation", "tabular-nums"],
    purpose:
      "Sliders feed a small latency model and animate the resulting distribution in real time.",
    why: "Performance work means making trade-offs legible. Turning inputs into an animated, readable chart is the core of any metrics dashboard.",
    featured: true,
  },
  {
    id: "stagger-lab",
    title: "Stagger Lab",
    category: "Motion Systems",
    tags: ["orchestration", "replayable", "reduced-motion"],
    purpose:
      "A replayable staggered reveal with adjustable choreography — tight, balanced, or loose.",
    why: "Stagger timing is the difference between motion that feels engineered and motion that feels random. This is the system behind every list and grid reveal on the site.",
  },
  {
    id: "bento-morph",
    title: "Bento Morph",
    category: "Layout Systems",
    tags: ["shared layout", "FLIP", "responsive"],
    purpose:
      "A bento layout that smoothly re-flows between an overview and a focused arrangement.",
    why: "Layout transitions keep users oriented when a view changes. Shared-layout animation makes a re-arrangement feel like one continuous space.",
  },
  {
    id: "magnetic-controls",
    title: "Magnetic Controls",
    category: "Microinteractions",
    tags: ["spring physics", "cursor", "touch-safe"],
    purpose:
      "Controls that lean toward the cursor with spring physics and settle back on release.",
    why: "Microinteractions signal that a surface is alive and responsive. Tuned springs — not linear tweens — are what make it feel physical rather than gimmicky.",
  },
];

export const featuredExperiments = experiments.filter((e) => e.featured);
