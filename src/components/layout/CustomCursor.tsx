"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine, useReducedMotion } from "@/hooks";

type CursorState = "default" | "hover" | "view" | "text" | "drag";

const LABELS: Record<CursorState, string> = {
  default: "",
  hover: "",
  view: "View",
  text: "",
  drag: "Drag",
};

/**
 * Two-element cursor: a small instant dot and a lagging ring.
 * Elements opt into states with `data-cursor="view" | "hover" | "text" | "drag"`.
 */
export function CustomCursor() {
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.55 });

  useEffect(() => {
    if (!fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      setVisible(true);

      const el = (e.target as HTMLElement | null)?.closest?.<HTMLElement>("[data-cursor]");
      if (el) {
        setState((el.dataset.cursor as CursorState) ?? "hover");
        return;
      }
      const interactive = (e.target as HTMLElement | null)?.closest?.(
        'a, button, [role="button"], input, textarea, select, summary',
      );
      setState(interactive ? "hover" : "default");
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [fine, reduced, x, y]);

  if (!fine || reduced) return null;

  const label = LABELS[state];
  const ringSize = state === "view" ? 76 : state === "text" ? 4 : state === "hover" ? 52 : 32;

  return (
    <div className="custom-cursor-root pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      {/* Instant dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-ink transition-opacity duration-200"
        style={{ opacity: visible && state !== "view" ? 1 : 0 }}
      />
      {/* Lagging ring */}
      <motion.div
        className="fixed left-0 top-0 grid place-items-center rounded-full border border-line-strong backdrop-blur-[2px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: state === "text" ? 26 : ringSize,
          borderRadius: state === "text" ? 2 : 999,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.86 : 1,
          backgroundColor:
            state === "view" ? "rgba(124,92,255,0.92)" : "rgba(124,92,255,0)",
          borderColor:
            state === "view" ? "rgba(124,92,255,0)" : "var(--line-strong)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      >
        {label ? (
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            {label}
          </span>
        ) : null}
      </motion.div>
    </div>
  );
}
