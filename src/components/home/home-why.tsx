import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const reasonKeys = ["presentation", "guests", "formats", "detail"] as const;

export async function HomeWhy() {
  const t = await getTranslations("Home");

  return (
    <Section tone="light" labelledBy="home-why">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="home-why"
            eyebrow={t("why.eyebrow")}
            title={t("why.title")}
            description={t("why.description")}
          />
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
          {reasonKeys.map((key) => (
            <article key={key} className="border-t border-line-on-light pt-5">
              <h3 className="type-h4">{t(`why.items.${key}.title`)}</h3>
              <p className="type-body mt-3 text-text-muted-on-light">{t(`why.items.${key}.body`)}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
