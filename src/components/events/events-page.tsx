import { CorporateEvents } from "@/components/events/corporate-events";
import { EventsFinalCta } from "@/components/events/events-final-cta";
import { EventsHero } from "@/components/events/events-hero";
import { EventsOverview } from "@/components/events/events-overview";
import { PrivateEvents } from "@/components/events/private-events";
import { TailoredExperience } from "@/components/events/tailored-experience";
import { TeamBuildingEvents } from "@/components/events/team-building-events";
import { WeddingEvents } from "@/components/events/wedding-events";
import { SiteShell } from "@/components/site-shell";

export function EventsPageView() {
  return (
    <SiteShell routeId="events">
      <EventsHero />
      <EventsOverview />
      <CorporateEvents />
      <TeamBuildingEvents />
      <WeddingEvents />
      <PrivateEvents />
      <TailoredExperience />
      <EventsFinalCta />
    </SiteShell>
  );
}
