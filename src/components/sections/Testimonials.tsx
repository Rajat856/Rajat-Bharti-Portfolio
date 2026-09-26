"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Quote carousel. Entries with `verified: false` render a visible
 * "sample content" ribbon so placeholder copy can never be mistaken for a real
 * client statement — see src/lib/data/testimonials.ts.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => go(1), 8000);
    return () => clearInterval(id);
  }, [go]);

  const current = testimonials[index];
  const hasUnverified = testimonials.some((t) => !t.verified);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say"
          align="center"
          className="mx-auto max-w-2xl"
        />

        {hasUnverified ? (
          <Reveal className="mt-6">
            <p className="mx-auto max-w-xl rounded-2xl border border-dashed border-line-strong bg-surface-2/60 px-5 py-3 text-center text-xs text-muted">
              <strong className="text-ink">Sample content.</strong> These quotes are placeholders.
              Replace them with real, attributed client quotes in{" "}
              <code className="font-mono text-[11px] text-accent">
                src/lib/data/testimonials.ts
              </code>{" "}
              — or remove this section — before publishing.
            </p>
          </Reveal>
        ) : null}

        <div className="relative mx-auto mt-12 max-w-3xl">
          <Quote
            className="absolute -top-6 left-1/2 size-16 -translate-x-1/2 text-line-strong"
            aria-hidden
          />

          <div className="relative min-h-[17rem] overflow-hidden pt-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: direction * -40, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <blockquote className="text-pretty font-display text-2xl leading-[1.35] tracking-tight sm:text-3xl">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex flex-col items-center gap-1">
                  <span className="text-sm font-medium">{current.name}</span>
                  <span className="text-xs text-muted">
                    {current.title} · {current.company}
                  </span>
                  {!current.verified ? (
                    <span className="mt-2 rounded-full border border-dashed border-line-strong px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                      Placeholder
                    </span>
                  ) : null}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <ArrowLeft className="size-4" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === index ? "w-7 bg-accent" : "w-1.5 bg-line-strong hover:bg-muted",
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
