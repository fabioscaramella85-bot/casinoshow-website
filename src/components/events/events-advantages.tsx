import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { EventIcon } from "@/components/events/events-icons";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

const items = [
  { id: "croupiers", icon: "croupier" },
  { id: "tables", icon: "table" },
  { id: "atmosphere", icon: "spark" },
  { id: "tailored", icon: "sliders" },
] as const;

export async function EventsAdvantages() {
  const t = await getTranslations("Events");

  return (
    <section className="ev-benefits" aria-labelledby="events-advantages">
      <div className="ev-benefits-media" aria-hidden="true">
        <Image
          src="/eventi/sfondo-sezione-vantaggi.png"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          className="ev-benefits-image"
        />
      </div>
      <div className="ev-benefits-scrim" aria-hidden="true" />
      <Container className="relative z-[1] w-full py-[var(--spacing-section)]">
        <div className="max-w-xl">
          <Eyebrow tone="dark">{t("advantages.eyebrow")}</Eyebrow>
          <h2 id="events-advantages" className="type-h2 mt-3 text-balance">
            {t("advantages.title")}
          </h2>
        </div>
        <ul className="ev-benefit-grid">
          {items.map((item) => (
            <li key={item.id} className="ev-benefit">
              <EventIcon name={item.icon} />
              <span className="ev-benefit-rule" aria-hidden="true" />
              <h3 className="type-h4">{t(`advantages.items.${item.id}.title`)}</h3>
              <p className="type-body mt-2 text-text-muted-on-dark">
                {t(`advantages.items.${item.id}.body`)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
