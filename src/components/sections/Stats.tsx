"use client";

import { CountUp } from "@/components/ui/Primitives";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { profile } from "@/lib/data/profile";

export function Stats() {
  return (
    <section id="next" className="relative py-20 sm:py-24">
      <div className="container-page">
        <RevealGroup className="grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {profile.stats.map((stat) => (
            <RevealItem key={stat.label} className="group bg-canvas p-7 transition-colors duration-500 hover:bg-surface sm:p-9">
              <p className="font-display text-5xl tracking-[-0.03em] text-ink sm:text-6xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-sm font-medium text-ink">{stat.label}</p>
              <p className="mt-1 text-xs text-faint">{stat.detail}</p>
              <span
                className="mt-6 block h-px w-0 bg-[linear-gradient(90deg,var(--color-brand-500),var(--color-cyan-glow))] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                aria-hidden
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
