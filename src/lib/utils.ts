import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://rajatbharti.com";

export function absoluteUrl(path = "") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Deterministic pseudo-random in [0,1) — keeps SSR and client markup identical. */
export function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Responsive sources for cover images. Every /projects/*.jpg and /blog/*.jpg
 * has pre-generated WebP siblings at 640w and 1200w (`<name>-640.webp`,
 * `<name>-1200.webp`); the original JPG stays as the fallback `src`.
 * Regenerate them whenever a cover is added or replaced.
 */
export function responsiveImage(src?: string): { src?: string; srcSet?: string } {
  if (!src || !/^\/(projects|blog)\/[^/]+\.jpg$/.test(src)) return { src };
  const base = src.slice(0, -4);
  return { src, srcSet: `${base}-640.webp 640w, ${base}-1200.webp 1200w` };
}
