import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { GameLandingPage } from "@/components/games/game-landing-page";
import { isGameLandingPublic } from "@/i18n/game-landings";
import { getGameLandingMetadata } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata() {
  const locale = await getLocale();

  if (!hasLocale(routing.locales, locale) || !isGameLandingPublic("wheel-of-fortune", locale)) {
    notFound();
  }

  return getGameLandingMetadata("wheel-of-fortune");
}

export default async function WheelLandingPage() {
  const locale = await getLocale();

  if (!hasLocale(routing.locales, locale) || !isGameLandingPublic("wheel-of-fortune", locale)) {
    notFound();
  }

  return <GameLandingPage gameId="wheel-of-fortune" />;
}
