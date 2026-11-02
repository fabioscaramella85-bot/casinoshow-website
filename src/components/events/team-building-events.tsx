import { getLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { EventFrame } from "@/components/events/event-frame";
import { eventAlt, eventPhoto, eventPhotoIds } from "@/components/events/event-photos";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { GalleryLocale } from "@/data/gallery";
import { routing } from "@/i18n/routing";

const pointKeys = ["beginners", "interaction", "adaptable"] as const;

export async function TeamBuildingEvents() {
  const t = await getTranslations("Events");
  const locale = await getLocale();
  const language: GalleryLocale = hasLocale(routing.locales, locale) ? locale : "it";
  const photo = eventPhoto(eventPhotoIds.teamFeature);

  return (
    <section id="team" className="bg-surface-muted py-[var(--spacing-section)] text-text-on-light" aria-labelledby="events-team">
      <Container className="ev-split ev-split-reverse">
        <div className="ev-split-copy">
          <Eyebrow>{t("team.eyebrow")}</Eyebrow>
          <h2 id="events-team" className="type-h2 mt-3 text-balance">
            {t("team.title")}
          </h2>
          <p className="type-body-lg mt-5 text-text-muted-on-light">{t("team.body")}</p>
          <ul className="mt-6 grid gap-3 border-t border-line-on-light">
            {pointKeys.map((key) => (
              <li key={key} className="border-b border-line-on-light py-3">
                <p className="type-body">{t(`team.points.${key}`)}</p>
              </li>
            ))}
          </ul>
        </div>
        <EventFrame
          photo={photo}
          alt={eventAlt(photo, language)}
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="ev-zoom ev-media-tall"
          imageClassName="object-center"
        />
      </Container>
    </section>
  );
}
