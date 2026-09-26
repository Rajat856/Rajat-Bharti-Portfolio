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
 * Devices that can't (or shouldn't) run WebGL get a still image rendered from
 * the same scene, so the hero looks identical minus the motion.
 */
export function Hero3D({ className }: { className?: string }) {
  const deviceCapable = useCanRender3D();
  // Phones are the devices least able to afford the three.js payload, so
  // tablets and up get the live canvas; below that, the pre-rendered still.
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
      ) : capable ? null : (
        // Phones and no-WebGL devices get a still rendered from this exact
        // scene. Capable desktops show nothing until the canvas mounts, so the
        // lid-opening intro isn't preceded by an already-open laptop.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/hero/laptop-still.webp"
          alt=""
          className="absolute inset-0 size-full object-contain"
          loading="eager"
        />
      )}
    </div>
  );
}
