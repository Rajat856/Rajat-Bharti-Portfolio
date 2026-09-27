"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { graphics, type Graphic, type GraphicCategory } from "@/lib/data/graphics";
import { cn } from "@/lib/utils";

/**
 * "Graphics" tab on /portfolio: square cards for social posts and motion
 * videos. No case-study pages; a card opens the piece in a lightbox with
 * keyboard (← → Esc) and arrow-button navigation. Video cards play a short
 * muted preview on hover (or while on screen, on touch devices).
 */

const ease = [0.16, 1, 0.3, 1] as const;
const bandOrder: GraphicCategory[] = ["Motion Video", "Reels & Ads", "Posts", "Stories"];
const isWide = (g: Graphic) => (g.shape ?? (g.category === "Motion Video" ? "wide" : "square")) === "wide";

export function GraphicsGrid({ filter }: { filter: string }) {
  const items = useMemo(
    () =>
      (filter === "All" ? graphics : graphics.filter((g) => g.category === filter))
        // match on-screen band order so ← → in the lightbox follow the grid
        .slice()
        .sort((a, b) => bandOrder.indexOf(a.category) - bandOrder.indexOf(b.category)),
    [filter],
  );
  const [open, setOpen] = useState<number | null>(null);

  // Motion videos are 16:9 and read best two-up; social pieces are square,
  // three-up. "All" shows each medium as its own band so shapes never mix.
  const groups = bandOrder
    .map((cat) => ({ cat, list: items.filter((g) => g.category === cat) }))
    .filter((g) => g.list.length > 0);

  return (
    <>
      {groups.map(({ cat, list }) => (
        <div key={cat} className="mt-10">
          {filter === "All" ? (
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              {cat} <span className="ml-1 text-faint/70">{list.length}</span>
            </p>
          ) : null}
          <motion.ul
            layout
            className={cn(
              "grid grid-cols-1 gap-5",
              cat === "Motion Video" ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            <AnimatePresence mode="popLayout">
              {list.map((g, i) => (
                <motion.li
                  key={g.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease }}
                >
                  <GraphicCard graphic={g} onOpen={() => setOpen(items.indexOf(g))} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      ))}

      {items.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted">Nothing in this category yet — coming soon.</p>
      ) : null}

      <Lightbox items={items} index={open} onChange={setOpen} />
    </>
  );
}

function GraphicCard({ graphic: g, onOpen }: { graphic: Graphic; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const [touch, setTouch] = useState(false);

  // Touch screens can't hover: play the preview while the card is on screen.
  useEffect(() => {
    if (!g.preview || !window.matchMedia("(hover: none)").matches) return;
    setTouch(true);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.6 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [g.preview]);
  const playing = touch ? inView : hover;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor="view"
      className="group block w-full overflow-hidden rounded-4xl border border-line bg-surface/50 text-left transition-colors duration-500 hover:border-line-strong hover:bg-surface"
      aria-label={`Open ${g.title} (${g.client})`}
    >
      <div
        className={cn("relative overflow-hidden", isWide(g) ? "aspect-video" : "aspect-square")}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={g.thumb}
          alt={`${g.title} — ${g.category.toLowerCase()} for ${g.client}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
        {g.preview ? <PreviewLoop src={g.preview} playing={playing} /> : null}
        <span className="absolute left-4 top-4 rounded-full bg-black/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          {g.tag ?? g.category}
        </span>
        {g.format === "video" ? (
          <span
            className={cn(
              "absolute inset-0 grid place-items-center transition-opacity duration-500",
              playing && "opacity-0",
            )}
          >
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

function PreviewLoop({ src, playing }: { src: string; playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing]);
  return (
    <video
      ref={ref}
      // Only fetched once someone actually hovers / scrolls to it.
      src={playing || ready ? src : undefined}
      muted
      loop
      playsInline
      preload="none"
      onPlaying={() => setReady(true)}
      className={cn(
        "absolute inset-0 size-full object-cover transition-opacity duration-500",
        playing && ready ? "opacity-100" : "opacity-0",
      )}
      aria-hidden
    />
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
                    poster={g.lightboxShape === "vertical" ? undefined : g.thumb}
                    controls
                    autoPlay
                    playsInline
                    className={cn("rounded-2xl bg-black", g.lightboxShape === "vertical" ? "aspect-[9/16] h-full max-h-[calc(100dvh-15rem)] w-auto" : isWide(g) ? "aspect-video w-full max-w-[calc((100dvh-15rem)*16/9)]" : "aspect-square w-full max-w-[calc(100dvh-15rem)]")}
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
