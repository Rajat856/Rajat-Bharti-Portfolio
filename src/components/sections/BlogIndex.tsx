"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { posts, postCategories } from "@/lib/data/posts";
import { PostCard } from "@/components/ui/PostCard";
import { cn } from "@/lib/utils";

export function BlogIndex() {
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(
    () => (filter === "All" ? posts : posts.filter((p) => p.category === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: posts.length };
    for (const p of posts) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, []);

  const [lead, ...rest] = filtered;

  return (
    <section className="relative pb-24 pt-12 sm:pb-32 sm:pt-16">
      <div className="container-page">
        <div
          className="flex flex-wrap items-center gap-2 border-b border-line pb-6"
          role="tablist"
          aria-label="Filter posts by category"
        >
          {postCategories.map((cat) => {
            const count = counts[cat] ?? 0;
            const selected = filter === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={selected}
                disabled={count === 0}
                onClick={() => setFilter(cat)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-30",
                  selected ? "text-canvas" : "text-muted hover:text-ink",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="blog-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {cat}
                <span
                  className={cn(
                    "ml-1.5 font-mono text-[10px]",
                    selected ? "opacity-70" : "text-faint",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-10 space-y-5">
          <AnimatePresence mode="popLayout">
            {lead ? (
              <motion.div
                key={lead.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <PostCard post={lead} featured />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.ul layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {rest.map((post, i) => (
                <motion.li
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PostCard post={post} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </motion.div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted">No posts in this category yet.</p>
        ) : null}
      </div>
    </section>
  );
}
