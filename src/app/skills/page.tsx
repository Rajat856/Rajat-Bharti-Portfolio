import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CallToAction } from "@/components/sections/CallToAction";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { allSkills, skillGroups } from "@/lib/data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "The full capability map — 62 endorsed skills across web development, CMS and e-commerce platforms, AI automation, design, SEO and delivery.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="The full capability map"
        description="Sixty-two endorsed skills, grouped into the six areas I actually get hired for. Proficiency levels are self-assessed and deliberately honest — I'd rather set expectations than oversell."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/portfolio" variant="secondary" arrow>
            See it applied
          </Button>
          <Button href="/resume" variant="outline">
            View resume
          </Button>
        </div>
      </PageHeader>

      <SkillsSection heading={false} />

      {/* Full index */}
      <section className="relative py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Everything"
            title="The complete list"
            description="Every skill listed and endorsed on my LinkedIn profile, unfiltered."
            className="max-w-2xl"
          />

          <RevealGroup as="ul" className="mt-12 flex flex-wrap gap-2.5" stagger={0.012}>
            {allSkills.map((skill) => (
              <RevealItem key={skill} as="li">
                <span className="inline-flex rounded-full border border-line bg-surface/50 px-4 py-2 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-ink">
                  {skill}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Group summary cards */}
      <section className="relative pb-24 sm:pb-32">
        <div className="container-page">
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g) => {
              const avg = Math.round(
                g.skills.reduce((sum, s) => sum + s.level, 0) / g.skills.length,
              );
              return (
                <RevealItem key={g.id}>
                  <div className="sheen h-full rounded-3xl border border-line bg-surface/50 p-7">
                    <div className="flex items-center justify-between">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ background: g.accent, boxShadow: `0 0 14px 2px ${g.accent}55` }}
                        aria-hidden
                      />
                      <span className="font-mono text-[11px] text-faint">avg {avg}</span>
                    </div>
                    <h3 className="mt-5 text-lg font-medium tracking-tight">{g.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{g.blurb}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {g.skills.slice(0, 4).map((s) => (
                        <li key={s.name}>
                          <Badge>{s.name}</Badge>
                        </li>
                      ))}
                      {g.skills.length > 4 ? (
                        <li>
                          <Badge>+{g.skills.length - 4}</Badge>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <CallToAction
        title="Need one of these on your team?"
        description="Tell me the problem you're trying to solve and I'll tell you which of these actually matter for it — and which are noise."
      />
    </>
  );
}
