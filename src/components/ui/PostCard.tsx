import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/data/posts";
import { cn, responsiveImage } from "@/lib/utils";

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-cursor="view"
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong hover:bg-surface",
        featured && "md:flex-row",
      )}
    >
      {/* Generated cover */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden",
          featured ? "aspect-[16/10] md:aspect-auto md:w-[46%]" : "aspect-[16/10]",
        )}
      >
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(140deg, ${post.cover.from}, ${post.cover.to})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.28),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent_55%)]" />

        {post.cover.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            {...responsiveImage(post.cover.image)}
            sizes="(min-width: 1024px) 33vw, 100vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        ) : null}

        {/* Abstract "article" lines — only for posts without a real image, so
            the fallback reads as artwork rather than a missing picture. */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 space-y-2",
            featured ? "px-8 pb-8" : "px-6 pb-6",
            post.cover.image && "hidden",
          )}
          aria-hidden
        >
          <div className="h-2 w-3/5 rounded-full bg-white/45" />
          <div className="h-1.5 w-4/5 rounded-full bg-white/25" />
          <div className="h-1.5 w-2/5 rounded-full bg-white/15" />
        </div>

        <span className="absolute left-4 top-4 rounded-full bg-black/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 font-mono text-[11px] text-faint">
          <time dateTime={post.dateISO}>{post.date}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h3
          className={cn(
            "mt-3 font-display tracking-tight transition-colors duration-500 group-hover:text-accent",
            featured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          {post.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
          {post.excerpt}
        </p>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent">
          Read
          <ArrowUpRight
            className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
