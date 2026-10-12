import { EventsPageView } from "@/components/events/events-page";
import { getPageMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return getPageMetadata("events");
}

export default function EventsPage() {
  return <EventsPageView />;
}
