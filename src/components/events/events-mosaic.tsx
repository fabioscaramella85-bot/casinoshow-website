import { getTranslations } from "next-intl/server";
import { EventsMosaicGrid, type MosaicCardContent } from "@/components/events/events-mosaic-grid";
import { mosaicCardIds, mosaicImages } from "@/components/events/mosaic-images";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export async function EventsMosaic() {
  const t = await getTranslations("Events.mosaic");
  const cards: MosaicCardContent[] = mosaicCardIds.map((id) => ({
    id,
    image: mosaicImages[id],
    alt: t(`cards.${id}.alt`),
    frontTitle: t(`cards.${id}.frontTitle`),
    frontText: t(`cards.${id}.frontText`),
    backTitle: t(`cards.${id}.backTitle`),
    backText: t(`cards.${id}.backText`),
  }));

  return (
    <Section id="eventi-mosaico" tone="light" labelledBy="events-mosaic" className="ev-mosaic-section">
      <Container>
        <SectionHeading
          id="events-mosaic"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <EventsMosaicGrid
          cards={cards}
          labels={{
            cta: t("cta"),
            hint: t("hint"),
            back: t("back"),
            open: t("open"),
            close: t("close"),
          }}
        />
      </Container>
    </Section>
  );
}
