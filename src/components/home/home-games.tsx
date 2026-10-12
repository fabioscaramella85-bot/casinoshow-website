import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { routePathnames } from "@/i18n/routes";

const gameKeys = ["roulette", "blackjack", "poker", "dice", "wheel", "extra"] as const;

const accents = ["red", "gold", "green", "ivory", "gold", "green"] as const;

export async function HomeGames() {
  const t = await getTranslations("Home");

  return (
    <Section tone="light" labelledBy="home-games">
      <Container>
        <SectionHeading
          id="home-games"
          eyebrow={t("games.eyebrow")}
          title={t("games.title")}
          description={t("games.description")}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gameKeys.map((key, index) => (
            <Card
              key={key}
              tone="light"
              href={routePathnames.games}
              title={t(`games.items.${key}.title`)}
              description={t(`games.items.${key}.body`)}
              media={<MediaFrame decorative accent={accents[index]} />}
            />
          ))}
        </div>
        <div className="mt-10">
          <Button href={routePathnames.games} variant="secondary">
            {t("games.cta")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
