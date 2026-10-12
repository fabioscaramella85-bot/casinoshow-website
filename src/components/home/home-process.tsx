import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const stepKeys = ["tell", "proposal", "setup", "enjoy"] as const;

export async function HomeProcess() {
  const t = await getTranslations("Home");

  return (
    <Section tone="dark" labelledBy="home-process">
      <Container>
        <SectionHeading
          id="home-process"
          tone="dark"
          eyebrow={t("process.eyebrow")}
          title={t("process.title")}
        />
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stepKeys.map((key, index) => (
            <li key={key} className="border-t border-line-on-dark pt-5">
              <p className="font-display text-3xl text-brand-gold">{index + 1}</p>
              <h3 className="type-h4 mt-4 text-text-on-dark">{t(`process.steps.${key}.title`)}</h3>
              <p className="type-body mt-3 text-text-muted-on-dark">
                {t(`process.steps.${key}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
