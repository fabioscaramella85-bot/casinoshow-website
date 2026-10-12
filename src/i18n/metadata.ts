import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { getPathname } from "./navigation";
import { routing } from "./routing";
import { routePathnames, type Locale, type RouteId } from "./routes";
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

export async function getPageMetadata(routeId: RouteId): Promise<Metadata> {
  const locale = await getLocale();

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations(`Pages.${routeId}`);
  const title = t("heading");
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
