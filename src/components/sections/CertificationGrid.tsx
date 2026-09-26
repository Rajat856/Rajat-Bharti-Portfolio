"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Brush, Code2, Megaphone, Server, ShieldCheck } from "lucide-react";
import {
  certifications,
  certificationCategories,
  type Certification,
} from "@/lib/data/certifications";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";

const categoryIcon = {
  Security: ShieldCheck,
  Development: Code2,
  Design: Brush,
  Marketing: Megaphone,
  Infrastructure: Server,
} as const;

const categoryAccent = {
  Security: "#22d3ee",
  Development: "#7c5cff",
  Design: "#ff8a5b",
  Marketing: "#8d78f5",
  Infrastructure: "#0ea5e9",
} as const;

export function CertificationGrid() {
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(
    () =>
      filter === "All" ? certifications : certifications.filter((c) => c.category === filter),
    [filter],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: certifications.length };
    for (const c of certifications) map[c.category] = (map[c.category] ?? 0) + 1;
    return map;
  }, []);

  return (
    <section className="relative pb-24 sm:pb-32">
      <div className="container-page">
        <div
          className="flex flex-wrap items-center gap-2 border-b border-line pb-6"
          role="tablist"
          aria-label="Filter certifications"
        >
          {certificationCategories.map((cat) => {
            const selected = filter === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(cat)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                  selected ? "text-canvas" : "text-muted hover:text-ink",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="cert-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {cat}
                <span
                  className={cn(
                    "ml-1.5 font-mono text-[10px]",
                    selected ? "opacity-70" : "text-faint",
                  )}
                >
                  {counts[cat] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => (
              <motion.li
                key={`${cert.name}-${cert.issuer}`}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <CertificationCard cert={cert} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

function CertificationCard({ cert }: { cert: Certification }) {
  const Icon = categoryIcon[cert.category];
  const accent = categoryAccent[cert.category];

  return (
    <TiltCard intensity={5} radius="1.5rem" className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/50 p-7 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-line-strong hover:bg-surface">
        {/* Corner glow keyed to the category */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
          style={{ background: accent }}
          aria-hidden
        />

        <div className="flex items-start justify-between">
          <span
            className="grid size-11 place-items-center rounded-2xl border border-line bg-surface-2"
            style={{ color: accent }}
          >
            <Icon className="size-5" aria-hidden />
          </span>
          <BadgeCheck className="size-5 text-faint transition-colors duration-500 group-hover:text-accent" aria-hidden />
        </div>

        <h3 className="mt-6 text-lg font-medium leading-snug tracking-tight">{cert.name}</h3>
        <p className="mt-1 text-sm" style={{ color: accent }}>
          {cert.issuer}
        </p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{cert.description}</p>

        <div className="mt-6 border-t border-line pt-4">
          <Badge>{cert.category}</Badge>
        </div>
      </div>
    </TiltCard>
  );
}
