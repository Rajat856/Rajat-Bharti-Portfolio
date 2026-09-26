"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { MapPin } from "lucide-react";
import { experience } from "@/lib/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { useMounted } from "@/hooks";
import { cn } from "@/lib/utils";

/**
 * Career timeline with a scroll-linked progress rail. `compact` trims each role
 * to its top highlights for the Home page.
 */
export function Timeline({
  compact = false,
  heading = true,
}: {
  compact?: boolean;
  heading?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        {heading ? (
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Experience"
              title="Six years, four companies"
              description="From WordPress micro-sites to owning delivery at an AI-native product company — the through-line has always been shipping things that work."
              className="max-w-2xl"
            />
            {compact ? (
              <div className="hidden sm:block">
                <Button href="/experience" variant="outline" arrow>
                  Full history
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}

        <div ref={ref} className="relative mt-14 pl-8 sm:pl-12">
          {/* Rail */}
          <div className="absolute bottom-0 left-0 top-2 w-px bg-line sm:left-1" aria-hidden>
            <motion.div
              className="h-full w-full origin-top bg-[linear-gradient(180deg,var(--color-brand-500),var(--color-cyan-glow))]"
              // Applied post-mount; see the note in <Parallax>.
              style={mounted ? { scaleY } : { scaleY: 0 }}
            />
          </div>

          <ol className="space-y-14 sm:space-y-20">
            {experience.map((job, i) => (
              <li key={job.id} className="relative">
                {/* Node */}
                <span
                  className={cn(
                    "absolute -left-8 top-2 grid size-3 place-items-center rounded-full border-2 border-canvas sm:-left-[3.05rem]",
                    job.current ? "bg-accent" : "bg-line-strong",
                  )}
                  aria-hidden
                >
                  {job.current ? (
                    <span className="absolute inline-flex size-3 animate-ping rounded-full bg-accent opacity-60" />
                  ) : null}
                </span>

                <Reveal amount={0.2}>
                  <article>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                        {job.start} — {job.end ?? "Present"}
                      </span>
                      <span className="text-[11px] text-faint">·</span>
                      <span className="font-mono text-[11px] text-faint">{job.duration}</span>
                      {job.current ? (
                        <Badge tone="success">
                          <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
                          Current
                        </Badge>
                      ) : null}
                    </div>

                    <h3 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">
                      {job.role}
                    </h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <span className="text-accent">{job.company}</span>
                      <span className="text-faint">·</span>
                      <span className="text-muted">{job.employmentType}</span>
                      <span className="text-faint">·</span>
                      <span className="inline-flex items-center gap-1 text-muted">
                        <MapPin className="size-3.5" aria-hidden />
                        {job.location}
                      </span>
                      <span className="text-faint">·</span>
                      <span className="text-muted">{job.workplace}</span>
                    </p>

                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                      {job.summary}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {(compact ? job.highlights.slice(0, 4) : job.highlights).map((h) => (
                        <li key={h} className="flex max-w-3xl gap-3 text-sm leading-relaxed text-muted">
                          <span
                            className="mt-2 size-1 shrink-0 rounded-full bg-accent/70"
                            aria-hidden
                          />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {compact && job.highlights.length > 4 ? (
                      <p className="mt-3 text-xs text-faint">
                        +{job.highlights.length - 4} more responsibilities
                      </p>
                    ) : null}

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {job.skills.map((s) => (
                        <li key={s}>
                          <Badge>{s}</Badge>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {compact ? (
          <div className="mt-12 sm:hidden">
            <Button href="/experience" variant="outline" arrow>
              Full history
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
