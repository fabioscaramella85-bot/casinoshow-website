import Image from "next/image";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { galleryPhotos, selectHomepagePreview, toGalleryView } from "@/data/gallery";
import { routing } from "@/i18n/routing";
import { routePathnames } from "@/i18n/routes";

const frames = ["gold", "green", "red", "ivory"] as const;

export async function HomeGallery() {
  const t = await getTranslations("Home");
  const locale = await getLocale();
  const photos = hasLocale(routing.locales, locale)
    ? selectHomepagePreview(toGalleryView(galleryPhotos, locale))
    : [];

  return (
    <Section tone="muted" labelledBy="home-gallery">
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
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {photos.map((photo) => (
              <li key={photo.id} className="relative aspect-[4/3] overflow-hidden bg-graphite">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {frames.map((accent) => (
              <MediaFrame key={accent} decorative accent={accent} />
            ))}
          </div>
        )}
        <div className="mt-10">
          <Button href={routePathnames.gallery} variant="secondary">
            {t("gallery.cta")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
