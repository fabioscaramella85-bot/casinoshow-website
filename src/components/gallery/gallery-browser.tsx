"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
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

const BATCH_SIZE = 24;

export function GalleryBrowser({ photos }: GalleryBrowserProps) {
  const t = useTranslations("Gallery");
  const openerRef = useRef<HTMLElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<GalleryCategoryId>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [shownCount, setShownCount] = useState(BATCH_SIZE);
  const visible = filterGalleryPhotos(photos, category);
  const shown = visible.slice(0, shownCount);
  const hasMore = shown.length < visible.length;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShownCount((current) => Math.min(current + BATCH_SIZE, visible.length));
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, visible.length, category]);

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
            setShownCount(BATCH_SIZE);
          }}
        />
        {visible.length > 0 && category !== "all" ? (
          <p className="type-small mt-6 text-text-muted-on-light" aria-live="polite">
            {t("count", { count: visible.length })}
          </p>
        ) : visible.length === 0 ? (
          <p className="type-body mt-8 max-w-2xl" role="status">
            {t("emptyCategory")}
          </p>
        ) : null}
        {shown.length > 0 ? <GalleryGrid photos={shown} onOpen={openAt} /> : null}
        {hasMore ? (
          <div ref={sentinelRef} className="mt-8 flex justify-center">
            <button
              type="button"
              className="type-button inline-flex min-h-11 items-center border border-line-on-light px-4 text-midnight"
              onClick={() =>
                setShownCount((current) => Math.min(current + BATCH_SIZE, visible.length))
              }
            >
              {t("loadMore")}
            </button>
          </div>
        ) : null}
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
