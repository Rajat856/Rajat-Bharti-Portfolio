import Link from "next/link";
import { Aurora, GridLines, Starfield } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { navItems } from "@/lib/nav";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden py-32">
      <Aurora />
      <GridLines />
      <Starfield count={32} />

      <div className="container-page text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Error 404</p>

        <h1 className="mt-6 font-display text-[clamp(3.5rem,14vw,10rem)] leading-none tracking-[-0.04em] text-gradient">
          Not found
        </h1>

        <p className="mx-auto mt-7 max-w-md text-pretty text-base leading-relaxed text-muted">
          This page either moved or never existed. Both are fixable — here&apos;s the way back.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="secondary" size="lg" arrow>
            Back to home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Report a broken link
          </Button>
        </div>

        <nav className="mt-16" aria-label="Site sections">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
