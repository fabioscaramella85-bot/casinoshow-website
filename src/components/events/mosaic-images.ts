export const mosaicCardIds = [
  "eventi-aziendali",
  "team-building",
  "matrimoni",
  "feste-private",
  "compleanni",
  "casino-royale",
  "cene-di-gala",
  "fiere-esposizioni",
  "convention",
  "lanci-di-prodotto",
  "feste-di-natale",
  "serate-a-tema",
] as const;

export type MosaicCardId = (typeof mosaicCardIds)[number];

const mosaicDir = "/eventi/corpo centrale";

/** Card id stays stable. File names follow the assets in public/eventi/corpo centrale/. */
export const mosaicImages: Record<MosaicCardId, string | null> = {
  "eventi-aziendali": `${mosaicDir}/eventi-aziendali.png`,
  "team-building": `${mosaicDir}/team-building.png`,
  matrimoni: `${mosaicDir}/matrimoni.png`,
  "feste-private": `${mosaicDir}/feste-private.png`,
  compleanni: `${mosaicDir}/compleanni.png`,
  "casino-royale": `${mosaicDir}/casino-royale.png`,
  "cene-di-gala": `${mosaicDir}/cene-di-gala.png`,
  "fiere-esposizioni": `${mosaicDir}/fiere-ed-esposizioni.png`,
  convention: `${mosaicDir}/convention.png`,
  "lanci-di-prodotto": `${mosaicDir}/lanci-di-prodotto.png`,
  "feste-di-natale": `${mosaicDir}/festa-di-natale.png`,
  "serate-a-tema": `${mosaicDir}/festa-a-tema.png`,
};
