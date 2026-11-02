import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { EventFrame } from "@/components/events/event-frame";
import { eventAlt, eventPhoto, eventPhotoIds } from "@/components/events/event-photos";
import { EventIcon } from "@/components/events/events-icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { GalleryLocale } from "@/data/gallery";
import { getNavLabels } from "@/i18n/labels";
import { routing } from "@/i18n/routing";
import { routePathnames } from "@/i18n/routes";

const pointKeys = ["dinner", "clients", "celebration", "launch"] as const;

export async function CorporateEvents() {
  const t = await getTranslations("Events");
  const labels = await getNavLabels();
  const locale = await getLocale();
  const language: GalleryLocale = hasLocale(routing.locales, locale) ? locale : "it";
  const photo = eventPhoto(eventPhotoIds.corporateFeature);

  return (
    <section
      id="corporate"
      className="ev-corporate bg-surface-dark py-[var(--spacing-section)] text-text-on-dark"
      aria-labelledby="events-corporate"
    >
      <div className="ev-corporate-media" aria-hidden="true">
        <Image
          src="/eventi/eventi%20aziendali/sfondo.png"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          className="ev-corporate-image"
        />
      </div>
      <Container className="ev-split ev-corporate-content">
        <div>
          <Eyebrow tone="dark">{t("corporate.eyebrow")}</Eyebrow>
          <h2 id="events-corporate" className="type-h2 mt-3 text-balance">
            {t("corporate.title")}
          </h2>
          <p className="type-body-lg mt-5 text-text-muted-on-dark">{t("corporate.body")}</p>
          <ul className="ev-check-list">
            {pointKeys.map((key) => (
              <li key={key}>
                <EventIcon name="check" />
                <span className="ev-check-label type-body">
                  {t(`corporate.points.${key}`)}
                  <span className="ev-check-line" aria-hidden="true" />
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={routePathnames.quote} className="w-full sm:w-auto">
              {labels.quote}
            </Button>
          </div>
        </div>
        <EventFrame
          photo={photo}
          alt={eventAlt(photo, language)}
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="ev-media-tall"
          imageClassName="object-[center_22%]"
        />
      </Container>
    </section>
  );
}
