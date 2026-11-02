import { ContactColumns } from "@/components/contact/contact-columns";
import { ContactIntro } from "@/components/contact/contact-intro";
import { SiteShell } from "@/components/site-shell";

export function ContactPageView() {
  return (
    <SiteShell routeId="contact">
      <ContactIntro />
      <ContactColumns />
    </SiteShell>
  );
}
