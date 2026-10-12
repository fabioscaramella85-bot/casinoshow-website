import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const categoryIds = ["corporate", "team", "weddings", "private"] as const;

export async function EventsOverview() {
  const t = await getTranslations("Events");

  return (
    <Section tone="light" labelledBy="events-overview">
      <Container>
        <SectionHeading
          id="events-overview"
          eyebrow={t("overview.eyebrow")}
          title={t("overview.title")}
          description={t("overview.description")}
        />
        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {categoryIds.map((id, index) => (
            <li key={id} className="border-t border-gold-ink/40 pt-5">
              <a href={`#${id}`} className="group flex min-h-11 flex-col">
                <span className="type-eyebrow text-gold-ink">0{index + 1}</span>
                <span className="type-h3 mt-4 underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-[var(--duration-fast)] group-hover:decoration-current">
                  {t(`overview.items.${id}.title`)}
                </span>
                <span className="type-body mt-3 text-text-muted-on-light">
                  {t(`overview.items.${id}.summary`)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
