"use client";

import { motion } from "framer-motion";

/**
 * Page transition.
 *
 * Next.js remounts `template.tsx` on every navigation, so an enter-only
 * animation replays per route with no `AnimatePresence` involved.
 *
 * This deliberately does NOT use `<AnimatePresence mode="wait">`: holding the
 * outgoing page in the tree desynchronises React's reconciliation against the
 * App Router's segment swap, and every page-level `onClick`/state handler in
 * the newly mounted subtree silently stops firing after a client-side
 * navigation (filters, tabs, carousels and forms all go dead). The enter-only
 * transition looks near-identical and keeps the page interactive.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  );
}
