import Link from "next/link";
import { ArrowRight, Quote, Award } from "lucide-react";
import { achievements_2, testimonials } from "@/lib/resume";

export function Achievements() {
  const visibleTestimonials = testimonials.filter((t) => !t.placeholder);

  return (
    <section className="border-t border-border py-16 md:py-20">
      <div className="container-page">
        {/* Heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-[#E2E8F0] md:text-3xl">
              Recognition &amp; <span className="text-[#10B981]">Highlights</span>
            </h2>
            <p className="mt-3 text-[#94A3B8]">
              Awards, results, and recommendations from across my career.
            </p>
          </div>
          <Link
            href="https://www.linkedin.com/in/devhuzaifakhalid/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#10B981] transition-colors hover:text-[#34D399]"
          >
            View on LinkedIn <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Achievement highlights */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {achievements_2.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5"
            >
              <Award className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" />
              <p className="text-sm leading-relaxed text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}