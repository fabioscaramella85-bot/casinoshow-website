import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const blocks = [
  { key: "dice", accent: "gold" },
  { key: "wheel", accent: "red" },
] as const;

export async function OtherGames() {
  const t = await getTranslations("Games");

  return (
    <Section id="other-games" labelledBy="games-other" tone="light">
      <Container>
        <SectionHeading
          id="games-other"
          eyebrow={t("other.eyebrow")}
          title={t("other.title")}
          description={t("other.description")}
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {blocks.map((block) => (
            <article key={block.key} className="border-t border-line-on-light pt-6">
              <MediaFrame decorative accent={block.accent} className="aspect-[16/9]" />
              <h3 className="type-h3 mt-6">{t(`other.${block.key}.title`)}</h3>
              <p className="type-body mt-3 text-text-muted-on-light">{t(`other.${block.key}.body`)}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
