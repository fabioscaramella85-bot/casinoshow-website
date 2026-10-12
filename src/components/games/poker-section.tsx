import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

const pointKeys = ["table", "participation", "setting"] as const;

export async function PokerSection() {
  const t = await getTranslations("Games");

  return (
    <Section id="poker" labelledBy="games-poker" tone="dark">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow tone="dark">{t("poker.eyebrow")}</Eyebrow>
          <h2 id="games-poker" className="type-h1 mt-4 text-balance">
            {t("poker.title")}
          </h2>
          <p className="type-body-lg mt-6 text-text-muted-on-dark">{t("poker.body")}</p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {pointKeys.map((key) => (
            <article key={key} className="border-t border-brand-gold/50 pt-5">
              <h3 className="type-h4">{t(`poker.points.${key}.title`)}</h3>
              <p className="type-body mt-3 text-text-muted-on-dark">
                {t(`poker.points.${key}.body`)}
              </p>
            </article>
          ))}
        </div>
        <MediaFrame decorative accent="ivory" className="mt-12 aspect-[16/9]" />
      </Container>
    </Section>
  );
}
