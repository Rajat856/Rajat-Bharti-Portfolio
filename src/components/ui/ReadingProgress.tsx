"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin article-progress bar, offset below the global scroll meter. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed inset-x-0 top-[2px] z-[69] h-[2px] origin-left bg-accent/45"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
