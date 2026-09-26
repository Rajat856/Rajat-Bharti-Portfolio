"use client";

import { Mail, MapPin, Globe, Printer } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { profile } from "@/lib/data/profile";
import { awards, education, experience } from "@/lib/data/experience";
import { certifications } from "@/lib/data/certifications";
import { skillGroups } from "@/lib/data/skills";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Print-optimised resume. Screen styling lives in Tailwind classes; the
 * `print:` variants collapse the page to a clean, single-column A4 document so
 * Cmd/Ctrl+P (or the Download button) produces a usable PDF with no extra
 * tooling.
 */
export function ResumeDocument() {
  const print = () => window.print();

  return (
    <div className="container-page pb-24">
      {/* Toolbar — screen only */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <p className="text-sm text-muted">
          This page is print-optimised — use the button to save a clean PDF copy.
        </p>
        <div className="flex flex-wrap gap-3">
          {profile.resumePdf ? (
            <Button href={profile.resumePdf} download variant="secondary" arrow>
              Download PDF
            </Button>
          ) : (
            <Button onClick={print} variant="secondary" magnetic>
              <Printer className="size-4" aria-hidden />
              Download / print PDF
            </Button>
          )}
          <Button href="/contact" variant="outline">
            Get in touch
          </Button>
        </div>
      </div>

      <Reveal direction="none">
        <article
          id="resume"
          className="mx-auto max-w-4xl rounded-4xl border border-line bg-surface/40 p-8 sm:p-12 print:max-w-none print:rounded-none print:border-0 print:bg-white print:p-0 print:text-black"
        >
          {/* Masthead */}
          <header className="border-b border-line pb-8 print:border-black/20">
            <h1 className="font-display text-4xl tracking-tight sm:text-5xl print:text-3xl">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg text-accent print:text-base print:text-black">
              {profile.role} · AI Automation Engineer
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted print:text-xs print:text-black">
              <li className="flex items-center gap-1.5">
                <MapPin className="size-3.5 print:hidden" aria-hidden />
                {profile.location}
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="size-3.5 print:hidden" aria-hidden />
                <a href={`mailto:${profile.email}`} className="hover:text-ink">
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="size-3.5 print:hidden" aria-hidden />
                rajatbharti.com
              </li>
              <li className="flex items-center gap-1.5">
                <LinkedInIcon className="size-3.5 print:hidden" />
                in/rajat-bharti-13ab9715b
              </li>
            </ul>
          </header>

          {/* Summary */}
          <Section title="Summary">
            <p className="text-sm leading-relaxed text-muted print:text-[11px] print:text-black">
              {profile.summary}
            </p>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            <ol className="space-y-7 print:space-y-4">
              {experience.map((job) => (
                <li key={job.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-medium tracking-tight print:text-[13px]">
                      {job.role}
                      <span className="text-accent print:text-black"> · {job.company}</span>
                    </h3>
                    <span className="font-mono text-[11px] text-faint print:text-[10px] print:text-black/60">
                      {job.start} — {job.end ?? "Present"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted print:text-[10px] print:text-black/70">
                    {job.employmentType} · {job.location} · {job.workplace}
                  </p>
                  <ul className="mt-3 space-y-1.5 print:mt-2 print:space-y-1">
                    {job.highlights.slice(0, 6).map((h) => (
                      <li
                        key={h}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted print:text-[11px] print:leading-snug print:text-black"
                      >
                        <span
                          className="mt-[0.55em] size-1 shrink-0 rounded-full bg-accent print:bg-black"
                          aria-hidden
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Section>

          {/* Skills */}
          <Section title="Core Skills">
            <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2 print:grid-cols-2 print:gap-y-2">
              {skillGroups.map((g) => (
                <div key={g.id} className="break-inside-avoid">
                  <dt className="text-sm font-medium print:text-[11px]">{g.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted print:text-[10px] print:text-black/80">
                    {g.skills
                      .slice(0, 6)
                      .map((s) => s.name)
                      .join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* Education */}
          <Section title="Education">
            <ul className="space-y-4 print:space-y-2">
              {education.slice(0, 2).map((e) => (
                <li
                  key={`${e.institution}-${e.degree}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 break-inside-avoid"
                >
                  <div>
                    <h3 className="text-sm font-medium print:text-[12px]">{e.degree}</h3>
                    <p className="text-sm text-muted print:text-[10px] print:text-black/70">
                      {e.institution}
                      {e.grade ? ` · ${e.grade}` : ""}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] text-faint print:text-[10px] print:text-black/60">
                    {e.start} — {e.end}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Certifications */}
          <Section title="Certifications">
            <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2 print:grid-cols-2 print:gap-y-1">
              {certifications.map((c) => (
                <li
                  key={`${c.name}-${c.issuer}`}
                  className="text-sm text-muted print:text-[10px] print:text-black"
                >
                  <span className="text-ink print:text-black">{c.name}</span>
                  <span className="text-faint print:text-black/60"> — {c.issuer}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Awards */}
          <Section title="Honors & Awards">
            <ul className="space-y-2">
              {awards.map((a) => (
                <li key={a.title} className="text-sm text-muted print:text-[10px] print:text-black">
                  <span className="text-ink print:text-black">{a.title}</span> — {a.issuer},{" "}
                  {a.date}
                </li>
              ))}
            </ul>
          </Section>
        </article>
      </Reveal>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 break-inside-avoid print:mt-5">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint print:text-[9px] print:tracking-[0.16em] print:text-black/60">
        {title}
      </h2>
      <div className="mt-4 print:mt-2">{children}</div>
    </section>
  );
}
