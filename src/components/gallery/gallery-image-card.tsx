"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { GalleryViewPhoto } from "@/data/gallery";

type GalleryImageCardProps = {
  photo: GalleryViewPhoto;
  onOpen: () => void;
  sizes?: string;
};

const motion =
  "duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

export function GalleryImageCard({ photo, onOpen, sizes }: GalleryImageCardProps) {
  const t = useTranslations("Gallery");

  return (
    <button type="button" className="group block w-full text-left" onClick={onOpen}>
      <span className="relative block aspect-[4/3] overflow-hidden bg-graphite">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={
            sizes ??
            "(min-width: 1280px) 22vw, (min-width: 768px) 33vw, (min-width: 375px) 50vw, 100vw"
          }
          placeholder={photo.blurDataURL ? "blur" : "empty"}
          blurDataURL={photo.blurDataURL}
          className={`object-cover transition-transform ${motion} group-hover:scale-[1.06] group-focus-visible:scale-[1.06] motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-midnight/35 opacity-0 transition-opacity ${motion} group-hover:opacity-100 group-focus-visible:opacity-100`}
        />
        <span
          className={`pointer-events-none absolute inset-x-0 bottom-4 flex translate-y-2 items-center justify-center gap-2 text-ivory opacity-0 transition-[opacity,transform] ${motion} group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <path d="M15 3h6v6" />
            <path d="M9 21H3v-6" />
            <path d="M21 3l-7 7" />
            <path d="M3 21l7-7" />
          </svg>
          <span className="type-button">{t("open")}</span>
        </span>
      </span>
      {photo.caption ? (
        <span className="type-small mt-3 block text-text-on-light">{photo.caption}</span>
      ) : null}
    </button>
  );
}
