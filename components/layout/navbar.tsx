"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navItems, profile } from "@/lib/resume";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const CommandMenu = dynamic(
  () => import("./command-menu").then((m) => m.CommandMenu),
  {
    ssr: false,
    loading: () => (
      <span
        aria-hidden
        className="hidden h-9 w-[5.5rem] rounded-lg border border-[rgba(16, 185, 129,0.2)] sm:inline-flex"
      />
    ),
  },
);

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md transition-all duration-300",
        scrolled ? "border-b border-border" : "border-b border-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        {/* Left — Logo / Name */}
        <Link
          href="/"
          aria-label={profile.name}
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(16, 185, 129,0.25)] bg-[#0A1628] font-mono text-xs font-bold text-white">
            HK
          </span>
          <span className="text-foreground">{profile.name}</span>
        </Link>

        {/* Center — Nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative px-3 py-2 text-sm tracking-tight transition-colors duration-150",
                  active ? "text-accent" : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px rounded-full bg-accent/50" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right — CTA + theme toggle + hamburger */}
        <div className="flex items-center gap-2">
          <CommandMenu />
          <ThemeToggle />
          <Link
            href="/contact"
            className="ml-1 hidden h-9 items-center rounded-lg border border-accent/50 px-4 text-sm font-semibold text-accent transition-all duration-200 hover:bg-accent hover:text-accent-fg sm:inline-flex"
          >
            Hire Me
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors duration-200 hover:bg-surface-muted md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "border-l-2 px-4 py-3 text-base transition-colors",
                    active
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-transparent text-muted hover:border-accent hover:text-accent",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg border border-accent text-sm font-semibold text-accent transition-all duration-200 hover:bg-accent hover:text-accent-fg"
            >
              Hire Me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
