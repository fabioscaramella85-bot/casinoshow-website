"use client";

import { GalleryImageCard } from "@/components/gallery/gallery-image-card";
import type { GalleryViewPhoto } from "@/data/gallery";

type GalleryGridProps = {
  photos: readonly GalleryViewPhoto[];
  onOpen: (index: number) => void;
};

export function GalleryGrid({ photos, onOpen }: GalleryGridProps) {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-4 min-[375px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {photos.map((photo, index) => (
        <li key={photo.id}>
          <GalleryImageCard photo={photo} onOpen={() => onOpen(index)} />
        </li>
      ))}
    </ul>
  );
}
