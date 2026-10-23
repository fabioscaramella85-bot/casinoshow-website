import { BrandMarquee } from "@/components/home/brand-marquee";
import { HomeDavide } from "@/components/home/home-davide";
import { HomeEvents } from "@/components/home/home-events";
import { HomeFinalCta } from "@/components/home/home-final-cta";
import { HomeGallery } from "@/components/home/home-gallery";
import { HomeGames } from "@/components/home/home-games";
import { HomeHero } from "@/components/home/home-hero";
import { HomeIntroduction } from "@/components/home/home-introduction";
import { HomeProcess } from "@/components/home/home-process";
import { HomeWhy } from "@/components/home/home-why";
import { SiteShell } from "@/components/site-shell";

export function HomePage() {
  return (
    <SiteShell routeId="home">
      <HomeHero />
      <BrandMarquee />
      <HomeIntroduction />
      <HomeEvents />
      <HomeGames />
      <HomeProcess />
      <HomeDavide />
      <HomeWhy />
      <HomeGallery />
      <HomeFinalCta />
    </SiteShell>
  );
}
