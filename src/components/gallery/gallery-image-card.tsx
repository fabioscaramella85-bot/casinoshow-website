"use client";

import Image from "next/image";
import type { GalleryViewPhoto } from "@/data/gallery";

type GalleryImageCardProps = {
  photo: GalleryViewPhoto;
  onOpen: () => void;
};

export function GalleryImageCard({ photo, onOpen }: GalleryImageCardProps) {
  return (
    <button type="button" className="block w-full text-left" onClick={onOpen}>
      <span className="relative block aspect-[4/3] overflow-hidden bg-graphite">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 33vw, (min-width: 375px) 50vw, 100vw"
          className="object-cover"
        />
      </span>
      {photo.caption ? (
        <span className="type-small mt-3 block text-text-on-light">{photo.caption}</span>
      ) : null}
    </button>
  );
}
