"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroAvatar } from "@/components/sections/HeroAvatar";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { Aurora, Marquee } from "@/components/ui/Primitives";
import { useMounted } from "@/hooks";
import { profile, resumeHref } from "@/lib/data/profile";
import { toolbelt } from "@/lib/data/skills";

/** The two roles Rajat currently holds — real proof, surfaced above the fold. */
const currentRoles = [
  { role: "AI Product Developer", org: "ProductOS" },
  { role: "Senior Web Developer", org: "Virusha Technologies" },
];

/**
 * Centred, 3D-led hero.
 *
 * The glass object sits *behind* the type rather than beside it, so the
 * headline reads as lit by the scene. Everything above the fold is stacked on
 * one axis — status, name, role, CTAs — which is what keeps a composition this
 * busy legible.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mounted = useMounted();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Type lifts and dissolves; the scene sinks and swells, so the two layers
  // separate as you scroll instead of moving as one flat plane.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  // `useScroll` needs a measured element, so the server and the first client
  // render disagree about these transforms. Applying them only after mount
  // keeps the hydrated markup byte-identical to the SSR output.
  const contentStyle = mounted ? { y: contentY, opacity: contentOpacity } : undefined;
  const sceneStyle = mounted ? { y: sceneY, scale: sceneScale } : undefined;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-28 sm:pt-32"
    >
      <Aurora intensity={0.75} />

      <div className="container-page relative">
        <div className="grid items-center gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-6">
          {/* ---------------------------------------------------- Copy -- */}
          <motion.div style={contentStyle} className="relative z-10">
            <Reveal direction="none" duration={0.6}>
              <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[13px] text-muted">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                Available for select projects
              </span>
            </Reveal>

            <h1 className="mt-8 font-display text-[clamp(3.25rem,8.5vw,7rem)] leading-[0.9] tracking-[-0.045em]">
              {/* Colour lives on each word's own animated span: a gradient
                  clipped to text on the outer wrapper isn't painted into the
                  words' composited animation layers (blank on mobile Chrome,
                  descenders cut on desktop). */}
              <RevealText text="Rajat" wordClassName="hero-name-solid" />{" "}
              <RevealText text="Bharti" wordClassName="hero-name-gradient" delay={0.06} />
            </h1>

            <p className="mt-5 font-sans text-[clamp(1.05rem,2vw,1.5rem)] font-light leading-[1.25] tracking-[-0.015em] text-muted">
              <RevealText text="Senior Web Developer" delay={0.2} />
              <span className="text-faint"> &amp; </span>
              <RevealText text="AI Automation Engineer" delay={0.3} />
            </p>

            {/* CSS (not JS) fade: this paragraph is the mobile LCP element. */}
            <div className="fade-up mt-6" style={{ animationDelay: "0.3s" }}>
              <p className="max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
                I build fast, beautiful web products — and the AI automation that runs quietly
                behind them.
              </p>
            </div>

            <Reveal delay={0.58} className="mt-9">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-4">
                <Button href="/portfolio" variant="secondary" size="lg" arrow>
                  View selected work
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Start a project
                </Button>
                <Button
                  href={resumeHref}
                  download={Boolean(profile.resumePdf)}
                  variant="ghost"
                  size="lg"
                  magnetic={false}
                >
                  {profile.resumePdf ? "Download resume" : "View resume"}
                </Button>
              </div>
            </Reveal>

            {/* Current roles */}
            <Reveal delay={0.72} className="mt-12">
              <dl className="flex flex-col gap-4 xs:flex-row xs:items-center xs:gap-7">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
                  Currently
                </dt>
                {currentRoles.map((r, i) => (
                  <dd key={r.org} className="flex items-center gap-7">
                    {i > 0 ? <span className="hidden h-8 w-px bg-line xs:block" aria-hidden /> : null}
                    <span className="flex flex-col">
                      <span className="text-sm leading-tight text-ink">{r.role}</span>
                      <span className="mt-0.5 text-xs text-accent">{r.org}</span>
                    </span>
                  </dd>
                ))}
              </dl>
            </Reveal>
          </motion.div>

          {/* ------------------------------------------ 3D avatar ------ */}
          <motion.div style={sceneStyle} className="relative">
            <HeroAvatar />
          </motion.div>
        </div>
      </div>

      {/* Bottom rail: tool marquee */}
      <div className="container-page relative mt-14 lg:mt-16">
        <Reveal delay={0.86}>
          <div className="flex items-center gap-8 border-t border-line pt-6">
            <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-faint sm:block">
              Toolbelt
            </span>
            <Marquee
              items={toolbelt}
              speed="slow"
              className="flex-1 text-sm text-muted"
              separator="/"
            />
          </div>
        </Reveal>
      </div>

      <ScrollCue />
    </section>
  );
}

function ScrollCue() {
  // In normal flow below the toolbelt (it used to be absolutely positioned at
  // the section's bottom edge and landed on top of the toolbelt rule), and a
  // real button: clicking scrolls to whatever follows the hero.
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const hero = e.currentTarget.closest("section");
    const next = hero?.nextElementSibling as HTMLElement | null;
    const top = next ? next.getBoundingClientRect().top + window.scrollY : window.innerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };
  return (
    // Deliberately NOT tied to the hero's scroll parallax: that lifts content
    // ~110px as you scroll, which slid the cue up onto the toolbelt.
    <div className="relative mt-8 hidden justify-center lg:flex">
      <button
        type="button"
        onClick={onClick}
        aria-label="Scroll to the next section"
        className="group flex flex-col items-center gap-2.5 rounded-full px-4 py-2 transition-opacity hover:opacity-80"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint transition-colors group-hover:text-ink">
          Scroll
        </span>
        {/* A travelling highlight inside a static rail — calmer than a bouncing arrow. */}
        <span className="relative block h-9 w-px overflow-hidden bg-line-strong">
          <motion.span
            className="absolute inset-x-0 block h-3 bg-accent"
            animate={{ y: ["-100%", "400%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
          />
        </span>
      </button>
    </div>
  );
}
