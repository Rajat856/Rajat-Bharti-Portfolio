"use client";

import Link from "next/link";
import {
  Code2,
  Cpu,
  LayoutGrid,
  Megaphone,
  Palette,
  Search,
  ShoppingBag,
  Smartphone,
  ArrowUpRight,
} from "lucide-react";
import { services, type Service } from "@/lib/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const icons = {
  layout: LayoutGrid,
  shopping: ShoppingBag,
  cpu: Cpu,
  code: Code2,
  search: Search,
  palette: Palette,
  smartphone: Smartphone,
  megaphone: Megaphone,
} as const;

export function ServicesGrid({
  items = services,
  heading = true,
  limit,
}: {
  items?: Service[];
  heading?: boolean;
  limit?: number;
}) {
  const list = limit ? items.slice(0, limit) : items;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        {heading ? (
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Services"
              title="What you can hire me for"
              description="Eight ways I help businesses ship better digital products — from a single landing page to a full automation system."
              className="max-w-2xl"
            />
            <div className="hidden sm:block">
              <Button href="/services" variant="outline" arrow>
                Full breakdown
              </Button>
            </div>
          </div>
        ) : null}

        <RevealGroup
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {list.map((service) => (
            <RevealItem key={service.id}>
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];

  return (
    <TiltCard intensity={5} className="h-full">
      <Link
        href={`/services#${service.id}`}
        className="group relative flex h-full flex-col rounded-3xl border border-line bg-surface/50 p-7 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong hover:bg-surface"
      >
        <div className="flex items-start justify-between">
          <span className="grid size-11 place-items-center rounded-2xl border border-line bg-surface-2 text-accent transition-colors duration-500 group-hover:border-accent/40">
            <Icon className="size-5" aria-hidden />
          </span>
          <ArrowUpRight
            className="size-4 text-faint transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden
          />
        </div>

        <h3 className="mt-6 text-lg font-medium tracking-tight">{service.title}</h3>
        <p className="mt-1.5 text-sm text-accent">{service.tagline}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-faint">
          <span className="font-mono uppercase tracking-[0.14em]">Typical timeline</span>
          <span className="text-muted">{service.timeline}</span>
        </div>
      </Link>
    </TiltCard>
  );
}
