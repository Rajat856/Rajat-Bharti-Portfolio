"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { cn, seeded } from "@/lib/utils";
import { useMounted, useReducedMotion } from "@/hooks";

/* ------------------------------------------------------------------ Badge - */
export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "brand" | "success";
}) {
  const tones = {
    neutral: "border-line text-muted bg-surface-2/60",
    brand: "border-brand-500/30 text-accent bg-brand-500/10",
    success: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-tight",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- CountUp -- */
export function CountUp({
  to,
  suffix = "",
  duration = 1600,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/* --------------------------------------------------------------- Marquee -- */
export function Marquee({
  items,
  speed = "normal",
  reverse = false,
  className,
  itemClassName,
  separator = "•",
}: {
  items: readonly string[];
  speed?: "normal" | "slow";
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  separator?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("mask-fade-x relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-8 pr-8",
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee",
        )}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((item, i) => (
          // Vertical padding (in the item's own em) keeps descenders of large
          // display text inside the overflow-hidden track.
          <span key={`${item}-${i}`} className={cn("flex items-center gap-8 py-[0.12em]", itemClassName)}>
            <span className="whitespace-nowrap">{item}</span>
            <span className="text-faint" aria-hidden>
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Aurora -- */
/** Soft animated gradient blobs — the ambient light behind most sections. */
export function Aurora({
  className,
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className="absolute left-[8%] top-[-18%] size-[46rem] rounded-full blur-[120px] animate-float"
        style={{ background: "var(--glow-a)", opacity: 0.9 * intensity }}
      />
      <div
        className="absolute right-[-10%] top-[22%] size-[38rem] rounded-full blur-[130px] animate-float"
        style={{ background: "var(--glow-b)", opacity: 0.9 * intensity, animationDelay: "-2.5s" }}
      />
      <div
        className="absolute bottom-[-20%] left-[32%] size-[34rem] rounded-full blur-[140px] animate-float"
        style={{ background: "var(--glow-c)", opacity: 0.9 * intensity, animationDelay: "-5s" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------- Grid - */
export function GridLines({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      aria-hidden
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 78%)",
      }}
    />
  );
}

/* ---------------------------------------------------------------- Parallax */
export function Parallax({
  children,
  className,
  distance = 80,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  direction?: "up" | "down";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sign = direction === "up" ? -1 : 1;
  const raw = useTransform(scrollYProgress, [0, 1], [distance * -sign * 0.5, distance * sign * 0.5]);
  const y = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 });

  // Target-based scroll progress can't be measured server-side, so the
  // transform is only applied once mounted — otherwise hydration mismatches.
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced || !mounted ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* ------------------------------------------------------------ ScrollMeter - */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[linear-gradient(90deg,var(--color-brand-500),var(--color-cyan-glow))]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

/* ------------------------------------------------------------- Starfield -- */
/** Deterministic dot field — seeded so SSR and client markup match exactly. */
export function Starfield({ count = 46, className }: { count?: number; className?: string }) {
  // Values are rounded to fixed precision before they reach the style object.
  // `seeded()` is deterministic, but raw floats serialize to CSS with different
  // precision on the server than on the client, which trips React's hydration
  // check on every dot. Pre-rounded strings render byte-identically on both.
  const dots = Array.from({ length: count }, (_, i) => ({
    left: `${(seeded(i + 1) * 100).toFixed(3)}%`,
    top: `${(seeded(i + 91) * 100).toFixed(3)}%`,
    size: `${(1 + seeded(i + 181) * 1.8).toFixed(2)}px`,
    delay: `${(seeded(i + 271) * 4).toFixed(2)}s`,
    opacity: Number(((0.15 + seeded(i + 361) * 0.5) * 0.75).toFixed(3)),
  }));

  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10", className)} aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-shimmer"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            // Accent-tinted rather than ink, so the field reads as atmosphere
            // in dark mode and doesn't look like dust in light mode.
            background: "var(--accent)",
            opacity: d.opacity,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ SpotlightBg - */
/** Follows the pointer across a section with a soft radial highlight. */
export function Spotlight({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current?.parentElement;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set(((e.clientX - rect.left) / rect.width) * 100);
      my.set(((e.clientY - rect.top) / rect.height) * 100);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced]);

  const background = useTransform(
    [mx, my],
    ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${x}% ${y}%, var(--glow-a), transparent 62%)`,
  );

  return (
    <motion.div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0 -z-10 opacity-70", className)}
      style={{ background }}
      aria-hidden
    />
  );
}
