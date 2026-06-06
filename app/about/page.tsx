import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "The story, principles, and engineering philosophy behind Arqam Tahir — a senior software engineer building high-performance web platforms.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <ComingSoon
      eyebrow="About — in progress"
      title="The engineer behind the work."
      description="A deeper look at how I think about systems, performance, and shipping products that last is on the way. In the meantime, the case studies tell the story in detail."
      bullets={[
        "Engineering philosophy & principles",
        "Career story across travel-tech, hospitality & SaaS",
        "How I approach performance, architecture & teams",
      ]}
    />
  );
}
