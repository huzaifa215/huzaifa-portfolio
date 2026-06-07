"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navItems, profile } from "@/lib/resume";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

const CommandMenu = dynamic(
  () => import("./command-menu").then((m) => m.CommandMenu),
  {
    ssr: false,
    loading: () => (
      <span
        aria-hidden
        className="hidden h-9 w-[5.5rem] rounded-lg border border-border/60 bg-surface-muted/60 sm:inline-flex"
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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={profile.name}
          className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-foreground"
        >
          <img
            src="/logo-mark.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative px-3 py-2 text-sm tracking-tight transition-colors duration-150",
                  active
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-foreground/70" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <CommandMenu />
          <ThemeToggle />
          <Button
            href="/contact"
            size="sm"
            className="ml-1 hidden rounded-lg lg:inline-flex"
          >
            Contact
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors duration-150 hover:bg-surface-muted md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="glass border-t border-border md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base transition-colors",
                    active
                      ? "bg-surface-muted text-foreground"
                      : "text-muted hover:bg-surface-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button href="/contact" className="mt-2 w-full rounded-lg">
              Contact
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
