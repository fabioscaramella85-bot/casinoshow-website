import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export async function CareersOpportunity() {
  const t = await getTranslations("Careers.opportunity");

  return (
    <section aria-labelledby="careers-opportunity-title" className="bg-surface-muted py-[var(--spacing-section)] text-midnight">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="careers-opportunity-title" className="type-h2 mt-3 text-balance">
            {t("title")}
          </h2>
          <div className="mt-4 grid gap-4">
            <p className="type-body text-text-muted-on-light">{t("p1")}</p>
            <p className="type-body text-text-muted-on-light">{t("p2")}</p>
            <p className="type-body text-midnight">{t("note")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
