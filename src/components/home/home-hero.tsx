import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { getNavLabels } from "@/i18n/labels";
import { routePathnames } from "@/i18n/routes";

export async function HomeHero() {
  const page = await getTranslations("Pages.home");
  const t = await getTranslations("Home");
  const labels = await getNavLabels();

  return (
    <Section tone="dark">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow tone="dark">{t("hero.eyebrow")}</Eyebrow>
          <h1 className="type-display mt-4 max-w-xl text-balance">{page("heading")}</h1>
          <p className="type-body-lg mt-6 max-w-xl text-text-on-dark">{t("hero.support")}</p>
          <p className="type-body mt-4 max-w-xl text-text-muted-on-dark">{t("hero.lead")}</p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            <Button href={routePathnames.quote}>{labels.quote}</Button>
            <Button href={routePathnames.events} variant="light">
              {t("hero.eventsCta")}
            </Button>
          </div>
        </div>
        <MediaFrame
          accent="green"
          label={t("hero.mediaLabel")}
          className="aspect-[4/3] lg:aspect-[4/5]"
        />
      </Container>
    </Section>
  );
}
