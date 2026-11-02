import { ChoosingExperience } from "@/components/games/choosing-experience";
import { ExperienceGroups } from "@/components/games/experience-groups";
import { GamesFinalCta } from "@/components/games/games-final-cta";
import { GamesHero } from "@/components/games/games-hero";
import { GamesInteractions } from "@/components/games/games-interactions";
import { GamesOverview } from "@/components/games/games-overview";
import { SiteShell } from "@/components/site-shell";

export function GamesPageView() {
  return (
    <SiteShell routeId="games">
      <GamesInteractions />
      <GamesHero />
      <GamesOverview />
      <ExperienceGroups />
      <ChoosingExperience />
      <GamesFinalCta />
    </SiteShell>
  );
}
