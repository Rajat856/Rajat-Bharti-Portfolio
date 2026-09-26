"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Code2, Gauge, Palette, ShoppingBag, Workflow } from "lucide-react";
import { skillGroups } from "@/lib/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

/**
 * Homepage capability overview: one card per discipline, every skill visible
 * as a chip. Replaces the tabbed meter panel, which hid five of the six
 * groups behind tabs and asked visitors to trust self-rated percentages.
 * The full meter view still lives on /skills.
 */

const icons: Record<string, typeof Code2> = {
  web: Code2,
  cms: ShoppingBag,
  ai: Bot,
  design: Palette,
  growth: Gauge,
  delivery: Workflow,
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Capabilities() {
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Capabilities"
            title="Six years of accumulated range"
            description="Six disciplines I actually get hired for — from the storefront a customer sees to the automation running behind it."
            className="max-w-2xl"
          />
          <div className="hidden sm:block">
            <Button href="/skills" variant="outline" arrow>
              Full skill map
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.id] ?? Code2;
            return (
              <motion.article
                key={g.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease, delay: (i % 3) * 0.08 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-colors duration-500 hover:border-line-strong"
              >
                {/* Accent wash that blooms on hover */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30"
                  style={{ background: g.accent }}
                  aria-hidden
                />

                <div className="flex items-start justify-between">
                  <span
                    className="grid size-12 place-items-center rounded-2xl"
                    style={{
                      background: `color-mix(in oklab, ${g.accent} 14%, transparent)`,
                      color: g.accent,
                    }}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-mono text-[11px] text-faint">
                    {String(i + 1).padStart(2, "0")} / {String(skillGroups.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl tracking-tight">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{g.blurb}</p>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <li
                      key={s.name}
                      className="rounded-full border border-line bg-surface-2/70 px-2.5 py-1 text-xs text-ink/80"
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        {/* Summary strip */}
        <div className="mt-4 flex flex-col items-start justify-between gap-5 rounded-3xl border border-line bg-[linear-gradient(110deg,color-mix(in_oklab,var(--color-brand-500)_10%,transparent),transparent_60%)] px-7 py-6 sm:flex-row sm:items-center">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-5xl leading-none tracking-tight">{total}</span>
            <span className="text-sm text-muted">
              skills across {skillGroups.length} disciplines — the ones clients actually pay for.
            </span>
          </div>
          <a
            href="/skills"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            See proficiency levels
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
