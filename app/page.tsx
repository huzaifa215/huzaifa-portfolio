import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { SkillsPreview } from "@/components/sections/skills";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { JourneyTeaser } from "@/components/sections/journey";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { CertificationsHighlight } from "@/components/sections/certifications";
import { Trust } from "@/components/sections/trust";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { JsonLd, faqJsonLd } from "@/lib/jsonld";
import { Achievements } from "@/components/sections/achievements";

export default function Home() {
  return (
    <>
      {/* 1 — Hero (Phase 2) */}
      <Hero />
      {/* 2 — Stats / metrics bar */}
      <StatsBar />
      {/* 3 — Skills preview */}
      <SkillsPreview />
      {/* 4 — Featured projects teaser */}
      <FeaturedProjects />
      {/* 5 — Journey teaser */}
      <JourneyTeaser />
      {/* 6 — Services / What I do */}
      <Services />
      {/* (kept) How I work */}
      <Process />
      {/* 7 — Certifications highlight */}
      <CertificationsHighlight />

      <Achievements/>
      {/* (kept) Platforms & testimonials */}
      <Trust />
      {/* (kept) FAQ */}
      <Faq />
      {/* 8 — CTA / contact teaser */}
      <Cta />
      <JsonLd data={faqJsonLd()} />
    </>
  );
}
