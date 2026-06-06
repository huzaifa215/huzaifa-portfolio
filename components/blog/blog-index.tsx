"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "@/lib/motion";
import type { PostMeta } from "@/lib/blog";

export function BlogIndex({
  posts,
  categories,
}: {
  posts: (PostMeta & { dateLabel: string })[];
  categories: string[];
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState<string>("All");
  const filters = ["All", ...categories];

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-5">
        {filters.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={[
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              active === c
                ? "border-accent bg-accent text-accent-fg"
                : "border-border text-muted hover:border-border-strong hover:text-foreground",
            ].join(" ")}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout={!reduce} className="mt-4 divide-y divide-border">
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <motion.article
              key={post.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-3 py-8 md:grid-cols-[10rem_1fr] md:gap-8"
              >
                <div className="flex flex-col gap-1 text-xs text-subtle">
                  <span className="font-medium uppercase tracking-wide text-accent">
                    {post.category}
                  </span>
                  <span className="font-mono">{post.dateLabel}</span>
                  <span className="font-mono">{post.readingTime} min read</span>
                </div>
                <div>
                  <h2 className="flex items-start gap-2 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    <span className="text-balance">{post.title}</span>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-subtle"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-10 text-sm text-muted">No posts in this category yet.</p>
      )}
    </div>
  );
}
