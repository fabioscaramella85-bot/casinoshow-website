import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export async function AboutPillars() {
  const t = await getTranslations("About");

  return (
    <Section tone="light" labelledBy="about-pillars">
      <Container>
        <SectionHeading
          id="about-pillars"
          eyebrow={t("pillars.eyebrow")}
          title={t("pillars.title")}
          description={t("pillars.body")}
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <article className="bg-midnight p-8 text-ivory lg:col-span-7 lg:p-10">
            <p className="type-eyebrow text-brand-gold">01</p>
            <h3 className="type-h2 mt-4 text-balance">{t("pillars.items.atmosphere.title")}</h3>
            <p className="type-body mt-4 max-w-xl text-text-muted-on-dark">
              {t("pillars.items.atmosphere.body")}
            </p>
          </article>
          <article className="flex flex-col justify-end border border-line-on-light p-8 lg:col-span-5">
            <h3 className="type-h3">{t("pillars.items.participation.title")}</h3>
            <p className="type-body mt-4 text-text-muted-on-light">
              {t("pillars.items.participation.body")}
            </p>
          </article>
          <article className="border-t border-line-on-light p-8 lg:col-span-5 lg:border-t-0 lg:pt-2">
            <h3 className="type-h3">{t("pillars.items.flexibility.title")}</h3>
            <p className="type-body mt-4 text-text-muted-on-light">
              {t("pillars.items.flexibility.body")}
            </p>
          </article>
          <article className="bg-surface-muted p-8 lg:col-span-7 lg:p-10">
            <h3 className="type-h3">{t("pillars.items.detail.title")}</h3>
            <p className="type-body mt-4 max-w-xl text-text-muted-on-light">
              {t("pillars.items.detail.body")}
            </p>
          </article>
        </div>
      </Container>
    </Section>
  );
}
