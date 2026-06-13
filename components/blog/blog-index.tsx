"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE } from "@/lib/motion";
import type { PostMeta } from "@/lib/blog";

/** Per-category badge styling (works in both themes via rgba). */
export function categoryBadge(category: string): React.CSSProperties {
  switch (category) {
    case "Cybersecurity":
      return {
        background: "rgba(139,92,246,0.08)",
        border: "1px solid rgba(139,92,246,0.2)",
        color: "rgba(167,139,250,0.95)",
      };
    case "Development":
      return {
        background: "rgba(16, 185, 129,0.08)",
        border: "1px solid rgba(16, 185, 129,0.2)",
        color: "rgba(16, 185, 129,0.95)",
      };
    case "Career":
      return {
        background: "rgba(16,185,129,0.08)",
        border: "1px solid rgba(16,185,129,0.2)",
        color: "rgba(16,185,129,0.95)",
      };
    default:
      return {
        background: "rgba(148,163,184,0.1)",
        border: "1px solid rgba(148,163,184,0.2)",
        color: "rgb(148,163,184)",
      };
  }
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={categoryBadge(category)}
    >
      {category}
    </span>
  );
}

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
      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors"
              style={
                isActive && c !== "All"
                  ? categoryBadge(c)
                  : isActive
                    ? {
                        background: "rgba(16, 185, 129,0.12)",
                        border: "1px solid rgba(16, 185, 129,0.3)",
                        color: "rgba(16, 185, 129,0.95)",
                      }
                    : {
                        background: "transparent",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-muted)",
                      }
              }
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Cards grid */}
      <motion.div
        layout={!reduce}
        className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <motion.article
              key={post.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="card-premium group flex h-full flex-col p-5"
              >
                <CategoryBadge category={post.category} />
                <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-subtle">
                  <span>
                    {post.dateLabel} · {post.readingTime} min read
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-accent">
                    Read more
                    <ArrowRight
                      className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </span>
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
