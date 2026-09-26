import type { Metadata } from "next";
import { HeroEditorial, HeroPortrait, HeroReel, HeroShader } from "@/components/hero-lab/HeroVariants";

// Private comparison page — kept out of search and the sitemap.
export const metadata: Metadata = {
  title: "Hero lab",
  robots: { index: false, follow: false },
};

export default function HeroLabPage() {
  return (
    <>
      <HeroReel />
      <div className="h-px bg-line" />
      <HeroPortrait />
      <div className="h-px bg-line" />
      <HeroShader />
      <div className="h-px bg-line" />
      <HeroEditorial />
    </>
  );
}
