import { ContactPageView } from "@/components/contact/contact-page";
import { getPageMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return getPageMetadata("contact");
}

export default function ContactPage() {
  return <ContactPageView />;
}
