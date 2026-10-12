import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export async function AboutIdea() {
  const t = await getTranslations("About");

  return (
    <Section tone="light" labelledBy="about-idea">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id="about-idea"
            eyebrow={t("idea.eyebrow")}
            title={t("idea.title")}
            description={t("idea.body")}
          />
          <p className="type-body mt-6 max-w-xl border-l border-gold-ink pl-5 text-text-on-light">
            {t("idea.aside")}
          </p>
        </div>
        <MediaFrame decorative accent="green" className="aspect-[4/3]" />
      </Container>
    </Section>
  );
}
