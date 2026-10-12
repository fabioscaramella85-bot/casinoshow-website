import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

const pointKeys = ["interaction", "atmosphere", "guests"] as const;

export async function BlackjackSection() {
  const t = await getTranslations("Games");

  return (
    <Section id="blackjack" labelledBy="games-blackjack" tone="light">
      <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:order-2">
          <Eyebrow>{t("blackjack.eyebrow")}</Eyebrow>
          <h2 id="games-blackjack" className="type-h2 mt-3 text-balance">
            {t("blackjack.title")}
          </h2>
          <p className="type-body-lg mt-5 text-text-muted-on-light">{t("blackjack.body")}</p>
          <ol className="mt-8 border-t border-line-on-light">
            {pointKeys.map((key, index) => (
              <li key={key} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line-on-light py-5">
                <span className="type-eyebrow pt-1 text-gold-ink">0{index + 1}</span>
                <div>
                  <h3 className="type-h4">{t(`blackjack.points.${key}.title`)}</h3>
                  <p className="type-body mt-2 text-text-muted-on-light">
                    {t(`blackjack.points.${key}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <MediaFrame decorative accent="green" className="aspect-[4/3] lg:order-1" />
      </Container>
    </Section>
  );
}
