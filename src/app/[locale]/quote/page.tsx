import { QuotePageView } from "@/components/quote/quote-page";
import { getPageMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return getPageMetadata("quote");
}

export default function QuotePage() {
  return <QuotePageView />;
}
