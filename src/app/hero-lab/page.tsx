import type { Metadata } from "next";
import {
  HeroBadgeOrbit,
  HeroBento,
  HeroCareerRail,
  HeroChatHello,
  HeroEditorial,
  HeroGiantType,
  HeroPaperStack,
  HeroPortraitArch,
  HeroSkillCloud,
  HeroTiltTitle,
  HeroSkillMeters,
  HeroPeriodic,
  HeroCardDeck,
  HeroBigNumbers,
  HeroTerminal,
  HeroCertificate,
  HeroPostScroller,
  HeroBigEmail,
  HeroMarqueeHeadline,
} from "@/components/hero-lab/PageHeroVariants";

export const metadata: Metadata = {
  title: "Hero lab",
  robots: { index: false, follow: false },
};

const options = [
  { id: "A", name: "Portrait Arch", fit: "About", el: <HeroPortraitArch /> },
  { id: "B", name: "Skill Cloud", fit: "Skills", el: <HeroSkillCloud /> },
  { id: "C", name: "Career Rail", fit: "Experience", el: <HeroCareerRail /> },
  { id: "D", name: "Paper Stack", fit: "Resume", el: <HeroPaperStack /> },
  { id: "E", name: "Badge Orbit", fit: "Certifications", el: <HeroBadgeOrbit /> },
  { id: "F", name: "Editorial Masthead", fit: "Blog", el: <HeroEditorial /> },
  { id: "G", name: "Chat Hello", fit: "Contact", el: <HeroChatHello /> },
  { id: "H", name: "Giant Outline Type", fit: "Any page (word changes per page)", el: <HeroGiantType /> },
  { id: "I", name: "Bento Grid", fit: "About", el: <HeroBento /> },
  { id: "J", name: "3D Tilt Title", fit: "Any page (Skills shown)", el: <HeroTiltTitle /> },
  { id: "K", name: "Skill Meters", fit: "Skills", el: <HeroSkillMeters /> },
  { id: "L", name: "Periodic Table", fit: "Skills", el: <HeroPeriodic /> },
  { id: "M", name: "Card Deck", fit: "Experience", el: <HeroCardDeck /> },
  { id: "N", name: "Big Numbers", fit: "Experience", el: <HeroBigNumbers /> },
  { id: "O", name: "Terminal", fit: "Resume", el: <HeroTerminal /> },
  { id: "P", name: "Framed Certificate", fit: "Certifications", el: <HeroCertificate /> },
  { id: "Q", name: "Post Scroller", fit: "Blog", el: <HeroPostScroller /> },
  { id: "R", name: "Big Email", fit: "Contact", el: <HeroBigEmail /> },
  { id: "S", name: "Marquee Headline", fit: "Contact", el: <HeroMarqueeHeadline /> },
];

/** Test page: candidate heroes for the remaining pages. Not indexed. */
export default function HeroLabPage() {
  return (
    <>
      <div className="container-page pb-4 pt-32">
        <h1 className="font-display text-5xl tracking-tight">Page hero options</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Nineteen designs for About, Skills, Experience, Resume, Certifications, Blog and Contact. Each is
          labelled with the page it was designed for — any of them can go on any page.
        </p>
        <nav className="mt-6 flex flex-wrap gap-2">
          {options.map((o) => (
            <a key={o.id} href={`#opt-${o.id}`} className="rounded-full border border-line px-3 py-1.5 text-sm hover:border-accent hover:text-accent">
              {o.id} · {o.name}
            </a>
          ))}
        </nav>
      </div>
      {options.map((o) => (
        <div key={o.id} id={`opt-${o.id}`} className="scroll-mt-24 border-t-4 border-accent/60">
          <div className="sticky top-20 z-30 mx-auto w-fit -translate-y-1/2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white shadow-lg">
            Option {o.id} — {o.name} <span className="opacity-75">· suggested for {o.fit}</span>
          </div>
          {o.el}
        </div>
      ))}
    </>
  );
}
