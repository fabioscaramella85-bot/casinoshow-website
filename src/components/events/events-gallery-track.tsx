"use client";

import Image from "next/image";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { routePathnames } from "@/i18n/routes";

export type GalleryStripPhoto = {
  id: string;
  src: string;
  alt: string;
  blurDataURL?: string;
};

type EventsGalleryTrackProps = {
  photos: readonly GalleryStripPhoto[];
  previousLabel: string;
  nextLabel: string;
  regionLabel: string;
};

export function EventsGalleryTrack({
  photos,
  previousLabel,
  nextLabel,
  regionLabel,
}: EventsGalleryTrackProps) {
  const listRef = useRef<HTMLUListElement>(null);

  function scrollByDir(direction: -1 | 1) {
    const list = listRef.current;
    if (!list) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollBy({
      left: direction * Math.max(list.clientWidth * 0.84, 220),
      behavior: reduce ? "auto" : "smooth",
    });
  }

  return (
    <>
      <div className="ev-gallery-nav">
        <button type="button" onClick={() => scrollByDir(-1)} aria-controls="events-gallery-strip">
          <span className="sr-only">{previousLabel}</span>
          <Arrow direction="left" />
        </button>
        <button type="button" onClick={() => scrollByDir(1)} aria-controls="events-gallery-strip">
          <span className="sr-only">{nextLabel}</span>
          <Arrow direction="right" />
        </button>
      </div>
      <ul id="events-gallery-strip" ref={listRef} className="ev-gallery-track" aria-label={regionLabel}>
        {photos.map((photo) => (
          <li key={photo.id}>
            <Link href={routePathnames.gallery} className="ev-shot">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 30vw, 84vw"
                placeholder={photo.blurDataURL ? "blur" : "empty"}
                blurDataURL={photo.blurDataURL}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      {direction === "left" ? <path d="M13 8H3M7 4 3 8l4 4" /> : <path d="M3 8h10M9 4l4 4-4 4" />}
    </svg>
  );
}
