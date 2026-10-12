import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

const noteKeys = ["participation", "conversation", "discovery", "shared", "atmosphere"] as const;

export async function AboutExperience() {
  const t = await getTranslations("About");

  return (
    <Section tone="dark" labelledBy="about-experience">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow tone="dark">{t("experience.eyebrow")}</Eyebrow>
          <h2 id="about-experience" className="type-h1 mt-4 text-balance">
            {t("experience.title")}
          </h2>
          <p className="type-body-lg mt-6 text-text-muted-on-dark">{t("experience.body")}</p>
        </div>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {noteKeys.map((key) => (
            <li key={key} className="border-t border-brand-gold/50 pt-5">
              <h3 className="type-h4">{t(`experience.notes.${key}.title`)}</h3>
              <p className="type-small mt-3 text-text-muted-on-dark">
                {t(`experience.notes.${key}.body`)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
