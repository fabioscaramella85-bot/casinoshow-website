import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export async function GalleryIntroduction() {
  const t = await getTranslations("Gallery");

  return (
    <Section tone="light" labelledBy="gallery-intro">
      <Container>
        <SectionHeading
          id="gallery-intro"
          eyebrow={t("intro.eyebrow")}
          title={t("intro.title")}
          description={t("intro.body")}
        />
      </Container>
    </Section>
  );
}
