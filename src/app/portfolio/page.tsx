import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ReelHero } from "@/components/sections/PageHeroes";
import { projects } from "@/lib/data/projects";
import { graphics } from "@/lib/data/graphics";
import { absoluteUrl } from "@/lib/utils";
import { profile } from "@/lib/data/profile";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { CallToAction } from "@/components/sections/CallToAction";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio — Shopify, Webflow & WordPress Work",
  description:
    "34 client websites across Shopify, Webflow, WordPress and custom code, plus social media creatives, Instagram reels and motion videos by Rajat Bharti.",
  path: "/portfolio",
  type: "website",
  keywords: ["web developer portfolio", "Shopify portfolio", "Webflow portfolio", "WordPress portfolio", "social media creatives", "motion graphics portfolio"],
});

/** Videos are only playable in the lightbox, so describe them for search. */
const videoSchemas = graphics
  .filter((g) => g.format === "video")
  .map((g) => ({
    "@type": "VideoObject",
    name: g.title,
    description: g.description ?? `${g.category} by ${profile.name} for ${g.client}.`,
    thumbnailUrl: absoluteUrl(g.thumb),
    contentUrl: absoluteUrl(g.src),
    uploadDate: g.published ?? `${g.year}-01-01`,
    creator: { "@type": "Person", "@id": absoluteUrl("/#person"), name: profile.name },
  }));

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `Portfolio — ${profile.name}`,
  url: absoluteUrl("/portfolio"),
  about: { "@id": absoluteUrl("/#person") },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/portfolio/${p.slug}`),
      name: p.title,
    })),
  },
  hasPart: videoSchemas,
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <ReelHero
        eyebrow={`Portfolio · ${projects.length} websites · ${graphics.length} graphics`}
        title="Websites businesses run on — not just launch."
        description="Storefronts, replatforms, web apps and cinematic AI-built sites across Shopify, Webflow, WordPress and custom code. Plus the social creatives and motion work that go with them."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See services", href: "/services" }}
      />

      <ProjectGrid />
      <CallToAction />
    </>
  );
}
