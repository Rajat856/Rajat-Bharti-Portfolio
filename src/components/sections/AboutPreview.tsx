"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data/profile";
import { topSkills } from "@/lib/data/skills";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { Badge, Parallax, Spotlight } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";

export function AboutPreview() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Spotlight />

      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-24">
          <div>
            <Reveal direction="none">
              <Eyebrow>About</Eyebrow>
            </Reveal>

            <h2 className="mt-6 font-display text-4xl leading-[1.08] tracking-[-0.02em] sm:text-5xl">
              <RevealText text="A developer who can hold the design line — and draw it." />
            </h2>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
              {profile.summaryLong.slice(1, 3).map((para, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="text-pretty">{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3} className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {topSkills.map((skill) => (
                  <li key={skill}>
                    <Badge tone="brand">{skill}</Badge>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.4} className="mt-10">
              <Button href="/about" variant="outline" arrow>
                More about me
              </Button>
            </Reveal>
          </div>

          {/* Credential cards */}
          <Parallax distance={70}>
            <div className="grid gap-4">
              <Reveal direction="left">
                <Card
                  label="Currently"
                  title="Chief of Staff"
                  subtitle="ProductOS · Bengaluru"
                  body="Owning design, QA and cross-functional delivery for an AI-native product — making sure nothing ships broken and nothing falls through the cracks."
                  href="/experience"
                />
              </Reveal>
              <Reveal direction="left" delay={0.1}>
                <Card
                  label="Also"
                  title="Senior Web Developer"
                  subtitle="Virusha Technologies · Remote"
                  body="Architecting high-performance sites, custom web apps and AI automation systems for clients across e-commerce, services and B2B."
                  href="/experience"
                />
              </Reveal>
              <Reveal direction="left" delay={0.2}>
                <Card
                  label="Education"
                  title="MCA, University of Allahabad"
                  subtitle="87.97% · 2020–2022"
                  body="Master of Computer Applications, following a BCA in Computer Software and Media Applications."
                  href="/resume"
                />
              </Reveal>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

function Card({
  label,
  title,
  subtitle,
  body,
  href,
}: {
  label: string;
  title: string;
  subtitle: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group sheen block rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{label}</span>
        <ArrowUpRight
          className="size-4 shrink-0 text-faint transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          aria-hidden
        />
      </div>
      <h3 className="mt-4 text-lg font-medium tracking-tight">{title}</h3>
      <p className="mt-0.5 text-sm text-accent">{subtitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
    </Link>
  );
}
