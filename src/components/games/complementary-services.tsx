import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

const blocks = [
  { key: "selfie", accent: "gold" },
  { key: "experience", accent: "green" },
] as const;

export async function ComplementaryServices() {
  const t = await getTranslations("Games");

  return (
    <Section id="extras" labelledBy="games-extras" tone="muted">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{t("extras.eyebrow")}</Eyebrow>
          <h2 id="games-extras" className="type-h2 mt-3 text-balance">
            {t("extras.title")}
          </h2>
          <p className="type-body-lg mt-5">{t("extras.body")}</p>
          <p className="type-body mt-4 text-text-muted-on-light">{t("extras.note")}</p>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {blocks.map((block) => (
            <article key={block.key}>
              <MediaFrame decorative accent={block.accent} className="aspect-[4/3]" />
              <h3 className="type-h3 mt-6">{t(`extras.${block.key}.title`)}</h3>
              <p className="type-body mt-3 text-text-muted-on-light">{t(`extras.${block.key}.body`)}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
