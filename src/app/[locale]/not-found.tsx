import { getTranslations } from "next-intl/server";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { routePathnames } from "@/i18n/routes";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <SiteShell routeId={null}>
      <Section>
        <Container>
          <h1 className="type-h1">{t("heading")}</h1>
          <p className="type-body-lg mt-5 max-w-2xl text-text-muted-on-light">{t("description")}</p>
          <div className="mt-8">
            <Button href={routePathnames.home} variant="secondary">
              {t("home")}
            </Button>
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
