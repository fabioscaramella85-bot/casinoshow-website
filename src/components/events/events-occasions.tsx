import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const cards = [
  {
    id: "corporate",
    src: "/eventi/occasioni/foto-eventi-aziendali.png",
    imageClassName: "object-[center_30%]",
  },
  {
    id: "team",
    src: "/eventi/occasioni/foto-team-building.png",
    imageClassName: "object-[center_42%]",
  },
  {
    id: "weddings",
    src: "/eventi/occasioni/foto-matrimoni.png",
    imageClassName: "object-[center_34%]",
  },
  {
    id: "private",
    src: "/eventi/occasioni/foto-feste-private.png",
    imageClassName: "object-[center_38%]",
  },
] as const;

export async function EventsOccasions() {
  const t = await getTranslations("Events");

  return (
    <Section id="occasions" tone="light" labelledBy="events-occasions" className="ev-occasions">
      <div className="ev-occasions-media" aria-hidden="true">
        <Image
          src="/eventi/occasioni/sfondo-sezione.png"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          className="ev-occasions-image"
        />
      </div>
      <div className="ev-occasions-veil" aria-hidden="true" />
      <Container className="ev-occasions-content">
        <SectionHeading
          id="events-occasions"
          eyebrow={t("occasions.eyebrow")}
          title={t("occasions.title")}
          description={t("occasions.description")}
        />
        <ul className="ev-card-grid">
          {cards.map((card, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <li key={card.id}>
                <a href={`#${card.id}`} className="ev-card">
                  <span className="ev-frame">
                    <Image
                      src={card.src}
                      alt={t(`occasions.items.${card.id}.alt`)}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 92vw"
                      quality={75}
                      className={`ev-frame-image ${card.imageClassName}`}
                    />
                  </span>
                  <span className="ev-card-shade" aria-hidden="true" />
                  <span className="ev-card-index" aria-hidden="true">
                    {number}
                    <span className="ev-card-slash">/</span>
                    <span className="ev-card-total">04</span>
                    <span className="ev-card-tick" />
                  </span>
                  <span className="ev-card-copy">
                    <h3>{t(`occasions.items.${card.id}.title`)}</h3>
                    <p>{t(`occasions.items.${card.id}.summary`)}</p>
                    <span className="ev-card-more">
                      <span className="ev-card-more-label">
                        {t("occasions.cta")}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          className="ev-card-arrow"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </span>
                      <span className="ev-card-line" aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
