import { getTranslations } from "next-intl/server";
import { gameAnchors, gameOrder } from "@/components/games/game-photos";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

function DiagonalArrow() {
  return (
    <span className="gx-card-arrow" aria-hidden="true">
      <svg viewBox="0 0 16 16">
        <path
          d="M4.75 11.25 11.25 4.75M7.1 4.75H11.25V8.9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

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
        <ul className="gx-index">
          {gameOrder.map((key, index) => (
            <li key={key}>
              <a href={`#${gameAnchors[key]}`} className="gx-card">
                <span className="gx-card-kicker">
                  <span className="gx-card-index">{String(index + 1).padStart(2, "0")}</span>
                  <DiagonalArrow />
                </span>
                <span className="gx-card-title">{t(`overview.items.${key}.title`)}</span>
                <span className="gx-card-summary">{t(`overview.items.${key}.summary`)}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
