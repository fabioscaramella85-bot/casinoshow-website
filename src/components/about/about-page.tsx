import { AboutApproach } from "@/components/about/about-approach";
import { AboutExperience } from "@/components/about/about-experience";
import { AboutExplore } from "@/components/about/about-explore";
import { AboutFinalCta } from "@/components/about/about-final-cta";
import { AboutHero } from "@/components/about/about-hero";
import { AboutIdea } from "@/components/about/about-idea";
import { AboutPillars } from "@/components/about/about-pillars";
import { SiteShell } from "@/components/site-shell";

export function AboutPageView() {
  return (
    <SiteShell routeId="about">
      <AboutHero />
      <AboutIdea />
      <AboutApproach />
      <AboutExperience />
      <AboutPillars />
      <AboutExplore />
      <AboutFinalCta />
    </SiteShell>
  );
}
