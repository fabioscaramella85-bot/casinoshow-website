import { GamesPageView } from "@/components/games/games-page";
import { getPageMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return getPageMetadata("games");
}

export default function GamesPage() {
  return <GamesPageView />;
}
