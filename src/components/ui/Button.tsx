"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight " +
  "transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-canvas hover:shadow-[0_10px_40px_-12px_var(--glow-a)] hover:-translate-y-0.5",
  secondary:
    "bg-[linear-gradient(100deg,var(--color-brand-500),var(--color-brand-600))] text-white " +
    "shadow-[0_8px_30px_-10px_var(--glow-a)] hover:shadow-[0_16px_46px_-12px_var(--glow-a)] hover:-translate-y-0.5",
  outline:
    "border border-line-strong text-ink hover:bg-surface-2 hover:-translate-y-0.5 hover:border-accent/50",
  ghost: "text-muted hover:text-ink hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  magnetic?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  download?: boolean | string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    arrow = false,
    magnetic = true,
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow ? (
        <ArrowUpRight
          className="relative z-10 size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      ) : null}
    </>
  );

  const wrap = (node: React.ReactNode) =>
    magnetic ? <Magnetic strength={0.25}>{node}</Magnetic> : node;

  if ("href" in props && props.href) {
    const { href, external, download } = props;
    const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal || download) {
      return wrap(
        <a
          href={href}
          className={classes}
          download={download}
          target={isExternal && !download ? "_blank" : undefined}
          rel={isExternal && !download ? "noopener noreferrer" : undefined}
        >
          {inner}
        </a>,
      );
    }
    return wrap(
      <Link href={href} className={classes}>
        {inner}
      </Link>,
    );
  }

  const { variant: _v, size: _s, arrow: _a, magnetic: _m, children: _c, className: _cn, ...rest } =
    props as ButtonAsButton;

  return wrap(
    <button className={classes} {...rest}>
      {inner}
    </button>,
  );
}
