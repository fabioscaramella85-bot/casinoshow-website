import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { isLegalContentPublished } from "@/config/legal";
import { getPathname } from "./navigation";
import { routing } from "./routing";
import {
  gameLandingPathnames,
  gameLandings,
  type GameLandingId,
  type GameLandingPathname,
} from "./game-landings";
import {
  legalPathnames,
  routePathnames,
  type LegalRouteId,
  type Locale,
  type RouteId,
} from "./routes";
import { CANONICAL_ORIGIN } from "./site";

const openGraphLocales: Record<Locale, string> = {
  it: "it_IT",
  de: "de_CH",
  fr: "fr_CH",
  en: "en_GB",
};

export function localizedPathname(routeId: RouteId, locale: Locale) {
  return getPathname({
    locale,
    href: routePathnames[routeId],
  });
}

export function absoluteLocalizedUrl(routeId: RouteId, locale: Locale) {
  return new URL(localizedPathname(routeId, locale), CANONICAL_ORIGIN).href;
}

export function languageAlternates(routeId: RouteId) {
  return {
    it: absoluteLocalizedUrl(routeId, "it"),
    de: absoluteLocalizedUrl(routeId, "de"),
    fr: absoluteLocalizedUrl(routeId, "fr"),
    en: absoluteLocalizedUrl(routeId, "en"),
    "x-default": absoluteLocalizedUrl(routeId, routing.defaultLocale),
  };
}

export function absoluteLegalUrl(routeId: LegalRouteId, locale: Locale) {
  return new URL(
    getPathname({ locale, href: legalPathnames[routeId] }),
    CANONICAL_ORIGIN,
  ).href;
}

export function legalLanguageAlternates(routeId: LegalRouteId) {
  return {
    it: absoluteLegalUrl(routeId, "it"),
    de: absoluteLegalUrl(routeId, "de"),
    fr: absoluteLegalUrl(routeId, "fr"),
    en: absoluteLegalUrl(routeId, "en"),
    "x-default": absoluteLegalUrl(routeId, routing.defaultLocale),
  };
}

export async function getLegalMetadata(routeId: LegalRouteId): Promise<Metadata> {
  const locale = await getLocale();

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const published = isLegalContentPublished(routeId);
  const t = await getTranslations(published ? `Legal.${routeId}` : "Legal.unpublished");
  const title = published ? t("title") : t(`${routeId}.title`);
  const description = published ? t("unavailable") : t("notice");
  const url = absoluteLegalUrl(routeId, locale);

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: url,
      languages: legalLanguageAlternates(routeId),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Casino Show",
      locale: openGraphLocales[locale],
      type: "website",
    },
  };
}

export function absoluteGameLandingUrl(pathname: GameLandingPathname, locale: Locale) {
  return new URL(getPathname({ locale, href: pathname }), CANONICAL_ORIGIN).href;
}

export function gameLandingLanguageAlternates(pathname: GameLandingPathname) {
  const localized = gameLandingPathnames[pathname];
  const languages: Record<string, string> = {};

  for (const locale of Object.keys(localized) as Array<keyof typeof localized>) {
    languages[locale] = absoluteGameLandingUrl(pathname, locale);
  }

  const fallback = ("it" in localized ? "it" : Object.keys(localized)[0]) as Locale;
  languages["x-default"] = absoluteGameLandingUrl(pathname, fallback);
  return languages;
}

export async function getGameLandingMetadata(gameId: GameLandingId): Promise<Metadata> {
  const locale = await getLocale();

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const pathname = gameLandings[gameId].internalPath;
  if (!(pathname in gameLandingPathnames)) {
    return {};
  }

  const publicPath = pathname as GameLandingPathname;
  if (!Object.prototype.hasOwnProperty.call(gameLandingPathnames[publicPath], locale)) {
    return {};
  }

  const t = await getTranslations(`GameLandings.${gameId}`);
  const title = t("seoTitle");
  const description = t("seoDescription");
  const url = absoluteGameLandingUrl(publicPath, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: gameLandingLanguageAlternates(publicPath),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Casino Show",
      locale: openGraphLocales[locale],
      type: "website",
    },
  };
}

export async function getPageMetadata(routeId: RouteId): Promise<Metadata> {
  const locale = await getLocale();

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations(`Pages.${routeId}`);
  const title = t.has("title") ? t("title") : t("heading");
  const description = t("description");
  const url = absoluteLocalizedUrl(routeId, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(routeId),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Casino Show",
      locale: openGraphLocales[locale],
      type: "website",
    },
  };
}
