import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  PasswordAnalyzer,
  StackBuilder,
  LiveCssLab,
  PacketVisualizer,
  ContributionHeatmap,
  TerminalEmulator,
} from "@/components/playground/lab";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Playground",
  description:
    "Interactive experiments by Huzaifa Khalid — a password analyzer, network traffic visualizer, live CSS lab, terminal emulator, and more.",
  keywords: ["interactive", "experiments", "cybersecurity", "frontend"],
  path: "/playground",
});

export default function PlaygroundPage() {
  return (
    <div className="relative overflow-hidden">
      {/* barely-visible grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container-page relative pb-16 pt-32">
        <SectionHeading
          label="Interactive Lab"
          first="Play"
          second="ground"
          subtext="A collection of interactive experiments. Click around — everything works."
        />

        <div className="mt-4 flex flex-col gap-6">
          {/* 01 full width */}
          <PasswordAnalyzer />

          {/* 02 + 03 */}
          <div className="grid gap-6 lg:grid-cols-2">
            <StackBuilder />
            <LiveCssLab />
          </div>

          {/* 04 full width */}
          <PacketVisualizer />

          {/* 05 + 06 */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ContributionHeatmap />
            <TerminalEmulator />
          </div>
        </div>
      </div>
    </div>
  );
}
