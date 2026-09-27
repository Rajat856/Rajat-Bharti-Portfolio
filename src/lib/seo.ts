import type { Metadata } from "next";
import { profile } from "@/lib/data/profile";
import { absoluteUrl } from "@/lib/utils";

/**
 * Per-page metadata with the social tags filled in.
 *
 * Next merges `openGraph` / `twitter` shallowly, so a page that only sets
 * `title` + `description` inherits the homepage's share card. Every page goes
 * through here so links shared on LinkedIn/WhatsApp/X show the right title,
 * description and image.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  keywords,
  extra,
}: {
  /** Page part of the title; the layout template appends " · Rajat Bharti". */
  title: string;
  description: string;
  path: string;
  /** Absolute or root-relative image; defaults to the generated site card. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  keywords?: string[];
  extra?: Partial<Metadata>;
}): Metadata {
  const fullTitle = `${title} · ${profile.name}`;
  const img = image ?? "/opengraph-image";
  const images = [
    image
      ? { url: img, alt: imageAlt ?? title }
      : { url: img, width: 1200, height: 630, alt: imageAlt ?? profile.name },
  ];
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: absoluteUrl(path),
      siteName: `${profile.name} — Portfolio`,
      locale: "en_IN",
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img],
    },
    ...extra,
  };
}

/** schema.org BreadcrumbList for nested pages. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
