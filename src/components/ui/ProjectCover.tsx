import { cn, responsiveImage } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

/**
 * Generated cover art. Rather than a flat gradient (which reads as a missing
 * image), each cover composes a stylised browser frame over the project's
 * colour pair — so the card looks deliberately designed with zero binary
 * assets. Drop a real screenshot at `cover.image` and it takes over.
 */
export function ProjectCover({
  project,
  className,
  detail = "full",
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  project: Project;
  className?: string;
  /** "full" for large cards, "mini" for the hover preview and small tiles. */
  detail?: "full" | "mini";
  /** Above-the-fold cover (the page's LCP image): load eagerly, high priority. */
  priority?: boolean;
  sizes?: string;
}) {
  const { from, to, image } = project.cover;
  const label = project.title.split(" — ")[0];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      />
      {/* Light source */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_14%,rgba(255,255,255,0.34),transparent_58%)]" />
      {/* Depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.42),transparent_58%)]" />

      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...responsiveImage(image)}
          sizes={sizes}
          alt={`${label} — project screenshot`}
          // Covers are 4:3 device mockups whose screen sits in the upper-middle
          // of the scene (measured: ~15–70% of the height across all five
          // backdrops). Anchoring the crop at 35% keeps the whole screen in
          // view even in the widest 21:9 frame, where a centred crop cut off
          // the site's nav. No hover zoom — it cropped the device out of frame.
          className="absolute inset-0 size-full object-cover object-[center_35%]"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      ) : (
        <BrowserMock label={label} detail={detail} />
      )}
    </div>
  );
}

function BrowserMock({ label, detail }: { label: string; detail: "full" | "mini" }) {
  const mini = detail === "mini";

  return (
    // Anchored to fill the lower portion of the frame, so the mock scales with
    // the card's aspect ratio instead of leaving dead gradient above it.
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 flex justify-center",
        mini ? "top-[26%] px-5" : "top-[20%] px-[8%]",
      )}
      aria-hidden
    >
      <div
        className={cn(
          "flex w-full flex-col overflow-hidden border border-white/25 bg-black/25 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-[2px] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[-3%]",
          mini ? "rounded-t-lg" : "rounded-t-2xl",
        )}
      >
        {/* Chrome bar */}
        <div
          className={cn(
            "flex items-center gap-1.5 border-b border-white/15 bg-white/10",
            mini ? "px-2.5 py-1.5" : "px-4 py-2.5",
          )}
        >
          <span className={cn("rounded-full bg-white/45", mini ? "size-1" : "size-1.5")} />
          <span className={cn("rounded-full bg-white/30", mini ? "size-1" : "size-1.5")} />
          <span className={cn("rounded-full bg-white/20", mini ? "size-1" : "size-1.5")} />
          <span
            className={cn(
              "ml-2 flex-1 truncate rounded-full bg-white/10 text-white/70",
              mini ? "px-1.5 py-0.5 text-[6px]" : "px-3 py-1 text-[10px]",
            )}
          >
            {label.toLowerCase().replace(/\s+/g, "")}
          </span>
        </div>

        {/* Abstract page content — flex-1 rows so it fills whatever height the
            card's aspect ratio leaves. */}
        <div className={cn("flex min-h-0 flex-1 flex-col", mini ? "gap-1.5 p-2.5" : "gap-3 p-5")}>
          <div className={cn("shrink-0 rounded bg-white/45", mini ? "h-1.5 w-2/5" : "h-3 w-2/5")} />
          <div className={cn("shrink-0 rounded bg-white/20", mini ? "h-1 w-3/5" : "h-2 w-3/5")} />
          <div className={cn("grid min-h-0 flex-[2] grid-cols-3", mini ? "gap-1.5" : "gap-3")}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded border border-white/15 bg-white/10" />
            ))}
          </div>
          {!mini ? (
            <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
              <div className="rounded border border-white/15 bg-white/[0.07]" />
              <div className="rounded border border-white/15 bg-white/[0.07]" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
