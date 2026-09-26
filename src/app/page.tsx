import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { Timeline } from "@/components/sections/Timeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CallToAction } from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutPreview />
      <ProjectShowcase />
      <ServicesGrid limit={6} />
      <SkillsSection />
      <Timeline compact />
      <Testimonials />
      <BlogPreview />
      <CallToAction />
    </>
  );
}
