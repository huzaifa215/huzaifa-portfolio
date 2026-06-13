import * as React from "react";

/** Standardized section heading: eyebrow rule + two-tone title + subtext. */
export function SectionHeading({
  label,
  first,
  second,
  subtext,
  centered = false,
  className,
}: {
  label: string;
  first: string;
  second: string;
  subtext?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        "mb-12 max-w-2xl",
        centered ? "mx-auto text-center" : "text-left",
        className ?? "",
      ].join(" ")}
    >
      <div
        className={
          "mb-4 flex items-center gap-2 " + (centered ? "justify-center" : "")
        }
      >
        <div className="h-px w-6 bg-[rgba(16, 185, 129,0.4)]" />
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-slate-500">
          {label}
        </span>
        {centered && <div className="h-px w-6 bg-[rgba(16, 185, 129,0.4)]" />}
      </div>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        <span className="text-foreground">{first} </span>
        <span className="text-[#10B981]">{second}</span>
      </h2>
      {subtext && (
        <p
          className={
            "mt-3 max-w-lg text-base text-slate-500 " +
            (centered ? "mx-auto" : "")
          }
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
