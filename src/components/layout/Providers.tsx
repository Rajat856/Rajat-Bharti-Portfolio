"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./ThemeProvider";

/**
 * Client boundary for everything that needs React context.
 * `reducedMotion="user"` makes every Framer Motion animation in the tree
 * respect the OS setting without per-component guards.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
