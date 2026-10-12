import { BlackjackSection } from "@/components/games/blackjack-section";
import { ChoosingExperience } from "@/components/games/choosing-experience";
import { ComplementaryServices } from "@/components/games/complementary-services";
import { GamesFinalCta } from "@/components/games/games-final-cta";
import { GamesHero } from "@/components/games/games-hero";
import { GamesOverview } from "@/components/games/games-overview";
import { OtherGames } from "@/components/games/other-games";
import { PokerSection } from "@/components/games/poker-section";
import { RouletteSection } from "@/components/games/roulette-section";
import { SiteShell } from "@/components/site-shell";

export function GamesPageView() {
  return (
    <SiteShell routeId="games">
      <GamesHero />
      <GamesOverview />
      <RouletteSection />
      <BlackjackSection />
      <PokerSection />
      <OtherGames />
      <ComplementaryServices />
      <ChoosingExperience />
      <GamesFinalCta />
    </SiteShell>
  );
}
