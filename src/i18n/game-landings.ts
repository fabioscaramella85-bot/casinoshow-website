import type { Locale } from "@/i18n/routes";

/**
 * Stable game IDs for the six rental landings.
 * Filesystem directories are asset folders, not public URLs.
 * A game becomes reachable only when its internal path is added to
 * `gameLandingPathnames` for the locales that have approved copy.
 */
export const gameLandingIds = [
  "roulette",
  "blackjack",
  "casino-war",
  "chuck-a-luck",
  "wheel-of-fortune",
  "poker",
] as const;

export type GameLandingId = (typeof gameLandingIds)[number];

type GameLandingDefinition = {
  id: GameLandingId;
  internalPath: `/games/${string}`;
  slugs: Record<Locale, `/${string}`>;
  image: {
    src: string;
    width: number;
    height: number;
  };
  /** Ids from the approved gallery manifest, in mosaic order. */
  gallery: readonly string[];
};

const emptyGallery: readonly string[] = [];

const rouletteGallery = [
  "fc-croupier-roulette-001",
  "fc-wedding-roulette-croupier-001",
  "drive-img-5728",
  "drive-img-5722",
  "fc-detail-roulette-chips-001",
  "fc-corporate-roulette-croupier-001",
  "fc-roulette-croupier-guests-017",
  "drive-img-5564",
] as const;

const blackjackGallery = [
  "drive-img-5718",
  "drive-img-5733",
  "drive-img-5730",
  "drive-img-5578",
  "fc-blackjack-croupier-guests-006",
  "fc-blackjack-croupier-guests-007",
  "fc-detail-blackjack-action-001",
  "fc-croupier-blackjack-001",
] as const;

const chuckALuckGallery = [
  "drive-img-5724",
  "drive-img-5568",
  "drive-img-5618",
  "fc-dadi-croupier-game-001",
] as const;

const wheelGallery = [
  "drive-img-5603",
  "drive-img-5572",
  "fc-croupier-003",
  "fc-staff-001",
] as const;

const pokerGallery = ["drive-img-5725", "fc-poker-private-guests-001"] as const;

export const gameLandingNavOrder = [
  "roulette",
  "blackjack",
  "casino-war",
  "chuck-a-luck",
  "poker",
  "wheel-of-fortune",
] as const;

export const gameLandingHref = {
  roulette: "/games/roulette",
  blackjack: "/games/blackjack",
  "casino-war": "/games/casino-war",
  "chuck-a-luck": "/games/chuck-a-luck",
  poker: "/games/poker",
  "wheel-of-fortune": "/games/wheel-of-fortune",
} as const satisfies Record<(typeof gameLandingNavOrder)[number], `/games/${string}`>;

export const gameLandings: Record<GameLandingId, GameLandingDefinition> = {
  roulette: {
    id: "roulette",
    internalPath: "/games/roulette",
    slugs: {
      it: "/noleggio-tavolo-roulette",
      de: "/roulette-tisch-mieten",
      fr: "/location-table-roulette",
      en: "/roulette-table-hire",
    },
    image: {
      src: "/giochi-e-servizi/noleggio-tavoli-da-roulette/tavolo-da-roulette.PNG",
      width: 1575,
      height: 999,
    },
    gallery: rouletteGallery,
  },
  blackjack: {
    id: "blackjack",
    internalPath: "/games/blackjack",
    slugs: {
      it: "/noleggio-tavolo-blackjack",
      de: "/blackjack-tisch-mieten",
      fr: "/location-table-blackjack",
      en: "/blackjack-table-hire",
    },
    image: {
      src: "/giochi-e-servizi/noleggio-tavoli-da-blck-jack/tavolo-da-black-jack.PNG",
      width: 1448,
      height: 1086,
    },
    gallery: blackjackGallery,
  },
  "casino-war": {
    id: "casino-war",
    internalPath: "/games/casino-war",
    slugs: {
      it: "/noleggio-tavolo-casino-war",
      de: "/casino-war-tisch-mieten",
      fr: "/location-table-casino-war",
      en: "/casino-war-table-hire",
    },
    image: {
      src: "/giochi-e-servizi/noleggio-tavoli-casino-war/tavolo-casino-war.PNG",
      width: 1448,
      height: 1086,
    },
    gallery: emptyGallery,
  },
  "chuck-a-luck": {
    id: "chuck-a-luck",
    internalPath: "/games/chuck-a-luck",
    slugs: {
      it: "/noleggio-tavolo-chuck-a-luck",
      de: "/chuck-a-luck-wuerfelspiel-mieten",
      fr: "/location-table-chuck-a-luck",
      en: "/chuck-a-luck-dice-game-hire",
    },
    image: {
      src: "/giochi-e-servizi/noleggio-tavoli-dadi-chuck-a-luck/tavolo-dadi-chuck-a-luck.PNG",
      width: 1448,
      height: 1086,
    },
    gallery: chuckALuckGallery,
  },
  "wheel-of-fortune": {
    id: "wheel-of-fortune",
    internalPath: "/games/wheel-of-fortune",
    slugs: {
      it: "/noleggio-ruota-della-fortuna",
      de: "/gluecksrad-mieten",
      fr: "/location-roue-de-la-fortune",
      en: "/wheel-of-fortune-hire",
    },
    image: {
      src: "/giochi-e-servizi/noleggio-tavolo-routa-della-fortuna/tavolo-ruota-della-fortuna.PNG",
      width: 1448,
      height: 1086,
    },
    gallery: wheelGallery,
  },
  poker: {
    id: "poker",
    internalPath: "/games/poker",
    slugs: {
      it: "/noleggio-tavolo-poker",
      de: "/poker-tisch-mieten",
      fr: "/location-table-poker",
      en: "/poker-table-hire",
    },
    image: {
      src: "/giochi-e-servizi/noleggio-tavoli-da-poker/tavolo-da-poker.PNG",
      width: 1448,
      height: 1086,
    },
    gallery: pokerGallery,
  },
};

/**
 * Public, indexable game URLs. Every published locale has approved copy.
 * Slug literals stay here so next-intl keeps the public paths exact.
 */
export const gameLandingPathnames = {
  "/games/roulette": {
    it: "/noleggio-tavolo-roulette",
    de: "/roulette-tisch-mieten",
    fr: "/location-table-roulette",
    en: "/roulette-table-hire",
  },
  "/games/blackjack": {
    it: "/noleggio-tavolo-blackjack",
    de: "/blackjack-tisch-mieten",
    fr: "/location-table-blackjack",
    en: "/blackjack-table-hire",
  },
  "/games/casino-war": {
    it: "/noleggio-tavolo-casino-war",
    de: "/casino-war-tisch-mieten",
    fr: "/location-table-casino-war",
    en: "/casino-war-table-hire",
  },
  "/games/chuck-a-luck": {
    it: "/noleggio-tavolo-chuck-a-luck",
    de: "/chuck-a-luck-wuerfelspiel-mieten",
    fr: "/location-table-chuck-a-luck",
    en: "/chuck-a-luck-dice-game-hire",
  },
  "/games/wheel-of-fortune": {
    it: "/noleggio-ruota-della-fortuna",
    de: "/gluecksrad-mieten",
    fr: "/location-roue-de-la-fortune",
    en: "/wheel-of-fortune-hire",
  },
  "/games/poker": {
    it: "/noleggio-tavolo-poker",
    de: "/poker-tisch-mieten",
    fr: "/location-table-poker",
    en: "/poker-table-hire",
  },
} as const;

export type GameLandingPathname = keyof typeof gameLandingPathnames;

export function gameLandingByPath(pathname: string) {
  return Object.values(gameLandings).find((game) => game.internalPath === pathname);
}

export function isGameLandingPublic(id: GameLandingId, locale: string) {
  const pathname = gameLandings[id].internalPath;
  if (!(pathname in gameLandingPathnames)) {
    return false;
  }

  const localized = gameLandingPathnames[pathname as GameLandingPathname];
  return Object.prototype.hasOwnProperty.call(localized, locale);
}

export function publicGameLandingEntries() {
  return (Object.entries(gameLandingPathnames) as Array<
    [GameLandingPathname, (typeof gameLandingPathnames)[GameLandingPathname]]
  >).flatMap(([pathname, localized]) =>
    (Object.keys(localized) as Array<keyof typeof localized>).map((locale) => ({
      pathname,
      locale,
    })),
  );
}

for (const [pathname, localized] of Object.entries(gameLandingPathnames)) {
  const game = gameLandingByPath(pathname);
  if (!game) {
    throw new Error(`Game landing path "${pathname}" has no configuration.`);
  }

  for (const [locale, slug] of Object.entries(localized)) {
    if (game.slugs[locale as Locale] !== slug) {
      throw new Error(`Game landing slug mismatch for ${pathname} (${locale}).`);
    }
  }
}
