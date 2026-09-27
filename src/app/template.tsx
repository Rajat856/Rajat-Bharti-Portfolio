/**
 * Page transition.
 *
 * Next.js remounts `template.tsx` on every navigation, so a CSS enter
 * animation replays per route. It's pure CSS (not framer-motion) so the page
 * paints as soon as the HTML arrives — an `initial={{ opacity: 0 }}` here kept
 * every page invisible until hydration and pushed LCP past 4s on mobile.
 *
 * Deliberately no `<AnimatePresence mode="wait">`: holding the outgoing page
 * in the tree desynchronises React from the App Router's segment swap and
 * page-level click/state handlers stop firing after client navigation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="page-enter">
      {children}
    </main>
  );
}
