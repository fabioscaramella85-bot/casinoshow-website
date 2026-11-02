import { AboutDavide } from "@/components/about/about-davide";
import { AboutHero } from "@/components/about/about-hero";
import { AboutItaly } from "@/components/about/about-italy";
import { AboutStaff } from "@/components/about/about-staff";
import { AboutStory } from "@/components/about/about-story";
import { AboutStyles } from "@/components/about/about-styles";
import { SiteShell } from "@/components/site-shell";

export function AboutPageView() {
  return (
    <SiteShell routeId="about">
      <AboutStyles />
      <div className="about-page">
        <AboutHero />
        <AboutStory />
        <AboutDavide />
        <AboutStaff />
        <AboutItaly />
      </div>
    </SiteShell>
  );
}
