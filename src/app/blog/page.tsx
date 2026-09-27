import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { BlogIndex } from "@/components/sections/BlogIndex";
import { CallToAction } from "@/components/sections/CallToAction";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Web Development, SEO & AI Automation",
  description:
    "Practical notes on Core Web Vitals, WordPress-to-Webflow migrations, automation that doesn't break, 3D on the web and being the developer who designs.",
  path: "/blog",
  type: "website",
  keywords: ["web development blog", "Core Web Vitals", "WordPress to Webflow", "AI automation blog"],
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes on the craft"
        description="Things I've learned the expensive way — Core Web Vitals on WordPress, automations that don't break, replatforming without losing rankings, and when 3D actually earns its megabytes."
      />

      <BlogIndex />

      <CallToAction
        title="Got a project that needs this thinking?"
        description="If any of these problems sound like yours, that's usually a good sign we should talk."
      />
    </>
  );
}
