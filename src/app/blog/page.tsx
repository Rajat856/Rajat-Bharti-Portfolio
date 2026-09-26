import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { BlogIndex } from "@/components/sections/BlogIndex";
import { CallToAction } from "@/components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes on web performance, automation reliability, CMS migrations, 3D on the web and the craft of building for clients.",
  alternates: { canonical: "/blog" },
};

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
