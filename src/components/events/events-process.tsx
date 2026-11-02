import { getTranslations } from "next-intl/server";
import { EventsProcessTrack } from "@/components/events/events-process-track";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { routePathnames } from "@/i18n/routes";

const stepKeys = ["tell", "proposal", "setup", "enjoy"] as const;

export async function EventsProcess() {
  const t = await getTranslations("Events");

  return (
    <Section tone="muted" labelledBy="events-process">
      <Container>
        <SectionHeading
          id="events-process"
          eyebrow={t("process.eyebrow")}
          title={t("process.title")}
          description={t("process.subtitle")}
        />
        <EventsProcessTrack
          steps={stepKeys.map((key) => ({
            title: t(`process.steps.${key}.title`),
            body: t(`process.steps.${key}.body`),
          }))}
        />
        <div className="mt-8">
          <Button href={routePathnames.games} variant="text">
            {t("process.gamesCta")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
