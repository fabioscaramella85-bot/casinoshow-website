"use client";

import { useTranslations } from "next-intl";
import { galleryCategoryIds, type GalleryCategoryId } from "@/data/gallery";

type GalleryFiltersProps = {
  category: GalleryCategoryId;
  onChange: (category: GalleryCategoryId) => void;
};

export function GalleryFilters({ category, onChange }: GalleryFiltersProps) {
  const t = useTranslations("Gallery");

  return (
    <div className="mt-8" role="group" aria-label={t("filters.label")}>
      <ul className="flex flex-wrap gap-2">
        {galleryCategoryIds.map((id) => {
          const selected = id === category;
          return (
            <li key={id}>
              <button
                type="button"
                aria-pressed={selected}
                className={`type-small inline-flex min-h-11 max-w-full items-center border px-3 py-2 text-left transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] ${
                  selected
                    ? "border-midnight bg-midnight text-ivory"
                    : "border-line-on-light bg-transparent text-midnight hover:border-midnight"
                }`}
                onClick={() => onChange(id)}
              >
                {t(`filters.items.${id}`)}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
