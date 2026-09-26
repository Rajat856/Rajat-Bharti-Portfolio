"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { footerNav } from "@/lib/nav";
import { profile } from "@/lib/data/profile";
import { Magnetic } from "@/components/ui/Magnetic";
import { Marquee } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-line">
      {/* Oversized wordmark strip */}
      <div className="mask-fade-x select-none py-10 opacity-[0.07]" aria-hidden>
        <Marquee
          items={["Rajat Bharti", "Web Developer", "AI Automation", "3D Web Design"]}
          speed="slow"
          separator="—"
          itemClassName="font-display text-6xl tracking-tight sm:text-8xl"
        />
      </div>

      <div className="container-page pb-12">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          {/* CTA column */}
          <Reveal>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Available for work
              </p>
              <h2 className="mt-5 font-display text-4xl leading-[1.06] tracking-[-0.02em] sm:text-5xl">
                Have something
                <br />
                worth building?
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                {profile.availability}. Tell me what you&apos;re working on — I usually reply
                within a day.
              </p>

              <Magnetic strength={0.3}>
                <Link
                  href="/contact"
                  data-cursor="hover"
                  className="group mt-8 inline-flex items-center gap-3 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium transition-all duration-300 hover:border-accent/60 hover:bg-surface-2"
                >
                  Start a project
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerNav).map(([group, items]) => (
              <div key={group}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                  {group}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="link-underline text-sm text-muted transition-colors hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                Elsewhere
              </h3>
              <ul className="mt-4 space-y-2.5">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="link-underline text-sm text-muted transition-colors hover:text-ink"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-line pt-7 sm:flex-row sm:items-center">
          <div className="text-xs text-faint">
            <p>
              © {year} {profile.name}. All rights reserved.
            </p>
            <p className="mt-1">
              {profile.locationShort} · {profile.timezone} · Built with Next.js, Three.js &amp;
              Framer Motion.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="link-underline text-sm text-muted transition-colors hover:text-ink"
            >
              {profile.email}
            </a>
            <Magnetic strength={0.25}>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                <ArrowUp className="size-4" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
