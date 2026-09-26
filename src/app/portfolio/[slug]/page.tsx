import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/lib/data/projects";
import { Aurora, Badge, GridLines } from "@/components/ui/Primitives";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { Reveal, RevealText, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/sections/ProjectGrid";
import { CallToAction } from "@/components/sections/CallToAction";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: absoluteUrl(`/portfolio/${project.slug}`),
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pb-14 pt-36 sm:pt-44">
        <Aurora intensity={0.7} />
        <GridLines />

        <div className="container-page">
          <Reveal direction="none" duration={0.5}>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              All projects
            </Link>
          </Reveal>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge tone="brand">{project.platform}</Badge>
            <Badge>{project.discipline}</Badge>
            <Badge>{project.year}</Badge>
            <Badge>{project.role}</Badge>
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.04] tracking-[-0.03em]">
            <RevealText text={project.title} />
          </h1>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              {project.summary}
            </p>
          </Reveal>

          {project.url ? (
            <Reveal delay={0.25} className="mt-9">
              <Button href={project.url} variant="secondary" arrow>
                Visit live site
              </Button>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Cover */}
      <section className="relative">
        <div className="container-page">
          <Reveal direction="none" duration={1}>
            <div className="group relative aspect-[21/9] overflow-hidden rounded-4xl border border-line">
              <ProjectCover project={project} className="absolute inset-0" />
              {/* The title overlay only suits the generated gradient art. Over a
                  real mockup photo it lands on bright backgrounds and washes
                  out — and the page H1 already names the project. */}
              {project.cover.image ? null : (
                <p className="absolute left-7 top-6 z-10 font-display text-3xl text-white/95 sm:text-5xl">
                  {project.title.split(" — ")[0]}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="relative py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
            <div>
              <Reveal>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                  The work
                </h2>
              </Reveal>
              <div className="mt-7 space-y-6 text-base leading-relaxed text-muted sm:text-lg">
                {project.description.map((para, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <p className="text-pretty">{para}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal className="mt-14">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                  What shipped
                </h2>
              </Reveal>
              <RevealGroup as="ul" className="mt-7 space-y-3.5">
                {project.deliverables.map((d) => (
                  <RevealItem key={d} as="li">
                    <div className="flex gap-4 text-sm leading-relaxed text-muted">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      {d}
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal direction="left">
                <div className="rounded-3xl border border-line bg-surface/50 p-7">
                  <dl className="space-y-5">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                        Client
                      </dt>
                      <dd className="mt-1.5 text-sm">{project.client}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                        Role
                      </dt>
                      <dd className="mt-1.5 text-sm">{project.role}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                        Year
                      </dt>
                      <dd className="mt-1.5 text-sm">{project.year}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                        Stack
                      </dt>
                      <dd className="mt-2.5 flex flex-wrap gap-2">
                        {project.stack.map((s) => (
                          <Badge key={s}>{s}</Badge>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-7 inline-flex items-center gap-1.5 text-sm text-accent"
                    >
                      Visit site
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  ) : null}
                </div>
              </Reveal>

              {project.metrics ? (
                <Reveal direction="left" delay={0.1}>
                  <div className="mt-4 rounded-3xl border border-line bg-surface/50 p-7">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                      Outcomes
                    </p>
                    <dl className="mt-5 space-y-4">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="flex items-baseline justify-between gap-4">
                          <dt className="text-sm text-muted">{m.label}</dt>
                          <dd className="font-display text-xl tracking-tight">{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>
              ) : null}
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="relative py-16">
        <div className="container-page">
          <h2 className="font-display text-3xl tracking-tight">Next projects</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
