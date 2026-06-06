import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { Trust } from "@/components/sections/trust";
import { Expertise } from "@/components/sections/expertise";
import { Timeline } from "@/components/sections/timeline";
import { Services } from "@/components/sections/services";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Process } from "@/components/sections/process";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { JsonLd, faqJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <Trust />
      <Expertise />
      <Timeline />
      <Services />
      <FeaturedProjects />
      <Process />
      <Faq />
      <Cta />
      <JsonLd data={faqJsonLd()} />
    </>
  );
}
