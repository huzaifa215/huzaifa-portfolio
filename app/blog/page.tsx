import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Essays and engineering notes on performance, SEO, architecture, and shipping production web applications — coming soon from Arqam Tahir.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <ComingSoon
      eyebrow="Writing — coming soon"
      title="Notes from the build."
      description="Practical write-ups on performance engineering, SEO at scale, and the architecture decisions behind real platforms. The first essays are in the works."
      bullets={[
        "Performance & Core Web Vitals deep-dives",
        "Technical SEO for modern frameworks",
        "Architecture & frontend modernization",
      ]}
    />
  );
}
