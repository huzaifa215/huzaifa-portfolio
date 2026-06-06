"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { profile } from "@/lib/resume";
import { cn } from "@/lib/utils";

export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = profile.links.email;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${profile.email}`}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-500" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" /> Copy email
        </>
      )}
    </button>
  );
}
