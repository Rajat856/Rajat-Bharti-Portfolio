"use client";

import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Two rows of client cards drifting in opposite directions (pause on hover).
 * Avatars are initials until a real `photo` is supplied — see the note in
 * src/lib/data/testimonials.ts.
 */

const avatarTones = [
  "linear-gradient(135deg,#7c5cff,#22d3ee)",
  "linear-gradient(135deg,#ff8a5b,#7c5cff)",
  "linear-gradient(135deg,#16a34a,#0ea5e9)",
  "linear-gradient(135deg,#ec4899,#7c5cff)",
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#0ea5e9,#4e2fc0)",
];

function initials(name: string) {
  return name
    .replace(/\./g, "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Card({ t, i }: { t: Testimonial; i: number }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col rounded-3xl border border-line bg-surface p-6 shadow-[0_20px_50px_-35px_rgba(20,10,60,0.35)] sm:w-[400px] sm:p-7">
      <div className="flex gap-0.5 text-amber-400" role="img" aria-label="5 out of 5">
        {Array.from({ length: 5 }).map((_, k) => (
          <Star key={k} className="size-4 fill-current" aria-hidden />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-ink/85">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        {t.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.photo} alt={t.name} className="size-11 rounded-full object-cover" />
        ) : (
          <span
            className="grid size-11 shrink-0 place-items-center rounded-full text-sm font-semibold text-white"
            style={{ background: avatarTones[i % avatarTones.length] }}
            aria-hidden
          >
            {initials(t.name)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{t.name}</p>
          <p className="truncate text-xs text-muted">
            {t.title}, {t.company}
          </p>
        </div>
        {t.project ? (
          <Link
            href={`/portfolio/${t.project}`}
            className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-faint transition-colors hover:border-accent hover:text-accent"
            aria-label={`View the ${t.company} project`}
          >
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const rows = [testimonials.slice(0, half), testimonials.slice(half)];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say"
          description="Founders and teams I've built storefronts, sites and platforms for."
          align="center"
          className="mx-auto max-w-2xl"
        />
      </div>

      <div className="mask-fade-x mt-14 space-y-5">
        {rows.map((row, r) => (
          <div key={r} className="group flex overflow-hidden">
            <div
              className="flex w-max shrink-0 gap-5 pr-5 animate-marquee-slow group-hover:[animation-play-state:paused]"
              style={r === 1 ? { animationDirection: "reverse" } : undefined}
            >
              {[...row, ...row, ...row, ...row].map((t, i) => (
                <Card key={`${t.id}-${i}`} t={t} i={testimonials.indexOf(t)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
