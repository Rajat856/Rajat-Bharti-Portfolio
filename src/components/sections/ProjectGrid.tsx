"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioLead, projects, projectPlatforms, type Project } from "@/lib/data/projects";
import { TiltCard } from "@/components/ui/TiltCard";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { cn } from "@/lib/utils";
import { graphics, graphicCategories } from "@/lib/data/graphics";
import { GraphicsGrid } from "@/components/sections/GraphicsGrid";

type Section = "websites" | "graphics";

export function ProjectGrid() {
  const [section, setSection] = useState<Section>("websites");
  const [filter, setFilter] = useState<string>("All");
  const [graphicFilter, setGraphicFilter] = useState<string>("All");

  // Deep links: /portfolio?type=graphics opens the Graphics tab.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("type") === "graphics") setSection("graphics");
  }, []);
  const switchSection = (next: Section) => {
    setSection(next);
    const url = new URL(window.location.href);
    if (next === "graphics") url.searchParams.set("type", "graphics");
    else url.searchParams.delete("type");
    window.history.replaceState(null, "", url);
  };

  const filtered = useMemo(
    () => {
      const list = filter === "All" ? projects : projects.filter((p) => p.platform === filter);
      // The lead project always opens the grid (it gets the full-width card).
      return [...list].sort(
        (a, b) => Number(b.slug === portfolioLead) - Number(a.slug === portfolioLead),
      );
    },
    [filter],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length };
    for (const p of projects) map[p.platform] = (map[p.platform] ?? 0) + 1;
    return map;
  }, []);

  const graphicCounts = useMemo(() => {
    const map: Record<string, number> = { All: graphics.length };
    for (const g of graphics) map[g.category] = (map[g.category] ?? 0) + 1;
    return map;
  }, []);

  return (
    <section className="relative pb-24 pt-12 sm:pb-32 sm:pt-16">
      <div className="container-page">
        {/* Main filter: what kind of work */}
        <div
          className="inline-flex rounded-full border border-line bg-surface/70 p-1.5 backdrop-blur"
          role="tablist"
          aria-label="Type of work"
        >
          {(
            [
              { id: "websites", label: "Websites", count: projects.length },
              { id: "graphics", label: "Graphics", count: graphics.length },
            ] as const
          ).map((t) => {
            const selected = section === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={selected}
                onClick={() => switchSection(t.id)}
                className={cn(
                  "relative rounded-full px-6 py-2.5 text-[15px] font-medium transition-colors duration-300 sm:px-8",
                  selected ? "text-white" : "text-muted hover:text-ink",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="work-section"
                    className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(135deg,var(--color-brand-500),color-mix(in_oklab,var(--color-brand-500)_60%,var(--color-cyan-glow)))] shadow-[0_10px_30px_-12px_var(--color-brand-500)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {t.label}
                <span className={cn("ml-2 font-mono text-[11px]", selected ? "opacity-80" : "text-faint")}>
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sub filter: platform (websites) or medium (graphics) */}
        <SubFilter
          key={section}
          label={section === "websites" ? "Filter websites by platform" : "Filter graphics by type"}
          options={section === "websites" ? projectPlatforms : graphicCategories}
          counts={section === "websites" ? counts : graphicCounts}
          value={section === "websites" ? filter : graphicFilter}
          onChange={section === "websites" ? setFilter : setGraphicFilter}
        />

        {section === "websites" ? (
          <>
            <motion.ul layout className="mt-10 grid gap-5 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.li
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(project.featured && i === 0 && "md:col-span-2")}
                  >
                    <ProjectCard project={project} wide={Boolean(project.featured && i === 0)} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>

            {filtered.length === 0 ? (
              <p className="mt-16 text-center text-sm text-muted">
                No projects in this category yet.
              </p>
            ) : null}
          </>
        ) : (
          <GraphicsGrid filter={graphicFilter} />
        )}
      </div>
    </section>
  );
}

function SubFilter({
  label,
  options,
  counts,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  counts: Record<string, number>;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mt-6 flex flex-wrap items-center gap-2 border-b border-line pb-6"
      role="tablist"
      aria-label={label}
    >
      {options.map((cat) => {
        const count = counts[cat] ?? 0;
        const disabled = count === 0;
        const selected = value === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={selected}
            disabled={disabled}
            onClick={() => onChange(cat)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-30",
              selected ? "text-canvas" : "text-muted hover:text-ink",
            )}
          >
            {selected ? (
              <motion.span
                layoutId="project-filter"
                className="absolute inset-0 -z-10 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : null}
            {cat}
            <span className={cn("ml-1.5 font-mono text-[10px]", selected ? "opacity-70" : "text-faint")}>
              {disabled ? "soon" : count}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <TiltCard intensity={4} radius="2rem" className="h-full">
      <Link
        href={`/portfolio/${project.slug}`}
        data-cursor="view"
        className="group flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-surface/50 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-line-strong hover:bg-surface"
      >
        {/* Generated cover art with floating chips over it */}
        <div className={cn("relative overflow-hidden", wide ? "aspect-[21/9]" : "aspect-[16/10]")}>
          <ProjectCover project={project} className="absolute inset-0" />

          <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between">
            <span className="rounded-full bg-black/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
              {project.platform}
            </span>
            <span className="rounded-full bg-black/35 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur-sm">
              {project.year}
            </span>
          </div>

        </div>

        <div className="flex flex-1 flex-col p-7">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl leading-tight tracking-tight transition-colors duration-500 group-hover:text-accent">
              {project.title}
            </h3>
            <ArrowUpRight
              className="mt-1 size-5 shrink-0 text-faint transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              aria-hidden
            />
          </div>

          <p className="mt-1.5 text-sm text-muted">{project.client}</p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

          {project.metrics ? (
            <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dd className="font-display text-xl tracking-tight text-ink">{m.value}</dd>
                  <dt className="mt-0.5 text-[11px] text-faint">{m.label}</dt>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </Link>
    </TiltCard>
  );
}
