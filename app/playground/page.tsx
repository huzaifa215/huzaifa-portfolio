import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/coming-soon";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Playground",
  description:
    "Experiments, interactive demos, and UI explorations from Arqam Tahir — a space for craft and motion. Coming soon.",
  path: "/playground",
});

export default function PlaygroundPage() {
  return (
    <ComingSoon
      eyebrow="Playground — coming soon"
      title="Experiments & interface craft."
      description="A space for interactive demos, motion studies, and the small details that make interfaces feel alive. New experiments are landing here soon."
      bullets={[
        "Interactive UI & motion experiments",
        "Reusable components & micro-interactions",
        "Performance-minded creative coding",
      ]}
    />
  );
}
