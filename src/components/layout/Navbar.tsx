"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { navItems, primaryNav } from "@/lib/nav";
import { profile } from "@/lib/data/profile";
import { useScrolled } from "@/hooks";
import { useTheme } from "./ThemeProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const scrolledPast = useScrolled(20);
  // Pages whose hero is dark in both themes: keep the frosted bar from the
  // top, or the dark-on-transparent nav disappears into the hero.
  const darkHero = pathname === "/services";
  const scrolled = scrolledPast || darkHero;
  const [open, setOpen] = useState(false);

  // Close the overlay on navigation and lock the body while it's open.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="container-page">
          <nav
            className={cn(
              "flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-4",
              scrolled
                ? "glass shadow-[0_8px_40px_-16px_rgba(0,0,0,0.5)]"
                : "border border-transparent bg-transparent",
            )}
            aria-label="Primary"
          >
            {/* Wordmark */}
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2.5 rounded-full pl-1 pr-2"
              aria-label={`${profile.name} — home`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatar}
                alt=""
                width={32}
                height={32}
                className="size-8 shrink-0 rounded-full object-cover ring-1 ring-line-strong"
              />
              <span className="text-[15px] font-medium tracking-tight">
                {profile.name}
              </span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {primaryNav.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                        active ? "text-ink" : "text-muted hover:text-ink",
                      )}
                    >
                      {active ? (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-1.5">
              <ThemeToggle />

              <div className="hidden sm:block">
                <Button href="/contact" size="sm" variant="secondary" arrow>
                  Let&apos;s talk
                </Button>
              </div>

              <MenuButton open={open} onToggle={() => setOpen((v) => !v)} />
            </div>
          </nav>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <Magnetic strength={0.2}>
      <button
        onClick={toggle}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="grid place-items-center"
          >
            {theme === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </Magnetic>
  );
}

function MenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <Magnetic strength={0.2}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="menu-overlay"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative grid size-10 place-items-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-line-strong"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="relative block h-3 w-4.5" aria-hidden>
          <motion.span
            className="absolute left-0 block h-px w-full bg-current"
            animate={open ? { top: "50%", rotate: 45 } : { top: 2, rotate: 0 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            className="absolute left-0 block h-px w-full bg-current"
            animate={open ? { top: "50%", rotate: -45 } : { top: 10, rotate: 0 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          />
        </span>
      </button>
    </Magnetic>
  );
}

function MenuOverlay({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[79] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-canvas/92 backdrop-blur-2xl"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            // Opening gets the full flourish; closing is deliberately quicker —
            // a slow dismiss reads as lag, not polish.
            exit={{
              clipPath: "circle(0% at 100% 0%)",
              transition: { duration: 0.4, ease: [0.83, 0, 0.17, 1] },
            }}
            transition={{ duration: 0.65, ease: [0.83, 0, 0.17, 1] }}
            onClick={onClose}
          />

          <div className="container-page relative flex min-h-dvh flex-col justify-center pb-16 pt-28">
            <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-2">
              {navItems.map((item, i) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12, transition: { delay: 0, duration: 0.2 } }}
                    transition={{
                      delay: 0.16 + i * 0.045,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline justify-between gap-6 border-b border-line py-4 transition-colors duration-300 hover:border-line-strong"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[11px] text-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-3xl tracking-tight transition-colors duration-300 sm:text-4xl",
                            active ? "text-accent" : "text-ink group-hover:text-accent",
                          )}
                        >
                          {item.label}
                        </span>
                      </span>
                      <span className="hidden text-right text-xs text-muted sm:block">
                        {item.description}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1.5 transition-colors hover:text-ink"
                >
                  {s.label}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
