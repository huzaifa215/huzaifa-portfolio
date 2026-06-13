"use client";

import * as React from "react";
import { profile } from "@/lib/resume";

/**
 * Editorial portrait with decorative offset frame + two overlay cards.
 * Uses a plain <img> with a monogram fallback so the console stays clean
 * while the real photo is absent. Swap to next/image once
 * public/images/huzaifa-khalid.png is added.
 */
export function AboutAvatar() {
  const [imgOk, setImgOk] = React.useState(true);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setImgOk(false);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* Decorative offset frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-[20px]"
        style={{ border: "1px solid rgba(16, 185, 129,0.08)" }}
      />

      {/* Portrait */}
      <div
        className="aspect-[3/4] w-full overflow-hidden rounded-[20px]"
        style={{
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
          background: "linear-gradient(135deg, #0F2040, #1A3A5C)",
        }}
      >
        {imgOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src="/images/huzaifa-khalid.png"
            alt="Huzaifa Khalid — Full Stack Developer & Cybersecurity Specialist"
            className="h-full w-full object-cover object-top"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="select-none text-7xl font-bold tracking-tight text-slate-700">
              HK
            </span>
          </div>
        )}
      </div>

      {/* Experience badge — top right */}
      <div
        className="absolute top-6 right-4 rounded-xl px-4 py-3 text-center md:-right-4"
        style={{
          background: "rgba(10,22,40,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(16, 185, 129,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <p className="text-2xl font-bold text-[#34D399]">3+</p>
        <p className="text-xs text-slate-500">Years XP</p>
      </div>

      {/* Availability card — bottom left */}
      <div
        className="absolute bottom-6 left-4 rounded-xl px-4 py-3 md:-left-4"
        style={{
          background: "rgba(10,22,40,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <div>
            <p className="text-xs font-semibold text-white">Available Now</p>
            <p className="text-xs text-slate-500">
              Ontario · Remote CA · Remote US
            </p>
          </div>
        </div>
      </div>

      {/* keep profile referenced for future alt/name use */}
      <span className="sr-only">{profile.name}</span>
    </div>
  );
}
