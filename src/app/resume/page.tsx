import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ResumeDocument } from "@/components/sections/ResumeDocument";
import { CallToAction } from "@/components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "The one-page version — Rajat Bharti's experience, skills, education, certifications and awards. Print-optimised and ready to save as a PDF.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <>
      <div className="print:hidden">
        {/* `as="p"` — the document below carries this page's real <h1>. */}
        <PageHeader
          as="p"
          eyebrow="Resume"
          title="The one-page version"
          description="Everything a hiring manager or client actually needs, on a single page. Print or save it as a PDF straight from this page."
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
