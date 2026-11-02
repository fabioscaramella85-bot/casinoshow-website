import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { HomeGalleryPreview } from "@/components/home/home-gallery-preview";
import { MediaFrame } from "@/components/home/media-frame";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { galleryPhotos, selectCuratedHomepagePreview, toGalleryView } from "@/data/gallery";
import { routing } from "@/i18n/routing";
import { routePathnames } from "@/i18n/routes";

const frames = ["gold", "green", "red", "ivory"] as const;

export async function HomeGallery() {
  const t = await getTranslations("Home");
  const locale = await getLocale();
  const photos = hasLocale(routing.locales, locale)
    ? selectCuratedHomepagePreview(toGalleryView(galleryPhotos, locale))
    : [];

  return (
    <Section tone="muted" labelledBy="home-gallery" className="!py-14 md:!py-16 lg:!py-20">
      <Container>
        <SectionHeading
          id="home-gallery"
          eyebrow={t("gallery.eyebrow")}
          title={photos.length > 0 ? t("gallery.readyTitle") : t("gallery.title")}
          description={
            photos.length > 0 ? t("gallery.readyDescription") : t("gallery.description")
          }
        />
        {photos.length > 0 ? (
          <HomeGalleryPreview photos={photos} />
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {frames.map((accent) => (
              <MediaFrame key={accent} decorative accent={accent} />
            ))}
          </div>
        )}
        <div className="mt-8">
          <Button href={routePathnames.gallery} variant="secondary">
            {t("gallery.cta")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
