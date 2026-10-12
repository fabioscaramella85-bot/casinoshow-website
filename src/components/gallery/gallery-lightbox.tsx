"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef } from "react";
import {
  galleryKeyAction,
  stepGalleryIndex,
  type GalleryViewPhoto,
} from "@/data/gallery";

type GalleryLightboxProps = {
  photos: readonly GalleryViewPhoto[];
  index: number;
  onClose: () => void;
  onIndex: (index: number) => void;
};

export function GalleryLightbox({ photos, index, onClose, onIndex }: GalleryLightboxProps) {
  const t = useTranslations("Gallery");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const startX = useRef<number | null>(null);
  const titleId = useId();
  const captionId = useId();
  const photo = photos[index];
  const last = photos.length - 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    dialog.showModal();
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  if (!photo) {
    return null;
  }

  function move(delta: -1 | 1) {
    onIndex(stepGalleryIndex(index, delta, photos.length));
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={photo.caption ? captionId : undefined}
      className="gallery-dialog"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
          return;
        }
        event.preventDefault();
        const action = galleryKeyAction(event.key, index, photos.length);
        if (action.type === "index") {
          onIndex(action.index);
        }
      }}
    >
      <p id={titleId} className="sr-only">
        {t("lightbox.dialog")}
      </p>
      <div className="flex items-center justify-between gap-3">
        <p className="type-small text-text-muted-on-dark">
          {t("lightbox.position", { current: index + 1, total: photos.length })}
        </p>
        <button
          ref={closeRef}
          type="button"
          className="type-button inline-flex min-h-11 items-center px-3 text-ivory"
          onClick={onClose}
        >
          {t("lightbox.close")}
        </button>
      </div>
      <div
        className="relative mt-4 aspect-[4/3] bg-graphite"
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) {
            return;
          }
          startX.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (startX.current === null) {
            return;
          }
          const delta = event.clientX - startX.current;
          startX.current = null;
          if (Math.abs(delta) < 48) {
            return;
          }
          move(delta < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          startX.current = null;
        }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1280px) 72rem, 100vw"
          loading="eager"
          className="object-contain"
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          className="type-button inline-flex min-h-11 items-center px-3 text-ivory disabled:opacity-40"
          onClick={() => move(-1)}
          disabled={index === 0}
        >
          {t("lightbox.previous")}
        </button>
        <button
          type="button"
          className="type-button inline-flex min-h-11 items-center px-3 text-ivory disabled:opacity-40"
          onClick={() => move(1)}
          disabled={index === last}
        >
          {t("lightbox.next")}
        </button>
      </div>
      {photo.caption ? (
        <p id={captionId} className="type-body mt-4 max-w-2xl text-text-on-dark">
          {photo.caption}
        </p>
      ) : null}
      {photo.credit ? (
        <p className="type-small mt-3 text-text-muted-on-dark">
          {t("lightbox.credit")} {photo.credit}
        </p>
      ) : null}
    </dialog>
  );
}
