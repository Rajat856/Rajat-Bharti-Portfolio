import type { Metadata } from "next";
import { ReelHero } from "@/components/sections/PageHeroes";
import { projects } from "@/lib/data/projects";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { CallToAction } from "@/components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected client work by Rajat Bharti — WordPress-to-Webflow replatforms, e-commerce storefronts, web applications and AI automation systems.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <ReelHero
        eyebrow={`Portfolio · ${projects.length} projects`}
        title="Websites businesses run on — not just launch."
        description="Storefronts, replatforms, web apps and cinematic AI-built sites across Shopify, Webflow, WordPress and custom code. Every case study covers the brief, the approach and what actually shipped."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See services", href: "/services" }}
      />

      <ProjectGrid />
      <CallToAction />
    </>
  );
}
