"use client";

import { useState } from "react";
import { GalleryImageCard } from "@/components/gallery/gallery-image-card";
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox";
import type { GalleryViewPhoto } from "@/data/gallery";

type HomeGalleryPreviewProps = {
  photos: readonly GalleryViewPhoto[];
};

export function HomeGalleryPreview({ photos }: HomeGalleryPreviewProps) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="mt-8 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {photos.map((photo, photoIndex) => (
          <li key={photo.id}>
            <GalleryImageCard
              photo={photo}
              sizes="(min-width: 1024px) 22vw, (min-width: 480px) 46vw, 92vw"
              onOpen={() => setIndex(photoIndex)}
            />
          </li>
        ))}
      </ul>
      {index !== null ? (
        <GalleryLightbox
          photos={photos}
          index={index}
          onClose={() => setIndex(null)}
          onIndex={setIndex}
        />
      ) : null}
    </>
  );
}
