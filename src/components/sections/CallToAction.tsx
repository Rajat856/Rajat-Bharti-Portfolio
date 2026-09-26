"use client";

import { Aurora, Starfield } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { profile } from "@/lib/data/profile";

export function CallToAction({
  title = "Let's build something worth loading.",
  description = "Whether it's a replatform, a storefront, a custom app or an automation system — tell me the constraint and I'll tell you honestly whether I'm the right person for it.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-5xl border border-line px-7 py-20 text-center sm:px-14 sm:py-28">
          <Aurora intensity={1.15} />
          <Starfield count={30} />
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ background: "linear-gradient(180deg, var(--surface), transparent 60%)" }}
            aria-hidden
          />

          <h2 className="mx-auto max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.025em] sm:text-6xl">
            <RevealText text={title} />
          </h2>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted">
              {description}
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" variant="secondary" size="lg" arrow>
                Start a conversation
              </Button>
              <Button href={`mailto:${profile.email}`} variant="outline" size="lg">
                {profile.email}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              {profile.locationShort} · {profile.timezone} · Replies within 24h
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
