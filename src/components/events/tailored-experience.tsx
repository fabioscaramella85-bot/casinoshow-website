import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { routePathnames } from "@/i18n/routes";

const pointKeys = ["type", "guests", "space", "atmosphere", "games", "format"] as const;

export async function TailoredExperience() {
  const t = await getTranslations("Events");

  return (
    <Section tone="light" labelledBy="events-tailored">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="events-tailored"
            eyebrow={t("tailored.eyebrow")}
            title={t("tailored.title")}
            description={t("tailored.body")}
          />
          <div className="mt-8">
            <Button href={routePathnames.games} variant="secondary">
              {t("tailored.gamesCta")}
            </Button>
          </div>
        </div>
        <ol className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
          {pointKeys.map((key, index) => (
            <li key={key} className="border-t border-line-on-light pt-5">
              <p className="type-eyebrow text-gold-ink">0{index + 1}</p>
              <h3 className="type-h4 mt-3">{t(`tailored.points.${key}.title`)}</h3>
              <p className="type-body mt-2 text-text-muted-on-light">
                {t(`tailored.points.${key}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
