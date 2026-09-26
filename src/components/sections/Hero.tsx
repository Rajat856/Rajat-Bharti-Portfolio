"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { Hero3D } from "@/components/three/Hero3D";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { Aurora, Marquee } from "@/components/ui/Primitives";
import { useMounted } from "@/hooks";
import { profile, resumeHref } from "@/lib/data/profile";
import { toolbelt } from "@/lib/data/skills";

/** The two roles Rajat currently holds — real proof, surfaced above the fold. */
const currentRoles = [
  { role: "Chief of Staff", org: "ProductOS" },
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
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);

  // `useScroll` needs a measured element, so the server and the first client
  // render disagree about these transforms. Applying them only after mount
  // keeps the hydrated markup byte-identical to the SSR output.
  const contentStyle = mounted ? { y: contentY, opacity: contentOpacity } : undefined;
  const sceneStyle = mounted ? { y: sceneY, scale: sceneScale } : undefined;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-28 sm:pt-32"
    >
      <Aurora intensity={0.75} />

      {/* Stage floor — a soft horizon that gives the object something to
          stand on, so it doesn't float in an empty void. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[8] h-[55%]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, var(--glow-a), transparent 70%)",
        }}
      />

      {/* 3D layer — centred behind the headline. */}
      <motion.div
        style={sceneStyle}
        className="pointer-events-none absolute inset-0 -z-[5] mx-auto flex items-center justify-center"
      >
        {/* Lifted above centre so the object crowns the wordmark instead of
            sitting behind the CTA row, where it competes with the buttons. */}
        <Hero3D className="aspect-square h-[min(72vh,38rem)] w-[min(92vw,38rem)] -translate-y-[8%] opacity-70 sm:opacity-100" />
      </motion.div>

      {/* Vignette: takes just enough light out from behind the type to hold
          contrast. Kept light — push this higher and it erases the object it
          is supposed to be sitting on. */}
      <div
        className="pointer-events-none absolute inset-0 -z-[4]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 52% 34% at 50% 44%, color-mix(in oklab, var(--canvas) 55%, transparent), transparent 70%)",
        }}
      />

      <motion.div style={contentStyle} className="container-page relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Status pill */}
          <Reveal direction="none" duration={0.6}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[13px] text-muted">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              Available for select projects
            </span>
          </Reveal>

          {/* Wordmark */}
          <h1 className="mt-8 font-display text-[clamp(3.25rem,12vw,9rem)] leading-[0.88] tracking-[-0.045em] sm:mt-10">
            <RevealText text="Rajat Bharti" className="hero-name hero-name-glow" />
          </h1>

          <p className="mt-6 font-sans text-[clamp(1.05rem,2.4vw,1.75rem)] font-light leading-[1.2] tracking-[-0.015em] text-muted">
            <RevealText text="Senior Web Developer" delay={0.2} />
            <span className="text-faint"> &amp; </span>
            <RevealText text="AI Automation Engineer" delay={0.3} />
          </p>

          <Reveal delay={0.46} className="mt-7">
            <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              I build fast, beautiful web products — and the AI automation that runs quietly
              behind them.
            </p>
          </Reveal>

          <Reveal delay={0.58} className="mt-10">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
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

          {/* Meta rail — location, live clock, current roles. Sits on glass so
              it stays readable wherever the scene is brightest. */}
          <Reveal delay={0.72} className="mt-14 w-full sm:mt-16">
            <div className="glass mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-2xl px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <span className="inline-flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" aria-hidden />
                  {profile.locationShort}
                </span>
                <span className="h-3 w-px bg-line-strong" aria-hidden />
                <LocalTime />
              </span>

              <span className="hidden h-8 w-px bg-line sm:block" aria-hidden />

              <dl className="flex flex-col gap-4 xs:flex-row xs:items-center xs:gap-7">
                <dt className="sr-only">Currently</dt>
                {currentRoles.map((r, i) => (
                  <dd key={r.org} className="flex items-center gap-7">
                    {i > 0 ? (
                      <span className="hidden h-8 w-px bg-line xs:block" aria-hidden />
                    ) : null}
                    <span className="flex flex-col text-left">
                      <span className="text-sm leading-tight text-ink">{r.role}</span>
                      <span className="mt-0.5 text-xs text-accent">{r.org}</span>
                    </span>
                  </dd>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </motion.div>

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

      <ScrollCue style={contentStyle} />
    </section>
  );
}

/**
 * Live Bengaluru time. Renders nothing until mounted — a clock is the textbook
 * hydration mismatch, and an empty first paint is cheaper than a patch-up.
 */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ? `${time} IST` : " "}
    </span>
  );
}

function ScrollCue({ style }: { style?: React.ComponentProps<typeof motion.div>["style"] }) {
  return (
    <motion.div
      style={style}
      className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto hidden w-fit flex-col items-center gap-2.5 lg:flex"
      aria-hidden
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">Scroll</span>
      {/* A travelling highlight inside a static rail — calmer than a bouncing arrow. */}
      <span className="relative block h-9 w-px overflow-hidden bg-line-strong">
        <motion.span
          className="absolute inset-x-0 block h-3 bg-accent"
          animate={{ y: ["-100%", "400%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
        />
      </span>
    </motion.div>
  );
}
