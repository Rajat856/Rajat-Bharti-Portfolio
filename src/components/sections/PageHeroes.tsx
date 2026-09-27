"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { projects } from "@/lib/data/projects";
import { profile, resumeHref } from "@/lib/data/profile";
import { toolbelt } from "@/lib/data/skills";
import { responsiveImage } from "@/lib/utils";

/**
 * Page-level heroes (originally prototyped on a since-removed test page):
 *  - <ReelHero>      (lab option A) — used on /portfolio
 *  - <SpotlightHero> (lab option F) — used on /services
 *  - <BentoHero>     (page-lab option I) — used on /about
 */

const ease = [0.16, 1, 0.3, 1] as const;
const withCovers = projects.filter((p) => p.cover.image).map((p) => p.cover.image as string);

/* ================================================ Reel (portfolio) ====== */

export function ReelHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  const rowA = withCovers.filter((_, i) => i % 2 === 0);
  const rowB = withCovers.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-32">
      <div className="container-page relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.05 }}
          className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,7vw,6.2rem)] leading-[0.95] tracking-[-0.04em]"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <Button href={primary.href} variant="secondary" size="lg" arrow>
            {primary.label}
          </Button>
          <Button href={secondary.href} variant="outline" size="lg">
            {secondary.label}
          </Button>
        </motion.div>
      </div>

      {/* Tilted, drifting wall of real project mockups */}
      <div className="relative mt-16 h-[44vh] min-h-[300px] [perspective:1400px]" aria-hidden>
        <div className="absolute inset-x-[-10%] top-0 space-y-5 [transform:rotateX(24deg)_rotateZ(-7deg)] [transform-origin:50%_0%]">
          {[rowA, rowB].map((row, r) => (
            <div key={r} className="flex overflow-hidden">
              <div
                className="flex w-max shrink-0 gap-5 pr-5 animate-marquee-slow"
                style={r === 1 ? { animationDirection: "reverse" } : undefined}
              >
                {[...row, ...row].map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="aspect-[4/3] w-[300px] shrink-0 overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(20,10,60,0.45)] sm:w-[380px]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      {...responsiveImage(src)}
                      sizes="380px"
                      alt=""
                      className="size-full object-cover"
                      // First tiles are on screen at load (and are the LCP image).
                      loading={i < 4 ? "eager" : "lazy"}
                      fetchPriority={r === 0 && i < 2 ? "high" : "auto"}
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--canvas),transparent_14%,transparent_86%,var(--canvas))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,var(--canvas),transparent)]" />
      </div>
    </section>
  );
}

/* ========================================== Spotlight (services) ======= */

export function SpotlightHero({
  eyebrow,
  title,
  description,
  hint = "Move your cursor to see the work",
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  description: string;
  hint?: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  const ref = useRef<HTMLElement>(null);
  const tiles = withCovers.slice(0, 12);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = (x: number, y: number) => {
      el.style.setProperty("--sx", `${x}px`);
      el.style.setProperty("--sy", `${y}px`);
    };
    const local = (cx: number, cy: number) => {
      const r = el.getBoundingClientRect();
      return [cx - r.left, cy - r.top] as const;
    };

    // Mouse: spotlight follows the cursor.
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "mouse") set(...local(e.clientX, e.clientY));
    };

    // Touch has no hover: follow the finger while touching, otherwise let the
    // spotlight drift on its own so phones still see the colour reveal.
    const touch = window.matchMedia("(hover: none)").matches;
    let lastTouch = -1e9;
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      lastTouch = performance.now();
      set(...local(t.clientX, t.clientY));
    };
    let raf = 0;
    const drift = (now: number) => {
      if (now - lastTouch > 1800) {
        const r = el.getBoundingClientRect();
        const t = now / 1000;
        set(
          r.width * (0.5 + 0.34 * Math.sin(t * 0.55)),
          r.height * (0.5 + 0.36 * Math.sin(t * 0.37 + 1.3)),
        );
      }
      raf = requestAnimationFrame(drift);
    };

    el.addEventListener("pointermove", onPointer);
    if (touch) {
      el.addEventListener("touchstart", onTouch, { passive: true });
      el.addEventListener("touchmove", onTouch, { passive: true });
      raf = requestAnimationFrame(drift);
    }
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onPointer);
      el.removeEventListener("touchstart", onTouch);
      el.removeEventListener("touchmove", onTouch);
    };
  }, []);

  const grid = (
    <>
      {tiles.map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} {...responsiveImage(src)} sizes="(min-width: 768px) 25vw, 50vw" alt="" className="aspect-[4/3] w-full rounded-2xl object-cover" decoding="async" />
      ))}
    </>
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-canvas pb-16 pt-32 [--sx:50%] [--sy:45%]"
    >
      {/* Faint work grid, always hinted */}
      {/* Two large columns on phones (three read as thumbnails), four on desktop.
          A touch brighter on mobile since there's no spotlight there, and on
          the light theme, where a faint grid washes out against the pale canvas. */}
      <div className="absolute inset-[-6%] grid content-center grid-cols-2 gap-3 p-3 opacity-[0.3] md:inset-[-4%] md:grid-cols-4 md:gap-4 md:p-4 md:opacity-[0.2] dark:opacity-[0.22] dark:md:opacity-[0.13]" aria-hidden>
        {grid}
      </div>
      {/* Same grid, fully lit inside the spotlight (cursor on desktop; finger
          or an automatic drift on touch screens). */}
      <div
        className="absolute inset-[-6%] grid grid-cols-2 content-center gap-3 p-3 [--r:240px] md:inset-[-4%] md:grid-cols-4 md:gap-4 md:p-4 md:[--r:420px]"
        style={{
          WebkitMaskImage: "radial-gradient(var(--r) circle at var(--sx) var(--sy), black 0%, black 35%, transparent 75%)",
          maskImage: "radial-gradient(var(--r) circle at var(--sx) var(--sy), black 0%, black 35%, transparent 75%)",
        }}
        aria-hidden
      >
        {grid}
      </div>
      {/* Vignette in the page colour, so the hero follows the light/dark theme
          (a little heavier on light, where bright tiles compete with dark text). */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--canvas)_80%,transparent)_25%,color-mix(in_oklab,var(--canvas)_42%,transparent)_65%,var(--canvas)_100%)] md:bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--canvas)_74%,transparent)_20%,color-mix(in_oklab,var(--canvas)_32%,transparent)_55%,var(--canvas)_95%)] dark:bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--canvas)_72%,transparent)_25%,color-mix(in_oklab,var(--canvas)_35%,transparent)_65%,var(--canvas)_100%)] dark:md:bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--canvas)_62%,transparent)_20%,color-mix(in_oklab,var(--canvas)_25%,transparent)_55%,var(--canvas)_95%)]" />

      <div className="container-page pointer-events-none relative z-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/55">{eyebrow}</p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.8rem,7.5vw,6.5rem)] leading-[0.92] tracking-[-0.045em] text-ink"
        >
          {title}
        </motion.h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">{description}</p>
        <div className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-3">
          <Button href={primary.href} variant="secondary" size="lg" arrow>
            {primary.label}
          </Button>
          <a
            href={secondary.href}
            className="inline-flex h-13 items-center rounded-full border border-ink/25 px-7 text-[15px] font-medium text-ink transition-colors hover:bg-ink/5"
          >
            {secondary.label}
          </a>
        </div>
        <p className="mt-10 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40 md:block">
          {hint}
        </p>
      </div>
    </section>
  );
}

const years = new Date().getFullYear() - 2020;
const bentoIn = (d = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay: d },
});

/* ============================================ Bento (about) ============ */
export function BentoHero({ headingAs: H = "h1" }: { headingAs?: "h1" | "h2" }) {
  const cover = projects.find((p) => p.cover.image)?.cover.image;
  return (
    <section className="relative pb-16 pt-32">
      <div className="container-page">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">About</p>
        <div className="mt-6 grid auto-rows-[minmax(150px,auto)] gap-4 md:grid-cols-4">
          <motion.div {...bentoIn(0.05)} className="rounded-3xl border border-line bg-surface p-8 md:col-span-2 md:row-span-2">
            <H className="font-display text-[clamp(2.4rem,4.5vw,4rem)] leading-[0.95] tracking-[-0.04em]">Hi, I&apos;m {profile.firstName}.</H>
            <p className="mt-5 max-w-md text-muted">{profile.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="secondary" arrow>Work with me</Button>
              <Button href={resumeHref} download={Boolean(profile.resumePdf)} variant="outline">{profile.resumePdf ? "Download resume" : "View resume"}</Button>
            </div>
          </motion.div>
          <motion.div {...bentoIn(0.1)} className="overflow-hidden rounded-3xl border border-line md:row-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.avatar} alt={profile.name} className="size-full min-h-[260px] object-cover" />
          </motion.div>
          <motion.div {...bentoIn(0.15)} className="flex flex-col justify-between rounded-3xl bg-accent p-6 text-white">
            <p className="text-sm opacity-80">Experience</p><p className="font-display text-6xl">{years}+<span className="text-2xl"> yrs</span></p>
          </motion.div>
          <motion.div {...bentoIn(0.2)} className="flex flex-col justify-between rounded-3xl border border-line bg-surface p-6">
            <p className="text-sm text-muted">Based in</p><p className="font-display text-3xl">Bengaluru, India</p>
          </motion.div>
          <motion.div {...bentoIn(0.25)} className="relative overflow-hidden rounded-3xl border border-line md:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {cover ? <img {...responsiveImage(cover)} sizes="50vw" alt="" className="absolute inset-0 size-full object-cover" /> : null}
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.6),transparent)]" />
            <p className="absolute bottom-5 left-6 font-display text-3xl text-white">{projects.length} sites shipped</p>
          </motion.div>
          <motion.div {...bentoIn(0.3)} className="flex flex-wrap content-center gap-2 rounded-3xl border border-line bg-surface p-6 md:col-span-2">
            {toolbelt.map((t) => <span key={t} className="rounded-full bg-surface-2 px-3 py-1.5 text-sm">{t}</span>)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

