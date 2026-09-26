"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { graphics, type Graphic } from "@/lib/data/graphics";
import { cn } from "@/lib/utils";

/**
 * "Graphics" tab on /portfolio: square cards for social posts and motion
 * videos. No case-study pages; a card opens the piece in a lightbox with
 * keyboard (← → Esc) and swipe-free button navigation.
 */

const ease = [0.16, 1, 0.3, 1] as const;

export function GraphicsGrid({ filter }: { filter: string }) {
  const items = useMemo(
    () => (filter === "All" ? graphics : graphics.filter((g) => g.category === filter)),
    [filter],
  );
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <motion.ul layout className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((g, i) => (
            <motion.li
              key={g.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease }}
            >
              <GraphicCard graphic={g} onOpen={() => setOpen(i)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {items.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted">Nothing in this category yet — coming soon.</p>
      ) : null}

      <Lightbox items={items} index={open} onChange={setOpen} />
    </>
  );
}

function GraphicCard({ graphic: g, onOpen }: { graphic: Graphic; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="view"
      className="group block w-full overflow-hidden rounded-4xl border border-line bg-surface/50 text-left transition-colors duration-500 hover:border-line-strong hover:bg-surface"
      aria-label={`Open ${g.title} (${g.client})`}
    >
      <div className="relative aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={g.thumb}
          alt={`${g.title} — ${g.category.toLowerCase()} for ${g.client}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-black/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          {g.category}
        </span>
        {g.format === "video" ? (
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-16 place-items-center rounded-full bg-white/85 text-ink shadow-xl backdrop-blur transition-transform duration-500 group-hover:scale-110">
              <Play className="ml-1 size-6 fill-current" aria-hidden />
            </span>
          </span>
        ) : null}
      </div>
      <div className="flex items-start justify-between gap-4 p-6">
        <div className="min-w-0">
          <h3 className="font-display text-xl leading-tight tracking-tight transition-colors duration-500 group-hover:text-accent">
            {g.title}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {g.client} · {g.year}
          </p>
        </div>
        <ArrowUpRight
          className="mt-1 size-5 shrink-0 text-faint transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          aria-hidden
        />
      </div>
    </button>
  );
}

function Lightbox({
  items,
  index,
  onChange,
}: {
  items: Graphic[];
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const g = index === null ? null : items[index];
  const many = items.length > 1;
  const step = useCallback(
    (d: number) => {
      if (index === null) return;
      onChange((index + d + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onChange, step]);

  return (
    <AnimatePresence>
      {g ? (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex flex-col bg-[#07060c]/92 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={g.title}
          onClick={() => onChange(null)}
        >
          <div className="flex items-center justify-between gap-4 px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))] text-white sm:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
              {many ? `${(index ?? 0) + 1} / ${items.length}` : g.category}
            </p>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={g.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease }}
                className="flex h-full max-h-full w-full items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {g.format === "video" ? (
                  <video
                    src={g.src}
                    poster={g.thumb}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-full max-w-full rounded-2xl"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={g.src}
                    alt={`${g.title} — ${g.client}`}
                    className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {many ? (
              <>
                <NavButton side="left" onClick={() => step(-1)} />
                <NavButton side="right" onClick={() => step(1)} />
              </>
            ) : null}
          </div>

          <div
            className="mx-auto flex w-full max-w-3xl flex-wrap items-end justify-between gap-3 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 text-white sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <h3 className="font-display text-xl tracking-tight sm:text-2xl">{g.title}</h3>
              <p className="mt-1 text-sm text-white/65">
                {g.client} · {g.year}
                {g.description ? ` — ${g.description}` : ""}
              </p>
            </div>
            {g.project ? (
              <Link
                href={`/portfolio/${g.project}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2 text-sm transition-colors hover:bg-white/10"
              >
                Website case study
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:size-12",
        side === "left" ? "left-2 sm:left-5" : "right-2 sm:right-5",
      )}
      aria-label={side === "left" ? "Previous" : "Next"}
    >
      <Icon className="size-5" aria-hidden />
    </button>
  );
}
