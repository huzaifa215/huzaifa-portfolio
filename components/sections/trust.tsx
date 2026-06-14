import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { projects, testimonials } from "@/lib/resume";

export function Trust() {
  const visibleTestimonials = testimonials.filter((t) => !t.placeholder);

  return (
    <section className="border-t border-border py-16 md:py-20">
  <div className="container-page">
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-xl">
        <h2 className="text-2xl font-semibold tracking-tight text-[#E2E8F0] md:text-3xl">
          What Colleagues <span className="text-[#10B981]">Say</span>
        </h2>
        <p className="mt-3 text-[#94A3B8]">
          Recommendations from people I've worked with.
        </p>
      </div>
      <Link
        href="https://www.linkedin.com/in/dev-huzaifakhalid/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#10B981] transition-colors hover:text-[#34D399]"
      >
        View on LinkedIn <ArrowRight className="h-4 w-4" />
      </Link>
    </div>

    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {testimonials
        .filter((t) => !t.placeholder)
        .map((t) => (
          <figure
            key={t.author}
            className="rounded-2xl border border-border bg-surface p-7"
          >
            <Quote className="h-6 w-6 text-accent/60" />
            <blockquote className="mt-4 text-base leading-relaxed text-foreground">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 text-sm">
              <span className="font-medium text-foreground">{t.author}</span>
              <span className="text-muted"> · {t.role}</span>
            </figcaption>
          </figure>
        ))}
    </div>
  </div>
</section>
    // <section className="border-b border-border py-16 md:py-20">
    //   <div className="container-page">
    //     <Reveal>
    //       <p className="text-center text-sm font-medium text-muted">
    //         Platforms and products I&apos;ve helped build
    //       </p>
    //     </Reveal>

    //     {/* Real platforms - no fabricated client logos, just the work itself. */}
    //     <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-3">
    //       {projects.map((p) => (
    //         <StaggerItem key={p.slug}>
    //           <Link
    //             href={`/projects/${p.slug}`}
    //             className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface px-6 py-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-soft"
    //           >
    //             <div className="flex items-center justify-between">
    //               <span className="text-lg font-semibold tracking-tight text-foreground">
    //                 {p.name}
    //               </span>
    //               <ArrowUpRight className="h-4 w-4 text-subtle transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
    //             </div>
    //             <p className="mt-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
    //             <div className="mt-4 flex flex-wrap gap-1.5">
    //               {p.stack.slice(0, 3).map((t) => (
    //                 <span
    //                   key={t}
    //                   className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-subtle"
    //                 >
    //                   {t}
    //                 </span>
    //               ))}
    //             </div>
    //           </Link>
    //         </StaggerItem>
    //       ))}
    //     </StaggerGroup>

    //     {/* Testimonials: render real ones; otherwise a tasteful, honest invitation. */}
       
    //   </div>
    // </section>
  );
}
