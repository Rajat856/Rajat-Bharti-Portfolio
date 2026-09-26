"use client";

import { useEffect, useState } from "react";

/** True when the user has asked the OS to reduce motion. SSR-safe (false first). */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Fine pointer + hover — used to gate the custom cursor and heavier effects. */
export function usePointerFine() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/** Scroll position past a threshold, throttled to animation frames. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}

/** Has the component mounted on the client? Guards portals and window access. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/**
 * Rough device-capability check used to decide whether to mount the WebGL
 * scene. Deliberately conservative — the site must be complete without it.
 */
export function useCanRender3D() {
  const reduced = useReducedMotion();
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    if (reduced) {
      setCapable(false);
      return;
    }
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;

    if (saveData || cores < 4 || mem < 4) {
      setCapable(false);
      return;
    }

    // Confirm a WebGL context can actually be created before mounting a canvas.
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl");
      setCapable(Boolean(gl));
    } catch {
      setCapable(false);
    }
  }, [reduced]);

  return capable;
}
