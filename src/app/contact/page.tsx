import type { Metadata } from "next";
import { Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/lib/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Rajat Bharti — web development, e-commerce, AI automation and custom web applications. Based in Bengaluru, working worldwide.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "in/rajat-bharti-13ab9715b",
    href: "https://www.linkedin.com/in/rajat-bharti-13ab9715b/",
  },
  { icon: Globe, label: "Website", value: "rajatbharti.com", href: profile.website },
];

const faqs = [
  {
    q: "What's your typical turnaround?",
    a: "A landing page is usually 1–2 weeks. A full marketing site is 3–6 weeks. Replatforms and custom applications run 6–12 weeks depending on scope. You get a milestone schedule before anything starts.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes — most of my client work is remote. I'm in IST (UTC+5:30) and comfortable overlapping with European mornings or US evenings for calls.",
  },
  {
    q: "Can you take over an existing project?",
    a: "Often, yes. I'll audit what's there first and tell you honestly whether it's worth continuing or whether a rebuild is the cheaper option in the long run.",
  },
  {
    q: "How do you handle pricing?",
    a: "Fixed scope, fixed price, milestone billing for projects. Monthly blocks for retainers. Hourly only for audits and consulting. No rate card — every quote follows a scoping conversation.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell me what you're building."
        description="The more specific you are about the problem, the more useful my first reply will be. I read every message personally and answer within a day."
      />

      <section className="relative pb-24 sm:pb-32">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <Reveal>
              <ContactForm />
            </Reveal>

            <div className="space-y-4">
              {/* Direct channels */}
              <Reveal direction="left">
                <div className="rounded-4xl border border-line bg-surface/50 p-7">
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                    Direct
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {channels.map((c) => (
                      <li key={c.label}>
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4"
                        >
                          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                            <c.icon className="size-4" aria-hidden />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[11px] text-faint">{c.label}</span>
                            <span className="block truncate text-sm text-ink transition-colors group-hover:text-accent">
                              {c.value}
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Logistics */}
              <Reveal direction="left" delay={0.1}>
                <div className="rounded-4xl border border-line bg-surface/50 p-7">
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                    Logistics
                  </h2>
                  <dl className="mt-6 space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      <div>
                        <dt className="text-[11px] text-faint">Based in</dt>
                        <dd className="mt-0.5">{profile.location}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      <div>
                        <dt className="text-[11px] text-faint">Timezone</dt>
                        <dd className="mt-0.5">{profile.timezone}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      <div>
                        <dt className="text-[11px] text-faint">Working with</dt>
                        <dd className="mt-0.5">Clients worldwide, remote-first</dd>
                      </div>
                    </div>
                  </dl>

                  <p className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3 text-xs leading-relaxed text-emerald-400">
                    {profile.availability}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-24">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Before you write
            </h2>
            <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 0.06}>
                  <div className="border-t border-line pt-6">
                    <dt className="text-base font-medium tracking-tight">{faq.q}</dt>
                    <dd className="mt-3 text-sm leading-relaxed text-muted">{faq.a}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
