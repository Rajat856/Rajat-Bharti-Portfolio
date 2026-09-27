import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Award, Compass, GraduationCap, Sparkles } from "lucide-react";
import { BentoHero } from "@/components/sections/PageHeroes";
import { CallToAction } from "@/components/sections/CallToAction";
import { Stats } from "@/components/sections/Stats";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Badge, Marquee, Parallax } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { profile } from "@/lib/data/profile";
import { awards, education } from "@/lib/data/experience";
import { allSkills } from "@/lib/data/skills";
import { processSteps } from "@/lib/data/services";

export const metadata: Metadata = pageMetadata({
  title: "About Rajat — Web Developer in Bengaluru",
  description:
    "Meet Rajat Bharti: a Bengaluru-based web developer and AI product builder with 6 years across Shopify, Webflow, WordPress, custom web apps and automation.",
  path: "/about",
  type: "profile",
  keywords: ["about Rajat Bharti", "web developer Bengaluru", "AI product developer"],
});

const principles = [
  {
    icon: Compass,
    title: "Scope honestly",
    body: "I'd rather tell you a project is smaller than you think than sell you a bigger one. Trust compounds; a padded invoice doesn't.",
  },
  {
    icon: Sparkles,
    title: "Motion with a job",
    body: "Every animation should communicate something — hierarchy, state, causality. If it's only there to look expensive, it gets cut.",
  },
  {
    icon: Award,
    title: "Performance is a feature",
    body: "Core Web Vitals in the green before launch, not after someone complains. A beautiful site nobody waits for isn't beautiful.",
  },
  {
    icon: GraduationCap,
    title: "Hand it over properly",
    body: "Documentation, a walkthrough recording and training. You should own your site, not rent it back from whoever built it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BentoHero />

      {/* Narrative */}
      <section className="relative py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
            <div className="space-y-6 text-base leading-relaxed text-muted sm:text-lg">
              {profile.summaryLong.map((para, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <p className="text-pretty">{para}</p>
                </Reveal>
              ))}
            </div>

            <Parallax distance={60}>
              <Reveal direction="left">
                <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line">
                  {[
                    ["Based in", profile.location],
                    ["Timezone", profile.timezone],
                    ["Current role", "AI Product Developer, ProductOS"],
                    ["Also", "Senior Web Developer, Virusha Technologies"],
                    ["Education", "MCA — University of Allahabad"],
                    ["Availability", profile.availability],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-canvas px-6 py-4">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                        {label}
                      </dt>
                      <dd className="mt-1.5 text-sm text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </Parallax>
          </div>
        </div>
      </section>

      {/* Skills marquee */}
      <section className="relative border-y border-line py-10">
        <div className="space-y-4">
          <Marquee
            items={allSkills.slice(0, 31)}
            className="text-sm text-muted"
            separator="·"
          />
          <Marquee
            items={allSkills.slice(31)}
            className="text-sm text-muted"
            separator="·"
            reverse
          />
        </div>
      </section>

      <Stats />

      {/* Principles */}
      <section className="relative py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="How I work"
            title="Four things I don't compromise on"
            description="Not a manifesto — just the handful of positions that have survived five years of client work."
            className="max-w-2xl"
          />

          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <RevealItem key={p.title}>
                <div className="sheen h-full rounded-3xl border border-line bg-surface/50 p-7 transition-colors duration-500 hover:border-line-strong">
                  <span className="grid size-11 place-items-center rounded-2xl border border-line bg-surface-2 text-accent">
                    <p.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-lg font-medium tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Process"
            title="Six steps, no surprises"
            description="The same sequence on every engagement, from a one-page landing site to a full replatform."
            className="max-w-2xl"
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <RevealItem key={step.step} className="group bg-canvas p-8 transition-colors duration-500 hover:bg-surface">
                <span className="font-mono text-xs text-accent">{step.step}</span>
                <h3 className="mt-4 text-lg font-medium tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Education + awards */}
      <section className="relative py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHeading eyebrow="Education" title="The formal part" as="h2" />
              <ul className="mt-10 space-y-8">
                {education.map((e) => (
                  <Reveal key={`${e.institution}-${e.degree}`} as="li">
                    <div className="border-l border-line pl-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                        {e.start} — {e.end}
                      </p>
                      <h3 className="mt-2 text-lg font-medium tracking-tight">{e.degree}</h3>
                      <p className="mt-1 text-sm text-accent">{e.institution}</p>
                      {e.field ? <p className="mt-1 text-sm text-muted">{e.field}</p> : null}
                      {e.grade ? (
                        <p className="mt-2">
                          <Badge>Grade {e.grade}</Badge>
                        </p>
                      ) : null}
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading eyebrow="Recognition" title="Honors & awards" as="h2" />
              <ul className="mt-10 space-y-6">
                {awards.map((a) => (
                  <Reveal key={a.title} as="li">
                    <div className="sheen rounded-3xl border border-line bg-surface/50 p-7">
                      <span className="grid size-11 place-items-center rounded-2xl border border-line bg-surface-2 text-accent">
                        <Award className="size-5" aria-hidden />
                      </span>
                      <h3 className="mt-6 text-lg font-medium tracking-tight">{a.title}</h3>
                      <p className="mt-1 text-sm text-accent">
                        {a.issuer} · {a.date}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{a.description}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <Reveal className="mt-8">
                <div className="rounded-3xl border border-dashed border-line-strong p-7">
                  <p className="text-sm leading-relaxed text-muted">
                    Eight professional certifications across security, development, design and
                    marketing — including Microsoft, Google, IIT Kanpur and MNNIT.
                  </p>
                  <div className="mt-5">
                    <Button href="/certifications" variant="outline" size="sm" arrow>
                      View certifications
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CallToAction
        title="Still reading? Let's talk."
        description="If any of this sounds like the person you need on your project, the fastest next step is a short conversation about what you're actually trying to build."
      />
    </>
  );
}
