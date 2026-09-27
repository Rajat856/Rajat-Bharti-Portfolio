import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Timeline } from "@/components/sections/Timeline";
import { CallToAction } from "@/components/sections/CallToAction";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Badge, CountUp } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { awards, education, experience } from "@/lib/data/experience";
import { profile, resumeHref } from "@/lib/data/profile";

export const metadata: Metadata = pageMetadata({
  title: "Experience — 6 Years in Web & AI Product",
  description:
    "Six years, four companies: from WordPress builds at AffinityX to AI product development at ProductOS. Roles, responsibilities and the skills used at each.",
  path: "/experience",
  type: "website",
  keywords: ["web developer experience", "AI product developer", "ProductOS"],
});

export default function ExperiencePage() {
  const totalRoles = experience.length;
  const currentRoles = experience.filter((e) => e.current).length;

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Six years, four companies, one through-line."
        description="From WordPress micro-sites at an internship to owning delivery at an AI-native product company. The constant has always been shipping things that work — and holding the quality line while doing it."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href={resumeHref} download={Boolean(profile.resumePdf)} variant="secondary" arrow>
            {profile.resumePdf ? "Download resume" : "View resume"}
          </Button>
          <Button href="/portfolio" variant="outline">
            See the work
          </Button>
        </div>
      </PageHeader>

      {/* Quick figures */}
      <section className="relative pb-8 pt-12 sm:pt-16">
        <div className="container-page">
          <RevealGroup className="grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: 5, suffix: "+", label: "Years in the industry", detail: "Since May 2020" },
              { value: totalRoles, suffix: "", label: "Companies", detail: "Agency, product and client-side" },
              { value: currentRoles, suffix: "", label: "Current roles", detail: "ProductOS & Virusha" },
              { value: 1, suffix: "", label: "Award", detail: "Customer's Delight, AffinityX" },
            ].map((s) => (
              <RevealItem key={s.label} className="bg-canvas p-7 sm:p-9">
                <p className="font-display text-5xl tracking-[-0.03em] sm:text-6xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm font-medium">{s.label}</p>
                <p className="mt-1 text-xs text-faint">{s.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Timeline heading={false} />

      {/* Education */}
      <section className="relative py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHeading eyebrow="Education" title="Where it was learned" as="h2" />
              <ul className="mt-12 space-y-8">
                {education.map((e) => (
                  <Reveal key={`${e.institution}-${e.degree}`} as="li">
                    <div className="rounded-3xl border border-line bg-surface/40 p-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                        {e.start} — {e.end}
                      </p>
                      <h3 className="mt-2.5 text-lg font-medium tracking-tight">{e.degree}</h3>
                      <p className="mt-1 text-sm text-accent">{e.institution}</p>
                      {e.field ? <p className="mt-1.5 text-sm text-muted">{e.field}</p> : null}
                      {e.grade ? (
                        <p className="mt-3">
                          <Badge tone="brand">Grade {e.grade}</Badge>
                        </p>
                      ) : null}
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading eyebrow="Recognition" title="Honors & awards" as="h2" />
              <ul className="mt-12 space-y-5">
                {awards.map((a) => (
                  <Reveal key={a.title} as="li">
                    <div className="sheen rounded-3xl border border-line bg-surface/50 p-7">
                      <h3 className="text-lg font-medium tracking-tight">{a.title}</h3>
                      <p className="mt-1 text-sm text-accent">
                        {a.issuer} · {a.date}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-muted">{a.description}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <Reveal className="mt-6">
                <div className="rounded-3xl border border-dashed border-line-strong p-7">
                  <h3 className="text-lg font-medium tracking-tight">Eight certifications</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Across security, development, design and marketing — from Microsoft, Google,
                    IIT Kanpur, MNNIT, IIIT Allahabad and Arohha.
                  </p>
                  <div className="mt-6">
                    <Button href="/certifications" variant="outline" size="sm" arrow>
                      View all
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CallToAction
        title="Looking for someone who's done this before?"
        description="Six years of delivery across agency, client and product environments — and the scar tissue that comes with it."
      />
    </>
  );
}
