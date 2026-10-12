export const galleryLocales = ["it", "de", "fr", "en"] as const;

export type GalleryLocale = (typeof galleryLocales)[number];

export const galleryCategoryIds = [
  "all",
  "roulette",
  "blackjack",
  "poker",
  "atmosphere",
  "corporate",
  "weddings-private",
  "casino-party",
  "wheel-of-fortune",
  "dice",
  "selfie-mirror",
  "experience-360",
] as const;

export type GalleryCategoryId = (typeof galleryCategoryIds)[number];

export type GalleryPhotoCategory = Exclude<GalleryCategoryId, "all">;

export type GalleryText = Record<GalleryLocale, string>;

export type GalleryPhoto = {
  id: string;
  src: string;
  width: number;
  height: number;
  categories: readonly GalleryPhotoCategory[];
  alt: GalleryText;
  caption?: GalleryText;
  credit?: string;
  featured?: boolean;
  rightsStatus: "approved";
};

export type GalleryViewPhoto = {
  id: string;
  src: string;
  width: number;
  height: number;
  categories: GalleryPhotoCategory[];
  alt: string;
  caption?: string;
  credit?: string;
  featured: boolean;
};

export type GalleryKeyAction =
  | { type: "close" }
  | { type: "index"; index: number }
  | { type: "none" };

const photoCategories = galleryCategoryIds.filter(
  (id): id is GalleryPhotoCategory => id !== "all",
);

const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const srcPattern =
  /^\/images\/gallery\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:webp|avif|jpe?g)$/;

/**
 * Approved photographs only. The list stays empty until a file in
 * public/images/gallery has confirmed rights. Do not add stand-ins.
 */
export const galleryPhotos: readonly GalleryPhoto[] = [];

export function assertGalleryManifest(photos: readonly GalleryPhoto[]): void {
  const ids = new Set<string>();
  const sources = new Set<string>();

  for (const photo of photos) {
    if (!idPattern.test(photo.id)) {
      throw new Error(`Gallery id "${photo.id}" must be a lowercase slug.`);
    }
    if (ids.has(photo.id)) {
      throw new Error(`Duplicate gallery id "${photo.id}".`);
    }
    ids.add(photo.id);

    if (!srcPattern.test(photo.src)) {
      throw new Error(
        `Gallery src "${photo.src}" must live in /images/gallery as webp, avif or jpeg.`,
      );
    }
    if (sources.has(photo.src)) {
      throw new Error(`Duplicate gallery src "${photo.src}".`);
    }
    sources.add(photo.src);

    if (!Number.isInteger(photo.width) || photo.width < 1200) {
      throw new Error(`Gallery image "${photo.id}" needs a width of at least 1200.`);
    }
    if (!Number.isInteger(photo.height) || photo.height < 900) {
      throw new Error(`Gallery image "${photo.id}" needs a height of at least 900.`);
    }
    if (photo.categories.length === 0) {
      throw new Error(`Gallery image "${photo.id}" needs at least one category.`);
    }

    const seen = new Set<string>();
    for (const category of photo.categories) {
      if (!photoCategories.includes(category)) {
        throw new Error(
          `Gallery image "${photo.id}" uses an unknown category "${category}".`,
        );
      }
      if (seen.has(category)) {
        throw new Error(`Gallery image "${photo.id}" repeats category "${category}".`);
      }
      seen.add(category);
    }

    for (const locale of galleryLocales) {
      if (!photo.alt[locale]?.trim()) {
        throw new Error(`Gallery image "${photo.id}" is missing alt text for ${locale}.`);
      }
      if (photo.caption && !photo.caption[locale]?.trim()) {
        throw new Error(`Gallery image "${photo.id}" is missing a ${locale} caption.`);
      }
    }

    if (photo.rightsStatus !== "approved") {
      throw new Error(`Gallery image "${photo.id}" is not an approved photograph.`);
    }
    if (photo.credit !== undefined && photo.credit.trim() === "") {
      throw new Error(`Gallery image "${photo.id}" has an empty credit.`);
    }
  }
}

assertGalleryManifest(galleryPhotos);

export function filterGalleryPhotos<
  T extends { categories: readonly GalleryPhotoCategory[] },
>(photos: readonly T[], category: GalleryCategoryId): T[] {
  if (category === "all") {
    return [...photos];
  }
  return photos.filter((photo) => photo.categories.includes(category));
}

export function stepGalleryIndex(index: number, delta: -1 | 1, length: number): number {
  if (length <= 0) {
    return 0;
  }
  const next = index + delta;
  if (next < 0 || next >= length) {
    return index;
  }
  return next;
}

export function galleryKeyAction(
  key: string,
  index: number,
  length: number,
): GalleryKeyAction {
  if (key === "Escape") {
    return { type: "close" };
  }
  if (key === "ArrowRight") {
    return { type: "index", index: stepGalleryIndex(index, 1, length) };
  }
  if (key === "ArrowLeft") {
    return { type: "index", index: stepGalleryIndex(index, -1, length) };
  }
  return { type: "none" };
}

export function selectHomepagePreview<T extends { featured?: boolean }>(
  photos: readonly T[],
  limit = 4,
): T[] {
  const featured = photos.filter((photo) => photo.featured);
  const source = featured.length > 0 ? featured : photos;
  return source.slice(0, limit);
}

export function toGalleryView(
  photos: readonly GalleryPhoto[],
  locale: GalleryLocale,
): GalleryViewPhoto[] {
  return photos.map((photo) => ({
    id: photo.id,
    src: photo.src,
    width: photo.width,
    height: photo.height,
    categories: [...photo.categories],
    alt: photo.alt[locale],
    caption: photo.caption?.[locale],
    credit: photo.credit,
    featured: photo.featured === true,
  }));
}
