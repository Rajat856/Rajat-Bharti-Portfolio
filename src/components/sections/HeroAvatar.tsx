"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { useReducedMotion } from "@/hooks";

/**
 * 3D avatar stage for the homepage hero.
 *
 * The glow disc, the avatar and the floating cards sit on separate Z planes
 * inside one preserve-3d stage that tilts toward the cursor, so the layers
 * shift against each other like a physical object rather than moving as a
 * single flat image.
 */
export function HeroAvatar() {
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = stage.current;
    if (!el || reduced) return;
    let raf = 0;
    const cur = { x: 0, y: 0 };
    const tgt = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      tgt.x = (e.clientX / window.innerWidth) * 2 - 1;
      tgt.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const tick = () => {
      cur.x += (tgt.x - cur.x) * 0.07;
      cur.y += (tgt.y - cur.y) * 0.07;
      el.style.transform = `rotateY(${cur.x * 14}deg) rotateX(${-cur.y * 10}deg)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  const card =
    "glass absolute rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 shadow-[0_24px_50px_-20px_rgba(20,10,60,0.4)]";
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="relative mx-auto aspect-[4/5] w-[88%] max-w-[460px] [perspective:1100px] sm:w-full">
      <div ref={stage} className="absolute inset-0 [transform-style:preserve-3d] will-change-transform">
        {/* Back plane: glow disc + ring */}
        <div
          className="absolute inset-[8%] rounded-full [transform:translateZ(-80px)]"
          aria-hidden
          style={{
            background:
              "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--color-brand-500) 55%, transparent), color-mix(in oklab, var(--color-cyan-glow) 25%, transparent) 55%, transparent 72%)",
          }}
        />
        <div
          className="absolute inset-[4%] rounded-full border border-line-strong [transform:translateZ(-60px)]"
          aria-hidden
        />

        {/* Soft floor shadow — a separate element, not a CSS filter: a
            drop-shadow on an image inside a 3D-transformed stage gets
            rasterised as a rectangle and shows as a faint panel. */}
        <div
          className="absolute inset-x-[18%] bottom-[2%] h-[10%] rounded-full bg-[rgba(20,10,60,0.28)] blur-2xl"
          aria-hidden
        />

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/avatar-3d-character.webp"
            alt={`${profile.name} — 3D portrait`}
            width={783}
            height={1100}
            fetchPriority="high"
            className="relative size-full object-contain object-bottom"
            style={{
              // The render is waist-up; fade its crop line into the page.
              WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Front plane: floating cards, each at its own depth */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute inset-0 [transform-style:preserve-3d]"
          aria-hidden
        >
          <div className={`${card} left-0 top-[12%] [transform:translateZ(90px)] sm:-left-12`}>
            <p className="font-display text-3xl leading-none">{projects.length}</p>
            <p className="mt-1 text-xs text-muted">sites shipped</p>
          </div>
          <div className={`${card} right-0 top-[42%] [transform:translateZ(130px)] sm:-right-10`}>
            <p className="text-xs text-muted">Builds on</p>
            <p className="mt-1 text-xs font-medium sm:text-sm">Shopify · Webflow · WordPress</p>
          </div>
          <div className={`${card} right-4 bottom-[6%] [transform:translateZ(70px)]`}>
            <p className="font-display text-3xl leading-none">5+</p>
            <p className="mt-1 text-xs text-muted">years building</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
