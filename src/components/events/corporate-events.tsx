import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { getNavLabels } from "@/i18n/labels";
import { routePathnames } from "@/i18n/routes";

const pointKeys = ["reception", "gala", "celebration", "clients", "networking"] as const;

export async function CorporateEvents() {
  const t = await getTranslations("Events");
  const labels = await getNavLabels();

  return (
    <Section id="corporate" labelledBy="events-corporate" tone="dark">
      <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow tone="dark">{t("corporate.eyebrow")}</Eyebrow>
          <h2 id="events-corporate" className="type-h2 mt-3 text-balance">
            {t("corporate.title")}
          </h2>
          <p className="type-body-lg mt-5 text-text-muted-on-dark">{t("corporate.body")}</p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {pointKeys.map((key) => (
              <li key={key}>
                <h3 className="type-h4">{t(`corporate.points.${key}.title`)}</h3>
                <p className="type-body mt-2 text-text-muted-on-dark">
                  {t(`corporate.points.${key}.body`)}
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
