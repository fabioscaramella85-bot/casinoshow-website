import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const pointKeys = ["type", "idea", "place", "period", "requests"] as const;

export async function ContactIntroduction() {
  const t = await getTranslations("Contact");

  return (
    <Section tone="light" labelledBy="contact-start">
      <Container>
        <SectionHeading
          id="contact-start"
          eyebrow={t("start.eyebrow")}
          title={t("start.title")}
          description={t("start.body")}
        />
        <ol className="mt-12">
          {pointKeys.map((key, index) => (
            <li
              key={key}
              className="grid gap-3 border-t border-line-on-light py-8 md:grid-cols-12 md:gap-8"
            >
              <p className="type-h3 text-gold-ink md:col-span-2">0{index + 1}</p>
              <h3 className="type-h3 md:col-span-4">{t(`start.points.${key}.title`)}</h3>
              <p className="type-body text-text-muted-on-light md:col-span-6">
                {t(`start.points.${key}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
