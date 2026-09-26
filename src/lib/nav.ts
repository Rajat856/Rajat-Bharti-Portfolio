export type NavItem = {
  label: string;
  href: string;
  /** Shown in the full-screen menu overlay. */
  description: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/", description: "The overview" },
  { label: "About", href: "/about", description: "Who I am and how I work" },
  { label: "Portfolio", href: "/portfolio", description: "Selected client work" },
  { label: "Services", href: "/services", description: "What you can hire me for" },
  { label: "Skills", href: "/skills", description: "The full capability map" },
  { label: "Experience", href: "/experience", description: "Six years, four companies" },
  { label: "Resume", href: "/resume", description: "The one-page version" },
  { label: "Certifications", href: "/certifications", description: "Formal credentials" },
  { label: "Blog", href: "/blog", description: "Notes on the craft" },
  { label: "Contact", href: "/contact", description: "Start a conversation" },
];

/** A trimmed set for the desktop bar — the rest live in the overlay menu. */
export const primaryNav = navItems.filter((i) =>
  ["/", "/about", "/portfolio", "/services", "/blog"].includes(i.href),
);

export const footerNav = {
  Explore: navItems.filter((i) => ["/", "/about", "/portfolio", "/services"].includes(i.href)),
  Credentials: navItems.filter((i) =>
    ["/resume", "/experience", "/skills", "/certifications"].includes(i.href),
  ),
  More: navItems.filter((i) => ["/blog", "/contact"].includes(i.href)),
};
