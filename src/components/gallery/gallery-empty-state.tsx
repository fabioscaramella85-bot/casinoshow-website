import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export async function GalleryEmptyState() {
  const t = await getTranslations("Gallery");

  return (
    <Section tone="muted" labelledBy="gallery-empty">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <SectionHeading
          id="gallery-empty"
          eyebrow={t("empty.eyebrow")}
          title={t("empty.title")}
          description={t("empty.body")}
        />
        <MediaFrame decorative accent="red" className="aspect-[4/3]" />
      </Container>
    </Section>
  );
}
