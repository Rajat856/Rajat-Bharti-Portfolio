"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects, type Project } from "@/lib/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

/**
 * Featured work as a sticky scroll showcase.
 *
 * On desktop the visual column pins while the detail column scrolls past it,
 * and the pinned image cross-fades to whichever project is currently centred.
 * That gives each project the full width of the viewport without the section
 * turning into five near-identical cards stacked down the page.
 *
 * Below `lg` the pin is dropped entirely: every project renders as a normal
 * stacked block with its own visual. Sticky columns and small screens don't
 * mix, and a phone has no room to show image and text side by side.
 */
export function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const projects = featuredProjects;
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  // Ownership of the pinned image is decided centrally: on every scroll frame,
  // whichever panel's midpoint is nearest the viewport's midpoint wins.
  //
  // Per-panel scroll ranges were tried first and don't work — each panel only
  // reports progress while it is between its own start and end offsets, so in
  // the gaps between panels nobody claims the image and it lags a project
  // behind. "Closest to centre" is always defined, so there is no gap.
  useEffect(() => {
    let frame = 0;

    const pick = () => {
      frame = 0;
      // The active project is the LAST one whose heading has risen past the
      // reading line — i.e. the one the visitor has most recently started
      // reading. This is monotonic in scroll position, so it can't lag or skip.
      //
      // Distance-to-centre was tried first and fails: panels are tall, so the
      // next panel's centre wins while the current panel's text still fills the
      // screen, and the image runs a project ahead (or behind) of the copy.
      const line = window.innerHeight * 0.6;
      let best = 0;

      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        const heading = el.querySelector("h3") ?? el;
        if (heading.getBoundingClientRect().top < line) best = i;
      });

      setActive((prev) => (prev === best ? prev : best));
    };

    const onScroll = () => {
      // Coalesce to one measurement per frame; scroll fires far more often.
      if (!frame) frame = requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="relative py-24 sm:py-32">
      {/* Ambient glow — ties the section back to the hero's lit stage. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem]"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, var(--glow-a), transparent 70%)",
          opacity: 0.5,
        }}
      />

      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Selected work"
            title="Things I've shipped"
            description="A slice of recent client work — replatforms, storefronts, web apps and the automation systems that keep them fed."
            className="max-w-2xl"
          />
          <div className="hidden sm:block">
            <Button href="/portfolio" variant="outline" arrow>
              All projects
            </Button>
          </div>
        </div>

        {/* ---------------------------------------------- Desktop: sticky -- */}
        <div className="mt-16 hidden gap-16 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] xl:gap-24">
          {/* Pinned visual column */}
          <div className="relative">
            <div className="sticky top-28">
              <StickyVisual projects={projects} active={active} />
            </div>
          </div>

          {/* Scrolling detail column */}
          <div>
            {projects.map((project, i) => (
              <DetailPanel
                key={project.slug}
                project={project}
                index={i}
                total={projects.length}
                registerRef={(el) => {
                  panelRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* ------------------------------------------- Mobile: stacked --- */}
        <ul className="mt-12 flex flex-col gap-14 lg:hidden">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <StackedCard project={project} index={i} total={projects.length} />
            </li>
          ))}
        </ul>

        <div className="mt-12 sm:hidden">
          <Button href="/portfolio" variant="outline" arrow>
            All projects
          </Button>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Pinned visual - */

function StickyVisual({ projects, active }: { projects: Project[]; active: number }) {
  const current = projects[active];

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_50px_120px_-50px_var(--glow-a)]">
      {/* Only the active project is painted; the rest are unmounted so we're
          never compositing five layers at once. */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={current.slug}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProjectCover project={current} className="absolute inset-0 size-full" />
        </motion.div>
      </AnimatePresence>

      {/* Bottom scrim so the caption stays readable over any artwork. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(0,0,0,0.72),transparent)]"
        aria-hidden
      />

      {/* Caption + progress rail */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
              {current.platform} · {current.year}
            </p>
            <p className="mt-1.5 font-display text-2xl leading-tight text-white">
              {current.title.split(" — ")[0]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Segment indicator — one bar per project. */}
        <div className="flex shrink-0 items-center gap-1.5 pb-1" aria-hidden>
          {projects.map((p, i) => (
            <span
              key={p.slug}
              className={cn(
                "h-0.5 rounded-full transition-all duration-500",
                i === active ? "w-6 bg-white" : "w-2 bg-white/35",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- Detail panel - */

function DetailPanel({
  project,
  index,
  total,
  registerRef,
}: {
  project: Project;
  index: number;
  total: number;
  registerRef: (el: HTMLElement | null) => void;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      ref={registerRef}
      // Tall enough that only one panel owns the viewport centre at a time, but
      // not so tall that short copy leaves a screen of empty space behind it.
      className="flex min-h-[62vh] flex-col justify-center py-14"
      initial={reduced ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
        <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden />
        <span>
          {project.platform} · {project.year}
        </span>
        <span className="ml-auto text-faint/60">
          {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-ink xl:text-5xl">
        {project.title.split(" — ")[0]}
      </h3>

      <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted">
        {project.summary}
      </p>

      {project.metrics?.length ? (
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label}>
              <dd className="font-display text-2xl text-ink">{m.value}</dd>
              <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                {m.label}
              </dt>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href={`/portfolio/${project.slug}`}
          data-cursor="view"
          className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
        >
          <span className="link-underline">View case study</span>
          <ArrowUpRight
            className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-300 hover:text-accent"
          >
            Visit live site
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

/* --------------------------------------------------------- Stacked card -- */

/** Mobile / tablet layout: image above, detail below, no pinning. */
function StackedCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      data-cursor="view"
      className="group block"
    >
      <div className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-line bg-surface">
        <ProjectCover project={project} className="absolute inset-0 size-full" />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.6),transparent_55%)]"
          aria-hidden
        />
        <span className="absolute left-5 top-5 font-mono text-[11px] text-white/70">
          {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          <span className="text-accent">{project.platform}</span> · {project.year}
        </p>
        <h3 className="mt-2.5 font-display text-2xl tracking-tight text-ink transition-colors duration-500 group-hover:text-accent sm:text-3xl">
          {project.title.split(" — ")[0]}
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{project.summary}</p>

        {project.metrics?.length ? (
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {project.metrics.slice(0, 3).map((m) => (
              <div key={m.label}>
                <dd className="font-display text-lg text-ink">{m.value}</dd>
                <dt className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        ) : null}

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
          <span className="link-underline">View case study</span>
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
