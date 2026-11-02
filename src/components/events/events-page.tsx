import { EventsFinalCta } from "@/components/events/events-final-cta";
import { EventsHero } from "@/components/events/events-hero";
import { EventsMosaic } from "@/components/events/events-mosaic";
import { EventsProcess } from "@/components/events/events-process";
import { EventsSmoothScroll } from "@/components/events/events-smooth-scroll";
import { EventsStyles } from "@/components/events/events-styles";
import { SiteShell } from "@/components/site-shell";

export function EventsPageView() {
  return (
    <SiteShell routeId="events">
      <EventsStyles />
      <EventsSmoothScroll />
      <div className="ev-page">
        <EventsHero />
        <EventsMosaic />
        <EventsProcess />
        <EventsFinalCta />
      </div>
    </SiteShell>
  );
}
