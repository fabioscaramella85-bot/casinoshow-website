export type BrandLogo = {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
  maxWidth: number;
  maxHeight: number;
};

export const brands = [
  { id: "canon", name: "Canon", src: "/images/brands/canon.svg", width: 1000, height: 209, maxWidth: 144, maxHeight: 30 },
  { id: "versace", name: "Versace", src: "/images/brands/versace.svg", width: 283, height: 63, maxWidth: 144, maxHeight: 32 },
  { id: "yamaha", name: "Yamaha", src: "/images/brands/yamaha.webp", width: 720, height: 180, maxWidth: 146, maxHeight: 34 },
  { id: "philipp-plein", name: "Philipp Plein", src: "/images/brands/philipp-plein.webp", width: 720, height: 255, maxWidth: 118, maxHeight: 40 },
  { id: "loreal", name: "L’Oréal", src: "/images/brands/loreal.svg", width: 800, height: 145, maxWidth: 144, maxHeight: 26 },
  { id: "mercedes-benz", name: "Mercedes-Benz", src: "/images/brands/mercedes-benz.svg", width: 3144, height: 2109, maxWidth: 72, maxHeight: 48 },
  { id: "four-seasons", name: "Four Seasons", src: "/images/brands/four-seasons.webp", width: 720, height: 355, maxWidth: 92, maxHeight: 44 },
  { id: "bic", name: "BIC", src: "/images/brands/bic.svg", width: 100, height: 38, maxWidth: 89, maxHeight: 34 },
  { id: "range-rover", name: "Range Rover", src: "/images/brands/range-rover.webp", width: 720, height: 197, maxWidth: 124, maxHeight: 32 },
  { id: "zelig", name: "Zelig", src: "/images/brands/zelig.webp", width: 720, height: 338, maxWidth: 92, maxHeight: 42 },
  { id: "dior", name: "Dior", src: "/images/brands/dior.svg", width: 495, height: 138, maxWidth: 122, maxHeight: 34 },
  { id: "michelin", name: "Michelin", src: "/images/brands/michelin.webp", width: 720, height: 152, maxWidth: 155, maxHeight: 30 },
  { id: "abb", name: "ABB", src: "/images/brands/abb.svg", width: 87, height: 33, maxWidth: 90, maxHeight: 34 },
  { id: "acer", name: "Acer", src: "/images/brands/acer.webp", width: 720, height: 172, maxWidth: 144, maxHeight: 32 },
  { id: "ferrari", name: "Ferrari", src: "/images/brands/ferrari.png", width: 1536, height: 1024, maxWidth: 78, maxHeight: 52 },
  { id: "swiss-life", name: "Swiss Life", src: "/images/brands/swiss-life.webp", width: 720, height: 487, maxWidth: 68, maxHeight: 46 },
] as const satisfies readonly BrandLogo[];
