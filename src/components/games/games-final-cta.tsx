import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { getNavLabels } from "@/i18n/labels";
import { routePathnames } from "@/i18n/routes";

export async function GamesFinalCta() {
  const t = await getTranslations("Games");
  const labels = await getNavLabels();

  return (
    <Section tone="dark" labelledBy="games-final">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow tone="dark">{t("final.eyebrow")}</Eyebrow>
          <h2 id="games-final" className="type-h1 mt-4 text-balance">
            {t("final.title")}
          </h2>
          <p className="type-body-lg mt-6 max-w-xl text-text-muted-on-dark">{t("final.body")}</p>
          <div className="mt-8">
            <Divider tone="dark" />
          </div>
          <div className="mt-8">
            <Button href={routePathnames.quote}>{labels.quote}</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
