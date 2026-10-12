import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

export async function GalleryHero() {
  const page = await getTranslations("Pages.gallery");
  const t = await getTranslations("Gallery");

  return (
    <Section tone="dark">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow tone="dark">{t("hero.eyebrow")}</Eyebrow>
          <h1 className="type-display mt-4 max-w-xl text-balance">{page("heading")}</h1>
          <p className="type-body-lg mt-6 max-w-xl text-text-on-dark">{t("hero.support")}</p>
          <p className="type-body mt-4 max-w-xl text-text-muted-on-dark">{t("hero.lead")}</p>
        </div>
        <MediaFrame
          accent="gold"
          label={t("hero.mediaLabel")}
          className="aspect-[4/3] lg:aspect-[4/5]"
        />
      </Container>
    </Section>
  );
}
