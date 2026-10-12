import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

export async function WeddingEvents() {
  const t = await getTranslations("Events");

  return (
    <Section id="weddings" labelledBy="events-weddings" tone="muted">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{t("weddings.eyebrow")}</Eyebrow>
          <h2 id="events-weddings" className="type-h1 mt-4 text-balance">
            {t("weddings.title")}
          </h2>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-16">
          <p className="type-body-lg">{t("weddings.body")}</p>
          <p className="type-body text-text-muted-on-light">{t("weddings.note")}</p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <article className="border-t border-gold-ink/40 pt-5">
            <h3 className="type-h4">{t("weddings.atmosphere.title")}</h3>
            <p className="type-body mt-3 text-text-muted-on-light">{t("weddings.atmosphere.body")}</p>
          </article>
          <article className="border-t border-gold-ink/40 pt-5">
            <h3 className="type-h4">{t("weddings.guests.title")}</h3>
            <p className="type-body mt-3 text-text-muted-on-light">{t("weddings.guests.body")}</p>
          </article>
        </div>
        <MediaFrame decorative accent="gold" className="mt-12 aspect-[16/9]" />
      </Container>
    </Section>
  );
}
