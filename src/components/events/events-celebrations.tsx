import { getLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { EventFrame } from "@/components/events/event-frame";
import { eventAlt, eventPhoto, eventPhotoIds } from "@/components/events/event-photos";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { GalleryLocale } from "@/data/gallery";
import { routing } from "@/i18n/routing";

export async function EventsCelebrations() {
  const t = await getTranslations("Events");
  const locale = await getLocale();
  const language: GalleryLocale = hasLocale(routing.locales, locale) ? locale : "it";
  const wedding = eventPhoto(eventPhotoIds.weddingFeature);
  const privateParty = eventPhoto(eventPhotoIds.privateFeature);

  return (
    <section className="bg-surface-light py-[var(--spacing-section)] text-text-on-light">
      <Container className="ev-pair">
        <article id="weddings" className="ev-editorial" aria-labelledby="events-weddings">
          <div>
            <Eyebrow>{t("weddings.eyebrow")}</Eyebrow>
            <h2 id="events-weddings" className="type-h2 mt-3 text-balance">
              {t("weddings.title")}
            </h2>
            <p className="type-body-lg mt-5">{t("weddings.body")}</p>
            <p className="type-body ev-note text-text-muted-on-light">{t("weddings.note")}</p>
          </div>
          <EventFrame
            photo={wedding}
            alt={eventAlt(wedding, language)}
            sizes="(min-width: 768px) 46vw, 100vw"
            className="ev-zoom ev-media-wide"
            imageClassName="object-[center_46%]"
          />
        </article>
        <article id="private" className="ev-editorial ev-editorial-reverse" aria-labelledby="events-private">
          <EventFrame
            photo={privateParty}
            alt={eventAlt(privateParty, language)}
            sizes="(min-width: 768px) 46vw, 100vw"
            className="ev-zoom ev-media-wide"
            imageClassName="object-center"
          />
          <div className="ev-editorial-copy">
            <Eyebrow>{t("private.eyebrow")}</Eyebrow>
            <h2 id="events-private" className="type-h2 mt-3 text-balance">
              {t("private.title")}
            </h2>
            <p className="type-body-lg mt-5">{t("private.body")}</p>
          </div>
        </article>
      </Container>
    </section>
  );
}
