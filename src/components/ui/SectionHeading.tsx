import { Reveal, RevealText } from "./Reveal";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted",
        className,
      )}
    >
      <span className="inline-block size-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_var(--glow-a)]" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal direction="none" duration={0.6}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      <Tag
        className={cn(
          "font-display text-balance text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl",
          titleClassName,
        )}
      >
        <RevealText text={title} />
      </Tag>

      {description ? (
        <Reveal delay={0.12} className={cn("max-w-2xl", align === "center" && "mx-auto")}>
          <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
