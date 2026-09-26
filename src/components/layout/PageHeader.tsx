import { Aurora, GridLines, Starfield } from "@/components/ui/Primitives";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  /**
   * Drop to "p" when the page's real <h1> lives further down (e.g. /resume,
   * where the resume document itself carries the heading). Keeps exactly one
   * h1 per page.
   */
  as: Title = "h1",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  as?: "h1" | "p";
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      <Aurora intensity={0.75} />
      <GridLines />
      <Starfield count={26} />

      <div className="container-page">
        <Reveal direction="none" duration={0.6}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <Title className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[1.02] tracking-[-0.03em]">
          <RevealText text={title} />
        </Title>

        {description ? (
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          </Reveal>
        ) : null}

        {children ? (
          <Reveal delay={0.28} className="mt-10">
            {children}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
