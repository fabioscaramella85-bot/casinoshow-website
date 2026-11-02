"use client";

import Image from "next/image";
import { useState } from "react";
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox";
import { Container } from "@/components/ui/container";

export type GameEventGalleryPhoto = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

type GameEventGalleryProps = {
  heading: string;
  photos: readonly GameEventGalleryPhoto[];
};

type Tile = "full" | "featured" | "third" | "half";

function tileOf(index: number, total: number): Tile {
  if (total <= 1) {
    return "full";
  }

  if (index < 2) {
    return "featured";
  }

  const support = total - 2;
  const supportIndex = index - 2;
  const remainder = support % 3;

  if (support === 4) {
    return "half";
  }

  if (remainder === 0) {
    return "third";
  }

  if (remainder === 1) {
    return "full";
  }

  const fullRows = support - 2;
  return supportIndex < fullRows ? "third" : "half";
}

function tileClass(tile: Tile, index: number, total: number) {
  const lastOdd = index === total - 1 && total % 2 === 1;
  const mobile = lastOdd ? "w-full" : "w-[calc((100%-8px)/2)]";

  if (tile === "full") {
    return `${mobile} aspect-[4/3] lg:aspect-[16/10] lg:w-full`;
  }

  if (tile === "featured") {
    return `${mobile} aspect-[4/3] lg:aspect-[16/10] lg:w-[calc((100%-8px)/2)]`;
  }

  if (tile === "half") {
    return `${mobile} aspect-[4/3] lg:w-[calc((100%-8px)/2)]`;
  }

  return `${mobile} aspect-[4/3] lg:w-[calc((100%-16px)/3)]`;
}

function imageSizes(tile: Tile) {
  if (tile === "full") {
    return "(min-width: 1024px) 72rem, 100vw";
  }

  if (tile === "third") {
    return "(min-width: 1024px) 24rem, 50vw";
  }

  return "(min-width: 1024px) 36rem, 50vw";
}

export function GameEventGallery({ heading, photos }: GameEventGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const total = Math.min(photos.length, 8);
  const visible = photos.slice(0, 8);

  if (total === 0) {
    return null;
  }

  return (
    <section className="bg-surface-light py-14 text-text-on-light sm:py-16" aria-labelledby="game-gallery-title">
      <Container>
        <h2 id="game-gallery-title" className="type-h2 text-balance">
          {heading}
        </h2>
        <ul className="mt-8 flex flex-wrap gap-2">
          {visible.map((photo, photoIndex) => {
            const tile = tileOf(photoIndex, total);
            return (
              <li key={photo.id} className={`relative min-w-0 ${tileClass(tile, photoIndex, total)}`}>
                <button
                  type="button"
                  className="group absolute inset-0 rounded-[var(--radius-sm)]"
                  onClick={() => setIndex(photoIndex)}
                >
                  <span className="absolute inset-0 overflow-hidden rounded-[var(--radius-sm)] bg-surface-muted">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      quality={80}
                      sizes={imageSizes(tile)}
                      className="object-cover transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Container>
      {index !== null ? (
        <GalleryLightbox
          photos={visible}
          index={index}
          onClose={() => setIndex(null)}
          onIndex={setIndex}
        />
      ) : null}
    </section>
  );
}
