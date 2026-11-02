import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { EventIcon } from "@/components/events/events-icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getNavLabels } from "@/i18n/labels";
import { routePathnames } from "@/i18n/routes";

const highlights = [
  { id: "atmosphere", icon: "spark" },
  { id: "experience", icon: "guests" },
  { id: "croupiers", icon: "croupier" },
  { id: "setup", icon: "layout" },
] as const;

export async function EventsHero() {
  const page = await getTranslations("Pages.events");
  const t = await getTranslations("Events");
  const labels = await getNavLabels();
  const line1 = t("hero.line1");
  const line2 = t("hero.line2");

  if (`${line1} ${line2}` !== page("heading")) {
    throw new Error("Events hero lines must match Pages.events.heading.");
  }

  return (
    <section className="ev-hero" aria-labelledby="events-hero-title">
      <div className="ev-hero-media" aria-hidden="true">
        <Image
          src="/eventi/sfondo.png"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="ev-hero-image"
        />
      </div>
      <div className="ev-hero-scrim" aria-hidden="true" />
      <Container className="ev-hero-content">
        <div className="ev-hero-copy">
          <div className="ev-rise">
            <Eyebrow tone="dark">{t("hero.eyebrow")}</Eyebrow>
            <span className="ev-gold-rule" aria-hidden="true" />
          </div>
          <h1 id="events-hero-title" className="type-display ev-hero-title ev-rise">
            <span className="block">{line1}</span>
            <span className="block">{line2}</span>
          </h1>
          <p className="type-body-lg ev-hero-support ev-rise">{t("hero.support")}</p>
          <p className="type-body ev-hero-lead ev-rise">{t("hero.lead")}</p>
          <div className="ev-hero-actions ev-rise">
            <Button href={routePathnames.quote} className="w-full md:w-auto">
              {labels.quote}
            </Button>
            <a href="#eventi-mosaico" className="ev-button-light w-full md:w-auto">
              {t("hero.secondaryCta")}
            </a>
          </div>
        </div>
        <ul className="ev-highlights ev-rise">
          {highlights.map((item) => (
            <li key={item.id} className="ev-highlight">
              <EventIcon name={item.icon} />
              <span>{t(`hero.highlights.${item.id}`)}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
