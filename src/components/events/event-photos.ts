import { galleryPhotos, type GalleryLocale, type GalleryPhoto } from "@/data/gallery";

export const eventPhotoIds = {
  corporateCard: "fc-corporate-guests-action-001",
  teamCard: "fc-guests-blackjack-group-001",
  weddingCard: "fc-wedding-roulette-guests-001",
  privateCard: "fc-poker-private-guests-001",
  corporateFeature: "fc-corporate-roulette-croupier-001",
  teamFeature: "fc-roulette-guests-action-001",
  weddingFeature: "fc-wedding-roulette-croupier-001",
  privateFeature: "fc-multitable-private-roulette-002",
} as const;

export const eventGalleryIds = [
  "drive-img-5728",
  "drive-img-5718",
  "drive-img-5725",
] as const;

const photosById = new Map(galleryPhotos.map((photo) => [photo.id, photo]));

export function eventPhoto(id: string): GalleryPhoto {
  const photo = photosById.get(id);
  if (!photo) {
    throw new Error(`Missing approved event photograph: ${id}`);
  }
  return photo;
}

export function eventAlt(photo: GalleryPhoto, locale: GalleryLocale) {
  return photo.alt[locale];
}
