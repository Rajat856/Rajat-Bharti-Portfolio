import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { CertificationGrid } from "@/components/sections/CertificationGrid";
import { CallToAction } from "@/components/sections/CallToAction";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  title: "Certifications & Credentials",
  description:
    "Professional certifications held by Rajat Bharti across web development, e-commerce platforms, AI and digital marketing.",
  path: "/certifications",
  type: "website",
  keywords: ["web developer certifications", "Rajat Bharti certifications"],
});

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Certifications"
        title="Eight credentials, four disciplines."
        description="Formal training across security, development, design and marketing — from Microsoft and Google through to IIT Kanpur, MNNIT and IIIT Allahabad. Each one earns its place in day-to-day client work."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/skills" variant="secondary" arrow>
            See the skill map
          </Button>
          <Button href="/resume" variant="outline">
            View resume
          </Button>
        </div>
      </PageHeader>

      <CertificationGrid />

      <CallToAction
        title="Credentials are the floor, not the ceiling."
        description="What matters is what gets shipped. Have a look at the work, then tell me what you're trying to build."
      />
    </>
  );
}
