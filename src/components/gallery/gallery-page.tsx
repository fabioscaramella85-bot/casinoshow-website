import dynamic from "next/dynamic";
import { hasLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { GalleryEmptyState } from "@/components/gallery/gallery-empty-state";
import { GalleryFinalCta } from "@/components/gallery/gallery-final-cta";
import { GalleryHero } from "@/components/gallery/gallery-hero";
import { GalleryIntroduction } from "@/components/gallery/gallery-introduction";
import { SiteShell } from "@/components/site-shell";
import { galleryPhotos, toGalleryView } from "@/data/gallery";
import { routing } from "@/i18n/routing";

const GalleryBrowser = dynamic(() =>
  import("@/components/gallery/gallery-browser").then((module) => module.GalleryBrowser),
);

export async function GalleryPageView() {
  const locale = await getLocale();
  const photos = hasLocale(routing.locales, locale)
    ? toGalleryView(galleryPhotos, locale)
    : [];

  return (
    <SiteShell routeId="gallery">
      <GalleryHero />
      <GalleryIntroduction />
      {photos.length === 0 ? <GalleryEmptyState /> : <GalleryBrowser photos={photos} />}
      <GalleryFinalCta />
    </SiteShell>
  );
}
