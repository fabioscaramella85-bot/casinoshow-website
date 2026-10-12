import { ContactChannels } from "@/components/contact/contact-channels";
import { ContactFinalCta } from "@/components/contact/contact-final-cta";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactIntroduction } from "@/components/contact/contact-introduction";
import { ContactPaths } from "@/components/contact/contact-paths";
import { SiteShell } from "@/components/site-shell";

export function ContactPageView() {
  return (
    <SiteShell routeId="contact">
      <ContactHero />
      <ContactPaths />
      <ContactChannels />
      <ContactIntroduction />
      <ContactFinalCta />
    </SiteShell>
  );
}
