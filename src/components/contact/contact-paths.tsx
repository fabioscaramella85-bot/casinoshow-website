import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { enabledContactChannels } from "@/config/contact";
import { getNavLabels } from "@/i18n/labels";
import { routePathnames } from "@/i18n/routes";

export async function ContactPaths() {
  const t = await getTranslations("Contact");
  const labels = await getNavLabels();
  const hasChannel = enabledContactChannels().length > 0;

  return (
    <Section tone="light" label={t("paths.label")}>
      <Container className="grid gap-5 lg:grid-cols-2">
        <article className="bg-midnight p-8 text-ivory lg:p-10">
          <h2 className="type-h2 text-balance">{t("paths.quote.title")}</h2>
          <p className="type-body mt-4 max-w-md text-text-muted-on-dark">{t("paths.quote.body")}</p>
          <div className="mt-8">
            <Button href={routePathnames.quote}>{labels.quote}</Button>
          </div>
          <p className="type-small mt-4 max-w-md text-text-muted-on-dark">{t("paths.quote.note")}</p>
        </article>
        <article className="border border-line-on-light p-8 lg:p-10">
          <h2 className="type-h2 text-balance">{t("paths.info.title")}</h2>
          <p className="type-body mt-4 max-w-md text-text-muted-on-light">{t("paths.info.body")}</p>
          {hasChannel ? (
            <a
              href="#channels"
              className="type-button mt-8 inline-flex min-h-11 items-center text-midnight underline decoration-transparent underline-offset-4 hover:decoration-current"
            >
              {t("paths.info.link")}
            </a>
          ) : null}
        </article>
      </Container>
    </Section>
  );
}
