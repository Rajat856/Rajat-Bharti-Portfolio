import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { CallToAction } from "@/components/sections/CallToAction";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected client work by Rajat Bharti — WordPress-to-Webflow replatforms, e-commerce storefronts, web applications and AI automation systems.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Selected work"
        description="Replatforms, storefronts, web apps and automation systems — built at Virusha Technologies and beyond. Each case study covers the brief, the approach and what actually shipped."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/contact" variant="secondary" arrow>
            Start a project
          </Button>
          <Button href="/services" variant="outline">
            See services
          </Button>
        </div>
      </PageHeader>

      <ProjectGrid />
      <CallToAction />
    </>
  );
}
