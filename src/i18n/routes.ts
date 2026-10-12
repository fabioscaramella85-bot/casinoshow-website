export const locales = ["it", "de", "fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "it";

/**
 * Internal App Router pathnames. Public URLs are the localized values below.
 * Components must link with these keys through next-intl navigation helpers.
 */
export const pathnames = {
  "/": "/",
  "/events": {
    it: "/eventi",
    de: "/events",
    fr: "/evenements",
    en: "/events",
  },
  "/games": {
    it: "/giochi-servizi",
    de: "/spiele-services",
    fr: "/jeux-services",
    en: "/games-services",
  },
  "/gallery": {
    it: "/gallery",
    de: "/galerie",
    fr: "/galerie",
    en: "/gallery",
  },
  "/about": {
    it: "/chi-siamo",
    de: "/ueber-uns",
    fr: "/a-propos",
    en: "/about-us",
  },
  "/contact": {
    it: "/contatti",
    de: "/kontakt",
    fr: "/contact",
    en: "/contact",
  },
  "/quote": {
    it: "/preventivo",
    de: "/angebot-anfordern",
    fr: "/demander-un-devis",
    en: "/request-a-quote",
  },
} as const;

export const routePathnames = {
  home: "/",
  events: "/events",
  games: "/games",
  gallery: "/gallery",
  about: "/about",
  contact: "/contact",
  quote: "/quote",
} as const;

export type RouteId = keyof typeof routePathnames;
export type InternalPathname = (typeof routePathnames)[RouteId];

export const routeIds = Object.keys(routePathnames) as RouteId[];

export const primaryNavRouteIds = [
  "home",
  "events",
  "games",
  "gallery",
  "about",
  "contact",
] as const satisfies readonly RouteId[];

export function isKnownUnprefixedPath(pathname: string) {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  return Object.entries(pathnames).some(([internal, external]) => {
    if (internal === normalized) {
      return true;
    }

    if (typeof external === "string") {
      return external === normalized;
    }

    return (Object.values(external) as string[]).includes(normalized);
  });
}
