import type { MetadataRoute } from "next";
import { publicGameLandingEntries } from "@/i18n/game-landings";
import {
  absoluteGameLandingUrl,
  absoluteLocalizedUrl,
  gameLandingLanguageAlternates,
  languageAlternates,
} from "@/i18n/metadata";
import { routeIds, type Locale } from "@/i18n/routes";
import { previewProtectionEnabled } from "@/lib/preview/protection";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  if (previewProtectionEnabled()) {
    return [];
  }

  const pages = routeIds.flatMap((routeId) =>
    routing.locales.map((locale) => ({
      url: absoluteLocalizedUrl(routeId, locale),
      alternates: {
        languages: languageAlternates(routeId),
      },
    })),
  );

  const gameLandings = publicGameLandingEntries().map(({ pathname, locale }) => ({
    url: absoluteGameLandingUrl(pathname, locale as Locale),
    alternates: {
      languages: gameLandingLanguageAlternates(pathname),
    },
  }));

  return [...pages, ...gameLandings];
}
