import type { MetadataRoute } from "next";
import { absoluteLocalizedUrl, languageAlternates } from "@/i18n/metadata";
import { routeIds } from "@/i18n/routes";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  return routeIds.flatMap((routeId) =>
    routing.locales.map((locale) => ({
      url: absoluteLocalizedUrl(routeId, locale),
      alternates: {
        languages: languageAlternates(routeId),
      },
    })),
  );
}
