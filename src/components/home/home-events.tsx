import { getTranslations } from "next-intl/server";
import { MediaFrame } from "@/components/home/media-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { routePathnames } from "@/i18n/routes";

const eventKeys = ["corporate", "team", "wedding", "private"] as const;

const eventAnchors = {
  corporate: "corporate",
  team: "team",
  wedding: "weddings",
  private: "private",
} as const;

const accents = ["gold", "green", "red", "ivory"] as const;

export async function HomeEvents() {
  const t = await getTranslations("Home");

  return (
    <Section tone="dark" labelledBy="home-events">
      <Container>
        <SectionHeading
          id="home-events"
          tone="dark"
          eyebrow={t("events.eyebrow")}
          title={t("events.title")}
          description={t("events.description")}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {eventKeys.map((key, index) => (
            <Card
              key={key}
              tone="dark"
              href={routePathnames.events}
              hash={eventAnchors[key]}
              title={t(`events.items.${key}.title`)}
              description={t(`events.items.${key}.body`)}
              media={<MediaFrame decorative accent={accents[index]} />}
            />
          ))}
        </div>
        <div className="mt-10">
          <Button href={routePathnames.events} variant="light">
            {t("events.cta")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
