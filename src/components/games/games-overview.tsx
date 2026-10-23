import { getTranslations } from "next-intl/server";
import { gameAnchors, gameOrder } from "@/components/games/game-photos";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export async function GamesOverview() {
  const t = await getTranslations("Games");

  return (
    <Section tone="light" labelledBy="games-overview">
      <Container>
        <SectionHeading
          id="games-overview"
          eyebrow={t("overview.eyebrow")}
          title={t("overview.title")}
          description={t("overview.description")}
        />
        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {gameOrder.map((key, index) => (
            <li key={key} className="border-t border-gold-ink/40 pt-5">
              <a
                href={`#${gameAnchors[key]}`}
                className="group flex min-h-11 flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
              >
                <span className="type-eyebrow text-gold-ink">{String(index + 1).padStart(2, "0")}</span>
                <span className="type-h3 mt-4 underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-[var(--duration-fast)] group-hover:decoration-current">
                  {t(`overview.items.${key}.title`)}
                </span>
                <span className="type-body mt-3 text-text-muted-on-light">
                  {t(`overview.items.${key}.summary`)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
