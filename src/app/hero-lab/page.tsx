import type { Metadata } from "next";
import {
  HeroAvatar3D,
  HeroBento,
  HeroEditorial,
  HeroFan,
  HeroPortrait,
  HeroReel,
  HeroRotating,
  HeroScrub,
  HeroShader,
  HeroSpotlight,
} from "@/components/hero-lab/HeroVariants";

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
      <HeroAvatar3D src="/images/avatar-3d-character.webp" letter="B1" name="3D character + depth parallax" fadeBottom />
      <div className="h-px bg-line" />
      <HeroAvatar3D src="/images/avatar-3d-figurine.webp" letter="B2" name="3D figurine + depth parallax" />
      <div className="h-px bg-line" />
      <HeroShader />
      <div className="h-px bg-line" />
      <HeroEditorial />
      <div className="h-px bg-line" />
      <HeroBento />
      <div className="h-px bg-line" />
      <HeroSpotlight />
      <div className="h-px bg-line" />
      <HeroFan />
      <div className="h-px bg-line" />
      <HeroRotating />
      <div className="h-px bg-line" />
      <HeroScrub />
    </>
  );
}
