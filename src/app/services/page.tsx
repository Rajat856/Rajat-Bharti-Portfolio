import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CallToAction } from "@/components/sections/CallToAction";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { processSteps, services } from "@/lib/data/services";
import { absoluteUrl } from "@/lib/utils";
import { profile } from "@/lib/data/profile";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design and development, e-commerce builds, AI and workflow automation, custom web applications, technical SEO, brand design and digital marketing support.",
  alternates: { canonical: "/services" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${profile.name} — Web Development & AI Automation`,
  url: absoluteUrl("/services"),
  areaServed: "Worldwide",
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.description },
    })),
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <PageHeader
        eyebrow="Services"
        title="Eight ways I can help you ship."
        description="From a single conversion-focused landing page to a full replatform with an automation layer behind it. Fixed scope, milestone billing, no surprise invoices."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/contact" variant="secondary" arrow>
            Request a quote
          </Button>
          <Button href="/portfolio" variant="outline">
            See the work
          </Button>
        </div>
      </PageHeader>

      {/* Detailed service list */}
      <section className="relative pb-8 pt-12 sm:pt-16">
        <div className="container-page">
          <ul className="divide-y divide-[color:var(--line)] border-y border-line">
            {services.map((service, i) => (
              <li key={service.id} id={service.id} className="scroll-mt-28">
                <Reveal amount={0.15}>
                  <article className="grid gap-8 py-12 lg:grid-cols-[auto_1.2fr_1fr] lg:gap-14">
                    <span className="font-mono text-xs text-faint lg:pt-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h2 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                        {service.title}
                      </h2>
                      <p className="mt-2 text-accent">{service.tagline}</p>
                      <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                        {service.description}
                      </p>
                      <p className="mt-6">
                        <Badge tone="brand">Typical timeline: {service.timeline}</Badge>
                      </p>
                    </div>

                    <div className="rounded-3xl border border-line bg-surface/40 p-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                        What&apos;s included
                      </p>
                      <ul className="mt-5 space-y-3">
                        {service.deliverables.map((d) => (
                          <li key={d} className="flex gap-3 text-sm leading-relaxed text-muted">
                            <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Process"
            title="How an engagement runs"
            description="The same six steps every time. You always know what's happening and what's next."
            className="max-w-2xl"
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <RevealItem
                key={step.step}
                className="group bg-canvas p-8 transition-colors duration-500 hover:bg-surface"
              >
                <span className="font-mono text-xs text-accent">{step.step}</span>
                <h3 className="mt-4 text-lg font-medium tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Engagement models */}
      <section className="relative pb-24 sm:pb-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Engagement"
            title="Three ways to work together"
            className="max-w-2xl"
          />

          <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "Project",
                price: "Fixed scope",
                body: "A defined deliverable with milestones and a fixed price. Best when you know what you need built.",
                points: [
                  "Scoped proposal before any work starts",
                  "Milestone billing, no open-ended hours",
                  "Staging link from day one",
                  "30-day post-launch support window",
                ],
              },
              {
                title: "Retainer",
                price: "Monthly",
                body: "Ongoing development, optimization and automation work. Best for teams shipping continuously.",
                points: [
                  "A fixed block of hours each month",
                  "Priority turnaround on requests",
                  "Monthly performance & SEO reporting",
                  "Roll-over on unused hours",
                  "Cancel with 30 days' notice",
                ],
                featured: true,
              },
              {
                title: "Consulting",
                price: "Hourly",
                body: "Audits, architecture reviews and second opinions. Best when you have a team and need direction.",
                points: [
                  "Technical SEO & performance audits",
                  "Architecture and platform selection",
                  "Automation opportunity mapping",
                  "Written recommendations, not just a call",
                ],
              },
            ].map((tier) => (
              <RevealItem key={tier.title}>
                <div
                  className={`flex h-full flex-col rounded-4xl border p-8 transition-colors duration-500 ${
                    tier.featured
                      ? "border-accent/40 bg-surface"
                      : "border-line bg-surface/40 hover:border-line-strong"
                  }`}
                >
                  {tier.featured ? (
                    <span className="mb-4 w-fit">
                      <Badge tone="brand">Most common</Badge>
                    </span>
                  ) : null}
                  <h3 className="font-display text-3xl tracking-tight">{tier.title}</h3>
                  <p className="mt-1 text-sm text-accent">{tier.price}</p>
                  <p className="mt-5 text-sm leading-relaxed text-muted">{tier.body}</p>
                  <ul className="mt-7 flex-1 space-y-3">
                    {tier.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      href="/contact"
                      variant={tier.featured ? "secondary" : "outline"}
                      className="w-full"
                      arrow
                    >
                      Enquire
                    </Button>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-8">
            <p className="text-center text-xs text-faint">
              Pricing is quoted per project after a scoping conversation — no fixed rate card,
              because no two briefs are the same.
            </p>
          </Reveal>
        </div>
      </section>

      <CallToAction
        title="Not sure which one you need?"
        description="Describe the problem rather than the solution and I'll tell you which of these actually fits — including if the answer is 'none of them'."
      />
    </>
  );
}
