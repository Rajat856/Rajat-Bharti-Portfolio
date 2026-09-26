"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillGroups } from "@/lib/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Tabbed capability map with animated proficiency meters. Tabs are a real
 * roving-tabindex tablist so keyboard users get arrow-key navigation.
 */
export function SkillsSection({ heading = true }: { heading?: boolean }) {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    setActive((i) => (i + dir + skillGroups.length) % skillGroups.length);
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        {heading ? (
          <SectionHeading
            eyebrow="Capabilities"
            title="Six years of accumulated range"
            description="Sixty-two endorsed skills, grouped into the six areas I actually get hired for. Levels are self-assessed and deliberately honest."
            className="max-w-2xl"
          />
        ) : null}

        <div className="mt-14 grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-16">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Skill categories"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {skillGroups.map((g, i) => {
              const selected = i === active;
              return (
                <button
                  key={g.id}
                  role="tab"
                  id={`skill-tab-${g.id}`}
                  aria-selected={selected}
                  aria-controls={`skill-panel-${g.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative shrink-0 rounded-2xl px-5 py-4 text-left transition-colors duration-300 lg:w-full",
                    selected ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="skill-tab-bg"
                      className="absolute inset-0 -z-10 rounded-2xl border border-line bg-surface"
                      transition={{ type: "spring", stiffness: 340, damping: 32 }}
                    />
                  ) : null}
                  <span className="flex items-center gap-3">
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ background: g.accent, boxShadow: `0 0 12px 1px ${g.accent}66` }}
                      aria-hidden
                    />
                    <span className="whitespace-nowrap text-[15px] font-medium tracking-tight">
                      {g.title}
                    </span>
                  </span>
                  <span className="mt-1 hidden text-xs leading-relaxed text-faint lg:block">
                    {g.blurb}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            role="tabpanel"
            id={`skill-panel-${group.id}`}
            aria-labelledby={`skill-tab-${group.id}`}
            className="min-h-[26rem]"
          >
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-x-12 gap-y-6 sm:grid-cols-2"
            >
              {group.skills.map((skill, i) => (
                <SkillMeter
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  note={skill.note}
                  accent={group.accent}
                  delay={i * 0.05}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillMeter({
  name,
  level,
  note,
  accent,
  delay,
}: {
  name: string;
  level: number;
  note?: string;
  accent: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium tracking-tight">{name}</span>
        <span className="font-mono text-[11px] text-faint">{level}</span>
      </div>
      {note ? <p className="mt-0.5 text-[11px] text-faint">{note}</p> : null}
      <div
        className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-surface-2"
        role="meter"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}55)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
