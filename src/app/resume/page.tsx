import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ResumeDocument } from "@/components/sections/ResumeDocument";
import { CallToAction } from "@/components/sections/CallToAction";

export const metadata: Metadata = pageMetadata({
  title: "Resume — Web Developer & AI Product Builder",
  description:
    "Rajat Bharti's one-page resume: experience, skills, certifications and selected projects. Print-ready — save it as a PDF straight from the page.",
  path: "/resume",
  type: "profile",
  keywords: ["Rajat Bharti resume", "web developer resume", "CV"],
});

export default function ResumePage() {
  return (
    <>
      <div className="print:hidden">
        {/* `as="p"` — the document below carries this page's real <h1>. */}
        <PageHeader
          as="p"
          eyebrow="Resume"
          title="The one-page version"
          description="Everything a hiring manager or client actually needs, in one place. Read it here or download the PDF."
        />
      </div>

      <ResumeDocument />

      <div className="print:hidden">
        <CallToAction
          title="Want the longer conversation?"
          description="A resume is a summary. If it looks like a fit, the fastest way to find out for certain is a short call."
        />
      </div>
    </>
  );
}
