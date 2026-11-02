import { getLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { eventAlt, eventGalleryIds, eventPhoto } from "@/components/events/event-photos";
import { EventsGalleryTrack } from "@/components/events/events-gallery-track";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { GalleryLocale } from "@/data/gallery";
import { routing } from "@/i18n/routing";
import { routePathnames } from "@/i18n/routes";

export async function EventsGalleryPreview() {
  const t = await getTranslations("Events");
  const locale = await getLocale();
  const language: GalleryLocale = hasLocale(routing.locales, locale) ? locale : "it";
  const photos = eventGalleryIds.map((id) => {
    const photo = eventPhoto(id);
    return {
      id: photo.id,
      src: photo.src,
      alt: eventAlt(photo, language),
      blurDataURL: photo.blurDataURL,
    };
  });

  return (
    <Section tone="light" labelledBy="events-gallery">
      <Container>
        <SectionHeading
          id="events-gallery"
          eyebrow={t("gallery.eyebrow")}
          title={t("gallery.title")}
          description={t("gallery.body")}
        />
        <EventsGalleryTrack
          photos={photos}
          previousLabel={t("gallery.previous")}
          nextLabel={t("gallery.next")}
          regionLabel={t("gallery.region")}
        />
        <div className="mt-8">
          <Button href={routePathnames.gallery} variant="secondary" className="w-full sm:w-auto">
            {t("gallery.cta")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
