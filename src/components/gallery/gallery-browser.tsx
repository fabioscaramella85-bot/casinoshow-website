"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { GalleryFilters } from "@/components/gallery/gallery-filters";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  filterGalleryPhotos,
  type GalleryCategoryId,
  type GalleryViewPhoto,
} from "@/data/gallery";

type GalleryBrowserProps = {
  photos: readonly GalleryViewPhoto[];
};

export function GalleryBrowser({ photos }: GalleryBrowserProps) {
  const t = useTranslations("Gallery");
  const openerRef = useRef<HTMLElement | null>(null);
  const [category, setCategory] = useState<GalleryCategoryId>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visible = filterGalleryPhotos(photos, category);

  function openAt(index: number) {
    openerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActiveIndex(index);
  }

  function close() {
    const opener = openerRef.current;
    setActiveIndex(null);
    requestAnimationFrame(() => opener?.focus());
  }

  return (
    <Section tone="muted" labelledBy="gallery-collection">
      <Container>
        <SectionHeading
          id="gallery-collection"
          eyebrow={t("collection.eyebrow")}
          title={t("collection.title")}
          description={t("collection.body")}
        />
        <GalleryFilters
          category={category}
          onChange={(next) => {
            setCategory(next);
            setActiveIndex(null);
          }}
        />
        {visible.length > 0 ? (
          <p className="type-small mt-6 text-text-muted-on-light" aria-live="polite">
            {t("count", { count: visible.length })}
          </p>
        ) : (
          <p className="type-body mt-8 max-w-2xl" role="status">
            {t("emptyCategory")}
          </p>
        )}
        {visible.length > 0 ? <GalleryGrid photos={visible} onOpen={openAt} /> : null}
      </Container>
      {activeIndex !== null && visible[activeIndex] ? (
        <GalleryLightbox
          photos={visible}
          index={activeIndex}
          onClose={close}
          onIndex={setActiveIndex}
        />
      ) : null}
    </Section>
  );
}
