import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { getNavLabels } from "@/i18n/labels";
import { routePathnames } from "@/i18n/routes";

const pointKeys = ["atmosphere", "participation", "presentation"] as const;

export async function RouletteSection() {
  const t = await getTranslations("Games");
  const labels = await getNavLabels();

  return (
    <Section id="roulette" labelledBy="games-roulette" tone="dark">
      <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow tone="dark">{t("roulette.eyebrow")}</Eyebrow>
          <h2 id="games-roulette" className="type-h2 mt-3 text-balance">
            {t("roulette.title")}
          </h2>
          <p className="type-body-lg mt-5 text-text-muted-on-dark">{t("roulette.body")}</p>
          <ul className="mt-8 grid gap-6">
            {pointKeys.map((key) => (
              <li key={key} className="border-t border-line-on-dark pt-5">
                <h3 className="type-h4">{t(`roulette.points.${key}.title`)}</h3>
                <p className="type-body mt-2 text-text-muted-on-dark">
                  {t(`roulette.points.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={routePathnames.quote}>{labels.quote}</Button>
          </div>
        </div>
        <MediaFrame decorative accent="gold" className="aspect-[4/3] lg:aspect-[4/5]" />
      </Container>
    </Section>
  );
}
