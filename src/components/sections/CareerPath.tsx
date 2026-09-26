"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Homepage career overview: four roles read left-to-right, oldest first, on a
 * single progression line — a path you can take in at a glance instead of a
 * long vertical list of bullet points. The full detail stays on /experience.
 */

const ease = [0.16, 1, 0.3, 1] as const;

export function CareerPath() {
  const path = [...experience].reverse(); // oldest → newest

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Experience"
            title="Six years, four companies"
            description="From WordPress micro-sites to owning delivery at an AI-native product company — each step a bigger surface to be responsible for."
            className="max-w-2xl"
          />
          <div className="hidden sm:block">
            <Button href="/experience" variant="outline" arrow>
              Full history
            </Button>
          </div>
        </div>

        <div className="relative mt-16">
          {/* Progression line (desktop): runs through the year markers */}
          <div className="absolute left-0 right-0 top-[11px] hidden h-px bg-line lg:block" aria-hidden>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, ease }}
              className="h-full origin-left bg-[linear-gradient(90deg,var(--color-brand-500),var(--color-cyan-glow))]"
            />
          </div>

          <ol className="grid gap-4 lg:grid-cols-4 lg:gap-5">
            {path.map((job, i) => (
              <motion.li
                key={job.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.12 }}
                className="relative flex flex-col"
              >
                {/* Marker + year */}
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "relative grid size-[23px] shrink-0 place-items-center rounded-full border-2",
                      job.current
                        ? "border-accent bg-accent/15"
                        : "border-line-strong bg-canvas",
                    )}
                    aria-hidden
                  >
                    <span className={cn("size-2 rounded-full", job.current ? "bg-accent" : "bg-faint")} />
                    {job.current ? (
                      <span className="absolute inset-0 animate-ping rounded-full border border-accent/60" />
                    ) : null}
                  </span>
                  <span className="relative rounded-full bg-canvas pr-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                    {job.start.split(" ")[1]} — {job.end ? job.end.split(" ")[1] : "Now"}
                  </span>
                </div>

                <article
                  className={cn(
                    "mt-5 flex flex-1 flex-col rounded-3xl border p-6 transition-colors duration-500",
                    job.current
                      ? "border-accent/35 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--color-brand-500)_9%,var(--surface)),var(--surface))]"
                      : "border-line bg-surface hover:border-line-strong",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-accent">{job.company}</span>
                    {job.current ? (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-600">
                        Current
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-2 font-display text-xl leading-snug tracking-tight">{job.role}</h3>
                  <p className="mt-1 text-xs text-faint">
                    {job.duration} · {job.workplace}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{job.summary}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {job.skills.slice(0, 4).map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-line bg-surface-2/70 px-2.5 py-1 text-[11px] text-ink/75"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-10 sm:hidden">
          <Button href="/experience" variant="outline" arrow>
            Full history
          </Button>
        </div>
      </div>
    </section>
  );
}
