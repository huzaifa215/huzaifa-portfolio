import Link from "next/link";
import { Globe, Heart, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { profile } from "@/lib/resume";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Playground", href: "/playground" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Full Stack Development",
  "Frontend Engineering",
  "React / Next.js Apps",
  "Cybersecurity Consulting",
  "Security Audits",
  "API Development",
];

const socials = [
  { label: "GitHub", href: profile.links.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedinIcon, external: true },
  { label: "Email", href: profile.links.email, Icon: Mail, external: false },
];

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-subtle">
      {children}
    </h2>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(16, 185, 129,0.25)] bg-[#0A1628] font-mono text-xs font-bold text-white">
                HK
              </span>
              <span className="font-semibold text-foreground">{profile.name}</span>
            </div>
            <p className="mt-5 max-w-[220px] text-sm leading-relaxed text-muted">
              Full Stack Developer &amp; Cybersecurity Specialist based in
              Ontario, Canada.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ label, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer me" }
                    : {})}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-all duration-200 hover:border-[rgba(16, 185, 129,0.25)] hover:bg-[rgba(16, 185, 129,0.1)] hover:text-accent"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <ColHeading>Navigation</ColHeading>
            <ul className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-sm text-muted transition-all duration-150 hover:translate-x-0.5 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <ColHeading>What I Do</ColHeading>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s} className="text-sm text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ColHeading>Get In Touch</ColHeading>
            <ul className="flex flex-col gap-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent/60" strokeWidth={1.5} />
                Ontario, Canada
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-accent/60" strokeWidth={1.5} />
                {profile.email}
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 shrink-0 text-accent/60" strokeWidth={1.5} />
                huzaifakhalid.dev
              </li>
            </ul>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/[0.05] px-3 py-1.5 text-xs text-emerald-500">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to Work
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-subtle sm:flex-row">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Built with
            <Heart className="h-3 w-3 shrink-0 fill-red-400 text-red-400" strokeWidth={1.5} />
            in Canada
          </p>
          <p className="text-subtle/70">Next.js · Tailwind · Vercel</p>
        </div>
      </div>
    </footer>
  );
}
