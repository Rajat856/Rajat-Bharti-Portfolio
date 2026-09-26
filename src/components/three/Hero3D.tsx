"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCanRender3D, useMediaQuery } from "@/hooks";
import { useTheme } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/utils";

// Code-split: the three.js bundle is only fetched on capable devices.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * Capability gate + graceful fallback for the WebGL hero.
 *
 * Devices that can't (or shouldn't) run WebGL get a CSS-only orb that carries
 * the same visual weight. The page is never broken without the canvas.
 */
export function Hero3D({ className }: { className?: string }) {
  const deviceCapable = useCanRender3D();
  // The scene sits behind the headline, so on small screens it would fight the
  // copy for contrast — and phones are the devices least able to afford the
  // three.js payload. Tablets up get the canvas; below that, the CSS orb.
  const wideEnough = useMediaQuery("(min-width: 768px)");
  const capable = deviceCapable && wideEnough;
  const { theme } = useTheme();
  const [idle, setIdle] = useState(false);

  // Wait for the browser to go idle so the canvas never competes with LCP.
  useEffect(() => {
    if (!capable) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setIdle(true), { timeout: 2000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const timer = setTimeout(() => setIdle(true), 900);
    return () => clearTimeout(timer);
  }, [capable]);

  const show3D = capable && idle;

  return (
    <div className={cn("relative", className)} aria-hidden>
      {show3D ? (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroScene light={theme === "light"} />
        </motion.div>
      ) : (
        <CssOrb />
      )}
    </div>
  );
}

/**
 * Zero-JavaScript fallback. Mirrors the canvas composition — a bright lensed
 * core inside a soft chromatic halo — so devices without WebGL still get the
 * same silhouette behind the headline, just without the refraction.
 */
function CssOrb() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square w-[min(88%,32rem)]">
        {/* Chromatic bloom */}
        <div
          className="absolute inset-0 rounded-full opacity-80 blur-[60px] animate-float"
          style={{
            background:
              "conic-gradient(from 210deg, var(--color-brand-500), var(--color-cyan-glow), var(--color-ember), var(--color-brand-500))",
          }}
        />
        {/* Orbit rings */}
        <div className="absolute inset-[6%] rounded-full border border-line" />
        <div className="absolute inset-[20%] rounded-full border border-line-strong" />
        {/* Glass body */}
        <div
          className="absolute inset-[26%] rounded-full animate-float backdrop-blur-sm"
          style={{
            background:
              "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.4), transparent 52%), " +
              "linear-gradient(150deg, color-mix(in oklab, var(--color-brand-500) 55%, transparent), transparent)",
            boxShadow: "inset 0 0 60px -10px var(--glow-a), 0 40px 110px -25px var(--glow-a)",
            animationDelay: "-1.5s",
          }}
        />
        {/* Emissive core */}
        <div
          className="absolute inset-[44%] rounded-full blur-md"
          style={{ background: "var(--color-brand-400)", opacity: 0.75 }}
        />
      </div>
    </div>
  );
}
