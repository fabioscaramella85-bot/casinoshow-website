import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

export async function HomeIntroduction() {
  const t = await getTranslations("Home");

  return (
    <Section tone="light" labelledBy="home-intro">
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>{t("intro.eyebrow")}</Eyebrow>
          <h2 id="home-intro" className="type-h2 mt-3 text-balance">
            {t("intro.title")}
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="type-body-lg">{t("intro.body")}</p>
          <p className="type-body mt-5 text-text-muted-on-light">{t("intro.detail")}</p>
        </div>
      </Container>
    </Section>
  );
}
