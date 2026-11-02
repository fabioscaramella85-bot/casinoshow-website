import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { GameLandingPage } from "@/components/games/game-landing-page";
import { isGameLandingPublic } from "@/i18n/game-landings";
import { getGameLandingMetadata } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata() {
  const locale = await getLocale();

  if (!hasLocale(routing.locales, locale) || !isGameLandingPublic("blackjack", locale)) {
    notFound();
  }

  return getGameLandingMetadata("blackjack");
}

export default async function BlackjackLandingPage() {
  const locale = await getLocale();

  if (!hasLocale(routing.locales, locale) || !isGameLandingPublic("blackjack", locale)) {
    notFound();
  }

  return <GameLandingPage gameId="blackjack" />;
}
