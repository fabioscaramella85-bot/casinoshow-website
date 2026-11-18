import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { isLegalRoutePublic } from "@/lib/legal/publication";
import { previewModeEnabled } from "@/lib/preview/protection";
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

const socialPreviewImage = {
  url: "/social/social-preview.png",
  width: 1733,
  height: 907,
  type: "image/png",
} as const;

function socialPreview(alt: string) {
  return [{ ...socialPreviewImage, alt }];
}

function twitterCard(title: string, description: string) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [socialPreviewImage.url],
  };
}

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

  const released = isLegalRoutePublic(routeId);
  const indexable = released && !previewModeEnabled();
  const home = await getTranslations("Pages.home");
  const unpublished = await getTranslations("Legal.unpublished");
  const publishedCopy = released ? await getTranslations(`Legal.public.${routeId}`) : null;
  const title = publishedCopy ? publishedCopy("title") : unpublished(`${routeId}.title`);
  const description = publishedCopy ? publishedCopy("summary") : unpublished("notice");
  const url = absoluteLegalUrl(routeId, locale);
  const imageAlt = home("socialImageAlt");

  return {
    title,
    description,
    robots: {
      index: indexable,
      follow: indexable,
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
      images: socialPreview(imageAlt),
    },
    twitter: twitterCard(title, description),
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
  const home = await getTranslations("Pages.home");
  const title = t("seoTitle");
  const description = t("seoDescription");
  const url = absoluteGameLandingUrl(publicPath, locale);
  const imageAlt = home("socialImageAlt");

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
      images: socialPreview(imageAlt),
    },
    twitter: twitterCard(title, description),
  };
}

export async function getPageMetadata(routeId: RouteId): Promise<Metadata> {
  const locale = await getLocale();

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations(`Pages.${routeId}`);
  const home = routeId === "home" ? t : await getTranslations("Pages.home");
  const title = t.has("title") ? t("title") : t("heading");
  const description = t("description");
  const socialTitle = routeId === "home" ? home("socialTitle") : title;
  const socialDescription = routeId === "home" ? home("socialDescription") : description;
  const imageAlt = home("socialImageAlt");
  const url = absoluteLocalizedUrl(routeId, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(routeId),
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url,
      siteName: "Casino Show",
      locale: openGraphLocales[locale],
      type: "website",
      images: socialPreview(imageAlt),
    },
    twitter: twitterCard(socialTitle, socialDescription),
  };
}
